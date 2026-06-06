/*
  ( ◕ ◞ ◕ ) this generative and interactive demo is meant to showcase how you can combine the Hydra synth library with the nn library to create a splash page of animated dolphin GIFs with a graphic shader background inspired by this hydra sketch by Olivia Jack: https://hydra.ojack.xyz/?sketch_id=example_16

  copying and remixing other artists’ work is a great way to learn. Read the comments below to understand what each section does, then try remixing this demo yourself. Start by changing numbers and other values, then experiment with the logic. Stay open to surprises: unexpected results can lead to new directions you might not have thought to go in otherwise.
*/

// first we'll reset the page's margin and remove scrollbars
nn.get('body').css({
  margin: 0,
  overflow: 'hidden'
})

// then we'll create a full-screen <canvas> element using Hydra
const hydra = new Hydra({ detectAudio: false })
// hydra adds the <canvas> to the body automatically so we can now get it and position it so it's fullscreen
nn.get('canvas').position(0, 0)

// this is a helper function which will take the current mouse position and map it to a new range in radians, we'll use this later to adjust our hydra shader's rotation using the mouse's x position
function mxr () {
  const min = 0.5
  const max = Math.PI - min
  const rot = nn.map(nn.mouseX, 0, nn.width, min, max)
  return rot
}

// this is another helper function which maps the mouse's y position between 5 - 10, this will be used later to change the amount of "waves" in the shader
function mys () {
  return nn.map(nn.mouseY, 0, nn.height, 5, 10)
}

/* •.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.• */
// Here's the Hydra code which generates the interactive wavey background rendered to the <canvas>, these methods come from the hydra-synth library and are documented here: https://hydra.ojack.xyz/api/

// first create a visual oscillator with strong color offset
// (frequency-size, sync-speed, color-offset)
osc(3, 0.1, 2)
  // reduce saturation by half
  .saturate(0.5)
  // rotate visuals based on the mouse's x-position
  .rotate(mxr)
  // divide the image into a grid of chunky pixels
  // 100 rows of horizontal pixels by "mys" vertical pixels
  .pixelate(100, mys)
  // distort the straight lines of the oscillator with wavy noise
  .modulate(noise(2.5))
  // send the final result to the screen
  .out()

/* •.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.• */
// next we'll use the nn library to create a few animated dolphins, most of the logic for that is defined in the createDolphin() function below

function createDolphin () {
  // first we define some parameters, starting with a random size
  let w = nn.randomInt(160, 380)
  let h = Math.round(w / 2)
  // we'll base speed on size (smaller dolphins move slower)
  let speed = nn.map(w, 160, 380, 0.6, 2.2)
  // we'll point dolphin in a bottom/right direction
  let angle = nn.randomInt(-55, 5)
  // we'll calculate travel direction based on angle/speed
  let dx = -Math.cos(nn.degToRad(angle)) * speed
  let dy = -Math.sin(nn.degToRad(angle)) * speed
  // start position somewhere off-screen toward the top/right
  let x = nn.randomInt(nn.width * 0.3, nn.width + 300)
  let y = nn.randomInt(-300, -h)

  // then we'll create the dolphin GIF <img> element
  const dolphin = nn.create('img')
    .set('src', 'dolphin.gif')
    .size(w, h)
    .position(x, y)
    .rotate(angle)
    .css('cursor', 'pointer')
    .css('mix-blend-mode', 'hard-light')
    .css('image-rendering', 'crisp-edges')

  // setup click-event listener
  dolphin.on('click', () => {
    // when the user clicks on a dolphin
    const url = 'https://upload.wikimedia.org/wikipedia/commons/5/5a/161691_felixblume_dolphin-screaming-underwater-in-caribbean-sea-mexico.wav'
    // generate a new audio player with dolphin sounds
    const sound = new Audio(url)
    sound.play() // and play it
  })

  // lastly we'll create an internal function which resets the dolphin's position when it's gone off screen
  dolphin.update = function () {
    // increment (x,y) position by one step along the travel direction
    x += dx
    y += dy
    dolphin.position(x, y)

    // if the dolphin has exited off-screen bottom or left, give it a fresh random start
    const offX = x < -dolphin.width - 100
    const offY = y > nn.height + 100
    if (offX || offY) {
      w = nn.randomInt(160, 380)
      h = Math.round(w / 2)
      speed = nn.map(w, 160, 380, 0.6, 2.2)
      angle = nn.randomInt(-55, 5)
      dx = -Math.cos(nn.degToRad(angle)) * speed
      dy = -Math.sin(nn.degToRad(angle)) * speed
      x = nn.randomInt(nn.width * 0.3, nn.width + 300)
      y = nn.randomInt(-300, -h)
      dolphin.size(w, h).position(x, y).rotate(angle)
    }
  }

  // lastly we'll add the dolphin to the page
  dolphin.addTo('body')
}

// now that we've got our dolphin function, we'll run it 6 times
nn.times(6, async () => {
  // we'll wait a second each time (so dolphins start staggered)
  await nn.sleep(1000)
  // then we'll create a new dolphin
  createDolphin()
})

// we'll crate an animate function which we'll recursively call ~ 60 times a second
function animate () {
  requestAnimationFrame(animate) // ~60 fps
  // we'll gat all the <img> elements on our page (the 6 dolphin GIFs)
  nn.getAll('img').forEach(dolphin => { // and loop through each of them
    dolphin.update() // and run their internal update function
  })
}

// when the page loads, we'll start our dolphin animation loop
nn.on('load', animate)
