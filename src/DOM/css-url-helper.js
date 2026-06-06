// Shared helper for smart CSS url() value resolution.
// Used by both dom.js and svg.js .css() methods.
//
// Allows beginner-friendly shorthands like:
//   .css('cursor', '💿')        → SVG data URL cursor (32×32)
//   .css('cursor', 'cat.png')   → url('cat.png'), auto
//   .css('background-image', '★') → scalable SVG data URL
//   .css('background-image', 'bg.jpg') → url('bg.jpg')

// CSS properties that exclusively (or near-exclusively) accept url()/image values.
// Shorthands like 'background' and 'mask' are intentionally excluded — they also
// accept colors, gradients, positions, etc., making them too ambiguous to transform.
const URL_PROPS = new Set([
  'cursor',
  'background-image', 'backgroundImage',
  'border-image-source', 'borderImageSource',
  'list-style-image', 'listStyleImage',
  'mask-image', 'maskImage'
])

// Known CSS cursor keywords — pass through unchanged
const CURSOR_KEYWORDS = new Set([
  'auto', 'default', 'none', 'pointer', 'crosshair', 'text', 'vertical-text',
  'alias', 'copy', 'move', 'no-drop', 'not-allowed', 'grab', 'grabbing',
  'e-resize', 'n-resize', 'ne-resize', 'nw-resize', 's-resize', 'se-resize',
  'sw-resize', 'w-resize', 'ew-resize', 'ns-resize', 'nesw-resize',
  'nwse-resize', 'col-resize', 'row-resize', 'all-scroll', 'zoom-in',
  'zoom-out', 'cell', 'context-menu', 'help', 'progress', 'wait',
  'inherit', 'initial', 'unset', 'revert', 'revert-layer'
])

// General CSS-wide keywords that apply to any property
const GENERAL_KEYWORDS = new Set([
  'none', 'inherit', 'initial', 'unset', 'revert', 'revert-layer'
])

// Detects file paths / URLs that point to images
function looksLikeImagePath (val) {
  return /\.(png|jpe?g|gif|svg|webp|cur|ico|bmp|tiff?)(\?.*)?$/i.test(val.trim())
}

// Converts any text/emoji/unicode string into an SVG data URL.
// isCursor=true → fixed 32×32 (browser cursor size convention)
// isCursor=false → viewBox only, no intrinsic size (scales with CSS)
function textToSVGDataURL (text, isCursor) {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

  let svg
  if (isCursor) {
    svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">` +
          `<text x="16" y="16" font-size="24" text-anchor="middle" dominant-baseline="middle">${escaped}</text>` +
          `</svg>`
  } else {
    // No explicit width/height — SVG scales to fill whatever context it's placed in
    svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">` +
          `<text x="0.5" y="0.5" font-size="0.75" text-anchor="middle" dominant-baseline="middle">${escaped}</text>` +
          `</svg>`
  }

  return `url('data:image/svg+xml;utf8,${encodeURIComponent(svg)}')`
}

// Main resolver — call this inside .css() before assigning to element.style
// Returns the transformed CSS value string, or the original if no transform needed.
function smartCSSValue (prop, val) {
  if (typeof val !== 'string') return val
  const trimmed = val.trim()

  // Already a url() value — pass through
  if (trimmed.startsWith('url(')) return val

  // Any CSS function call (rgba(), linear-gradient(), hsl(), calc(), etc.) — pass through
  if (trimmed.includes('(')) return val

  // Only applies to url()-accepting properties
  if (!URL_PROPS.has(prop)) return val

  const isCursor = prop === 'cursor'
  const keywords = isCursor ? CURSOR_KEYWORDS : GENERAL_KEYWORDS

  // Known CSS keyword — pass through unchanged
  if (keywords.has(trimmed.toLowerCase())) return val

  // Looks like an image file path — wrap in url()
  if (looksLikeImagePath(trimmed)) {
    return isCursor
      ? `url('${trimmed}'), auto`
      : `url('${trimmed}')`
  }

  // Anything else (emoji, unicode char, text) — generate inline SVG data URL
  const dataUrl = textToSVGDataURL(trimmed, isCursor)
  return isCursor ? `${dataUrl}, auto` : dataUrl
}

if (typeof module !== 'undefined') module.exports = { smartCSSValue }
else window._nnCssUrlHelper = { smartCSSValue }
