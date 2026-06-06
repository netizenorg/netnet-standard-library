// use "async" so we can "await" the camera stream
async function setup () {
  // ask for camera access, wait for user's reply
  const cam = await nn.askFor('video')
  // create a hidden video element to hold the stream. with no .addTo('body'), video is hidden)
  const video = nn.create('video')
    .set({
      autoplay: true,
      playsinline: true, // for mobile
      stream: cam
    })

  // liveFilter creates a <canvas> from
  // a video element and a filtering function
  // (the "process" function, defined below)
  // { raw: true } passes a flat Uint8ClampedArray for best performance
  const vcanvas = nn.filterVideo(video, process, { raw: true })
  vcanvas.addTo('body')
}

// a filter function to process a set of pixels
function process (px) {
  // loop over every pixel
  for (let i = 0; i < px.length; i += 4) {
    // the pixel's
    const r = px[i] // red channel
    const g = px[i + 1] // green channel
    const b = px[i + 2] // blue channel
    // calculate the brightness
    let br = 0.3 * r + 0.6 * g + 0.1 * b
    // pick a target (either 40 or 220)
    const targ = br > 128 ? 40 : 220
    // scale it down
    const s = targ / br
    // update pixel's channel values
    px[i] = Math.min(255, Math.max(0, r * s))
    px[i + 1] = Math.min(255, Math.max(0, g * s))
    px[i + 2] = Math.min(255, Math.max(0, b * s))
  }
}

// call setup() function when page loads
nn.on('load', setup)
