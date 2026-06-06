/*
  ( ◕ ◞ ◕ ) this interactive demo is meant to showcase how you can combine the TensorFlow.js library (specifically using the mediapipe handPoseDetection model) with the nn library's video filtering method (as well as some <canvas> and <html> methods for the UI) to recreate a similar UI to this piece: https://www.instagram.com/p/DZCn7wHopoz/ by _cklive_

  copying and remixing other artists’ work is a great way to learn. Read the comments below to understand what each section does, then try remixing this demo yourself. Start by changing numbers and other values, then experiment with the logic. Stay open to surprises: unexpected results can lead to new directions you might not have thought to go in otherwise.
*/
let button, model, canvas, video, videoCanvas

// ----- ◯ ----- ◯ ----- ◯ ----- ◯ ----- ◯ ----- ◯ ----- ◯ ----- ◯
// filter to invert colors + wap red/green channels
function wackyInvert (pixels) {
  // loop through each pixel
  for (let i = 0; i < pixels.length; i += 4) {
    // invert each channel's value
    pixels[i] = 255 - pixels[i + 1]
    pixels[i + 1] = 255 - pixels[i]
    pixels[i + 2] = 255 - pixels[i + 2]
  }
}

// ----- ◯ ----- ◯ ----- ◯ ----- ◯ ----- ◯ ----- ◯ ----- ◯ ----- ◯
// make sure the <video> is always as wide as the page
// and make sure the two <canvas> always match size of the <video>
function resize () {
  // video aspect ratio
  const ar = video.height / video.width
  // check that width is correct
  if (video.width !== nn.width) {
    const w = nn.width
    const h = w * ar
    // update only the video's width to match the window (so height updates automatically)
    video.size(w, h)
    video.set({ width: w, height: h })
    videoCanvas.size(w, h)
    canvas.size(w, h)
  }
}

// ----- ◯ ----- ◯ ----- ◯ ----- ◯ ----- ◯ ----- ◯ ----- ◯ ----- ◯
// draw the quadrilateral outlines on the top canvas (based on finger positions) and crop the processed video canvas to fit inside it
function draw (points) {
  // arrange points so index-finger tips form the top edge and thumbs form the bottom edge
  const [idx0, thb0, idx1, thb1] = points
  const quad = [idx0, idx1, thb1, thb0]

  // draw the quadrilateral outlines on the overlay canvas
  quad.forEach((p, i) => {
    const next = quad[(i + 1) % 4]
    canvas.line(p.x, p.y, next.x, next.y)
  })

  // use CSS clip-path to crop the videoCanvas so that only the parts within the outline is shown, we'll also need to subtract p.x from width because we flipped (mirrored) the canvas before
  const w = videoCanvas.width
  const clip = quad.map(p => `${w - p.x}px ${p.y}px`).join(', ')
  videoCanvas.css('clip-path', `polygon(${clip})`)
}

// ----- ◯ ----- ◯ ----- ◯ ----- ◯ ----- ◯ ----- ◯ ----- ◯ ----- ◯
// if we don't currently have four fingers visible, let's instead crop the processed viceo to the top-left corner of the page, with some instruction text rendered over it
function showInstructions () {
  canvas.ctx.save()
  canvas.ctx.font = '26px sans-serif'
  const text = 'raise your hands 🙌'
  const pad = 12
  const boxX = 10
  const boxY = 10
  const boxW = Math.ceil(canvas.ctx.measureText(text).width) + pad * 2
  const boxH = 26 + pad * 2

  // lets crop the entire filtered video-canvas, except for a bit at the top-left to function as a background for our instruction text (note: becaues we've flipped/mirrored the video we need to flip our clip coordinates too by subtracting the canvas width by the x positions)
  const cw = videoCanvas.width
  if (cw > 0) {
    const clip = [
      `${cw - boxX}px ${boxY}px`,
      `${cw - boxX - boxW}px ${boxY}px`,
      `${cw - boxX - boxW}px ${boxY + boxH}px`,
      `${cw - boxX}px ${boxY + boxH}px`
    ].join(', ')
    videoCanvas.css('clip-path', `polygon(${clip})`)
  }

  // draw the instruction prompt text vertically centred in the box
  canvas.ctx.fillStyle = 'white'
  canvas.ctx.textBaseline = 'middle'
  canvas.ctx.fillText(text, boxX + pad, boxY + boxH / 2)
  canvas.ctx.restore()
}

// ----- ◯ ----- ◯ ----- ◯ ----- ◯ ----- ◯ ----- ◯ ----- ◯ ----- ◯
// ----- ◯ ----- ◯ ----- ◯ ----- ◯ ----- ◯ ----- Update Loop --- ◯
// ----- ◯ ----- ◯ ----- ◯ ----- ◯ ----- ◯ ----- ◯ ----- ◯ ----- ◯

// this function loops ~ 60 times every second, it's the core logic controlling what happens every frame of the animation.
async function update () {
  requestAnimationFrame(update)

  // remove the button on the first frame
  if (button) {
    button.remove()
    button = null
  }

  // resize() // make sure video and canvases are the right size
  if (canvas.width !== video.width) {
    canvas.size(video.width, video.height)
  }

  // before drawing anything new on the <canvas>, lets erase the last frame
  canvas.clear()

  // ask the model to predict where the hands are by passing in the current video frame with the settings set to flip (so that it functions like a mirrored display)
  const opts = { flipHorizontal: true }
  const hands = await model.estimateHands(video, opts)

  // collect index tip + thumb tip from each detected hand (up to 4 points total)
  const points = []
  hands.forEach(hand => {
    points.push(hand.keypoints[8]) // index finger tip
    points.push(hand.keypoints[4]) // thumb tip
  })

  // draw a circle at each fingertip
  points.forEach(p => canvas.circle(p.x, p.y, 20))

  // draw the cropped filtered video within the four fingers, unless four fingers aren't present, in which case show the instructions instead.
  if (points.length === 4) draw(points)
  else showInstructions()
}

async function setup () {
  // reset page's default margin
  nn.get('body').css('margin', 0)

  // ask for camera access
  const cam = await nn.askFor('video')

  // create a <video> element to hold the stream
  video = nn.create('video')
    .addTo('body')
    .position(0, 0)
    .scale(-1, 1)
    .set({
      autoplay: true,
      muted: true,
      stream: cam
    })

  // create a <canvas> rendering a processed version of the video
  videoCanvas = nn.filterVideo(video, wackyInvert)
  // add the video canvas to the page
  videoCanvas
    .position(0, 0)
    // because <canvas> has it's own "scale()" method, we need to use CSS to flip it
    .css('transform', 'scale(-1, 1)')
    .addTo('body')

  // create another <canvas> for drawing the circles/lines around/between fingers
  canvas = nn.create('canvas')
    .position(0, 0)
    .addTo('body')

  canvas.lineWidth = 4
  canvas.fillStyle = 'transparent'
  canvas.strokeStyle = 'white'

  // load the AI hand detection model locally in this browser
  const type = handPoseDetection.SupportedModels.MediaPipeHands
  const config = {
    runtime: 'mediapipe',
    solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands',
    modelType: 'full', // 'lite', 'full'
    maxHands: 2
  }
  model = await handPoseDetection.createDetector(type, config)

  // remove "this", the element that called this function (the start button)
  this.remove()
  update() // start animation loop
}

// ...
// ... ...
// create the initial button which triggers the setup() when clicked
button = nn.create('button')
  .content('CLICK TO START')
  .css('font-size', 24)
  .css('color', 'white')
  .css('background', 'black')
  .css('border', 'none')
  .css('border-radius', 30)
  .css('padding', 15)
  .css('cursor', 'pointer')
  .css('display', 'block')
  .css('margin', '10vh auto')
  .addTo('body')
  .on('click', setup)

// if/when the browser resizes, lets' also resize our video and two canvas
nn.on('resize', resize)
