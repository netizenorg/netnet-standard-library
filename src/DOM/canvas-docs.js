const CANVAS_DOCS = [
  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ drawing shapes ~ ~ ~ ~ ~ ~ ~
  {
    name: 'circle',
    source: { filepath: 'src/DOM/canvas.js', start: 409, end: 414 },
    signature: 'canvas.circle(x, y, r)',
    description: 'Draws a filled and stroked circle on the canvas at (`x`, `y`) with radius `r`. Uses the current `fillColor` and `strokeColor` state. Returns the canvas element so calls can be chained.',
    friendly: 'This method draws a circle on the canvas. The first two numbers set its center position, and the third number sets its radius (half the total width of the circle).',
    params: [
      { name: 'x', description: 'The x coordinate of the center.' },
      { name: 'y', description: 'The y coordinate of the center.' },
      { name: 'r', description: 'The radius.' }
    ],
    returns: 'The canvas element.',
    example: `let canvas

function setup () {
  // create a full-page canvas
  canvas = nn.create('canvas')
    .resize(nn.width, nn.height)
    .position(0, 0)
    .addTo('body')

  canvas.fillColor = 'coral'
  canvas.strokeColor = 'transparent'
}

function update () {
  // canvas.clear()
  // ^ uncommnet this line, see what happens

  // draw a circle following the mouse
  canvas.circle(nn.mouseX, nn.mouseY, 40)
}

nn.on('load', setup) // run setup once the page has loaded
nn.on('mousemove', update) // re-draw every time the mouse moves`
  },

  {
    name: 'ellipse',
    source: { filepath: 'src/DOM/canvas.js', start: 390, end: 400 },
    signature: 'canvas.ellipse(x, y, rx, ry)',
    description: 'Draws a filled and stroked ellipse centered at (`x`, `y`) with horizontal radius `rx` and vertical radius `ry`. If `ry` is omitted it defaults to `rx`, making a circle.',
    friendly: 'This method draws an oval on the canvas. The first two numbers set its center position, the third sets how wide it is (horizontal radius), and the fourth sets how tall it is (vertical radius).',
    params: [
      { name: 'x', description: 'The x coordinate of the center.' },
      { name: 'y', description: 'The y coordinate of the center.' },
      { name: 'rx', description: 'The horizontal radius.' },
      { name: 'ry', description: 'The vertical radius (optional, defaults to `rx`).' }
    ],
    returns: 'The canvas element.',
    example: `let canvas
let x, y, vx, vy
// horizontal and vertical radius of the ellipse
const rx = 80, ry = 50

function setup () {
  // create the canvas
  canvas = nn.create('canvas')
    .resize(nn.width, nn.height)
    .position(0, 0)
    .addTo('body')

  // start at center with a random diagonal velocity
  x = canvas.width / 2
  y = canvas.height / 2
  vx = nn.random(2, 5)
  vy = nn.random(2, 5)
}

function animate () {
  requestAnimationFrame(animate) // call again, ~60fps

  // draw a semi-transparent layer over the
  // the previous frame to create a sort of
  // fading effect.
  const p = nn.toRGB('rebeccapurple')
  canvas.fillColor = nn.rgb(p.r, p.g, p.b, 0.1)
  canvas.rect(0, 0, nn.width, nn.height)

  // or to erase canvas before drawing the
  // next frame comment out the line below
  // canvas.clear()


  // move the ellipse
  x += vx
  y += vy

  // bounce off left and right walls
  if (x - rx < 0 || x + rx > canvas.width) vx *= -1
  // bounce off top and bottom walls
  if (y - ry < 0 || y + ry > canvas.height) vy *= -1

  canvas.fillColor = 'coral'
  canvas.strokeColor = 'transparent'
  canvas.ellipse(x, y, rx, ry)
}

// once page has loaded, run setup() and animate()
nn.on('load', setup)
nn.on('load', animate)`
  },

  {
    name: 'rect',
    source: { filepath: 'src/DOM/canvas.js', start: 416, end: 427 },
    signature: 'canvas.rect(x, y, w, h?)',
    description: 'Draws a filled and stroked rectangle with its top-left corner at (`x`, `y`) and the given `width` and `height`. If `h` is omitted it defaults to `w`, drawing a square.',
    friendly: 'This method draws a rectangle on the canvas. The first two numbers set the position of its top-left corner, and the next two set its width and height. If you only pass one size value it draws a square.',
    params: [
      { name: 'x', description: 'The x coordinate of the top-left corner.' },
      { name: 'y', description: 'The y coordinate of the top-left corner.' },
      { name: 'w', description: 'The width.' },
      { name: 'h', description: 'The height (optional, defaults to `w`).' }
    ],
    returns: 'The canvas element.',
    example: `let canvas

function setup () {
  // create a full screen canvas
  canvas = nn.create('canvas')
    .resize(nn.width, nn.height)
    .position(0, 0)
    .css('cursor', 'pointer')
    .addTo('body')

  // set the default colors
  canvas.fillColor = 'coral'
  canvas.strokeColor = 'transparent'

  // draw first square
  draw()
}

// draw a random square
function draw () {
  // random square size
  const s = nn.random(40, 120)
  // random position
  const x = nn.random(0, nn.width - s)
  const y = nn.random(0, nn.height - s)
  // randomize opacity
  canvas.globalAlpha = nn.random(0.3, 0.9)
  // draw the scquare
  canvas.rect(x, y, s)
}

nn.on('load', setup) // run setup once the page has loaded
nn.on('click', draw) // call draw on every mouse click`
  },

  {
    name: 'line',
    source: { filepath: 'src/DOM/canvas.js', start: 429, end: 438 },
    signature: 'canvas.line(x1, y1, x2, y2)',
    description: 'Draws a stroked line from (`x1`, `y1`) to (`x2`, `y2`). Uses the current `strokeColor` and `lineWidth`. Fill has no visible effect on a line.',
    friendly: 'This method draws a straight line on the canvas. The first two numbers are the starting point (x, y) and the last two numbers are the ending point (x, y).',
    params: [
      { name: 'x1', description: 'The x coordinate of the start point.' },
      { name: 'y1', description: 'The y coordinate of the start point.' },
      { name: 'x2', description: 'The x coordinate of the end point.' },
      { name: 'y2', description: 'The y coordinate of the end point.' }
    ],
    returns: 'The canvas element.',
    example: `let canvas

function setup () {
  // create the canvas element
  canvas = nn.create('canvas')
    .resize(nn.width, nn.height)
    .position(0, 0)
    .addTo('body')
}

function draw () {
  // draw a semi-transparent layer over the
  // the previous frame to create a sort of
  // fading effect.
  const p = nn.toRGB('rebeccapurple')
  canvas.fillColor = nn.rgb(p.r, p.g, p.b, 0.05)
  canvas.strokeColor = 'transparent'
  canvas.rect(0, 0, nn.width, nn.height)
  // draw a line from the center to the mouse
  const cx = nn.width / 2
  const cy = nn.height / 2
  canvas.strokeColor = 'coral'
  canvas.lineWidth = 2
  canvas.line(cx, cy, nn.mouseX, nn.mouseY)
}

nn.on('load', setup) // run setup once the page has loaded
nn.on('mousemove', draw) // draw every time the mouse moves`
  },

  {
    name: 'triangle',
    source: { filepath: 'src/DOM/canvas.js', start: 440, end: 452 },
    signature: 'canvas.triangle(x1, y1, x2, y2, x3, y3)',
    description: 'Draws a filled and stroked triangle defined by three points. Uses the current `fillColor` and `strokeColor` state.',
    friendly: 'This method draws a triangle on the canvas. The six numbers are the x, y coordinates of each of its three corners.',
    params: [
      { name: 'x1', description: 'The x coordinate of the first point.' },
      { name: 'y1', description: 'The y coordinate of the first point.' },
      { name: 'x2', description: 'The x coordinate of the second point.' },
      { name: 'y2', description: 'The y coordinate of the second point.' },
      { name: 'x3', description: 'The x coordinate of the third point.' },
      { name: 'y3', description: 'The y coordinate of the third point.' }
    ],
    returns: 'The canvas element.',
    example: `let canvas
let angle = 0

function setup () {
  // create the canvas element
  canvas = nn.create('canvas')
    .resize(nn.width, nn.height)
    .position(0, 0)
    .addTo('body')

  // set properties
  canvas.fillColor = 'coral'
  canvas.strokeColor = 'lavender'
  canvas.lineWidth = 2
}

function animate () {
  requestAnimationFrame(animate) // call again, ~60fps
  canvas.clear()

  const cx = nn.width / 2
  const cy = nn.height / 2
  const r = 80
  angle += 0.02

  // compute three vertices of an equilateral triangle
  const x1 = cx + r * Math.cos(angle)
  const y1 = cy + r * Math.sin(angle)
  const x2 = cx + r * Math.cos(angle + (Math.PI * 2 / 3))
  const y2 = cy + r * Math.sin(angle + (Math.PI * 2 / 3))
  const x3 = cx + r * Math.cos(angle + (Math.PI * 4 / 3))
  const y3 = cy + r * Math.sin(angle + (Math.PI * 4 / 3))

  canvas.triangle(x1, y1, x2, y2, x3, y3)
}

// run setup and animate soon as the page loads
nn.on('load', setup)
nn.on('load', animate)`
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ styling ~ ~ ~ ~ ~ ~ ~ ~
  {
    name: 'fillColor',
    source: { filepath: 'src/DOM/canvas.js', start: 64, end: 75 },
    signature: 'canvas.fillColor',
    description: 'A get/set property that maps to the canvas context\'s `fillStyle`. Assign any CSS color string, `CanvasGradient`, or `CanvasPattern` to change the fill color used by subsequent drawing calls (`circle`, `rect`, `triangle`, etc.).',
    friendly: 'This property sets the fill color used when drawing shapes. Assign any CSS color string like <code>\'coral\'</code> or <code>\'#ff6b6b\'</code>, and all shapes drawn after that will use that color.',
    params: [
      { name: 'value', description: 'A CSS color string, `CanvasGradient`, or `CanvasPattern`.' }
    ],
    returns: 'The current fill color string (on get).',
    example: `// create the canvas element
const canvas = nn.create('canvas')
  .resize(nn.width, nn.height)
  .position(0, 0)
  .addTo('body')

// coordinates at center of canvas
const cx = canvas.width / 2
const cy = canvas.height / 2

// draw a circle with default fill color (black)
canvas.circle(cx - 30, cy, 60)

// change the fill color
canvas.fillColor = 'coral'

// draw another circle with new color (coral)
canvas.circle(cx + 30, cy, 60)`
  },

  {
    name: 'strokeColor',
    source: { filepath: 'src/DOM/canvas.js', start: 76, end: 87 },
    signature: 'canvas.strokeColor',
    description: 'A get/set property that maps to the canvas context\'s `strokeStyle`. Assign any CSS color string, `CanvasGradient`, or `CanvasPattern` to change the stroke color used by subsequent drawing calls. Set to `\'transparent\'` to suppress outlines entirely.',
    friendly: 'This property sets the outline color used when drawing shapes. Set it to <code>\'transparent\'</code> if you don\'t want any outline.',
    params: [
      { name: 'value', description: 'A CSS color string, `CanvasGradient`, or `CanvasPattern`.' }
    ],
    returns: 'The current stroke color string (on get).',
    example: `// setup the canvas element
const canvas = nn.create('canvas')
  .resize(nn.width, nn.height)
  .position(0, 0)
  .addTo('body')

// center of the canvas
const cx = canvas.width / 2
const cy = canvas.height / 2

// draw concentric rings using only strokeColor
canvas.fillColor = 'transparent'
canvas.lineWidth = 3

// run the code block 6 times
nn.times(6, i => {
  // vary stroke color and opacity per ring
  const alpha = 1 - i * 0.15
  canvas.strokeColor = nn.rgb(255, 100, 80, alpha)
  canvas.circle(cx, cy, 30 + i * 30)
})`
  },

  {
    name: 'lineWidth',
    source: { filepath: 'src/DOM/canvas.js', start: 88, end: 97 },
    signature: 'canvas.lineWidth',
    description: 'A get/set property that maps to the canvas context\'s `lineWidth`. Assign a number to change how thick outlines and lines are drawn by subsequent calls. The default is `1`.',
    friendly: 'This property sets how thick the outlines and lines are when drawing. The default is <code>1</code>, and higher numbers make thicker lines.',
    params: [
      { name: 'value', description: 'A number specifying the stroke width in pixels.' }
    ],
    returns: 'The current line width number (on get).',
    example: `// setup the canvas element
const canvas = nn.create('canvas')
  .resize(nn.width, nn.height)
  .position(0, 0)
  .addTo('body')

// set color properties
canvas.fillColor = 'transparent'
canvas.strokeColor = 'coral'

// draw rows of lines with increasing thickness
const rows = 7
const step = nn.height / rows
nn.times(rows, i => {
  canvas.lineWidth = i + 1
  const y = step * i + step / 2
  canvas.line(40, y, nn.width - 40, y)
})`
  },

  {
    name: 'lineCap',
    source: { filepath: 'src/DOM/canvas.js', start: 98, end: 107 },
    signature: 'canvas.lineCap',
    description: 'A get/set property that maps to the canvas context\'s `lineCap`. Controls how the ends of lines are drawn. Accepted values are `\'butt\'` (flat ends, default), `\'round\'` (rounded ends), and `\'square\'` (flat ends extended by half the line width).',
    friendly: 'This property controls the shape of the ends of a line. <code>\'butt\'</code> is flat (default), <code>\'round\'</code> adds a rounded cap, and <code>\'square\'</code> adds a flat extension.',
    params: [
      { name: 'value', description: "`'butt'`, `'round'`, or `'square'`." }
    ],
    returns: 'The current line cap string (on get).',
    example: `// setup the canvas element
const canvas = nn.create('canvas')
  .resize(nn.width, nn.height)
  .position(0, 0)
  .addTo('body')

// set initial properties
canvas.strokeColor = 'coral'
canvas.lineWidth = 20

let x1 = 80
let y1 = nn.height / 3
let x2 = nn.width - 80
let y2 = nn.height / 3

// flat ends (default)
canvas.lineCap = 'butt'
canvas.line(x1, y1, x2, y2)

// rounded ends
y1 = nn.height / 3 * 2
y2 = nn.height / 3 * 2
canvas.lineCap = 'round'
canvas.line(x1, y1, x2, y2)`
  },

  {
    name: 'lineJoin',
    source: { filepath: 'src/DOM/canvas.js', start: 108, end: 117 },
    signature: 'canvas.lineJoin',
    description: 'A get/set property that maps to the canvas context\'s `lineJoin`. Controls how corners look when two lines meet. Accepted values are `\'miter\'` (sharp corner, default), `\'round\'` (rounded corner), and `\'bevel\'` (beveled/cut corner).',
    friendly: 'This property controls how corners look where two lines or shape edges meet. <code>\'miter\'</code> is a sharp point (default), <code>\'round\'</code> is rounded, and <code>\'bevel\'</code> cuts the corner flat.',
    params: [
      { name: 'value', description: "`'miter'`, `'round'`, or `'bevel'`." }
    ],
    returns: 'The current line join string (on get).',
    example: `const canvas = nn.create('canvas')
  .resize(nn.width, nn.height)
  .position(0, 0)
  .addTo('body')

canvas.fillColor = 'transparent'
canvas.strokeColor = 'coral'
canvas.lineWidth = 20

// sharp pointed corner (default)
canvas.lineJoin = 'miter'
canvas.beginPath()
canvas.moveTo(60, nn.height / 4 + 70)
canvas.lineTo(nn.width / 2, nn.height / 4 - 70)
canvas.lineTo(nn.width - 60, nn.height / 4 + 70)
canvas.stroke()

// rounded corner
canvas.lineJoin = 'round'
canvas.beginPath()
canvas.moveTo(60, nn.height / 2 + 70)
canvas.lineTo(nn.width / 2, nn.height / 2 - 70)
canvas.lineTo(nn.width - 60, nn.height / 2 + 70)
canvas.stroke()

// beveled (cut) corner
canvas.lineJoin = 'bevel'
canvas.beginPath()
canvas.moveTo(60, nn.height / 4 * 3 + 70)
canvas.lineTo(nn.width / 2, nn.height / 4 * 3 - 70)
canvas.lineTo(nn.width - 60, nn.height / 4 * 3 + 70)
canvas.stroke()`
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ text ~ ~ ~ ~ ~ ~ ~ ~ ~
  {
    name: 'text',
    source: { filepath: 'src/DOM/canvas.js', start: 454, end: 468 },
    signature: 'canvas.text(str, x, y, type?)',
    description: "Draws a text string at position (`x`, `y`). Uses the current `font`, `fillColor`, `strokeColor`, `textAlign`, and `textBaseline` state. The optional `type` parameter controls whether the text is drawn as `'fill'` (default) or `'stroke'`. Returns the canvas element.",
    friendly: 'This method draws a text string onto the canvas. The first argument is the text itself, and the next two numbers are the x, y position where it will be drawn.',
    params: [
      { name: 'str', description: 'The text string to draw.' },
      { name: 'x', description: 'The x position.' },
      { name: 'y', description: 'The y position.' },
      { name: 'type', optional: true, description: "`'fill'` (default) or `'stroke'`." }
    ],
    returns: 'The canvas element.',
    example: `let canvas

function setup () {
  // setup the canvas element
  canvas = nn.create('canvas')
    .resize(nn.width, nn.height)
    .position(0, 0)
    .addTo('body')

  // setup the text properties
  canvas.font = 'bold 64px monospace'
  canvas.textAlign = 'center'
  canvas.textBaseline = 'middle'
  canvas.fillColor = 'coral'
  canvas.strokeColor = 'transparent'
}

function update () {
  canvas.clear()
  // draw the current mouse coordinates
  const msg = \`\${nn.mouseX}, \${nn.mouseY}\`
  canvas.text(msg, nn.width / 2, nn.height / 2)
}

// run setup and update soon as the page loads
nn.on('load', setup)
nn.on('load', update)
// re-draw every time the mouse moves
nn.on('mousemove', update)`
  },

  {
    name: 'font',
    source: { filepath: 'src/DOM/canvas.js', start: 118, end: 127 },
    signature: 'canvas.font',
    description: 'A get/set property that maps to the canvas context\'s `font`. Assign a CSS font shorthand string to change the typeface, size, and weight used by subsequent `text()` calls. For example: `\'bold 24px monospace\'` or `\'italic 16px serif\'`.',
    friendly: 'This property sets the font used when drawing text, using the same format as CSS, for example <code>\'bold 24px monospace\'</code>.',
    params: [
      { name: 'value', description: 'A CSS font shorthand string, e.g. `\'bold 32px sans-serif\'`.' }
    ],
    returns: 'The current font string (on get).',
    example: `// setup the canvas
const canvas = nn.create('canvas')
  .resize(nn.width, nn.height)
  .position(0, 0)
  .addTo('body')

// setup initial text properties
canvas.textAlign = 'center'
canvas.textBaseline = 'middle'
canvas.fillColor = 'coral'
canvas.strokeColor = 'transparent'

// array of font values
const fonts = [
  '16px sans-serif',
  'bold 24px monospace',
  'italic 32px serif',
  'bold italic 48px Georgia'
]

const step = nn.height / (fonts.length + 1)
// loop through font values
fonts.forEach((f, i) => {
  // test each font in the array
  canvas.font = f
  canvas.text(f, nn.width / 2, step * (i + 1))
})`
  },

  {
    name: 'textAlign',
    source: { filepath: 'src/DOM/canvas.js', start: 128, end: 137 },
    signature: 'canvas.textAlign',
    description: 'A get/set property that maps to the canvas context\'s `textAlign`. Controls horizontal alignment of text drawn by `text()` relative to the x position. Accepted values are `\'left\'`, `\'right\'`, `\'center\'`, `\'start\'`, and `\'end\'`.',
    friendly: 'This property controls how text is horizontally aligned relative to the x position you pass to <code>.text()</code>. For example, <code>\'center\'</code> means the x coordinate lands at the middle of the text.',
    params: [
      { name: 'value', description: "`'left'`, `'right'`, `'center'`, `'start'`, or `'end'`." }
    ],
    returns: 'The current text align string (on get).',
    example: `// setup the canvas
const canvas = nn.create('canvas')
  .resize(nn.width, nn.height)
  .position(0, 0)
  .addTo('body')

const cx = nn.width / 2
canvas.font = '28px monospace'
canvas.fillColor = 'coral'
canvas.strokeColor = 'transparent'
canvas.textBaseline = 'middle'

// draw a purple vertical guide through the center
canvas.strokeColor = 'rebeccapurple'
canvas.lineWidth = 1
canvas.line(cx, 0, cx, nn.height)
canvas.strokeColor = 'transparent'

// step size for y position
const y = nn.height / 4
// draw different text align examples
canvas.textAlign = 'left'
canvas.text('left', cx, y)

canvas.textAlign = 'center'
canvas.text('center', cx, y * 2)

canvas.textAlign = 'right'
canvas.text('right', cx, y * 3)`
  },

  {
    name: 'textBaseline',
    source: { filepath: 'src/DOM/canvas.js', start: 138, end: 147 },
    signature: 'canvas.textBaseline',
    description: 'A get/set property that maps to the canvas context\'s `textBaseline`. Controls vertical alignment of text drawn by `text()` relative to the y position. Accepted values are `\'alphabetic\'`, `\'top\'`, `\'hanging\'`, `\'middle\'`, `\'ideographic\'`, and `\'bottom\'`.',
    friendly: 'This property controls how text is vertically aligned relative to the y position you pass to <code>.text()</code>. For example, <code>\'middle\'</code> means the y coordinate lands at the vertical center of the text.',
    params: [
      { name: 'value', description: "`'alphabetic'`, `'top'`, `'hanging'`, `'middle'`, `'ideographic'`, or `'bottom'`." }
    ],
    returns: 'The current text baseline string (on get).',
    example: `// setup canvas
const canvas = nn.create('canvas')
  .resize(nn.width, nn.height)
  .position(0, 0)
  .addTo('body')

const cy = nn.height / 2
canvas.font = '28px monospace'
canvas.fillColor = 'coral'
canvas.strokeColor = 'transparent'
canvas.textAlign = 'center'

// draw a purple horizontal guide through the center
canvas.strokeColor = 'rebeccapurple'
canvas.lineWidth = 1
canvas.line(0, cy, nn.width, cy)
canvas.strokeColor = 'transparent'

// step size for x position
const x = nn.width / 4
// draw different text align examples
canvas.textBaseline = 'top'
canvas.text('top', x, cy)

canvas.textBaseline = 'middle'
canvas.text('middle', x * 2, cy)

canvas.textBaseline = 'bottom'
canvas.text('bottom', x * 3, cy)
`
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ transforms ~ ~ ~ ~ ~ ~ ~ ~
  {
    name: 'save',
    source: { filepath: 'src/DOM/canvas.js', start: 580, end: 583 },
    signature: 'canvas.save()',
    description: '`save()` pushes a snapshot of the current drawing state (transforms, styles, clipping) onto a stack. `restore()` pops the most recent snapshot, reverting all state changes made since that `save()`. They are always used as a pair, wrap any temporary transform or style change between them so the rest of your drawing is unaffected.',
    friendly: 'These two methods work as a pair. <code>.save()</code> takes a snapshot of the current drawing settings (colors, transforms, etc.) and <code>.restore()</code> brings them back, so any temporary changes you make in between don\'t affect the rest of your drawing.',
    params: [],
    returns: 'The canvas element.',
    example: `// setup canvas
const canvas = nn.create('canvas')
  .resize(nn.width, nn.height)
  .position(0, 0)
  .addTo('body')

// set intial state/settings
canvas.fillColor = 'rebeccapurple'
canvas.strokeColor = 'transparent'

// draw square at (10,10)
canvas.rect(10, 10, 100)

// Save the current state (color, rotation, etc)
canvas.save() // ...............................

// chnage that state before we draw next square
canvas.fillColor = 'coral'
canvas.globalAlpha = 0.5
canvas.rect(120, 10, 100)

// restore back to original state/settings
canvas.restore() // ............................

// then draw another rect with the
// restored state/settings
canvas.rect(230, 10, 100)`
  },
  {
    name: 'restore',
    source: { filepath: 'src/DOM/canvas.js', start: 584, end: 587 },
    signature: 'canvas.restore()',
    description: '`save()` pushes a snapshot of the current drawing state (transforms, styles, clipping) onto a stack. `restore()` pops the most recent snapshot, reverting all state changes made since that `save()`. They are always used as a pair, wrap any temporary transform or style change between them so the rest of your drawing is unaffected.',
    friendly: 'These two methods work as a pair. <code>.save()</code> takes a snapshot of the current drawing settings (colors, transforms, etc.) and <code>.restore()</code> brings them back, so any temporary changes you make in between don\'t affect the rest of your drawing.',
    params: [],
    returns: 'The canvas element.',
    example: `// setup canvas
const canvas = nn.create('canvas')
  .resize(nn.width, nn.height)
  .position(0, 0)
  .addTo('body')

// set intial state/settings
canvas.fillColor = 'rebeccapurple'
canvas.strokeColor = 'transparent'

// draw square at (10,10)
canvas.rect(10, 10, 100)

// Save the current state (color, rotation, etc)
canvas.save() // ...............................

// chnage that state before we draw next square
canvas.fillColor = 'coral'
canvas.globalAlpha = 0.5
canvas.rect(120, 10, 100)

// restore back to original state/settings
canvas.restore() // ............................

// then draw another rect with the
// restored state/settings
canvas.rect(230, 10, 100)`
  },

  {
    name: 'translate',
    source: { filepath: 'src/DOM/canvas.js', start: 554, end: 554 },
    signature: 'canvas.translate(x, y)',
    description: 'Moves the canvas coordinate origin by (`x`, `y`). All subsequent drawing commands are offset by that amount. Use inside a `save()`/`restore()` pair to apply the translation temporarily.',
    friendly: 'This method shifts the canvas\'s origin point so that all subsequent drawing commands are offset by the given x and y amounts. Use it inside a <code>.save()</code> / <code>.restore()</code> pair so only certain shapes are affected.',
    params: [
      { name: 'x', description: 'The horizontal offset in pixels.' },
      { name: 'y', description: 'The vertical offset in pixels.' }
    ],
    returns: 'The canvas element.',
    example: `// setup canvas
const canvas = nn.create('canvas')
  .resize(nn.width, nn.height)
  .position(0, 0)
  .addTo('body')

// set intial state/settings
canvas.fillColor = 'rebeccapurple'
canvas.strokeColor = 'transparent'

// draw square at (10,10)
canvas.rect(10, 10, 100)

// Save the current state (color, rotation, etc)
canvas.save() // ...............................

// chnage that state before we draw next square
canvas.fillColor = 'coral'
canvas.globalAlpha = 0.5
canvas.translate(50, 50) // translate origin by 50
canvas.rect(120, 10, 100)

// restore back to original state/settings
canvas.restore() // ............................

// then draw another rect with the
// restored state/settings
canvas.rect(230, 10, 100)`
  },

  {
    name: 'rotate',
    source: { filepath: 'src/DOM/canvas.js', start: 565, end: 565 },
    signature: 'canvas.rotate(radians)',
    description: 'Rotates the canvas coordinate system by the given angle in radians. Always use inside a `save()`/`restore()` pair, and combine with `translate()` to rotate around a specific point rather than the top-left origin.',
    friendly: 'This method rotates the canvas coordinate system by a given angle in radians. Use it inside a <code>.save()</code> / <code>.restore()</code> pair so only the shapes you want are drawn at that rotation.',
    params: [
      { name: 'radians', description: 'The rotation angle in radians. Use `nn.degToRad()` to convert from degrees.' }
    ],
    returns: 'The canvas element.',
    example: `// setup canvas
const canvas = nn.create('canvas')
  .resize(nn.width, nn.height)
  .position(0, 0)
  .addTo('body')

// set intial state/settings
canvas.fillColor = 'rebeccapurple'
canvas.strokeColor = 'transparent'

// draw square at (10,10)
canvas.rect(10, 10, 100)

// Save the current state (color, rotation, etc)
canvas.save() // ...............................

// chnage that state before we draw next square
canvas.fillColor = 'coral'
canvas.globalAlpha = 0.5
const r = nn.degToRad(45)
canvas.rotate(r) // rotate by 45 degrees
canvas.rect(120, 10, 100)

// restore back to original state/settings
canvas.restore() // ............................

// then draw another rect with the
// restored state/settings
canvas.rect(230, 10, 100)`
  },

  {
    name: 'scale',
    source: { filepath: 'src/DOM/canvas.js', start: 564, end: 564 },
    signature: 'canvas.scale(x, y?)',
    description: 'Scales the canvas coordinate system by (`x`, `y`). If only one argument is given it scales uniformly in both axes. Scale values greater than `1` enlarge, values between `0` and `1` shrink, and negative values mirror. Always use inside a `save()`/`restore()` pair.',
    friendly: 'This method scales the canvas coordinate system up or down. A value of <code>1</code> is normal, <code>2</code> doubles the size, and <code>0.5</code> halves it. Use it inside a <code>.save()</code> / <code>.restore()</code> pair so only the shapes you want are affected.',
    params: [
      { name: 'x', description: 'The horizontal scale factor.' },
      { name: 'y', description: 'The vertical scale factor (optional, defaults to `x`).' }
    ],
    returns: 'The canvas element.',
    example: `// setup canvas
const canvas = nn.create('canvas')
  .resize(nn.width, nn.height)
  .position(0, 0)
  .addTo('body')

// set intial state/settings
canvas.fillColor = 'rebeccapurple'
canvas.strokeColor = 'transparent'

// draw square at (10,10)
canvas.rect(10, 10, 100)

// Save the current state (color, rotation, etc)
canvas.save() // ...............................

// chnage that state before we draw next square
canvas.fillColor = 'coral'
canvas.globalAlpha = 0.5
canvas.scale(0.5) // scale canvas down by 1/2
canvas.rect(120, 10, 100)

// restore back to original state/settings
canvas.restore() // ............................

// then draw another rect with the
// restored state/settings
canvas.rect(230, 10, 100)`
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ custom paths ~ ~ ~ ~ ~ ~ ~
  {
    name: 'beginPath',
    source: { filepath: 'src/DOM/canvas.js', start: 515, end: 515 },
    signature: 'canvas.beginPath()',
    description: 'Starts a new path, discarding any previously defined path. Use this to begin a custom shape made from `moveTo`, `lineTo`, `arc`, `bezierCurveTo`, etc. After defining all the points, call `canvas.fill()` and/or `canvas.stroke()` to render it, then optionally `closePath()` to connect the last point back to the first.',
    friendly: 'This method starts a new custom shape. After calling it, use methods like <code>.moveTo()</code>, <code>.lineTo()</code>, and <code>.arc()</code> to trace the outline, then call <code>.fill()</code> or <code>.stroke()</code> to actually draw it.',
    params: [],
    returns: 'The canvas element.',
    example: `// setup the canvas element
const canvas = nn.create('canvas')
  .resize(nn.width, nn.height)
  .position(0, 0)
  .addTo('body')

// coordinates for center of screen
const cx = nn.width / 2
const cy = nn.height / 2

// draw a custom star shape using beginPath
canvas.beginPath()
nn.times(10, i => {
  const r = i % 2 === 0 ? 100 : 40
  const angle = nn.degToRad(i * 36 - 90)
  const x = cx + r * Math.cos(angle)
  const y = cy + r * Math.sin(angle)
  if (i === 0) canvas.moveTo(x, y)
  else canvas.lineTo(x, y)
})
canvas.closePath()
canvas.fillColor = 'coral'
canvas.strokeColor = 'lavender'
canvas.lineWidth = 2
canvas.fill()
canvas.stroke()`
  },

  {
    name: 'arc',
    source: { filepath: 'src/DOM/canvas.js', start: 521, end: 521 },
    signature: 'canvas.arc(x, y, r, startAngle, endAngle, counterclockwise?)',
    description: 'Adds an arc to the current path centered at (`x`, `y`) with radius `r`, going from `startAngle` to `endAngle` (both in radians). Call inside a `beginPath()` block, then render with `fill()` or `stroke()`. Use with `moveTo()` and `lineTo()` to build pie slices or progress rings.',
    friendly: 'This method adds a curved arc to the current path, used inside a <code>.beginPath()</code> block. The first two numbers are the center position, the third is the radius, and the last two are the start and end angles in radians.',
    params: [
      { name: 'x', description: 'The x coordinate of the center.' },
      { name: 'y', description: 'The y coordinate of the center.' },
      { name: 'r', description: 'The radius.' },
      { name: 'startAngle', description: 'The start angle in radians.' },
      { name: 'endAngle', description: 'The end angle in radians.' },
      { name: 'counterclockwise', optional: true, description: '`true` to draw counter-clockwise (optional, defaults to `false`).' }
    ],
    returns: 'The canvas element.',
    example: `let canvas
let progress = 0

function setup () {
  // setup the canvas
  canvas = nn.create('canvas')
    .resize(nn.width, nn.height)
    .position(0, 0)
    .addTo('body')
}

function animate () {
  requestAnimationFrame(animate) // call again, ~60fps
  canvas.clear() // clear previous frame

  const cx = nn.width / 2
  const cy = nn.height / 2
  progress += 0.01
  // use modulo (%) to wrap back to 0
  // after one full revolution (2π radians)
  const end = progress % (Math.PI * 2)

  // track ring (full circle)
  canvas.beginPath()
  canvas.arc(cx, cy, 80, 0, Math.PI * 2)
  canvas.strokeColor = nn.rgb(255, 255, 255, 0.1)
  canvas.lineWidth = 12
  canvas.stroke()

  // progress arc
  canvas.beginPath()
  const r = 80
  const startAngle = -Math.PI / 2
  const endAngle = -Math.PI / 2 + end
  canvas.arc(cx, cy, r, startAngle, endAngle)
  canvas.strokeColor = 'coral'
  canvas.stroke()
}

// when the page loads, call setup and animate
nn.on('load', setup)
nn.on('load', animate)`
  },

  {
    name: 'bezierCurveTo',
    source: { filepath: 'src/DOM/canvas.js', start: 519, end: 519 },
    signature: 'canvas.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)',
    description: 'Adds a cubic [Bézier curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve) to the current path. The curve runs from the current pen position to (`x`, `y`), shaped by two control points (`cp1x`, `cp1y`) and (`cp2x`, `cp2y`). Call after `beginPath()` and `moveTo()`, then render with `fill()` or `stroke()`.',
    friendly: 'This method adds a smooth curved line to the current path. The last two numbers are the end point, and the first four are two "control points" that pull the curve toward them, shaping how it bends.',
    params: [
      { name: 'cp1x', description: 'The x coordinate of the first control point.' },
      { name: 'cp1y', description: 'The y coordinate of the first control point.' },
      { name: 'cp2x', description: 'The x coordinate of the second control point.' },
      { name: 'cp2y', description: 'The y coordinate of the second control point.' },
      { name: 'x', description: 'The x coordinate of the end point.' },
      { name: 'y', description: 'The y coordinate of the end point.' }
    ],
    returns: 'The canvas element.',
    example: `let canvas

function setup () {
  // setup the canvas
  canvas = nn.create('canvas')
    .resize(nn.width, nn.height)
    .position(0, 0)
    .addTo('body')
}

function update () {
  canvas.clear()

  const startX = 80
  const startY = nn.height / 2
  const endX = nn.width - 80
  const endY = nn.height / 2
  // control points follow the mouse
  const cp1x = nn.mouseX - 80
  const cp1y = nn.mouseY
  const cp2x = nn.mouseX + 80
  const cp2y = nn.mouseY

  canvas.beginPath()
  canvas.moveTo(startX, startY)
  canvas.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY)
  canvas.globalAlpha = 1
  canvas.strokeColor = 'coral'
  canvas.fillColor = 'transparent'
  canvas.lineWidth = 3
  canvas.stroke()

  // show control point handles
  canvas.globalAlpha = 0.5
  canvas.lineWidth = 1
  canvas.line(startX, startY, cp1x, cp1y)
  canvas.line(endX, endY, cp2x, cp2y)
}

// when page loads, run setup and update
nn.on('load', setup)
nn.on('load', update)
// then run update again everytime mouse moves
nn.on('mousemove', update)`
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ effects ~ ~ ~ ~ ~ ~ ~ ~
  {
    name: 'blendMode',
    source: { filepath: 'src/DOM/canvas.js', start: 148, end: 157 },
    signature: 'canvas.blendMode',
    description: 'A get/set property that maps to the canvas context\'s `globalCompositeOperation`. Controls how pixels of new drawing calls blend with pixels already on the canvas. Values include `\'source-over\'` (default), `\'source-in\'`, `\'source-out\'`, `\'source-atop\'`, `\'destination-over\'`, `\'destination-in\'`, `\'destination-out\'`, `\'destination-atop\'`, `\'lighter\'`, `\'copy\'`, `\'xor\'`, `\'multiply\'`, `\'screen\'`, `\'overlay\'`, `\'darken\'`, `\'lighten\'`, `\'color-dodge\'`, `\'color-burn\'`, `\'hard-light\'`, `\'soft-light\'`, `\'difference\'`, `\'exclusion\'`, `\'hue\'`, `\'saturation\'`, `\'color\'`, `\'luminosity\'`. Each mode produces a different mixing effect for overlapping shapes.',
    friendly: 'This property controls how newly drawn shapes blend with whatever is already on the canvas. For example, <code>\'multiply\'</code> darkens where shapes overlap, and <code>\'screen\'</code> lightens them.',
    params: [
      { name: 'value', description: "A composite operation string such as `'multiply'`, `'screen'`, `'overlay'`, `'difference'`, `'lighter'`, etc." }
    ],
    returns: 'The current blend mode string (on get).',
    example: `// setup the canvas element
const canvas = nn.create('canvas')
  .resize(nn.width, nn.height)
  .position(0, 0)
  .addTo('body')

const cx = nn.width / 2
const cy = nn.height / 2

// draw base shapes with default blending
canvas.strokeColor = 'transparent'
canvas.fillColor = 'coral'
canvas.circle(cx - 60, cy, 80)
canvas.fillColor = 'steelblue'
canvas.circle(cx + 60, cy, 80)

// draw a third shape with 'screen' blending
// the overlap becomes bright white
canvas.blendMode = 'screen'
// try changing this ^ to a different blend mode

canvas.fillColor = 'lavender'
canvas.circle(cx, cy - 50, 80)

// reset to default
canvas.blendMode = 'source-over'`
  },

  {
    name: 'globalAlpha',
    source: { filepath: 'src/DOM/canvas.js', start: 169, end: 172 },
    signature: 'canvas.globalAlpha',
    description: 'A get/set property that maps to the canvas context\'s `globalAlpha`. Sets the global opacity applied to all subsequent drawing calls, from `0` (fully transparent) to `1` (fully opaque, the default). This multiplies with any alpha already embedded in `fillColor` or `strokeColor`.',
    friendly: 'This property sets the global transparency for everything drawn after it is set. A value of <code>1</code> is fully visible and <code>0</code> is completely invisible.',
    params: [
      { name: 'value', description: 'A number from `0` to `1`.' }
    ],
    returns: 'The current global alpha number (on get).',
    example: `// setup the canvas
const canvas = nn.create('canvas')
  .resize(nn.width, nn.height)
  .position(0, 0)
  .addTo('body')

canvas.fillColor = 'coral'
canvas.globalAlpha = 1 // default
canvas.circle(100, 100, 50)

canvas.globalAlpha = 0.5
canvas.circle(150, 100, 50)

canvas.globalAlpha = 1
canvas.circle(200, 100, 50)`
  },

  {
    name: 'shadowBlur',
    source: { filepath: 'src/DOM/canvas.js', start: 179, end: 182 },
    signature: 'canvas.shadowBlur',
    description: 'A get/set property that maps to the canvas context\'s `shadowBlur`. Sets the blur radius of drop shadows applied to subsequent drawing calls. Must be used alongside `shadowColor` to see any effect. The related properties `shadowOffsetX` and `shadowOffsetY` shift the shadow position; they default to `0` (a centred glow). Set `shadowColor` back to `\'transparent\'` and `shadowBlur` back to `0` to disable shadows.',
    friendly: 'This property adds a glow or shadow to shapes drawn after it is set. You also need to set <code>canvas.shadowColor</code> for the effect to be visible, and you can use <code>canvas.shadowOffsetX</code> / <code>canvas.shadowOffsetY</code> to shift the shadow position.',
    params: [
      { name: 'value', description: 'A non-negative number for the blur radius in pixels.' }
    ],
    returns: 'The current shadow blur number (on get).',
    example: `// setup canvas
const canvas = nn.create('canvas')
  .resize(nn.width, nn.height)
  .position(0, 0)
  .addTo('body')

// draw purple background
canvas.strokeColor = 'transparent'
canvas.fillColor = 'rebeccapurple'
canvas.rect(0, 0, canvas.width, canvas.height)

// change fill color
canvas.fillColor = 'coral'
// glow effect: shadow matches fill color
canvas.shadowColor = 'coral'
canvas.shadowBlur = 30
canvas.shadowOffsetX = 0
canvas.shadowOffsetY = 0
// draw circle with glow
const cx = canvas.width / 2
const cy = canvas.height / 4
canvas.circle(cx, cy, 60)

// cast shadow: offset and dark color
canvas.shadowColor = nn.rgb(0, 0, 0, 0.6)
canvas.shadowBlur = 15
canvas.shadowOffsetX = 8
canvas.shadowOffsetY = 8
// draw square with shadow
canvas.fillColor = 'steelblue'
const x = canvas.width / 2 - 50
const y = canvas.height / 2 + 100
canvas.rect(x, y, 100)`
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ canvas utilities ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
  {
    name: 'clear',
    source: { filepath: 'src/DOM/canvas.js', start: 379, end: 388 },
    signature: 'canvas.clear()',
    description: 'Clears the entire canvas, erasing all drawn pixels. This is a common way to begin each frame of an animation, call `clear()` at the top of your animation loop before redrawing the scene.',
    friendly: 'This method erases everything on the canvas. It\'s typically called at the start of each animation frame to wipe the previous frame before drawing the new one.',
    params: [],
    returns: 'The cleared canvas element.',
    example: `let canvas
let x = 0

function setup () {
  // setup the canvas
  canvas = nn.create('canvas')
    .resize(nn.width, nn.height)
    .position(0, 0)
    .addTo('body')

  // set color properties
  canvas.fillColor = 'coral'
  canvas.strokeColor = 'transparent'
}

function animate () {
  requestAnimationFrame(animate) // call again, ~60fps
  // clear the previous frame before redrawing
  canvas.clear()
  // change x position by 2
  x += 2
  canvas.circle(x, nn.height / 2, 30)
  // reset x when circle goes off frame
  if (x > nn.width + 30) x = 0
}

// run setup and animate once the page has loaded
nn.on('load', setup)
nn.on('load', animate)`
  },

  {
    name: 'size',
    source: { filepath: 'src/DOM/canvas.js', start: 263, end: 320 },
    signature: 'canvas.size(width, height)',
    description: 'Sets the canvas drawing buffer to the given `width` and `height` in pixels, preserving the current drawing state (styles, transform). Without this call, a canvas defaults to 300×150 px. Use `canvas.size(nn.width, nn.height)` to create a full-page canvas. Returns the canvas element so it can be chained with `.addTo()`. Also available as `canvas.resize()` (alias).',
    friendly: 'This method sets how many pixels wide and tall the canvas drawing area is. Without calling it the canvas defaults to a small size, so use <code>.size(nn.width, nn.height)</code> to make it fill the whole window.',
    params: [
      { name: 'width', description: 'The width in pixels.' },
      { name: 'height', description: 'The height in pixels.' }
    ],
    returns: 'The canvas element.',
    example: `// create a full-page canvas in one line
const canvas = nn.create('canvas')
  .size(nn.width, nn.height)
  .position(0, 0)
  .addTo('body')

// adjust color settings
canvas.fillColor = 'coral'
canvas.strokeColor = 'transparent'

function draw () {
  canvas.clear()
  // set the canvas size before we draw
  canvas.size(nn.width, nn.height)
  // draw circle at center of canvas
  const cx = canvas.width / 2
  const cy = canvas.height / 2
  canvas.circle(cx, cy, 80)
}

// run draw as soon as the page loads
nn.on('load', draw)
// run draw again everytime page resizes
nn.on('resize', draw)`
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ pixel data ~ ~ ~ ~ ~ ~ ~ ~
  {
    name: 'getPixels',
    source: { filepath: 'src/DOM/canvas.js', start: 337, end: 345 },
    signature: 'canvas.getPixels(opts?)',
    description: 'Returns all pixel data for the entire canvas. By default returns an array of `{ r, g, b, a }` objects (one per pixel) so you can write `pixels[i].r = 128` directly. Pass `{ raw: true }` to get the underlying `Uint8ClampedArray` instead, where every four consecutive values represent one pixel (`[i]` = R, `[i+1]` = G, `[i+2]` = B, `[i+3]` = A). Use together with `setPixels()` to apply per-pixel effects.',
    friendly: 'This method returns all the pixel data on the canvas as an array, where each item has <code>r</code>, <code>g</code>, <code>b</code>, and <code>a</code> (red, green, blue, alpha) values. You can then modify those values and write them back using <code>.setPixels()</code>.',
    params: [
      { name: 'opts', optional: true, description: 'Options object. Set `raw: true` to return a flat `Uint8ClampedArray` instead of pixel objects.' }
    ],
    returns: 'An array of `{ r, g, b, a }` pixel objects by default, or a `Uint8ClampedArray` if `{ raw: true }` is passed.',
    example: `let canvas

function setup () {
  // create canvas element
  canvas = nn.create('canvas')
    .resize(nn.width, nn.height)
    .position(0, 0)
    .css('cursor', 'pointer')
    .addTo('body')

  // draw the image
  canvas.drawImage('chicago.jpg', 0, 0)
}

function invert () {
  // get all the pixels from the canvas
  let pixels = canvas.getPixels()
  // loop over the array
  for (let i = 0; i < pixels.length; i++) {
    // invert each channel's value
    pixels[i].r = 255 - pixels[i].r
    pixels[i].g = 255 - pixels[i].g
    pixels[i].b = 255 - pixels[i].b
  }
  // place modified pixels back in the canvas
  canvas.setPixels(pixels)
}

// run setup soon as the page loads
nn.on('load', setup)
// everytime we click on the screen invert again
nn.on('click', invert)`
  },

  {
    name: 'setPixels',
    source: { filepath: 'src/DOM/canvas.js', start: 347, end: 377 },
    signature: 'canvas.setPixels(pixelArray)',
    description: 'Writes modified pixel data back to the canvas. Accepts either an array of `{ r, g, b, a }` objects (matching the default output of `getPixels()`) or a flat `Uint8ClampedArray` (matching `getPixels({ raw: true })`), the format is detected automatically. Use together with `getPixels()` to apply per-pixel filters like grayscale, invert, or color tinting.',
    friendly: 'This method writes a modified pixel array back onto the canvas, making your changes visible. Use it together with <code>.getPixels()</code> to apply custom effects to every pixel.',
    params: [
      { name: 'pixelArray', description: 'Either an array of `{ r, g, b, a }` pixel objects (from `getPixels()`) or a flat `Uint8ClampedArray` (from `getPixels({ raw: true })`). The format is detected automatically.' }
    ],
    returns: 'The canvas element.',
    example: `let canvas

function setup () {
  // create canvas element
  canvas = nn.create('canvas')
    .resize(nn.width, nn.height)
    .position(0, 0)
    .css('cursor', 'pointer')
    .addTo('body')

  // draw the image
  canvas.drawImage('chicago.jpg', 0, 0)
}

function invert () {
  // get all the pixels from the canvas
  let pixels = canvas.getPixels()
  // loop over the array
  for (let i = 0; i < pixels.length; i++) {
    // invert each channel's value
    pixels[i].r = 255 - pixels[i].r
    pixels[i].g = 255 - pixels[i].g
    pixels[i].b = 255 - pixels[i].b
  }
  // place modified pixels back in the canvas
  canvas.setPixels(pixels)
}

// run setup soon as the page loads
nn.on('load', setup)
// everytime we click on the screen invert again
nn.on('click', invert)`
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ images & gradients ~ ~ ~ ~ ~ ~ ~ ~
  {
    name: 'drawImage',
    source: { filepath: 'src/DOM/canvas.js', start: 471, end: 511 },
    signature: 'canvas.drawImage(src, x, y, w?, h?)',
    description: 'Draws an image onto the canvas at (`x`, `y`). `src` can be a URL string (the library auto-creates an `Image` and waits for it to load), an `HTMLImageElement`, an `HTMLVideoElement`, or another `HTMLCanvasElement`. Pass optional `w` and `h` to scale the image, otherwise it is drawn at its natural size.',
    friendly: 'This method draws an image onto the canvas. The first argument is a URL string or an existing image element, the next two numbers set the position of its top-left corner, and the optional last two numbers set its width and height.',
    params: [
      { name: 'src', description: 'A URL string, `HTMLImageElement`, `HTMLVideoElement`, or `HTMLCanvasElement`.' },
      { name: 'x', description: 'The x coordinate of the top-left corner.' },
      { name: 'y', description: 'The y coordinate of the top-left corner.' },
      { name: 'w', optional: true, description: 'The draw width (optional).' },
      { name: 'h', optional: true, description: 'The draw height (optional).' }
    ],
    returns: 'The canvas element.',
    example: `// create canvas element
const canvas = nn.create('canvas')
  .resize(nn.width, nn.height)
  .position(0, 0)
  .addTo('body')

// draw the image
canvas.drawImage('chicago.jpg', 0, 0)`
  },

  {
    name: 'createLinearGradient',
    source: { filepath: 'src/DOM/canvas.js', start: 532, end: 532 },
    signature: 'canvas.createLinearGradient(x0, y0, x1, y1)',
    description: 'Creates a `CanvasGradient` object that transitions linearly from point (`x0`, `y0`) to (`x1`, `y1`). After calling this, add color stops with `.addColorStop(offset, color)` where `offset` is between `0` and `1`. Assign the gradient to `canvas.fillColor` (or `canvas.strokeColor`) and it will be used by the next draw call.',
    friendly: 'This method creates a gradient that fades from one color to another in a straight line. The four numbers define the start point (x, y) and end point (x, y) of the gradient. After creating it, add colors with <code>.addColorStop()</code> and assign it to <code>canvas.fillColor</code>.',
    params: [
      { name: 'x0', description: 'The x coordinate of the gradient start point.' },
      { name: 'y0', description: 'The y coordinate of the gradient start point.' },
      { name: 'x1', description: 'The x coordinate of the gradient end point.' },
      { name: 'y1', description: 'The y coordinate of the gradient end point.' }
    ],
    returns: 'A `CanvasGradient` object.',
    example: `// create canvas element
const canvas = nn.create('canvas')
  .resize(nn.width, nn.height)
  .position(0, 0)
  .addTo('body')

// create a top-to-bottom gradient
const grad = canvas.createLinearGradient(0, 0, 0, nn.height)
grad.addColorStop(0, 'rebeccapurple')
grad.addColorStop(0.5, 'steelblue')
grad.addColorStop(1, 'coral')

// assign gradient to fillColor then draw a rectangle
canvas.fillColor = grad
canvas.strokeColor = 'transparent'
canvas.rect(0, 0, nn.width, nn.height)`
  }
]

if (typeof module !== 'undefined') module.exports = CANVAS_DOCS
else window.CANVAS_DOCS = CANVAS_DOCS
