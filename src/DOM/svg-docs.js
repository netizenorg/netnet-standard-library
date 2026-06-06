const SVG_DOCS = [
  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ creating shapes ~ ~ ~ ~ ~ ~
  {
    name: 'circle',
    source: { filepath: 'src/DOM/svg.js', start: 628, end: 639 },
    signature: 'svg.circle(cx, cy, r)',
    description: 'Creates a `&lt;circle&gt;` SVG element, adds it to the SVG container, and returns it. The circle is defined by its center point (`cx`, `cy`) and radius (`r`). Returns the element so you can chain style methods onto it.',
    friendly: 'This method creates a circle in the SVG. The first two numbers set its center position, and the third sets its radius (half the total width).',
    params: [
      { name: 'cx', description: 'The x coordinate of the center.' },
      { name: 'cy', description: 'The y coordinate of the center.' },
      { name: 'r', description: 'The radius.' }
    ],
    returns: 'The created &lt;circle&gt;` element, augmented with all SVG helper methods.',
    example: `let svg, circ

function setup () {
  // setup page's background and remove any margin
  nn.get('body')
    .css('background', 'rebeccapurple')
    .css('margin', 0)

  // create <svg> element
  svg = nn.create('svg').addTo('body')

  // add circle to <svg> element
  const cx = nn.width / 2
  const cy = nn.height / 2
  circ = svg.circle(cx, cy, 80).fill('coral')
}

function update () {
  // update circle position to match mouse
  circ.x = nn.mouseX
  circ.y = nn.mouseY

  // alternatively, you could do this
  // circ.position(nn.mouseX, nn.mouseY)
}

nn.on('load', setup)
nn.on('mousemove', update)`
  },

  {
    name: 'rect',
    source: { filepath: 'src/DOM/svg.js', start: 656, end: 665 },
    signature: 'svg.rect(x, y, w, h)',
    description: 'Creates a `&lt;rect&gt;` SVG element, adds it to the container, and returns it. Positioned by its top-left corner (`x`, `y`) with the given `width` and `height`. Chain `.borderRadius()` to round the corners.',
    friendly: 'This method creates a rectangle in the SVG. The first two numbers set the position of its top-left corner, and the next two set its width and height.',
    params: [
      { name: 'x', description: 'The x coordinate of the top-left corner.' },
      { name: 'y', description: 'The y coordinate of the top-left corner.' },
      { name: 'w', description: 'The width.' },
      { name: 'h', description: 'The height (defaults to `w` if omitted).' }
    ],
    returns: 'The created `&lt;rect&gt;` element.',
    example: `// setup page's background and remove any margin
nn.get('body')
  .css('background', 'rebeccapurple')
  .css('margin', 0)
  .css('cursor', 'pointer')

// create <svg> element
const svg = nn.create('svg').addTo('body')

// the draw function
function draw () {
  // add a rectangel at random x,y coordinate
  const s = nn.random(100, 200)
  const x = nn.random(0, nn.width - s)
  const y = nn.random(nn.height - s)
  const o = nn.random(0.25, 0.5)
  svg.rect(x, y, s, s)
    .borderRadius(8)
    .fill('coral')
    .opacity(o)
}

// when the page loads, run  draw()
nn.on('load', draw)
// when the user clicks, run draw() again
nn.on('click', draw)`
  },

  {
    name: 'line',
    source: { filepath: 'src/DOM/svg.js', start: 667, end: 679 },
    signature: 'svg.line(x1, y1, x2, y2)',
    description: 'Creates a `&lt;line&gt;` SVG element from point (`x1`, `y1`) to (`x2`, `y2`), adds it to the container, and returns it. Lines have no fill. Use `.stroke()` and `.strokeWidth()` to style them.',
    friendly: 'This method creates a straight line in the SVG. The first two numbers are the starting point (x, y) and the last two are the ending point (x, y).',
    params: [
      { name: 'x1', description: 'The x coordinate of the start point.' },
      { name: 'y1', description: 'The y coordinate of the start point.' },
      { name: 'x2', description: 'The x coordinate of the end point.' },
      { name: 'y2', description: 'The y coordinate of the end point.' }
    ],
    returns: 'The created `&lt;line&gt;` element.',
    example: `let svg
const cx = nn.width / 2
const cy = nn.height / 2

function setup () {
  // create <svg> element
  svg = nn.create('svg').addTo('body')
  // setup page's background and remove any margin
  nn.get('body')
    .css('background', 'rebeccapurple')
    .css('margin', 0)
}

function update () {
  // get all the current lines
  const lines = nn.getAll('line')
  // if there are more than 40
  if (lines.length > 40) {
    // remove oldest line
    lines[0].remove()
  }
  // create a new line from the center of
  // the spage to the mouse's position
  svg.line(cx, cy, nn.mouseX, nn.mouseY)
    .stroke('coral')
    .strokeWidth(2)
}

// when the page loads, run setup()
nn.on('load', setup)
// when the mouse moves, run update()
nn.on('mousemove', update)`
  },

  {
    name: 'ellipse',
    source: { filepath: 'src/DOM/svg.js', start: 641, end: 654 },
    signature: 'svg.ellipse(cx, cy, rx, ry)',
    description: 'Creates an `&lt;ellipse&gt;` SVG element. Like a circle but with independent horizontal (`rx`) and vertical (`ry`) radius. If `ry` is omitted it defaults to `rx`, making a circle.',
    friendly: 'This method creates an oval in the SVG. The first two numbers set its center position, the third sets how wide it is (horizontal radius), and the fourth sets how tall it is (vertical radius).',
    params: [
      { name: 'cx', description: 'The x coordinate of the center.' },
      { name: 'cy', description: 'The y coordinate of the center.' },
      { name: 'rx', description: 'The horizontal radius.' },
      { name: 'ry', description: 'The vertical radius (optional, defaults to `rx`).' }
    ],
    returns: 'The created `&lt;ellipse&gt;` element.',
    example: `// global variables,
let svg, egg // accessible to all functions

function setup () {
  // setup page's background and remove any margin
  nn.get('body')
    .css('background', 'rebeccapurple')
    .css('margin', 0)

  // create <svg> element
  svg = nn.create('svg').addTo('body')
  // create an ellipse at center of page
  const x = nn.width / 2
  const y = nn.height / 2
  egg = svg.ellipse(x, y, 100, 50).fill('coral')
}

function update () {
  // center of the page
  const cx = nn.width / 2
  const cy = nn.height / 2
  // distance between mouse's x and center x
  const rx = nn.dist(nn.mouseX, cx)
  // distance between mouse's y and center y
  const ry = nn.dist(nn.mouseY, cy)
  // resize the cricle
  egg.size(rx, ry)
}

// when the page loads, run setup()
nn.on('load', setup)
// when the mouse moves, run update()
nn.on('mousemove', update)`
  },

  {
    name: 'path',
    source: { filepath: 'src/DOM/svg.js', start: 681, end: 690 },
    signature: 'svg.path(d)',
    description: 'Creates a `&lt;path&gt;` SVG element with the given path data string `d`, adds it to the container, and returns it. Path data uses SVG path commands: `M` (moveto), `L` (lineto), `C` (cubic curve), `A` (arc), `Z` (closepath), and more. This is the most flexible SVG shape because any shape can be described as a path.',
    friendly: 'This method creates a custom shape in the SVG from a path data string. The string is made up of commands like <code>M</code> (move to), <code>L</code> (line to), and <code>Z</code> (close path) that trace out any shape you want.',
    params: [
      { name: 'd', description: 'An SVG path data string.' }
    ],
    returns: 'The created `&lt;path&gt;` element.',
    example: `/// create <svg> element
const svg = nn.create('svg').addTo('body')

// SVG path for a heart, commands used:
// M=moveto, C=cubic-bezier, Z=closepath
const heart = \`M 100,180
C 60,140 20,100 20,60
C 20,30 50,20 100,70
C 150,20 180,30 180,60
C 180,100 140,140 100,180
Z\`

// create path from commands
svg.path(heart).fill('coral')

// other SVG path commadns include:
// M = moveto (starting point for path)
// L = lineto
// H = horizontal lineto
// V = vertical lineto
// C = curveto
// S = smooth curveto
// Q = quadratic Bézier curve
// T = smooth quadratic Bézier curveto
// A = elliptical Arc
// Z = closepath (close the path)

// setup page's background and remove any margin
nn.get('body')
  .css('background', 'rebeccapurple')
  .css('margin', 0)`
  },

  {
    name: 'polygon',
    source: { filepath: 'src/DOM/svg.js', start: 692, end: 706 },
    signature: 'svg.polygon(points)',
    description: 'Creates a `&lt;polygon&gt;` SVG element from a list of points. Automatically closes the shape (connects the last point back to the first). Pass either a points string like `"0,0 100,0 50,100"` or an array of `[x, y]` pairs.',
    friendly: 'This method creates a closed shape in the SVG from a list of corner points. You can pass a string like <code>\'0,0 100,0 50,100\'</code> or an array of <code>[x, y]</code> pairs, one per corner.',
    params: [
      { name: 'points', description: 'A points string or an array of `[x, y]` pairs.' }
    ],
    returns: 'The created `&lt;polygon&gt;` element.',
    example: `let svg, hex
let angle = 0
const cx = nn.width / 2
const cy = nn.height / 2
const r = 100

// hexagon algorithm
function makeHexPoints () {
  let pts = ''
  nn.times(6, i => {
    const a = nn.degToRad(i * 60)
    const x = cx + r * Math.cos(a)
    const y = cy + r * Math.sin(a)
    pts += \`\${x},\${y} \`
  })
  return pts // points string
}

function setup () {
  // setup page's background and remove any margin
  nn.get('body')
    .css('margin', 0)
    .css('background', 'rebeccapurple')
  // create <svg> element
  svg = nn.create('svg').addTo('body')
  // create a hexagon in the <svg>
  const points = makeHexPoints()
  hex = svg.polygon(points).fill('coral')
}

function animate () {
  requestAnimationFrame(animate) // call again, ~60fps
  angle++ // incremeant angle by 1
  hex.rotate(angle, cx, cy)
}

// when the page loads, run setup() and animate()
nn.on('load', setup)
nn.on('load', animate)`
  },

  {
    name: 'text',
    source: { filepath: 'src/DOM/svg.js', start: 724, end: 731 },
    signature: 'svg.text(str, x, y)',
    description: 'Creates an SVG `&lt;text&gt;` element with the given string, positioned at (`x`, `y`). Unlike HTML text, SVG text is a graphic element that can be transformed, styled with `.fill()` and `.stroke()`, and precisely positioned. Use `.textAlign()` and `.textBaseline()` to control alignment around the anchor point.',
    friendly: 'This method creates a text element in the SVG. The first argument is the text string, and the next two numbers are its x, y position.',
    params: [
      { name: 'str', description: 'The text string.' },
      { name: 'x', description: 'The x position (optional).' },
      { name: 'y', description: 'The y position (optional).' }
    ],
    returns: 'The created `&lt;text&gt;` element.',
    example: `let svg, label

function setup () {
  // setup page's background and remove any margin
  nn.get('body')
    .css('background', 'rebeccapurple')
    .css('margin', 0)

  // create <svg> element
  svg = nn.create('svg').addTo('body')
  // create text label
  const cx = nn.width / 2
  const cy = nn.height / 2
  label = svg.text('move your mouse', cx, cy)
    .fill('transparent')
    .stroke('coral')
    .textAlign('center')
    .textBaseline('middle')
    .set('cursor', 'grabbing')
    .set('font-size', 48)
    .set('font-weight', 'bold')
    .set('font-family', 'monospace')
}

function update () {
  const mx = Math.round(nn.mouseX)
  const my = Math.round(nn.mouseY)
  const msg = \`x: \${mx}, y: \${my}\`
  label.content(msg)
  label.x = nn.mouseX
  label.y = nn.mouseY
}
// when the page loads, run setup()
nn.on('load', setup)
// when the mouse moves, run update()
nn.on('mousemove', update)`
  },

  {
    name: 'group',
    source: { filepath: 'src/DOM/svg.js', start: 733, end: 737 },
    signature: 'svg.group()',
    description: 'Creates a `&lt;g&gt;` (group) SVG element, adds it to the container, and returns it. Groups let you treat multiple shapes as one unit, transforms and styles applied to the group affect all children. Groups also support the same factory methods as `&lt;svg&gt;`, so you can chain `.circle()`, `.rect()`, etc. directly on a group.',
    friendly: 'This method creates a group that can contain multiple shapes. Any transforms or styles applied to the group affect all the shapes inside it, so you can move or rotate them all at once.',
    params: [],
    returns: 'The created `&lt;g&gt;` element.',
    example: `let svg, groupA, groupB
let angleA = 0
let angleB = 0
const cx = nn.width / 2
const cy = nn.height / 2

function setup () {
  // create <svg> element
  svg = nn.create('svg').addTo('body')

  // group A: coral squares
  groupA = svg.group()
  nn.times(4, i => {
    const a = nn.degToRad(i * 90)
    const x = cx + 60 * Math.cos(a) - 20
    const y = cy + 60 * Math.sin(a) - 20
    groupA.rect(x, y, 40, 40).fill('coral')
  })

  // group B: white circles
  groupB = svg.group()
  nn.times(6, i => {
    const a = nn.degToRad(i * 60)
    const x = cx + 140 * Math.cos(a)
    const y = cy + 140 * Math.sin(a)
    groupB.circle(x, y, 16).fill('white')
  })

  // setup page's background and remove any margin
  nn.get('body')
    .css('background', 'rebeccapurple')
    .css('margin', 0)
}

function animate () {
  requestAnimationFrame(animate) // call again, ~60fps // call again, ~60fps
  angleA += 1
  angleB -= 0.5
  groupA.rotate(angleA, cx, cy)
  groupB.rotate(angleB, cx, cy)
}

// when the page loads, run setup() and animate()
nn.on('load', setup)
nn.on('load', animate)`
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ styling ~ ~ ~ ~ ~ ~ ~ ~
  {
    name: 'fill',
    source: { filepath: 'src/DOM/svg.js', start: 185, end: 192 },
    signature: 'shape.fill(color)',
    description: "Sets the `fill` attribute of an SVG element — the color that fills its interior. Accepts any CSS color string. Use `'none'` for transparent fill.",
    friendly: 'This method sets the fill color of an SVG shape. Pass any CSS color string, or <code>\'none\'</code> for no fill.',
    params: [
      { name: 'color', description: "A CSS color string, or `'none'`." }
    ],
    returns: 'The element.',
    example: `let circ

function setup () {
  // create <svg> element
  const svg = nn.create('svg').addTo('body')
  // create svg circle
  const x = nn.width / 2
  const y = nn.height / 2
  circ = svg.circle(x, y, 100)
    .fill('coral')
    .stroke('white')
    .strokeWidth(4)
    .set('cursor', 'pointer')

  // setup page's background and remove any margin
  nn.get('body')
    .css('background', 'rebeccapurple')
    .css('margin', 0)
}

function update () {
  // fill the circle with a random color
  const rc = nn.randomColor()
  circ.fill(rc)
  // update background with opposite color
  const { h, s, l } = nn.toHSL(rc)
  const oc = nn.hsl(360 - h, s, l)
  nn.get('body').css('background', oc)
}

// when the page loads, run setup()
nn.on('load', setup)
// when the user clicks, run update()
nn.on('click', update)`
  },

  {
    name: 'stroke',
    source: { filepath: 'src/DOM/svg.js', start: 194, end: 201 },
    signature: 'shape.stroke(color)',
    description: "Sets the `stroke` attribute, the color drawn along the element's outline. By default SVG elements have no stroke. Combine with `.strokeWidth()` to control thickness and `.strokeDash()` for dashed lines.",
    friendly: 'This method sets the outline color of an SVG shape. SVG elements have no outline by default, so you need to call this to make one appear.',
    params: [
      { name: 'color', description: 'A CSS color string.' }
    ],
    returns: 'The element.',
    example: `function setup () {
  // create <svg> element
  const svg = nn.create('svg').addTo('body')
  const cx = nn.width / 2
  const cy = nn.height / 2

  nn.times(5, i => {
    const o = nn.norm(i, 0, 5)
    svg.circle(cx, cy, i * 50)
      .fill('none')
      .stroke('coral')
      .strokeWidth(i * 2)
      .strokeDash(i * 10)
      .opacity(o)
  })

  // setup page's background and remove any margin
  nn.get('body')
    .css('background', 'rebeccapurple')
    .css('margin', 0)
}

function animate () {
  requestAnimationFrame(animate) // call again, ~60fps
  // animate all the circles
  nn.getAll('circle').forEach(circle => {
    // by adjusting their strokeOffset value
    const o = performance.now() * 0.05
    circle.strokeOffset(o)
  })
}

// when the page loads, run setup() and animate()
nn.on('load', setup)
nn.on('load', animate)`
  },

  {
    name: 'strokeWidth',
    source: { filepath: 'src/DOM/svg.js', start: 203, end: 210 },
    signature: 'shape.strokeWidth(n)',
    description: "Sets the `stroke-width` attribute, how thick the element's outline is, in SVG user units. Use alongside `.stroke()` which sets the color.",
    friendly: 'This method sets how thick the outline of a shape is. Use it together with <code>.stroke()</code> which sets the outline color.',
    params: [
      { name: 'n', description: 'The stroke width.' }
    ],
    returns: 'The element.',
    example: `function draw () {
  // create <svg> element
  const svg = nn.create('svg').addTo('body')

  const rows = 8
  const step = nn.height / rows
  nn.times(rows, i => {
    const y = step * i + step / 2
    svg.line(40, y, nn.width - 40, y)
      .stroke('coral')
      .strokeWidth(i + 1)
  })

  // setup page's background and remove any margin
  nn.get('body')
    .css('background', 'rebeccapurple')
    .css('margin', 0)
}

// when the page loads, run draw()
nn.on('load', draw)`
  },

  {
    name: 'strokeDash',
    source: { filepath: 'src/DOM/svg.js', start: 212, end: 221 },
    signature: 'shape.strokeDash(pattern)',
    description: 'Sets the `stroke-dasharray` attribute to make dashed or dotted outlines. Pass a number for a uniform dash-gap pattern, or an array of numbers to alternate between dash lengths and gap lengths, e.g. `[10, 5]` for 10px dashes with 5px gaps, or `[10, 5, 2, 5]` for a dash-dot pattern. Pair with `.strokeOffset()` to animate the dashes.',
    friendly: 'This method makes the outline of a shape dashed or dotted. Pass a single number for a simple dash, or an array of numbers to control the alternating dash and gap lengths, like <code>[10, 5]</code> for 10-unit dashes with 5-unit gaps.',
    params: [
      { name: 'pattern', description: 'A number or an array of numbers.' }
    ],
    returns: 'The element.',
    example: `let svg, ring
let offset = 0

function setup () {
  // create <svg> element
  svg = nn.create('svg').addTo('body')
  const x = nn.width / 2
  const y = nn.height / 2
  ring = svg.circle(x, y, 100)
    .fill('none')
    .stroke('coral')
    .strokeWidth(4)
    .strokeDash([20, 8, 2, 8])

  // setup page's background and remove any margin
  nn.get('body')
    .css('background', 'rebeccapurple')
    .css('margin', 0)
}

function animate () {
  requestAnimationFrame(animate) // call again, ~60fps
  offset = (offset - 1 + 1000) % 1000
  ring.strokeOffset(offset)
}

// when the page loads, run setup() and animate()
nn.on('load', setup)
nn.on('load', animate)`
  },

  {
    name: 'strokeOffset',
    source: { filepath: 'src/DOM/svg.js', start: 223, end: 230 },
    signature: 'shape.strokeOffset(n)',
    description: 'Sets the `stroke-dashoffset` attribute, which shifts the start position of the dash pattern along the stroke. Animating this value over time is the classic technique for making lines appear to draw themselves.',
    friendly: 'This method shifts the starting position of the dash pattern along the outline. Animating it over time creates the effect of a line drawing itself, which is a classic SVG animation trick.',
    params: [
      { name: 'n', description: 'The offset distance in SVG user units.' }
    ],
    returns: 'The element.',
    example: `let svg, path
let len, offset

function setup () {
  // setup page's background and remove any margin
  nn.get('body')
    .css('background', 'rebeccapurple')
    .css('margin', 0)

  // create <svg> element
  svg = nn.create('svg').addTo('body')
  // a curved path across the svg element
  const cx = nn.width / 2
  const cy = nn.height / 2
  const d = \`M \${cx - 200},\${cy} C \${cx - 100},\${cy - 150} \${cx + 100},\${cy + 150} \${cx + 200},\${cy}\`
  path = svg.path(d)
    .fill('none')
    .stroke('coral')
    .strokeWidth(4)

  // getTotalLength() gives the exact
  // pixel length of the path
  len = path.getTotalLength()
  offset = len
  // set the dash to the full length
  // so the whole stroke is one "dash"
  path.strokeDash(len).strokeOffset(offset)
}

function animate () {
  requestAnimationFrame(animate) // call again, ~60fps
  // count offset down to 0 to reveal the path
  offset -= 3

  // uncomment line below to stop once revealed
  // if (offset < 0) offset = 0

  path.strokeOffset(offset)
}

// when the page loads, run setup() and animate()
nn.on('load', setup)
nn.on('load', animate)`
  },

  {
    name: 'opacity',
    source: { filepath: 'src/DOM/svg.js', start: 232, end: 239 },
    signature: 'shape.opacity(n)',
    description: 'Sets the `opacity` attribute of the element, from `0` (fully transparent) to `1` (fully opaque).',
    friendly: 'This method sets how transparent the shape is. A value of <code>1</code> is fully visible and <code>0</code> is completely invisible.',
    params: [
      { name: 'n', description: 'A number from `0` to `1`.' }
    ],
    returns: 'The element.',
    example: `function draw () {
  // create <svg> element
  const svg = nn.create('svg').addTo('body')
  // center (x,y) of the screen
  const cx = nn.width / 2
  const cy = nn.height / 2
  // number of circles
  nn.times(8, i => {
    // create svg, with a radius of
    // 30x current index count
    svg.circle(cx, cy, i * 30)
      .fill('coral')
      .opacity(i * 0.04)
  })
  // setup page's background and remove any margin
  nn.get('body')
    .css('background', 'rebeccapurple')
    .css('margin', 0)
}

// run draw() when the page loads
nn.on('load', draw)`
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ layout ~ ~ ~ ~ ~ ~ ~ ~
  {
    name: 'position',
    source: { filepath: 'src/DOM/svg.js', start: 254, end: 299 },
    signature: 'shape.position(x, y, x2?, y2?)',
    description: 'Moves the SVG element to the given coordinates. The meaning of `x` and `y` depends on the element type: for circles and ellipses they set the center (`cx`/`cy`), for rects and text they set the top-left corner (`x`/`y`), for groups (`&lt;g&gt;`) they update the `translate()` transform. For `&lt;line&gt;` elements, `x` and `y` set the start point (`x1`/`y1`). Optionally pass `x2` and `y2` to also update the end point at the same time.',
    friendly: 'This method moves the SVG element to the given x, y coordinates. For circles and ellipses it moves the center, and for rectangles and text it moves the top-left corner.',
    params: [
      { name: 'x', description: 'The horizontal coordinate (or `x1` start point for lines).' },
      { name: 'y', description: 'The vertical coordinate (or `y1` start point for lines).' },
      { name: 'x2', description: '(lines only) Optional end point x coordinate.' },
      { name: 'y2', description: '(lines only) Optional end point y coordinate.' }
    ],
    returns: 'The element.',
    example: `let svg, dot

function setup () {
  // create <svg> element
  svg = nn.create('svg').addTo('body')
  // create a circle at center of page
  const x = nn.width / 2
  const y = nn.height / 2
  dot = svg.circle(x, y, 30)
    .fill('coral')
    .set('cursor', 'crosshair')

  // setup page's background and remove any margin
  nn.get('body')
    .css('background', 'rebeccapurple')
    .css('margin', 0)
    .css('cursor', 'cell')
}

function update () {
  // move the dot to the current mouse position
  dot.position(nn.mouseX, nn.mouseY)
}

// when the page loads, run setup
nn.on('load', setup)
// when the user clicks, run update
nn.on('click', update)`
  },

  {
    name: 'positionOrigin',
    source: { filepath: 'src/DOM/svg.js', start: 243, end: 250 },
    signature: 'shape.positionOrigin(type)',
    description: 'Changes how `.position(x, y)` interprets the coordinates for elements like `&lt;rect&gt;` and `&lt;text&gt;` where the natural origin is the top-left corner. With `positionOrigin(\'center\')`, calling `.position(x, y)` will center the element on that point instead. Has no effect on circles or ellipses since their position is always their center.',
    friendly: 'By default <code>.position(x, y)</code> places a rectangle or text element\'s top-left corner at those coordinates. Calling <code>.positionOrigin(\'center\')</code> first makes the coordinates point to the element\'s center instead.',
    params: [
      { name: 'type', description: "`'center'` or `'default'`." }
    ],
    returns: 'The element.',
    example: `let svg, box

function setup () {
  // create <svg> element
  svg = nn.create('svg').addTo('body')
  // create a <rect>
  box = svg.rect(0, 0, 80, 80)
    .fill('coral')
    .positionOrigin('center')
    // ^ comment above line out to see default

  // setup page's background and remove any margin
  nn.get('body')
    .css('background', 'rebeccapurple')
    .css('margin', 0)
}

function update () {
  // move the box to current mouse position
  box.position(nn.mouseX, nn.mouseY)
}

// the the page loads, call setup()
nn.on('load', setup)
// when the user clicks, call update()
nn.on('mousemove', update)`
  },

  {
    name: 'size',
    source: { filepath: 'src/DOM/svg.js', start: 377, end: 456 },
    signature: 'shape.size(...)',
    description: 'Resizes the element. The arguments depend on the element type: for a `&lt;circle&gt;`, pass a single radius `r`. For an `&lt;ellipse&gt;`, pass `rx` and `ry`. For a `&lt;rect&gt;` or the root `&lt;svg&gt;`, pass `width` and `height`. This is more readable than setting individual attributes with `.set()`.',
    friendly: 'This method resizes an SVG element. What you pass depends on the shape: for a circle pass a radius, for an ellipse pass horizontal and vertical radii, and for a rectangle pass width and height.',
    params: [
      { name: '...', description: 'Varies by element type (see description).' }
    ],
    returns: 'The element.',
    example: `let svg, circ
const cx = nn.width / 2
const cy = nn.height / 2

function setup () {
  // create <svg> element
  svg = nn.create('svg').addTo('body')
  // create circle inside <svg>
  circ = svg.circle(cx, cy, 50).fill('coral')

  // setup page's background and remove any margin
  nn.get('body')
    .css('background', 'rebeccapurple')
    .css('margin', 0)
}

function update () {
  // calculate distance between the mouse position
  // and te center of the screen.
  const d = nn.dist(cx, cy, nn.mouseX, nn.mouseY)
  // resize the circle, radius = d
  circ.size(d)
  // circ.set('r', d) // <- same as line above
}

// when the page loads, call setup()
nn.on('load', setup)
// when the mouse moves, call update()
nn.on('mousemove', update)`
  },

  {
    name: 'viewBox',
    source: { filepath: 'src/DOM/svg.js', start: 419, end: 430 },
    signature: 'svg.viewBox(x, y, w, h)',
    description: 'Sets the SVG `viewBox` attribute, which defines the internal coordinate system. By setting `viewBox(0, 0, 400, 400)` on an SVG that stretches to fill the page, all your shapes can use coordinates from 0–400 regardless of the actual window size. This makes responsive SVGs much easier to reason about.',
    friendly: 'This method sets the internal coordinate system of the SVG. For example, <code>svg.viewBox(0, 0, 100, 100)</code> lets you draw everything using 0 to 100 units regardless of the actual screen size.',
    params: [
      { name: 'x', description: 'The x coordinate of the top-left of the view.' },
      { name: 'y', description: 'The y coordinate of the top-left of the view.' },
      { name: 'w', description: 'The width of the coordinate space.' },
      { name: 'h', description: 'The height of the coordinate space.' }
    ],
    returns: 'The `&lt;svg&gt;` element.',
    example: `// create <svg> element
const svg = nn.create('svg').addTo('body')
// use a 100x100 coordinate space
svg.viewBox(0, 0, 100, 100)

// now positions/sizes work in 0-100 units
// regardless of actual screen size
svg.circle(50, 50, 30).fill('coral')
svg.rect(10, 10, 30, 30).fill('steelblue').opacity(0.7)
svg.line(0, 100, 100, 0).stroke('white').strokeWidth(0.5)

// setup page's background and remove any margin
nn.get('body')
  .css('background', 'rebeccapurple')
  .css('margin', 0)`
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ transforms ~ ~ ~ ~ ~ ~ ~
  {
    name: 'rotate',
    source: { filepath: 'src/DOM/svg.js', start: 312, end: 323 },
    signature: 'shape.rotate(deg, cx, cy)',
    description: 'Adds or updates a `rotate()` in the element\'s `transform` attribute. Unlike CSS transforms, SVG rotate takes an optional center point (`cx`, `cy`), without it the element rotates around the SVG origin (top-left). Pass the element\'s own center for in-place rotation.',
    friendly: 'This method rotates the SVG element by a given number of degrees. You can optionally pass a center x, y point to rotate around, otherwise it rotates around the top-left corner of the SVG.',
    params: [
      { name: 'deg', description: 'Degrees of rotation.' },
      { name: 'cx', description: 'Optional center x.' },
      { name: 'cy', description: 'Optional center y.' }
    ],
    returns: 'The element.',
    example: `let svg, arrow
const cx = nn.width / 2
const cy = nn.height / 2

function setup () {
  // create <svg> element
  svg = nn.create('svg').addTo('body')
  // a pointing-right arrow as a polygon
  arrow = svg.polygon([
    [cx + 80, cy],
    [cx - 40, cy - 40],
    [cx - 40, cy + 40]
  ]).fill('coral')

  // setup page's background and remove any margin
  nn.get('body')
    .css('background', 'rebeccapurple')
    .css('margin', 0)
}

function update () {
  // angle between center of screen and mouse
  const rad = nn.angleBtw(cx, cy, nn.mouseX, nn.mouseY)
  // convert radian to degrees
  const angle = nn.radToDeg(rad)
  // rotate arrow by that angle
  // (anchor rotation around center x/y of screen)
  arrow.rotate(angle, cx, cy)
}

// when page loads, run setup()
nn.on('load', setup)
// when mouse moves, run update()
nn.on('mousemove', update)`
  },

  {
    name: 'scale',
    source: { filepath: 'src/DOM/svg.js', start: 325, end: 333 },
    signature: 'shape.scale(x, y)',
    description: 'Adds or updates a `scale()` in the element\'s `transform` attribute. If only one argument is passed, scales uniformly in both axes. Note that SVG `scale()` scales around the SVG origin (top-left corner) by default. To scale around an element\'s center, combine with `.translate()`.',
    friendly: 'This method scales the SVG element up or down. A value of <code>1</code> is normal, <code>2</code> doubles the size, and <code>0.5</code> halves it.',
    params: [
      { name: 'x', description: 'The horizontal scale factor.' },
      { name: 'y', description: 'The vertical scale factor (optional, defaults to `x`).' }
    ],
    returns: 'The element.',
    example: `let svg, box
const cx = nn.width / 2
const cy = nn.height / 2

function setup () {
  // create <svg> element
  svg = nn.create('svg').addTo('body')
  // rect centered at its own origin (0,0)
  // because it's position has been
  // translated to the screen's center
  box = svg.rect(-50, -50, 100, 100)
    .translate(cx, cy)
    .fill('coral')

  // setup page's background and remove any margin
  nn.get('body')
    .css('background', 'rebeccapurple')
    .css('margin', 0)
}

function update () {
  // calculate distance between
  // the mouse and center of screen
  const d = nn.dist(cx, cy, nn.mouseX, nn.mouseY)
  // map that distance to a scale factor (0.1 – 3)
  const s = nn.map(d, 0, 300, 0.1, 3)
  // scale the box uniformly
  box.scale(s)
}

// when the page loads, call setup()
nn.on('load', setup)
// when the mouse moves, call update()
nn.on('mousemove', update)`
  },

  {
    name: 'translate',
    source: { filepath: 'src/DOM/svg.js', start: 303, end: 310 },
    signature: 'shape.translate(x, y)',
    description: 'Adds or updates a `translate()` in the element\'s `transform` attribute, shifting the element by the given offset. Similar to  `.position()`, except translate is an additive offset layered on top of the element\'s existing coordinates. Particularly useful for grouping transforms, e.g. translate to a center, then rotate, then scale.',
    friendly: 'This method shifts the element by a given x, y offset on top of its existing position. It\'s especially useful with groups, where you translate the whole group to a center point and then rotate everything around it.',
    params: [
      { name: 'x', description: 'The horizontal offset.' },
      { name: 'y', description: 'The vertical offset.' }
    ],
    returns: 'The element.',
    example: `let svg, group
let angle = 0

function setup () {
  // create <svg> element
  svg = nn.create('svg').addTo('body')

  // create a group translated to the
  // center of the screen. shapes inside are
  // positioned relative to 0,0 (the group's
  // origin), so translating the group moves
  // everything together.
  const cx = nn.width / 2
  const cy = nn.height / 2
  group = svg.group().translate(cx, cy)

  // add shapes relative to the group's origin (0,0)
  group.rect(-100, -10, 200, 20).fill('coral')
  group.circle(0, 0, 12).fill('white')

  // setup page's background and remove any margin
  nn.get('body')
    .css('background', 'rebeccapurple')
    .css('margin', 0)
}

function animate () {
  requestAnimationFrame(animate) // call again, ~60fps

  angle++ // incremeant angle by 1

  // rotate the group around its own origin
  group.rotate(angle)
}

// when the page loads, call setup()
nn.on('load', setup)
// when the page loads, start animating
nn.on('load', animate)`
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ text ~ ~ ~ ~ ~ ~ ~ ~ ~
  {
    name: 'textAlign',
    source: { filepath: 'src/DOM/svg.js', start: 338, end: 349 },
    signature: 'textEl.textAlign(val)',
    description: 'Sets the SVG `text-anchor` attribute, which controls how the text is aligned horizontally around its `x` position. Accepts both CSS-style values (`\'left\'`, `\'center\'`, `\'right\'`) and native SVG values (`\'start\'`, `\'middle\'`, `\'end\'`). Only applies to `&lt;text&gt;` and `&lt;tspan&gt;` elements.',
    friendly: 'This method controls how the SVG text is horizontally aligned relative to its x position. For example, <code>\'center\'</code> means the x coordinate lands at the middle of the text.',
    params: [
      { name: 'val', description: "`'left'`/`'start'`, `'center'`/`'middle'`, or `'right'`/`'end'`." }
    ],
    returns: 'The element.',
    example: `function setup () {
  // create <svg> element
  const svg = nn.create('svg').addTo('body')
  // x coordinate of center of screen
  const cx = nn.width / 2

  // draw a vertical guide line through the center
  const fadedWhite = nn.rgb(255, 255, 255, 0.2)
  svg.line(cx, 0, cx, nn.height)
    .stroke(fadedWhite)
    .strokeWidth(1)

  // three labels all anchored to the same x (center),
  // but each aligned differently around that point
  const labels = [
    {
      y: nn.height * 0.25,
      align: 'left'
    },
    {
      y: nn.height * 0.5,
      align: 'center'
    },
    {
      y: nn.height * 0.75,
      align: 'right'
    }
  ]

  // create <text> for each label data object
  labels.forEach(({ text, y, align }) => {
    svg.text(align, cx, y)
      .fill('coral')
      .textAlign(align)
      .textBaseline('middle')
      .set('font-size', 24)
      .set('font-family', 'monospace')
  })

  // setup page's background and remove any margin
  nn.get('body')
    .css('background', 'rebeccapurple')
    .css('margin', 0)
}

// when the page loads, call setup()
nn.on('load', setup)`
  },

  {
    name: 'textBaseline',
    source: { filepath: 'src/DOM/svg.js', start: 351, end: 362 },
    signature: 'textEl.textBaseline(val)',
    description: "Sets the SVG `dominant-baseline` attribute, which controls how the text is aligned vertically around its `y` position. Accepts both canvas-style values (`'top'`, `'middle'`, `'bottom'`, `'alphabetic'`) and SVG values. Only applies to `&lt;text&gt;` and `&lt;tspan&gt;` elements.",
    friendly: 'This method controls how the SVG text is vertically aligned relative to its y position. For example, <code>\'middle\'</code> means the y coordinate lands at the vertical center of the text.',
    params: [
      { name: 'val', description: "`'top'`, `'middle'`, `'bottom'`, `'alphabetic'`, `'hanging'`, or `'ideographic'`." }
    ],
    returns: 'The element.',
    example: `function setup () {
  // create <svg> element
  const svg = nn.create('svg').addTo('body')
  // y coordinate of center of screen
  const cy = nn.height / 2

  // draw a horizontal guide line through the center
  const fadedWhite = nn.rgb(255, 255, 255, 0.2)
  svg.line(0, cy, nn.width, cy)
    .stroke(fadedWhite)
    .strokeWidth(1)

  // three labels all anchored to the same y (center),
  // but each aligned differently around that point
  const labels = [
    {
      x: nn.width * 0.2,
      baseline: 'top'
    },
    {
      x: nn.width * 0.5,
      baseline: 'middle'
    },
    {
      x: nn.width * 0.8,
      baseline: 'bottom'
    }
  ]

  // create <text> for each label dta object
  labels.forEach(({ text, x, baseline }) => {
    svg.text(baseline, x, cy)
      .fill('coral')
      .textAlign('center')
      .textBaseline(baseline)
      .set('font-size', 28)
      .set('font-family', 'monospace')
  })

  // setup page's background and remove any margin
  nn.get('body')
    .css('background', 'rebeccapurple')
    .css('margin', 0)
}

// when the page loads, call setup()
nn.on('load', setup)`
  }
]

if (typeof module !== 'undefined') module.exports = SVG_DOCS
else window.SVG_DOCS = SVG_DOCS
