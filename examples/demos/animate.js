// define these variables globally so it
// can be accessed inside both functions
let canvas, noise, pos

// this function will run once
// sometimes folk's prefer to call this "main"
// or "init" (short for "initialize")
function setup () {
  // remove page's scrollbars
  nn.get('body').css('overflow', 'hidden')
  // create a fullscreen canvas
  canvas = nn.create('canvas')
    .resize(nn.width, nn.height)
    .position(0, 0)
    .addTo('body')
  // create perlin noise function
  noise = nn.perlin()
  // object to track x,y position
  pos = {
    x: canvas.width / 2,
    y: canvas.height / 2
  }
}

// this function is called over and over
// sometimes folks perfer to call this "draw" or "render"
function animate () {
  // recursively call ~60 frames per second
  requestAnimationFrame(animate)
  // t (for tick) increments slowly
  const t = performance.now() * 0.001
  const r = canvas.width // radius of motion
  // move obj in a smooth perlin direction
  const x = noise.get(t, 0) * r + pos.x
  const y = noise.get(0, t) * r + pos.y
  const h = noise.get(0, t) * canvas.height
  const s = Math.abs(Math.sin(t) * 40)
  canvas.fillColor = nn.hsl(h, 50, 60)
  canvas.circle(x, y, s)
}

// run both setup and animate once the page loads
nn.on('load', setup)
nn.on('load', animate)
