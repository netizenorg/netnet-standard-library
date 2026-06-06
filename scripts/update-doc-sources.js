#!/usr/bin/env node

/*
  ⚠️ THIS SCRIPT IS ENTIRELY AI GENERATED (Anthropic Claude Sonnet 4.6) ⚠️
  ⚠️ WE SHOULD DOUBLE CHECK THE WORK; EVERYTIME WE RUN IT, SPOT CHECK RESULTS ⚠️
*/

// Scans all docs files and updates each entry's source.start / source.end
// by locating the matching function definition in the referenced source file.
// Entries whose name can't be found in the source file are left unchanged,
// so hand-crafted ranges (e.g. the 'ease' section) survive without markers.

const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')

const DOC_FILES = [
  'src/Maths/docs.js',
  'src/Color/docs.js',
  'src/Averigua/docs.js',
  'src/DOM/svg-docs.js',
  'src/DOM/canvas-docs.js',
  'src/Music/docs.js'
]

// ---------------------------------------------------------------------------
// Find every line index (0-based) in `lines` where `name` is defined.
// Handles the naming patterns used across this codebase:
//   static name (          ← Maths.js / Color.js / Averigua.js class methods
//   ele.name = function    ← DOM/svg.js augmentation pattern
//   name: function         ← object literal methods
//   function name (        ← standalone function declarations
// ---------------------------------------------------------------------------
function findDefinitionLines (lines, name) {
  const esc = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const patterns = [
    new RegExp(`\\bstatic\\s+${esc}\\s*\\(`),
    new RegExp(`\\bele\\.${esc}\\s*=\\s*function`),
    new RegExp(`\\b${esc}\\s*:\\s*function`),
    new RegExp(`^\\s*function\\s+${esc}\\s*\\(`)
  ]
  const hits = []
  for (let i = 0; i < lines.length; i++) {
    if (patterns.some(p => p.test(lines[i]))) hits.push(i)
  }
  return hits
}

// ---------------------------------------------------------------------------
// Walk forward from `startIdx` counting braces until the block closes.
// Returns the 0-based index of the closing line.
// Skips characters inside single-quoted, double-quoted, and template strings
// to avoid false counts from braces inside string literals.
// ---------------------------------------------------------------------------
function findBlockEnd (lines, startIdx) {
  let depth = 0
  let started = false
  let inSingle = false
  let inDouble = false
  let inTemplate = false
  let escaped = false

  for (let i = startIdx; i < lines.length; i++) {
    const line = lines[i]
    for (let c = 0; c < line.length; c++) {
      const ch = line[c]
      if (escaped) { escaped = false; continue }
      if (ch === '\\') { escaped = true; continue }

      // skip the rest of the line on a // comment (outside strings)
      if (!inSingle && !inDouble && !inTemplate && ch === '/' && line[c + 1] === '/') break

      if (!inDouble && !inTemplate && ch === "'") { inSingle = !inSingle; continue }
      if (!inSingle && !inTemplate && ch === '"') { inDouble = !inDouble; continue }
      if (!inSingle && !inDouble && ch === '`') { inTemplate = !inTemplate; continue }
      if (inSingle || inDouble || inTemplate) continue

      if (ch === '{') { depth++; started = true }
      else if (ch === '}') { depth-- }
    }
    if (started && depth === 0) return i
  }
  return lines.length - 1
}

// ---------------------------------------------------------------------------
// Process one docs file: find all (name, source) pairs, recompute start/end,
// and write the file back if anything changed.
// ---------------------------------------------------------------------------
function processDocsFile (docsRelPath) {
  const docsPath = path.join(ROOT, docsRelPath)
  if (!fs.existsSync(docsPath)) {
    console.warn(`  [skip] file not found: ${docsRelPath}`)
    return
  }
  let content = fs.readFileSync(docsPath, 'utf8')

  // Collect positions of every top-level  name: '<value>'  in the file.
  // These appear before the source: entry and after any preceding object's
  // closing brace, so the last one before a source: is always the right one.
  const nameMatches = []
  const nameRe = /\bname:\s*'([^']+)'/g
  let nm
  while ((nm = nameRe.exec(content)) !== null) {
    nameMatches.push({ value: nm[1], index: nm.index })
  }

  // Collect every  source: { filepath: '...', start: N, end: M }  entry.
  const sourceRe = /source:\s*\{\s*filepath:\s*'([^']+)',\s*start:\s*(\d+),\s*end:\s*(\d+)\s*\}/g
  const replacements = []
  let sm

  while ((sm = sourceRe.exec(content)) !== null) {
    const [fullMatch, filepath, oldStartStr, oldEndStr] = sm
    const oldStart = parseInt(oldStartStr)
    const oldEnd = parseInt(oldEndStr)

    // Find the last name: entry that precedes this source: entry.
    const precedingName = nameMatches.filter(n => n.index < sm.index).pop()
    if (!precedingName) {
      console.log(`  [skip] no name found before source at offset ${sm.index}`)
      continue
    }
    const name = precedingName.value

    // Load the referenced source file.
    const srcPath = path.join(ROOT, filepath)
    if (!fs.existsSync(srcPath)) {
      console.warn(`  [skip] '${name}': source file not found: ${filepath}`)
      continue
    }
    const srcLines = fs.readFileSync(srcPath, 'utf8').split('\n')

    // Find all definition lines for this name.
    const defLines = findDefinitionLines(srcLines, name)
    if (defLines.length === 0) {
      console.log(`  [skip] '${name}': no definition found in ${filepath}`)
      continue
    }

    // Span from the first definition start to the last definition's block end.
    const newStart = defLines[0] + 1 // convert to 1-based
    const newEnd = defLines.reduce((best, startIdx) => {
      return Math.max(best, findBlockEnd(srcLines, startIdx))
    }, 0) + 1 // convert to 1-based

    if (newStart === oldStart && newEnd === oldEnd) {
      console.log(`  [ok]  '${name}' → ${filepath} ${newStart}–${newEnd}`)
      continue
    }

    console.log(`  [upd] '${name}' → ${filepath} ${oldStart}–${oldEnd} → ${newStart}–${newEnd}`)
    replacements.push({
      index: sm.index,
      length: fullMatch.length,
      replacement: `source: { filepath: '${filepath}', start: ${newStart}, end: ${newEnd} }`
    })
  }

  if (replacements.length === 0) {
    console.log(`  no changes needed`)
    return
  }

  // Apply in reverse order so earlier offsets stay valid.
  replacements.sort((a, b) => b.index - a.index)
  for (const { index, length, replacement } of replacements) {
    content = content.slice(0, index) + replacement + content.slice(index + length)
  }

  fs.writeFileSync(docsPath, content, 'utf8')
  console.log(`  → wrote ${docsRelPath}`)
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
console.log('Updating doc source line numbers...\n')
for (const docFile of DOC_FILES) {
  console.log(`${docFile}:`)
  processDocsFile(docFile)
  console.log()
}
console.log('Done.')
