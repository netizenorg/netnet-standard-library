const AVERIGUA_DOCS = [
  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ environment ~ ~ ~ ~ ~ ~ ~ ~

  {
    name: 'isBrowser',
    source: { filepath: 'src/Averigua/Averigua.js', start: 12, end: 14 },
    signature: 'nn.isBrowser()',
    description: 'Returns `true` if the current runtime is a browser (i.e. `window` and `document` exist). Useful as a guard before calling any browser-only APIs.',
    friendly: 'This method tells you whether your code is currently running inside a web browser. It returns <code>true</code> if it is, which is useful when your code might also run in other environments like Node.js.',
    params: [],
    returns: '`true` if running in a browser, `false` otherwise.',
    example: `const check = nn.isBrowser()
const m = 'Is this a browser? ' + check

nn.get('body').content(m).css({
  background: 'darkgrey',
  color: 'black',
  fontSize: 40
})`
  },

  {
    name: 'isMobile',
    source: { filepath: 'src/Averigua/Averigua.js', start: 16, end: 23 },
    signature: 'nn.isMobile()',
    description: 'Returns `true` if the visitor\'s device is a mobile or tablet device, detected via the user-agent string. Useful for adapting layout or interaction to touch-based devices.',
    friendly: 'This method tells you whether the page is being viewed on a mobile or tablet device. Use it to adapt your layout or interactions for smaller screens or touch input.',
    params: [],
    returns: '`true` if the visitor appears to be on a mobile device, `false` if on desktop.',
    example: `const check = nn.isMobile()
const m = 'Is this a mobile device? ' + check

nn.get('body').content(m).css({
  background: 'darkgrey',
  color: 'black',
  fontSize: 40
})`
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ feature detection ~ ~ ~ ~ ~

  {
    name: 'hasWebGL',
    source: { filepath: 'src/Averigua/Averigua.js', start: 25, end: 30 },
    signature: 'nn.hasWebGL()',
    description: 'Returns `true` if the browser supports WebGL rendering. Useful before initializing any 3D or GPU-accelerated canvas work.',
    friendly: 'This method checks whether the browser supports WebGL, which is needed for 3D graphics and GPU-accelerated rendering. Use it before trying to set up any WebGL-based work.',
    params: [],
    returns: '`true` if WebGL is supported, `false` otherwise.',
    example: `const check = nn.hasWebGL()
const m = 'Does this device support WebGL? ' + check

nn.get('body').content(m).css({
  background: 'darkgrey',
  color: 'black',
  fontSize: 30
})`
  },

  {
    name: 'hasWebVR',
    source: { filepath: 'src/Averigua/Averigua.js', start: 32, end: 36 },
    signature: 'nn.hasWebVR()',
    description: 'Returns `true` if the browser exposes the WebVR API (`navigator.getVRDisplays`). Note: WebVR is largely deprecated in favor of WebXR in modern browsers.',
    friendly: 'This method checks whether the browser supports the older WebVR API for virtual reality. Note that WebVR has been largely replaced by WebXR in modern browsers, so you may want to use <code>nn.hasWebXR()</code> instead.',
    params: [],
    returns: '`true` if WebVR is available, `false` otherwise.',
    example: `const check = nn.hasWebVR()
const m = 'Does this device support WebVR? ' + check

nn.get('body').content(m).css({
  background: 'darkgrey',
  color: 'black',
  fontSize: 30
})`
  },

  {
    name: 'hasMIDI',
    source: { filepath: 'src/Averigua/Averigua.js', start: 38, end: 43 },
    signature: 'nn.hasMIDI()',
    description: 'Returns `true` if the browser supports the Web MIDI API (`navigator.requestMIDIAccess`). Useful before trying to connect to MIDI devices.',
    friendly: 'This method checks whether the browser supports Web MIDI, which is needed to connect to MIDI devices like keyboards or controllers. Use it before calling <code>nn.MIDI()</code>.',
    params: [],
    returns: '`true` if Web MIDI is supported, `false` otherwise.',
    example: `const check = nn.hasMIDI()
const m = 'Does this device support MIDI? ' + check

nn.get('body').content(m).css({
  background: 'darkgrey',
  color: 'black',
  fontSize: 30
})`
  },

  {
    name: 'hasTouch',
    source: { filepath: 'src/Averigua/Averigua.js', start: 45, end: 58 },
    signature: 'nn.hasTouch()',
    description: 'Returns `true` if the visitor\'s device has a touch screen. Uses a combination of `ontouchstart`, `DocumentTouch`, and media query checks for broad compatibility.',
    friendly: 'This method checks whether the device has a touch screen. Use it to decide whether to listen for touch events or to adjust interactions for finger-based input.',
    params: [],
    returns: '`true` if a touch screen is detected, `false` otherwise.',
    example: `const check = nn.hasTouch()
const m = 'Is this a touch screen? ' + check

nn.get('body').content(m).css({
  background: 'darkgrey',
  color: 'black',
  fontSize: 30
})`
  },

  {
    name: 'hasWebAudio',
    source: { filepath: 'src/Averigua/Averigua.js', start: 256, end: 259 },
    signature: 'nn.hasWebAudio()',
    description: 'Returns `true` if the browser supports the Web Audio API. Essential to check before building audio visualizers, synthesizers, or any sound-reactive work.',
    friendly: 'This method checks whether the browser supports the Web Audio API, which is needed for generating sound, analyzing audio, or building synthesizers in the browser.',
    params: [],
    returns: '`true` if `AudioContext` (or `webkitAudioContext`) is available, `false` otherwise.',
    example: `const check = nn.hasWebAudio()
const m = 'Does this device support Web Audio? ' + check

nn.get('body').content(m).css({
  background: 'darkgrey',
  color: 'black',
  fontSize: 30
})`
  },

  {
    name: 'hasWebXR',
    source: { filepath: 'src/Averigua/Averigua.js', start: 261, end: 264 },
    signature: 'nn.hasWebXR()',
    description: 'Returns `true` if the browser supports the WebXR Device API, which enables AR and VR experiences. This is the modern successor to the deprecated WebVR API.',
    friendly: 'This method checks whether the browser supports WebXR, the API for augmented and virtual reality experiences in the browser.',
    params: [],
    returns: '`true` if `navigator.xr` is available, `false` otherwise.',
    example: `const check = nn.hasWebXR()
const m = 'Does this device support WebXR? ' + check

nn.get('body').content(m).css({
  background: 'darkgrey',
  color: 'black',
  fontSize: 30
})`
  },

  {
    name: 'hasMediaDevices',
    source: { filepath: 'src/Averigua/Averigua.js', start: 266, end: 269 },
    signature: 'nn.hasMediaDevices()',
    description: 'Returns `true` if the browser supports `navigator.mediaDevices.getUserMedia`, which gives access to the camera and microphone. Useful before building webcam-driven visuals or mic-reactive audio work.',
    friendly: 'This method checks whether the browser supports camera and microphone access. Use it before calling <code>nn.askFor(\'video\')</code> or <code>nn.askFor(\'audio\')</code>.',
    params: [],
    returns: '`true` if camera/microphone access is available, `false` otherwise.',
    example: `const check = nn.hasMediaDevices()
const m = 'Does this device support camera/mic access? ' + check

nn.get('body').content(m).css({
  background: 'darkgrey',
  color: 'black',
  fontSize: 30
})`
  },

  {
    name: 'hasDeviceMotion',
    source: { filepath: 'src/Averigua/Averigua.js', start: 271, end: 274 },
    signature: 'nn.hasDeviceMotion()',
    description: 'Returns `true` if the browser exposes the `DeviceMotionEvent` API, which provides accelerometer data. Useful for motion-driven or physics-based mobile experiences.',
    friendly: 'This method checks whether the browser supports device motion events, which give you accelerometer data like shaking or tilting. Useful before building motion-driven experiences on mobile.',
    params: [],
    returns: '`true` if `DeviceMotionEvent` is defined, `false` otherwise.',
    example: `const check = nn.hasDeviceMotion()
const m = 'Does this device support motion events? ' + check

nn.get('body').content(m).css({
  background: 'darkgrey',
  color: 'black',
  fontSize: 30
})`
  },

  {
    name: 'hasDeviceOrientation',
    source: { filepath: 'src/Averigua/Averigua.js', start: 276, end: 279 },
    signature: 'nn.hasDeviceOrientation()',
    description: 'Returns `true` if the browser exposes the `DeviceOrientationEvent` API, which provides gyroscope/compass data (alpha, beta, gamma). Useful for tilt-based interaction on mobile.',
    friendly: 'This method checks whether the browser supports device orientation events, which tell you how the device is tilted and rotated. Useful before building tilt-based interactions on mobile.',
    params: [],
    returns: '`true` if `DeviceOrientationEvent` is defined, `false` otherwise.',
    example: `const check = nn.hasDeviceOrientation()
const m = 'Does this device support orientation events? ' + check

nn.get('body').content(m).css({
  background: 'darkgrey',
  color: 'black',
  fontSize: 30
})`
  },

  {
    name: 'hasPointerLock',
    source: { filepath: 'src/Averigua/Averigua.js', start: 281, end: 286 },
    signature: 'nn.hasPointerLock()',
    description: 'Returns `true` if the browser supports the Pointer Lock API, which hides the cursor and provides raw mouse deltas. Essential for first-person navigation, immersive experiences, and mouse-controlled generative art.',
    friendly: 'This method checks whether the browser supports Pointer Lock, which lets you hide the cursor and capture raw mouse movement. It\'s used for first-person or immersive mouse-driven experiences.',
    params: [],
    returns: '`true` if Pointer Lock is supported, `false` otherwise.',
    example: `const check = nn.hasPointerLock()
const m = 'Does this browser support Pointer Lock? ' + check

nn.get('body').content(m).css({
  background: 'darkgrey',
  color: 'black',
  fontSize: 30
})`
  },

  {
    name: 'hasGamepad',
    source: { filepath: 'src/Averigua/Averigua.js', start: 288, end: 291 },
    signature: 'nn.hasGamepad()',
    description: 'Returns `true` if the browser supports the Gamepad API. Useful for building controller-driven interactive installations or games.',
    friendly: 'This method checks whether the browser supports gamepad controllers. Use it before building experiences that respond to a connected game controller.',
    params: [],
    returns: '`true` if `navigator.getGamepads` is available, `false` otherwise.',
    example: `const check = nn.hasGamepad()
const m = 'Does this browser support Gamepads? ' + check

nn.get('body').content(m).css({
  background: 'darkgrey',
  color: 'black',
  fontSize: 30
})`
  },

  {
    name: 'hasWebSerial',
    source: { filepath: 'src/Averigua/Averigua.js', start: 293, end: 296 },
    signature: 'nn.hasWebSerial()',
    description: 'Returns `true` if the browser supports the Web Serial API, which enables communication with serial devices like Arduino boards. Useful for physical computing and hardware-driven creative work.',
    friendly: 'This method checks whether the browser supports Web Serial, which lets you communicate with hardware like Arduino over a USB cable. Use it before calling <code>nn.askForSerial()</code>.',
    params: [],
    returns: '`true` if `navigator.serial` is available, `false` otherwise.',
    example: `const check = nn.hasWebSerial()
const m = 'Does this browser support Web Serial? ' + check

nn.get('body').content(m).css({
  background: 'darkgrey',
  color: 'black',
  fontSize: 30
})`
  },

  {
    name: 'hasWebUSB',
    source: { filepath: 'src/Averigua/Averigua.js', start: 298, end: 301 },
    signature: 'nn.hasWebUSB()',
    description: 'Returns `true` if the browser supports the Web USB API, which allows direct communication with USB devices. Useful for connecting custom hardware, sensors, or microcontrollers.',
    friendly: 'This method checks whether the browser supports Web USB, which lets you connect directly to USB devices like custom hardware or microcontrollers. Use it before calling <code>nn.askForUSB()</code>.',
    params: [],
    returns: '`true` if `navigator.usb` is available, `false` otherwise.',
    example: `const check = nn.hasWebUSB()
const m = 'Does this browser support Web USB? ' + check

nn.get('body').content(m).css({
  background: 'darkgrey',
  color: 'black',
  fontSize: 30
})`
  },

  {
    name: 'hasBluetooth',
    source: { filepath: 'src/Averigua/Averigua.js', start: 303, end: 306 },
    signature: 'nn.hasBluetooth()',
    description: 'Returns `true` if the browser supports the Web Bluetooth API, which allows connecting to nearby Bluetooth Low Energy devices. Useful for wireless hardware integration in creative installations.',
    friendly: 'This method checks whether the browser supports Web Bluetooth, which lets you connect to nearby Bluetooth devices wirelessly. Use it before calling <code>nn.askForBluetooth()</code>.',
    params: [],
    returns: '`true` if `navigator.bluetooth` is available, `false` otherwise.',
    example: `const check = nn.hasBluetooth()
const m = 'Does this browser support Web Bluetooth? ' + check

nn.get('body').content(m).css({
  background: 'darkgrey',
  color: 'black',
  fontSize: 30
})`
  },

  {
    name: 'hasSpeechRecognition',
    source: { filepath: 'src/Averigua/Averigua.js', start: 308, end: 311 },
    signature: 'nn.hasSpeechRecognition()',
    description: 'Returns `true` if the browser supports the Speech Recognition API, which converts spoken audio to text. Useful for voice-driven interactive experiences.',
    friendly: 'This method checks whether the browser supports speech recognition, which lets you convert spoken words into text. Useful before building voice-controlled experiences.',
    params: [],
    returns: '`true` if `SpeechRecognition` (or `webkitSpeechRecognition`) is available, `false` otherwise.',
    example: `const check = nn.hasSpeechRecognition()
const m = 'Does this browser support Speech Recognition? ' + check

nn.get('body').content(m).css({
  background: 'darkgrey',
  color: 'black',
  fontSize: 30
})`
  },

  {
    name: 'hasSpeechSynthesis',
    source: { filepath: 'src/Averigua/Averigua.js', start: 313, end: 316 },
    signature: 'nn.hasSpeechSynthesis()',
    description: 'Returns `true` if the browser supports the Speech Synthesis API (`speechSynthesis`), which converts text to spoken audio. Useful for voice-output interactive art and accessible web experiences.',
    friendly: 'This method checks whether the browser supports speech synthesis, which lets you make the browser read text out loud. Useful before building experiences that speak to the user.',
    params: [],
    returns: '`true` if `window.speechSynthesis` is available, `false` otherwise.',
    example: `const check = nn.hasSpeechSynthesis()
const m = 'Does this browser support Speech Synthesis? ' + check

nn.get('body').content(m).css({
  background: 'darkgrey',
  color: 'black',
  fontSize: 30
})`
  },

  {
    name: 'hasWebAssembly',
    source: { filepath: 'src/Averigua/Averigua.js', start: 318, end: 320 },
    signature: 'nn.hasWebAssembly()',
    description: 'Returns `true` if the browser supports WebAssembly, which allows running near-native speed code in the browser. Useful for compute-heavy generative work, simulations, and porting creative coding libraries written in C/C++/Rust.',
    friendly: 'This method checks whether the browser supports WebAssembly, which lets you run very fast, low-level code in the browser. It\'s useful for heavy computation like simulations or ported C/C++ libraries.',
    params: [],
    returns: '`true` if `WebAssembly` is available, `false` otherwise.',
    example: `const check = nn.hasWebAssembly()
const m = 'Does this browser support WebAssembly? ' + check

nn.get('body').content(m).css({
  background: 'darkgrey',
  color: 'black',
  fontSize: 30
})`
  },

  {
    name: 'hasFullscreen',
    source: { filepath: 'src/Averigua/Averigua.js', start: 322, end: 328 },
    signature: 'nn.hasFullscreen()',
    description: 'Returns `true` if the browser supports the Fullscreen API, which lets you present any element (or the whole page) in fullscreen mode. Useful for immersive installations and presentations.',
    friendly: 'This method checks whether the browser supports fullscreen mode, which lets you expand any element or the whole page to fill the screen.',
    params: [],
    returns: '`true` if `document.fullscreenEnabled` (or vendor-prefixed equivalent) is `true`, `false` otherwise.',
    example: `const check = nn.hasFullscreen()
const m = 'Does this browser support Fullscreen? ' + check

nn.get('body').content(m).css({
  background: 'darkgrey',
  color: 'black',
  fontSize: 30
})`
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ device info ~ ~ ~ ~ ~ ~ ~ ~

  {
    name: 'screen',
    source: { filepath: 'src/Averigua/Averigua.js', start: 78, end: 85 },
    signature: 'nn.screen()',
    description: 'Returns an object with information about the visitor\'s screen: its orientation, color depth, and pixel dimensions.',
    friendly: 'This method returns information about the user\'s screen, including its width, height, orientation (landscape or portrait), and color depth.',
    params: [],
    returns: 'An object `{ orientation, colorDepth, width, height }`. `orientation` is `"landscape"`, `"portrait"`, or `"no-support"`.',
    example: `const s = nn.screen()
const m = \`orientation: \${s.orientation}
colorDepth: \${s.colorDepth}
width: \${s.width}px
height: \${s.height}px\`

nn.get('body').content(m).css({
  background: 'darkgrey',
  color: 'black',
  fontSize: 24,
  whiteSpace: 'pre'
})

`
  },

  {
    name: 'orientation',
    source: { filepath: 'src/Averigua/Averigua.js', start: 68, end: 76 },
    signature: 'nn.orientation()',
    description: 'Returns the current device orientation as a string. Useful for responding to landscape/portrait changes on mobile.',
    friendly: 'This method tells you whether the device is currently in landscape or portrait orientation. Useful for adjusting your layout when the user rotates their phone or tablet.',
    params: [],
    returns: '`"landscape"`, `"portrait"`, or `"no-support"` if the browser does not expose orientation info.',
    example: `const result = nn.orientation()
const m = 'orientation: ' + result

nn.get('body').content(m).css({
  background: 'darkgrey',
  color: 'black',
  fontSize: 24
})`
  },

  {
    name: 'gpuInfo',
    source: { filepath: 'src/Averigua/Averigua.js', start: 100, end: 111 },
    signature: 'nn.gpuInfo()',
    description: 'Returns the GPU vendor and renderer strings via the WebGL debug extension. Where supported, this reveals the actual hardware GPU name rather than a generic string.',
    friendly: 'This method returns information about the user\'s graphics card, including the manufacturer and model name. Useful if you need to know what GPU is powering the rendering.',
    params: [],
    returns: 'An object `{ vendor, renderer }` with GPU identification strings.',
    example: `const gpu = nn.gpuInfo()
const m = \`vendor: \${gpu.vendor}
renderer: \${gpu.renderer}\`

nn.get('body').content(m).css({
  background: 'darkgrey',
  color: 'black',
  fontSize: 24,
  whiteSpace: 'pre'
})`
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ browser & platform ~ ~ ~ ~

  {
    name: 'browserInfo',
    source: { filepath: 'src/Averigua/Averigua.js', start: 113, end: 156 },
    signature: 'nn.browserInfo()',
    description: 'Returns the visitor\'s browser name and version, parsed from the user-agent string. Detects Chrome, Firefox, Safari, Opera (modern and legacy), Edge (Chromium and legacy EdgeHTML), Brave, Vivaldi, Yandex, Samsung Internet, UC Browser, DuckDuckGo, Electron, Chrome for iOS (CriOS), and IE.',
    friendly: 'This method returns the name and version of the user\'s browser, like <code>{ name: "Firefox", version: "120" }</code>. Useful for detecting which browser your audience is using.',
    params: [],
    returns: 'An object `{ name, version }`, e.g. `{ name: "Chrome", version: "120" }`.',
    example: `const b = nn.browserInfo()
const m = \`browser: \${b.name}, version \${b.version}\`

nn.get('body').content(m).css({
  background: 'darkgrey',
  color: 'black',
  fontSize: 24,
  whiteSpace: 'pre'
})`
  },

  {
    name: 'platformInfo',
    source: { filepath: 'src/Averigua/Averigua.js', start: 158, end: 185 },
    signature: 'nn.platformInfo()',
    description: 'Returns a summary of the visitor\'s platform: whether they\'re on mobile, their browser, their OS/CPU string, hardware concurrency, and platform identifier. In a Node.js context it returns more detailed OS information instead.',
    friendly: 'This method returns a summary of the user\'s platform, including their browser, operating system, whether they\'re on mobile, and how many processor cores they have.',
    params: [],
    returns: 'An object with `{ mobile, browser, oscpu, processors, platform }` in the browser, or detailed Node.js OS info when running server-side.',
    example: `const p = nn.platformInfo()
const m = \`platform: \${p.platform}
processors: \${p.processors}
browser: \${p.browser.name} \${p.browser.version}
mobile: \${p.mobile}\`

nn.get('body').content(m).css({
  background: 'darkgrey',
  color: 'black',
  fontSize: 24,
  whiteSpace: 'pre'
})`
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ media support ~ ~ ~ ~ ~ ~ ~

  {
    name: 'audioSupport',
    source: { filepath: 'src/Averigua/Averigua.js', start: 187, end: 203 },
    signature: 'nn.audioSupport()',
    description: 'Returns an object showing how well the browser supports common audio formats. Each value is `"probably"`, `"maybe"`, or `"no"`.',
    friendly: 'This method tells you which audio file formats the user\'s browser can play, like MP3, WAV, or AAC. Each format gets a value of <code>"probably"</code>, <code>"maybe"</code>, or <code>"no"</code>.',
    params: [],
    returns: 'An object `{ mp3, vorbis, wav, aac }` with support strings for each format.',
    example: `const a = nn.audioSupport()
const m = \`mp3: \${a.mp3}
vorbis: \${a.vorbis}
wav: \${a.wav}
aac: \${a.aac}\`

nn.get('body').content(m).css({
  background: 'darkgrey',
  color: 'black',
  fontSize: 24,
  whiteSpace: 'pre'
})`
  },

  {
    name: 'videoSupport',
    source: { filepath: 'src/Averigua/Averigua.js', start: 205, end: 230 },
    signature: 'nn.videoSupport()',
    description: 'Returns an object showing how well the browser supports common video formats and features. Each value is `"probably"`, `"maybe"`, or `"no"`.',
    friendly: 'This method tells you which video formats the user\'s browser can play, like WebM or H.264. Each format gets a value of <code>"probably"</code>, <code>"maybe"</code>, or <code>"no"</code>.',
    params: [],
    returns: 'An object `{ captions, poster, webm, h264, theora }` with support strings.',
    example: `const v = nn.videoSupport()
const m = \`webm: \${v.webm}
h264: \${v.h264}
theora: \${v.theora}
captions: \${v.captions}
poster: \${v.poster}\`

nn.get('body').content(m).css({
  background: 'darkgrey',
  color: 'black',
  fontSize: 24,
  whiteSpace: 'pre'
})`
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ storage & fonts ~ ~ ~ ~ ~ ~

  {
    name: 'storageSupport',
    source: { filepath: 'src/Averigua/Averigua.js', start: 330, end: 337 },
    signature: 'nn.storageSupport()',
    description: 'Returns an object indicating which browser storage mechanisms are available: `localStorage`, `sessionStorage`, and `indexedDB`. Useful for deciding how to persist sketch state or user data.',
    friendly: 'This method tells you which browser storage options are available, like <code>localStorage</code> and <code>sessionStorage</code>. Useful for deciding how to save data between page visits.',
    params: [],
    returns: 'An object `{ localStorage, sessionStorage, indexedDB }` with boolean values.',
    example: `const s = nn.storageSupport()
const m = \`localStorage: \${s.localStorage}
sessionStorage: \${s.sessionStorage}
indexedDB: \${s.indexedDB}\`

nn.get('body').content(m).css({
  background: 'darkgrey',
  color: 'black',
  fontSize: 24,
  whiteSpace: 'pre'
})`
  },

  {
    name: 'fontSupport',
    source: { filepath: 'src/Averigua/Averigua.js', start: 339, end: 475 },
    signature: 'nn.fontSupport()',
    description: 'Returns an array of font family names that are installed and available on the visitor\'s system. Detected by comparing glyph widths against baseline fonts. Useful for typography-driven generative work.',
    friendly: 'This method returns a list of fonts installed on the user\'s system. Useful if you want to use a locally available font in your work, or to create typography-driven generative pieces.',
    params: [],
    returns: 'An array of font name strings that are available on the current system.',
    example: `const fonts = nn.fontSupport()
const m = \`identified \${fonts.length} fonts,
including \${nn.random(fonts)} for example.\`

nn.get('body').content(m).css({
  background: 'darkgrey',
  color: 'black',
  fontSize: 24,
  whiteSpace: 'pre'
})`
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ locale ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  {
    name: 'language',
    source: { filepath: 'src/Averigua/Averigua.js', start: 87, end: 92 },
    signature: 'nn.language()',
    description: 'Returns the visitor\'s browser language as a human-readable object. Can be used for locale-aware generative work or to tailor content to the visitor\'s region.',
    friendly: 'This method returns the language and region set in the user\'s browser, like <code>{ language: "English", country: "US" }</code>. Useful for tailoring your work to different audiences.',
    params: [],
    returns: 'An object `{ language }` and optionally `{ language, country }` if a region code is present.',
    example: `const lang = nn.language()
const m = \`language: \${lang.language}
country: \${lang.country}\`

nn.get('body').content(m).css({
  background: 'darkgrey',
  color: 'black',
  fontSize: 24,
  whiteSpace: 'pre'
})`
  },

  {
    name: 'timeZone',
    source: { filepath: 'src/Averigua/Averigua.js', start: 94, end: 98 },
    signature: 'nn.timeZone()',
    description: 'Returns the visitor\'s time zone as an IANA string (e.g. `"America/Chicago"`), or falls back to a UTC offset number. Useful for time-based generative work that responds to where in the world the viewer is.',
    friendly: 'This method returns the user\'s time zone, like <code>"America/Chicago"</code>. Useful for making work that responds to where in the world your audience is located.',
    params: [],
    returns: 'An IANA time zone string like `"America/New_York"`, or a UTC offset number as a fallback.',
    example: `const tz = nn.timeZone()
const m = 'Your time zone: ' + tz

nn.get('body').content(m).css({
  background: 'darkgrey',
  color: 'black',
  fontSize: 24,
  whiteSpace: 'pre'
})`
  }
]

if (typeof module !== 'undefined') module.exports = AVERIGUA_DOCS
else window.AVERIGUA_DOCS = AVERIGUA_DOCS
