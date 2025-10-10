const Maths = require('./Maths/Maths.js')
const Averigua = require('./Averigua/Averigua.js')
const Color = require('./Color/Color.js')
const Music = require('./Music/nn-music.js')
const Media = require('./Media/nn-media.js')
const DOM = require('./DOM/nn-dom.js')
const Data = require('./Data/nn-data.js')
const Bind = require('./Bind/data-bind.js')

window.nn = {
  _mouseX: 0,
  _mouseY: 0,
  _mouseDown: false,
  _trackingMouse: false,
  _trackMouse: function () {
    window.addEventListener('mousemove', (e) => {
      this._mouseX = e.clientX
      this._mouseY = e.clientY
    })
    window.addEventListener('mousedown', (e) => {
      this._mouseDown = true
    })
    window.addEventListener('mouseup', (e) => {
      this._mouseDown = false
    })
    this._trackingMouse = true
  },
  /**
  * This property (or internal `nn` variable) is used to check the mouse's current "x" (horizontal) position, or the number of pixels from the left of the browser window to the mouse.
  *
  * @name mouseX
  */
  get mouseX () {
    if (!this._trackingMouse) this._trackMouse()
    return this._mouseX
  },
  set mouseX (v) {
    return console.error('( ◕ ◞ ◕ ) nn: mouseX is a read-only property')
  },
  /**
  * This property (or internal `nn` variable) is used to check the mouse's current "y" (vertical) position, or the number of pixels from the top of the browser window to the mouse.
  *
  * @name mouseY
  */
  get mouseY () {
    if (!this._trackingMouse) this._trackMouse()
    return this._mouseY
  },
  set mouseY (v) {
    return console.error('( ◕ ◞ ◕ ) nn: mouseY is a read-only property')
  },
  /**
  * This property (or internal `nn` variable) is used to check the mouse is currently pressed down or not.
  *
  * @name mouseDown
  */
  get mouseDown () {
    if (!this._trackingMouse) this._trackMouse()
    return this._mouseDown
  },
  set mouseDown (v) {
    return console.error('( ◕ ◞ ◕ ) nn: mouseDown is a read-only property')
  },
  /**
  * This property (or internal `nn` variable) is used to check the browser window's current width
  *
  * @name width
  */
  get width () { return window.innerWidth },
  set width (v) {
    return console.error('( ◕ ◞ ◕ ) nn: width is a read-only property')
  },
  /**
  * This property (or internal `nn` variable) is used to check the browser window's current height
  *
  * @name height
  */
  get height () { return window.innerHeight },
  set height (v) {
    return console.error('( ◕ ◞ ◕ ) nn: height is a read-only property')
  },

  /**
  * This method is an alias for `window.addEventListener()`
  *
  * @method on
  * @return {undefined} returns undefined
  * @example
  * nn.on('load', () => console.log('the page has loaded!'))
  */
  on: DOM.on,

  /**
  * This method is an alias for `window.removeEventListener()` and is the companion to `nn.on()`.
  * Pass the same function reference you used with `nn.on()` to remove it.
  *
  * @method off
  * @return {undefined} returns undefined
  * @example
  * const onResize = () => console.log('resized')
  * nn.on('resize', onResize)
  * // later...
  * nn.off('resize', onResize)
  */
  off: DOM.off,

  /**
  * This function acts as an alias for the [document.createElement()](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement) method, except that it returns an "overloaded" HTMLElement with a few additional methods, `.content()` a method for adding content to the element (text or other HTML elements), `.set()` for applying an object of HTML attributes to the element, `.css()` for applying an object similar to a CSS rule to the element, `.addTo()` a method for appending the element to another (it will also remove it from it's current parent if necessary) and `.on()`, an alias for [.addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
  *
  * @method create
  * @return {Object} an overloaded instance of an HTMLElement
  * @example
  * // this creates a div with red "hello world" text and adds it to the body of our page
  * // essentially: <div style="color: red">hello world</div>
  * nn.create('div').content('hello world').css({ color: 'red' }).addTo('body')
  */

  create: DOM.create,

  /**
  * This function acts as an alias for the [document.querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) method, except that it returns an "overloaded" HTMLElement, see the `create` method above for more info.
  *
  * @method get
  * @return {Object} an overloaded instance of an HTMLElement
  * @example
  * // assuming the page has some <h1> in it
  * nn.get('h1').on('click', () => console.log('the h1 was clicked!'))
  */
  get: DOM.get,

  /**
  * This function acts as an alias for the [document.querySelectorAll()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) method, except that it returns an "overloaded" HTMLElement, see the `create` method above for more info.
  *
  * @method getAll
  * @return {Object} an array of overloaded instances of an HTMLElements
  * @example
  * // assuming the page has a few <a> elements
  * // this changes the content of the third link
  * nn.getAll('a')[2].content('new text!')
  */
  getAll: DOM.getAll,

  /**
  * This function takes an image/data url and returns a promise with an image element containing the loaded image. It's essentially a promise-based alternative to the standard image load event.
  *
  * @method loadImage
  * @return {Object} A Promise that resolves to an image element
  * @example
  * async function main () {
  *   const img = await nn.loadImage(imageDataURL)
  *   document.body.appendChild(img)
  * }
  *
  * nn.on('load', main)
  */
  loadImage: Media.loadImage,

  /**
  * This function takes an image/data url and returns a promise with an image element containing the loaded image. It's essentially a promise-based alternative to the standard image load event.
  *
  * @method modifyPixels
  * @return {Object} A Promise that results to an object with three variations of the algorithmically processed image: data (base64 image data), image (HTML image element) and canvas (HTML5 canvas element)
  * @example
  * new nn.FileUploader({
  *   click: 'button', // a button element in the HTML document
  *   ready: async (file) => {
  *     const obj = await nn.modifyPixels(file.data, (pixels) => {
  *       // this algorithm inverts the image
  *       for (let i = 0; i < pixels.length; i += 4) {
  *         pixels[i] = 255 - pixels[i] // red
  *         pixels[i + 1] = 255 - pixels[i + 1] // green
  *         pixels[i + 2] = 255 - pixels[i + 2] // blue
  *       }
  *     })
  *     console.log(obj)
  *     document.body.appendChild(obj.image)
  *   }
  * })
  */
  modifyPixels: Media.modifyPixels,

  /**
  * This function is an alias for the Web's [getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) with some additional beginner friendly argument validation. This is an alias for `nn.askForStream()`
  *
  * @method askFor
  * @return {Object} A Promise that resolves to a stream object (exactly like the Web's getUserMedia API)
  * @example
  * async function main () {
  *   const stream = await nn.askFor({ video: true })
  *   // assuming "video" is an instance of a video element
  *   video.srcObject = stream
  * }
  *
  * nn.on('load', main)
  */
  askFor: Media.askFor,

  /**
  * This function is an alias for the Web's [getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) with some additional beginner friendly argument validation.
  *
  * @method askForStream
  * @return {Object} A Promise that resolves to a stream object (exactly like the Web's getUserMedia API)
  * @example
  * async function main () {
  *   const stream = await nn.askForStream({ video: true })
  *   // assuming "video" is an instance of a video element
  *   video.srcObject = stream
  * }
  *
  * nn.on('load', main)
  */
  askForStream: Media.askForStream,

  /**
  * This function abstracts the Web's [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition). It will only work on a GPS enabled device and web browser.
  *
  * @method askForGPS
  * @return {Object} an object contaning `lat` and `lng` properties, as well as a `timestampe` and a `coords` property which contains [GeolocationCoordinates](https://developer.mozilla.org/en-US/docs/Web/API/GeolocationCoordinates) object.
  * @example
  *
  * nn.askForGPS((data) => {
  *   console.log(data.lat, data.lng)
  * })
  *
  * // or like this....
  * async function getData () {
  *   const data = await nn.askForGPS()
  *   console.log(data.lat, data.lng)
  * }
  *
  * nn.on('load', main)
  */
  askForGPS: Media.askForGPS,

  /**
  * This function abstracts the Web's [MIDI API](https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API). It will only work on a MIDI enabled web browser.
  *
  * @method MIDI
  * @return {undefined} doesn't return anything
  * @example
  *   if (nn.hasMIDI() === true) {
  *     nn.MIDI(msg => {
  *       console.log(`device: ${msg.dev}, channel: ${msg.chl}, value: ${msg.val}`)
  *     })
  *   }
  */
  MIDI: Media.MIDI,

  /**
   * Array of note names for each chromatic semitone index (0 = C … 11 = B)
   *
   * @property notes
   * @type {string[]}
   * @example
   * nn.notes
   * // → ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']
   */
  notes: Music.SEMITONE_TO_NOTE,

  /**
   * Map of mode names to their interval patterns (in semitones)
   *
   * @property modes
   * @type {Object.<string, number[]>}
   * @example
   * nn.modes.major
   * // → [2,2,1,2,2,2,1]
   */
  modes: Music.MODES,

  /**
   * Predefined chord shapes by name, expressed as scale degrees
   *
   * @property chords
   * @type {Object.<string, number[]>}
   * @example
   * nn.chords.triad
   * // → [1,3,5]
   */
  chords: Music.CHORDS,

  /**
   * Convert a note (e.g. 'C4', 'G#3', 'Bb5') to its MIDI note number
   *
   * @method noteToMidi
   * @param {string} note A note in scientific pitch notation
   * @return {number|null} MIDI note number (0–127) or null if invalid
   * @example
   * nn.noteToMidi('A4')
   * // → 69
   */
  noteToMidi: Music.noteToMidi,

  /**
   * Convert a note (e.g. 'C4', 'F#2') to its frequency in hertz
   *
   * @method noteToFrequency
   * @param {string} note A note in scientific pitch notation
   * @return {number|null} Frequency in Hz or null if invalid
   * @example
   * nn.noteToFrequency('A4')
   * // → 440
   */
  noteToFrequency: Music.noteToFrequency,

  /**
   * Convert a MIDI note number to its note name in scientific pitch notation
   *
   * @method midiToNote
   * @param {number} midi MIDI note number
   * @return {string|null} Note like 'C4', or null if invalid
   * @example
   * nn.midiToNote(60)
   * // → 'C4'
   */
  midiToNote: Music.midiToNote,

  /**
   * Convert a MIDI note number to its frequency in hertz
   *
   * @method midiToFrequency
   * @param {number} midi MIDI note number
   * @return {number|null} Frequency in Hz or null if invalid
   * @example
   * nn.midiToFrequency(69)
   * // → 440
   */
  midiToFrequency: Music.midiToFrequency,

  /**
   * Convert a frequency in hertz to the nearest MIDI note number
   *
   * @method frequencyToMidi
   * @param {number} frequency Frequency in Hz
   * @return {number|null} MIDI note number or null if invalid
   * @example
   * nn.frequencyToMidi(440)
   * // → 69
   */
  frequencyToMidi: Music.frequencyToMidi,

  /**
   * Convert a frequency in hertz to the nearest note in scientific pitch notation
   *
   * @method frequencyToNote
   * @param {number} frequency Frequency in Hz
   * @return {string|null} Note like 'A4' or null if invalid
   * @example
   * nn.frequencyToNote(261.63)
   * // → 'C4'
   */
  frequencyToNote: Music.frequencyToNote,

  /**
   * Generate a random seven-step mode that spans exactly one octave (12 semitones)
   *
   * @method randomMode
   * @return {number[]} Array of 7 intervals summing to 12
   * @example
   * nn.randomMode()
   * // → [2,1,2,2,2,1,2]
   */
  randomMode: Music.randomMode,

  /**
   * Build a scale from a root pitch or pitch-class and a mode name or array of intervals
   *
   * @method createScale
   * @param {string} root Root like 'C', 'F#3', 'Bb4'
   * @param {string|number[]} mode Mode name (e.g. 'ionian', 'minor', 'random') or custom steps array
   * @return {string[]|null} Array of notes (with octave if provided) or null if invalid
   * @example
   * nn.createScale('C4', 'major')
   * // → ['C4','D4','E4','F4','G4','A4','B4','C5']
   * nn.createScale('D', 'dorian')
   * // → ['D','E','F','G','A','B','C','D']
   */
  createScale: Music.createScale,

  /**
   * Create an array of notes in a chord by selecting from a scale
   *
   * @method createChord
   * @param {string[]} scale Array of notes forming a scale
   * @param {string|number[]} ch Name of a chord shape (e.g. 'triad') or array of degree values
   * @return {string[]} Array of chord notes
   * @example
   * const cMajorScale = nn.createScale('C4', 'major')
   * const cMajorTriad = nn.createChord(cMajorScale, 'triad')
   * console.log(cMajorTriad)
   * // → ['C4','E4','G4']
   */
  createChord: Music.createChord,

  /**
  * This functions works exactly like the Web's [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/fetch) except that where the Fetch API will occasionally throw a CORS errors (which can generally only be resolved by making the request server side, and thus necessitates creating a custom server) our fetch function runs through netnet's proxy to get around this issue. **NOTE:** This function only works in netnet.studio sketches and is meant for experimental/educational use.
  *
  * @method fetch
  * @return {Object} A Promise that resolves to a Response object (exactly like the Web's Fetch API)
  * @example
  * async function main () {
  *   const req = await nn.fetch('https://dog.ceo/api/breeds/image/random')
  *   const json = await req.json()
  *   document.body.innerHTML = `<img src="${json.message}" alt="a random dog">`
  * }
  *
  * nn.on('load', main)
  */
  fetch: (url, opts) => {
    url = `/api/nn-proxy?url=${url}`
    return window.fetch(url, opts)
  },

  /**
  * Languages like python, Bash and PHP have "sleep" functions built-in, unfortunately JavaScript does not, hence why we've included it in this library. A "sleep" function pauses execution for a specified amount of time. This function is useful in asynchronous workflows when you want to intentionally delay something (like animations, polling, retries, or just slowing things down for dramatic effect).
  *
  * @method sleep
  * @param {Number} ms - The number of milliseconds to pause for.
  * @return {Promise} A Promise that resolves after the given duration.
  * @example
  * async function blink () {
  *   while (true) {
  *     const on = nn.get('body').style.background === 'white'
  *     if (on) nn.get('body').css('background', 'black')
  *     else nn.get('body').css('background', 'white')
  *     await nn.sleep(500)
  *   }
  * }
  *
  * nn.on('load', blink)
  */
  sleep: (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  },

  /**
  * Call a function a number of times, passing the current index each time.
  * Returns an array of results from the callback.
  *
  * @method times
  * @param {number} n How many times to call `fn` (floats are floored, negatives become 0)
  * @param {function(number): any} fn Function called with the current index (0 → n-1)
  * @return {any[]} Array of results returned by `fn`
  * @example
  * // create 5 divs
  * nn.times(5, (i) => nn.create('div').content(`item ${i}`).addTo('body'))
  */
  times: (n, fn) => {
    if (typeof n !== 'number' || !isFinite(n)) {
      console.error('( ◕ ◞ ◕ ) nn.times: first argument should be a finite number')
      return []
    }
    if (typeof fn !== 'function') {
      console.error('( ◕ ◞ ◕ ) nn.times: second argument should be a function')
      return []
    }
    const count = Math.max(0, Math.floor(n))
    const out = []
    for (let i = 0; i < count; i++) out.push(fn(i))
    return out
  },

  /**
  * Create a numeric range as an array, with optional mapping.
  * `range(end[, map])` → [0, 1, ..., end-1]
  * `range(start, end[, step][, map])` → values from start toward end (end-exclusive) using `step`.
  * If `map` is provided, returns values mapped with `(value, index) => any`.
  *
  * @method range
  * @param {number} startOrEnd If one arg, the exclusive end. If two+, the start value.
  * @param {number} [end] Exclusive end (not included). If omitted, start at 0 to `startOrEnd`.
  * @param {number|function} [stepOrMap] Step between values (defaults to 1 or -1), or a mapping function.
  * @param {function} [map] Optional mapping function `(value, index) => any`.
  * @return {any[]} Array of numbers (or mapped values if `map` provided).
  * @example
  * nn.range(4)           // [0,1,2,3]
  * nn.range(2, 6)        // [2,3,4,5]
  * nn.range(10, 4, -2)   // [10,8,6]
  * nn.range(2, 5, (v) => v * v) // [4,9,16]
  * nn.range(10, 4, -3, (v,i) => `${i}:${v}`) // ['0:10','1:7','2:4']
  */
  range: (startOrEnd, end, stepOrMap, maybeMap) => {
    if (typeof startOrEnd !== 'number' || !isFinite(startOrEnd)) {
      console.error('( ◕ ◞ ◕ ) nn.range: expects numbers. Usage: range(end) or range(start, end, step[, map])')
      return []
    }
    // Extract optional mapper
    let map
    if (typeof maybeMap === 'function') map = maybeMap
    else if (typeof stepOrMap === 'function') map = stepOrMap

    let start
    if (typeof end === 'undefined') {
      start = 0
      end = startOrEnd
    } else {
      start = startOrEnd
    }
    if (typeof end !== 'number' || !isFinite(end)) {
      console.error('( ◕ ◞ ◕ ) nn.range: end must be a finite number')
      return []
    }
    // Determine step
    let step
    if (typeof stepOrMap === 'number') step = stepOrMap
    if (typeof step === 'undefined' || step === null) {
      step = end > start ? 1 : -1
    }
    if (typeof step !== 'number' || !isFinite(step) || step === 0) {
      console.error('( ◕ ◞ ◕ ) nn.range: step must be a non-zero finite number')
      return []
    }
    const out = []
    // end-exclusive progression
    if (step > 0) {
      for (let i = 0, v = start; v < end; v += step, i++) out.push(map ? map(v, i) : v)
    } else {
      for (let i = 0, v = start; v > end; v += step, i++) out.push(map ? map(v, i) : v)
    }
    return out
  },

  /**
   * Running this function will bind together any HTML elements with `data-bind-var` and `data-bind-click` attributes to CSS variables, enabling dynamic and interactive styling based on user input and actions. For example, an input element with `data-bind-var="--main-color"` will update the CSS variable `--main-color` if it's value changes, and any element with `data-bind-click="--main-font: add(2px)"` will add two pixels to the current value of CSS variable `--main-font` once clicked. Other operations include `sub(val)`, `toggle(valA, valB)`, and `cycle(val1, val2, etc...)`.
   *
   * @method bindCSS
   * @return {void}
   * @example
   * // HTML
   * <input type="range" data-bind-var="--main-width" min="0" max="100">
   * <button data-bind-click="--primary-color:toggle(#FF0000, #00FF00)">Toggle Color</button>
   *
   * // CSS
   * :root {
   *   --main-width: 50px
   *   --primary-color: #FF0000
   * }
   *
   * .element {
   *   width: var(--main-width);
   *   background-color: var(--primary-color);
   * }
   *
   * // JavaScript
   * nn.bindCSS()
   *
   * // Behavior:
   * // - Adjusting the range input updates the width of elements with class "element".
   * // - Clicking the button toggles the primary color between red and green.
   */
  bindCSS: Bind.bindCSS,

  /**
   * This function parses a CSV (Comma-Separated Values) string into an array of JavaScript objects.
   *
   * @method parseCSV
   * @param {String} csvText - The CSV string to parse.
   * @return {Array<Object>} An array of objects representing the parsed CSV data.
   * @example
   * const csvData = "name,age,city\nJohn,30,New York\nJane,40,Miami"
   * const jsonData = nn.parseCSV(csvData)
   * console.log(jsonData)
   * // Output:
   * // [
   * //   { name: "John", age: "30", city: "New York" },
   * //   { name: "Jane", age: "40", city: "Miami" }
   * // ]
   */
  parseCSV: Data.parseCSV,
  /**
   * This function parses a JSON (JavaScript Object Notation) string into a JavaScript object.
   *
   * @method parseJSON
   * @param {String} jsonText - The JSON string to parse.
   * @return {Object|Array} The JavaScript object or array resulting from parsing the JSON string.
   * @example
   * const jsonString = '{"name":"John","age":30,"city":"New York"}'
   * const jsonObject = nn.parseJSON(jsonString)
   * console.log(jsonObject)
   * // Output:
   * // { name: "John", age: 30, city: "New York" }
   */
  parseJSON: Data.parseJSON,
  /**
   * This function converts an array of JavaScript objects into a CSV (Comma-Separated Values) string.
   *
   * @method stringifyCSV
   * @param {Array<Object>} arrayOfObjects - The array of objects to convert into CSV.
   * @return {String} A CSV string representing the provided data.
   * @example
   * const arr = [
   *   { name: "John", age: "30", city: "New York" },
   *   { name: "Jane", age: "40", city: "Miami" }
   * ]
   * const csvString = nn.stringifyCSV(arr)
   * console.log(csvString)
   * // Output:
   * // "name,age,city\n"John","30","New York"\n"Jane","40","Miami""
   */
  stringifyCSV: Data.stringifyCSV,
  /**
   * This function takes data (either object or an array) to converts into a JSON (JavaScript Object Notation) string.
   *
   * @method stringifyJSON
   * @param {Object|Array} data - The data to convert into a JSON string.
   * @param {Number} [space=2] - The number of spaces to use for indentation in the resulting JSON string (for readability).
   * @return {String} A JSON string representing the provided data.
   * @example
   * const obj = { name: "John", age: 30, city: "New York" }
   * const jsonString = nn.stringifyJSON(obj)
   * console.log(jsonString)
   * // Output:
   * // "{\n  "name": "John",\n  "age": 30,\n  "city": "New York"\n}"
   */
  stringifyJSON: Data.stringifyJSON,
  /**
  * This function takes either a JSON object to turn into a JSON string, or an array of objects with matching keys to turn into a CSV string. It can be used to convert JavaScript data structures into string data that can be saved to a file or elsewhere.
  *
  * @method stringifyData
  * @return {String}
  * @example
  * const arr = [
  *   { name: "John", age: "30", city: "New York" },
  *   { name: "Jane", age: "40", city: "Miami" }
  * ]
  * const str = nn.stringifyData(arr)
  *
  */
  stringifyData: Data.stringifyData,
  /**
  * This function takes either a JSON string or a CSV string and parses into a JavaScript data structure, either an object or an array of objects.
  *
  * @method parseData
  * @return {Object}
  * @example
  * const str = `name,age,city
  *   "John","30","New York"
  *   "Jane","40","Miami"`
  * const arr = nn.parseData(str)
  *
  */
  parseData: Data.parseData,
  /**
  * This function takes a path to a file containing some data (ex: .json, .csv, .txt) loads the file (using  the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/fetch)) and parses into a JavaScript data structure, either an object or an array of objects.
  *
  * @method loadData
  * @return {Object}
  * @example
  * async function setup () {
  *   const data = await nn.loadData('countries-gps.csv')
  *   console.log(data)
  * }
  *
  */
  loadData: Data.loadData,

  /**
  * This function is used to check if the page's visitor is on a mobile device
  *
  * @method isMobile
  * @return {Boolean} returns true if the visitor is on a mobile device
  */
  isBrowser: Averigua.isBrowser,
  isMobile: Averigua.isMobile,

  /**
  * This function is used to check if the visitors device supports WebGL
  *
  * @method hasWebGL
  * @return {Boolean} returns true if the visitors device supports WebGL
  */
  hasWebGL: Averigua.hasWebGL,
  /**
  * This function is used to check if the visitors device supports WebVR
  *
  * @method hasWebVR
  * @return {Boolean} returns true if the visitors device supports WebVR
  */
  hasWebVR: Averigua.hasWebVR,
  /**
  * This function is used to check if the visitors device supports MIDI
  *
  * @method hasMIDI
  * @return {Boolean} returns true if the visitors device supports MIDI
  */
  hasMIDI: Averigua.hasMIDI,
  /**
  * This function is used to check if the visitors device has a touch screen
  *
  * @method hasTouch
  * @return {Boolean} returns true if the visitors device has a touch screen
  */
  hasTouch: Averigua.hasTouch,
  /**
  * This function is used to check the visitor's device orientation on mobile
  *
  * @method orientation
  * @return {String} returns either 'landscape', 'portrait' or 'no-support'
  */
  orientation: Averigua.orientation,
  /**
  * This function is used to check the visitor's device screen info
  *
  * @method screen
  * @return {Object} returns screen object
  * @example
  * nn.screen()
  * // could return { orientation: "no-support", colorDepth: 24, width: 1732, height: 787 }
  */
  screen: Averigua.screen,
  /**
  * This function is used to check the visitor's device GPU info
  *
  * @method gpuInfo
  * @return {Object} returns gpu info object
  * @example
  * nn.gpuInfo()
  * // could return { vendor: "Intel", renderer: "Intel(R) HD Graphics 400" }
  */
  gpuInfo: Averigua.gpuInfo,
  /**
  * This function is used to check the visitor's browser info
  *
  * @method browserInfo
  * @return {Object} returns browser info object
  * @example
  * nn.browserInfo()
  * // could return  { name: "Firefox", version: "106" }
  */
  browserInfo: Averigua.browserInfo,
  /**
  * This function is used to check the visitor's platform info, this includes whether they're on a mible device, their browserInfo as well as their Operating System, platform and how many CPUs they have
  *
  * @method platformInfo
  * @return {Object} returns platform info object
  */
  platformInfo: Averigua.platformInfo,
  /**
  * This function is used to check the visitor's device's audio support, returns an object with the probability that their device supports specific audio formats
  *
  * @method audioSupport
  * @return {Object} returns audio support info object
  * @example
  * nn.audioSupport()
  * // could return something like
  * // { mp3: "maybe", vorbis: "probably", wav: "probably", aac: "probably" }
  */
  audioSupport: Averigua.audioSupport,
  /**
  * This function is used to check the visitor's device's video support, returns an object with the probability that their device supports specific video formats and features
  *
  * @method videoSupport
  * @return {Object} returns video support info object
  * @example
  * nn.videoSupport()
  * // could return something like
  * // { captions: "probably", poster: "probably", webm: "probably", h264: "probably", theora: "probably" }
  */
  videoSupport: Averigua.videoSupport,

  /**
  * Often times it's helpful to work with "normalized" values, or values between 0 - 1. This method will return a normalized a number from another range into a value between `0` and `1`.
  *
  * @method norm
  * @param {Number} value the number to normalize
  * @param {Number} min the smallest value in the input range
  * @param {Number} max the largest value in the input range
  * @return {Number} the normalized value
  * @example
  * nn.norm(50, 0, 255) // returns 0.19607843137254902
  */
  norm: Maths.norm,
  /**
  * This function is used to constrain a value inside a specified range.
  *
  * @method clamp
  * @param {Number} value the number to clamp
  * @param {Number} min the smallest value in the input range
  * @param {Number} max the largest value in the input range
  * @return {Number} the clamped value
  * @example
  * nn.clamp(50, 100, 200) // returns 100
  */
  clamp: Maths.clamp,
  /**
  * Linear interpolation, or “lerp” for short, is a technique commonly used when programming things like games or GUIs. In principle, a lerp function “eases” the transition between two values `a` and `b` over time. The `t` argument is the amount to interpolate between the two values where 0.0 is equal to the first point, 0.5 is half-way in between, and 1.0 is equal to the second point.
  *
  * @method lerp
  * @param {Number} valueA the first value/point
  * @param {Number} valueB the second value/point
  * @param {Number} t the amount to interpolate
  * @return {Number} the normalized value
  * @example
  * nn.lerp(0, 255, 0.5)
  */
  lerp: Maths.lerp,
  _lerp: Maths._lerp,
  /**
  * This function will map a value from a given range (inputMin and inputMax) to another range (outputMin and outputMax)
  *
  * @method map
  * @param {Number} value the value to re-map
  * @param {Number} inputMin the smallest value in the input range
  * @param {Number} inputMax the largest value in the input range
  * @param {Number} outputMin the smallest value in the output range
  * @param {Number} outputMax the largest value in the output range
  * @return {Number} the mapped value
  * @example
  * nn.map(50, 0, 100, 20, 40) // returns 30
  */
  map: Maths.map,

  /**
  * This function calculates the distance between two points
  *
  * @method dist
  * @param {Number} x1 the x position of the first point
  * @param {Number} y1 the y position of the first point
  * @param {Number} x2 the x position of the second point
  * @param {Number} y2 the y position of the second point
  * @return {Number} the distance between the two points
  * @example
  * nn.dist(20,50, 100, 250) // returns 215.40659228538016
  */
  dist: Maths.dist,
  /**
  * This function calculates the angle between two points in radians
  *
  * @method angleBtw
  * @param {Number} x1 the x position of the first point
  * @param {Number} y1 the y position of the first point
  * @param {Number} x2 the x position of the second point
  * @param {Number} y2 the y position of the second point
  * @return {Number} the angle between the two points in radians
  * @example
  * nn.angleBtw(20,50, 100, 250) // returns 0.3805063771123649
  */
  angleBtw: Maths.angleBtw,

  /**
  * This function converts a angle value in radians to degrees
  *
  * @method radToDeg
  * @param {Number} radians an angle in radians
  * @return {Number} the angle in degrees
  * @example
  * nn.radToDeg(3.145) // returns 180.1952265686439
  */
  radToDeg: Maths.radToDeg,
  /**
  * This function converts a angle degrees to radians
  *
  * @method degToRad
  * @param {Number} degrees an angle in degrees
  * @return {Number} the angle in radians
  * @example
  * nn.degToRad(180) // returns 3.141592653589793
  */
  degToRad: Maths.degToRad,
  /**
  * This function converts a point described in the cartesian coordinate system (x, y) to that same point described in a polar coordinate system (distance, angle).
  *
  * @method cartesianToPolar
  * @param {Number} x1 the x position of the point
  * @param {Number} y1 the y position of the point
  * @return {Object} the poloar coordinate { distance, radians, degrees }
  * @example
  * nn.cartesianToPolar(100, 100)
  * // returns { distance: 141.4213562373095, radians: 0.7853981633974483, degrees: 45 }
  */
  cartesianToPolar: Maths.cartesianToPolar,
  /**
  * This function converts a point described in a polar coordinate system (distance, angle) to that same point described in the cartesian coordinate system.
  *
  * @method polarToCartesian
  * @param {Number} dist the distance value
  * @param {Number} angle the angle in radians
  * @return {Object} the cartesian coordinate { x, y }
  * @example
  * nn.polarToCartesian(141.4213562373095, 0.7853981633974483)
  * // returns { x: 100, y: 100 }
  */
  polarToCartesian: Maths.polarToCartesian,

  /**
  * This function shuffles the items in an array
  *
  * @method shuffle
  * @param {Array} arr the array to shuffle
  * @param {Array} the suffled array
  * @return {Object} the cartesian coordinate { x, y }
  * @example
  * nn.shuffle([1,2,3,4,5]) // could return [ 4, 3, 5, 2, 1 ]
  */
  shuffle: Maths.shuffle,
  /**
  * returns a random integer given a max value or a min/max range
  *
  * @method randomInt
  * @param {Number} a when no `b` value is passed, this is the max value, otherwise it is the minimum value
  * @param {Number} b the max value
  * @return {Number} a random integer within the specified range
  * @example
  * nn.randomInt(10, 50) // could return 34
  * nn.randomInt(10) // could return 6
  */
  randomInt: Maths.randomInt,
  /**
  * This function returns a random float (decimal) given a max value or a min/max range
  *
  * @method randomFloat
  * @param {Number} a when no `b` value is passed, this is the max value, otherwise it is the minimum value
  * @param {Number} b the max value
  * @return {Number} a random float within the specified range
  * @example
  * nn.randomFloat(10, 50) // could return 34.823298753
  * nn.randomFloat(10) // could return 6.213897459
  */
  randomFloat: Maths.randomFloat,
  /**
  * This random function can be used just like the standard `Math.random()` fucnciton in JavaScript, but it can also take a few different types of optional arguments. When passed an array, it will return a random item from that array. When passed a string it will return a random letter or word from that string. When passed number values it behaves the same as `nn.randomFloat` returning a random decimal value within a given range.
  *
  * @method random
  * @method random
  * @param {Number|Array} a either an array to select a random item from, or a string to select a random letter or word from, or a number. When it's a number and no `b` value is passed, this is the max value, otherwise it is the minimum value
  * @param {Number} b the max value
  * @return {Number} a random item from the passed array, or a random float within the specified range
  * @example
  * nn.random(['straw', 'wood', 'brick']) // could return "brick"
  * nn.random('world wide web') // could return 'web'
  * nn.random('worldwideweb') // could return 'w'
  * nn.random(10, 50) // could return 34.823298753
  * nn.random(10) // could return 6.213897459
  * nn.random() // could return 0.103984723014
  */
  random: (v1, v2) => {
    const err = msg => console.error(`( ◕ ◞ ◕ ) nn: ${msg}`)
    const warn = msg => console.warn(`( ◕ ◞ ◕ ) nn: ${msg}`)
    // no args → passthrough to base random()
    if (typeof v1 === 'undefined' && typeof v2 === 'undefined') {
      return Maths.random()
    }
    // array → random item
    if (Array.isArray(v1)) {
      if (v1.length === 0) {
        err('the first argument to .random() was an empty array, add at least one item.')
        return undefined
      }
      return Maths.random(v1)
    }
    // string → random word; if single word, random char
    if (typeof v1 === 'string') {
      // must include at least one non-whitespace character
      if (!/\S/u.test(v1)) {
        err('the first argument to .random() was an empty/whitespace-only string, add some letters or words.')
        return undefined
      }
      return Maths.random(v1)
    }
    // number(s) → random float in range
    if (typeof v1 === 'number') {
      if (!Number.isFinite(v1)) {
        err('the first argument to .random() must be a finite number.')
        return undefined
      }
      // single number → [0, v1)
      if (typeof v2 === 'undefined') {
        return Maths.random(v1)
      }
      // two numbers → [min, max)
      if (typeof v2 !== 'number' || !Number.isFinite(v2)) {
        err('when the first argument in .random() is a number, the second argument (max) must also be a finite number.')
        return undefined
      }
      if (v1 === v2) {
        warn('you passed identical min and max to the .random() method, returning that exact value.')
        return v1
      }
      if (v1 > v2) {
        warn('you passed a min that was greater than max to the .random() method, so I swapped them for you.')
        return Maths.random(v2, v1)
      }
      return Maths.random(v1, v2)
    }
    // anything else
    err('the first argument to .random() should be an Array, String, Number, or nothing.')
    return undefined
  },
  /**
  * The perlin method returns a perlinNoise object, which first needs to be seeded && then can be used to return 1 or 2 dimensional noise from -1 to 1
  *
  * @method perlin
  * @param {Number|Array} a either an array to select a random item from, or a number. When it's a number and no `b` value is passed, this is the max value, otherwise it is the minimum value
  * @param {Number} b the max value
  * @return {Number} a random item from the passed array, or a random float within the specified range
  * @example
  * // assuming we've got a canvas && ctx...
  * const perlin = Maths.perlin()
  * perlin.seed()
  * for (let x = 0; x < canvas.width; x++) {
  *   let y = perlin.get(x * 0.1)
  *   y = Maths.map(y, -1, 1, 0, canvas.height)
  *   ctx.lineTo(x, y)
  * }
  * ctx.stroke()
  */
  perlin: Maths.perlin,

  /**
  * There are loads of great (and much more complex) "easing" and "tweening" libraries out there. This is a fairly rudementary easing function which simply contains the easing equations for a variety of common easing types, specifically: InQuad, OutQuad, InOutQuad, InCubic, OutCubic, InOutCubic, InQuart, OutQuart, InOutQuart, InQuint, OutQuint, InOutQuint, InSine, OutSine, InOutSine, InCirc, OutCirc, InOutCirc, InElastic, OutElastic, InOutElastic, InExpo, OutExpo, InOutExpo, InBack, OutBack, InOutBack, InBounce and OutBounce
  *
  * @method ease
  * @param {String} type the kind of easing (see list above)
  * @param {Number} t the changing/delta value
  * @return {Number} the eased output value
  * @example
  * // example of using one of the easing functions to get a tweened scrolling * effect
  * function tween (from, to, i = 0) {
  *   if (this.tweenTimer) clearTimeout(this.tweenTimer)
  *   const dur = 2 // duration in seconds
  *   const fps = 1000 / 30 // 30 frames per second
  *   const inc = 1 / dur / fps
  *   i += inc
  *   if (i >= 1) return
  *   const pos = nn.ease('InOutQuart', i)
  *   const Y = nn.map(pos, 0, 1, from, to)
  *   window.scrollTo(0, Y)
  *   this.tweenTimer = setTimeout(() => tween(from, to, i), fps)
  * }

  * tween(0, 100) // scroll from 0 to 1000 w/an easeInOutQuart
  */
  ease: (type, t) => Maths[`ease${type}`](t),

  /**
  * This function generates random color strings. It accepts two optional arguments, type and alpha. The type can be: 'hex', 'rgb', 'rgba', 'hsl' or 'hsla' and the alpha can be a float value (0.0 - 1.0) or a boolean
  *
  * @method randomColor
  * @param {String} [type] can be 'hex', 'rgb', 'rgba', 'hsl' or 'hsla'
  * @param {Number|Boolean} [alpha] can be a float value (0.0 - 1.0) or a boolean
  * @return {String} color string
  * @example
  * nn.randomColor() // returns a random hex color string, for ex: "#5cfba6"
  * nn.randomColor('hex', 0.5) // could return for ex: "#5cfba67f"
  * nn.randomColor('rgb') // ex: "rgb(136, 44, 204)"
  * nn.randomColor('rgba') // ex: "rgba(85, 177, 23, 1)"
  * nn.randomColor('rgb', true) // ex: "rgba(122, 46, 239, 0.53)"
  * nn.randomColor('rgb', 0.5) // ex: "rgba(107, 110, 7, 0.5)"
  */
  randomColor: Color.random,

  /**
  * It can often be useful to know if a color is "light" or "dark" when pairing other colors with it, for example to determine if a font color should be black or white so that it best stands out on a given background color. The `.isLight()` method takes a color string (either in hex or rgb) and will return `true` if it is a light color or `false` if it is a dark color.
  *
  * @method isLight
  * @param {String} color hex or rgb string color value
  * @return {Boolean} Returns true if the color passed is a "light" color
  * @example
  * nn.isLight('#ffffcc') // returns true
  * nn.isLight('#001100') // returns false
  */
  isLight: Color.isLight,

  /**
  * This function takes a string and returns the first color string it finds in the form of a parsed array (if no color is found it returns null)
  *
  * @method colorMatch
  * @param {String} string an arbitrary string of text
  * @return {Array} an array of parsed color values found in the string
  * @example
  * nn.colorMatch('div { color: rgba(34, 56, 88, 0.5); font-size: 23px; }')
  * // returns ["rgb", "rgba(34, 56, 88, 0.5)", "34", "56", "88", "0.5"]
  */
  colorMatch: Color.match,

  /**
  * This function takes an alpha value between `0.0` and `1.0` and returns its corresponding hex character string
  *
  * @method alpha2hex
  * @param {Number} alpha alpha/opacity float value
  * @return {String} a hex character string
  * @example
  * nn.alpha2hex(0.5) // returns "7f"
  */
  alpha2hex: Color.alpha2hex,
  /**
  * This function takes a hex character (byte) and converts it into an alpha value
  *
  * @method hex2alpha
  * @param {String} hex a byte of hexcode
  * @return {Number} an alpha value betwee `0` and `1`
  * @example
  * nn.hex2alpha('7F') // returns 0.5
  */
  hex2alpha: Color.hex2alpha,
  /**
  * This function takes a hex color string and returns the corresponding red (0-255), green (0-255) and blue (0-255) color object. If you add an `_` (underscore) before the method name it will return normailzed float values.
  *
  * @method hex2rgb
  * @param {String} hex a hex color string
  * @return {Object} an object with `{r, g, b}` color number values
  * @example
  * nn.hex2rgb('#ff0000') // returns { r: 255, g: 0, b: 0 }
  * nn._hex2rgb('#ff0000') // returns  { r: 1, g: 0, b: 0 }
  */
  hex2rgb: Color.hex2rgb,
  _hex2rgb: Color._hex2rgb,
  /**
  * This function takes a hex color string and returns the corresponding hue (0-360), saturation (0-100) and lightness (0-100) color object. If you add an `_` (underscore) before the method name it will return normailzed float values.
  *
  * @method hex2hsl
  * @param {String} hex a hex color string
  * @return {Object} an object with `{h, s, l}` color number values
  * @example
  * nn.hex2hsl('#ff0000') // returns { h: 0, s: 100, l: 50 }
  * nn._hex2hsl('#ff0000') // returns  { h: 0, s: 1, l: 0.5 }
  */
  hex2hsl: Color.hex2hsl,
  _hex2hsl: Color._hex2hsl,
  /**
  * tThis function akes a hex color string and returns the corresponding hue (0-360), saturation (0-100) and value (0-100) color object. If you add an `_` (underscore) before the method name it will return normailzed float values.
  *
  * @method hex2hsv
  * @param {String} hex a hex color string
  * @return {Object} an object with `{h, s, v}` color number values
  * @example
  * nn.hex2hsv('#ff0000') // returns { h: 0, s: 100, v: 100 }
  * nn._hex2hsv('#ff0000') // returns  { h: 0, s: 1, v: 1 }
  */
  hex2hsv: Color.hex2hsv,
  _hex2hsv: Color._hex2hsv,

  /**
  * This function takes red, green and blue color values and returns the corresponding hex string. If you add an `_` (underscore) before the method name it will expect normalized float values between `0-1`
  *
  * @method rgb2hex
  * @param {Number} red value between 0-255
  * @param {Number} green value between 0-255
  * @param {Number} blue value between 0-255
  * @return {String} a hex color string
  * @example
  * nn.rgb2hex(255, 0, 0) // returns '#ff0000'
  * nn._rgb2hex(1, 0, 0) // returns '#ff0000'
  */
  rgb2hex: Color.rgb2hex,
  _rgb2hex: Color._rgb2hex,
  /**
  * This function takes red, green and blue color values and returns the corresponding hue (0-360), saturation (0-100) and lightness (0-100) color object. If you add an `_` (underscore) before the method name it will expect normalized float values between `0-1` and return normalized values between `0-1`
  *
  * @method rgb2hsl
  * @param {Number} red value between 0-255
  * @param {Number} green value between 0-255
  * @param {Number} blue value between 0-255
  * @return {Object} an object with `{h, s, l}` color number values
  * @example
  * nn.rgb2hsl(255, 0, 0) // returns { h: 0, s: 100, l: 50 }
  * nn._rgb2hsl(1, 0, 0) // returns { h: 0, s: 1, l: 0.5 }
  */
  rgb2hsl: Color.rgb2hsl,
  _rgb2hsl: Color._rgb2hsl,
  /**
  * This function takes red, green and blue color values and returns the corresponding hue (0-360), saturation (0-100) and value (0-100) color object. If you add an `_` (underscore) before the method name it will expect normalized float values between `0-1` and return normalized values between `0-1`
  *
  * @method rgb2hsv
  * @param {Number} red value between 0-255
  * @param {Number} green value between 0-255
  * @param {Number} blue value between 0-255
  * @return {Object} an object with `{h, s, v}` color number values
  * @example
  * nn.rgb2hsv(255, 0, 0) // return { h: 0, s: 100, v: 100 }
  * nn._rgb2hsv(1, 0, 0) // return { h: 0, s: 1, v: 1 }
  */
  rgb2hsv: Color.rgb2hsv,
  _rgb2hsv: Color._rgb2hsv,

  /**
  * This function takes hue, saturation, and lightness color values and returns the corresponding hex string. If you add an `_` (underscore) before the method name it will expect normalized float values between `0-1`
  *
  * @method hsl2hex
  * @param {Number} hue value between 0-360
  * @param {Number} saturation value between 0-100
  * @param {Number} lightness value between 0-100
  * @return {String} a hex color string
  * @example
  * nn.hsl2hex(0, 100, 50) // returns '#ff0000'
  * nn._hsl2hex(0, 1, 0.5) // returns '#ff0000'
  */
  hsl2hex: Color.hsl2hex,
  _hsl2hex: Color._hsl2hex,
  /**
  * This function takes hue, saturation, and lightness color values and returns the corresponding red (0-255), green (0-255) and blue (0-255) color object. If you add an `_` (underscore) before the method name it will expect normalized float values between `0-1` and return normalized values between `0-1`
  *
  * @method hsl2rgb
  * @param {Number} hue value between 0-360
  * @param {Number} saturation value between 0-100
  * @param {Number} lightness value between 0-100
  * @return {Object} an object with `{r, g, b}` color number values
  * @example
  * nn.hsl2rgb(0, 100, 50) // return { r: 255, g: 0, b: 0 }
  * nn._hsl2rgb(0, 1, 0.5) // return { r: 1, g: 0, b: 0 }
  */
  hsl2rgb: Color.hsl2rgb,
  _hsl2rgb: Color._hsl2rgb,
  /**
  * This function takes hue, saturation, and lightness color values and returns the corresponding hue (0-360), saturation (0-100) and value (0-100) color object. If you add an `_` (underscore) before the method name it will expect normalized float values between `0-1` and return normalized values between `0-1`
  *
  * @method hsl2hsv
  * @param {Number} hue value between 0-360
  * @param {Number} saturation value between 0-100
  * @param {Number} lightness value between 0-100
  * @return {Object} an object with `{h, s, v}` color number values
  * @example
  * nn.hsl2hsv(0, 100, 50) // return { h: 0, s: 100, v: 100 }
  * nn._hsl2hsv(0, 1, 0.5) // return { h: 0, s: 1, v: 1 }
  */
  hsl2hsv: Color.hsl2hsv,
  _hsl2hsv: Color._hsl2hsv,

  /**
  * This function takes hue, saturation, and vlue color values and returns the corresponding hex string. If you add an `_` (underscore) before the method name it will expect normalized float values between `0-1`
  *
  * @method hsv2hex
  * @param {Number} hue value between 0-360
  * @param {Number} saturation value between 0-100
  * @param {Number} value value between 0-100
  * @return {String} a hex color string
  * @example
  * nn.hsv2hex(0, 100, 100) // returns '#ff0000'
  * nn._hsv2hex(0, 1, 1) // returns '#ff0000'
  */
  hsv2hex: Color.hsv2hex,
  _hsv2hex: Color._hsv2hex,
  /**
  * This function takes hue, saturation, and vlue color values and returns the corresponding red (0-255), green (0-255) and blue (0-255) color object. If you add an `_` (underscore) before the method name it will expect normalized float values between `0-1` and return normalized values between `0-1`
  *
  * @method hsv2rgb
  * @param {Number} hue value between 0-360
  * @param {Number} saturation value between 0-100
  * @param {Number} value value between 0-100
  * @return {Object} an object with `{r, g, b}` color number values
  * @example
  * nn.hsv2rgb(0, 100, 100) // return { r: 255, g: 0, b: 0 }
  * nn._hsv2rgb(0, 1, 1) // return { r: 1, g: 0, b: 0 }
  */
  hsv2rgb: Color.hsv2rgb,
  _hsv2rgb: Color._hsv2rgb,
  /**
  * This function takes hue, saturation, and vlue color values and returns the corresponding hue (0-360), saturation (0-100) and value (0-100) color object. If you add an `_` (underscore) before the method name it will expect normalized float values between `0-1` and return normalized values between `0-1`
  *
  * @method hsv2hsl
  * @param {Number} hue value between 0-360
  * @param {Number} saturation value between 0-100
  * @param {Number} value value between 0-100
  * @return {Object} an object with `{h, s, v}` color number values
  * @example
  * nn.hsv2hsl(0, 100, 100) // returns { h: 0, s: 100, l: 50 }
  * nn._hsv2hsl(0, 1, 1) // returns { h: 0, s: 1, l: 0.5 }
  */
  hsv2hsl: Color.hsv2hsl,
  _hsv2hsl: Color._hsv2hsl,

  /**
  * This function abstracts the `<input type="file">` by providing a class for quickly handling file uploads via clicking on elements or drag and dropping onto elements.
  *
  * @class FileUploader
  * @param {Object} config the options object
  * @param {number} config.maxSize limit max file size in kb
  * @param {Array} config.types limit allowed file mime types, for ex ['image/jpeg','audio/mpeg3']
  * @param {Function} config.filter an alternative to "types", where you can provide your own filtering logic for accepted files types
  * @param {String} config.click selector for clickable element, ex '#button'
  * @param {String}config.drop selector for drag&drop element, ex '#background'
  * @param {Function} config.dropping for ex callback, runs when file is dragged over
  * @param {Function} config.dropped runs when file has been dropped
  * @param {Function} config.ready runs when data is ready
  * @param {Function} config.error runs when there's an error
  * @example
  * // assuming HTML like this:
  * // <button id="my-btn">click to upload</button>
  * const fu = new nn.FileUploader({
  *   maxSize: 1000,
  *   types: ['image/jpeg', 'image/png'],
  *   click: '#my-btn',
  *   ready: (file) => {
  *     console.log(`the data for the ${file.type} file called ${file.name} is ready`)
  *     console.log(file.data)
  *   },
  *   error: (err) => {
  *     console.error(err)
  *   }
  *})
  *
  * // or assuming HTML like this:
  * // <button id="my-btn">click to upload</button>
  * // <section id="main">
  * //   <!-- some other HTML stuff here -->
  * // </section>
  * const fu = new nn.FileUploader({
  *   click: '#my-btn',
  *   drop: '#main',
  *   filter: (type) => {
  *     let audio = [
  *       'audio/wav', 'audio/mpeg3', 'audio/mp4', 'audio/aac',
  *       'audio/aacp', 'audio/ogg', 'audio/webm', 'audio/ogg',
  *       'audio/webm', 'audio/mpeg']
  *     let types = [ ...audio, 'text/plain' ]
  *     if (type.indexOf('image') > -1) return true
  *     else if (types.indexOf(type) > -1) return true
  *     else return false
  *   },
  *   dropping: (e) => { e.style.opacity = 0.5 },
  *   dropped: (e) => { e.style.opacity = 1 },
  *   ready: (file) => {
  *     console.log(`the data for the ${file.type} file called ${file.name} is ready`)
  *     console.log(file.data)
  *   },
  *   error: (err) => {
  *     console.error(err)
  *   }
  * })
  */
  FileUploader: require('./FileUploader/FileUploader.js')
  //,
  // GIF: require('./GIF/nn-gif.js')
}
