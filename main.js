const Color = require('./Color/Color.js')
const Maths = require('./Maths/Maths.js')
const Averigua = require('./Averigua/Averigua.js')

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
    return console.error('nn: mouseX is a read-only property')
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
    return console.error('nn: mouseY is a read-only property')
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
    return console.error('nn: mouseDown is a read-only property')
  },
  /**
  * This property (or internal `nn` variable) is used to check the browser window's current width
  *
  * @name width
  */
  get width () { return window.innerWidth },
  set width (v) {
    return console.error('nn: width is a read-only property')
  },
  /**
  * This property (or internal `nn` variable) is used to check the browser window's current height
  *
  * @name height
  */
  get height () { return window.innerHeight },
  set height (v) {
    return console.error('nn: height is a read-only property')
  },

  /**
  * this functions works exactly like the Web's [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/fetch) except that where the Fetch API will occasionally throw a CORS errors (which can generally only be resolved by making the request server side, and thus necessitates creating a custom server) our fetch function runs through netnet's proxy to get around this issue. **NOTE:** this function only works in netnet.studio sketches and is meant for experimental/educational use.
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
  * window.addEventListener('load', main)
  */
  fetch: (url, opts) => {
    url = `/api/nn-proxy?url=${url}`
    return window.fetch(url, opts)
  },

  /**
  * this function takes an image/data url and returns a promise with an image element containing the loaded image. It's essentially a promise-based alternative to the standard image load event.
  *
  * @method loadImage
  * @return {Object} A Promise that resolves to an image element
  * @example
  * async function main () {
  *   const img = await nn.loadImage(imageDataURL)
  *   document.body.appendChild(img)
  * }
  *
  * window.addEventListener('load', main)
  */
  loadImage: (url) => new Promise((resolve, reject) => {
    const img = new window.Image()
    img.addEventListener('load', () => resolve(img))
    img.addEventListener('error', (err) => reject(err))
    img.src = url
  }),

  /**
  * this function takes an image/data url and returns a promise with an image element containing the loaded image. It's essentially a promise-based alternative to the standard image load event.
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
  modifyPixels: async (image, algorithm) => {
    // validation
    if (typeof image === 'string') {
      if (image.indexOf('data:image') !== 0) {
        return console.error('nn.modifyPixels: string data passed into the first argument must be a base64 encoded image')
      }
    } else if (!(image instanceof window.Image)) {
      return console.error('nn.modifyPixels: the first argument must either be a base64 encoded image or an HTML image element')
    }

    if (typeof algorithm !== 'function') {
      return console.error('nn.modifyPixels: the second argument must be a function, the algorithm you want to use to process the image')
    }
    // ..........
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!(image instanceof window.Image)) {
      image = await window.nn.loadImage(image)
    }

    canvas.width = image.width
    canvas.height = image.height
    ctx.drawImage(image, 0, 0)
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const imgdata = imageData.data
    algorithm(imgdata)
    ctx.putImageData(imageData, 0, 0)
    const data = canvas.toDataURL()
    image.src = data

    return { image, canvas, data }
  },

  /**
  * Used to check if the page's visitor is on a mobile device
  *
  * @method isMobile
  * @return {Boolean} returns true if the visitor is on a mobile device
  */
  isBrowser: Averigua.isBrowser,
  isMobile: Averigua.isMobile,

  /**
  * Used to check if the visitors device supports WebGL
  *
  * @method hasWebGL
  * @return {Boolean} returns true if the visitors device supports WebGL
  */
  hasWebGL: Averigua.hasWebGL,
  /**
  * Used to check if the visitors device supports WebVR
  *
  * @method hasWebVR
  * @return {Boolean} returns true if the visitors device supports WebVR
  */
  hasWebVR: Averigua.hasWebVR,
  /**
  * Used to check if the visitors device supports MIDI
  *
  * @method hasMIDI
  * @return {Boolean} returns true if the visitors device supports MIDI
  */
  hasMIDI: Averigua.hasMIDI,
  /**
  * Used to check if the visitors device has a touch screen
  *
  * @method hasTouch
  * @return {Boolean} returns true if the visitors device has a touch screen
  */
  hasTouch: Averigua.hasTouch,
  /**
  * Used to check the visitor's device orientation on mobile
  *
  * @method orientation
  * @return {String} returns either 'landscape', 'portrait' or 'no-support'
  */
  orientation: Averigua.orientation,
  /**
  * Used to check the visitor's device screen info
  *
  * @method screen
  * @return {Object} returns screen object
  * @example
  * nn.screen()
  * // could return { orientation: "no-support", colorDepth: 24, width: 1732, height: 787 }
  */
  screen: Averigua.screen,
  /**
  * Used to check the visitor's device GPU info
  *
  * @method gpuInfo
  * @return {Object} returns gpu info object
  * @example
  * nn.gpuInfo()
  * // could return { vendor: "Intel", renderer: "Intel(R) HD Graphics 400" }
  */
  gpuInfo: Averigua.gpuInfo,
  /**
  * Used to check the visitor's browser info
  *
  * @method browserInfo
  * @return {Object} returns browser info object
  * @example
  * nn.browserInfo()
  * // could return  { name: "Firefox", version: "106" }
  */
  browserInfo: Averigua.browserInfo,
  /**
  * Used to check the visitor's platform info, this includes whether they're on a mible device, their browserInfo as well as their Operating System, platform and how many CPUs they have
  *
  * @method platformInfo
  * @return {Object} returns platform info object
  */
  platformInfo: Averigua.platformInfo,
  /**
  * Used to check the visitor's device's audio support, returns an object with the probability that their device supports specific audio formats
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
  * Used to check the visitor's device's video support, returns an object with the probability that their device supports specific video formats and features
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
  * calculates the distance between two points
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
  * calculates the angle between two points in radians
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
  * converts a angle value in radians to degrees
  *
  * @method radToDeg
  * @param {Number} radians an angle in radians
  * @return {Number} the angle in degrees
  * @example
  * nn.radToDeg(3.145) // returns 180.1952265686439
  */
  radToDeg: Maths.radToDeg,
  /**
  * converts a angle degrees to radians
  *
  * @method degToRad
  * @param {Number} degrees an angle in degrees
  * @return {Number} the angle in radians
  * @example
  * nn.degToRad(180) // returns 3.141592653589793
  */
  degToRad: Maths.degToRad,
  /**
  * converts a point described in the cartesian coordinate system (x, y) to that same point described in a polar coordinate system (distance, angle).
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
  * converts a point described in a polar coordinate system (distance, angle) to that same point described in the cartesian coordinate system.
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
  * Shuffles the items in an array
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
  * returns a random float (decimal) given a max value or a min/max range
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
  * This random funciton can be used just like the standard `Math.random()` fucnciton in JavaScript, but it can also take a few different types of optional arguments. When passed an array, it will return a random item from that array. When passed number values it behaves the same as `nn.randomFloat` returning a random decimal value within a given range.
  *
  * @method random
  * @method random
  * @param {Number|Array} a either an array to select a random item from, or a number. When it's a number and no `b` value is passed, this is the max value, otherwise it is the minimum value
  * @param {Number} b the max value
  * @return {Number} a random item from the passed array, or a random float within the specified range
  * @example
  * nn.random(['straw', 'wood', 'brick']) // could return "brick"
  * nn.random(10, 50) // could return 34.823298753
  * nn.random(10) // could return 6.213897459
  * nn.random() // could return 0.103984723014
  */
  random: Maths.random,
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
  * Generates random color strings. It accepts two optional arguments, type and alpha. The type can be: 'hex', 'rgb', 'rgba', 'hsl' or 'hsla' and the alpha can be a float value (0.0 - 1.0) or a boolean
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
  * This method takes a string and returns the first color string it finds in the form of a parsed array (if no color is found it returns null)
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
  * takes an alpha value between `0.0` and `1.0` and returns its corresponding hex character string
  *
  * @method alpha2hex
  * @param {Number} alpha alpha/opacity float value
  * @return {String} a hex character string
  * @example
  * nn.alpha2hex(0.5) // returns "7f"
  */
  alpha2hex: Color.alpha2hex,
  /**
  * takes a hex character (byte) and converts it into an alpha value
  *
  * @method hex2alpha
  * @param {String} hex a byte of hexcode
  * @return {Number} an alpha value betwee `0` and `1`
  * @example
  * nn.hex2alpha('7F') // returns 0.5
  */
  hex2alpha: Color.hex2alpha,
  /**
  * takes a hex color string and returns the corresponding red (0-255), green (0-255) and blue (0-255) color object. If you add an `_` (underscore) before the method name it will return normailzed float values.
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
  * takes a hex color string and returns the corresponding hue (0-360), saturation (0-100) and lightness (0-100) color object. If you add an `_` (underscore) before the method name it will return normailzed float values.
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
  * takes a hex color string and returns the corresponding hue (0-360), saturation (0-100) and value (0-100) color object. If you add an `_` (underscore) before the method name it will return normailzed float values.
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
  * takes red, green and blue color values and returns the corresponding hex string. If you add an `_` (underscore) before the method name it will expect normalized float values between `0-1`
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
  * takes red, green and blue color values and returns the corresponding hue (0-360), saturation (0-100) and lightness (0-100) color object. If you add an `_` (underscore) before the method name it will expect normalized float values between `0-1` and return normalized values between `0-1`
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
  * takes red, green and blue color values and returns the corresponding hue (0-360), saturation (0-100) and value (0-100) color object. If you add an `_` (underscore) before the method name it will expect normalized float values between `0-1` and return normalized values between `0-1`
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
  * takes hue, saturation, and lightness color values and returns the corresponding hex string. If you add an `_` (underscore) before the method name it will expect normalized float values between `0-1`
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
  * takes hue, saturation, and lightness color values and returns the corresponding red (0-255), green (0-255) and blue (0-255) color object. If you add an `_` (underscore) before the method name it will expect normalized float values between `0-1` and return normalized values between `0-1`
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
  * takes hue, saturation, and lightness color values and returns the corresponding hue (0-360), saturation (0-100) and value (0-100) color object. If you add an `_` (underscore) before the method name it will expect normalized float values between `0-1` and return normalized values between `0-1`
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
  * takes hue, saturation, and vlue color values and returns the corresponding hex string. If you add an `_` (underscore) before the method name it will expect normalized float values between `0-1`
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
  * takes hue, saturation, and vlue color values and returns the corresponding red (0-255), green (0-255) and blue (0-255) color object. If you add an `_` (underscore) before the method name it will expect normalized float values between `0-1` and return normalized values between `0-1`
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
  * takes hue, saturation, and vlue color values and returns the corresponding hue (0-360), saturation (0-100) and value (0-100) color object. If you add an `_` (underscore) before the method name it will expect normalized float values between `0-1` and return normalized values between `0-1`
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
  * abstracts the `<input type="file">` by providing a class for quickly handling file uploads via clicking on elements or drag and dropping onto elements.
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
}
