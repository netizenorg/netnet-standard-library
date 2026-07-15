# `nn` ( ◕ ◞ ◕ ) netnet-standard-library

| | | |
|:---:|:---:|:---:|
| **[introduction page](https://netizenorg.github.io/netnet-standard-library/)** | **[documentation page](https://netizenorg.github.io/netnet-standard-library/docs/)** | **[demo gallery](https://netizenorg.github.io/netnet-standard-library/examples/demos/)** |

`nn` (netnet-standard-library.js) is a browser-based JavaScript library designed to aid creative coders working on internet art and web design projects. It serves as the core utility library for [netnet.studio](https://netnet.studio), functioning both as a tool-kit for creating interactive and generative work within the platform and as a tool for building netnet.studio itself. The library is intentionally approachable for beginners, featuring helpful error messages and [friendly documentation](https://netizenorg.github.io/netnet-standard-library/docs/), yet expressive enough to support complex creative work.

While the `nn` library can be used on its own, it's really designed to work alongside other creative coding libraries (Matter.js, hydra.js, TensorFlow.js, Three.js, Tone.js, etc), and can even act as a glue to bridge them together. For example, you could use D3.js to generate data visualizations, then apply nn's color theory methods to ensure the chart colors follow harmonious color schemes and meet WCAG AA accessibility standards. Similarly, you could use nn's music theory utilities to generate scales and chords, then pass them to Tone.js for playback. You can see this in action in our [demos gallery](https://netizenorg.github.io/netnet-standard-library/examples/demos/).


# getting started

Add a single `<script>` tag to your HTML, there's no build step, no package manager, no dependencies. The global `nn` object is then available everywhere on the page. Pin to a specific version so your project won't change unexpectedly if the library updates:

```html
<!-- 1.0.1 (most recent stable version) -->
<script src="https://cdn.jsdelivr.net/gh/netizenorg/netnet-standard-library@1.0.1/build/nn.min.js"></script>

<!-- 0.9.0 (the original pre-release version) -->
<script src="https://cdn.jsdelivr.net/gh/netizenorg/netnet-standard-library@0.9.0/build/nn.min.js"></script>
```

Here's a "hello world" GIF-drawing tool, you can learn from and also [remix on netnet.studio](https://netnet.studio/?demo=1760397365973).
```html
<script src="https://cdn.jsdelivr.net/gh/netizenorg/netnet-standard-library/build/nn.min.js"></script>
<script>
  function drawGifs () {
    // if mouse is not (!) pressed down exit function
    if (!nn.mouseDown) return
    // otherwise, create a new gif
    nn.create('img')
      .set('src', 'https://netnet.studio/cd.gif')
      .positionOrigin('center')
      .position(nn.mouseX, nn.mouseY)
      .css('pointer-events', 'none')
      .addTo('body')
  }

  // click and drag mouse across the screen
  // to draw new gif img elements
  nn.on('mousemove', drawGifs)
</script>
```

To learn more visit our introduction page, there you'll find intros to the library's core concepts/patterns including:
- [How to render HTML elements dynamically](https://netizenorg.github.io/netnet-standard-library/#dom-elements)
- [How to use callback functions](https://netizenorg.github.io/netnet-standard-library/#callbacks)
- [How to setup event listeners for interaction](https://netizenorg.github.io/netnet-standard-library/#events)
- [How to work with async/await functions](https://netizenorg.github.io/netnet-standard-library/#async)
- [How to render vector graphics with `<svg>` and raster graphics with `<canvas>`](https://netizenorg.github.io/netnet-standard-library/#rendering)
- [How to setup a generative animation loop](https://netizenorg.github.io/netnet-standard-library/#animate)


There are many amazing creative coding libraries that extend the capabilities of the Web's creative APIs, often providing frameworks for expressing higher-level concepts, like how A-Frame's Entity-Component-System adds game design principles to WebGL and WebXR, or how Tone.js brings music synthesis and DAW (Digital Audio Workstation) concepts to the Web Audio API. While the `nn` library can be used on its own, it's really designed to work alongside these other frameworks. For example, you could use D3.js to generate data visualizations, then apply nn's color theory methods to ensure the chart colors follow harmonious color schemes and meet WCAG AA accessibility standards. Similarly, you could use nn's music theory utilities to generate scales and chords, then pass them to Tone.js for playback. You can see this in action in our [demos gallery](https://netizenorg.github.io/netnet-standard-library/examples/demos).



# contributions

If you'd like to contribute to this repository, below are the steps you should take to setup a local project as well as contribute any bug fixes, additions or other changes.

### setup
0. start by [fork our repo](https://github.com/netizenorg/netnet-standard-library/fork) this repo
1. then clone your fork `git clone https://github.com/[YOUR_USER_NAME]/netnet.studio.git`
2. then install the dev dependencies `npm install`
3. lastly, setup a remote "upstream" to our repo: `git remote add upstream https://github.com/netizenorg/netnet-standard-library.git`

### development

0. before starting on a new feature it's always a good idea to run `git pull upstream main` to pull updates from our repo.
1. create a "feature" branch `git checkout -b [FEATURE-NAME]` for your contribution.

2. All the source code can be found in `/src`, there you'll find sub-folders for the different categories, within those sub-folders you'll find the source code files and their accompanying documentation files.
  - If you edit or add a new function/method, make sure to add/edit it's documentation entry as well.
  - If your contribution also requires updating the API Index (in this README below) make sure to do that as well

3. as you work locally you can
  - use the `npm run build` command to create new builds of the library
  - serve the repo locally to use the `/examples` page to write examples and test your changes
  - use the `npm run lint` command to ensure you're conforming to our [coding style](https://standardjs.com/) before making any commits.
  - use the `npm run docs` to make sure the `source` property of your doc entry has the right start/end lines

4. when you're ready, create a [PR](https://github.com/netizenorg/netnet-standard-library/pulls) *from* your `feature` branch and *into* our `main` branch.

5. Once your PR has been merged, clean things up before starting on another feature
```
git checkout main
git pull upstream main
git push origin --delete [FEATURE-NAME]
git branch --delete [FEATURE-NAME]
```


# API Index

Below is an index of all of `nn` internal methods with hyperlinks to their documentation. You can also find the
full documentation page here: [https://netizenorg.github.io/netnet-standard-library/docs/](https://netizenorg.github.io/netnet-standard-library/docs/)

## properties

- [nn.width](https://netizenorg.github.io/netnet-standard-library/docs/#dom/width) `// browser's current width`
- [nn.height](https://netizenorg.github.io/netnet-standard-library/docs/#dom/height) `// browser's current height`
- [nn.mouseX](https://netizenorg.github.io/netnet-standard-library/docs/#dom/mouseX) `// mouse's current x position`
- [nn.mouseY](https://netizenorg.github.io/netnet-standard-library/docs/#dom/mouseY) `// mouse's current y position`
- [nn.mouseDown](https://netizenorg.github.io/netnet-standard-library/docs/#dom/mouseDown) `// is mouse currently pressed`
- [nn.pointer](https://netizenorg.github.io/netnet-standard-library/docs/#dom/pointer) `// first active pointer contact { x, y, id, type } or null`
- [nn.pointers](https://netizenorg.github.io/netnet-standard-library/docs/#dom/pointers) `// array of all active pointer contacts`

## core utilities

- [nn.sleep(ms)](https://netizenorg.github.io/netnet-standard-library/docs/#dom/sleep) `// pause code for a specified time`
- [nn.times(n, fn)](https://netizenorg.github.io/netnet-standard-library/docs/#dom/times) `// call a function n times`
- [nn.range(start, end, step)](https://netizenorg.github.io/netnet-standard-library/docs/#dom/range) `// generate a range of numbers`
- [nn.on(evt, fn)](https://netizenorg.github.io/netnet-standard-library/docs/#dom/on) `// register an event listener on the window`
- [nn.off(evt, fn)](https://netizenorg.github.io/netnet-standard-library/docs/#dom/off) `// remove an event listener from the window`

## rendering (html)

- [nn.get(selector)](https://netizenorg.github.io/netnet-standard-library/docs/#dom/get) `// select an element and return it "overloaded"` *(same chainable methods as `create`)*
- [nn.getAll(selector)](https://netizenorg.github.io/netnet-standard-library/docs/#dom/getAll) `// select all matching elements "overloaded"` *(same chainable methods as `create`)*
- [nn.create(tag)](https://netizenorg.github.io/netnet-standard-library/docs/#dom/create) `// create an "overloaded" HTMLElement`
  - [.on(evt, fn)](https://netizenorg.github.io/netnet-standard-library/docs/#dom/on) `// attach an event listener`
  - [.off(evt, fn)](https://netizenorg.github.io/netnet-standard-library/docs/#dom/off) `// remove an event listener`
  - [.content(str)](https://netizenorg.github.io/netnet-standard-library/docs/#dom/content) `// set the element's innerHTML`
  - [.set(attr, val)](https://netizenorg.github.io/netnet-standard-library/docs/#dom/set) `// set an attribute or object of attributes; also .set('.class') or .set('#id')`
  - [.get(selector)](https://netizenorg.github.io/netnet-standard-library/docs/#dom/get) `// select a child element`
  - [.getAll(selector)](https://netizenorg.github.io/netnet-standard-library/docs/#dom/getAll) `// select all matching child elements`
  - [.css(prop, val)](https://netizenorg.github.io/netnet-standard-library/docs/#dom/css) `// set a CSS property or object of properties`
  - [.transition(prop, ms)](https://netizenorg.github.io/netnet-standard-library/docs/#dom/transition) `// set a CSS transition`
  - [.addTo(parent)](https://netizenorg.github.io/netnet-standard-library/docs/#dom/addTo) `// append element to a parent`
  - [.size(w, h)](https://netizenorg.github.io/netnet-standard-library/docs/#dom/size) `// set width (and optionally height); omit h for a square`
  - [.position(x, y)](https://netizenorg.github.io/netnet-standard-library/docs/#dom/position) `// position element absolutely`
  - [.positionOrigin(type)](https://netizenorg.github.io/netnet-standard-library/docs/#dom/positionOrigin) `// 'center' makes x/y refer to element's center`
  - [.rotate(deg)](https://netizenorg.github.io/netnet-standard-library/docs/#dom/rotate) `// rotate element in degrees`
  - [.scale(x, y)](https://netizenorg.github.io/netnet-standard-library/docs/#dom/scale) `// scale element`
  - [.skew(xDeg, yDeg)](https://netizenorg.github.io/netnet-standard-library/docs/#dom/skew) `// skew element`
  - [.blur(px)](https://netizenorg.github.io/netnet-standard-library/docs/#dom/blur) `// apply CSS blur filter`
  - [.brightness(val)](https://netizenorg.github.io/netnet-standard-library/docs/#dom/brightness) `// apply CSS brightness filter`
  - [.contrast(val)](https://netizenorg.github.io/netnet-standard-library/docs/#dom/contrast) `// apply CSS contrast filter`
  - [.dropShadow(x, y, blur, color)](https://netizenorg.github.io/netnet-standard-library/docs/#dom/dropShadow) `// apply CSS drop shadow`
  - [.grayscale(val)](https://netizenorg.github.io/netnet-standard-library/docs/#dom/grayscale) `// apply CSS grayscale filter`
  - [.hueRotate(deg)](https://netizenorg.github.io/netnet-standard-library/docs/#dom/hueRotate) `// apply CSS hue rotation`
  - [.invert(val)](https://netizenorg.github.io/netnet-standard-library/docs/#dom/invert) `// apply CSS invert filter`
  - [.opacity(val)](https://netizenorg.github.io/netnet-standard-library/docs/#dom/opacity) `// apply CSS opacity filter`
  - [.saturate(val)](https://netizenorg.github.io/netnet-standard-library/docs/#dom/saturate) `// apply CSS saturation filter`
  - [.sepia(val)](https://netizenorg.github.io/netnet-standard-library/docs/#dom/sepia) `// apply CSS sepia filter`
  - [.data](https://netizenorg.github.io/netnet-standard-library/docs/#dom/data) `// proxy for reading/writing data-* attributes`
  - [.value](https://netizenorg.github.io/netnet-standard-library/docs/#dom/value) `// auto-coerced to number for number/range inputs`


# media utilities

- [nn.loadImage(src)](https://netizenorg.github.io/netnet-standard-library/docs/#media/loadImage) `// Promise-based image loading`
- [nn.filterImage(image, fn, opts?)](https://netizenorg.github.io/netnet-standard-library/docs/#media/filterImage) `// filter image pixels; fn receives { r,g,b,a } (default), or raw array`
- [nn.filterVideo(video, fn, opts?)](https://netizenorg.github.io/netnet-standard-library/docs/#media/filterVideo) `// live filter video pixels; fn receives { r,g,b,a } (default), or raw array`
- [nn.popup(url, x, y, w, h)](https://netizenorg.github.io/netnet-standard-library/docs/#media/popup) `// open a new browser window`
- [nn.hyper(media)](https://netizenorg.github.io/netnet-standard-library/docs/#media/hyper) `// attach time-based cues to audio/video with .at(seconds, fn)`

# user permissions
- [nn.askFor(type)](https://netizenorg.github.io/netnet-standard-library/docs/#media/askFor) `// request camera, mic, gps, etc. ('video','audio','capture','gps','notifications','clipboard','bluetooth','usb','serial','motion','orientation')`
- [nn.askForStream(constraints)](https://netizenorg.github.io/netnet-standard-library/docs/#media/askForStream) `// full getUserMedia with constraints object`
- [nn.askForCapture()](https://netizenorg.github.io/netnet-standard-library/docs/#media/askForCapture) `// screen/window/tab capture`
- [nn.askForNotifications()](https://netizenorg.github.io/netnet-standard-library/docs/#media/askForNotifications) `// request notification permission`
- [nn.askForClipboard()](https://netizenorg.github.io/netnet-standard-library/docs/#media/askForClipboard) `// read the clipboard`
- [nn.askForBluetooth(filters?)](https://netizenorg.github.io/netnet-standard-library/docs/#media/askForBluetooth) `// show Bluetooth device picker`
- [nn.askForUSB(filters?)](https://netizenorg.github.io/netnet-standard-library/docs/#media/askForUSB) `// show USB device picker`
- [nn.askForSerial(filters?)](https://netizenorg.github.io/netnet-standard-library/docs/#media/askForSerial) `// show serial port picker`
- [nn.askForMotion()](https://netizenorg.github.io/netnet-standard-library/docs/#media/askForMotion) `// request device motion permission (iOS 13+)`
- [nn.askForOrientation()](https://netizenorg.github.io/netnet-standard-library/docs/#media/askForOrientation) `// request device orientation permission (iOS 13+)`
- [nn.askForGPS()](https://netizenorg.github.io/netnet-standard-library/docs/#media/askForGPS) `// request geolocation`
- [nn.MIDI](https://netizenorg.github.io/netnet-standard-library/docs/#dom/MIDI) `// access plugged-in MIDI devices`

## data

- [nn.parse(str)](https://netizenorg.github.io/netnet-standard-library/docs/#data/parse) `// parse a JSON or CSV string; auto-detects format`
- [nn.serialize(data, format?)](https://netizenorg.github.io/netnet-standard-library/docs/#data/serialize) `// convert data to a JSON or CSV string`
- [nn.download(data, filename?)](https://netizenorg.github.io/netnet-standard-library/docs/#data/download) `// trigger a browser file download; auto-detects type`
- [nn.upload(options?)](https://netizenorg.github.io/netnet-standard-library/docs/#data/upload) `// open file picker; returns Promise with { name, size, type, data }`

## feature detection

- [nn.isBrowser()](https://netizenorg.github.io/netnet-standard-library/docs/#averigua/isBrowser) `// is the code running in a browser`
- [nn.isMobile()](https://netizenorg.github.io/netnet-standard-library/docs/#averigua/isMobile) `// is the visitor on a mobile device`
- [nn.browserInfo()](https://netizenorg.github.io/netnet-standard-library/docs/#averigua/browserInfo) `// browser name and version`
- [nn.platformInfo()](https://netizenorg.github.io/netnet-standard-library/docs/#averigua/platformInfo) `// OS and platform info`
- [nn.gpuInfo()](https://netizenorg.github.io/netnet-standard-library/docs/#averigua/gpuInfo) `// graphics card info`
- [nn.screen()](https://netizenorg.github.io/netnet-standard-library/docs/#averigua/screen) `// screen dimensions and properties`
- [nn.orientation()](https://netizenorg.github.io/netnet-standard-library/docs/#averigua/orientation) `// device orientation`
- [nn.language()](https://netizenorg.github.io/netnet-standard-library/docs/#averigua/language) `// user's language preference`
- [nn.timeZone()](https://netizenorg.github.io/netnet-standard-library/docs/#averigua/timeZone) `// user's time zone`
- [nn.audioSupport()](https://netizenorg.github.io/netnet-standard-library/docs/#averigua/audioSupport) `// browser audio format support`
- [nn.videoSupport()](https://netizenorg.github.io/netnet-standard-library/docs/#averigua/videoSupport) `// browser video format support`
- [nn.storageSupport()](https://netizenorg.github.io/netnet-standard-library/docs/#averigua/storageSupport) `// localStorage / sessionStorage support`
- [nn.fontSupport()](https://netizenorg.github.io/netnet-standard-library/docs/#averigua/fontSupport) `// font feature support`
- [nn.hasTouch()](https://netizenorg.github.io/netnet-standard-library/docs/#averigua/hasTouch) `// touch screen support`
- [nn.hasWebGL()](https://netizenorg.github.io/netnet-standard-library/docs/#averigua/hasWebGL) `// WebGL / 3D graphics support`
- [nn.hasWebVR()](https://netizenorg.github.io/netnet-standard-library/docs/#averigua/hasWebVR) `// WebVR support`
- [nn.hasWebXR()](https://netizenorg.github.io/netnet-standard-library/docs/#averigua/hasWebXR) `// WebXR (VR/AR) support`
- [nn.hasWebAudio()](https://netizenorg.github.io/netnet-standard-library/docs/#averigua/hasWebAudio) `// Web Audio API support`
- [nn.hasMIDI()](https://netizenorg.github.io/netnet-standard-library/docs/#averigua/hasMIDI) `// Web MIDI API support`
- [nn.hasMediaDevices()](https://netizenorg.github.io/netnet-standard-library/docs/#averigua/hasMediaDevices) `// getUserMedia support`
- [nn.hasDeviceMotion()](https://netizenorg.github.io/netnet-standard-library/docs/#averigua/hasDeviceMotion) `// device motion events support`
- [nn.hasDeviceOrientation()](https://netizenorg.github.io/netnet-standard-library/docs/#averigua/hasDeviceOrientation) `// device orientation events support`
- [nn.hasPointerLock()](https://netizenorg.github.io/netnet-standard-library/docs/#averigua/hasPointerLock) `// Pointer Lock API support`
- [nn.hasGamepad()](https://netizenorg.github.io/netnet-standard-library/docs/#averigua/hasGamepad) `// Gamepad API support`
- [nn.hasWebSerial()](https://netizenorg.github.io/netnet-standard-library/docs/#averigua/hasWebSerial) `// Web Serial API support`
- [nn.hasWebUSB()](https://netizenorg.github.io/netnet-standard-library/docs/#averigua/hasWebUSB) `// WebUSB API support`
- [nn.hasBluetooth()](https://netizenorg.github.io/netnet-standard-library/docs/#averigua/hasBluetooth) `// Web Bluetooth API support`
- [nn.hasSpeechRecognition()](https://netizenorg.github.io/netnet-standard-library/docs/#averigua/hasSpeechRecognition) `// Speech Recognition API support`
- [nn.hasSpeechSynthesis()](https://netizenorg.github.io/netnet-standard-library/docs/#averigua/hasSpeechSynthesis) `// Speech Synthesis API support`
- [nn.hasWebAssembly()](https://netizenorg.github.io/netnet-standard-library/docs/#averigua/hasWebAssembly) `// WebAssembly support`
- [nn.hasFullscreen()](https://netizenorg.github.io/netnet-standard-library/docs/#averigua/hasFullscreen) `// Fullscreen API support`

## Maths

- [nn.norm(val, min, max)](https://netizenorg.github.io/netnet-standard-library/docs/#maths/norm) `// normalize a value to 0–1`
- [nn.clamp(val, min, max)](https://netizenorg.github.io/netnet-standard-library/docs/#maths/clamp) `// constrain a value to a range`
- [nn.lerp(a, b, t)](https://netizenorg.github.io/netnet-standard-library/docs/#maths/lerp) `// linear interpolation`
- [nn.map(val, inMin, inMax, outMin, outMax)](https://netizenorg.github.io/netnet-standard-library/docs/#maths/map) `// map a value from one range to another`
- [nn.dist(x1, y1, x2, y2)](https://netizenorg.github.io/netnet-standard-library/docs/#maths/dist) `// distance between two points`
- [nn.angleBtw(x1, y1, x2, y2)](https://netizenorg.github.io/netnet-standard-library/docs/#maths/angleBtw) `// angle between two points`
- [nn.radToDeg(rad)](https://netizenorg.github.io/netnet-standard-library/docs/#maths/radToDeg) `// radians to degrees`
- [nn.degToRad(deg)](https://netizenorg.github.io/netnet-standard-library/docs/#maths/degToRad) `// degrees to radians`
- [nn.cartesianToPolar(x, y)](https://netizenorg.github.io/netnet-standard-library/docs/#maths/cartesianToPolar) `// cartesian to polar coordinates`
- [nn.polarToCartesian(dist, angle)](https://netizenorg.github.io/netnet-standard-library/docs/#maths/polarToCartesian) `// polar to cartesian coordinates`
- [nn.shuffle(arr)](https://netizenorg.github.io/netnet-standard-library/docs/#maths/shuffle) `// randomize the items in an array`
- [nn.randomInt(min, max)](https://netizenorg.github.io/netnet-standard-library/docs/#maths/randomInt) `// random integer`
- [nn.randomFloat(min, max)](https://netizenorg.github.io/netnet-standard-library/docs/#maths/randomFloat) `// random float`
- [nn.random(min, max)](https://netizenorg.github.io/netnet-standard-library/docs/#maths/random) `// random number, or random item from an array`
- [nn.perlin(x, y, z)](https://netizenorg.github.io/netnet-standard-library/docs/#maths/perlin) `// Perlin noise`
- [nn.ease(type, t)](https://netizenorg.github.io/netnet-standard-library/docs/#maths/ease) `// easing / tweening functions`

## Color Theory

- [nn.randomColor()](https://netizenorg.github.io/netnet-standard-library/docs/#color/randomColor) `// generate a random color string`
- [nn.colorGradient(colors, steps)](https://netizenorg.github.io/netnet-standard-library/docs/#color/colorGradient) `// multi-stop gradient as a color array or CSS string`
- [nn.colorScheme(color, type)](https://netizenorg.github.io/netnet-standard-library/docs/#color/colorScheme) `// generate a color scheme array`
- [nn.lerpColor(a, b, t)](https://netizenorg.github.io/netnet-standard-library/docs/#color/lerpColor) `// interpolate between two colors`
- [nn.closestColor(color, palette)](https://netizenorg.github.io/netnet-standard-library/docs/#color/closestColor) `// find the nearest color in a palette`
- [nn.rgb(r, g, b, a)](https://netizenorg.github.io/netnet-standard-library/docs/#color/rgb) `// build an rgb/rgba CSS color string`
- [nn.hsl(h, s, l, a)](https://netizenorg.github.io/netnet-standard-library/docs/#color/hsl) `// build an hsl/hsla CSS color string`
- [nn.toRGB(color)](https://netizenorg.github.io/netnet-standard-library/docs/#color/toRGB) `// normalize any color to { r, g, b }`
- [nn.toHSL(color)](https://netizenorg.github.io/netnet-standard-library/docs/#color/toHSL) `// normalize any color to { h, s, l }`
- [nn.toHex(color)](https://netizenorg.github.io/netnet-standard-library/docs/#color/toHex) `// normalize any color to a hex string`
- [nn.isLight(color)](https://netizenorg.github.io/netnet-standard-library/docs/#color/isLight) `// check if a color is light or dark`
- [nn.colorContrast(a, b)](https://netizenorg.github.io/netnet-standard-library/docs/#color/colorContrast) `// WCAG contrast ratio between two colors`
- [nn.colorMatch(a, b)](https://netizenorg.github.io/netnet-standard-library/docs/#color/colorMatch) `// find color strings within larger strings`
- [nn.alpha2hex(alpha)](https://netizenorg.github.io/netnet-standard-library/docs/#color/alpha2hex) `// alpha float to hex byte string`
- [nn.hex2alpha(hex)](https://netizenorg.github.io/netnet-standard-library/docs/#color/hex2alpha) `// hex byte string to alpha float`

## Music Theory

- [nn.notes](https://netizenorg.github.io/netnet-standard-library/docs/#music/notes) `// array of note names for each semitone index`
- [nn.modes](https://netizenorg.github.io/netnet-standard-library/docs/#music/modes) `// map of mode names to their interval patterns`
- [nn.chords](https://netizenorg.github.io/netnet-standard-library/docs/#music/chords) `// predefined chord shapes as scale-degree arrays`
- [nn.noteToMidi(note)](https://netizenorg.github.io/netnet-standard-library/docs/#music/noteToMidi) `// note name like 'C4' → MIDI number`
- [nn.midiToNote(midi)](https://netizenorg.github.io/netnet-standard-library/docs/#music/midiToNote) `// MIDI number → note name like 'C4'`
- [nn.noteToFrequency(note)](https://netizenorg.github.io/netnet-standard-library/docs/#music/noteToFrequency) `// note name like 'A4' → frequency in Hz`
- [nn.frequencyToNote(freq)](https://netizenorg.github.io/netnet-standard-library/docs/#music/frequencyToNote) `// frequency in Hz → nearest note name`
- [nn.midiToFrequency(midi)](https://netizenorg.github.io/netnet-standard-library/docs/#music/midiToFrequency) `// MIDI number → frequency in Hz`
- [nn.frequencyToMidi(freq)](https://netizenorg.github.io/netnet-standard-library/docs/#music/frequencyToMidi) `// frequency in Hz → nearest MIDI number`
- [nn.stripOctave(note)](https://netizenorg.github.io/netnet-standard-library/docs/#music/stripOctave) `// remove octave number from a note name`
- [nn.randomMode()](https://netizenorg.github.io/netnet-standard-library/docs/#music/randomMode) `// generate a random set of scale step intervals`
- [nn.createScale(root, mode)](https://netizenorg.github.io/netnet-standard-library/docs/#music/createScale) `// build a scale from a root note and mode`
- [nn.rotateScale(scale, k)](https://netizenorg.github.io/netnet-standard-library/docs/#music/rotateScale) `// rotate a scale to start from a different degree`
- [nn.transposeScale(scale, semitones)](https://netizenorg.github.io/netnet-standard-library/docs/#music/transposeScale) `// transpose all notes in a scale`
- [nn.createChord(scale, type)](https://netizenorg.github.io/netnet-standard-library/docs/#music/createChord) `// extract a chord from a scale`
- [nn.voiceChord(chord, oct)](https://netizenorg.github.io/netnet-standard-library/docs/#music/voiceChord) `// add octave numbers for strictly ascending pitches`

## rendering (canvas)

`nn.create('canvas')` returns a canvas element with additional drawing methods:

### style properties
- [.fillColor](https://netizenorg.github.io/netnet-standard-library/docs/#canvas/fillColor) `// get/set fill color`
- [.strokeColor](https://netizenorg.github.io/netnet-standard-library/docs/#canvas/strokeColor) `// get/set stroke color`
- [.lineWidth](https://netizenorg.github.io/netnet-standard-library/docs/#canvas/lineWidth) `// get/set stroke width`
- [.lineCap](https://netizenorg.github.io/netnet-standard-library/docs/#canvas/lineCap) `// get/set line cap style ('butt', 'round', 'square')`
- [.lineJoin](https://netizenorg.github.io/netnet-standard-library/docs/#canvas/lineJoin) `// get/set line join style ('miter', 'round', 'bevel')`
- [.font](https://netizenorg.github.io/netnet-standard-library/docs/#canvas/font) `// get/set font string`
- [.textAlign](https://netizenorg.github.io/netnet-standard-library/docs/#canvas/textAlign) `// get/set text alignment`
- [.textBaseline](https://netizenorg.github.io/netnet-standard-library/docs/#canvas/textBaseline) `// get/set text baseline`
- [.globalAlpha](https://netizenorg.github.io/netnet-standard-library/docs/#canvas/globalAlpha) `// get/set global opacity`
- [.blendMode](https://netizenorg.github.io/netnet-standard-library/docs/#canvas/blendMode) `// get/set blend mode`
- [.shadowBlur](https://netizenorg.github.io/netnet-standard-library/docs/#canvas/shadowBlur) `// get/set shadow blur radius`
- [.shadowColor](https://netizenorg.github.io/netnet-standard-library/docs/#canvas/shadowColor) `// get/set shadow color`
- [.shadowOffsetX](https://netizenorg.github.io/netnet-standard-library/docs/#canvas/shadowOffsetX) `// get/set shadow X offset`
- [.shadowOffsetY](https://netizenorg.github.io/netnet-standard-library/docs/#canvas/shadowOffsetY) `// get/set shadow Y offset`

### drawing
- [.circle(x, y, r)](https://netizenorg.github.io/netnet-standard-library/docs/#canvas/circle) `// draw a filled/stroked circle`
- [.ellipse(x, y, rx, ry, rotation)](https://netizenorg.github.io/netnet-standard-library/docs/#canvas/ellipse) `// draw a filled/stroked ellipse`
- [.rect(x, y, w, h)](https://netizenorg.github.io/netnet-standard-library/docs/#canvas/rect) `// draw a filled/stroked rectangle`
- [.line(x1, y1, x2, y2)](https://netizenorg.github.io/netnet-standard-library/docs/#canvas/line) `// draw a stroked line`
- [.triangle(x1, y1, x2, y2, x3, y3)](https://netizenorg.github.io/netnet-standard-library/docs/#canvas/triangle) `// draw a filled/stroked triangle`
- [.text(str, x, y)](https://netizenorg.github.io/netnet-standard-library/docs/#canvas/text) `// draw a text string`
- [.drawImage(src, x, y, w, h)](https://netizenorg.github.io/netnet-standard-library/docs/#canvas/drawImage) `// draw an image or video`

### custom paths
- [.beginPath()](https://netizenorg.github.io/netnet-standard-library/docs/#canvas/beginPath) `// start a new path`
- [.moveTo(x, y)](https://netizenorg.github.io/netnet-standard-library/docs/#canvas/beginPath) `// move pen to a point`
- [.lineTo(x, y)](https://netizenorg.github.io/netnet-standard-library/docs/#canvas/beginPath) `// draw a line to a point`
- [.arc(x, y, r, start, end)](https://netizenorg.github.io/netnet-standard-library/docs/#canvas/arc) `// add an arc to the path`
- [.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)](https://netizenorg.github.io/netnet-standard-library/docs/#canvas/bezierCurveTo) `// add a cubic Bézier curve`
- [.closePath()](https://netizenorg.github.io/netnet-standard-library/docs/#canvas/beginPath) `// close the current path`
- [.fill()](https://netizenorg.github.io/netnet-standard-library/docs/#canvas/beginPath) `// fill the current path`
- [.stroke()](https://netizenorg.github.io/netnet-standard-library/docs/#canvas/beginPath) `// stroke the current path`

### transforms
- [.save()](https://netizenorg.github.io/netnet-standard-library/docs/#canvas/save) `// push drawing state onto the stack`
- [.restore()](https://netizenorg.github.io/netnet-standard-library/docs/#canvas/save) `// pop drawing state from the stack`
- [.translate(x, y)](https://netizenorg.github.io/netnet-standard-library/docs/#canvas/translate) `// shift the coordinate origin`
- [.rotate(radians)](https://netizenorg.github.io/netnet-standard-library/docs/#canvas/rotate) `// rotate the coordinate system`
- [.scale(x, y)](https://netizenorg.github.io/netnet-standard-library/docs/#canvas/scale) `// scale the coordinate system`

### utilities
- [.clear()](https://netizenorg.github.io/netnet-standard-library/docs/#canvas/clear) `// erase the entire canvas`
- [.resize(w, h)](https://netizenorg.github.io/netnet-standard-library/docs/#canvas/resize) `// resize the canvas drawing buffer`
- [.getPixels(opts?)](https://netizenorg.github.io/netnet-standard-library/docs/#canvas/getPixels) `// get pixel data as { r,g,b,a } objects (default) or raw array`
- [.setPixels(arr)](https://netizenorg.github.io/netnet-standard-library/docs/#canvas/setPixels) `// write pixel data back; accepts { r,g,b,a } objects or a flat Uint8ClampedArray`
- [.createLinearGradient(x0, y0, x1, y1)](https://netizenorg.github.io/netnet-standard-library/docs/#canvas/createLinearGradient) `// create a linear gradient`

## rendering (svg)

`nn.create('svg')` returns an SVG element with shape factory methods. Shapes returned by those factories are themselves chainable.

### shape factory methods
- [.circle(cx, cy, r)](https://netizenorg.github.io/netnet-standard-library/docs/#svg/circle) `// create and append a circle`
- [.ellipse(cx, cy, rx, ry)](https://netizenorg.github.io/netnet-standard-library/docs/#svg/ellipse) `// create and append an ellipse`
- [.rect(x, y, w, h)](https://netizenorg.github.io/netnet-standard-library/docs/#svg/rect) `// create and append a rectangle`
- [.line(x1, y1, x2, y2)](https://netizenorg.github.io/netnet-standard-library/docs/#svg/line) `// create and append a line`
- [.path(d)](https://netizenorg.github.io/netnet-standard-library/docs/#svg/path) `// create and append a path`
- [.polygon(points)](https://netizenorg.github.io/netnet-standard-library/docs/#svg/polygon) `// create and append a polygon`
- [.polyline(points)](https://netizenorg.github.io/netnet-standard-library/docs/#svg/polyline) `// create and append a polyline`
- [.text(str, x, y)](https://netizenorg.github.io/netnet-standard-library/docs/#svg/text) `// create and append a text element`
- [.group()](https://netizenorg.github.io/netnet-standard-library/docs/#svg/group) `// create and append a group element`
- [.image(href, x, y, w, h)](https://netizenorg.github.io/netnet-standard-library/docs/#svg/image) `// create and append an image element`

### layout (chainable on any SVG shape)
- [.position(x, y)](https://netizenorg.github.io/netnet-standard-library/docs/#svg/position) `// move element; meaning depends on type (cx/cy, x/y, or translate)`
- [.positionOrigin(type)](https://netizenorg.github.io/netnet-standard-library/docs/#svg/positionOrigin) `// 'center' makes .position() center rects and text on the given point`
- [.size(...)](https://netizenorg.github.io/netnet-standard-library/docs/#svg/size) `// resize: circle→r, ellipse→rx,ry, rect/svg→width,height`

### styling (chainable on any SVG element)
- [.fill(color)](https://netizenorg.github.io/netnet-standard-library/docs/#svg/fill) `// set fill color`
- [.stroke(color)](https://netizenorg.github.io/netnet-standard-library/docs/#svg/stroke) `// set stroke color`
- [.strokeWidth(n)](https://netizenorg.github.io/netnet-standard-library/docs/#svg/strokeWidth) `// set stroke width`
- [.strokeDash(val)](https://netizenorg.github.io/netnet-standard-library/docs/#svg/strokeDash) `// set stroke dash pattern`
- [.strokeOffset(n)](https://netizenorg.github.io/netnet-standard-library/docs/#svg/strokeOffset) `// set stroke-dashoffset; animate to draw lines`
- [.opacity(n)](https://netizenorg.github.io/netnet-standard-library/docs/#svg/opacity) `// set opacity`
- [.textAlign(val)](https://netizenorg.github.io/netnet-standard-library/docs/#svg/textAlign) `// set text alignment (text/tspan only)`
- [.textBaseline(val)](https://netizenorg.github.io/netnet-standard-library/docs/#svg/textBaseline) `// set text baseline (text/tspan only)`
- [.borderRadius(rx, ry?)](https://netizenorg.github.io/netnet-standard-library/docs/#svg/rect) `// set rounded corners (rect only)`

### transforms (chainable on any SVG element)
- [.translate(x, y)](https://netizenorg.github.io/netnet-standard-library/docs/#svg/translate) `// translate via SVG transform`
- [.rotate(deg, cx, cy)](https://netizenorg.github.io/netnet-standard-library/docs/#svg/rotate) `// rotate via SVG transform`
- [.scale(x, y)](https://netizenorg.github.io/netnet-standard-library/docs/#svg/scale) `// scale via SVG transform`


`( ◕ ◞ ◕ )`
