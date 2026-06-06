const MATHS_DOCS = [
  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ core math ~ ~ ~ ~ ~ ~ ~ ~ ~
  {
    name: 'lerp',
    source: { filepath: 'src/Maths/Maths.js', start: 6, end: 6 },
    signature: 'nn.lerp(a, b, t)',
    description: 'Linear interpolation between two values. `t` is a blend factor from `0` to `1`. At `0` you get `a`, at `1` you get `b`, and anywhere in between gives a proportional blend. A simple but useful method for a variety of tasks like smooth hover effects, scroll-driven animations, parallax scrolling, shape morphing, smooth camera following, pitch bends, sensor data smoothing and motion tracking.',
    friendly: 'This method smoothly blends between two values. The third argument <code>t</code> controls how far along you are: <code>0</code> gives the first value, <code>1</code> gives the second, and anything in between gives a proportional mix. It\'s great for making things follow the mouse smoothly.',
    params: [
      { name: 'a', description: 'The start value.' },
      { name: 'b', description: 'The end value.' },
      { name: 't', description: 'Blend factor, `0`–`1`.' }
    ],
    returns: 'The interpolated value between `a` and `b`.',
    example: `// box smoothly follows mouse
let box
let bx = 0
let by = nn.height / 2

function setup () {
  // setup page's background and remove any margin
  nn.get('body')
    .css('background', 'rebeccapurple')
    .css('margin', 0)

  // create <svg> element with a <rect>
  const svg = nn.create('svg').addTo('body')
  box = svg.rect(bx, by, 40, 40).fill('coral')
}

// smoothly update box X position to match mouse X
function animate () {
  // recursively call animate (~60 fps)
  requestAnimationFrame(animate)
  // here we lerp the box's x position
  bx = nn.lerp(bx, nn.mouseX, 0.1)
  box.position(bx, by)
}

nn.on('load', setup)
nn.on('load', animate)`
  },

  {
    name: 'norm',
    source: { filepath: 'src/Maths/Maths.js', start: 2, end: 2 },
    signature: 'nn.norm(value, min, max)',
    description: 'This method normalizes a value from a given range (`min`, `max`) into a `0`–`1` proportion. This inverse of `lerp`, which takes a `0`–`1` value and maps it into a range. Normalizing is a very common first step when repurposing values from one context into another',
    friendly: 'This method tells you where a value falls within a range, expressed as a number between <code>0</code> and <code>1</code>. For example, if your range is 0 to 200 and your value is 100, it returns <code>0.5</code> because 100 is halfway through.',
    params: [
      { name: 'value', description: 'The value to normalize.' },
      { name: 'min', description: 'The lower bound of the input range.' },
      { name: 'max', description: 'The upper bound of the input range.' }
    ],
    returns: 'A number between `0` and `1` representing where `value` falls in the range.',
    example: `function renderNorm () {
  // norm turns mouseX into a value between 0-1
  const v = nn.norm(nn.mouseX, 0, nn.width)

  const val = v.toFixed(3) // 3 decimals
  nn.get('body').content(val).css({
    background: 'rebeccapurple',
    color: 'lavender',
    opacity: v,
    fontSize: '30vmin',
    fontFamily: 'monospace',
    textAlign: 'center'
  })

  if (v >= 0.995) {
    nn.get('body').css('background', 'coral')
  }
}

nn.on('load', renderNorm)
nn.on('mousemove', renderNorm)`
  },

  {
    name: 'clamp',
    source: { filepath: 'src/Maths/Maths.js', start: 4, end: 4 },
    signature: 'nn.clamp(value, min, max)',
    description: 'Constrains a value so it never falls outside a given range. If `value` is below `min` it returns `min`, if above `max` it returns `max`, otherwise it returns `value` unchanged. A simple but essential guard when values need to stay within bounds.',
    friendly: 'This method keeps a value within a minimum and maximum limit. If the value goes too low it gets pinned to the minimum, and if it goes too high it gets pinned to the maximum, so it can never escape the range you set.',
    params: [
      { name: 'value', description: 'The value to constrain.' },
      { name: 'min', description: 'The minimum allowed value.' },
      { name: 'max', description: 'The maximum allowed value.' }
    ],
    returns: 'The clamped value, guaranteed to be within `[min, max]`.',
    example: `// the box follows the mouse
// but stays between the margins
const m = 80

// setup page's background and remove any margin
nn.get('body')
  .css('background', 'rebeccapurple')
  .css('margin', 0)

// create <svg> element
const svg = nn.create('svg').addTo('body')
// add a <rect> at its center
const bx = nn.width / 2
const by = nn.height / 2
const box = svg.rect(bx, by, 40, 40).fill('coral')
// add two margin <line>
svg.line(m, 0, m, nn.height).stroke('coral')
const m2 = nn.width - m
svg.line(m2, 0, m2, nn.height).stroke('coral')


// update box's position when mouse moves
// clamping it to min/max margin values
function update () {
  const min = m + box.width / 2
  const max = nn.width - m - box.width / 2
  const x = nn.clamp(nn.mouseX, min, max)
  box.position(x - 20, by)
}

nn.on('mousemove', update)`
  },

  {
    name: 'map',
    source: { filepath: 'src/Maths/Maths.js', start: 10, end: 12 },
    signature: 'nn.map(value, sourceMin, sourceMax, destMin, destMax)',
    description: 'Re-maps a value from one range to another. Under the hood it normalizes the value within the source range and then scales it into the destination range. Useful any time you need to translate a value from one context into a completely different scale.',
    friendly: 'This method converts a value from one range into a corresponding value in a different range. For example, you can map the mouse\'s X position (0 to page width) to a color hue (0 to 360), so moving the mouse all the way across changes the full spectrum of colors.',
    params: [
      { name: 'value', description: 'The value to re-map.' },
      { name: 'sourceMin', description: 'The lower bound of the input range.' },
      { name: 'sourceMax', description: 'The upper bound of the input range.' },
      { name: 'destMin', description: 'The lower bound of the output range.' },
      { name: 'destMax', description: 'The upper bound of the output range.' }
    ],
    returns: 'The value re-mapped into the destination range.',
    example: `function update () {
  // map the mouse's X position,
  // (min is 0, max is the page's width)
  // to a full color hue range, 0-360
  const hue = nn.map(nn.mouseX, 0, nn.width, 0, 360)
  const bg = nn.hsl(hue, 70, 50)
  nn.get('body')
    .transition('background', 200)
    .css('background', bg)
}

nn.on('mousemove', update)`
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ geometry ~ ~ ~ ~ ~ ~ ~ ~ ~

  {
    name: 'dist',
    source: { filepath: 'src/Maths/Maths.js', start: 14, end: 19 },
    signature: 'nn.dist(p1x, p1y, p2x?, p2y?)',
    description: 'Calculates the [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance) between two 2D points using the Pythagorean theorem. Useful for proximity checks, collision detection, or scaling anything based on how far apart two things are. When called with only two arguments, returns the 1D distance (absolute difference) between the two values — equivalent to `Math.abs(a - b)`.',
    friendly: 'This method calculates the straight-line distance between two points on screen. You pass in the x and y coordinates of both points, and it returns how many pixels apart they are.',
    params: [
      { name: 'p1x', description: 'X coordinate of the first point. When using the 2-argument form, the first of the two values.' },
      { name: 'p1y', description: 'Y coordinate of the first point. When using the 2-argument form, the second of the two values.' },
      { name: 'p2x', description: 'X coordinate of the second point (optional).' },
      { name: 'p2y', description: 'Y coordinate of the second point (optional).' }
    ],
    returns: 'The distance between the two points in the same units as the coordinates.',
    example: `// create purple circle in <html>
// for a similar example using <svg> check
// out the svg circle and ellipse examples
const circ = nn.create('div')
  .addTo('body')
  .size(200)
  .css({
    background: 'coral',
    borderRadius: '50%'
  })

// center of page
const cx = nn.width / 2
const cy = nn.height / 2
circ.positionOrigin('center')
circ.position(cx, cy)

function update () {
  // calculate distance from the mouse
  // to the center of the page
  const d = nn.dist(cx, cy, nn.mouseX, nn.mouseY)
  // use it to resize the circle
  circ.size(d * 2)
  circ.positionOrigin('center')
  circ.position(cx, cy)
}

nn.get('body').css({
  background: 'rebeccapurple',
  overflow: 'hidden'
})

nn.on('mousemove', update)`
  },

  {
    name: 'angleBtw',
    source: { filepath: 'src/Maths/Maths.js', start: 21, end: 23 },
    signature: 'nn.angleBtw(p1x, p1y, p2x, p2y)',
    description: 'Returns the angle (in radians) from point 1 to point 2, measured from the positive X axis. Useful for pointing sprites, rotating arrows, or any time you need to orient one thing toward another.',
    friendly: 'This method calculates the angle between two points, which tells you what direction point 2 is from point 1. It\'s useful for rotating an arrow or sprite so it always faces the mouse or another element.',
    params: [
      { name: 'p1x', description: 'X coordinate of the origin point.' },
      { name: 'p1y', description: 'Y coordinate of the origin point.' },
      { name: 'p2x', description: 'X coordinate of the target point.' },
      { name: 'p2y', description: 'Y coordinate of the target point.' }
    ],
    returns: 'The angle in radians from point 1 to point 2, in the range `-π` to `π`.',
    example: `// for a similar example using <svg> check
// out the svg rotate() example
const arrow = nn.create('div')
  .content('→')
  .addTo('body')
  .css({
    userSelect: 'none',
    fontSize: 150,
    color: 'coral'
  })

// position arrow at center of screen
const cx = nn.width / 2
const cy = nn.height / 2
arrow.positionOrigin('center')
arrow.position(cx, cy)

function update () {
  const mx = nn.mouseX
  const my = nn.mouseY
  // calculte angle between mouse position
  // and the center of the screen
  const angle = nn.angleBtw(cx, cy, mx, my)
  // convert radians to degrees
  const deg = nn.radToDeg(angle)
  // rotate the arrow by that amount
  arrow.rotate(deg)
}

nn.on('mousemove', update)
nn.get('body').css('background', 'rebeccapurple')`
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ conversions ~ ~ ~ ~ ~ ~ ~ ~

  {
    name: 'radToDeg',
    source: { filepath: 'src/Maths/Maths.js', start: 29, end: 31 },
    signature: 'nn.radToDeg(radians)',
    description: 'Converts an angle from radians to degrees. JavaScript\'s trigonometric functions (`Math.atan2`, `Math.sin`, `Math.cos`) all work in radians, but degrees are often more intuitive when working with CSS transforms or displaying values to users.',
    friendly: 'This method converts an angle from radians into degrees. JavaScript\'s math functions work in radians, but degrees (0–360) are usually easier to think about, so use this to convert when you need a human-readable angle.',
    params: [
      { name: 'radians', description: 'An angle in radians.' }
    ],
    returns: 'The equivalent angle in degrees.',
    example: `let svg, line, readout
const cx = nn.width / 2
const cy = nn.height / 2

function setup () {
  // setup page's background and remove any margin
  nn.get('body')
    .css('background', 'rebeccapurple')
    .css('margin', 0)

  // create <svg> element
  svg = nn.create('svg').addTo('body')

  // faint crosshairs to mark the origin
  const fade = nn.rgb(255, 255, 255, 0.15)
  svg.line(cx, 0, cx, nn.height)
    .stroke(fade)
    .strokeWidth(1)
  svg.line(0, cy, nn.width, cy)
    .stroke(fade)
    .strokeWidth(1)

  // a line from the center outward
  line = svg.line(cx, cy, cx + 150, cy)
    .stroke('coral')
    .strokeWidth(2)

  // text readout showing the conversion
  readout = svg.text('move your mouse', cx, cy - 24)
    .fill('white')
    .textAlign('center')
    .textBaseline('middle')
    .set('font-size', 18)
    .set('font-family', 'monospace')
}

function update () {
  // get the angle from center to mouse in radians
  const rad = nn.angleBtw(cx, cy, nn.mouseX, nn.mouseY)
  // convert radians to degrees
  const deg = nn.radToDeg(rad)
  // update line to point at the mouse
  line.position(cx, cy, nn.mouseX, nn.mouseY)
  // display both values above center
  readout.content(\`\${rad.toFixed(3)} ㎭ = \${deg.toFixed(1)}°\`)
}

// when the page loads, call setup()
nn.on('load', setup)
// when the mouse moves, call update()
nn.on('mousemove', update)`
  },

  {
    name: 'degToRad',
    source: { filepath: 'src/Maths/Maths.js', start: 33, end: 35 },
    signature: 'nn.degToRad(degrees)',
    description: 'Converts an angle from degrees to radians. Use this when you\'re thinking in degrees (e.g. rotating 45°) but need radians for a canvas, WebGL, or trig function.',
    friendly: 'This method converts an angle from degrees into radians. When you want to use <code>Math.sin()</code> or <code>Math.cos()</code> with a human-friendly degree value like 90°, pass it through this first.',
    params: [
      { name: 'degrees', description: 'An angle in degrees.' }
    ],
    returns: 'The equivalent angle in radians.',
    example: `let svg
const cx = nn.width / 2
const cy = nn.height / 2

function setup () {
  // setup page's background and remove any margin
  nn.get('body')
    .css('background', 'rebeccapurple')
    .css('margin', 0)
  // create <svg> element
  svg = nn.create('svg').addTo('body')
  draw(8)
}

function draw (n) {
  svg.content(null) // clear previous shapes
  const r = 150 // radius (circle's size)
  nn.times(n, i => {
    // sometimes it's easier to think in terms
    // of degrees, for example we can divide
    // 360° into n equal slices
    const deg = i * (360 / n)
    // then convert those to radians
    // which is required by Math.cos / Math.sin
    const rad = nn.degToRad(deg)
    const x = cx + r * Math.cos(rad)
    const y = cy + r * Math.sin(rad)
    svg.circle(x, y, 14).fill('coral')
  })
}

function update () {
  // map mouse X to a dot count between 3 and 20
  let n = nn.map(nn.mouseX, 0, nn.width, 3, 20)
  n = Math.round(n)
  draw(n)
}

// when the page loads, call setup()
nn.on('load', setup)
// when the mouse moves, call update()
nn.on('mousemove', update)`
  },

  {
    name: 'cartesianToPolar',
    source: { filepath: 'src/Maths/Maths.js', start: 37, end: 42 },
    signature: 'nn.cartesianToPolar(x, y)',
    description: 'Converts a 2D point from Cartesian coordinates (x, y) to polar coordinates (distance from origin, angle). Returns both the angle in radians and in degrees. Useful when you want to reason about a point in terms of its distance and direction from a center.',
    friendly: 'This method converts an (x, y) position into a distance and angle measured from the origin. Instead of thinking "how far right and down is this point?", polar coordinates let you think "how far away is it, and in what direction?"',
    params: [
      { name: 'x', description: 'The x offset from the origin.' },
      { name: 'y', description: 'The y offset from the origin.' }
    ],
    returns: 'An object `{ distance, radians, degrees }` describing the point in polar form.',
    example: `let svg, line, distLabel, angleLabel
const cx = nn.width / 2
const cy = nn.height / 2

function setup () {
  // setup page's background and remove any margin
  nn.get('body')
    .css('background', 'rebeccapurple')
    .css('margin', 0)

  // create <svg> element
  svg = nn.create('svg').addTo('body')

  // faint crosshairs to mark the cartesian origin
  const fade = nn.rgb(255, 255, 255, 0.15)
  svg.line(cx, 0, cx, nn.height)
    .stroke(fade)
    .strokeWidth(1)
  svg.line(0, cy, nn.width, cy)
    .stroke(fade)
    .strokeWidth(1)

  // line from origin to mouse,
  // this is in cartesian coordinates
  line = svg.line(cx, cy, cx, cy)
    .stroke('coral')
    .strokeWidth(2)

  // labels to show the polar output near the cursor
  distLabel = svg.text('', 0, 0)
    .fill('white')
    .set('font-size', 16)
    .set('font-family', 'monospace')
  angleLabel = svg.text('', 0, 0)
    .fill('coral')
    .set('font-size', 16)
    .set('font-family', 'monospace')
}

function update () {
  // cartesian offset from the center to the mouse
  const dx = nn.mouseX - cx
  const dy = nn.mouseY - cy
  // convert to polar coordinates
  const p = nn.cartesianToPolar(dx, dy)
  // draw the line from center to mouse
  line.position(cx, cy, nn.mouseX, nn.mouseY)
  // show the polar values next to the cursor
  distLabel
    .content(\`dist: \${Math.round(p.distance)}px\`)
    .position(nn.mouseX + 14, nn.mouseY - 6)
  angleLabel
    .content(\`angle: \${Math.round(p.degrees)}°\`)
    .position(nn.mouseX + 14, nn.mouseY + 18)
}

// when the page loads, call setup()
nn.on('load', setup)
// when the mouse moves, call update()
nn.on('mousemove', update)`
  },

  {
    name: 'polarToCartesian',
    source: { filepath: 'src/Maths/Maths.js', start: 44, end: 48 },
    signature: 'nn.polarToCartesian(distance, angle)',
    description: 'Converts polar coordinates (a distance and an angle in radians) back to a Cartesian `{x, y}` point. Useful for placing elements in a circle, drawing clock hands, laying out radial UI, or anything that needs to position things at a given angle and radius from a center.',
    friendly: 'This method converts a distance and angle into an (x, y) position. It\'s the key to placing things in a circle: give it a radius and an angle, and it tells you exactly where on screen that point should be.',
    params: [
      { name: 'distance', description: 'The radius — distance from the origin.' },
      { name: 'angle', description: 'The angle in radians.' }
    ],
    returns: 'An object `{ x, y }` with the Cartesian coordinates.',
    example: `let svg, dots
const cx = nn.width / 2
const cy = nn.height / 2
const N = 12

function setup () {
  // setup page's background and remove any margin
  nn.get('body')
    .css('background', 'rebeccapurple')
    .css('margin', 0)

  // create <svg> element
  svg = nn.create('svg').addTo('body')

  // pre-create N circles — we'll reposition them in update()
  dots = []
  nn.times(N, () => {
    dots.push(svg.circle(cx, cy, 12).fill('coral'))
  })

  positionDots(150)
}

function positionDots (r) {
  nn.times(N, i => {
    // spread N dots evenly around 360°
    const angle = nn.degToRad(i * (360 / N))
    // polar → cartesian converts radius + angle to an x,y offset
    const { x, y } = nn.polarToCartesian(r, angle)
    dots[i].position(cx + x, cy + y)
  })
}

function update () {
  // use the mouse's distance from center as the orbit radius
  const r = nn.dist(cx, cy, nn.mouseX, nn.mouseY)
  positionDots(r)
}

// when the page loads, call setup()
nn.on('load', setup)
// when the mouse moves, call update()
nn.on('mousemove', update)`
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ randomness ~ ~ ~ ~ ~ ~ ~ ~

  {
    name: 'shuffle',
    source: { filepath: 'src/Maths/Maths.js', start: 54, end: 63 },
    signature: 'nn.shuffle(arr)',
    description: 'Randomly shuffles the items in an array in-place using the [Fisher-Yates](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle) algorithm and returns the same array. Note: this mutates the original array.',
    friendly: 'This method randomly reorders the items in an array, like shuffling a deck of cards. It changes the original array directly and returns it so you can use it right away.',
    params: [
      { name: 'arr', description: 'The array to shuffle.' }
    ],
    returns: 'The same array, shuffled in-place.',
    example: `const colors = ['red', 'orange', 'gold', 'steelblue', 'mediumseagreen', 'mediumpurple']

// setup page styles
nn.get('body').css({
  display: 'flex',
  height: '100vh',
  margin: 0,
  cursor: 'pointer'
})

function draw () {
  // clear the page
  nn.get('body').content('')
  // shuffle the colors array, then draw one <div>
  // per color as a full-height stripe
  nn.shuffle(colors).forEach(color => {
    nn.create('div')
      .css({ background: color, flex: 1 })
      .addTo('body')
  })
}

// when the page loads, call draw()
nn.on('load', draw)
// when the user clicks, call draw() again
nn.on('click', draw)`
  },

  {
    name: 'randomInt',
    source: { filepath: 'src/Maths/Maths.js', start: 65, end: 68 },
    signature: 'nn.randomInt(min, max)',
    description: 'Returns a random integer within a range, inclusive of both endpoints. If only one argument is passed it is treated as `max` and `min` defaults to `0`.',
    friendly: 'This method returns a random whole number between a minimum and maximum value, including both endpoints. For example, <code>nn.randomInt(1, 6)</code> simulates rolling a six-sided die.',
    params: [
      { name: 'min', description: 'The minimum value (inclusive). When called with one argument, this is treated as `max` and `min` becomes `0`.' },
      { name: 'max', optional: true, description: 'The maximum value (inclusive).' }
    ],
    returns: 'A random integer between `min` and `max`, inclusive.',
    example: `// click to roll a 6-sided die
function roll () {
  const n = nn.randomInt(1, 6)
  nn.get('body')
    .content('rolled: ' + n)
    .css({
      background: 'rebeccapurple',
      color: 'white',
      fontSize: 80,
      cursor: 'pointer',
      userSelect: 'none'
    })
}

// when the page loads, call roll()
nn.on('load', roll)
// when the user clicks, call roll() again
nn.on('click', roll)`
  },

  {
    name: 'randomFloat',
    source: { filepath: 'src/Maths/Maths.js', start: 70, end: 73 },
    signature: 'nn.randomFloat(min, max)',
    description: 'Returns a random floating-point (decimal) number within a range. If only one argument is passed it is treated as `max` and `min` defaults to `0`. Unlike `randomInt`, the result is never rounded.',
    friendly: 'This method returns a random decimal number between a minimum and maximum value. Unlike <code>nn.randomInt()</code>, the result is not rounded, so you get values like <code>0.732</code> or <code>3.14</code>, which is useful for things like random opacity or scale.',
    params: [
      { name: 'min', description: 'The minimum value. When called with one argument, this is treated as `max` and `min` becomes `0`.' },
      { name: 'max', optional: true, description: 'The maximum value.' }
    ],
    returns: 'A random float between `min` (inclusive) and `max` (exclusive).',
    example: `// click to generate a random opacity
function update () {
  const alpha = nn.randomFloat(0.1, 1)
  const color = nn.rgb(80, 140, 220, alpha)
  nn.get('body')
    .content('alpha: ' + alpha.toFixed(3))
    .css({
      background: color,
      color: 'white',
      fontSize: 50,
      cursor: 'pointer',
      userSelect: 'none'
    })
}

// when the page loads, call update()
nn.on('load', update)
// when the user clicks, call update() again
nn.on('click', update)`
  },

  {
    name: 'random',
    source: { filepath: 'src/Maths/Maths.js', start: 75, end: 129 },
    signature: 'nn.random(val, val2)',
    description: 'A flexible random utility that adapts to what you pass it. With no arguments it returns a float between `0` and `1`. With one number it returns a float between `0` and that number. With two numbers it returns a float in that range. Pass an array to get a random element from it. Pass a string with multiple words to get a random word; pass a single word to get a random character from it.',
    friendly: 'This is a flexible all-in-one random method. Pass two numbers to get a random number in that range, pass an array to get a random item from it, or pass a string to get a random word or character from it.',
    params: [
      { name: 'val', optional: true, description: 'A number (max), an array to pick from, or a string to pick from.' },
      { name: 'val2', optional: true, description: 'When `val` is a number, this is the max and `val` becomes the min.' }
    ],
    returns: 'A random number, array element, word, or character depending on the arguments.',
    example: `const dice = '⚀⚁⚂⚃⚄⚅'
const colors = ['coral', 'steelblue', 'mediumseagreen', 'mediumpurple']

// setup page styles
  nn.get('body')
    .css({
      color: 'white',
      cursor: 'pointer',
      userSelect: 'none',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    })

// update the page's color, content and size
function update () {
  // choose a random color from the array
  const bg = nn.random(colors)
  // choose a random character fro the string
  const di = nn.random(dice)
  // choose a random number between 40 - 120
  const size = nn.random(40, 120)
  // use random values to update the page
  nn.get('body')
    .content(di)
    .css('background', bg)
    .css('font-size', size)
}

// when the page loads, call update()
nn.on('load', update)
// when the user clicks, call update() again
nn.on('click', update)`
  },

  {
    name: 'perlin',
    source: { filepath: 'src/Maths/Maths.js', start: 131, end: 176 },
    signature: 'nn.perlin()',
    description: 'Returns a Perlin noise object that generates smooth, organic-looking random values. Unlike pure `nn.random()`, consecutive Perlin values flow gradually rather than jumping erratically. Call `perlin()` once and store the result, then calling it repeatedly creates separate independent noise fields, which is useful if you need uncorrelated noise for x and y separately. Call `.get(x)` for 1D noise or `.get(x, y)` for 2D noise; values range from approximately `-1` to `1`. Call `.seed()` to reset the noise field to a fresh random pattern.',
    friendly: 'This method creates a Perlin noise generator, which produces random values that flow smoothly from one to the next rather than jumping around unpredictably. It\'s great for natural-looking motion, terrain, or textures.',
    params: [],
    returns: 'A Perlin noise object with `.get(x, y)` and `.seed()` methods.',
    example: `// create a couple of <canvas> elements
// one for white noise (totally random)
// and the other for perlin noise
const s = nn.width / 2.125
const wcanv = nn.create('canvas')
    .css('border', '1px solid white')
    .resize(s, s)
    .addTo('body')
const pcanv = nn.create('canvas')
    .css('border', '1px solid black')
    .resize(s, s)
    .addTo('body')

// two functions to visualize the noise
// fields, one totally random (white noise)
// the other a perlin noise field

function drawWhiteNoise () {
  // make sure rects have no outline
  wcanv.strokeStyle = 'transparent'
  // loop through every pixel on the canvas
  // starting with all the columns
  for (let x = 0; x < wcanv.width; x++) {
    // and for each, going thorugh every row
    for (let y = 0; y < wcanv.height; y++) {
      // choose a random grey-scale value
      // and create a single pixel at the
      // current location (row,column)
      const v = nn.random(255)
      wcanv.fillStyle = nn.rgb(v, v, v)
      wcanv.rect(x, y, 1, 1)
    }
  }
}

function drawPerlinNoise () {
  // make sure rects have no outline
  pcanv.strokeStyle = 'transparent'
  // crate perlin noise object
  const p = nn.perlin()
  // loop through every pixel on the canvas
  // starting with all the columns
  for (let x = 0; x < pcanv.width; x++) {
    for (let y = 0; y < pcanv.height; y++) {
      // sample the perlin value at the give
      // x,y coordinate (scale by 0.02)
      const s = 0.02
      const n = p.get(x * s, y * s)
      // map perlin value (-1,1) to a
      // color range value (0,255)
      // before drawing that single pixel
      const v = nn.map(n, -1, 1, 0, 255)
      pcanv.fillStyle = nn.rgb(v, v, v)
      pcanv.rect(x, y, 1, 1)
    }
  }
}

// animate a circle moving in each canvas
// one using random motion, the other perlin.

// we'll start by creating objects to track
// each circle's x,y position.
const wc = { x: wcanv.width / 2, y : wcanv.height / 2 }
const pc = { x: pcanv.width / 2, y : pcanv.height / 2 }
const p = nn.perlin()

function animate () {
  requestAnimationFrame(animate) // call again, ~60fps
  // reset colors
  wcanv.fillStyle = pcanv.fillStyle = 'white'
  wcanv.strokeStyle = pcanv.strokeStyle = 'black'

  // move wc completely random directionn
  wc.x += nn.random(-2, 2)
  wc.y += nn.random(-2, 2)
  wcanv.circle(wc.x, wc.y, 10)

  // t (for tick) increments slowly
  const t = performance.now() * 0.001
  const r = pcanv.width // radius of motion
  // move pc in a smooth perlin direction
  let x = p.get(t, 0) * r + pc.x
  let y = p.get(0, t) * r + pc.y
  pcanv.circle(x, y, 10)
}


// call all the functions soon as the page loads
nn.on('load', drawWhiteNoise)
nn.on('load', drawPerlinNoise)
nn.on('load', animate)`
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ easing ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  {
    name: 'ease',
    source: { filepath: 'src/Maths/Maths.js', start: 147, end: 299 },
    signature: 'nn.ease(type, t)',
    description: 'Applies an easing curve to a linear `t` value (`0`–`1`), returning a transformed value that accelerates, decelerates, or overshoots in a characteristic way. Easing makes animations feel physical rather than mechanical. The `type` string is the easing name, available families: `Quad`, `Cubic`, `Quart`, `Quint`, `Sine`, `Circ`, `Elastic`, `Expo`, `Back`, `Bounce`, each with `In`, `Out`, and `InOut` variants.',
    friendly: 'This method shapes how an animation progresses over time, making it feel more natural instead of moving at a constant speed. You pass a progress value between <code>0</code> and <code>1</code> and an easing type like <code>\'OutBounce\'</code> or <code>\'InOutCubic\'</code>, and it returns a transformed value that speeds up, slows down, or bounces.',
    params: [
      { name: 'type', description: 'The easing type string, e.g. `"InOutCubic"`, `"OutBounce"`, `"InElastic"`. See [easings.net](https://easings.net) for a visual reference.' },
      { name: 't', description: 'A linear progress value from `0` to `1`.' }
    ],
    returns: 'The eased output value, typically in the range `0`–`1` (some types like `Elastic` and `Back` overshoot slightly).',
    example: `let svg, box
const size = 40
// bounce from near the top to near the bottom
const from = size
const to = nn.height - size * 2
let t = 0

function setup () {
  nn.get('body')
    .css('background', 'rebeccapurple')
    .css('margin', 0)

  svg = nn.create('svg').addTo('body')

  // center the box horizontally
  const x = nn.width / 2 - size / 2
  box = svg.rect(x, from, size, size).fill('coral')
}

function animate () {
  requestAnimationFrame(animate)
  t = (t + 0.008) % 1
  // try swapping 'OutBounce' with other types!
  const eased = nn.ease('OutBounce', t)
  box.position(box.x, nn.lerp(from, to, eased))
}

nn.on('load', setup)
nn.on('load', animate)`
  }
]

if (typeof module !== 'undefined') module.exports = MATHS_DOCS
else window.MATHS_DOCS = MATHS_DOCS
