// a few global variables which need to be accessible to more than one function
let autodrawing = true
let tick = 0
let autoX = 0
let autoY = nn.height / 2
let selected = 'https://netnet.studio/cd.gif'

// some initial setup code
// first to set the <body> initial CSS...
nn.get('body').css({
  height: '100vh',
  overflow: 'hidden',
  margin: 0,
  cursor: '💿'
})

// ..and then to create our <main> drawing context
const main = nn.create('main')
  .position(0, 0)
  .css('width', '100vw')
  .css('height', '100vh')
  .css('user-select', 'none')
  .addTo('body')
  .on('mousemove', mouseDraw)

// ➡️ - ➡️ - ➡️ - ➡️ - ➡️ - ➡️ - ➡️ - ➡️ - ➡️ - ➡️
// this function creates an <img> of the GIF currently in "selected" at the given (x,y) coordinate and adds that GIF <img> to the <main> drawing context. This function is called in both mouseDraw() and autoDraw() below.
function drawGif (x, y) {
  nn.create('img')
    .set('src', selected)
    .positionOrigin('center')
    .position(x, y)
    .css('pointer-events', 'none')
    .addTo(main)
}

// ➡️ - ➡️ - ➡️ - ➡️ - ➡️ - ➡️ - ➡️ - ➡️ - ➡️ - ➡️
// this function is called everytime the mouse moves over the <main> element (see line 24 above)
function mouseDraw () {
  // if mouse is not (!) pressed down, exit function
  if (!nn.mouseDown) return
  // otherwise, stop audto-drawing
  autodrawing = false
  // and create a new gif at mouse location
  drawGif(nn.mouseX, nn.mouseY)
}

// ➡️ - ➡️ - ➡️ - ➡️ - ➡️ - ➡️ - ➡️ - ➡️ - ➡️ - ➡️
// this function calls itself recursively using setTimeout() to create an animation loop.
function autoDraw () {
  // calls itself in 50 milliseconds later if autodrawing is true
  if (autodrawing) setTimeout(autoDraw, 50)
  // we incremeant the x position by 10
  autoX += 10
  // we create a classic "sine wave" pattern by incremeanting the "tick" property and passing that into Math.sin() which, given an incremeanting value, will return a value oscillating between -1 and 1. We scale up the range by multiplying it by "radius" so its now -radius to radius. We also "offset" it to the center of the screen by adding half the screen's height.
  tick += 0.1
  const offset = nn.height / 2
  const radius = nn.height / 4
  autoY = offset + Math.sin(tick) * radius
  // once the sine wave reaches the edge of the screen we stop autodrawing
  if (autoX > nn.width) {
    autodrawing = false
  } else { // otherwise we draw a new GIF each frame
    drawGif(autoX, autoY)
  }
}

// ➡️ - ➡️ - ➡️ - ➡️ - ➡️ - ➡️ - ➡️ - ➡️ - ➡️ - ➡️
// this function is used to switch between brushes
function switchBrush () {
  // becuase this function is called by clicking on the <span> icon, the keyword "this" here refers to that <span> icon. We create these in createMenu() below, when we do we also add the icon and the GIFs url to the <span> element's internal data property...
  const cur = this.data.icon
  const url = this.data.url
  // ...so we'll use those here to update the page's current cursor
  nn.get('body').css('cursor', cur)
  // and update the global "selected" variable to match what was just clicked
  selected = url
}

// ➡️ - ➡️ - ➡️ - ➡️ - ➡️ - ➡️ - ➡️ - ➡️ - ➡️ - ➡️
// this function creats the tool-bar menu
function createMenu () {
  // first it creates a <div> element at the top of the page to display all the icons
  const menu = nn.create('div')
    .position(0, 0)
    .addTo('body')
    .css({
      width: '100%',
      boxSizing: 'border-box',
      background: nn.rgb(0, 0, 0, 0.15),
      padding: 10,
      display: 'flex',
      justifyContent: 'space-around'
    })
  // here we create an object which maps brush icons to their GIF urls
  const brushes = {
    '➡️': 'https://netnet.studio/arrow.gif',
    '🦋': 'https://netnet.studio/butterfly.gif',
    '💿': 'https://netnet.studio/cd.gif',
    '💃': 'https://netnet.studio/dancing-girl.gif',
    '🌎': 'https://netnet.studio/globe.gif',
    '🎧': 'https://netnet.studio/headphones.gif',
    '💗': 'https://netnet.studio/heart.gif',
    '🎈': 'https://netnet.studio/hotairballoon.gif',
    '⌛': 'https://netnet.studio/hour-glass.gif'
  }
  // this object contains CSS properties/values shared by all the icons
  const styles = { cursor: 'pointer', fontSize: 24 }

    // here we loop over all the brushes, creating a menu item "for" every emoji/url pair in the "brushes" object
  for (const emoji in brushes) {
    // first we create a <span> for each
    const toolPicker = nn.create('span')
      .content(emoji)
      .css(styles)
      .addTo(menu)
      .on('click', switchBrush)
    // we'll add the emoji and url as data properties
    toolPicker.data.url = brushes[emoji]
    toolPicker.data.icon = emoji
  }

  // this '|' is a visual divider before the others
  nn.create('span').content(' | ').css(styles).addTo(menu)
  // this '🗑️' will clear the <main> drawing context to start fresh
  nn.create('span').content('🗑️').css(styles).addTo(menu)
    .on('click', () => {
      autodrawing = false
      main.content(null)
    })
  // this '💾' will download what we've drawn as an HTML page
  nn.create('span').content('💾').css(styles).addTo(menu)
    .on('click', () => {
      const name = prompt('name your masterpiece')
      nn.download(main, `${name}.html`)
    })
}

// when the page loads we'll run create the menu and start the autoDraw loop
nn.on('load', createMenu)
nn.on('load', autoDraw)
