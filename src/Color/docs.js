const COLOR_DOCS = [
  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ making color strings ~ ~ ~ ~

  {
    name: 'randomColor',
    source: { filepath: 'src/Color/Color.js', start: 407, end: 440 },
    signature: 'nn.randomColor(type, alpha)',
    description: 'Generates a random color string. With no arguments it returns a random hex color like `\'#a3f2c1\'`. You can pass a `type` string to get a different format, and an `alpha` value to include transparency.',
    friendly: 'This method generates a random color every time you call it. With no arguments it returns a hex color string like <code>#a3f2c1</code>, which you can use as a color value anywhere in your code.',
    params: [
      { name: 'type', optional: true, description: 'The color format to return: `"hex"`, `"rgb"`, `"rgba"`, `"hsl"`, or `"hsla"`. Defaults to `"hex"`.' },
      { name: 'alpha', optional: true, description: 'A float between `0` and `1` to set a specific opacity, or `true` to use a random opacity.' }
    ],
    returns: 'A [CSS color](https://www.w3schools.com/colors/default.asp) string.',
    example: `// create a random color
const rc = nn.randomColor()
// apply it to the page's background
nn.get('body').css('background', rc)`
  },

  {
    name: 'rgb',
    source: { filepath: 'main.js', start: 1247, end: 1257 },
    signature: 'nn.rgb(r, g, b, alpha)',
    description: 'Builds a CSS `rgb()` or `rgba()` color string from individual channel values. The most fundamental way to create a color in code is by combining red, green, and blue each range from `0` (none) to `255` (max), these are the primary colors (of light). Pass an optional `alpha` float to get an `rgba()` string with transparency.',
    friendly: 'This method creates a color by mixing red, green, and blue values, each ranging from 0 to 255. For example, <code>nn.rgb(255, 0, 0)</code> is pure red. You can add a fourth number between 0 and 1 to control transparency, where 0 is invisible and 1 is fully opaque.',
    params: [
      { name: 'r', description: 'Red channel, `0–255`.' },
      { name: 'g', description: 'Green channel, `0–255`.' },
      { name: 'b', description: 'Blue channel, `0–255`.' },
      { name: 'alpha', optional: true, description: 'Opacity, `0.0–1.0`.' }
    ],
    returns: 'A CSS `rgb()` or `rgba()` color string.',
    example: `// a couple of colors
const blueGreen = nn.rgb(87, 193, 173)
const midGrey = nn.rgb(68, 64, 67)

// render the rgb value as text
// color the text blue-green, and background grey
nn.create('section')
  .content(blueGreen)
  .css('color', blueGreen)
  .css('background', midGrey)
  .css('font-size', 60)
  .addTo('body')`
  },

  {
    name: 'hex',
    source: { filepath: 'src/Color/Color.js', start: 73, end: 81 },
    signature: 'nn.hex(r, g, b, alpha)',
    description: 'Builds a hex color string like `\'#ff0000\'` from r, g, b channel values (0–255). Pass an optional alpha (0.0–1.0) to get an 8-digit hex with embedded transparency like `\'#ff00007f\'` .',
    friendly: 'This method creates a color from red, green, and blue values, each ranging from 0 to 255, and returns it as a hex string like <code>#ff0000</code>. You can add a fourth number between 0 and 1 to control transparency, where 0 is invisible and 1 is fully opaque.',
    params: [
      { name: 'r', description: 'Red channel, `0–255`.' },
      { name: 'g', description: 'Green channel, `0–255`.' },
      { name: 'b', description: 'Blue channel, `0–255`.' },
      { name: 'alpha', optional: true, description: 'Alpha value `0.0–1.0`' }
    ],
    returns: 'A [CSS hex color](https://www.w3schools.com/colors/colors_hexadecimal.asp) string.',
    example: `// a couple of colors
const blueGreen = nn.hex(87, 193, 173)
const midGrey = nn.hex(68, 64, 67)

// render the hex value as text
// color the text blue-green, and background grey
nn.create('section')
  .content(blueGreen)
  .css('color', blueGreen)
  .css('background', midGrey)
  .css('font-size', 60)
  .addTo('body')`
  },

  {
    name: 'hsl',
    source: { filepath: 'main.js', start: 1288, end: 1298 },
    signature: 'nn.hsl(h, s, l, alpha)',
    description: 'Builds a CSS `hsl()` or `hsla()` color string from hue, saturation, and lightness values. HSL is often more intuitive than RGB for creative work — hue is the color\'s position on the color wheel (`0–360`), saturation controls how vivid it is, and lightness how bright.',
    friendly: 'This method creates a color using hue (0–360, the position on the color wheel), saturation (0–100, how vivid), and lightness (0–100, where 0 is black, 100 is white, and 50 is the pure color). You can add a fourth number between 0 and 1 to control transparency.',
    params: [
      { name: 'h', description: 'Hue, `0–360`. Red is `0` (and `360`), green is `120`, blue is `240`.' },
      { name: 's', description: 'Saturation, `0–100`. `0` is grey, `100` is fully vivid.' },
      { name: 'l', description: 'Lightness, `0–100`. `0` is black, `100` is white, `50` is the pure color.' },
      { name: 'alpha', optional: true, description: 'Opacity, `0.0–1.0`. When provided, returns `hsla()` instead of `hsl()`.' }
    ],
    returns: 'A CSS `hsl()` or `hsla()` color string.',
    example: `// a couple of colors
const blueGreen = nn.hsl(169, 46, 55)
const midGrey = nn.hsl(315, 3, 26)

// render the hsl value as text
// color the text blue-green, and background grey
nn.create('section')
  .content(blueGreen)
  .css('color', blueGreen)
  .css('background', midGrey)
  .css('font-size', 60)
  .addTo('body')`
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ converting formats ~ ~ ~ ~ ~

  {
    name: 'toRGB',
    source: { filepath: 'src/Color/Color.js', start: 312, end: 340 },
    signature: 'nn.toRGB(value)',
    description: 'Converts any color to an `{r, g, b}` object with channels in the `0–255` range. Accepts hex strings, CSS named colors like `"coral"`, `rgb()` and `hsl()` CSS strings, `{r,g,b}` and `{h,s,l}` objects, and a bare hue number. Useful when you need to modify a specific channel from a color.',
    friendly: 'This method converts any color value into an object with separate red, green, and blue properties. It\'s useful when you want to read or modify a specific channel of a color, no matter what format the color started in.',
    params: [
      { name: 'value', description: 'Any color value: a hex string, a CSS named color, a CSS color string, an `{r,g,b}` or `{h,s,l}` object, or a hue number.' }
    ],
    returns: 'An object `{ r, g, b }` with channels in the range `0–255`.',
    example: `const { r, g, b } = nn.toRGB('steelblue')

const message = \`r,g,b values for "steelblue" are \${r}, \${g}, \${b}\`

nn.get('body')
  .css('font-size', 32)
  .css('color', 'steelblue')
  .css('background', 'white')
  .content(message)`
  },

  {
    name: 'toHex',
    source: { filepath: 'src/Color/Color.js', start: 305, end: 309 },
    signature: 'nn.toHex(value)',
    description: 'Converts any color to a hex string like `#ff0000`. Accepts hex strings (returned as-is), CSS named colors like `"coral"`, `rgb()` and `hsl()` CSS strings, `{r,g,b}` and `{h,s,l}` objects, and a bare hue number. Useful when you need a consistent format regardless of how the color was originally expressed.',
    friendly: 'This method converts any color value into a hex string. It\'s useful when you have a color in one format (like a named color or an rgb string) and need it as a hex value to use somewhere else.',
    params: [
      { name: 'value', description: 'Any color value: a hex string, a CSS named color, a CSS color string, an `{r,g,b}` or `{h,s,l}` object, or a hue number.' }
    ],
    returns: 'A hex color string like `#ff0000`.',
    example: `const r1 = nn.toHex('red')
const r2 = nn.toHex('rgb(255, 0, 0)')
const r3 = nn.toHex({ h: 0, s: 100, l: 50 })

const message = \`\${r1} is \${r2} is \${r3}\`

nn.get('body')
  .css('font-size', 32)
  .css('background', 'black')
  .css('color', r1)
  .content(message)`
  },

  {
    name: 'toHSL',
    source: { filepath: 'src/Color/Color.js', start: 256, end: 302 },
    signature: 'nn.toHSL(value)',
    description: 'Converts any color to an `{h, s, l}` object. Hue is `0–360`, saturation and lightness are `0–100`. Accepts the same wide range of inputs as `toHex` and `toRGB`. Useful when you want to adjust a color (for example, shift its hue or dial back its saturation) without having to know what format it started in.',
    friendly: 'This method converts any color value into an object with separate hue, saturation, and lightness properties. It\'s handy when you want to tweak a color, like shifting its hue or making it less vivid, without caring what format it started in.',
    params: [
      { name: 'value', description: 'Any color value: a hex string, a CSS named color, a CSS color string, an `{r,g,b}` or `{h,s,l}` object, or a hue number.' }
    ],
    returns: 'An object `{ h, s, l }` with h in `0–360` and s, l in `0–100`.',
    example: `// break out the hsl components of "tomato"
const { h, s, l } = nn.toHSL('tomato')

// function to add colored text to page
function addSection (message, color) {
  nn.create('section')
    .css('color', color)
    .content(message)
    .addTo('body')
}

// use the h,s,l values to create new colors
const c1 = nn.hsl(h, s, l)
addSection('tomato hue', c1)

const c2 = nn.hsl(h + 90, s, l)
addSection('tomato hue + 90deg', c2)

const c3 = nn.hsl(h + 180, s, l)
addSection('tomato hue + 180deg', c3)

nn.get('body')
  .css('background', 'white')
  .css('font-size', 40)`
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ alpha utilities ~ ~ ~ ~ ~ ~

  {
    name: 'alpha2hex',
    source: { filepath: 'src/Color/Color.js', start: 4, end: 9 },
    signature: 'nn.alpha2hex(alpha)',
    description: 'Converts an alpha transparency value (`0.0–1.0`) to a two-character hex byte string. This is the byte you append to a 6-digit hex color to make it 8 digits with embedded transparency. For example `#ff0000` + `"7f"` → `#ff00007f` (50% transparent red).',
    friendly: 'This method converts a transparency value (between 0 and 1) into the two-character code you can tack onto the end of a hex color to make it transparent. For example, appending the result to <code>#ff0000</code> gives you a semi-transparent red.',
    params: [
      { name: 'alpha', description: 'A float from `0.0` (fully transparent) to `1.0` (fully opaque).' }
    ],
    returns: 'A two-character hex string, e.g. `"ff"`, `"7f"`, `"00"`.',
    example: `const color = '#ffffff'
nn.get('body').css('background', color)

function fade () {
  const alpha = this.value // slider's value
  const hexByte = nn.alpha2hex(alpha)
  const fadedColor = color + hexByte
  nn.get('body').css('background', fadedColor)
}

// create a slider which adjusts the transparency
// of the page's background color
nn.create('input')
  .set({ type: 'range', min: 0, max: 1, step: 0.01 })
  .on('input', fade)
  .addTo('body')`
  },

  {
    name: 'hex2alpha',
    source: { filepath: 'src/Color/Color.js', start: 11, end: 14 },
    signature: 'nn.hex2alpha(hex)',
    description: 'The reverse of `alpha2hex`, converts a two-character hex byte string back to an alpha float between `0.0` and `1.0`. Useful when reading an 8-digit hex color and you want to extract the transparency as a usable number.',
    friendly: 'This is the reverse of <code>nn.alpha2hex()</code>. It converts the two-character transparency code at the end of a hex color back into a number between 0 and 1 that you can use in your code.',
    params: [
      { name: 'hex', description: 'A two-character hex byte string, e.g. `"7F"` or `"ff"`.' }
    ],
    returns: 'A float from `0.0` to `1.0`.',
    example: `const hexColor = '#3a86ff7f'
const hexByte = hexColor.slice(7)  // '7f'
const alpha = nn.hex2alpha(hexByte) // 0.5

// use same alpha value from hexColor
const color = nn.rgb(58, 134, 255, alpha)
nn.get('body').css('background', color)`
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ interpolation ~ ~ ~ ~ ~ ~ ~

  {
    name: 'lerpColor',
    source: { filepath: 'src/Color/Color.js', start: 344, end: 356 },
    signature: 'nn.lerpColor(a, b, t)',
    description: 'Smoothly blends between two colors. `t` is a value from `0` to `1` — at `0` you get color `a`, at `1` you get color `b`, and anywhere in between gives you a blend. Interpolation happens in HSL space along the shortest hue path, which tends to produce more natural-looking transitions than blending in RGB.',
    friendly: 'This method smoothly blends between two colors, just like <code>nn.lerp()</code> does for numbers. The third argument controls how far along the blend you are: 0 gives the first color, 1 gives the second, and anything in between gives a mix.',
    params: [
      { name: 'a', description: 'The start color (any format accepted by `toHSL`).' },
      { name: 'b', description: 'The end color (any format accepted by `toHSL`).' },
      { name: 't', description: 'A float from `0` to `1` controlling how far along the blend you are.' }
    ],
    returns: 'A hex color string representing the blended color.',
    example: `function colorShift () {
  // map the mouse's x position to 0-1 range
  const n = nn.map(nn.mouseX, 0, nn.width, 0, 1)
  // use the new n value to lerp between colors
  const c = nn.lerpColor('red', 'blue', n)
  // apply new color to page's background
  nn.get('body').css('background', c)
}

// move your mouse over the rendered output
nn.on('mousemove', colorShift)`
  },

  {
    name: 'colorGradient',
    source: { filepath: 'src/Color/Color.js', start: 358, end: 387 },
    signature: 'nn.colorGradient(colors, stepsOrDirection)',
    description: 'Creates a multi-stop gradient from an array of two or more colors. Pass a number as the second argument to get an array of interpolated color steps (useful for animation or data viz). Pass a CSS direction string to get a ready-to-use CSS gradient string, the type is inferred automatically: strings like `"to right"` or `"135deg"` produce a `linear-gradient()`, shape/size keywords like `"circle"`, `"farthest-corner"`, or `"at 40px 40px"` produce a `radial-gradient()`, and strings starting with `"from"` produce a `conic-gradient()`.',
    friendly: 'This method creates a gradient from an array of colors. Pass a direction string like <code>\'to right\'</code> to get a CSS gradient you can use as a background, or pass a number to get an array of color steps you can animate through one by one.',
    params: [
      { name: 'colors', description: 'An array of at least two colors (any format accepted by `toHex`).' },
      { name: 'stepsOrDirection', description: 'A number for interpolated step count, or a string that controls the CSS gradient type and direction. Linear: `"to right"`, `"135deg"`. Radial: `"circle"`, `"farthest-corner at 40px 40px"`, `"at 50% 50%"`. Conic: `"from 45deg"`, `"from 90deg at center"`.' }
    ],
    returns: 'An array of hex color strings when `stepsOrDirection` is a number, or a CSS gradient string (`linear-gradient`, `radial-gradient`, or `conic-gradient`) when it is a string.',
    example: `const stops = ['coral', 'gold', 'steelblue']
const color = nn.colorGradient(stops, 'to right')

// use directly as a CSS background-image
nn.get('body').css('backgroundImage', color)

// or use it to animate through a set of gradient
// frames, here we create one with 200 steps
let i = 0
const gframes = nn.colorGradient(stops, 200)
const box = nn.create('div')
  .size(100)
  .addTo('body')

function animate () {
  requestAnimationFrame(animate)
  const c = gframes[i++ % gframes.length]
  box.css('background', c)
}

animate()`
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ palettes ~ ~ ~ ~ ~ ~ ~ ~ ~

  {
    name: 'colorScheme',
    source: { filepath: 'src/Color/Color.js', start: 483, end: 647 },
    signature: 'nn.colorScheme(options)',
    description: 'Generates a color palette based on classic color theory harmony types. Pass a `harmony` type and a `base` color to get back an array of hex colors that work well together. Harmony types include `"analogous"` (neighboring hues), `"complementary"` (opposite hue), `"triad"`, `"split-complementary"`, `"square"`, `"monochromatic"`, `"shades"`, and `"random"`.',
    friendly: 'This method generates a set of colors that look good together based on color theory rules. You pick a starting color and a harmony type like <code>\'complementary\'</code> or <code>\'analogous\'</code>, and it returns an array of colors that match.',
    params: [
      { name: 'options', description: 'An object with the following properties:' },
      { name: 'options.harmony', description: 'The harmony type: `"analogous"`, `"complementary"`, `"triad"`, `"split-complementary"`, `"square"`, `"monochromatic"`, `"shades"`, or `"random"`.' },
      { name: 'options.base', description: 'The starting color (any format accepted by `toHSL`). Defaults to red.' },
      { name: 'options.count', optional: true, description: 'How many colors to return. Defaults vary by harmony type.' },
      { name: 'options.saturation', optional: true, description: 'Override saturation (`0–100`) for all generated colors.' },
      { name: 'options.lightness', optional: true, description: 'Override lightness (`0–100`) for all generated colors.' },
      { name: 'options.includeBase', optional: true, description: 'Whether to include the base color in the result. Defaults to `true`.' }
    ],
    returns: 'An array of hex color strings.',
    example: `function colorSwatch (color) {
  nn.create('section')
    .css({ flex: 1, background: color })
    .addTo('body')
}


function newPalette () {
  // clear previous color swatches
  nn.get('body').content('')
  // create new color scheme
  const colors = nn.colorScheme({
    harmony: 'analogous', // <- change type!
    base: nn.randomColor(),
    count: 5
  })
  // create new color swatches
  colors.forEach(colorSwatch)
}

nn.get('body').css({
  margin: 0,
  display: 'flex',
  height: '100vh',
  cursor: 'pointer'
})

// click to regenerate a random analogous palette
nn.on('click', newPalette)
nn.on('load', newPalette)
`
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ analysis ~ ~ ~ ~ ~ ~ ~ ~ ~

  {
    name: 'isLight',
    source: { filepath: 'src/Color/Color.js', start: 457, end: 462 },
    signature: 'nn.isLight(color)',
    description: 'Returns `true` if a color is perceptually light, or `false` if it is dark. This is useful for automatically choosing whether to put black or white text on top of a dynamic background color so that it stays readable.',
    friendly: 'This method tells you whether a color is light or dark. It\'s useful for automatically deciding whether to show black or white text on top of a dynamic background so the text always stays readable.',
    params: [
      { name: 'color', description: 'Any color value accepted by `toRGB`.' }
    ],
    returns: '`true` if the color is light, `false` if it is dark.',
    example: `const text = nn.create('section')
text.content('Hello')
text.addTo('body')

function newBackground () {
  const bg = nn.randomColor()
  // use white for text color,
  let clr = 'white'
  // unless background is light...
  if (nn.isLight(bg)) {
    clr = 'black' // ...use black
  }

  nn.get('body').css({
    background: bg,
    color: clr,
    fontSize: 60,
    userSelect: 'none',
    cursor: 'pointer'
  })
}

// click to change background color
nn.on('click', newBackground)
nn.on('load', newBackground)`
  },

  {
    name: 'colorContrast',
    source: { filepath: 'src/Color/Color.js', start: 443, end: 455 },
    signature: 'nn.colorContrast(a, b)',
    description: 'Calculates the [WCAG](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Understanding_WCAG) contrast ratio between two colors. The ratio ranges from `1` (no contrast, identical colors) to `21` (maximum contrast, black on white). WCAG accessibility guidelines recommend at least `4.5:1` for normal text (AA) and `7:1` for stricter compliance (AAA).',
    friendly: 'This method measures how much contrast there is between two colors, on a scale from 1 (no difference) to 21 (black on white). A score of at least 4.5 is recommended for text to be readable and accessible.',
    params: [
      { name: 'a', description: 'The first color (any format accepted by `toRGB`).' },
      { name: 'b', description: 'The second color (any format accepted by `toRGB`).' }
    ],
    returns: 'A number representing the WCAG contrast ratio (`1–21`).',
    example: `function newBackground () {
  const bg = nn.randomColor()
  const text = '#ffffff'
  const ratio = nn.colorContrast(bg, text)

  // display the current ratio
  let m = \`contrast ratio: \${ratio.toFixed(1)}:1\`
  // check if it passes AA compliance
  const pass = ratio >= 4.5
  if (pass) m += ' - passes AA ✓'
  else m += ' - fails AA ✗'

  nn.get('body').content(m).css({
    background: bg,
    color: text,
    fontFamily: 'monospace',
    fontSize: 20,
    userSelect: 'none',
    cursor: 'pointer'
  })
}

nn.on('load', newBackground)
nn.on('click', newBackground)`
  },

  {
    name: 'colorMatch',
    source: { filepath: 'src/Color/Color.js', start: 464, end: 478 },
    signature: 'nn.colorMatch(str)',
    description: 'Searches a string of text for the first CSS color value it contains and returns it as a parsed array. Recognizes hex colors, `rgb()`, `rgba()`, `hsl()`, and `hsla()` strings, as well as CSS named colors. Returns `null` if no color is found. Useful for extracting a color out of a larger block of CSS text.',
    friendly: 'This method scans a string of text and finds the first color value in it, returning what type it is and the color string itself. It\'s useful if you have a block of CSS or other text and want to pull out whatever color is mentioned.',
    params: [
      { name: 'str', description: 'Any string that may contain a CSS color value.' }
    ],
    returns: 'An array where the first element is the color type (`"hex"`, `"rgb"`, `"hsl"`, or `"named"`) and the second element is the full matched color string, or `null` if no color was found.',
    example: `const css = 'background-color: steelblue; font-size: 16px;'
const found = nn.colorMatch(css)

if (found) {
  // found[0] is type ('hex', 'rgb', 'hsl', or 'named')
  // found[1] is the matched color string
  nn.get('body').css('background', found[1])
}`
  },

  {
    name: 'closestColor',
    source: { filepath: 'src/Color/Color.js', start: 389, end: 403 },
    signature: 'nn.closestColor(color, palette)',
    description: 'Finds the closest match to a given color within an array of colors, using Euclidean distance in RGB space. Returns the original value from the palette unchanged, so if you pass named color strings, you get a named color string back. Useful for snapping a color to a limited palette, or for color-based classification.',
    friendly: 'This method takes a color and a list of colors and returns whichever one in the list looks most similar. It\'s useful for snapping a random or unknown color to the nearest color in a fixed palette.',
    params: [
      { name: 'color', description: 'The target color to match (any format accepted by `toRGB`).' },
      { name: 'palette', description: 'An array of colors to search through (any format accepted by `toRGB`).' }
    ],
    returns: 'The closest color from the palette, in whatever format it was originally provided, or `null` if the palette is empty.',
    example: `const palette = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']

function newBackground () {
  const random = nn.randomColor()
  const nearest = nn.closestColor(random, palette)
  const m = \`random: \${random} → closest: \${nearest}\`
  const c = nn.isLight(random) ? '#000' : '#fff'
  nn.get('body').content(m).css({
    background: random,
    color: c,
    fontFamily: 'monospace',
    fontSize: 20,
    userSelect: 'none',
    cursor: 'pointer'
  })
}
// click to regenerate
nn.on('click', newBackground)
nn.on('load', newBackground)`
  }
]

if (typeof module !== 'undefined') module.exports = COLOR_DOCS
else window.COLOR_DOCS = COLOR_DOCS
