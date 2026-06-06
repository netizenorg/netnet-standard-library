/*
  ( ◕ ◞ ◕ ) this generative and interactive demo is meant to showcase how you can combine the Matter.js physics library with the nn library's <svg> rendering methods (as well as some of it's utility and color theory methods) to recreate this piece: https://www.instagram.com/p/DYSP-_5Kx6a/ by Emanuele Colombo

  copying and remixing other artists’ work is a great way to learn. Read the comments below to understand what each section does, then try remixing this demo yourself. Start by changing numbers and other values, then experiment with the logic. Stay open to surprises: unexpected results can lead to new directions you might not have thought to go in otherwise.
*/

// our code begins by creating a few global variables used by the other functions below this initial "setup" section...

// first we'll create our color palette by picking a random cool hue (locking the saturation and lightness for consistency)
const hue = nn.randomInt(360)
const bgColor = nn.hsl(hue, 70, 47)

// split-complementary of any cool hue always lands in warm territory, we'll use these as potential colors for the balls
const [warm1, warm2] = nn.colorScheme({
  harmony: 'split-complementary',
  base: bgColor,
  saturation: 88,
  lightness: 65,
  includeBase: false
})

// one analogous step from the first warm accent gives a color neighbor
const [analog] = nn.colorScheme({
  harmony: 'analogous',
  base: warm1,
  count: 1,
  saturation: 88,
  lightness: 65,
  includeBase: false
})

// shift the background hue slightly and drop lightness way down for a dark muted neutral color we can add to our ball color palette
const neutral = nn.hsl(hue + 30, 24, 22)
// now we create the palette of colors for our balls
const palette = [analog, warm1, warm2, neutral]

// this is the phrase we'll turn into word-pills, it comes from the essay "Personal Dynamic Media" by Alan Kay and Adele Goldberg: https://augmentingcognition.com/assets/Kay1977.pdf
let phrase = 'a new kind of medium would have been created: a metamedium, whose content would be a wide range of already-existing and not-yet-invented media.'
// convert the string into an array of words for the word-pills
phrase = phrase.split(' ') // split string at every ' ' (space)
let index = 0 // keep track of which word was last rendered
const fontSize = 48 // font size for word-pills

// an array to hold the scene's the shape objects
const shapes = []

// initial starting location for auto-created shapes
let autoX = nn.width / 2
let autoY = nn.height - 90
let stopAutoAnimation = false
// total word-pills ever created (used to check if we've reached end of phrase)
let wordsShown = 0

// hide the page's scrollbar and change background color
nn.get('body').css({
  background: bgColor,
  overflow: 'hidden'
})

// create a fullscreen <svg> to draw our shapes to
const svg = nn.create('svg')
  .size(nn.width, nn.height)
  .position(0, 0)
  .addTo('body')

// pull out the physics utilities from Matter.js
const { Engine, Bodies, Composite, Runner, Body } = Matter
// these variables will hold the "bodies" for the floor/walls
let bottom, left, right

// create the Matter.js engine and runner
const engine = Engine.create()
const runner = Runner.create()
Runner.run(runner, engine)

/* •.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.• */
/* •.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*• Helper Functions ¸¸.• */
/* •.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.• */

// this function is used to build the invisible walls for physics (this way nothing bounces off screen)
function buildWalls () {
  // if we had previously created walls, remove them first
  if (bottom) Composite.remove(engine.world, bottom)
  if (left) Composite.remove(engine.world, left)
  if (right) Composite.remove(engine.world, right)

  // build out the new invisible floor/walls
  const w = nn.width
  const h = nn.height
  const o = { isStatic: true }

  // create the "bodies" for the floor/walls
  bottom = Bodies.rectangle(w / 2, h + 25, w + 100, 50, o)
  left = Bodies.rectangle(-25, h / 2, 50, h * 3, o)
  right = Bodies.rectangle(w + 25, h / 2, 50, h * 3, o)

  // add all of the "bodies" to the world
  Composite.add(engine.world, [bottom, left, right])
}

// .......................................................

// this function creates a colored circle, both the SVG <circle>, which is how we render the visual circle to the screen, and the Matter.js circle, which is how we calculate the physics of the circle bouncing against other elements
function createBall (color, x, y) {
  const r = (fontSize + 20) / 2 // radius of circle

  // the invisible rigid "body" to calculate physics with Matter.js
  const body = Bodies.circle(x, y, r, {
    restitution: 0.4, // bounciness (0 -1)
    friction: 0.08, // grip against other bodies
    frictionAir: 0.008, // air resistance
    density: 0.002 // mass per unit area
  })
  Composite.add(engine.world, body)

  // the visible svg <circle> elment
  const el = svg.circle(x, y, r).fill(color)

  // return both the physics body for calculations
  // and the svg element for visual rendering
  // and the type of shape ths is (used in animation update)
  return { body, el, type: 'ball' }
}

// .......................................................

// the "word pill" is an SVG "group" with a <text> element and a <rect> element with an "rx" property set to round the corners
function createWordPill (text, x, y) {
  const padX = 16
  const ph = fontSize + 20

  // in order to determine the width of the pill (rounded <rect>) we must measure the the text's width using a temporary off-screen element
  const tmp = svg.text(text, 0, -9999)
    .set('font-size', fontSize)
    .set('font-family', 'sans-serif')
  const pw = tmp.width + padX * 2
  tmp.remove()

  // then we'll create an SVG group element, we'll add the rounded <rect> and the <text> as child elements.
  const el = nn.create('g').addTo(svg)
  // child elements in this group use local coords centered at (0, 0)
  el.rect(-pw / 2, -ph / 2, pw, ph).set('rx', ph / 2).fill('black')
  el.text(text, 0, 0)
    .fill('white')
    .set('text-anchor', 'middle')
    .textBaseline('middle')
    .set('font-size', fontSize)
    .set('font-family', 'sans-serif')
    .css('user-select', 'none')

  // now we need to create the rigid body using Matter.js for the physics matching our visual <svg> group, we calculate the innerWidth of the pill and add to that two circles on either end (Matter.js rect's do not have a an "rx" property to round it's corners so the circles's take it's place)
  const innerW = Math.max(pw - ph, 0.1)
  const body = Body.create({
    parts: [
      Bodies.rectangle(x, y, innerW, ph),
      Bodies.circle(x - innerW / 2, y, ph / 2),
      Bodies.circle(x + innerW / 2, y, ph / 2)
    ],
    restitution: 0.4, // bounciness (0 -1)
    friction: 0.08, // grip against other bodies
    frictionAir: 0.008, // air resistance
    density: 0.002 // mass per unit area
  })
  Composite.add(engine.world, body)

  // return both the "body" (the Matter.js physics) and the "el" (the visual svg group of elements) and the type of shape ths is (used in animation update)
  return { body, el, type: 'word' }
}

// .......................................................

// this function randomly chooses whether to draw a new ball or word-pill it also keeps track of which word from the phrase was last rendered by updating the index value using clock-arithmetic
function newShape (x, y) {
  // use random chance to decide which shape to draw
  const chance = nn.random()
  // create and return either word-pill or colored ball
  if (chance > 0.3) {
    const nextWord = phrase[index]
    index = (index + 1) % phrase.length
    wordsShown++ // increment the permanent counter
    return createWordPill(nextWord, x, y)
  } else {
    const color = nn.random(palette)
    return createBall(color, x, y)
  }
}

/* •.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.• */
/* •.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸ Animation Loop ¸.• */
/* •.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.• */

// this function automatically creates new shapes one at a time, placing them just above previous shape. it keeps going until every word in the phrase has appeared at least once, then it stops.
async function autoCreate () {
  // if the user interrupted or the full phrase has been shown, stop
  if (stopAutoAnimation) return
  if (wordsShown >= phrase.length) {
    stopAutoAnimation = true
    return
  }
  // otherwise auto create the next shape
  autoY -= 20
  const shape = newShape(autoX, autoY)
  shapes.push(shape)
  await nn.sleep(250) // wait a quarter of a second
  autoCreate()
}

// .......................................................

// this function is called every time the user clicks the screen. it interupts the auto-animation if/when it's still running. it creates a new shape at the mouse position and removes the oldest shape to keep the scene from getting too full
function clickToCreate () {
  stopAutoAnimation = true
  // once the full phrase has been shown, remove the oldest shape to keep the scene from growing forever
  if (wordsShown >= phrase.length) {
    const oldest = shapes.shift()
    Composite.remove(engine.world, oldest.body)
    oldest.el.remove()
  }
  // then draw the new shape
  const shape = newShape(nn.mouseX, nn.mouseY)
  shapes.push(shape)
}

// .......................................................

// this function recalculates the scene if the user resizes the page
function resizeScene () {
  svg.size(nn.width, nn.height)
  buildWalls()
  autoX = nn.width / 2
}

// .......................................................

// this is the main animation loop, it runs ~60 times per second using requestAnimationFrame. each frame it reads the latest position and angle from each Matter.js body and applies them to the matching SVG element so the visuals created with nn.min.js stay in sync with the physics simulation handled by Matter.js
function animate () {
  requestAnimationFrame(animate) // call again ~60 fps
  // loop through all the shapes and update their positions
  shapes.forEach(({ body, el, type }) => {
    // "el" is the visible svg element
    // "body" is the Matter.js physics data
    // we use "body" to update the visual "el"
    el.position(body.position.x, body.position.y)
    // we also need to rotate it if it's a word-pill
    if (type === 'word') el.rotate(nn.radToDeg(body.angle))
  })
}

nn.on('load', buildWalls)
nn.on('load', animate)
nn.on('load', autoCreate)
nn.on('click', clickToCreate)
nn.on('resize', resizeScene)
