/*
  ⚠️ THIS SCRIPT IS ENTIRELY AI GENERATED (Anthropic Claude Sonnet 4.6) ⚠️
  ⚠️ WE SHOULD DOUBLE CHECK THE WORK; EVERYTIME WE RUN IT, SPOT CHECK RESULTS ⚠️
*/

// Compiles all src docs files + netitor-docs-extra.js into a single JSON file
// used by netitor for contextual education tooltips.
//
// Output shape:
// {
//   "nn":            { "methodName": { status, url, keyword, description } },
//   "nnDOM":         { ... },
//   "nnCanvas":      { ... },
//   "nnSVG":         { ... },
//   "nnFilterVideo": { ... },
//   "nnHyper":       { ... }
// }
//
// keyword.html  — <a> tag linking to the docs page
// keyword.text  — plain name string
// description.html — friendly text with markdown backticks → <code>, links preserved
// description.text — plain text version (HTML tags stripped)

const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const DOCS_URL_BASE = 'https://netizenorg.github.io/netnet-standard-library/docs/#'
const OUT_FILE = path.join(ROOT, 'build', 'nn-netitor-docs.json')

// ---------------------------------------------------------------------------
// Docs sources — each entry maps a file to its array variable name.
// `namespace` is used for all entries in that file. Omit for DOM_DOCS, which
// contains a mix of nn.* and ele.* methods (handled separately below).
// ---------------------------------------------------------------------------
const DOCS_SOURCES = [
  { file: 'src/DOM/docs.js', global: 'DOM_DOCS' }, // mixed — see getNamespaces()
  { file: 'src/DOM/canvas-docs.js', global: 'CANVAS_DOCS', namespace: 'nnCanvas' },
  { file: 'src/DOM/svg-docs.js', global: 'SVG_DOCS', namespace: 'nnSVG' },
  { file: 'src/Averigua/docs.js', global: 'AVERIGUA_DOCS', namespace: 'nn' },
  { file: 'src/Color/docs.js', global: 'COLOR_DOCS', namespace: 'nn' },
  { file: 'src/Data/docs.js', global: 'DATA_DOCS', namespace: 'nn' },
  { file: 'src/Maths/docs.js', global: 'MATHS_DOCS', namespace: 'nn' },
  { file: 'src/Media/docs.js', global: 'MEDIA_DOCS', namespace: 'nn' },
  { file: 'src/Music/docs.js', global: 'MUSIC_DOCS', namespace: 'nn' },
  { file: 'src/Utils/docs.js', global: 'UTILS_DOCS', namespace: 'nn' }
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// Load a docs array from a file that uses `const X = [...]` syntax.
// The docs files also contain `window.X = X` for browser export, so we stub
// `window` to avoid a ReferenceError when running in Node.
function loadDocs (filepath, globalName) {
  const code = fs.readFileSync(filepath, 'utf8')
  // eslint-disable-next-line no-new-func
  const fn = new Function('window', code + '\nreturn ' + globalName)
  return fn({})
}

// Mirror of the catSlug() function in docs/index.html
function catSlug (globalName) {
  return globalName.replace('_DOCS', '').toLowerCase()
}

// Convert markdown backtick code spans and [text](url) links to HTML.
// Existing HTML tags (like <code>, <a>) are left untouched.
function md2html (str) {
  if (!str) return ''
  return str
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
}

// Strip all HTML tags and decode common HTML entities to produce plain text
function html2text (str) {
  if (!str) return ''
  return str
    .replace(/<[^>]+>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim()
}

// Determine which namespace(s) a DOM_DOCS entry belongs to.
// Entries with only nn.* in their signature → nn
// Entries with only ele.* in their signature → nnDOM
// Entries with both (dual methods like nn.on / ele.on) → both
function getNamespacesForDomEntry (entry) {
  const sig = entry.signature || ''
  const hasNn = /\bnn\./.test(sig)
  const hasEle = /\b(?:ele|element)\./.test(sig)
  if (hasNn && hasEle) return ['nn', 'nnDOM']
  if (hasEle) return ['nnDOM']
  return ['nn']
}

// Build the compiled entry object from a docs entry + its resolved URL
function buildEntry (entry, url) {
  const friendlyHtml = md2html(entry.friendly || entry.description || '')
  const friendlyText = html2text(friendlyHtml)
  return {
    status: 'standard',
    url,
    keyword: {
      html: `<a href="${url}" target="_blank">${entry.name}</a>`,
      text: entry.name
    },
    description: {
      html: friendlyHtml,
      text: friendlyText
    }
  }
}

// Add an entry to the output, creating the namespace bucket if needed
function addToOutput (output, namespace, name, entry) {
  if (!output[namespace]) output[namespace] = {}
  output[namespace][name] = entry
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const output = {}

// Process each docs source file
for (const source of DOCS_SOURCES) {
  const filepath = path.join(ROOT, source.file)
  const docs = loadDocs(filepath, source.global)
  const slug = catSlug(source.global)

  for (const entry of docs) {
    const url = DOCS_URL_BASE + slug + '/' + entry.name
    const compiled = buildEntry(entry, url)

    if (source.namespace) {
      // Fixed namespace (Canvas, SVG, Averigua, etc.)
      addToOutput(output, source.namespace, entry.name, compiled)
    } else {
      // Mixed DOM_DOCS — route by signature
      const namespaces = getNamespacesForDomEntry(entry)
      for (const ns of namespaces) {
        addToOutput(output, ns, entry.name, compiled)
      }
    }
  }
}

// Process extra hand-written entries (sub-methods, returned-value APIs, etc.)
const extra = require('./netitor-docs-extra.js')
for (const entry of extra) {
  const url = entry.url || (DOCS_URL_BASE + entry.name)
  const compiled = buildEntry(entry, url)
  addToOutput(output, entry.namespace, entry.name, compiled)
}

// Write output
fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true })
fs.writeFileSync(OUT_FILE, JSON.stringify(output, null, 2))

// Summary
const total = Object.values(output).reduce((n, ns) => n + Object.keys(ns).length, 0)
console.log(`Wrote ${OUT_FILE}`)
console.log(`  ${total} entries across ${Object.keys(output).length} namespaces:`)
for (const [ns, entries] of Object.entries(output)) {
  console.log(`  ${ns}: ${Object.keys(entries).length}`)
}
