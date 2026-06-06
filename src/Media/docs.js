const MEDIA_DOCS = [
  {
    name: 'loadImage',
    source: { filepath: 'src/Media/media.js', start: 2, end: 10 },
    signature: 'nn.loadImage(url)',
    description: 'Returns a `Promise` that resolves with an `&lt;img&gt;` element once the image at `url` has fully loaded. Useful when you need to wait for an image before drawing it to a canvas or reading its pixels.',
    friendly: 'This method loads an image from a URL and gives it back to you once it has fully loaded. Use it with <code>await</code> so your code pauses and waits for the image to be ready before continuing.',
    params: [
      { name: 'url', description: 'The URL (or data URL) of the image to load.' }
    ],
    returns: 'A `Promise` that resolves with the loaded `&lt;img&gt;` element.',
    example: `// use "async" so we can "await" the image load
async function setup () {
  // wait for the image to finish loading
  const img = await nn.loadImage('chicago.jpg')
  // once loaded, add the image to the page
  img.addTo('body')
}

nn.on('load', setup)`
  },

  {
    name: 'filterImage',
    source: { filepath: 'src/Media/media.js', start: 12, end: 44 },
    signature: 'nn.filterImage(image, fn, opts?)',
    description: 'Loads an image onto a hidden canvas, passes its pixel data to `fn`, then writes the result back. By default `fn` receives an array of `{ r, g, b, a }` pixel objects, modify their properties directly. Pass `{ raw: true }` as the third argument to receive the underlying `Uint8ClampedArray` instead, where each pixel occupies four consecutive indices (`[i]` = R, `[i+1]` = G, `[i+2]` = B, `[i+3]` = A). For live video filters, see `nn.filterVideo()`.',
    friendly: 'This method lets you manipulate an image\'s pixels directly. You pass it an image and a function, and inside that function you can change the red, green, blue, and alpha (transparency) values of every pixel.',
    params: [
      { name: 'image', description: 'An `&lt;img&gt;` element or a base64-encoded data URL string.' },
      { name: 'fn', description: 'A function that receives the pixel data and modifies it in place. By default receives an array of `{ r, g, b, a }` objects. With `{ raw: true }`, receives a flat `Uint8ClampedArray` instead.' },
      { name: 'opts', optional: true, description: 'Options object. Set `raw: true` to receive a flat `Uint8ClampedArray` instead of pixel objects, useful for better performance.' }
    ],
    returns: 'A `Promise` resolving to `{ image, canvas, data }`, the updated `&lt;img&gt;` element, the internal canvas, and the base64 data URL.',
    example: `// a harsh black/white filter using pixel objects (default)
function threshold (pixels) {
  pixels.forEach(px => {
    const brightness = (px.r + px.g + px.b) / 3
    const v = brightness > 128 ? 255 : 0
    px.r = v
    px.g = v
    px.b = v
  })
}

// use "async" so we can "await" the image load
async function setup () {
  // wait for the image to finish loading
  const img = await nn.loadImage('chicago.jpg')
  // once loaded, add the image to the page
  img.addTo('body')
  // pass img along with callback function
  // to modify the pixels in the image
  nn.filterImage(img, threshold)
}

// soon as the page loads, runs setup()
nn.on('load', setup)`
  },

  {
    name: 'filterVideo',
    source: { filepath: 'src/Media/media.js', start: 46, end: 78 },
    signature: 'nn.filterVideo(video, fn, opts?)',
    description: 'Applies a pixel-manipulation filter to a live `&lt;video&gt;` element in real time. Starts a `requestAnimationFrame` loop internally and returns a `&lt;canvas&gt;` element that updates every frame with the filtered result, just add it to the page and it runs. By default `fn` receives an array of `{ r, g, b, a }` pixel objects. Because this runs every frame, pass `{ raw: true }` to receive the underlying `Uint8ClampedArray` instead for better performance with high-resolution video. Call `.stop()` on the returned canvas to cancel the loop.',
    friendly: 'This method applies a pixel filter to a live video stream in real time. You pass it a video element and a function that modifies pixel values, and it returns a canvas that shows the filtered result, updating every frame automatically.',
    params: [
      { name: 'video', description: 'A `&lt;video&gt;` element with an active stream (e.g. from `nn.askFor(\'video\')`).' },
      { name: 'fn', description: 'A function called every frame with the pixel data to modify in place. By default receives an array of `{ r, g, b, a }` objects. With `{ raw: true }`, receives a flat `Uint8ClampedArray` instead.' },
      { name: 'opts', optional: true, description: 'Options object. Set `raw: true` to receive a flat `Uint8ClampedArray` instead of pixel objects, recommended for real-time video filters where performance matters.' }
    ],
    returns: 'A `&lt;canvas&gt;` element that updates every frame with the filtered video. Has a `.update(fn, opts?)` method to swap the filter and/or change the raw setting at any time, and a `.stop()` method to cancel the loop.',
    example: `let videoCanvas
let filter = 1

// using { raw: true } for better performance in real-time filters
// a harsh black/white filter
function threshold (pixels) {
  for (let i = 0; i < pixels.length; i += 4) {
    const brightness = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3
    const v = brightness > 128 ? 255 : 0
    pixels[i] = v
    pixels[i + 1] = v
    pixels[i + 2] = v
  }
}

// filter to invert colors + swap red/green channels
function wackyInvert (pixels) {
  for (let i = 0; i < pixels.length; i += 4) {
    pixels[i] = 255 - pixels[i + 1]
    pixels[i + 1] = 255 - pixels[i]
    pixels[i + 2] = 255 - pixels[i + 2]
  }
}

async function setup () {
  // ask for camera access
  const cam = await nn.askFor('video')
  // create a hidden video element to hold the stream
  // (with no .addTo('body'), video is hidden)
  const video = nn.create('video')
    .set({
      autoplay: true,
      playsinline: true,
      stream: cam
    })
  // filterVideo returns a canvas that updates every frame
  // { raw: true } passes a flat array for better performance
  videoCanvas = nn.filterVideo(video, threshold, { raw: true })
  // add the canvas to the page
  videoCanvas.css('cursor', 'pointer').addTo('body')
}

function update () {
  filter = (filter + 1) % 3
  if (filter === 0) videoCanvas.update(null)
  else if (filter === 1) videoCanvas.update(threshold, { raw: true })
  else if (filter === 2) videoCanvas.update(wackyInvert, { raw: true })
}

// call setup on load and update on click
nn.on('load', setup)
nn.on('click', update)`
  },

  {
    name: 'askFor',
    source: { filepath: 'src/Media/media.js', start: 46, end: 80 },
    signature: 'nn.askFor(type, callback?)',
    description: "Unified entry point for requesting access to any browser device or permission. Pass a string naming what you want, `'video'`, `'audio'`, `'capture'`, `'gps'`, `'notifications'`, `'clipboard'`, `'bluetooth'`, `'usb'`, `'serial'`, `'motion'`, or `'orientation'`. Returns a `Promise` with the result. An optional callback can be passed as the second argument as an alternative to `async`/`await`. Each type also has its own dedicated method (e.g. `nn.askForCapture()`, `nn.askForGPS()`) for direct use with custom options.",
    friendly: 'This is a single method for requesting access to any browser device or permission. Pass a string like <code>\'video\'</code>, <code>\'audio\'</code>, or <code>\'gps\'</code> and the browser will prompt the user to grant access.',
    params: [
      { name: 'type', description: "A string identifying what to request. One of: `'video'`, `'audio'`, `'capture'`, `'gps'`, `'notifications'`, `'clipboard'`, `'bluetooth'`, `'usb'`, `'serial'`, `'motion'`, `'orientation'`." },
      { name: 'callback', optional: true, description: 'An optional function called with the result, as an alternative to `await`.' }
    ],
    returns: 'A `Promise` resolving with the result for the requested type.',
    example: `// we create this function with "async"
// so that we can "await" the video feed inside
async function setup () {
  // ask the user for camera access
  const cam = await nn.askFor('video')
  // pipe the stream into a <video> element
  // and start playing it
  nn.create('video')
    .addTo('body')
    .set({
      autoplay: true,
      playsinline: true,
      stream: cam
    })
}

// run setup soon as the page loads
nn.on('load', setup)`
  },

  {
    name: 'askForStream',
    source: { filepath: 'src/Media/media.js', start: 82, end: 100 },
    signature: 'nn.askForStream(constraints)',
    description: 'Requests access to the camera and/or microphone using the full [MediaDevices constraints API](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia). Use this when you need fine-grained control, e.g. specifying a facing mode, resolution, or frame rate. For simple cases, `nn.askFor(\'video\')` or `nn.askFor(\'audio\')` is easier.',
    friendly: 'This method requests camera and/or microphone access with fine-grained control, like specifying a resolution or frame rate. For most cases <code>nn.askFor(\'video\')</code> is simpler.',
    params: [
      { name: 'constraints', description: "A MediaDevices constraints object, e.g. `{ video: true }`, `{ audio: true, video: true }`, or `{ video: { facingMode: 'environment' } }`." }
    ],
    returns: 'A `Promise` that resolves with a `MediaStream`.',
    example: `// we create this function with "async"
// so that we can "await" the video feed inside
async function setup () {
  // ask the user for camera access.
  // while you could just do nn.askFor('video')
  // using this method allows us to pass video
  // "constraints" for example...
  const cam = await nn.askForStream({
    video: {
      width: { ideal: 400 }, // smaller width
      height: { ideal: 300 }, // and height
      frameRate: { ideal: 2 }, // choppy fps
      facingMode: 'user' // user front-facing cam
    }
  })
  // pipe the stream into a <video> element
  // and start playing it
  nn.create('video')
    .addTo('body')
    .set({
      autoplay: true,
      playsinline: true,
      stream: cam
    })
}

// run setup soon as the page loads
nn.on('load', setup)`
  },

  {
    name: 'askForCapture',
    source: { filepath: 'src/Media/media.js', start: 102, end: 105 },
    signature: 'nn.askForCapture(constraints?)',
    description: "Asks the user to pick a screen, window, or tab to share and returns a `Promise` resolving with a `MediaStream`. It must be called from a user gesture (e.g. a click), browsers will block it if called on page load. Optionally pass a `getDisplayMedia` constraints object for fine-grained control. For simple use, `nn.askFor('capture')` is equivalent.",
    friendly: 'This method asks the user to share their screen, a window, or a browser tab, and returns a live video stream of it. It must be triggered by a user action like a button click.',
    params: [
      { name: 'constraints', optional: true, description: 'An optional `getDisplayMedia` constraints object.' }
    ],
    returns: 'A `Promise` that resolves with a `MediaStream`.',
    example: `nn.get('body').css({
  background: 'rebeccapurple',
  color: 'white',
  padding: 20
})

async function screenCapture () {
  const capture = await nn.askForCapture()
  // create video element for stream
  nn.create('video')
    .addTo('body')
    .css('max-width', '100%')
    .set({
      autoplay: true,
      playsinline: true,
      stream: capture
    })
}

// create a button to start screen capture
nn.create('button')
  .content('click to share your screen')
  .addTo('body')
  .css('cursor', 'pointer')
  .on('click', screenCapture)
`
  },

  {
    name: 'askForNotifications',
    source: { filepath: 'src/Media/media.js', start: 107, end: 109 },
    signature: 'nn.askForNotifications()',
    description: "Asks the user for permission to show browser notifications. Returns a `Promise` that resolves with `'granted'`, `'denied'`, or `'default'`. It must be called from a user gesture (e.g. a click), most browsers will block the prompt if called on page load. Once granted you can use the browser's [Notification API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API) directly to send messages. Also available as `nn.askFor('notifications')`.",
    friendly: 'This method asks the user for permission to show browser notifications. It must be triggered by a user action like a button click, and resolves with <code>\'granted\'</code>, <code>\'denied\'</code>, or <code>\'default\'</code>.',
    params: [],
    returns: "A `Promise` resolving with `'granted'`, `'denied'`, or `'default'`.",
    example: `// we create an "async" function so that we
// can "await" for permission.
async function notify () {
  const permission = await nn.askForNotifications()
  // update body's content
  nn.get('body').content('permission: ' + permission)
  // if granted, create notification
  if (permission === 'granted') {
    const obj = { body: 'notifications are working.' }
    new Notification('hello from nn!', obj)
  }
}

// update body's content, css and add click event
nn.get('body')
  .content('click to request notification')
  .css({
    background: 'rebeccapurple',
    color: 'white',
    fontSize: 24,
    padding: 40,
    cursor: 'pointer'
  })
  .on('click', notify)`
  },

  {
    name: 'askForClipboard',
    source: { filepath: 'src/Media/media.js', start: 111, end: 113 },
    signature: 'nn.askForClipboard()',
    description: "Asks the user for permission to read the clipboard and returns a `Promise` that resolves with the current clipboard text. The browser will show a permission prompt the first time. Also available as `nn.askFor('clipboard')` or with a callback: `nn.askFor('clipboard', fn)`.",
    friendly: 'This method asks the user for permission to read their clipboard and returns the text that was most recently copied to it.',
    params: [],
    returns: 'A `Promise` that resolves with the clipboard text string.',
    example: `// we create an "async" function so that we
// can "await" for clipboard content.
async function getClipboard () {
  const text = await nn.askForClipboard()
  const m = 'last thing you copied was: ' + text
  nn.get('body').content(m)
}

// update body's content, css and add click event
nn.get('body')
  .content('click for clipboard text')
  .css({
    background: 'rebeccapurple',
    color: 'white',
    fontSize: 24,
    padding: 40,
    cursor: 'pointer'
  })
  .on('click', getClipboard)`
  },

  {
    name: 'askForBluetooth',
    source: { filepath: 'src/Media/media.js', start: 119, end: 124 },
    signature: 'nn.askForBluetooth(filters?)',
    description: "Shows the browser's Bluetooth device picker and returns a `Promise` that resolves with the selected `BluetoothDevice`. It must be called from a user gesture (e.g. a click), browsers will block it if called on page load. By default all nearby devices are shown. Pass a filters object (e.g. `{ filters: [{ name: 'MyDevice' }] }`) to narrow the list. Also available as `nn.askFor('bluetooth')`. [Check compatibility](https://caniuse.com/web-bluetooth), this may not be supported in all browsers.",
    friendly: 'This method shows the browser\'s Bluetooth device picker and connects to whichever device the user selects. It must be triggered by a user action like a button click, and may not be supported in all browsers.',
    params: [
      { name: 'filters', optional: true, description: 'An optional Web Bluetooth `requestDevice` options object.' }
    ],
    returns: 'A `Promise` that resolves with a `BluetoothDevice`.',
    example: `// we create an "async" function so that we
// can "await" for the bluetooth device.
async function connectBluetooth () {
  // make sure your browser supports Bluetooth
  const device = await nn.askForBluetooth()
  nn.get('body').content('connected to: ' + device.name)
}

// update body's content, css and add click event
nn.get('body')
  .content('click to connect a Bluetooth device')
  .css({
    background: 'rebeccapurple',
    color: 'white',
    fontSize: 24,
    padding: 40,
    cursor: 'pointer'
  })
  .on('click', connectBluetooth)`
  },

  {
    name: 'askForUSB',
    source: { filepath: 'src/Media/media.js', start: 126, end: 129 },
    signature: 'nn.askForUSB(filters?)',
    description: "Shows the browser's USB device picker and returns a `Promise` that resolves with the selected `USBDevice`. It must be called from a user gesture (e.g. a click), browsers will block it if called on page load. Pass a filters object like `{ vendorId: 0x2341 }` to filter by vendor (e.g. Arduino). Also available as `nn.askFor('usb')`. [Check compatibility](https://caniuse.com/webusb), this may not be supported in all browsers.",
    friendly: 'This method shows the browser\'s USB device picker and connects to the device the user selects. It must be triggered by a user action like a button click, and may not be supported in all browsers.',
    params: [
      { name: 'filters', optional: true, description: 'An optional filter object, e.g. `{ vendorId: 0x2341 }` for Arduino.' }
    ],
    returns: 'A `Promise` that resolves with a `USBDevice`.',
    example: `// we create an "async" function so that we
// can "await" for the USB device.
async function connectUSB () {
  // make sure this is supported by your browser
  const device = await nn.askForUSB()
  nn.get('body').content('connected to: ' + device.productName)
}

// update body's content, css and add click event
nn.get('body')
  .content('click to connect a USB device')
  .css({
    background: 'rebeccapurple',
    color: 'white',
    fontSize: 24,
    padding: 40,
    cursor: 'pointer'
  })
  .on('click', connectUSB)`
  },

  {
    name: 'askForSerial',
    source: { filepath: 'src/Media/media.js', start: 131, end: 134 },
    signature: 'nn.askForSerial(filters?)',
    description: "Shows the browser's serial port picker and returns a `Promise` that resolves with the selected `SerialPort`. It must be called from a user gesture (e.g. a click), browsers will block it if called on page load. Useful for communicating with microcontrollers like Arduino over USB. Pass a filters object like `{ usbVendorId: 0x2341 }` to filter by vendor. Also available as `nn.askFor('serial')`. [Check compatibility](https://caniuse.com/web-serial), this may not be supported in all browsers.",
    friendly: 'This method shows the browser\'s serial port picker, useful for communicating with hardware like Arduino over USB. It must be triggered by a user action like a button click, and may not be supported in all browsers.',
    params: [
      { name: 'filters', optional: true, description: 'An optional filter object, e.g. `{ usbVendorId: 0x2341 }` for Arduino.' }
    ],
    returns: 'A `Promise` that resolves with a `SerialPort`.',
    example: `// we create an "async" function so that we
// can "await" for the serial port.
async function connectSerial () {
  const port = await nn.askForSerial()
  // open the port at 9600 baud
  // (match your Arduino sketch)
  await port.open({ baudRate: 9600 })
  // make sure this is supported by your browser
  nn.get('body').content('serial port open!')
}

// update body's content, css and add click event
nn.get('body')
  .content('click to connect a serial port')
  .css({
    background: 'rebeccapurple',
    color: 'white',
    fontSize: 24,
    padding: 40,
    cursor: 'pointer'
  })
  .on('click', connectSerial)`
  },

  {
    name: 'askForMotion',
    source: { filepath: 'src/Media/media.js', start: 136, end: 142 },
    signature: 'nn.askForMotion()',
    description: "On iOS 13+ triggers the system permission dialog for device motion events, then resolves with `'granted'` or `'denied'`. On all other platforms resolves immediately with `'granted'` since no permission is required. After granting, listen with `nn.on('devicemotion', fn)`. Also available as `nn.askFor('motion')`.",
    friendly: 'This method asks the user for permission to access the device\'s accelerometer, which measures physical movement and shaking. On iOS you must ask explicitly, but on most other devices no prompt is needed.',
    params: [],
    returns: "`A `Promise` resolving with `'granted'` or `'denied'`.",
    example: `// NOTE: device motion requires a physical sensor,
// this will only work on a mobile device or laptop
// with an accelerometer (not a desktop computer).
const output = nn.create('p').addTo('body')

// we create an "async" function so that we
// can "await" for motion permission.
function onMotion (e) {
  // read accelerometer data from the event
  const a = e.accelerationIncludingGravity
  output.content(\`x: \${a.x.toFixed(2)} y: \${a.y.toFixed(2)} z: \${a.z.toFixed(2)}\`)
}

// we create an "async" function so that we
// can "await" for motion permission.
async function enableMotion () {
  const permission = await nn.askForMotion()
  if (permission === 'granted') {
    nn.on('devicemotion', onMotion)
  }
}

// update body's content, css and add click event
nn.get('body')
  .content('tap to enable motion')
  .css({
    background: 'rebeccapurple',
    color: 'white',
    fontSize: 24,
    padding: 40,
    cursor: 'pointer'
  })
  .on('click', enableMotion)`
  },

  {
    name: 'askForOrientation',
    source: { filepath: 'src/Media/media.js', start: 144, end: 150 },
    signature: 'nn.askForOrientation()',
    description: "On iOS 13+ triggers the system permission dialog for device orientation events, then resolves with `'granted'` or `'denied'`. On all other platforms resolves immediately with `'granted'`. After granting, listen with `nn.on('deviceorientation', fn)`. Also available as `nn.askFor('orientation')`.",
    friendly: 'This method asks the user for permission to access the device\'s gyroscope, which tracks how the device is tilted and rotated in space. On iOS you must ask explicitly, but on most other devices no prompt is needed.',
    params: [],
    returns: "`A `Promise` resolving with `'granted'` or `'denied'`.",
    example: `// NOTE: device orientation requires a physical sensor,
// this will only work on a mobile device or laptop
// with a gyroscope (not a desktop computer).
const output = nn.create('p').addTo('body')

// we create an "async" function so that we
// can "await" for orientation permission.
function onOrientation (e) {
  // read gyroscope / compass data from the event
  output.content(\`alpha: \${e.alpha.toFixed(1)} beta: \${e.beta.toFixed(1)} gamma: \${e.gamma.toFixed(1)}\`)
}

// we create an "async" function so that we
// can "await" for orientation permission.
async function enableOrientation () {
  const permission = await nn.askForOrientation()
  if (permission === 'granted') {
    nn.on('deviceorientation', onOrientation)
  }
}

// update body's content, css and add click event
nn.get('body')
  .content('tap to enable orientation')
  .css({
    background: 'rebeccapurple',
    color: 'white',
    fontSize: 24,
    padding: 40,
    cursor: 'pointer'
  })
  .on('click', enableOrientation)`
  },

  {
    name: 'askForGPS',
    source: { filepath: 'src/Media/media.js', start: 104, end: 155 },
    signature: 'nn.askForGPS(callback?, options?)',
    description: "Asks the user for their location and returns a `Promise` that resolves with `{ lat, lng, timestamp, coords }`. An optional callback is called with the same data. An optional `options` object can include custom alert messages for when geolocation isn't supported (`options.support`) or has been blocked (`options.enable`).",
    friendly: 'This method asks the user for their current location and returns the latitude and longitude. The browser will prompt the user for permission before sharing their location.',
    params: [
      { name: 'callback', description: 'An optional function called with `{ lat, lng, timestamp, coords }` when the location is retrieved.' },
      { name: 'options', description: 'An optional object with `support` and/or `enable` string properties for custom user-facing messages.' }
    ],
    returns: 'A `Promise` that resolves with `{ lat, lng, timestamp, coords }`.',
    example: `nn.get('body').css({
  background: 'rebeccapurple',
  color: 'white',
  fontSize: 24,
  padding: 40
})

// we create a "async" function so that
// we can "await" for GPS data
async function setup () {
  // as for GPS coordinates
  const loc = await nn.askForGPS()
  // then display them to the body
  const m = \`lat: \${loc.lat}, lon: \${loc.lng}\`
  nn.get('body').content(m)
}

nn.on('load', setup)`
  },

  {
    name: 'hyper',
    source: { filepath: 'src/Media/media.js', start: 104, end: 160 },
    signature: 'nn.hyper(media).at(seconds, fn)',
    description: 'Attaches a time-based cue system to an audio or video element. `nn.hyper(media)` returns a cue object with chainable `.at(seconds, fn)` and `.off(seconds, fn)` methods. `.at()` registers a callback to fire when the playhead naturally reaches that time during playback, seeking past a cue silently skips it. `.off()` unregisters a previously added callback by matching both the time and the function reference.',
    friendly: 'This method lets you attach timed events to a video or audio element, so a function automatically runs when playback reaches a specific moment. Chain <code>.at(seconds, fn)</code> to register each cue.',
    params: [
      { name: 'media', description: 'An `&lt;audio&gt;` or `&lt;video&gt;` element (anything with a `currentTime` property).' }
    ],
    returns: 'A cue object with chainable `.at(seconds, fn)` and `.off(seconds, fn)` methods.',
    example: `nn.get('body').css({
  background: 'rebeccapurple',
  color: 'white',
  fontSize: 28,
  padding: 40
})

// create display element for text
const display = nn.create('p')
  .content('play the video...')
  .addTo('body')

// create video element
const video = nn.create('video')
  .set({
    src: 'https://www.w3schools.com/html/mov_bbb.mp4', controls: true,
    width: 400
  })
  .css('display', 'block')
  .addTo('body')

// these functions will run at specific times
// relative to the video's playback
function first () {
  display.content('What a pretty butterfly!')
}

function second () {
  display.content('Look at it fultter!')
}

function third () {
  display.content('UNTITLED')
}

function fourth () {
  display.content('Oh no!!!')
}

// register cues, each fires only when playback
// naturally reaches that moment
const cues = nn.hyper(video)
  .at(1, first)
  .at(4.5, second)
  .at(6, third)
  .at(7.8, fourth)

// the third() function won't ever fire
// because we've automatically removed it
cues.off(6, third)`
  },

  {
    name: 'popup',
    source: { filepath: 'src/Media/media.js', start: 1, end: 20 },
    signature: 'nn.popup(url, x, y, w, h)',
    description: 'Opens a new browser window (aka popup) at the given URL, positioned and sized according to the arguments. You can pass `x`, `y`, `w`, `h` as individual numbers, or bundle them into an options object ` nn.popup(url, { left, top, width, height })`. Returns the new window reference, use it to move, resize, focus, or close the window later with the native `moveTo()`, `moveBy()`, `resizeTo()`, `resizeBy()`, `focus()`, and `close()` methods.',
    friendly: 'This method opens a new browser window at a given URL, with a position and size you control. It returns a reference to that window so you can later move it with <code>.moveTo()</code>, resize it with <code>.resizeTo()</code>, or close it with <code>.close()</code>.',
    params: [
      { name: 'url', description: 'The URL to open in the new window.' },
      { name: 'x', description: 'Horizontal position in pixels from the left of the screen (default `0`). Can also be passed as `{ left, top, width, height }`.' },
      { name: 'y', description: 'Vertical position in pixels from the top of the screen (default `0`).' },
      { name: 'w', description: 'Width of the new window in pixels (default `400`).' },
      { name: 'h', description: 'Height of the new window in pixels (default `300`).' }
    ],
    returns: 'The new window reference.',
    example: `let win = null

function openPopup () {
  // open a new window, 400x300, near the top-left
  win = nn.popup('chicago.jpg', 100, 100)
}

function movePopup () {
  // exit function if win doesn't exist yet
  if (!win) return
  // othewise move it to a random spot
  const sw = window.screen.width
  const sh = window.screen.height
  const x = nn.random(0, sw - win.outerWidth)
  const y = nn.random(0, sh - win.outerHeight)
  // also have win.screenX and win.screenY
  win.moveTo(x, y)
  win.moveTo(x, y)
}

function closePopup () {
  if (win) win.close()
  win = null
}

nn.get('body').css({
  background: 'rebeccapurple',
  display: 'flex',
  justifyContent: 'space-between',
  padding: 40
})

nn.create('button')
  .content('open pop-up')
  .addTo('body')
  .on('click', openPopup)

nn.create('button')
  .content('move pop-up')
  .addTo('body')
  .on('click', movePopup)

nn.create('button')
  .content('close pop-up')
  .addTo('body')
  .on('click', closePopup)`
  },

  {
    name: 'MIDI',
    source: { filepath: 'src/Media/media.js', start: 84, end: 102 },
    signature: 'nn.MIDI(fn)',
    description: 'Requests Web MIDI access and registers `fn` as the handler for all incoming MIDI messages. The callback receives an object with `dev` (device name), `chl` (channel / note number), and `val` (velocity or control value). Requires a connected MIDI device. [Check compatibility](https://caniuse.com/midi), this may not be supported in all browsers.',
    friendly: 'This method requests access to any connected MIDI devices and registers a function that gets called every time a MIDI message arrives, like a key press on a MIDI keyboard. The message object has <code>dev</code> (device name), <code>chl</code> (channel/note), and <code>val</code> (velocity) properties.',
    params: [
      { name: 'fn', description: 'A callback function called on every incoming MIDI message. Receives `{ dev, chl, val }`.' }
    ],
    returns: 'Nothing.',
    example: `nn.get('body').css({
  background: 'rebeccapurple',
  color: 'white',
  fontSize: 24,
  padding: 40
})

const output = nn.create('pre').addTo('body')

function displayData (msg) {
  const d = \`device: \${msg.dev}, channel: \${msg.chl}, value: \${msg.val}<br>\`
  output.content(d)
}

// assuming you have a MIDI device plugged in,
// this will run every time a MIDI message arrives
nn.MIDI(displayData)`
  }
]

if (typeof module !== 'undefined') module.exports = MEDIA_DOCS
else window.MEDIA_DOCS = MEDIA_DOCS
