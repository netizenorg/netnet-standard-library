(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const Maths = require('./src/Maths/Maths.js')
const Averigua = require('./src/Averigua/Averigua.js')
const Color = require('./src/Color/Color.js')
const Music = require('./src/Music/music.js')
const Media = require('./src/Media/media.js')
const DOM = require('./src/DOM/dom.js')
const Data = require('./src/Data/data.js')
const Utils = require('./src/Utils/utils.js')

const nn = {
  popup: Media.popup,
  loadImage: Media.loadImage,
  filterImage: Media.filterImage,
  filterVideo: Media.filterVideo,
  askFor: Media.askFor,
  askForStream: Media.askForStream,
  askForCapture: Media.askForCapture,
  askForNotifications: Media.askForNotifications,
  askForClipboard: Media.askForClipboard,
  askForBluetooth: Media.askForBluetooth,
  askForUSB: Media.askForUSB,
  askForSerial: Media.askForSerial,
  askForMotion: Media.askForMotion,
  askForOrientation: Media.askForOrientation,
  askForGPS: Media.askForGPS,
  MIDI: Media.MIDI,
  hyper: Media.hyper,

  notes: Music.SEMITONE_TO_NOTE,
  modes: Music.MODES,
  chords: Music.CHORDS,
  noteToMidi: Music.noteToMidi,
  noteToFrequency: Music.noteToFrequency,
  midiToNote: Music.midiToNote,
  midiToFrequency: Music.midiToFrequency,
  frequencyToMidi: Music.frequencyToMidi,
  frequencyToNote: Music.frequencyToNote,
  randomMode: Music.randomMode,
  createScale: Music.createScale,
  createChord: Music.createChord,
  voiceChord: Music.voiceChord,
  rotateScale: Music.rotateScale,
  transposeScale: Music.transposeScale,
  stripOctave: Music.stripOctave,

  sleep: Utils.sleep,
  times: Utils.times,
  range: Utils.range,

  parse: Data.parse,
  serialize: Data.serialize,
  download: Data.download,
  upload: Data.upload,

  isBrowser: Averigua.isBrowser.bind(Averigua),
  isMobile: Averigua.isMobile.bind(Averigua),
  hasWebGL: Averigua.hasWebGL.bind(Averigua),
  hasWebVR: Averigua.hasWebVR.bind(Averigua),
  hasMIDI: Averigua.hasMIDI.bind(Averigua),
  hasTouch: Averigua.hasTouch.bind(Averigua),
  orientation: Averigua.orientation.bind(Averigua),
  screen: Averigua.screen.bind(Averigua),
  gpuInfo: Averigua.gpuInfo.bind(Averigua),
  browserInfo: Averigua.browserInfo.bind(Averigua),
  platformInfo: Averigua.platformInfo.bind(Averigua),
  audioSupport: Averigua.audioSupport.bind(Averigua),
  videoSupport: Averigua.videoSupport.bind(Averigua),
  storageSupport: Averigua.storageSupport.bind(Averigua),
  fontSupport: Averigua.fontSupport.bind(Averigua),
  language: Averigua.language.bind(Averigua),
  timeZone: Averigua.timeZone.bind(Averigua),
  hasWebAudio: Averigua.hasWebAudio.bind(Averigua),
  hasWebXR: Averigua.hasWebXR.bind(Averigua),
  hasMediaDevices: Averigua.hasMediaDevices.bind(Averigua),
  hasDeviceMotion: Averigua.hasDeviceMotion.bind(Averigua),
  hasDeviceOrientation: Averigua.hasDeviceOrientation.bind(Averigua),
  hasPointerLock: Averigua.hasPointerLock.bind(Averigua),
  hasGamepad: Averigua.hasGamepad.bind(Averigua),
  hasWebSerial: Averigua.hasWebSerial.bind(Averigua),
  hasWebUSB: Averigua.hasWebUSB.bind(Averigua),
  hasBluetooth: Averigua.hasBluetooth.bind(Averigua),
  hasSpeechRecognition: Averigua.hasSpeechRecognition.bind(Averigua),
  hasSpeechSynthesis: Averigua.hasSpeechSynthesis.bind(Averigua),
  hasWebAssembly: Averigua.hasWebAssembly.bind(Averigua),
  hasFullscreen: Averigua.hasFullscreen.bind(Averigua),

  norm: Maths.norm,
  clamp: Maths.clamp,
  lerp: Maths.lerp,
  _lerp: Maths._lerp,
  map: Maths.map,
  dist: Maths.dist,
  angleBtw: Maths.angleBtw,
  radToDeg: Maths.radToDeg,
  degToRad: Maths.degToRad,
  cartesianToPolar: Maths.cartesianToPolar,
  polarToCartesian: Maths.polarToCartesian,
  shuffle: Maths.shuffle,
  randomInt: Maths.randomInt,
  randomFloat: Maths.randomFloat,
  random: Maths.random.bind(Maths),
  perlin: Maths.perlin,
  ease: (type, t) => Maths[`ease${type}`](t),

  randomColor: Color.random.bind(Color),
  lerpColor: Color.lerpColor.bind(Color),
  colorGradient: Color.colorGradient.bind(Color),
  colorScheme: Color.scheme.bind(Color),
  toRGB: Color.toRGB.bind(Color),
  rgb: Color.rgb.bind(Color),
  toHSL: Color.toHSL.bind(Color),
  hsl: Color.hsl.bind(Color),
  toHex: Color.toHex.bind(Color),
  hex: Color.hex.bind(Color),
  isLight: Color.isLight.bind(Color),
  colorContrast: Color.contrast.bind(Color),
  contrast: Color.contrast.bind(Color),
  colorMatch: Color.match.bind(Color),
  match: Color.match.bind(Color),
  alpha2hex: Color.alpha2hex.bind(Color),
  hex2alpha: Color.hex2alpha.bind(Color),
  closestColor: Color.closestColor.bind(Color)
}

DOM.register(nn)
window.nn = nn

},{"./src/Averigua/Averigua.js":4,"./src/Color/Color.js":5,"./src/DOM/dom.js":9,"./src/Data/data.js":11,"./src/Maths/Maths.js":12,"./src/Media/media.js":13,"./src/Music/music.js":14,"./src/Utils/utils.js":15}],2:[function(require,module,exports){
exports.endianness = function () { return 'LE' };

exports.hostname = function () {
    if (typeof location !== 'undefined') {
        return location.hostname
    }
    else return '';
};

exports.loadavg = function () { return [] };

exports.uptime = function () { return 0 };

exports.freemem = function () {
    return Number.MAX_VALUE;
};

exports.totalmem = function () {
    return Number.MAX_VALUE;
};

exports.cpus = function () { return [] };

exports.type = function () { return 'Browser' };

exports.release = function () {
    if (typeof navigator !== 'undefined') {
        return navigator.appVersion;
    }
    return '';
};

exports.networkInterfaces
= exports.getNetworkInterfaces
= function () { return {} };

exports.arch = function () { return 'javascript' };

exports.platform = function () { return 'browser' };

exports.tmpdir = exports.tmpDir = function () {
    return '/tmp';
};

exports.EOL = '\n';

exports.homedir = function () {
	return '/'
};

},{}],3:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],4:[function(require,module,exports){
(function (process){(function (){
/* global DocumentTouch */
class Averigua {
  static _browserErr () {
    console.error('Averigua: this is not a browser')
  }

  static isNode () {
    if (typeof process !== 'undefined') return process.version
    else return false
  }

  static isBrowser () {
    return (typeof window !== 'undefined' && typeof document !== 'undefined')
  }

  static isMobile () {
    if (!this.isBrowser()) return this._browserErr()
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
      return true
    } else {
      return false
    }
  }

  static hasWebGL () {
    if (!this.isBrowser()) return this._browserErr()

    return (!!window.WebGLRenderingContext &&
      !!document.createElement('canvas').getContext('experimental-webgl'))
  }

  static hasWebVR () {
    if (!this.isBrowser()) return this._browserErr()

    return (typeof navigator.getVRDisplays !== 'undefined')
  }

  static hasMIDI () {
    if (!this.isBrowser()) return this._browserErr()

    if (navigator.requestMIDIAccess) return true
    else return false
  }

  static hasTouch () {
    // via: https://stackoverflow.com/a/4819886/1104148
    if (!this.isBrowser()) return this._browserErr()
    const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ')
    const mq = function (query) { return window.matchMedia(query).matches }
    if (('ontouchstart' in window) ||
      (window.DocumentTouch && document instanceof DocumentTouch)) {
      return true
    }
    let query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')']
    query = query.join('')
    if (mq(query)) return true
    else return false
  }

  static doNotTrack () {
    if (!this.isBrowser()) return this._browserErr()
    const t = navigator.doNotTrack
    if (t === '1' || t === 'yes' || t === 1 || t === true) {
      return true
    } else return false
  }

  static orientation () {
    if (!this.isBrowser()) return this._browserErr()

    if (window.orientation) {
      if (window.orientation === -90 || window.orientation === 90) {
        return 'landscape'
      } else return 'portrait'
    } else return 'no-support'
  }

  static screen () {
    return {
      orientation: this.orientation(),
      colorDepth: window.screen.colorDepth,
      width: window.screen.width,
      height: window.screen.height
    }
  }

  static language () {
    const arr = navigator.language.split('-')
    const lan = { language: this.languageCodes()[arr[0]] }
    if (arr.length > 1) lan.country = this.countryCodes()[arr[1]]
    return lan
  }

  static timeZone () {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
      ? Intl.DateTimeFormat().resolvedOptions().timeZone
      : new Date().getTimezoneOffset()
  }

  static gpuInfo () {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl')
    const dbgRenNfo = gl.getExtension('WEBGL_debug_renderer_info')
    let vendor = gl.getParameter(gl.VENDOR)
    let renderer = gl.getParameter(gl.RENDERER)
    if (dbgRenNfo) {
      vendor = gl.getParameter(dbgRenNfo.UNMASKED_VENDOR_WEBGL)
      renderer = gl.getParameter(dbgRenNfo.UNMASKED_RENDERER_WEBGL)
    }
    return { vendor, renderer }
  }

  static browserInfo () {
    if (!this.isBrowser()) return this._browserErr()

    const ua = navigator.userAgent
    const match = (re) => { const m = ua.match(re); return m ? m[1] : null }

    // Brave — not in UA, requires API check
    if (window.navigator.brave && window.navigator.brave.isBrave &&
        window.navigator.brave.isBrave.name === 'isBrave') {
      return { name: 'Brave', version: match(/Chrome\/(\d+)/) }
    }
    // Vivaldi — "Vivaldi/X.Y.Z.W" in UA, or window.vivaldi when compatibility mode hides it
    if (/Vivaldi/i.test(ua) || window.vivaldi) return { name: 'Vivaldi', version: match(/Vivaldi\/(\d+)/) }
    // Yandex — "YaBrowser/X.Y" in UA
    if (/YaBrowser/i.test(ua)) return { name: 'Yandex', version: match(/YaBrowser\/(\d+)/) }
    // Samsung Internet — "SamsungBrowser/X.Y" in UA
    if (/SamsungBrowser/i.test(ua)) return { name: 'Samsung Internet', version: match(/SamsungBrowser\/(\d+)/) }
    // UC Browser — "UCBrowser/X.Y" in UA
    if (/UCBrowser/i.test(ua)) return { name: 'UC Browser', version: match(/UCBrowser\/(\d+)/) }
    // DuckDuckGo mobile — "DuckDuckGo/X" in UA
    if (/DuckDuckGo/i.test(ua)) return { name: 'DuckDuckGo', version: match(/DuckDuckGo\/(\d+)/) }
    // Electron — "Electron/X.Y" in UA
    if (/Electron/i.test(ua)) return { name: 'Electron', version: match(/Electron\/(\d+)/) }
    // Opera (modern) — "OPR/X" in UA
    if (/OPR/i.test(ua)) return { name: 'Opera', version: match(/OPR\/(\d+)/) }
    // Opera (legacy) — "Opera/X" or "Version/X Opera"
    if (/Opera/i.test(ua)) return { name: 'Opera', version: match(/Opera\/(\d+)/) || match(/Version\/(\d+)/) }
    // Edge Chromium — "Edg/X" (no 'e' suffix), must come before Chrome
    if (/Edg\//.test(ua)) return { name: 'Edge', version: match(/Edg\/(\d+)/) }
    // Edge Legacy (EdgeHTML) — "Edge/X"
    if (/Edge\//.test(ua)) return { name: 'Edge', version: match(/Edge\/(\d+)/) }
    // Firefox
    if (/Firefox/i.test(ua)) return { name: 'Firefox', version: match(/Firefox\/(\d+)/) }
    // IE (Trident engine)
    if (/Trident/i.test(ua)) return { name: 'IE', version: match(/rv:(\d+)/) }
    if (/MSIE/i.test(ua)) return { name: 'IE', version: match(/MSIE (\d+)/) }
    // Chrome (and Chrome for iOS: CriOS)
    if (/CriOS/i.test(ua)) return { name: 'Chrome', version: match(/CriOS\/(\d+)/) }
    if (/Chrome/i.test(ua)) return { name: 'Chrome', version: match(/Chrome\/(\d+)/) }
    // Safari
    if (/Safari/i.test(ua)) return { name: 'Safari', version: match(/Version\/(\d+)/) }

    return { name: navigator.appName, version: navigator.appVersion }
  }

  static platformInfo () {
    if (this.isBrowser()) {
      return {
        mobile: this.isMobile(),
        browser: this.browserInfo(),
        oscpu: navigator.oscpu,
        processors: navigator.hardwareConcurrency,
        platform: navigator.platform
      }
    }
    const os = require('os')
    return {
      platform: process.platform,
      os: {
        arch: os.arch(),
        type: os.type(),
        release: os.release(),
        cpus: os.cpus(),
        freemem: os.freemem(),
        totalmem: os.totalmem(),
        homedir: os.homedir(),
        hostname: os.hostname(),
        userInfo: os.userInfo(),
        networkInterfaces: os.networkInterfaces()
      },
      env: process.env
    }
  }

  static audioSupport () {
    if (!this.isBrowser()) return this._browserErr()

    const aObj = { mp3: 'no', vorbis: 'no', wav: 'no', aac: 'no' }
    const a = document.createElement('audio')
    if (typeof a.canPlayType === 'function') {
      aObj.mp3 = a.canPlayType('audio/mpeg;')
      if (aObj.mp3 === '') aObj.mp3 = 'no'
      aObj.vorbis = a.canPlayType('audio/ogg; codecs="vorbis"')
      if (aObj.vorbis === '') aObj.vorbis = 'no'
      aObj.wav = a.canPlayType('audio/wav; codecs="1"')
      if (aObj.wav === '') aObj.wav = 'no'
      aObj.aac = a.canPlayType('audio/mp4; codecs="mp4a.40.2"')
      if (aObj.aac === '') aObj.aac = 'no'
    }
    return aObj
  }

  static videoSupport () {
    if (!this.isBrowser()) return this._browserErr()

    const vObj = {
      captions: 'no',
      poster: 'no',
      webm: 'no',
      h264: 'no',
      theora: 'no'
    }
    const v = document.createElement('video')
    if (typeof v.canPlayType === 'function') {
      vObj.webm = v.canPlayType('video/webm; codecs="vp8, vorbis"')
      if (vObj.webm === '') vObj.webm = 'no'
      vObj.h264 = v.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"')
      if (vObj.h264 === '') vObj.h264 = 'no'
      vObj.theora = v.canPlayType('video/ogg; codecs="theora"')
      if (vObj.theora === '') vObj.theora = 'no'

      vObj.poster = ('poster' in document.createElement('video'))
        ? 'probably' : 'no'
      vObj.captions = ('src' in document.createElement('track'))
        ? 'probably' : 'no'
    }
    return vObj
  }

  static pluginSupport () {
    if (!this.isBrowser()) return this._browserErr()

    const plugins = []
    for (let i = 0; i < navigator.plugins.length; i++) {
      const p = {
        name: navigator.plugins[i].name,
        description: navigator.plugins[i].description,
        filename: navigator.plugins[i].filename,
        array: []
      }
      for (let j = 0; j < navigator.plugins[i].length; j++) {
        p.array.push({
          description: navigator.plugins[i][j].description,
          type: navigator.plugins[i][j].type,
          suffixes: navigator.plugins[i][j].suffixes
        })
      }
      plugins.push(p)
    }

    return plugins
  }

  static hasWebAudio () {
    if (!this.isBrowser()) return this._browserErr()
    return !!(window.AudioContext || window.webkitAudioContext)
  }

  static hasWebXR () {
    if (!this.isBrowser()) return this._browserErr()
    return !!(navigator.xr)
  }

  static hasMediaDevices () {
    if (!this.isBrowser()) return this._browserErr()
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
  }

  static hasDeviceMotion () {
    if (!this.isBrowser()) return this._browserErr()
    return (typeof window.DeviceMotionEvent !== 'undefined')
  }

  static hasDeviceOrientation () {
    if (!this.isBrowser()) return this._browserErr()
    return (typeof window.DeviceOrientationEvent !== 'undefined')
  }

  static hasPointerLock () {
    if (!this.isBrowser()) return this._browserErr()
    return !!(document.pointerLockElement !== undefined ||
      document.mozPointerLockElement !== undefined ||
      document.webkitPointerLockElement !== undefined)
  }

  static hasGamepad () {
    if (!this.isBrowser()) return this._browserErr()
    return !!(navigator.getGamepads || navigator.webkitGetGamepads)
  }

  static hasWebSerial () {
    if (!this.isBrowser()) return this._browserErr()
    return !!navigator.serial
  }

  static hasWebUSB () {
    if (!this.isBrowser()) return this._browserErr()
    return !!navigator.usb
  }

  static hasBluetooth () {
    if (!this.isBrowser()) return this._browserErr()
    return !!navigator.bluetooth
  }

  static hasSpeechRecognition () {
    if (!this.isBrowser()) return this._browserErr()
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition)
  }

  static hasSpeechSynthesis () {
    if (!this.isBrowser()) return this._browserErr()
    return !!window.speechSynthesis
  }

  static hasWebAssembly () {
    return typeof WebAssembly === 'object' && typeof WebAssembly.instantiate === 'function'
  }

  static hasFullscreen () {
    if (!this.isBrowser()) return this._browserErr()
    return !!(document.fullscreenEnabled ||
      document.mozFullScreenEnabled ||
      document.webkitFullscreenEnabled ||
      document.msFullscreenEnabled)
  }

  static storageSupport () {
    if (!this.isBrowser()) return this._browserErr()
    const s = { localStorage: false, sessionStorage: false, indexedDB: false }
    if (window.localStorage) s.localStorage = true
    if (window.sessionStorage) s.sessionStorage = true
    if (window.indexedDB) s.indexedDB = true
    return s
  }

  static fontSupport () {
    // via: https://stackoverflow.com/a/3368855/1104148
    const baseFonts = ['monospace', 'sans-serif', 'serif']

    const fontList = [
      'Andale Mono', 'Arial', 'Arial Black', 'Arial Hebrew', 'Arial MT', 'Arial Narrow', 'Arial Rounded MT Bold', 'Arial Unicode MS',
      'Bitstream Vera Sans Mono', 'Book Antiqua', 'Bookman Old Style',
      'Calibri', 'Cambria', 'Cambria Math', 'Century', 'Century Gothic', 'Century Schoolbook', 'Comic Sans', 'Comic Sans MS', 'Consolas', 'Courier', 'Courier New',
      'Geneva', 'Georgia',
      'Helvetica', 'Helvetica Neue',
      'Impact',
      'Lucida Bright', 'Lucida Calligraphy', 'Lucida Console', 'Lucida Fax', 'LUCIDA GRANDE', 'Lucida Handwriting', 'Lucida Sans', 'Lucida Sans Typewriter', 'Lucida Sans Unicode',
      'Microsoft Sans Serif', 'Monaco', 'Monotype Corsiva', 'MS Gothic', 'MS Outlook', 'MS PGothic', 'MS Reference Sans Serif', 'MS Sans Serif', 'MS Serif', 'MYRIAD', 'MYRIAD PRO',
      'Palatino', 'Palatino Linotype',
      'Segoe Print', 'Segoe Script', 'Segoe UI', 'Segoe UI Light', 'Segoe UI Semibold', 'Segoe UI Symbol',
      'Tahoma', 'Times', 'Times New Roman', 'Times New Roman PS', 'Trebuchet MS',
      'Verdana', 'Wingdings', 'Wingdings 2', 'Wingdings 3',
      'Abadi MT Condensed Light', 'Academy Engraved LET', 'ADOBE CASLON PRO', 'Adobe Garamond', 'ADOBE GARAMOND PRO', 'Agency FB', 'Aharoni', 'Albertus Extra Bold', 'Albertus Medium', 'Algerian', 'Amazone BT', 'American Typewriter',
      'American Typewriter Condensed', 'AmerType Md BT', 'Andalus', 'Angsana New', 'AngsanaUPC', 'Antique Olive', 'Aparajita', 'Apple Chancery', 'Apple Color Emoji', 'Apple SD Gothic Neo', 'Arabic Typesetting', 'ARCHER',
      'ARNO PRO', 'Arrus BT', 'Aurora Cn BT', 'AvantGarde Bk BT', 'AvantGarde Md BT', 'AVENIR', 'Ayuthaya', 'Bandy', 'Bangla Sangam MN', 'Bank Gothic', 'BankGothic Md BT', 'Baskerville',
      'Baskerville Old Face', 'Batang', 'BatangChe', 'Bauer Bodoni', 'Bauhaus 93', 'Bazooka', 'Bell MT', 'Bembo', 'Benguiat Bk BT', 'Berlin Sans FB', 'Berlin Sans FB Demi', 'Bernard MT Condensed', 'BernhardFashion BT', 'BernhardMod BT', 'Big Caslon', 'BinnerD',
      'Blackadder ITC', 'BlairMdITC TT', 'Bodoni 72', 'Bodoni 72 Oldstyle', 'Bodoni 72 Smallcaps', 'Bodoni MT', 'Bodoni MT Black', 'Bodoni MT Condensed', 'Bodoni MT Poster Compressed',
      'Bookshelf Symbol 7', 'Boulder', 'Bradley Hand', 'Bradley Hand ITC', 'Bremen Bd BT', 'Britannic Bold', 'Broadway', 'Browallia New', 'BrowalliaUPC', 'Brush Script MT', 'Californian FB', 'Calisto MT', 'Calligrapher', 'Candara',
      'CaslonOpnface BT', 'Castellar', 'Centaur', 'Cezanne', 'CG Omega', 'CG Times', 'Chalkboard', 'Chalkboard SE', 'Chalkduster', 'Charlesworth', 'Charter Bd BT', 'Charter BT', 'Chaucer',
      'ChelthmITC Bk BT', 'Chiller', 'Clarendon', 'Clarendon Condensed', 'CloisterBlack BT', 'Cochin', 'Colonna MT', 'Constantia', 'Cooper Black', 'Copperplate', 'Copperplate Gothic', 'Copperplate Gothic Bold',
      'Copperplate Gothic Light', 'CopperplGoth Bd BT', 'Corbel', 'Cordia New', 'CordiaUPC', 'Cornerstone', 'Coronet', 'Cuckoo', 'Curlz MT', 'DaunPenh', 'Dauphin', 'David', 'DB LCD Temp', 'DELICIOUS', 'Denmark',
      'DFKai-SB', 'Didot', 'DilleniaUPC', 'DIN', 'DokChampa', 'Dotum', 'DotumChe', 'Ebrima', 'Edwardian Script ITC', 'Elephant', 'English 111 Vivace BT', 'Engravers MT', 'EngraversGothic BT', 'Eras Bold ITC', 'Eras Demi ITC', 'Eras Light ITC', 'Eras Medium ITC',
      'EucrosiaUPC', 'Euphemia', 'Euphemia UCAS', 'EUROSTILE', 'Exotc350 Bd BT', 'FangSong', 'Felix Titling', 'Fixedsys', 'FONTIN', 'Footlight MT Light', 'Forte',
      'FrankRuehl', 'Fransiscan', 'Freefrm721 Blk BT', 'FreesiaUPC', 'Freestyle Script', 'French Script MT', 'FrnkGothITC Bk BT', 'Fruitger', 'FRUTIGER',
      'Futura', 'Futura Bk BT', 'Futura Lt BT', 'Futura Md BT', 'Futura ZBlk BT', 'FuturaBlack BT', 'Gabriola', 'Galliard BT', 'Gautami', 'Geeza Pro', 'Geometr231 BT', 'Geometr231 Hv BT', 'Geometr231 Lt BT', 'GeoSlab 703 Lt BT',
      'GeoSlab 703 XBd BT', 'Gigi', 'Gill Sans', 'Gill Sans MT', 'Gill Sans MT Condensed', 'Gill Sans MT Ext Condensed Bold', 'Gill Sans Ultra Bold', 'Gill Sans Ultra Bold Condensed', 'Gisha', 'Gloucester MT Extra Condensed', 'GOTHAM', 'GOTHAM BOLD',
      'Goudy Old Style', 'Goudy Stout', 'GoudyHandtooled BT', 'GoudyOLSt BT', 'Gujarati Sangam MN', 'Gulim', 'GulimChe', 'Gungsuh', 'GungsuhChe', 'Gurmukhi MN', 'Haettenschweiler', 'Harlow Solid Italic', 'Harrington', 'Heather', 'Heiti SC', 'Heiti TC', 'HELV',
      'Herald', 'High Tower Text', 'Hiragino Kaku Gothic ProN', 'Hiragino Mincho ProN', 'Hoefler Text', 'Humanst 521 Cn BT', 'Humanst521 BT', 'Humanst521 Lt BT', 'Imprint MT Shadow', 'Incised901 Bd BT', 'Incised901 BT',
      'Incised901 Lt BT', 'INCONSOLATA', 'Informal Roman', 'Informal011 BT', 'INTERSTATE', 'IrisUPC', 'Iskoola Pota', 'JasmineUPC', 'Jazz LET', 'Jenson', 'Jester', 'Jokerman', 'Juice ITC', 'Kabel Bk BT', 'Kabel Ult BT', 'Kailasa', 'KaiTi', 'Kalinga', 'Kannada Sangam MN',
      'Kartika', 'Kaufmann Bd BT', 'Kaufmann BT', 'Khmer UI', 'KodchiangUPC', 'Kokila', 'Korinna BT', 'Kristen ITC', 'Krungthep', 'Kunstler Script', 'Lao UI', 'Latha', 'Leelawadee', 'Letter Gothic', 'Levenim MT', 'LilyUPC', 'Lithograph', 'Lithograph Light', 'Long Island',
      'Lydian BT', 'Magneto', 'Maiandra GD', 'Malayalam Sangam MN', 'Malgun Gothic',
      'Mangal', 'Marigold', 'Marion', 'Marker Felt', 'Market', 'Marlett', 'Matisse ITC', 'Matura MT Script Capitals', 'Meiryo', 'Meiryo UI', 'Microsoft Himalaya', 'Microsoft JhengHei', 'Microsoft New Tai Lue', 'Microsoft PhagsPa', 'Microsoft Tai Le',
      'Microsoft Uighur', 'Microsoft YaHei', 'Microsoft Yi Baiti', 'MingLiU', 'MingLiU_HKSCS', 'MingLiU_HKSCS-ExtB', 'MingLiU-ExtB', 'Minion', 'Minion Pro', 'Miriam', 'Miriam Fixed', 'Mistral', 'Modern', 'Modern No. 20', 'Mona Lisa Solid ITC TT', 'Mongolian Baiti',
      'MONO', 'MoolBoran', 'Mrs Eaves', 'MS LineDraw', 'MS Mincho', 'MS PMincho', 'MS Reference Specialty', 'MS UI Gothic', 'MT Extra', 'MUSEO', 'MV Boli',
      'Nadeem', 'Narkisim', 'NEVIS', 'News Gothic', 'News GothicMT', 'NewsGoth BT', 'Niagara Engraved', 'Niagara Solid', 'Noteworthy', 'NSimSun', 'Nyala', 'OCR A Extended', 'Old Century', 'Old English Text MT', 'Onyx', 'Onyx BT', 'OPTIMA', 'Oriya Sangam MN',
      'OSAKA', 'OzHandicraft BT', 'Palace Script MT', 'Papyrus', 'Parchment', 'Party LET', 'Pegasus', 'Perpetua', 'Perpetua Titling MT', 'PetitaBold', 'Pickwick', 'Plantagenet Cherokee', 'Playbill', 'PMingLiU', 'PMingLiU-ExtB',
      'Poor Richard', 'Poster', 'PosterBodoni BT', 'PRINCETOWN LET', 'Pristina', 'PTBarnum BT', 'Pythagoras', 'Raavi', 'Rage Italic', 'Ravie', 'Ribbon131 Bd BT', 'Rockwell', 'Rockwell Condensed', 'Rockwell Extra Bold', 'Rod', 'Roman', 'Sakkal Majalla',
      'Santa Fe LET', 'Savoye LET', 'Sceptre', 'Script', 'Script MT Bold', 'SCRIPTINA', 'Serifa', 'Serifa BT', 'Serifa Th BT', 'ShelleyVolante BT', 'Sherwood',
      'Shonar Bangla', 'Showcard Gothic', 'Shruti', 'Signboard', 'SILKSCREEN', 'SimHei', 'Simplified Arabic', 'Simplified Arabic Fixed', 'SimSun', 'SimSun-ExtB', 'Sinhala Sangam MN', 'Sketch Rockwell', 'Skia', 'Small Fonts', 'Snap ITC', 'Snell Roundhand', 'Socket',
      'Souvenir Lt BT', 'Staccato222 BT', 'Steamer', 'Stencil', 'Storybook', 'Styllo', 'Subway', 'Swis721 BlkEx BT', 'Swiss911 XCm BT', 'Sylfaen', 'Synchro LET', 'System', 'Tamil Sangam MN', 'Technical', 'Teletype', 'Telugu Sangam MN', 'Tempus Sans ITC',
      'Terminal', 'Thonburi', 'Traditional Arabic', 'Trajan', 'TRAJAN PRO', 'Tristan', 'Tubular', 'Tunga', 'Tw Cen MT', 'Tw Cen MT Condensed', 'Tw Cen MT Condensed Extra Bold',
      'TypoUpright BT', 'Unicorn', 'Univers', 'Univers CE 55 Medium', 'Univers Condensed', 'Utsaah', 'Vagabond', 'Vani', 'Vijaya', 'Viner Hand ITC', 'VisualUI', 'Vivaldi', 'Vladimir Script', 'Vrinda', 'Westminster', 'WHITNEY', 'Wide Latin',
      'ZapfEllipt BT', 'ZapfHumnst BT', 'ZapfHumnst Dm BT', 'Zapfino', 'Zurich BlkEx BT', 'Zurich Ex BT', 'ZWAdobeF']

    const testString = 'mmmmmmmmmmlli'
    const testSize = '72px'
    const h = document.getElementsByTagName('body')[0]
    const baseFontsDiv = document.createElement('div')
    const fontsDiv = document.createElement('div')
    const defaultWidth = {}
    const defaultHeight = {}

    const createSpan = function () {
      const s = document.createElement('span')
      s.style.position = 'absolute'
      s.style.left = '-9999px'
      s.style.fontSize = testSize
      s.style.fontStyle = 'normal'
      s.style.fontWeight = 'normal'
      s.style.letterSpacing = 'normal'
      s.style.lineBreak = 'auto'
      s.style.lineHeight = 'normal'
      s.style.textTransform = 'none'
      s.style.textAlign = 'left'
      s.style.textDecoration = 'none'
      s.style.textShadow = 'none'
      s.style.whiteSpace = 'normal'
      s.style.wordBreak = 'normal'
      s.style.wordSpacing = 'normal'
      s.innerHTML = testString
      return s
    }

    const createSpanWithFonts = function (fontToDetect, baseFont) {
      const s = createSpan()
      s.style.fontFamily = `'${fontToDetect}',${baseFont}`
      return s
    }

    const initializeBaseFontsSpans = function () {
      const spans = []
      for (let idx = 0, length = baseFonts.length; idx < length; idx++) {
        const s = createSpan()
        s.style.fontFamily = baseFonts[idx]
        baseFontsDiv.appendChild(s)
        spans.push(s)
      }
      return spans
    }

    const initializeFontsSpans = function () {
      var spans = {}
      for (let i = 0, l = fontList.length; i < l; i++) {
        const fontSpans = []
        for (let j = 0, numDFnts = baseFonts.length; j < numDFnts; j++) {
          const s = createSpanWithFonts(fontList[i], baseFonts[j])
          fontsDiv.appendChild(s)
          fontSpans.push(s)
        }
        spans[fontList[i]] = fontSpans
      }
      return spans
    }

    const isFontAvailable = function (fontSpans) {
      let d = false
      for (let i = 0; i < baseFonts.length; i++) {
        d = (fontSpans[i].offsetWidth !== defaultWidth[baseFonts[i]] || fontSpans[i].offsetHeight !== defaultHeight[baseFonts[i]])
        if (d) { return d }
      }
      return d
    }

    const baseFontsSpans = initializeBaseFontsSpans()
    h.appendChild(baseFontsDiv)

    for (let idx = 0, length = baseFonts.length; idx < length; idx++) {
      defaultWidth[baseFonts[idx]] = baseFontsSpans[idx].offsetWidth
      defaultHeight[baseFonts[idx]] = baseFontsSpans[idx].offsetHeight
    }

    const fontsSpans = initializeFontsSpans()
    h.appendChild(fontsDiv)

    const available = []
    for (let i = 0, l = fontList.length; i < l; i++) {
      if (isFontAvailable(fontsSpans[fontList[i]])) {
        available.push(fontList[i])
      }
    }
    return available
  }

  static languageCodes () {
    return {
      ab: 'Abkhazian',
      aa: 'Afar',
      af: 'Afrikaans',
      ak: 'Akan',
      sq: 'Albanian',
      am: 'Amharic',
      ar: 'Arabic',
      an: 'Aragonese',
      hy: 'Armenian',
      as: 'Assamese',
      av: 'Avaric',
      ae: 'Avestan',
      ay: 'Aymara',
      az: 'Azerbaijani',
      bm: 'Bambara',
      ba: 'Bashkir',
      eu: 'Basque',
      be: 'Belarusian',
      bn: 'Bengali (Bangla)',
      bh: 'Bihari',
      bi: 'Bislama',
      bs: 'Bosnian',
      br: 'Breton',
      bg: 'Bulgarian',
      my: 'Burmese',
      ca: 'Catalan',
      ch: 'Chamorro',
      ce: 'Chechen',
      ny: 'Chichewa, Chewa, Nyanja',
      zh: 'Chinese',
      'zh-Hans': 'Chinese (Simplified)',
      'zh-Hant': 'Chinese (Traditional)',
      cv: 'Chuvash',
      kw: 'Cornish',
      co: 'Corsican',
      cr: 'Cree',
      hr: 'Croatian',
      cs: 'Czech',
      da: 'Danish',
      dv: 'Divehi, Dhivehi, Maldivian',
      nl: 'Dutch',
      dz: 'Dzongkha',
      en: 'English',
      eo: 'Esperanto',
      et: 'Estonian',
      ee: 'Ewe',
      fo: 'Faroese',
      fj: 'Fijian',
      fi: 'Finnish',
      fr: 'French',
      ff: 'Fula, Fulah, Pulaar, Pular',
      gl: 'Galician',
      gd: 'Gaelic (Scottish)',
      gv: 'Gaelic (Manx)',
      ka: 'Georgian',
      de: 'German',
      el: 'Greek',
      gn: 'Guarani',
      gu: 'Gujarati',
      ht: 'Haitian Creole',
      ha: 'Hausa',
      he: 'Hebrew',
      hz: 'Herero',
      hi: 'Hindi',
      ho: 'Hiri Motu',
      hu: 'Hungarian',
      is: 'Icelandic',
      io: 'Ido',
      ig: 'Igbo',
      id: 'Indonesian',
      in: 'Indonesian',
      ia: 'Interlingua',
      ie: 'Interlingue',
      iu: 'Inuktitut',
      ik: 'Inupiak',
      ga: 'Irish',
      it: 'Italian',
      ja: 'Japanese',
      jv: 'Javanese',
      kl: 'Kalaallisut, Greenlandic',
      kn: 'Kannada',
      kr: 'Kanuri',
      ks: 'Kashmiri',
      kk: 'Kazakh',
      km: 'Khmer',
      ki: 'Kikuyu',
      rw: 'Kinyarwanda (Rwanda)',
      rn: 'Kirundi',
      ky: 'Kyrgyz',
      kv: 'Komi',
      kg: 'Kongo',
      ko: 'Korean',
      ku: 'Kurdish',
      kj: 'Kwanyama',
      lo: 'Lao',
      la: 'Latin',
      lv: 'Latvian (Lettish)',
      li: 'Limburgish ( Limburger)',
      ln: 'Lingala',
      lt: 'Lithuanian',
      lu: 'Luga-Katanga',
      lg: 'Luganda, Ganda',
      lb: 'Luxembourgish',
      mk: 'Macedonian',
      mg: 'Malagasy',
      ms: 'Malay',
      ml: 'Malayalam',
      mt: 'Maltese',
      mi: 'Maori',
      mr: 'Marathi',
      mh: 'Marshallese',
      mo: 'Moldavian',
      mn: 'Mongolian',
      na: 'Nauru',
      nv: 'Navajo',
      ng: 'Ndonga',
      nd: 'Northern Ndebele',
      ne: 'Nepali',
      no: 'Norwegian',
      nb: 'Norwegian bokmål',
      nn: 'Norwegian nynorsk',
      ii: 'Nuosu | Sichuan Yi',
      oc: 'Occitan',
      oj: 'Ojibwe',
      cu: 'Old Church Slavonic, Old Bulgarian',
      or: 'Oriya',
      om: 'Oromo (Afaan Oromo)',
      os: 'Ossetian',
      pi: 'Pāli',
      ps: 'Pashto, Pushto',
      fa: 'Persian (Farsi)',
      pl: 'Polish',
      pt: 'Portuguese',
      pa: 'Punjabi (Eastern)',
      qu: 'Quechua',
      rm: 'Romansh',
      ro: 'Romanian',
      ru: 'Russian',
      se: 'Sami',
      sm: 'Samoan',
      sg: 'Sango',
      sa: 'Sanskrit',
      sr: 'Serbian',
      sh: 'Serbo-Croatian',
      st: 'Sesotho',
      tn: 'Setswana',
      sn: 'Shona',
      sd: 'Sindhi',
      si: 'Sinhalese',
      ss: 'Siswati | Swati',
      sk: 'Slovak',
      sl: 'Slovenian',
      so: 'Somali',
      nr: 'Southern Ndebele',
      es: 'Spanish',
      su: 'Sundanese',
      sw: 'Swahili (Kiswahili)',
      sv: 'Swedish',
      tl: 'Tagalog',
      ty: 'Tahitian',
      tg: 'Tajik',
      ta: 'Tamil',
      tt: 'Tatar',
      te: 'Telugu',
      th: 'Thai',
      bo: 'Tibetan',
      ti: 'Tigrinya',
      to: 'Tonga',
      ts: 'Tsonga',
      tr: 'Turkish',
      tk: 'Turkmen',
      tw: 'Twi',
      ug: 'Uyghur',
      uk: 'Ukrainian',
      ur: 'Urdu',
      uz: 'Uzbek',
      ve: 'Venda',
      vi: 'Vietnamese',
      vo: 'Volapük',
      wa: 'Wallon',
      cy: 'Welsh',
      wo: 'Wolof',
      fy: 'Western Frisian',
      xh: 'Xhosa',
      yi: 'Yiddish',
      ji: 'Yiddish',
      yo: 'Yoruba',
      za: 'Zhuang, Chuang',
      zu: 'Zulu'
    }
  }

  static countryCodes () {
    return {
      AF: 'AFGHANISTAN',
      AL: 'ALBANIA',
      DZ: 'ALGERIA',
      AS: 'AMERICAN SAMOA',
      AD: 'ANDORRA',
      AO: 'ANGOLA',
      AQ: 'ANTARCTICA',
      AG: 'ANTIGUA AND BARBUDA',
      AR: 'ARGENTINA',
      AM: 'ARMENIA',
      AW: 'ARUBA',
      AU: 'AUSTRALIA',
      AT: 'AUSTRIA',
      AZ: 'AZERBAIJAN',
      BS: 'BAHAMAS',
      BH: 'BAHRAIN',
      BD: 'BANGLADESH',
      BB: 'BARBADOS',
      BY: 'BELARUS',
      BE: 'BELGIUM',
      BZ: 'BELIZE',
      BJ: 'BENIN',
      BM: 'BERMUDA',
      BT: 'BHUTAN',
      BO: 'BOLIVIA',
      BA: 'BOSNIA AND HERZEGOVINA',
      BW: 'BOTSWANA',
      BV: 'BOUVET ISLAND',
      BR: 'BRAZIL',
      IO: 'BRITISH INDIAN OCEAN TERRITORY',
      BN: 'BRUNEI DARUSSALAM',
      BG: 'BULGARIA',
      BF: 'BURKINA FASO',
      BI: 'BURUNDI',
      KH: 'CAMBODIA',
      CM: 'CAMEROON',
      CA: 'CANADA',
      CV: 'CAPE VERDE',
      KY: 'CAYMAN ISLANDS',
      CF: 'CENTRAL AFRICAN REPUBLIC',
      TD: 'CHAD',
      CL: 'CHILE',
      CN: 'CHINA',
      CX: 'CHRISTMAS ISLAND',
      CC: 'COCOS (KEELING) ISLANDS',
      CO: 'COLOMBIA',
      KM: 'COMOROS',
      CG: 'CONGO',
      CD: 'CONGO, THE DEMOCRATIC REPUBLIC OF THE',
      CK: 'COOK ISLANDS',
      CR: 'COSTA RICA',
      CI: 'CÔTE D\'IVOIRE',
      HR: 'CROATIA',
      CU: 'CUBA',
      CY: 'CYPRUS',
      CZ: 'CZECH REPUBLIC',
      DK: 'DENMARK',
      DJ: 'DJIBOUTI',
      DM: 'DOMINICA',
      DO: 'DOMINICAN REPUBLIC',
      EC: 'ECUADOR',
      EG: 'EGYPT',
      SV: 'EL SALVADOR',
      GQ: 'EQUATORIAL GUINEA',
      ER: 'ERITREA',
      EE: 'ESTONIA',
      ET: 'ETHIOPIA',
      FK: 'FALKLAND ISLANDS (MALVINAS)',
      FO: 'FAROE ISLANDS',
      FJ: 'FIJI',
      FI: 'FINLAND',
      FR: 'FRANCE',
      GF: 'FRENCH GUIANA',
      PF: 'FRENCH POLYNESIA',
      TF: 'FRENCH SOUTHERN TERRITORIES',
      GA: 'GABON',
      GM: 'GAMBIA',
      GE: 'GEORGIA',
      DE: 'GERMANY',
      GH: 'GHANA',
      GI: 'GIBRALTAR',
      GR: 'GREECE',
      GL: 'GREENLAND',
      GD: 'GRENADA',
      GP: 'GUADELOUPE',
      GU: 'GUAM',
      GT: 'GUATEMALA',
      GN: 'GUINEA',
      GW: 'GUINEA-BISSAU',
      GY: 'GUYANA',
      HT: 'HAITI',
      HM: 'HEARD ISLAND AND MCDONALD ISLANDS',
      HN: 'HONDURAS',
      HK: 'HONG KONG',
      HU: 'HUNGARY',
      IS: 'ICELAND',
      IN: 'INDIA',
      ID: 'INDONESIA',
      IR: 'IRAN, ISLAMIC REPUBLIC OF',
      IQ: 'IRAQ',
      IE: 'IRELAND',
      IL: 'ISRAEL',
      IT: 'ITALY',
      JM: 'JAMAICA',
      JP: 'JAPAN',
      JO: 'JORDAN',
      KZ: 'KAZAKHSTAN',
      KE: 'KENYA',
      KI: 'KIRIBATI',
      KP: 'KOREA, DEMOCRATIC PEOPLE\'S REPUBLIC OF',
      KR: 'KOREA, REPUBLIC OF',
      KW: 'KUWAIT',
      KG: 'KYRGYZSTAN',
      LA: 'LAO PEOPLE\'S DEMOCRATIC REPUBLIC (LAOS)',
      LV: 'LATVIA',
      LB: 'LEBANON',
      LS: 'LESOTHO',
      LR: 'LIBERIA',
      LY: 'LIBYA, STATE OF',
      LI: 'LIECHTENSTEIN',
      LT: 'LITHUANIA',
      LU: 'LUXEMBOURG',
      MO: 'MACAO',
      MK: 'MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF',
      MG: 'MADAGASCAR',
      MW: 'MALAWI',
      MY: 'MALAYSIA',
      MV: 'MALDIVES',
      ML: 'MALI',
      MT: 'MALTA',
      MH: 'MARSHALL ISLANDS',
      MQ: 'MARTINIQUE',
      MR: 'MAURITANIA',
      MU: 'MAURITIUS',
      YT: 'MAYOTTE',
      MX: 'MEXICO',
      FM: 'MICRONESIA, FEDERATED STATES OF',
      MD: 'MOLDOVA, REPUBLIC OF',
      MC: 'MONACO',
      MN: 'MONGOLIA',
      ME: 'MONTENEGRO',
      MS: 'MONTSERRAT',
      MA: 'MOROCCO',
      MZ: 'MOZAMBIQUE',
      MM: 'MYANMAR',
      NA: 'NAMIBIA',
      NR: 'NAURU',
      NP: 'NEPAL, FEDERAL DEMOCRATIC REPUBLIC OF',
      NL: 'NETHERLANDS',
      AN: 'NETHERLANDS ANTILLES',
      NC: 'NEW CALEDONIA',
      NZ: 'NEW ZEALAND',
      NI: 'NICARAGUA',
      NE: 'NIGER',
      NG: 'NIGERIA',
      NU: 'NIUE',
      NF: 'NORFOLK ISLAND',
      MP: 'NORTHERN MARIANA ISLANDS',
      NO: 'NORWAY',
      OM: 'OMAN',
      PK: 'PAKISTAN',
      PW: 'PALAU',
      PS: 'PALESTINE, STATE OF',
      PA: 'PANAMA',
      PG: 'PAPUA NEW GUINEA',
      PY: 'PARAGUAY',
      PE: 'PERU',
      PH: 'PHILIPPINES',
      PN: 'PITCAIRN',
      PL: 'POLAND',
      PT: 'PORTUGAL',
      PR: 'PUERTO RICO',
      QA: 'QATAR',
      RE: 'RÉUNION',
      RO: 'ROMANIA',
      RU: 'RUSSIAN FEDERATION',
      RW: 'RWANDA',
      SH: 'SAINT HELENA',
      KN: 'SAINT KITTS AND NEVIS',
      LC: 'SAINT LUCIA',
      PM: 'SAINT PIERRE AND MIQUELON',
      VC: 'SAINT VINCENT AND THE GRENADINES',
      WS: 'SAMOA',
      SM: 'SAN MARINO',
      ST: 'SAO TOME AND PRINCIPE',
      SA: 'SAUDI ARABIA',
      SN: 'SENEGAL',
      RS: 'SERBIA',
      SC: 'SEYCHELLES',
      SL: 'SIERRA LEONE',
      SG: 'SINGAPORE',
      SK: 'SLOVAKIA',
      SI: 'SLOVENIA',
      SB: 'SOLOMON ISLANDS',
      SO: 'SOMALIA',
      ZA: 'SOUTH AFRICA',
      GS: 'SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS',
      SS: 'SOUTH SUDAN',
      ES: 'SPAIN',
      LK: 'SRI LANKA',
      SD: 'SUDAN',
      SR: 'SURINAME',
      SJ: 'SVALBARD AND JAN MAYEN',
      SZ: 'SWAZILAND',
      SE: 'SWEDEN',
      CH: 'SWITZERLAND',
      SY: 'SYRIAN ARAB REPUBLIC',
      TW: 'TAIWAN',
      TJ: 'TAJIKISTAN',
      TZ: 'TANZANIA, UNITED REPUBLIC OF',
      TH: 'THAILAND',
      TL: 'TIMOR-LESTE',
      TG: 'TOGO',
      TK: 'TOKELAU',
      TO: 'TONGA',
      TT: 'TRINIDAD AND TOBAGO',
      TN: 'TUNISIA',
      TR: 'TURKEY',
      TM: 'TURKMENISTAN',
      TC: 'TURKS AND CAICOS ISLANDS',
      TV: 'TUVALU',
      UG: 'UGANDA',
      UA: 'UKRAINE',
      AE: 'UNITED ARAB EMIRATES',
      GB: 'UNITED KINGDOM',
      US: 'UNITED STATES',
      UM: 'UNITED STATES MINOR OUTLYING ISLANDS',
      UY: 'URUGUAY',
      UZ: 'UZBEKISTAN',
      VU: 'VANUATU',
      VE: 'VENEZUELA',
      VN: 'VIET NAM',
      VG: 'VIRGIN ISLANDS, BRITISH',
      VI: 'VIRGIN ISLANDS, U.S.',
      WF: 'WALLIS AND FUTUNA',
      EH: 'WESTERN SAHARA',
      YE: 'YEMEN',
      ZM: 'ZAMBIA',
      ZW: 'ZIMBABWE'
    }
  }
}

if (typeof module !== 'undefined') module.exports = Averigua
else window.Averigua = Averigua

}).call(this)}).call(this,require('_process'))
},{"_process":3,"os":2}],5:[function(require,module,exports){
const CSS_NAMED_COLORS = require('./css-named-colors.js')

class Color {
  static alpha2hex (a) {
    const n = a * 255
    const v = n.toString(16)
    const h = v.split('.')[0]
    return (h.length === 1) ? `0${h}` : h
  }

  static hex2alpha (hex) {
    const v = parseInt(hex, 16) / 255
    return Math.round(v * 100) / 100
  }

  // ................................................................. HEX .....

  static _hex2rgb (hex) { // ('#ff0000') => { r: 1, g: 0, b: 0 }
    const o = this.hex2rgb(hex)
    return { r: o.r / 255, g: o.g / 255, b: o.b / 255 }
  }

  static hex2rgb (hex) { // ('#ff0000') => { r: 255, g: 0, b: 0 }
    if (hex.length === 9) hex = hex.substring(0, 7)
    else if (hex.length === 5) hex = hex.substring(0, 4)

    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b
    })

    const res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return res ? {
      r: parseInt(res[1], 16),
      g: parseInt(res[2], 16),
      b: parseInt(res[3], 16)
    } : null
  }

  static _hex2hsl (hex) { // ('#ff0000') => { h: 0, s: 1, l: 0.5 }
    const c = this.hex2rgb(hex)
    return this._rgb2hsl(c.r / 255, c.g / 255, c.b / 255)
  }

  static hex2hsl (hex) { // ('#ff0000') => { h: 0, s: 100, l: 50 }
    const c = this.hex2rgb(hex)
    return this.rgb2hsl(c.r, c.g, c.b)
  }

  static _hex2hsv (hex) { // ('#ff0000') => { h: 0, s: 1, v: 1 }
    const c = this.hex2rgb(hex)
    return this._rgb2hsv(c.r / 255, c.g / 255, c.b / 255)
  }

  static hex2hsv (hex) { // ('#ff0000') => { h: 0, s: 100, v: 100 }
    const c = this.hex2rgb(hex)
    return this.rgb2hsv(c.r, c.g, c.b)
  }

  // ................................................................. RGB .....

  static _rgb2hex (r, g, b) { // (1, 0, 0) => '#ff0000'
    r *= 255
    g *= 255
    b *= 255
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  }

  static rgb2hex (r, g, b) { // (255, 0, 0) => '#ff0000'
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  }

  static hex (r, g, b, alpha) { // (255, 0, 0) => '#ff0000', (255, 0, 0, 0.5) => '#ff00007f'
    const clamp = (v, min, max) => Math.min(max, Math.max(min, v))
    const rc = Math.round(clamp(Number(r), 0, 255))
    const gc = Math.round(clamp(Number(g), 0, 255))
    const bc = Math.round(clamp(Number(b), 0, 255))
    const base = '#' + ((1 << 24) + (rc << 16) + (gc << 8) + bc).toString(16).slice(1)
    if (typeof alpha === 'number') return base + this.alpha2hex(clamp(alpha, 0, 1))
    return base
  }

  static _rgb2hsl (r, g, b) { // (1, 0, 0) => { h: 0, s: 1, l: 0.5 }
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const l = (max + min) / 2
    if (max === min) return { h: 0, s: 0, l }
    const d = max - min
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    let h
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    return { h: h / 6, s, l }
  }

  static rgb2hsl (r, g, b) { // (255, 0, 0) => { h: 0, s: 100, l: 50 }
    const o = this._rgb2hsl(r / 255, g / 255, b / 255)
    return {
      h: Math.round(o.h * 360),
      s: Math.round(o.s * 100),
      l: Math.round(o.l * 100)
    }
  }

  static _rgb2hsv (r, g, b) { // (1, 0, 0) => { h: 0, s: 1, v: 1 }
    r *= 255
    g *= 255
    b *= 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const dif = max - min

    let h
    const s = max === 0 ? 0 : dif / max
    const v = max / 255

    switch (max) {
      case min: h = 0; break
      case r: h = (g - b) + dif * (g < b ? 6 : 0); h /= 6 * dif; break
      case g: h = (b - r) + dif * 2; h /= 6 * dif; break
      case b: h = (r - g) + dif * 4; h /= 6 * dif; break
    }

    return { h, s, v }
  }

  static rgb2hsv (r, g, b) { // (255, 0, 0) => { h: 0, s: 100, v: 100 }
    const c = this._rgb2hsv(r / 255, g / 255, b / 255)
    return {
      h: Math.round(c.h * 360),
      s: Math.round(c.s * 100),
      v: Math.round(c.v * 100)
    }
  }

  // ................................................................. HSL .....

  static _hsl2hex (h, s, l) { // (0, 1, 0.5) => '#ff0000'
    const f = this._hsl2rgb(h, s, l)
    const toHex = x => {
      const hex = Math.round(x * 255).toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }
    return `#${toHex(f.r)}${toHex(f.g)}${toHex(f.b)}`
  }

  static hsl2hex (h, s, l) { // (0, 100, 50) => '#ff0000'
    return this._hsl2hex(h / 360, s / 100, l / 100)
  }

  static _hsl2rgb (h, s, l) { // (0, 1, 0.5) => { r: 1, g: 0, b: 0 }
    h = h * 360
    const a = s * Math.min(l, 1 - l)
    const f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return { r: f(0), g: f(8), b: f(4) }
  }

  static hsl2rgb (h, s, l) { // (0, 100, 50) => { r: 255, g: 0, b: 0 }
    const c = this._hsl2rgb(h / 360, s / 100, l / 100)
    return {
      r: Math.round(c.r * 255),
      g: Math.round(c.g * 255),
      b: Math.round(c.b * 255)
    }
  }

  static _hsl2hsv (h, s, l) { // (0, 1, 0.5) => { h: 0, s: 1, v: 1 }
    l *= 2
    s *= (l <= 1) ? l : 2 - l
    const v = (1 + s) / 2
    s = (2 * s) / (l + s)
    return { h, s, v }
  }

  static hsl2hsv (h, s, l) { // (0, 100, 50) => { h: 0, s: 100, v: 100 }
    h /= 360
    s /= 100
    l /= 100
    const c = this._hsl2hsv(h, s, l)
    return {
      h: Math.round(c.h * 360),
      s: Math.round(c.s * 100),
      v: Math.round(c.v * 100)
    }
  }

  // ................................................................. HSV ....

  static _hsv2hex (h, s, v) { // (0, 1, 1) => '#ff0000'
    const c = this._hsv2rgb(h, s, v)
    return this._rgb2hex(c.r, c.g, c.b)
  }

  static hsv2hex (h, s, v) { // (0, 100, 100) => '#ff0000'
    const c = this.hsv2rgb(h, s, v)
    return this.rgb2hex(c.r, c.g, c.b)
  }

  static _hsv2rgb (h, s, v) { // (0, 1, 1) => { r: 1, g: 0, b: 0 }
    let r, g, b
    const i = Math.floor(h * 6)
    const f = h * 6 - i
    const p = v * (1 - s)
    const q = v * (1 - f * s)
    const t = v * (1 - (1 - f) * s)
    switch (i % 6) {
      case 0: r = v; g = t; b = p; break
      case 1: r = q; g = v; b = p; break
      case 2: r = p; g = v; b = t; break
      case 3: r = p; g = q; b = v; break
      case 4: r = t; g = p; b = v; break
      case 5: r = v; g = p; b = q; break
    }
    return { r, g, b }
  }

  static hsv2rgb (h, s, v) { // (0, 100, 100) => { r: 255, g: 0, b: 0 }
    h /= 360
    s /= 100
    v /= 100
    const c = this._hsv2rgb(h, s, v)
    return {
      r: Math.round(c.r * 255),
      g: Math.round(c.g * 255),
      b: Math.round(c.b * 255)
    }
  }

  static _hsv2hsl (h, s, v) { // (0, 1, 1) => { h: 0, s: 1, l: 0.5 }
    const l = (2 - s) * v / 2
    if (l !== 0) {
      if (l === 1) s = 0
      else if (l < 0.5) s = s * v / (l * 2)
      else s = s * v / (2 - l * 2)
    }
    return { h, s, l }
  }

  static hsv2hsl (h, s, v) { // (0, 100, 100) => { h: 0, s: 100, l: 50 }
    h /= 360
    s /= 100
    v /= 100
    const c = this._hsv2hsl(h, s, v)
    return {
      h: Math.round(c.h * 360),
      s: Math.round(c.s * 100),
      l: Math.round(c.l * 100)
    }
  }

  // normalize an input into HSL {h,s,l} with degrees/percent ranges
  static toHSL (value, defaults = {}) {
    const clamp = (n, min, max) => Math.min(max, Math.max(min, n))
    const normHue = h => ((h % 360) + 360) % 360

    if (typeof value === 'number') {
      return {
        h: normHue(value),
        s: typeof defaults.saturation === 'number' ? clamp(defaults.saturation, 0, 100) : 100,
        l: typeof defaults.lightness === 'number' ? clamp(defaults.lightness, 0, 100) : 50
      }
    }

    if (typeof value === 'string' && value) {
      const s = value.trim()
      if (s[0] === '#') return this.hex2hsl(s)
      const named = CSS_NAMED_COLORS[s.toLowerCase()]
      if (named) return this.hex2hsl(named)
      const m = this.match(s)
      if (m) {
        const kind = m[0]
        if (kind === 'hex') return this.hex2hsl(m[1])
        if (kind === 'rgb') {
          const r = parseFloat(m[2]); const g = parseFloat(m[3]); const b = parseFloat(m[4])
          return this.rgb2hsl(r, g, b)
        }
        if (kind === 'hsl') {
          const h = parseFloat(m[2]); const S = parseFloat(m[3]); const L = parseFloat(m[4])
          return { h: normHue(h), s: clamp(S, 0, 100), l: clamp(L, 0, 100) }
        }
      }
    }

    if (value && typeof value === 'object') {
      if ('h' in value && 's' in value && 'l' in value) {
        return { h: normHue(value.h), s: clamp(value.s, 0, 100), l: clamp(value.l, 0, 100) }
      }
      if ('h' in value && 's' in value && 'v' in value) {
        const hsl = this.hsv2hsl(value.h, value.s, value.v)
        return { h: normHue(hsl.h), s: clamp(hsl.s, 0, 100), l: clamp(hsl.l, 0, 100) }
      }
      if ('r' in value && 'g' in value && 'b' in value) {
        return this.rgb2hsl(value.r, value.g, value.b)
      }
    }

    return { h: 0, s: 100, l: 50 }
  }

  // normalize an input into a hex color string
  static toHex (value) {
    if (typeof value === 'string' && value.trim()[0] === '#') return value.trim()
    const rgb = this.toRGB(value)
    return this.rgb2hex(rgb.r, rgb.g, rgb.b)
  }

  // normalize an input into RGB {r,g,b} with 0-255 ranges
  static toRGB (value, defaults = {}) {
    if (typeof value === 'number' || (value && typeof value === 'object' && 'h' in value)) {
      const hsl = this.toHSL(value, defaults)
      return this.hsl2rgb(hsl.h, hsl.s, hsl.l)
    }
    if (typeof value === 'string' && value) {
      const s = value.trim()
      if (s[0] === '#') return this.hex2rgb(s)
      const named = CSS_NAMED_COLORS[s.toLowerCase()]
      if (named) return this.hex2rgb(named)
      const m = this.match(s)
      if (m) {
        const kind = m[0]
        if (kind === 'hex') return this.hex2rgb(m[1])
        if (kind === 'rgb') {
          return { r: parseFloat(m[2]), g: parseFloat(m[3]), b: parseFloat(m[4]) }
        }
        if (kind === 'hsl') {
          const h = parseFloat(m[2]); const S = parseFloat(m[3]); const L = parseFloat(m[4])
          return this.hsl2rgb(h, S, L)
        }
      }
    }
    if (value && typeof value === 'object' && 'r' in value && 'g' in value && 'b' in value) {
      return { r: value.r, g: value.g, b: value.b }
    }
    // fallback: pure red
    return { r: 255, g: 0, b: 0 }
  }

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ lerp / gradient ~ ~ ~

  static lerpColor (a, b, t) {
    t = Math.max(0, Math.min(1, t))
    const ca = this.toHSL(a)
    const cb = this.toHSL(b)
    // shortest-path hue interpolation
    let dh = cb.h - ca.h
    if (dh > 180) dh -= 360
    if (dh < -180) dh += 360
    const h = ((ca.h + dh * t) % 360 + 360) % 360
    const s = ca.s + (cb.s - ca.s) * t
    const l = ca.l + (cb.l - ca.l) * t
    return this.toHex({ h, s, l })
  }

  static colorGradient (colors, stepsOrDirection) {
    if (!Array.isArray(colors) || colors.length < 2) {
      console.error('nn.colorGradient: first argument must be an array of at least 2 colors')
      return typeof stepsOrDirection === 'number' ? [] : ''
    }
    // CSS string mode — infer gradient type from the direction string
    if (typeof stepsOrDirection === 'string') {
      const stops = colors.map(c => this.toHex(c)).join(', ')
      const d = stepsOrDirection.trim().toLowerCase()
      if (/^from\b/.test(d)) {
        return `conic-gradient(${stepsOrDirection}, ${stops})`
      }
      if (/\b(circle|ellipse|closest-side|closest-corner|farthest-side|farthest-corner)\b/.test(d) || /^at\s/.test(d)) {
        return `radial-gradient(${stepsOrDirection}, ${stops})`
      }
      return `linear-gradient(${stepsOrDirection}, ${stops})`
    }
    // Array interpolation mode
    const steps = Math.max(2, Math.floor(stepsOrDirection))
    const n = colors.length
    const result = []
    for (let i = 0; i < steps; i++) {
      const pos = i / (steps - 1)
      const scaled = pos * (n - 1)
      const idx = Math.min(Math.floor(scaled), n - 2)
      const t = scaled - idx
      result.push(this.lerpColor(colors[idx], colors[idx + 1], t))
    }
    return result
  }

  static closestColor (color, palette) {
    if (!Array.isArray(palette) || palette.length === 0) {
      console.error('nn.closestColor: second argument must be a non-empty array')
      return null
    }
    const { r: tr, g: tg, b: tb } = this.toRGB(color)
    let best = null
    let bestDist = Infinity
    for (const c of palette) {
      const { r, g, b } = this.toRGB(c)
      const d = (r - tr) ** 2 + (g - tg) ** 2 + (b - tb) ** 2
      if (d < bestDist) { bestDist = d; best = c }
    }
    return best
  }

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ random color  ~ ~ ~

  static random (type, alpha) {
    let r, g, b, h, s, l, a, hex
    const opac = type === 'rgba' || type === 'hsla'
    if (typeof alpha === 'number') {
      a = type === 'hex' ? this.alpha2hex(alpha) : alpha
    } else if (alpha === true || opac) {
      a = type === 'hex'
        ? Math.floor(Math.random() * 255).toString(16)
        : Math.round(Math.random() * 100) / 100
    }

    if (type === 'rgb' || type === 'rgba') {
      r = Math.floor(Math.random() * 255)
      g = Math.floor(Math.random() * 255)
      b = Math.floor(Math.random() * 255)
      if (a) {
        return `rgba(${r}, ${g}, ${b}, ${a})`
      } else {
        return `rgb(${r}, ${g}, ${b})`
      }
    } else if (type === 'hsl' || type === 'hsla') {
      h = Math.floor(Math.random() * 360)
      s = Math.floor(Math.random() * 100)
      l = Math.floor(Math.random() * 100)
      if (a) {
        return `hsla(${h}, ${s}%, ${l}%, ${a})`
      } else {
        return `hsl(${h}, ${s}%, ${l}%)`
      }
    } else {
      hex = '#' + Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, '0')
      return a ? hex + a : hex
    }
  }

  // Compute contrast ratio per WCAG between two colors (hex/rgb/hsl or objects)
  static contrast (a, b) {
    const rgbA = this.toRGB(a)
    const rgbB = this.toRGB(b)
    const toLin = (c) => {
      const v = c / 255
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    }
    const LA = 0.2126 * toLin(rgbA.r) + 0.7152 * toLin(rgbA.g) + 0.0722 * toLin(rgbA.b)
    const LB = 0.2126 * toLin(rgbB.r) + 0.7152 * toLin(rgbB.g) + 0.0722 * toLin(rgbB.b)
    const L1 = Math.max(LA, LB)
    const L2 = Math.min(LA, LB)
    return (L1 + 0.05) / (L2 + 0.05)
  }

  static isLight (color) {
    const { r, g, b } = this.toRGB(color)
    // HSP equation from http://alienryderflex.com/hsp.html
    const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b))
    return hsp > 127.5
  }

  static match (str) {
    const hexRegex = /#[a-f\d]{3}(?:[a-f\d]?|(?:[a-f\d]{3}(?:[a-f\d]{2})?)?)\b/
    const hex = str.match(hexRegex)
    const rgbRegex = /rgba?\((?:(25[0-5]|2[0-4]\d|1?\d{1,2}|(?:\d{1,2}|100)%),\s*(25[0-5]|2[0-4]\d|1?\d{1,2}|(?:\d{1,2}|100)%),\s*(25[0-5]|2[0-4]\d|1?\d{1,2}|(?:\d{1,2}|100)%)(?:,\s*((?:\d{1,2}|100)%|0(?:\.\d+)?|1))?|(25[0-5]|2[0-4]\d|1?\d{1,2}|(?:\d{1,2}|100)%)\s+(25[0-5]|2[0-4]\d|1?\d{1,2}|(?:\d{1,2}|100)%)\s+(25[0-5]|2[0-4]\d|1?\d{1,2}|(?:\d{1,2}|100)%)(?:\s+((?:\d{1,2}|100)%|0(?:\.\d+)?|1))?)\)/
    const rgb = str.match(rgbRegex)
    const hslRegex = /hsla?\((?:(-?\d+(?:deg|g?rad|turn)?),\s*((?:\d{1,2}|100)%),\s*((?:\d{1,2}|100)%)(?:,\s*((?:\d{1,2}|100)%|0(?:\.\d+)?|1))?|(-?\d+(?:deg|g?rad|turn)?)\s+((?:\d{1,2}|100)%)\s+((?:\d{1,2}|100)%)(?:\s+((?:\d{1,2}|100)%|0(?:\.\d+)?|1))?)\)/
    const hsl = str.match(hslRegex)
    const namedRegex = new RegExp('\\b(' + Object.keys(CSS_NAMED_COLORS).join('|') + ')\\b', 'i')
    const named = str.match(namedRegex)
    if (hex) return ['hex', ...hex]
    else if (rgb) return ['rgb', ...rgb]
    else if (hsl) return ['hsl', ...hsl]
    else if (named) return ['named', named[1].toLowerCase()]
    else return null
  }

  // create color schemes based on harmony types
  // returns an array of hex color strings
  // API: Color.scheme({ harmony, base, ...options })
  static scheme (options = {}) {
    const t = (options.harmony || '').toLowerCase()
    const o = options || {}

    const clamp = (n, min, max) => Math.min(max, Math.max(min, n))
    const normHue = h => ((h % 360) + 360) % 360

    const base = this.toHSL(options.base, { saturation: o.saturation, lightness: o.lightness })
    const h0 = normHue(base.h)
    const s0 = ('saturation' in o) ? clamp(o.saturation, 0, 100) : clamp(base.s, 0, 100)
    const l0 = ('lightness' in o) ? clamp(o.lightness, 0, 100) : clamp(base.l, 0, 100)

    const includeBase = ('includeBase' in o) ? !!o.includeBase : true
    const count = typeof o.count === 'number' && o.count > 0 ? Math.floor(o.count) : undefined
    const angle = typeof o.angle === 'number' ? o.angle : 30 // for analogous
    const offset = typeof o.offset === 'number' ? o.offset : 30 // for split/compound

    // contrast handling options
    const cOpt = o.contrast != null ? o.contrast : o.minContrast
    const contrastMin = typeof cOpt === 'string' ? ((cOpt.toUpperCase() === 'AAA') ? 7 : 4.5) : (typeof cOpt === 'number' ? cOpt : null)
    const contrastAgainst = o.contrastAgainst || o.against
    const contrastStrategy = o.contrastStrategy || o.strategy || 'adjust' // 'adjust' | 'filter'
    const steps = (typeof o.steps === 'number' && o.steps > 0) ? Math.min(50, Math.floor(o.steps)) : 1

    const meetsContrast = (hex) => {
      if (!contrastMin || !contrastAgainst) return true
      return this.contrast(hex, contrastAgainst) >= contrastMin
    }

    const adjustForContrast = (hex) => {
      if (!contrastMin || !contrastAgainst) return hex
      if (meetsContrast(hex)) return hex
      const hsl = this.toHSL(hex)
      const tryDir = (dir) => {
        let low = dir === 'darker' ? 0 : hsl.l
        let high = dir === 'darker' ? hsl.l : 100
        let best = null
        for (let i = 0; i < steps; i++) {
          const mid = (low + high) / 2
          const testHex = this.hsl2hex(hsl.h, hsl.s, mid)
          const ok = this.contrast(testHex, contrastAgainst) >= contrastMin
          if (ok) {
            best = { l: mid, hex: testHex }
            if (dir === 'darker') high = mid; else low = mid
          } else {
            if (dir === 'darker') low = mid; else high = mid
          }
        }
        return best
      }
      const darker = tryDir('darker')
      const lighter = tryDir('lighter')
      if (!darker && !lighter) return hex
      if (darker && !lighter) return darker.hex
      if (!darker && lighter) return lighter.hex
      // choose the minimal lightness change
      return (Math.abs(darker.l - hsl.l) <= Math.abs(lighter.l - hsl.l)) ? darker.hex : lighter.hex
    }

    const push = (h, s = s0, l = l0, arr) => {
      let hex = this.hsl2hex(normHue(h), clamp(s, 0, 100), clamp(l, 0, 100))
      if (contrastMin && contrastAgainst) {
        if (contrastStrategy === 'adjust') {
          hex = adjustForContrast(hex)
        } else if (!meetsContrast(hex)) {
          return // skip if filtering
        }
      }
      ;(arr || res).push(hex)
    }

    const res = []

    if (t === 'random') {
      const n = count || 5
      for (let i = 0; i < n; i++) res.push(this.random('hex'))
      return res
    }

    if (t === 'analogous') {
      const n = count || 5
      // generate around base hue in steps of `angle`
      const start = includeBase ? -Math.floor((n - 1) / 2) : -Math.floor(n / 2)
      for (let i = 0; i < n; i++) {
        let idx = start + i
        if (!includeBase && idx >= 0) idx += 1 // skip base (0)
        push(h0 + idx * angle)
      }
      return res
    }

    if (t === 'monochromatic') {
      const n = count || 5
      const range = Array.isArray(o.lightnessRange) && o.lightnessRange.length === 2
        ? [clamp(o.lightnessRange[0], 0, 100), clamp(o.lightnessRange[1], 0, 100)]
        : [clamp(Math.max(0, l0 - 40), 0, 100), clamp(Math.min(100, l0 + 40), 0, 100)]
      for (let i = 0; i < n; i++) {
        const li = n === 1 ? l0 : range[0] + (range[1] - range[0]) * (i / (n - 1))
        push(h0, s0, li)
      }
      return res
    }

    if (t === 'shades') {
      const n = count || 5
      const range = Array.isArray(o.lightnessRange) && o.lightnessRange.length === 2
        ? [clamp(o.lightnessRange[0], 0, 100), clamp(o.lightnessRange[1], 0, 100)]
        : [10, 90]
      for (let i = 0; i < n; i++) {
        const li = n === 1 ? l0 : range[0] + (range[1] - range[0]) * (i / (n - 1))
        push(h0, s0, li)
      }
      return res
    }

    if (t === 'triad') {
      let hues = [h0, h0 + 120, h0 + 240]
      if (!includeBase) hues = hues.slice(1)
      if (count) hues = hues.slice(0, count)
      hues.forEach(h => push(h))
      return res
    }

    if (t === 'complementary') {
      let hues = [h0, h0 + 180]
      if (!includeBase) hues = hues.slice(1)
      if (count) hues = hues.slice(0, count)
      hues.forEach(h => push(h))
      return res
    }

    if (t === 'split-complementary' || t === 'split_complementary' || t === 'split') {
      let hues = [h0, h0 + 180 - offset, h0 + 180 + offset]
      if (!includeBase) hues = hues.slice(1)
      if (count) hues = hues.slice(0, count)
      hues.forEach(h => push(h))
      return res
    }

    if (t === 'square') {
      let hues = [h0, h0 + 90, h0 + 180, h0 + 270]
      if (!includeBase) hues = hues.slice(1)
      if (count) hues = hues.slice(0, count)
      hues.forEach(h => push(h))
      return res
    }

    if (t === 'compound') {
      let hues = [h0 - offset, h0, h0 + offset, h0 + 180 - offset, h0 + 180 + offset]
      if (!includeBase) hues = hues.filter(h => normHue(h) !== normHue(h0))
      if (count) hues = hues.slice(0, count)
      hues.forEach(h => push(h))
      return res
    }

    // default to analogous if unknown type
    const n = count || 5
    const start = includeBase ? -Math.floor((n - 1) / 2) : -Math.floor(n / 2)
    for (let i = 0; i < n; i++) {
      let idx = start + i
      if (!includeBase && idx >= 0) idx += 1
      push(h0 + idx * angle)
    }
    return res
  }

  static rgb (r, g, b, a) {
    const clamp = (v, min, max) => Math.min(max, Math.max(min, v))
    const rc = Math.round(clamp(Number(r), 0, 255))
    const gc = Math.round(clamp(Number(g), 0, 255))
    const bc = Math.round(clamp(Number(b), 0, 255))
    if (typeof a === 'number') {
      const ac = clamp(a, 0, 1)
      return `rgba(${rc}, ${gc}, ${bc}, ${ac})`
    }
    return `rgb(${rc}, ${gc}, ${bc})`
  }

  static hsl (h, s, l, a) {
    const clamp = (v, min, max) => Math.min(max, Math.max(min, v))
    const hc = Math.round(clamp(Number(h), 0, 360))
    const sc = Math.round(clamp(Number(s), 0, 100))
    const lc = Math.round(clamp(Number(l), 0, 100))
    if (typeof a === 'number') {
      const ac = clamp(a, 0, 1)
      return `hsla(${hc}, ${sc}%, ${lc}%, ${ac})`
    }
    return `hsl(${hc}, ${sc}%, ${lc}%)`
  }
}

if (typeof module !== 'undefined') module.exports = Color

},{"./css-named-colors.js":6}],6:[function(require,module,exports){
const CSS_NAMED_COLORS = {
  aliceblue: '#f0f8ff',
  antiquewhite: '#faebd7',
  aqua: '#00ffff',
  aquamarine: '#7fffd4',
  azure: '#f0ffff',
  beige: '#f5f5dc',
  bisque: '#ffe4c4',
  black: '#000000',
  blanchedalmond: '#ffebcd',
  blue: '#0000ff',
  blueviolet: '#8a2be2',
  brown: '#a52a2a',
  burlywood: '#deb887',
  cadetblue: '#5f9ea0',
  chartreuse: '#7fff00',
  chocolate: '#d2691e',
  coral: '#ff7f50',
  cornflowerblue: '#6495ed',
  cornsilk: '#fff8dc',
  crimson: '#dc143c',
  cyan: '#00ffff',
  darkblue: '#00008b',
  darkcyan: '#008b8b',
  darkgoldenrod: '#b8860b',
  darkgray: '#a9a9a9',
  darkgreen: '#006400',
  darkgrey: '#a9a9a9',
  darkkhaki: '#bdb76b',
  darkmagenta: '#8b008b',
  darkolivegreen: '#556b2f',
  darkorange: '#ff8c00',
  darkorchid: '#9932cc',
  darkred: '#8b0000',
  darksalmon: '#e9967a',
  darkseagreen: '#8fbc8f',
  darkslateblue: '#483d8b',
  darkslategray: '#2f4f4f',
  darkslategrey: '#2f4f4f',
  darkturquoise: '#00ced1',
  darkviolet: '#9400d3',
  deeppink: '#ff1493',
  deepskyblue: '#00bfff',
  dimgray: '#696969',
  dimgrey: '#696969',
  dodgerblue: '#1e90ff',
  firebrick: '#b22222',
  floralwhite: '#fffaf0',
  forestgreen: '#228b22',
  fuchsia: '#ff00ff',
  gainsboro: '#dcdcdc',
  ghostwhite: '#f8f8ff',
  gold: '#ffd700',
  goldenrod: '#daa520',
  gray: '#808080',
  green: '#008000',
  greenyellow: '#adff2f',
  grey: '#808080',
  honeydew: '#f0fff0',
  hotpink: '#ff69b4',
  indianred: '#cd5c5c',
  indigo: '#4b0082',
  ivory: '#fffff0',
  khaki: '#f0e68c',
  lavender: '#e6e6fa',
  lavenderblush: '#fff0f5',
  lawngreen: '#7cfc00',
  lemonchiffon: '#fffacd',
  lightblue: '#add8e6',
  lightcoral: '#f08080',
  lightcyan: '#e0ffff',
  lightgoldenrodyellow: '#fafad2',
  lightgray: '#d3d3d3',
  lightgreen: '#90ee90',
  lightgrey: '#d3d3d3',
  lightpink: '#ffb6c1',
  lightsalmon: '#ffa07a',
  lightseagreen: '#20b2aa',
  lightskyblue: '#87cefa',
  lightslategray: '#778899',
  lightslategrey: '#778899',
  lightsteelblue: '#b0c4de',
  lightyellow: '#ffffe0',
  lime: '#00ff00',
  limegreen: '#32cd32',
  linen: '#faf0e6',
  magenta: '#ff00ff',
  maroon: '#800000',
  mediumaquamarine: '#66cdaa',
  mediumblue: '#0000cd',
  mediumorchid: '#ba55d3',
  mediumpurple: '#9370db',
  mediumseagreen: '#3cb371',
  mediumslateblue: '#7b68ee',
  mediumspringgreen: '#00fa9a',
  mediumturquoise: '#48d1cc',
  mediumvioletred: '#c71585',
  midnightblue: '#191970',
  mintcream: '#f5fffa',
  mistyrose: '#ffe4e1',
  moccasin: '#ffe4b5',
  navajowhite: '#ffdead',
  navy: '#000080',
  oldlace: '#fdf5e6',
  olive: '#808000',
  olivedrab: '#6b8e23',
  orange: '#ffa500',
  orangered: '#ff4500',
  orchid: '#da70d6',
  palegoldenrod: '#eee8aa',
  palegreen: '#98fb98',
  paleturquoise: '#afeeee',
  palevioletred: '#db7093',
  papayawhip: '#ffefd5',
  peachpuff: '#ffdab9',
  peru: '#cd853f',
  pink: '#ffc0cb',
  plum: '#dda0dd',
  powderblue: '#b0e0e6',
  purple: '#800080',
  rebeccapurple: '#663399',
  red: '#ff0000',
  rosybrown: '#bc8f8f',
  royalblue: '#4169e1',
  saddlebrown: '#8b4513',
  salmon: '#fa8072',
  sandybrown: '#f4a460',
  seagreen: '#2e8b57',
  seashell: '#fff5ee',
  sienna: '#a0522d',
  silver: '#c0c0c0',
  skyblue: '#87ceeb',
  slateblue: '#6a5acd',
  slategray: '#708090',
  slategrey: '#708090',
  snow: '#fffafa',
  springgreen: '#00ff7f',
  steelblue: '#4682b4',
  tan: '#d2b48c',
  teal: '#008080',
  thistle: '#d8bfd8',
  tomato: '#ff6347',
  turquoise: '#40e0d0',
  violet: '#ee82ee',
  wheat: '#f5deb3',
  white: '#ffffff',
  whitesmoke: '#f5f5f5',
  yellow: '#ffff00',
  yellowgreen: '#9acd32'
}

if (typeof module !== 'undefined') module.exports = CSS_NAMED_COLORS

},{}],7:[function(require,module,exports){
// nn canvas augmentation: adds just a few 2D helpers onto an existing <canvas> element
// but tries to stay pretty close to the native canvas API for edu purposes.
function augmentCanvas (ele) {
  if (!(ele instanceof window.HTMLCanvasElement)) return ele
  if (ele.__nn_canvasAugmented) return ele
  ele.__nn_canvasAugmented = true

  ele.ctx = ele.getContext('2d')

  // track mouse relative to this canvas
  ele.mouseDown = false
  ele.mouseX = 0
  ele.mouseY = 0
  if (!ele.__nn_mouseHandlersBound) {
    const updateMouse = (e) => {
      const box = ele.getBoundingClientRect()
      ele.mouseX = e.clientX - box.left
      ele.mouseY = e.clientY - box.top
    }
    const onMouseDown = (e) => {
      const box = ele.getBoundingClientRect()
      const inside = e.clientX >= box.left && e.clientX <= box.right && e.clientY >= box.top && e.clientY <= box.bottom
      if (inside) ele.mouseDown = true
    }
    const onMouseUp = () => { ele.mouseDown = false }
    window.addEventListener('mousemove', updateMouse)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    ele.__nn_mouseHandlersBound = { updateMouse, onMouseDown, onMouseUp }
  }

  // when added to a parent, default buffer size to parent box
  if (typeof ele.addTo === 'function') {
    const _addTo = ele.addTo
    ele.addTo = function (parent) {
      _addTo.call(this, parent)
      const p = this.parentNode
      if (p && p instanceof window.HTMLElement) {
        // only set if not explicitly sized (attribute or property still at default 300x150)
        if (!this.hasAttribute('width') && this.width === 300) this.width = p.offsetWidth
        if (!this.hasAttribute('height') && this.height === 150) this.height = p.offsetHeight
      }
      return this
    }
  }

  // clean up listeners when element is removed
  if (typeof ele.remove === 'function' && ele.__nn_mouseHandlersBound) {
    const _remove = ele.remove
    ele.remove = function () {
      const handlers = this.__nn_mouseHandlersBound
      if (handlers) {
        window.removeEventListener('mousemove', handlers.updateMouse)
        window.removeEventListener('mousedown', handlers.onMouseDown)
        window.removeEventListener('mouseup', handlers.onMouseUp)
        this.__nn_mouseHandlersBound = null
      }
      return _remove.call(this)
    }
  }

  // properties mapped to context
  Object.defineProperties(ele, {
    fillColor: {
      get () { return this.ctx.fillStyle },
      set (val) {
        const isGradient = (typeof window.CanvasGradient !== 'undefined' && val instanceof window.CanvasGradient)
        const isPattern = (typeof window.CanvasPattern !== 'undefined' && val instanceof window.CanvasPattern)
        if (!isGradient && !isPattern && typeof val !== 'string') {
          throw new Error(`canvas.fillColor must be a CSS color string, CanvasGradient or CanvasPattern, but you passed a ${typeof val}`)
        }
        this.ctx.fillStyle = val
      },
      configurable: true
    },
    strokeColor: {
      get () { return this.ctx.strokeStyle },
      set (val) {
        const isGradient = (typeof window.CanvasGradient !== 'undefined' && val instanceof window.CanvasGradient)
        const isPattern = (typeof window.CanvasPattern !== 'undefined' && val instanceof window.CanvasPattern)
        if (!isGradient && !isPattern && typeof val !== 'string') {
          throw new Error(`canvas.strokeColor must be a CSS color string, CanvasGradient or CanvasPattern, but you passed a ${typeof val}`)
        }
        this.ctx.strokeStyle = val
      },
      configurable: true
    },
    lineWidth: {
      get () { return this.ctx.lineWidth },
      set (size) {
        if (typeof size !== 'number') {
          throw new Error(`lineWidth is expecting a number, for example canvas.lineWidth = 5 but you passed a ${typeof size}`)
        }
        this.ctx.lineWidth = size
      },
      configurable: true
    },
    lineCap: {
      get () { return this.ctx.lineCap },
      set (style) {
        if (typeof style !== 'string') {
          throw new Error(`lineCap is expecting a string, for example canvas.lineCap = 'round' but you passed a ${typeof style}`)
        }
        this.ctx.lineCap = style
      },
      configurable: true
    },
    lineJoin: {
      get () { return this.ctx.lineJoin },
      set (style) {
        if (typeof style !== 'string') {
          throw new Error(`lineJoin is expecting a string, for example canvas.lineJoin = 'miter' but you passed a ${typeof style}`)
        }
        this.ctx.lineJoin = style
      },
      configurable: true
    },
    font: {
      get () { return this.ctx.font },
      set (str) {
        if (typeof str !== 'string') {
          throw new Error(`canvas.font is expecting a CSS font string, for example canvas.font = '16px sans-serif' but you passed a ${typeof str}`)
        }
        this.ctx.font = str
      },
      configurable: true
    },
    textAlign: {
      get () { return this.ctx.textAlign },
      set (align) {
        if (typeof align !== 'string') {
          throw new Error(`canvas.textAlign is expecting a string, for example canvas.textAlign = 'center' but you passed a ${typeof align}`)
        }
        this.ctx.textAlign = align
      },
      configurable: true
    },
    textBaseline: {
      get () { return this.ctx.textBaseline },
      set (baseline) {
        if (typeof baseline !== 'string') {
          throw new Error(`canvas.textBaseline is expecting a string, for example canvas.textBaseline = 'middle' but you passed a ${typeof baseline}`)
        }
        this.ctx.textBaseline = baseline
      },
      configurable: true
    },
    blendMode: {
      get () { return this.ctx.globalCompositeOperation },
      set (mode) {
        if (typeof mode !== 'string') {
          throw new Error(`canvas.blendMode expects a string, for example canvas.blendMode = 'multiply' but you passed ${typeof mode}`)
        }
        this.ctx.globalCompositeOperation = mode
      },
      configurable: true
    },
    // Canvas API parity aliases and additional context properties
    fillStyle: {
      get () { return this.ctx.fillStyle },
      set (val) { this.fillColor = val },
      configurable: true
    },
    strokeStyle: {
      get () { return this.ctx.strokeStyle },
      set (val) { this.strokeColor = val },
      configurable: true
    },
    globalAlpha: {
      get () { return this.ctx.globalAlpha },
      set (v) { if (typeof v !== 'number') throw new Error('canvas.globalAlpha must be a number'); this.ctx.globalAlpha = v },
      configurable: true
    },
    miterLimit: {
      get () { return this.ctx.miterLimit },
      set (v) { if (typeof v !== 'number') throw new Error('canvas.miterLimit must be a number'); this.ctx.miterLimit = v },
      configurable: true
    },
    shadowBlur: {
      get () { return this.ctx.shadowBlur },
      set (v) { if (typeof v !== 'number') throw new Error('canvas.shadowBlur must be a number'); this.ctx.shadowBlur = v },
      configurable: true
    },
    shadowColor: {
      get () { return this.ctx.shadowColor },
      set (v) { if (typeof v !== 'string') throw new Error('canvas.shadowColor must be a string'); this.ctx.shadowColor = v },
      configurable: true
    },
    shadowOffsetX: {
      get () { return this.ctx.shadowOffsetX },
      set (v) { if (typeof v !== 'number') throw new Error('canvas.shadowOffsetX must be a number'); this.ctx.shadowOffsetX = v },
      configurable: true
    },
    shadowOffsetY: {
      get () { return this.ctx.shadowOffsetY },
      set (v) { if (typeof v !== 'number') throw new Error('canvas.shadowOffsetY must be a number'); this.ctx.shadowOffsetY = v },
      configurable: true
    },
    imageSmoothingEnabled: {
      get () { return this.ctx.imageSmoothingEnabled },
      set (v) { this.ctx.imageSmoothingEnabled = !!v },
      configurable: true
    },
    imageSmoothingQuality: {
      get () { return this.ctx.imageSmoothingQuality },
      set (v) { this.ctx.imageSmoothingQuality = v },
      configurable: true
    },
    lineDashOffset: {
      get () { return this.ctx.lineDashOffset },
      set (v) { if (typeof v !== 'number') throw new Error('canvas.lineDashOffset must be a number'); this.ctx.lineDashOffset = v },
      configurable: true
    },
    direction: {
      get () { return this.ctx.direction },
      set (v) { this.ctx.direction = v },
      configurable: true
    },
    globalCompositeOperation: {
      get () { return this.ctx.globalCompositeOperation },
      set (v) { this.blendMode = v },
      configurable: true
    },
    filter: {
      get () { return this.ctx.filter },
      set (v) { this.ctx.filter = v },
      configurable: true
    },
    // Experimental and extended text properties (proxy if available; otherwise store locally)
    fontKerning: {
      get () { return (typeof this.ctx.fontKerning !== 'undefined') ? this.ctx.fontKerning : this.__nn_fontKerning },
      set (v) { if (typeof this.ctx.fontKerning !== 'undefined') this.ctx.fontKerning = v; else this.__nn_fontKerning = v },
      configurable: true
    },
    fontStretch: {
      get () { return (typeof this.ctx.fontStretch !== 'undefined') ? this.ctx.fontStretch : this.__nn_fontStretch },
      set (v) { if (typeof this.ctx.fontStretch !== 'undefined') this.ctx.fontStretch = v; else this.__nn_fontStretch = v },
      configurable: true
    },
    fontVariantCaps: {
      get () { return (typeof this.ctx.fontVariantCaps !== 'undefined') ? this.ctx.fontVariantCaps : this.__nn_fontVariantCaps },
      set (v) { if (typeof this.ctx.fontVariantCaps !== 'undefined') this.ctx.fontVariantCaps = v; else this.__nn_fontVariantCaps = v },
      configurable: true
    },
    letterSpacing: {
      get () { return (typeof this.ctx.letterSpacing !== 'undefined') ? this.ctx.letterSpacing : this.__nn_letterSpacing },
      set (v) { if (typeof this.ctx.letterSpacing !== 'undefined') this.ctx.letterSpacing = v; else this.__nn_letterSpacing = v },
      configurable: true
    },
    textRendering: {
      get () { return (typeof this.ctx.textRendering !== 'undefined') ? this.ctx.textRendering : this.__nn_textRendering },
      set (v) { if (typeof this.ctx.textRendering !== 'undefined') this.ctx.textRendering = v; else this.__nn_textRendering = v },
      configurable: true
    },
    wordSpacing: {
      get () { return (typeof this.ctx.wordSpacing !== 'undefined') ? this.ctx.wordSpacing : this.__nn_wordSpacing },
      set (v) { if (typeof this.ctx.wordSpacing !== 'undefined') this.ctx.wordSpacing = v; else this.__nn_wordSpacing = v },
      configurable: true
    }
  })

  // helpers
  ele.size = function (width, height) {
    if (typeof width !== 'number' || typeof height !== 'number') {
      throw new Error(`canvas.size() expects two numbers, for example canvas.size(640, 480) but you passed ${typeof width} and ${typeof height}`)
    }
    const oldCanvas = document.createElement('canvas')
    oldCanvas.width = this.width
    oldCanvas.height = this.height
    oldCanvas.getContext('2d').drawImage(this, 0, 0)
    // preserve context state
    const dash = this.ctx.getLineDash ? this.ctx.getLineDash() : []
    const matrix = this.ctx.getTransform ? this.ctx.getTransform() : null
    const props = {
      fillColor: this.fillColor,
      strokeColor: this.strokeColor,
      lineWidth: this.lineWidth,
      lineCap: this.lineCap,
      lineJoin: this.lineJoin,
      font: this.font,
      textAlign: this.textAlign,
      textBaseline: this.textBaseline,
      blendMode: this.blendMode,
      filter: this.ctx.filter,
      globalAlpha: typeof this.ctx.globalAlpha === 'number' ? this.ctx.globalAlpha : undefined,
      miterLimit: typeof this.ctx.miterLimit === 'number' ? this.ctx.miterLimit : undefined,
      shadowBlur: this.ctx.shadowBlur,
      shadowColor: this.ctx.shadowColor,
      shadowOffsetX: this.ctx.shadowOffsetX,
      shadowOffsetY: this.ctx.shadowOffsetY,
      imageSmoothingEnabled: this.ctx.imageSmoothingEnabled,
      imageSmoothingQuality: this.ctx.imageSmoothingQuality,
      lineDashOffset: this.ctx.lineDashOffset
    }
    this.width = width
    this.height = height
    this.fillColor = props.fillColor
    this.strokeColor = props.strokeColor
    this.lineWidth = props.lineWidth
    this.lineCap = props.lineCap
    this.lineJoin = props.lineJoin
    this.font = props.font
    this.textAlign = props.textAlign
    this.textBaseline = props.textBaseline
    this.blendMode = props.blendMode
    this.ctx.filter = props.filter
    if (typeof props.globalAlpha === 'number') this.ctx.globalAlpha = props.globalAlpha
    if (typeof props.miterLimit === 'number') this.ctx.miterLimit = props.miterLimit
    this.ctx.shadowBlur = props.shadowBlur
    this.ctx.shadowColor = props.shadowColor
    this.ctx.shadowOffsetX = props.shadowOffsetX
    this.ctx.shadowOffsetY = props.shadowOffsetY
    if (typeof props.imageSmoothingEnabled !== 'undefined') this.ctx.imageSmoothingEnabled = props.imageSmoothingEnabled
    if (typeof props.imageSmoothingQuality !== 'undefined') this.ctx.imageSmoothingQuality = props.imageSmoothingQuality
    if (typeof props.lineDashOffset === 'number') this.ctx.lineDashOffset = props.lineDashOffset
    if (this.ctx.setLineDash && Array.isArray(dash)) this.ctx.setLineDash(dash)
    if (matrix && this.ctx.setTransform) this.ctx.setTransform(matrix)
    this.ctx.drawImage(oldCanvas, 0, 0)
    return this
  }

  ele.resize = ele.size

  ele.getPixelData = function (x = 0, y = 0, w, h) {
    if (typeof x !== 'number' || typeof y !== 'number') {
      throw new Error('canvas.getPixelData() x and y must be numbers, for example canvas.getPixelData(0, 0)')
    }
    w = w || this.width
    h = h || this.height
    if (typeof w !== 'number' || typeof h !== 'number') {
      throw new Error('canvas.getPixelData() width and height must be numbers, for example canvas.getPixelData(0, 0, 100, 100)')
    }
    const imageData = this.ctx.getImageData(x, y, w, h)
    return imageData.data
  }

  ele.getPixels = function (opts = {}) {
    const data = this.getPixelData()
    if (opts.raw) return data
    const pixels = []
    for (let i = 0; i < data.length; i += 4) {
      pixels.push({ r: data[i], g: data[i + 1], b: data[i + 2], a: data[i + 3] })
    }
    return pixels
  }

  ele.setPixels = function (pixels, x = 0, y = 0, w, h) {
    const isRaw = pixels instanceof window.Uint8ClampedArray ||
      (Array.isArray(pixels) && typeof pixels[0] === 'number')
    if (!isRaw && !Array.isArray(pixels)) {
      throw new Error(`canvas.setPixels() expects an array of pixel objects or a Uint8ClampedArray, but you passed a ${typeof pixels}`)
    }
    w = w || this.width
    h = h || this.height
    if (typeof x !== 'number' || typeof y !== 'number' || typeof w !== 'number' || typeof h !== 'number') {
      throw new Error('canvas.setPixels() x, y, width, height must be numbers, for example canvas.setPixels(pixels, 0, 0, 100, 100)')
    }
    const imageData = this.ctx.getImageData(x, y, w, h)
    const data = imageData.data
    if (isRaw) {
      if (pixels.length !== data.length) {
        throw new Error(`canvas.setPixels() raw array length (${pixels.length}) does not match canvas pixel data length (${data.length})`)
      }
      for (let i = 0; i < data.length; i++) data[i] = pixels[i]
    } else {
      for (let i = 0; i < data.length; i += 4) {
        const idx = i / 4
        const px = pixels[idx]
        if (!px || typeof px.r !== 'number' || typeof px.g !== 'number' || typeof px.b !== 'number' || typeof px.a !== 'number') {
          throw new Error(`canvas.setPixels() pixel at index ${idx} is invalid; each pixel needs numeric r, g, b, a properties`)
        }
        data[i] = px.r; data[i + 1] = px.g; data[i + 2] = px.b; data[i + 3] = px.a
      }
    }
    this.ctx.putImageData(imageData, x, y)
    return this
  }

  ele.clear = function (x, y, w, h) {
    if (arguments.length === 0) {
      this.ctx.clearRect(0, 0, this.width, this.height)
    } else if ([x, y, w, h].some(v => typeof v !== 'number')) {
      throw new Error('canvas.clear() expects numbers, for example canvas.clear(50, 50, 25, 15)')
    } else {
      this.ctx.clearRect(x, y, w, h)
    }
    return this
  }

  ele.ellipse = function (x, y, w, h) {
    if ([x, y, w].some(v => typeof v !== 'number')) {
      throw new Error('canvas.ellipse() expects numbers, for example canvas.ellipse(50, 50, 25, 15)')
    }
    this.ctx.beginPath()
    this.ctx.ellipse(x, y, w, h || w, 0, 2 * Math.PI, false)
    this.ctx.closePath()
    this.ctx.fill()
    this.ctx.stroke()
    return this
  }

  // Path-only parity versions (do not fill/stroke/begin/close)
  ele.pathRect = function (x, y, w, h) { this.ctx.rect(x, y, w, h); return this }
  ele.pathEllipse = function (x, y, rx, ry, rotation = 0, startAngle = 0, endAngle = 2 * Math.PI, counterclockwise = false) {
    // match CanvasRenderingContext2D.ellipse signature
    this.ctx.ellipse(x, y, rx, ry, rotation, startAngle, endAngle, counterclockwise); return this
  }

  ele.circle = function (x, y, s) {
    if ([x, y, s].some(v => typeof v !== 'number')) {
      throw new Error('canvas.circle() expects numbers, for example canvas.circle(50, 50, 100)')
    }
    return this.ellipse(x, y, s, s)
  }

  ele.rect = function (x, y, w, h) {
    if ([x, y, w].some(v => typeof v !== 'number')) {
      throw new Error('canvas.rect() expects numbers, for example canvas.rect(10, 10, 100, 50)')
    }
    if (typeof h !== 'number') h = w
    this.ctx.beginPath()
    this.ctx.rect(x, y, w, h)
    this.ctx.closePath()
    this.ctx.fill()
    this.ctx.stroke()
    return this
  }

  ele.line = function (x1, y1, x2, y2) {
    if ([x1, y1, x2, y2].some(v => typeof v !== 'number')) {
      throw new Error('canvas.line() expects numbers, for example canvas.line(0, 0, 100, 100)')
    }
    this.ctx.beginPath()
    this.ctx.moveTo(x1, y1)
    this.ctx.lineTo(x2, y2)
    this.ctx.stroke()
    return this
  }

  ele.triangle = function (x1, y1, x2, y2, x3, y3) {
    if ([x1, y1, x2, y2, x3, y3].some(v => typeof v !== 'number')) {
      throw new Error('canvas.triangle() expects numbers, for example canvas.triangle(0,0, 50,100, 100,0)')
    }
    this.ctx.beginPath()
    this.ctx.moveTo(x1, y1)
    this.ctx.lineTo(x2, y2)
    this.ctx.lineTo(x3, y3)
    this.ctx.closePath()
    this.ctx.fill()
    this.ctx.stroke()
    return this
  }

  ele.text = function (str, x, y, type) {
    if (typeof str !== 'string') {
      throw new Error('canvas.text() expects first argument to be a string, for example canvas.text("hello", 10, 20)')
    }
    if (typeof x !== 'number' || typeof y !== 'number') {
      throw new Error('canvas.text() x and y must be numbers, for example canvas.text("hello", 10, 20)')
    }
    type = type || 'fill'
    if (type !== 'fill' && type !== 'stroke') {
      throw new Error(`canvas.text() type must be 'fill' or 'stroke', but you passed '${type}'`)
    }
    if (type === 'stroke') this.ctx.strokeText(str, x, y)
    else this.ctx.fillText(str, x, y)
    return this
  }

  // Common context passthroughs (chainable), preserving Canvas API names
  ele.drawImage = function (imgOrSrc, ...rest) {
    const draw = (img) => {
      // Adjust zero destination sizes to natural sizes
      const natW = img.naturalWidth || img.videoWidth || img.width
      const natH = img.naturalHeight || img.videoHeight || img.height
      if (rest.length === 4) { // dx, dy, dw, dh
        if (!rest[2]) rest[2] = natW
        if (!rest[3]) rest[3] = natH
      } else if (rest.length === 8) { // sx, sy, sw, sh, dx, dy, dw, dh
        if (!rest[6]) rest[6] = rest[2] || natW
        if (!rest[7]) rest[7] = rest[3] || natH
      }
      // Ensure canvas has non-zero buffer if needed
      let destW, destH
      if (rest.length === 2) { destW = natW; destH = natH }
      else if (rest.length === 4) { destW = rest[2]; destH = rest[3] }
      else if (rest.length === 8) { destW = rest[6]; destH = rest[7] }
      if ((this.width === 0 || this.height === 0) && destW && destH) {
        this.width = destW; this.height = destH
      }
      this.ctx.drawImage(img, ...rest)
      return this
    }

    // Support passing a URL string: auto-create & load an Image
    if (typeof imgOrSrc === 'string') {
      const img = new Image()
      img.onload = () => draw(img)
      img.src = imgOrSrc
      return this
    }

    // If an HTMLImageElement that isn't loaded yet, wait for load
    if (imgOrSrc instanceof window.HTMLImageElement && (!imgOrSrc.complete || (imgOrSrc.naturalWidth + imgOrSrc.naturalHeight === 0))) {
      imgOrSrc.addEventListener('load', () => draw(imgOrSrc), { once: true })
      return this
    }

    // Media/video or already-loaded image
    return draw(imgOrSrc)
  }
  ele.fillRect = function (x, y, w, h) { this.ctx.fillRect(x, y, w, h); return this }
  ele.strokeRect = function (x, y, w, h) { this.ctx.strokeRect(x, y, w, h); return this }
  ele.clearRect = function (x, y, w, h) { this.ctx.clearRect(x, y, w, h); return this }
  ele.beginPath = function () { this.ctx.beginPath(); return this }
  ele.closePath = function () { this.ctx.closePath(); return this }
  ele.moveTo = function (x, y) { this.ctx.moveTo(x, y); return this }
  ele.lineTo = function (x, y) { this.ctx.lineTo(x, y); return this }
  ele.bezierCurveTo = function (...args) { this.ctx.bezierCurveTo(...args); return this }
  ele.quadraticCurveTo = function (...args) { this.ctx.quadraticCurveTo(...args); return this }
  ele.arc = function (...args) { this.ctx.arc(...args); return this }
  ele.arcTo = function (...args) { this.ctx.arcTo(...args); return this }
  ele.clip = function (...args) { this.ctx.clip(...args); return this }
  ele.fill = function (...args) { this.ctx.fill(...args); return this }
  ele.stroke = function (...args) { this.ctx.stroke(...args); return this }
  ele.resetTransform = function () { if (this.ctx.resetTransform) this.ctx.resetTransform(); else this.ctx.setTransform(1, 0, 0, 1, 0, 0); return this }
  ele.setLineDash = function (arr) { if (!Array.isArray(arr)) throw new Error('setLineDash expects an array'); if (this.ctx.setLineDash) this.ctx.setLineDash(arr); return this }
  ele.getLineDash = function () { return this.ctx.getLineDash ? this.ctx.getLineDash() : [] }
  ele.measureText = function (text) { return this.ctx.measureText(text) }
  ele.fillText = function (text, x, y, maxWidth) { this.ctx.fillText(text, x, y, maxWidth); return this }
  ele.strokeText = function (text, x, y, maxWidth) { this.ctx.strokeText(text, x, y, maxWidth); return this }
  ele.createLinearGradient = function (...args) { return this.ctx.createLinearGradient(...args) }
  ele.createRadialGradient = function (...args) { return this.ctx.createRadialGradient(...args) }
  ele.createConicGradient = function (...args) { if (!this.ctx.createConicGradient) throw new Error('createConicGradient is not supported'); return this.ctx.createConicGradient(...args) }
  ele.createPattern = function (...args) { return this.ctx.createPattern(...args) }
  ele.createImageData = function (...args) { return this.ctx.createImageData(...args) }
  ele.getImageData = function (...args) { return this.ctx.getImageData(...args) }
  ele.putImageData = function (...args) { this.ctx.putImageData(...args); return this }
  ele.getTransform = function () { return this.ctx.getTransform ? this.ctx.getTransform() : undefined }
  ele.isPointInPath = function (...args) { return this.ctx.isPointInPath(...args) }
  ele.isPointInStroke = function (...args) { return this.ctx.isPointInStroke(...args) }
  ele.isContextLost = function () { return this.ctx.isContextLost ? this.ctx.isContextLost() : false }
  ele.getContextAttributes = function () { return this.ctx.getContextAttributes ? this.ctx.getContextAttributes() : undefined }
  ele.reset = function () { if (this.ctx.reset) this.ctx.reset(); else this.ctx.setTransform(1, 0, 0, 1, 0, 0); return this }
  ele.roundRect = function (...args) {
    if (this.ctx.roundRect) { this.ctx.roundRect(...args); return this }
    const [x, y, w, h, r] = args
    const radius = Math.max(0, Math.min(w, h, typeof r === 'number' ? r : 0))
    this.beginPath()
      .moveTo(x + radius, y)
      .lineTo(x + w - radius, y)
      .arc(x + w - radius, y + radius, radius, -Math.PI / 2, 0)
      .lineTo(x + w, y + h - radius)
      .arc(x + w - radius, y + h - radius, radius, 0, Math.PI / 2)
      .lineTo(x + radius, y + h)
      .arc(x + radius, y + h - radius, radius, Math.PI / 2, Math.PI)
      .lineTo(x, y + radius)
      .arc(x + radius, y + radius, radius, Math.PI, 1.5 * Math.PI)
    return this
  }
  ele.drawFocusIfNeeded = function (...args) { if (this.ctx.drawFocusIfNeeded) this.ctx.drawFocusIfNeeded(...args); return this }

  // Canvas transform API parity (override CSS transform helpers for canvas)
  ele.scale = function (x, y) { if (typeof x !== 'number') throw new Error('scale() expects numbers'); this.ctx.scale(x, (typeof y === 'number') ? y : x); return this }
  ele.rotate = function (angle) { if (typeof angle !== 'number') throw new Error('rotate() expects a number in radians'); this.ctx.rotate(angle); return this }
  // HTMLElement has a native .translate accessor (for i18n), so a plain
  // assignment is swallowed by its setter — use defineProperty to override it.
  Object.defineProperty(ele, 'translate', {
    value: function (x, y) {
      if (typeof x !== 'number' || typeof y !== 'number') throw new Error('translate() expects two numbers')
      this.ctx.translate(x, y)
      return this
    },
    writable: true,
    configurable: true
  })
  ele.transform = function (m11, m12, m21, m22, dx, dy) { if ([m11, m12, m21, m22, dx, dy].some(v => typeof v !== 'number')) throw new Error('transform() expects six numbers'); this.ctx.transform(m11, m12, m21, m22, dx, dy); return this }
  ele.setTransform = function (m11, m12, m21, m22, dx, dy) { if ([m11, m12, m21, m22, dx, dy].some(v => typeof v !== 'number')) throw new Error('setTransform() expects six numbers'); this.ctx.setTransform(m11, m12, m21, m22, dx, dy); return this }

  ele.save = function () {
    if (arguments.length) throw new Error('canvas.save() does not take any arguments')
    this.ctx.save(); return this
  }
  ele.restore = function () {
    if (arguments.length) throw new Error('canvas.restore() does not take any arguments')
    this.ctx.restore(); return this
  }

  return ele
}

if (typeof module !== 'undefined') module.exports = { augment: augmentCanvas }
else window.NNCanvas = { augment: augmentCanvas }

},{}],8:[function(require,module,exports){
// Shared helper for smart CSS url() value resolution.
// Used by both dom.js and svg.js .css() methods.
//
// Allows beginner-friendly shorthands like:
//   .css('cursor', '💿')        → SVG data URL cursor (32×32)
//   .css('cursor', 'cat.png')   → url('cat.png'), auto
//   .css('background-image', '★') → scalable SVG data URL
//   .css('background-image', 'bg.jpg') → url('bg.jpg')

// CSS properties that exclusively (or near-exclusively) accept url()/image values.
// Shorthands like 'background' and 'mask' are intentionally excluded — they also
// accept colors, gradients, positions, etc., making them too ambiguous to transform.
const URL_PROPS = new Set([
  'cursor',
  'background-image', 'backgroundImage',
  'border-image-source', 'borderImageSource',
  'list-style-image', 'listStyleImage',
  'mask-image', 'maskImage'
])

// Known CSS cursor keywords — pass through unchanged
const CURSOR_KEYWORDS = new Set([
  'auto', 'default', 'none', 'pointer', 'crosshair', 'text', 'vertical-text',
  'alias', 'copy', 'move', 'no-drop', 'not-allowed', 'grab', 'grabbing',
  'e-resize', 'n-resize', 'ne-resize', 'nw-resize', 's-resize', 'se-resize',
  'sw-resize', 'w-resize', 'ew-resize', 'ns-resize', 'nesw-resize',
  'nwse-resize', 'col-resize', 'row-resize', 'all-scroll', 'zoom-in',
  'zoom-out', 'cell', 'context-menu', 'help', 'progress', 'wait',
  'inherit', 'initial', 'unset', 'revert', 'revert-layer'
])

// General CSS-wide keywords that apply to any property
const GENERAL_KEYWORDS = new Set([
  'none', 'inherit', 'initial', 'unset', 'revert', 'revert-layer'
])

// Detects file paths / URLs that point to images
function looksLikeImagePath (val) {
  return /\.(png|jpe?g|gif|svg|webp|cur|ico|bmp|tiff?)(\?.*)?$/i.test(val.trim())
}

// Converts any text/emoji/unicode string into an SVG data URL.
// isCursor=true → fixed 32×32 (browser cursor size convention)
// isCursor=false → viewBox only, no intrinsic size (scales with CSS)
function textToSVGDataURL (text, isCursor) {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

  let svg
  if (isCursor) {
    svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">` +
          `<text x="16" y="16" font-size="24" text-anchor="middle" dominant-baseline="middle">${escaped}</text>` +
          `</svg>`
  } else {
    // No explicit width/height — SVG scales to fill whatever context it's placed in
    svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">` +
          `<text x="0.5" y="0.5" font-size="0.75" text-anchor="middle" dominant-baseline="middle">${escaped}</text>` +
          `</svg>`
  }

  return `url('data:image/svg+xml;utf8,${encodeURIComponent(svg)}')`
}

// Main resolver — call this inside .css() before assigning to element.style
// Returns the transformed CSS value string, or the original if no transform needed.
function smartCSSValue (prop, val) {
  if (typeof val !== 'string') return val
  const trimmed = val.trim()

  // Already a url() value — pass through
  if (trimmed.startsWith('url(')) return val

  // Any CSS function call (rgba(), linear-gradient(), hsl(), calc(), etc.) — pass through
  if (trimmed.includes('(')) return val

  // Only applies to url()-accepting properties
  if (!URL_PROPS.has(prop)) return val

  const isCursor = prop === 'cursor'
  const keywords = isCursor ? CURSOR_KEYWORDS : GENERAL_KEYWORDS

  // Known CSS keyword — pass through unchanged
  if (keywords.has(trimmed.toLowerCase())) return val

  // Looks like an image file path — wrap in url()
  if (looksLikeImagePath(trimmed)) {
    return isCursor
      ? `url('${trimmed}'), auto`
      : `url('${trimmed}')`
  }

  // Anything else (emoji, unicode char, text) — generate inline SVG data URL
  const dataUrl = textToSVGDataURL(trimmed, isCursor)
  return isCursor ? `${dataUrl}, auto` : dataUrl
}

if (typeof module !== 'undefined') module.exports = { smartCSSValue }
else window._nnCssUrlHelper = { smartCSSValue }

},{}],9:[function(require,module,exports){
// module-level private mouse state
let _mouseX = 0
let _mouseY = 0
let _mouseDown = false
let _trackingMouse = false

let _smartCSSValue
try { _smartCSSValue = require('./css-url-helper.js').smartCSSValue } catch (e) {
  _smartCSSValue = (window._nnCssUrlHelper || {}).smartCSSValue || ((prop, val) => val)
}

function _trackMouse () {
  window.addEventListener('mousemove', (e) => {
    _mouseX = e.clientX
    _mouseY = e.clientY
  })
  window.addEventListener('mousedown', () => { _mouseDown = true })
  window.addEventListener('mouseup', () => { _mouseDown = false })
  _trackingMouse = true
}

// module-level private pointer state
let _pointers = new Map() // pointerId → { x, y, id, type }
let _trackingPointers = false

function _trackPointers () {
  window.addEventListener('pointerdown', (e) => {
    _pointers.set(e.pointerId, { x: e.clientX, y: e.clientY, id: e.pointerId, type: e.pointerType })
  })
  window.addEventListener('pointermove', (e) => {
    if (_pointers.has(e.pointerId)) {
      _pointers.set(e.pointerId, { x: e.clientX, y: e.clientY, id: e.pointerId, type: e.pointerType })
    }
  })
  window.addEventListener('pointerup', (e) => { _pointers.delete(e.pointerId) })
  window.addEventListener('pointercancel', (e) => { _pointers.delete(e.pointerId) })
  _trackingPointers = true
}

class DOM {
  static on (event, callback, options) {
    const eve = [
      // lifecycle / navigation
      'afterprint', 'appinstalled', 'beforeinstallprompt', 'beforeprint', 'beforeunload', 'error', 'hashchange', 'languagechange', 'load', 'message', 'messageerror', 'offline', 'online', 'orientationchange', 'pagehide', 'pageshow', 'popstate', 'rejectionhandled', 'resize', 'scroll', 'storage', 'unhandledrejection', 'unload', 'visibilitychange',
      // focus
      'blur', 'focus',
      // keyboard
      'keydown', 'keypress', 'keyup',
      // mouse
      'click', 'contextmenu', 'dblclick', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'mousewheel', 'wheel',
      // touch
      'touchstart', 'touchend', 'touchmove', 'touchcancel',
      // pointer
      'pointerdown', 'pointerup', 'pointermove', 'pointerover', 'pointerout', 'pointerenter', 'pointerleave', 'pointercancel',
      // drag
      'drag', 'dragend', 'dragenter', 'dragleave', 'dragover', 'dragstart', 'drop',
      // clipboard
      'copy', 'cut', 'paste',
      // device
      'devicemotion', 'deviceorientation', 'deviceorientationabsolute',
      // gamepad
      'gamepadconnected', 'gamepaddisconnected',
      // animation / transition
      'animationstart', 'animationend', 'animationiteration', 'animationcancel', 'transitionstart', 'transitionend', 'transitioncancel', 'transitionrun',
      // fullscreen
      'fullscreenchange', 'fullscreenerror'
    ]
    if (typeof event !== 'string') {
      console.error('( ◕ ◞ ◕ ) nn: the first argument to the .on() method should be an event type written as a string')
    } else if (typeof callback !== 'function') {
      console.error('( ◕ ◞ ◕ ) nn: the second argument to the .on() method should be a function you want to call "on" that event')
    }
    if (DOM._preMouseHook && DOM._mouseEvents.has(event)) {
      DOM._preMouseHook()
      DOM._preMouseHook = null
    }
    if (DOM._prePointerHook && DOM._pointerEvents.has(event)) {
      DOM._prePointerHook()
      DOM._prePointerHook = null
    }
    window.addEventListener(event, callback, options)
    if (!eve.includes(event)) console.warn(`( ◕ ◞ ◕ ) nn: you might want to make sure that '${event}' is a valid window event type`)
  }

  static off (event, callback, options) {
    const eve = [
      'afterprint', 'appinstalled', 'beforeinstallprompt', 'beforeprint', 'beforeunload', 'error', 'hashchange', 'languagechange', 'load', 'message', 'messageerror', 'offline', 'online', 'orientationchange', 'pagehide', 'pageshow', 'popstate', 'rejectionhandled', 'resize', 'scroll', 'storage', 'unhandledrejection', 'unload', 'visibilitychange',
      'blur', 'focus',
      'keydown', 'keypress', 'keyup',
      'click', 'contextmenu', 'dblclick', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'mousewheel', 'wheel',
      'touchstart', 'touchend', 'touchmove', 'touchcancel',
      'pointerdown', 'pointerup', 'pointermove', 'pointerover', 'pointerout', 'pointerenter', 'pointerleave', 'pointercancel',
      'drag', 'dragend', 'dragenter', 'dragleave', 'dragover', 'dragstart', 'drop',
      'copy', 'cut', 'paste',
      'devicemotion', 'deviceorientation', 'deviceorientationabsolute',
      'gamepadconnected', 'gamepaddisconnected',
      'animationstart', 'animationend', 'animationiteration', 'animationcancel', 'transitionstart', 'transitionend', 'transitioncancel', 'transitionrun',
      'fullscreenchange', 'fullscreenerror'
    ]
    if (typeof event !== 'string') {
      console.error('( ◕ ◞ ◕ ) nn: the first argument to the .off() method should be an event type written as a string')
    } else if (typeof callback !== 'function') {
      console.error('( ◕ ◞ ◕ ) nn: the second argument to the .off() method should be the same function reference previously passed to .on()')
    }
    const capture = (typeof options === 'boolean') ? options : (options && typeof options === 'object' && options.capture === true)
    window.removeEventListener(event, callback, capture)
    if (!eve.includes(event)) console.warn(`( ◕ ◞ ◕ ) nn: you might want to make sure that '${event}' is a valid window event type`)
  }

  static create (type) {
    const eles = ['html', 'base', 'head', 'link', 'meta', 'style', 'title', 'body', 'address', 'article', 'aside', 'footer', 'header', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hgroup', 'main', 'nav', 'section', 'blockquote', 'dd', 'div', 'dl', 'dt', 'figcaption', 'figure', 'hr', 'li', 'ol', 'p', 'pre', 'ul', 'a', 'abbr', 'b', 'bdi', 'bdo', 'br', 'cite', 'code', 'data', 'dfn', 'em', 'i', 'kbd', 'mark', 'q', 'rb', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'small', 'span', 'strong', 'sub', 'sup', 'time', 'u', 'var', 'wbr', 'area', 'audio', 'img', 'map', 'track', 'video', 'embed', 'iframe', 'object', 'param', 'picture', 'source', 'svg', 'math', 'canvas', 'noscript', 'script', 'del', 'ins', 'caption', 'col', 'colgroup', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'button', 'datalist', 'fieldset', 'form', 'input', 'label', 'legend', 'meter', 'optgroup', 'option', 'output', 'progress', 'select', 'textarea', 'details', 'dialog', 'menu', 'summary', 'slot', 'template', 'acronym', 'applet', 'basefont', 'bgsound', 'big', 'blink', 'center', 'command', 'content', 'dir', 'element', 'font', 'frame', 'frameset', 'image', 'isindex', 'keygen', 'listing', 'marquee', 'menuitem', 'multicol', 'nextid', 'nobr', 'noembed', 'noframes', 'plaintext', 'shadow', 'spacer', 'strike', 'tt', 'xmp']
    const svgEles = ['svg', 'circle', 'ellipse', 'path', 'line', 'polyline', 'polygon', 'rect', 'text', 'tspan', 'g', 'defs', 'use', 'symbol', 'linearGradient', 'radialGradient', 'stop', 'clipPath', 'mask', 'animate', 'animateTransform', 'animateMotion']
    if (svgEles.includes(type)) {
      const ele = document.createElementNS('http://www.w3.org/2000/svg', type)
      if (type === 'svg') ele.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
      return this.get(ele)
    }
    if (!eles.includes(type)) console.warn(`( ◕ ◞ ◕ ) nn: are you sure that '${type}' is a valid HTMLElement?`)
    const ele = document.createElement(type)
    return this.get(ele)
  }

  static getAll (query) {
    const arr = []
    const eles = document.querySelectorAll(query)
    eles.forEach(ele => arr.push(this.get(ele)))
    return arr
  }

  static get (query) {
    const eve = [
      // mouse
      'click', 'dblclick', 'contextmenu', 'mousedown', 'mouseup', 'mousemove', 'mouseover', 'mouseout', 'mouseenter', 'mouseleave', 'mousewheel',
      // keyboard
      'keydown', 'keypress', 'keyup',
      // focus
      'focus', 'blur', 'focusin', 'focusout',
      // input / form
      'input', 'change', 'submit', 'reset', 'select', 'invalid',
      // clipboard
      'copy', 'cut', 'paste',
      // drag
      'drag', 'dragend', 'dragenter', 'dragleave', 'dragover', 'dragstart', 'drop',
      // scroll / wheel
      'scroll', 'wheel',
      // touch
      'touchstart', 'touchend', 'touchmove', 'touchcancel',
      // pointer
      'pointerdown', 'pointerup', 'pointermove', 'pointerover', 'pointerout', 'pointerenter', 'pointerleave', 'pointercancel',
      // animation / transition
      'animationstart', 'animationend', 'animationiteration', 'animationcancel', 'transitionstart', 'transitionend', 'transitioncancel', 'transitionrun',
      // resource
      'load', 'error', 'abort',
      // misc
      'resize', 'readystatechange', 'selectstart', 'fullscreenchange', 'fullscreenerror'
    ]
    const mev = ['abort', 'canplay', 'canplaythrough', 'durationchange', 'emptied', 'encrypted', 'ended', 'error', 'loadeddata', 'loadedmetadata', 'loadstart', 'pause', 'play', 'playing', 'progress', 'ratechange', 'seeked', 'seeking', 'stalled', 'suspend', 'timeupdate', 'volumechange', 'waiting']

    const ele = (query instanceof window.HTMLElement || query instanceof window.SVGElement || query instanceof window.Element) ? query : document.querySelector(query)

    if (typeof query === 'string' && !ele) {
      console.warn(`( ◕ ◞ ◕ ) nn.get: couldn't find an HTML element matching the CSS selector query "${query}"`)
      return undefined
    } else if (!ele) {
      return undefined
    }

    ele.on = function (event, callback, options) {
      if (typeof event !== 'string') {
        console.error('( ◕ ◞ ◕ ) nn: the first argument to the .on() method should be an event type written as a string')
      } else if (typeof callback !== 'function') {
        console.error('( ◕ ◞ ◕ ) nn: the second argument to the .on() method should be a function you want to call "on" that event')
      }
      if (!this.__nn_listeners) this.__nn_listeners = {}
      if (!this.__nn_listeners[event]) this.__nn_listeners[event] = new Map()
      const self = this
      const wrapped = function (e) { return callback.call(self, e) }
      const capture = (typeof options === 'boolean') ? options : (options && typeof options === 'object' && options.capture === true)
      this.addEventListener(event, wrapped, options)
      this.__nn_listeners[event].set(callback, { wrapped, capture })
      const es = (this instanceof window.HTMLMediaElement) ? [...eve, ...mev] : eve
      if (!es.includes(event)) console.warn(`( ◕ ◞ ◕ ) nn: you might want to make sure that this element has a '${event}' event type`)
      return this
    }

    ele.off = function (event, callback, options) {
      if (typeof event !== 'string') {
        console.error('( ◕ ◞ ◕ ) nn: the first argument to the .off() method should be an event type written as a string')
      } else if (typeof callback !== 'function') {
        console.error('( ◕ ◞ ◕ ) nn: the second argument to the .off() method should be the same function reference previously passed to .on()')
      }
      let fn = callback
      let capture
      if (this.__nn_listeners && this.__nn_listeners[event]) {
        const entry = this.__nn_listeners[event].get(callback)
        if (entry) {
          fn = entry.wrapped
          capture = entry.capture
          this.__nn_listeners[event].delete(callback)
        }
      }
      if (typeof capture === 'undefined') {
        capture = (typeof options === 'boolean') ? options : (options && typeof options === 'object' && options.capture === true)
      }
      this.removeEventListener(event, fn, capture)
      const es = (this instanceof window.HTMLMediaElement) ? [...eve, ...mev] : eve
      if (!es.includes(event)) console.warn(`( ◕ ◞ ◕ ) nn: you might want to make sure that this element has a '${event}' event type`)
      return this
    }

    ele.content = function (c) {
      if (typeof c !== 'string' && typeof c !== 'number' && c !== null && c !== undefined) {
        console.error('( ◕ ◞ ◕ ) nn: the .content() method is expecting a string, number, or null')
      }
      this.innerHTML = c
      return this
    }

    // Scoped selectors: search only within this element
    // so we can do things like: nn.get('#sec').get('img')
    // or: const x = nn.get('#sec'); x.get('img')
    ele.get = function (query) {
      let found
      if (typeof query === 'string') {
        found = this.querySelector(query)
        if (!found) {
          console.warn(`( ◕ ◞ ◕ ) nn.get: couldn't find an HTML element matching the CSS selector query "${query}" within this element`)
          return undefined
        }
        return DOM.get(found)
      } else if (query instanceof window.HTMLElement) {
        if (!this.contains(query)) {
          console.error('( ◕ ◞ ◕ ) nn: the element you passed to .get() is not a descendant of this element')
          return undefined
        }
        return DOM.get(query)
      } else {
        console.error('( ◕ ◞ ◕ ) nn: the .get() method expects either a CSS query selector string or an HTMLElement')
        return undefined
      }
    }

    ele.getAll = function (query) {
      if (typeof query !== 'string') {
        console.error('( ◕ ◞ ◕ ) nn: the .getAll() method expects a CSS query selector string')
        return []
      }
      const arr = []
      this.querySelectorAll(query).forEach(el => arr.push(DOM.get(el)))
      return arr
    }

    ele.addTo = function (parent) {
      if (typeof parent !== 'string' && !(parent instanceof window.HTMLElement) && !(parent instanceof window.SVGElement)) {
        console.error('( ◕ ◞ ◕ ) nn: the .addTo() method expects either a CSS query selector string or an HTMLElement')
      }
      if (this.parentNode) this.remove()
      if (parent instanceof window.HTMLElement || parent instanceof window.SVGElement) parent.appendChild(this)
      else document.querySelector(parent).appendChild(this)
      return this
    }

    ele.set = function (obj, val) {
      const setAttr = (prop, val) => {
        if (prop === 'stream') {
          if (!(val instanceof window.MediaStream)) {
            console.error('( ◕ ◞ ◕ ) nn: when passing a "stream" property to .set() the value should a "Promise" which will resolve to a MediaStream object.')
          }
          ele.srcObject = val
        } else if (prop === 'options' && val instanceof Array && ele.tagName.toLocaleLowerCase() === 'select') {
          val.forEach(v => {
            const o = document.createElement('option')
            o.textContent = v
            o.setAttribute('value', v)
            ele.appendChild(o)
          })
        } else {
          ele.setAttribute(prop, val)
        }
      }

      if (typeof obj === 'string' && val === undefined && obj.startsWith('.')) {
        // shorthand: .set('.foo') or .set('.foo.bar') → sets className
        const classes = obj.slice(1).split('.').filter(c => c.length > 0)
        if (classes.length === 0) {
          console.error('( ◕ ◞ ◕ ) nn: .set(\'.\') is missing a class name, try something like .set(\'.my-class\')')
        } else {
          this.className = classes.join(' ')
        }
      } else if (typeof obj === 'string' && val === undefined && obj.startsWith('#')) {
        // shorthand: .set('#my-id') → sets id
        const id = obj.slice(1)
        if (id.length === 0) {
          console.error('( ◕ ◞ ◕ ) nn: .set(\'#\') is missing an id, try something like .set(\'#my-id\')')
        } else {
          this.id = id
        }
      } else if (typeof obj === 'string' && typeof val !== 'undefined') {
        setAttr(obj, val)
      } else if (typeof obj === 'object' && !val) {
        for (const prop in obj) {
          const val = obj[prop]
          setAttr(prop, val)
        }
      } else {
        console.error('( ◕ ◞ ◕ ) nn: the .set() method expects two arguments, an HTML attribute and value, or an object of HTML attributes and values')
      }
      return this
    }

    ele.css = function (obj, val) {
      if (typeof obj === 'string' && typeof val !== 'undefined') {
        const prop = obj; obj = {}; obj[prop] = val
      } else if (typeof obj !== 'object') {
        console.error('( ◕ ◞ ◕ ) nn: the .css() method expects two arguments, a CSS property and value, or an object of CSS properties and values')
      }

      for (const prop in obj) {
        const val = obj[prop]
        const cssVal = typeof val === 'string' ? _smartCSSValue(prop, val) : val
        const rightValueType = typeof cssVal === 'string' || typeof cssVal === 'number'
        if (!rightValueType) {
          console.error('( ◕ ◞ ◕ ) nn: the CSS values in the object passed to .css() should be strings or a numbers')
        } else if (typeof cssVal === 'string') {
          this.style[prop] = cssVal
        } else if (typeof cssVal === 'number') {
          const before = this.style[prop]
          this.style[prop] = cssVal
          if (this.style[prop] === '' || before === this.style[prop]) {
            this.style[prop] = cssVal + 'px'
          }
        }

        if (rightValueType && this.style[prop] === '') {
          console.error(`( ◕ ◞ ◕ ) nn: "${val}" is not a valid value for the "${prop}" property in CSS`)
        }
      }
      return this
    }

    ele.transition = function (prop, ms) {
      const toKebab = (s) => s.replace(/([A-Z])/g, m => '-' + m.toLowerCase())
      if (typeof prop === 'string' && (typeof ms === 'number' || typeof ms === 'string')) {
        const dur = typeof ms === 'number' ? `${ms}ms` : ms
        this.style.transition = `${toKebab(prop)} ${dur}`
      } else if (typeof prop === 'object' && prop !== null) {
        this.style.transition = Object.entries(prop)
          .map(([p, v]) => `${toKebab(p)} ${typeof v === 'number' ? `${v}ms` : v}`)
          .join(', ')
      } else {
        console.error('( ◕ ◞ ◕ ) nn: .transition() expects a property name and duration, or an object of property/duration pairs')
      }
      return this
    }

    // Special methods for specific CSS Functions
    // -------------------------------------------------
    function setFilterPart (el, fnName, value) {
      const regex = new RegExp(`${fnName}\\([^)]*\\)`)
      let filter = el.style.filter || ''
      if (regex.test(filter)) {
        filter = filter.replace(regex, `${fnName}(${value})`)
      } else {
        filter += ` ${fnName}(${value})`
      }
      el.style.filter = filter.trim()
    }

    ele.blur = function (px = 0) {
      setFilterPart(this, 'blur', `${px}px`)
      return this
    }

    ele.brightness = function (val = 1) {
      setFilterPart(this, 'brightness', val)
      return this
    }

    ele.contrast = function (val = 1) {
      setFilterPart(this, 'contrast', val)
      return this
    }

    ele.dropShadow = function (x = 0, y = 0, blur = 0, color = 'black') {
      setFilterPart(this, 'drop-shadow', `${x}px ${y}px ${blur}px ${color}`)
      return this
    }

    ele.grayscale = function (val = 0) {
      setFilterPart(this, 'grayscale', val)
      return this
    }

    ele.hueRotate = function (deg = 0) {
      setFilterPart(this, 'hue-rotate', `${deg}deg`)
      return this
    }

    ele.invert = function (val = 0) {
      setFilterPart(this, 'invert', val)
      return this
    }

    ele.opacity = function (val = 1) {
      setFilterPart(this, 'opacity', val)
      return this
    }

    ele.sepia = function (val = 0) {
      setFilterPart(this, 'sepia', val)
      return this
    }

    ele.saturate = function (val = 1) {
      setFilterPart(this, 'saturate', val)
      return this
    }

    function setTransformPart (el, fnName, value) {
      const regex = new RegExp(`${fnName}\\([^)]*\\)`)
      let transform = el.style.transform || ''
      if (regex.test(transform)) {
        transform = transform.replace(regex, `${fnName}(${value})`)
      } else {
        transform += ` ${fnName}(${value})`
      }
      el.style.transform = transform.trim()
    }

    ele.scale = function (x, y) {
      y = y || x
      setTransformPart(this, 'scale', `${x}, ${y}`)
      return this
    }

    ele.rotate = function (deg) {
      setTransformPart(this, 'rotate', `${deg}deg`)
      return this
    }

    ele.skew = function (xDeg, yDeg) {
      yDeg = yDeg || '0'
      setTransformPart(this, 'skew', `${xDeg}deg, ${yDeg}deg`)
      return this
    }

    // translate can get confusing for folks (b/c its' relative to other positioning logic)
    // also, there already exists a .translate DOM property, so trying this out instead...

    ele.position = function (x, y, type, origin) {
      const types = ['absolute', 'relative', 'fixed', 'sticky']
      if (typeof x !== 'number' && typeof x !== 'undefined' && x !== null) {
        console.error(`( ◕ ◞ ◕ ) nn: the .position(x) method expects the first argument to be a number, but you passed a ${typeof x}`)
      } else if (typeof y !== 'number' && typeof y !== 'undefined' && y !== null) {
        console.error(`( ◕ ◞ ◕ ) nn: the .position(x, y) method expects the second argument to be a number, but you passed a ${typeof y}`)
      } else if (typeof type !== 'string' && typeof type !== 'undefined' && type !== null) {
        console.error(`( ◕ ◞ ◕ ) nn: the .position(x, y, type) method expects the third argument to be a string, specificaly a type of CSS positioning: ${types.map(s => `"${s}"`).join(', ')}`)
      } else if (typeof type === 'string' && !types.includes(type)) {
        console.error(`( ◕ ◞ ◕ ) nn: the .position(x, y, type) method expects the third argument to be a valid CSS positioning value, specificaly: ${types.map(s => `"${s}"`).join(', ')}`)
      }
      y = (y !== undefined && y !== null) ? y : this.y
      this.style.position = type || 'absolute'
      const ox = this.__nn_positionOrigin === 'center' ? -(this.width / 2) : 0
      const oy = this.__nn_positionOrigin === 'center' ? -(this.height / 2) : 0
      this.style.left = ox + x + 'px'
      this.style.top = oy + y + 'px'
      // if the element has no dimensions yet, re-apply position once they're available.
      // images: wait for the load event. everything else: wait one animation frame
      // (by then the synchronous chain — .addTo(), .css() — will have completed).
      // the rAF only re-runs if dimensions are non-zero to avoid infinite loops.
      if (this.__nn_positionOrigin === 'center' && this.width === 0 && this.height === 0) {
        const self = this
        // hide until the deferred re-position fires, so the element is never
        // briefly visible at the un-centered position (ghost image in Firefox)
        const prevVisibility = self.style.visibility
        self.style.visibility = 'hidden'
        const reveal = () => { self.style.visibility = prevVisibility || '' }
        if (self instanceof window.HTMLImageElement) {
          self.addEventListener('load', () => { self.position(x, y, type); reveal() }, { once: true })
        } else {
          requestAnimationFrame(() => {
            if (self.width > 0 || self.height > 0) { self.position(x, y, type); reveal() }
            else reveal() // no dimensions even after rAF — reveal anyway to avoid permanent hide
          })
        }
      }
      return this
    }

    ele.positionOrigin = function (type) {
      if (type !== 'center' && type !== 'default' && type !== null && type !== undefined) {
        console.error('( ◕ ◞ ◕ ) nn: the .positionOrigin() method expects either "center" or "default" (which is top/left)')
      }
      if (type === 'center') this.__nn_positionOrigin = 'center'
      else this.__nn_positionOrigin = 'default'
      return this
    }

    // Use Object.defineProperty instead of direct assignment because
    // HTMLInputElement (and HTMLSelectElement) have a native 'size' IDL
    // attribute with a setter that validates its value. Inside an ES6 class
    // (which is always strict mode), a direct assignment like
    //   ele.size = function...
    // goes through the prototype setter rather than creating an own property.
    // The setter coerces the function to NaN → 0, which fails the ≥1 range
    // check and throws DOMException: INDEX_SIZE_ERR. Object.defineProperty
    // bypasses the prototype setter and writes the own property directly.
    Object.defineProperty(ele, 'size', {
      value: function (w, h) {
        if (w === undefined) {
          console.error('( ◕ ◞ ◕ ) nn: the .size() method expects at least one argument, a number, a CSS string like "100vw", or null to skip that dimension')
          return this
        }
        if (w !== null && typeof w !== 'number' && typeof w !== 'string') {
          console.error(`( ◕ ◞ ◕ ) nn: the .size(w) method expects the first argument to be a number, a CSS string, or null, but you passed a ${typeof w}`)
          return this
        }
        if (h !== undefined && h !== null && typeof h !== 'number' && typeof h !== 'string') {
          console.error(`( ◕ ◞ ◕ ) nn: the .size(w, h) method expects the second argument to be a number, a CSS string, or null, but you passed a ${typeof h}`)
          return this
        }
        // check computed display once per element and bump inline → inline-block
        // wrapped in try/catch because getComputedStyle can throw on detached
        // elements in sandboxed srcdoc iframes
        if (!this.__nn_displayChecked) {
          this.__nn_displayChecked = true
          try {
            if (window.getComputedStyle(this).display === 'inline') {
              this.style.display = 'inline-block'
            }
          } catch (e) {}
        }
        const toVal = v => typeof v === 'number' ? v + 'px' : v
        if (w !== null) this.style.width = toVal(w)
        if (h === undefined) {
          // single-arg: square — only if w was not null
          if (w !== null) this.style.height = toVal(w)
        } else if (h !== null) {
          this.style.height = toVal(h)
        }
        return this
      },
      writable: true,
      configurable: true,
      enumerable: false
    })

    // getters for box properties
    // -------------------------------------------------
    // NOTE: when updating lots of elements, this tends to be
    // a little too costly, either need a diff approach or let
    // students know they should store x/y/dx/dy/etc valuse in
    // their own data struct (maybe data.x/data.y etc)
    const avoid = (e) => {
      return e instanceof window.HTMLIFrameElement ||
        // e instanceof window.HTMLVideoElement ||
        e instanceof window.HTMLImageElement ||
        e instanceof window.HTMLCanvasElement
    }
    const box = ['x', 'y', 'width', 'height', 'top', 'left', 'bottom', 'right']
    box.forEach(prop => {
      const sizeProp = (prop === 'width' || prop === 'height')
      // reading ele[prop] can throw DOMException on detached elements in
      // sandboxed srcdoc iframes (e.g. HTMLInputElement.width IDL attribute)
      let current
      try { current = ele[prop] } catch (e) { current = undefined }
      if (typeof current !== 'number' || current === 0) {
        if (sizeProp && avoid(ele)) return
        Object.defineProperty(ele, prop, {
          get: function () {
            try { return this.getBoundingClientRect()[prop] } catch (e) { return 0 }
          },
          configurable: true
        })
      }
    })

    // data proxy (syncs with dataset and preserves types)
    // -------------------------------------------------
    const parseDataValue = (val) => {
      if (typeof val !== 'string') return val
      const s = val.trim()
      if (s === '') return ''
      if (s === 'true') return true
      if (s === 'false') return false
      if (s === 'null') return null
      if (s === 'undefined') return undefined
      // objects/arrays
      if ((s.startsWith('{') && s.endsWith('}')) || (s.startsWith('[') && s.endsWith(']'))) {
        try { return JSON.parse(s) } catch (e) { /* fall through */ }
      }
      // numbers
      const n = Number(s)
      if (!Number.isNaN(n)) return n
      // fallback to raw string
      return val
    }

    const serializeDataValue = (val) => {
      if (val === undefined) return undefined
      if (val === null) return 'null'
      const t = typeof val
      if (t === 'object') {
        try { return JSON.stringify(val) } catch (e) { return String(val) }
      }
      if (t === 'number' || t === 'boolean' || t === 'bigint') return String(val)
      return String(val)
    }

    // Define a Proxy so reads parse types and writes serialize
    const dataProxy = new Proxy({}, {
      get: (_target, prop) => {
        if (typeof prop === 'symbol') return undefined
        // expose a lightweight snapshot helper
        if (prop === 'toJSON') {
          return () => {
            const out = {}
            for (const k of Object.keys(ele.dataset)) out[k] = parseDataValue(ele.dataset[k])
            return out
          }
        }
        return parseDataValue(ele.dataset[prop])
      },
      set: (_target, prop, value) => {
        if (typeof prop === 'symbol') return false
        const ser = serializeDataValue(value)
        if (ser === undefined) delete ele.dataset[prop]
        else ele.dataset[prop] = ser
        return true
      },
      deleteProperty: (_target, prop) => {
        if (typeof prop === 'symbol') return false
        delete ele.dataset[prop]
        return true
      },
      has: (_target, prop) => {
        if (typeof prop === 'symbol') return false
        return Object.prototype.hasOwnProperty.call(ele.dataset, prop)
      },
      ownKeys: () => Object.keys(ele.dataset),
      getOwnPropertyDescriptor: (_target, prop) => {
        if (typeof prop === 'symbol') return undefined
        if (Object.prototype.hasOwnProperty.call(ele.dataset, prop)) {
          return { enumerable: true, configurable: true }
        }
        return undefined
      }
    })

    Object.defineProperty(ele, 'data', {
      get: function () { return dataProxy },
      enumerable: false,
      configurable: true
    })

    // auto-coerce .value to a number for number/range inputs
    // -------------------------------------------------
    if (ele instanceof window.HTMLInputElement) {
      const nativeValue = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')
      Object.defineProperty(ele, 'value', {
        get: function () {
          if (this.type === 'number' || this.type === 'range') return this.valueAsNumber
          return nativeValue.get.call(this)
        },
        set: function (v) { nativeValue.set.call(this, v) },
        configurable: true,
        enumerable: true
      })
    }

    // augment canvas elements with drawing helpers if available
    // ----------------------------------------------------------
    try {
      if (ele instanceof window.HTMLCanvasElement) {
        let mod
        try { mod = require('./canvas.js') } catch (e) { mod = (window.NNCanvas || {}) }
        const augment = (mod && (mod.augment || mod.default))
        if (typeof augment === 'function') augment(ele)
      }
    } catch (e) { /* silently ignore if canvas helpers unavailable */ }

    // augment SVG elements with SVG helpers if available
    // ----------------------------------------------------------
    try {
      const svgTagNames = new Set(['svg', 'circle', 'ellipse', 'path', 'line', 'polyline', 'polygon', 'rect', 'text', 'tspan', 'g', 'defs', 'use', 'symbol', 'lineargradient', 'radialgradient', 'stop', 'clippath', 'mask', 'animate', 'animatetransform', 'animatemotion', 'image', 'filter', 'title', 'desc'])
      if (ele && ele.tagName && svgTagNames.has(ele.tagName.toLowerCase())) {
        let mod
        try { mod = require('./svg.js') } catch (e) { mod = (window.NNSvg || {}) }
        const augment = (mod && (mod.augment || mod.default))
        if (typeof augment === 'function') augment(ele)
      }
    } catch (e) { console.error('( ◕ ◞ ◕ ) nn: SVG augment error:', e) }

    return ele
  }
}

// Optional hook called once before the first mouse-related window listener
// is registered, ensuring nn.mouseX/Y are up-to-date when the user's
// handler fires. Set by DOM.register() to the internal _trackMouse function.
DOM._preMouseHook = null
DOM._mouseEvents = new Set(['mousemove', 'mousedown', 'mouseup', 'mouseover', 'mouseout', 'mouseenter', 'mouseleave', 'click', 'dblclick', 'contextmenu'])

DOM._prePointerHook = null
DOM._pointerEvents = new Set(['pointerdown', 'pointerup', 'pointermove', 'pointerover', 'pointerout', 'pointerenter', 'pointerleave', 'pointercancel'])

DOM.register = function (nn) {
  // wire up the pre-mouse hook so tracking starts before the first listener
  DOM._preMouseHook = _trackMouse
  // wire up the pre-pointer hook so tracking starts before the first listener
  DOM._prePointerHook = _trackPointers

  // define read-only mouse, pointer, and window properties directly on nn
  Object.defineProperties(nn, {
    mouseX: {
      get () { if (!_trackingMouse) _trackMouse(); return _mouseX },
      set () { console.error('( ◕ ◞ ◕ ) nn: mouseX is a read-only property') },
      configurable: true
    },
    mouseY: {
      get () { if (!_trackingMouse) _trackMouse(); return _mouseY },
      set () { console.error('( ◕ ◞ ◕ ) nn: mouseY is a read-only property') },
      configurable: true
    },
    mouseDown: {
      get () { if (!_trackingMouse) _trackMouse(); return _mouseDown },
      set () { console.error('( ◕ ◞ ◕ ) nn: mouseDown is a read-only property') },
      configurable: true
    },
    pointers: {
      get () { if (!_trackingPointers) _trackPointers(); return Array.from(_pointers.values()) },
      set () { console.error('( ◕ ◞ ◕ ) nn: pointers is a read-only property') },
      configurable: true
    },
    pointer: {
      get () { if (!_trackingPointers) _trackPointers(); return Array.from(_pointers.values())[0] || null },
      set () { console.error('( ◕ ◞ ◕ ) nn: pointer is a read-only property') },
      configurable: true
    },
    width: {
      get () { return window.innerWidth },
      set () { console.error('( ◕ ◞ ◕ ) nn: width is a read-only property') },
      configurable: true
    },
    height: {
      get () { return window.innerHeight },
      set () { console.error('( ◕ ◞ ◕ ) nn: height is a read-only property') },
      configurable: true
    }
  })

  nn.on = DOM.on
  nn.off = DOM.off
  nn.create = DOM.create
  nn.get = DOM.get
  nn.getAll = DOM.getAll
}

if (typeof module !== 'undefined') module.exports = DOM
else window.DOM = DOM

},{"./canvas.js":7,"./css-url-helper.js":8,"./svg.js":10}],10:[function(require,module,exports){
// nn SVG augmentation: adds chainable helper methods onto SVG elements
// mirrors the pattern used in DOM/canvas.js and DOM/dom.js

let _smartCSSValue
try { _smartCSSValue = require('./css-url-helper.js').smartCSSValue } catch (e) {
  _smartCSSValue = (window._nnCssUrlHelper || {}).smartCSSValue || ((prop, val) => val)
}

function augmentSVGElement (ele) {
  if (ele.__nn_svgAugmented) return ele
  ele.__nn_svgAugmented = true

  const tag = ele.tagName ? ele.tagName.toLowerCase() : ''

  // Updates a named function inside the SVG transform attribute
  // e.g. setTransformPart('rotate', '45') produces transform="rotate(45)"
  // or updates the existing rotate(...) part if already present
  function setTransformPart (fnName, value) {
    const regex = new RegExp(`${fnName}\\([^)]*\\)`)
    let transform = ele.getAttribute('transform') || ''
    if (regex.test(transform)) {
      transform = transform.replace(regex, `${fnName}(${value})`)
    } else {
      transform += ` ${fnName}(${value})`
    }
    ele.setAttribute('transform', transform.trim())
  }

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ set attribute ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  ele.set = function (obj, val) {
    if (typeof obj === 'string' && typeof val !== 'undefined') {
      this.setAttribute(obj, val)
    } else if (typeof obj === 'object' && obj !== null && typeof val === 'undefined') {
      for (const prop in obj) {
        this.setAttribute(prop, obj[prop])
      }
    } else {
      console.error('( ◕ ◞ ◕ ) nn: the .set() method expects two arguments, an SVG attribute and value, or an object of SVG attributes and values')
    }
    return this
  }

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ css styles ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  ele.css = function (obj, val) {
    if (typeof obj === 'string' && typeof val !== 'undefined') {
      const prop = obj; obj = {}; obj[prop] = val
    } else if (typeof obj !== 'object') {
      console.error('( ◕ ◞ ◕ ) nn: the .css() method expects two arguments, a CSS property and value, or an object of CSS properties and values')
    }

    for (const prop in obj) {
      const val = obj[prop]
      const cssVal = typeof val === 'string' ? _smartCSSValue(prop, val) : val
      const rightValueType = typeof cssVal === 'string' || typeof cssVal === 'number'
      if (!rightValueType) {
        console.error('( ◕ ◞ ◕ ) nn: the CSS values in the object passed to .css() should be strings or numbers')
      } else if (typeof cssVal === 'string') {
        this.style[prop] = cssVal
      } else if (typeof cssVal === 'number') {
        const before = this.style[prop]
        this.style[prop] = cssVal
        if (this.style[prop] === '' || before === this.style[prop]) {
          this.style[prop] = cssVal + 'px'
        }
      }

      if (rightValueType && this.style[prop] === '') {
        console.error(`( ◕ ◞ ◕ ) nn: "${val}" is not a valid value for the "${prop}" property in CSS`)
      }
    }
    return this
  }

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ event listeners ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  const svgEvents = ['click', 'mousedown', 'mouseup', 'mousemove', 'mouseover', 'mouseout', 'mouseenter', 'mouseleave', 'contextmenu', 'dblclick', 'focus', 'blur', 'keydown', 'keyup', 'keypress', 'pointerdown', 'pointerup', 'pointermove', 'touchstart', 'touchend', 'touchmove', 'wheel']

  ele.on = function (event, callback, options) {
    if (typeof event !== 'string') {
      console.error('( ◕ ◞ ◕ ) nn: the first argument to the .on() method should be an event type written as a string')
    } else if (typeof callback !== 'function') {
      console.error('( ◕ ◞ ◕ ) nn: the second argument to the .on() method should be a function you want to call "on" that event')
    }
    if (!this.__nn_listeners) this.__nn_listeners = {}
    if (!this.__nn_listeners[event]) this.__nn_listeners[event] = new Map()
    const self = this
    const wrapped = function (e) { return callback.call(self, e) }
    const capture = (typeof options === 'boolean') ? options : (options && typeof options === 'object' && options.capture === true)
    this.addEventListener(event, wrapped, options)
    this.__nn_listeners[event].set(callback, { wrapped, capture })
    if (!svgEvents.includes(event)) console.warn(`( ◕ ◞ ◕ ) nn: you might want to make sure that '${event}' is a valid SVG event type`)
    return this
  }

  ele.off = function (event, callback, options) {
    if (typeof event !== 'string') {
      console.error('( ◕ ◞ ◕ ) nn: the first argument to the .off() method should be an event type written as a string')
    } else if (typeof callback !== 'function') {
      console.error('( ◕ ◞ ◕ ) nn: the second argument to the .off() method should be the same function reference previously passed to .on()')
    }
    let fn = callback
    let capture
    if (this.__nn_listeners && this.__nn_listeners[event]) {
      const entry = this.__nn_listeners[event].get(callback)
      if (entry) {
        fn = entry.wrapped
        capture = entry.capture
        this.__nn_listeners[event].delete(callback)
      }
    }
    if (typeof capture === 'undefined') {
      capture = (typeof options === 'boolean') ? options : (options && typeof options === 'object' && options.capture === true)
    }
    this.removeEventListener(event, fn, capture)
    if (!svgEvents.includes(event)) console.warn(`( ◕ ◞ ◕ ) nn: you might want to make sure that '${event}' is a valid SVG event type`)
    return this
  }

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ content ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  ele.content = function (str) {
    this.textContent = str
    return this
  }

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ addTo ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  ele.addTo = function (parent) {
    let parentEl
    if (typeof parent === 'string') {
      parentEl = document.querySelector(parent)
    } else if (parent instanceof window.SVGElement || parent instanceof window.HTMLElement) {
      parentEl = parent
    } else {
      console.error('( ◕ ◞ ◕ ) nn: the .addTo() method expects either a CSS query selector string or an SVGElement/HTMLElement')
      return this
    }

    // warn if adding a non-root SVG shape to an HTML element
    if (tag !== 'svg' && parentEl instanceof window.HTMLElement && !(parentEl instanceof window.SVGElement)) {
      console.error("( ◕ ◞ ◕ ) nn: SVG shape elements should be added to an SVG container (like <svg> or <g>), not an HTML element. Create an <svg> first with nn.create('svg').addTo('body'), then add shapes to that.")
    }

    if (this.parentNode) this.remove()
    if (parentEl) parentEl.appendChild(this)
    return this
  }

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ scoped selectors ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  ele.get = function (query) {
    if (typeof query === 'string') {
      const found = this.querySelector(query)
      if (!found) {
        console.warn(`( ◕ ◞ ◕ ) nn.get: couldn't find an SVG element matching the CSS selector query "${query}" within this element`)
        return undefined
      }
      return augmentSVGElement(found)
    } else if (query instanceof window.SVGElement || query instanceof window.HTMLElement) {
      if (!this.contains(query)) {
        console.error('( ◕ ◞ ◕ ) nn: the element you passed to .get() is not a descendant of this element')
        return undefined
      }
      return augmentSVGElement(query)
    } else {
      console.error('( ◕ ◞ ◕ ) nn: the .get() method expects either a CSS query selector string or an SVGElement')
      return undefined
    }
  }

  ele.getAll = function (query) {
    if (typeof query !== 'string') {
      console.error('( ◕ ◞ ◕ ) nn: the .getAll() method expects a CSS query selector string')
      return []
    }
    const arr = []
    this.querySelectorAll(query).forEach(el => arr.push(augmentSVGElement(el)))
    return arr
  }

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ presentation shorthands ~ ~ ~ ~ ~ ~ ~ ~ ~

  ele.fill = function (color) {
    if (typeof color !== 'string') {
      console.error('( ◕ ◞ ◕ ) nn: the .fill() method expects a color string')
      return this
    }
    this.setAttribute('fill', color)
    return this
  }

  ele.stroke = function (color) {
    if (typeof color !== 'string') {
      console.error('( ◕ ◞ ◕ ) nn: the .stroke() method expects a color string')
      return this
    }
    this.setAttribute('stroke', color)
    return this
  }

  ele.strokeWidth = function (n) {
    if (typeof n !== 'number' && typeof n !== 'string') {
      console.error('( ◕ ◞ ◕ ) nn: the .strokeWidth() method expects a number or string')
      return this
    }
    this.setAttribute('stroke-width', n)
    return this
  }

  ele.strokeDash = function (val) {
    if (Array.isArray(val)) {
      this.setAttribute('stroke-dasharray', val.join(' '))
    } else if (typeof val === 'number') {
      this.setAttribute('stroke-dasharray', val)
    } else {
      console.error('( ◕ ◞ ◕ ) nn: the .strokeDash() method expects a number or an array of numbers')
    }
    return this
  }

  ele.strokeOffset = function (n) {
    if (typeof n !== 'number') {
      console.error('( ◕ ◞ ◕ ) nn: the .strokeOffset() method expects a number')
      return this
    }
    this.setAttribute('stroke-dashoffset', n)
    return this
  }

  ele.opacity = function (n) {
    if (typeof n !== 'number') {
      console.error('( ◕ ◞ ◕ ) nn: the .opacity() method expects a number')
      return this
    }
    this.setAttribute('opacity', n)
    return this
  }

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ positionOrigin ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  ele.positionOrigin = function (type) {
    if (type !== 'center' && type !== 'default') {
      console.error("( ◕ ◞ ◕ ) nn: the .positionOrigin() method expects either 'center' or 'default'")
      return this
    }
    this.__nn_svgPositionOrigin = type
    return this
  }

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ position ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  ele.position = function (x, y, x2, y2) {
    if (typeof x !== 'number') {
      console.error(`( ◕ ◞ ◕ ) nn: the .position(x, y) method expects the first argument to be a number, but you passed a ${typeof x}`)
      return this
    }
    const cssPositionTypes = ['absolute', 'relative', 'fixed', 'sticky', 'static']
    if (typeof x2 === 'string' && cssPositionTypes.includes(x2)) {
      console.warn('( ◕ ◞ ◕ ) nn: the third argument to .position() sets a CSS positioning type, which only applies to HTML elements. For SVG elements just pass x and y — SVG uses its own coordinate system.')
    }
    if (tag === 'svg') {
      // root <svg> in HTML needs CSS positioning, just like any HTML element
      this.style.position = 'absolute'
      this.style.left = x + 'px'
      this.style.top = y + 'px'
    } else if (tag === 'circle' || tag === 'ellipse') {
      this.setAttribute('cx', x)
      this.setAttribute('cy', y)
    } else if (tag === 'line') {
      if (typeof x2 !== 'undefined' && typeof x2 !== 'number') {
        console.error('( ◕ ◞ ◕ ) nn: for <line> elements, the third argument to .position() should be a number (the x2 end coordinate) or omitted')
        return this
      }
      if (typeof y2 !== 'undefined' && typeof y2 !== 'number') {
        console.error('( ◕ ◞ ◕ ) nn: for <line> elements, the fourth argument to .position() should be a number (the y2 end coordinate) or omitted')
        return this
      }
      this.setAttribute('x1', x)
      this.setAttribute('y1', y)
      if (typeof x2 === 'number') this.setAttribute('x2', x2)
      if (typeof y2 === 'number') this.setAttribute('y2', y2)
    } else if (tag === 'g') {
      setTransformPart('translate', `${x}, ${y}`)
    } else {
      // rect, text, image, use, etc.
      if (this.__nn_svgPositionOrigin === 'center') {
        const w = parseFloat(this.getAttribute('width')) || 0
        const h = parseFloat(this.getAttribute('height')) || 0
        this.setAttribute('x', x - w / 2)
        this.setAttribute('y', y - h / 2)
      } else {
        this.setAttribute('x', x)
        this.setAttribute('y', y)
      }
    }
    return this
  }

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ transform methods ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  ele.translate = function (x, y) {
    if (typeof x !== 'number' || typeof y !== 'number') {
      console.error('( ◕ ◞ ◕ ) nn: the .translate(x, y) method expects both arguments to be numbers')
      return this
    }
    setTransformPart('translate', `${x}, ${y}`)
    return this
  }

  ele.rotate = function (deg, cx, cy) {
    if (typeof deg !== 'number') {
      console.error('( ◕ ◞ ◕ ) nn: the .rotate(deg) method expects the first argument to be a number')
      return this
    }
    if (typeof cx !== 'undefined' && typeof cy !== 'undefined') {
      setTransformPart('rotate', `${deg}, ${cx}, ${cy}`)
    } else {
      setTransformPart('rotate', `${deg}`)
    }
    return this
  }

  ele.scale = function (x, y) {
    if (typeof x !== 'number') {
      console.error('( ◕ ◞ ◕ ) nn: the .scale(x) method expects the first argument to be a number')
      return this
    }
    const sy = (typeof y === 'number') ? y : x
    setTransformPart('scale', `${x}, ${sy}`)
    return this
  }

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ text-specific methods ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  if (tag === 'text' || tag === 'tspan') {
    ele.textAlign = function (val) {
      const map = { left: 'start', center: 'middle', right: 'end' }
      const native = ['start', 'middle', 'end']
      if (map[val]) {
        this.setAttribute('text-anchor', map[val])
      } else if (native.includes(val)) {
        this.setAttribute('text-anchor', val)
      } else {
        console.error("( ◕ ◞ ◕ ) nn: the .textAlign() method expects one of: 'left', 'center', 'right', 'start', 'middle', 'end'")
      }
      return this
    }

    ele.textBaseline = function (val) {
      const map = { top: 'text-top', bottom: 'text-bottom' }
      const native = ['middle', 'alphabetic', 'hanging', 'ideographic', 'text-top', 'text-bottom']
      if (map[val]) {
        this.setAttribute('dominant-baseline', map[val])
      } else if (native.includes(val) || val === 'middle' || val === 'alphabetic' || val === 'hanging' || val === 'ideographic') {
        this.setAttribute('dominant-baseline', val)
      } else {
        console.error("( ◕ ◞ ◕ ) nn: the .textBaseline() method expects one of: 'top', 'middle', 'bottom', 'alphabetic', 'hanging', 'ideographic'")
      }
      return this
    }
  }

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ circle-specific methods ~ ~ ~ ~ ~ ~ ~ ~ ~

  if (tag === 'circle') {
    ele.radius = function (r) {
      if (typeof r !== 'number') {
        console.error('( ◕ ◞ ◕ ) nn: the .radius() method expects a number')
        return this
      }
      this.setAttribute('r', r)
      return this
    }

    ele.size = function (r) {
      return this.radius(r)
    }

    Object.defineProperty(ele, 'r', {
      get: function () { return parseFloat(this.getAttribute('r')) || 0 },
      set: function (v) { this.setAttribute('r', v) },
      configurable: true
    })
  }

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ellipse-specific methods ~ ~ ~ ~ ~ ~ ~ ~ ~

  if (tag === 'ellipse') {
    ele.size = function (rx, ry) {
      const rry = (typeof ry === 'number') ? ry : rx
      this.setAttribute('rx', rx)
      this.setAttribute('ry', rry)
      return this
    }

    Object.defineProperty(ele, 'rx', {
      get: function () { return parseFloat(this.getAttribute('rx')) || 0 },
      set: function (v) { this.setAttribute('rx', v) },
      configurable: true
    })

    Object.defineProperty(ele, 'ry', {
      get: function () { return parseFloat(this.getAttribute('ry')) || 0 },
      set: function (v) { this.setAttribute('ry', v) },
      configurable: true
    })
  }

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ rect-specific methods ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  if (tag === 'rect') {
    ele.size = function (w, h) {
      const hh = (typeof h === 'number') ? h : w
      this.setAttribute('width', w)
      this.setAttribute('height', hh)
      return this
    }

    ele.borderRadius = function (rx, ry) {
      this.setAttribute('rx', rx)
      if (typeof ry === 'number') this.setAttribute('ry', ry)
      return this
    }
  }

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ svg root-specific methods ~ ~ ~ ~ ~ ~ ~ ~ ~

  if (tag === 'svg') {
    // apply visible defaults when no explicit dimensions have been provided yet.
    // SVG coordinate space is defined by the width/height *attributes*, not CSS —
    // without them the spec fallback is 300×150 user units regardless of how large
    // the element renders, so shapes placed with window-based coordinates would be
    // invisible. setting pixel attributes to match the window gives a 1:1 mapping
    // (same pattern as <canvas>). students who want a smaller SVG just call
    // .size(w, h) afterwards, which sets the attributes and overrides this.
    if (!ele.hasAttribute('width') && !ele.hasAttribute('height')) {
      const w = window.innerWidth
      const h = window.innerHeight
      ele.setAttribute('width', w)
      ele.setAttribute('height', h)
      ele.setAttribute('viewBox', `0 0 ${w} ${h}`)
      ele.style.display = 'block'
    }

    ele.size = function (w, h) {
      if (typeof w !== 'number' || typeof h !== 'number') {
        console.error('( ◕ ◞ ◕ ) nn: the .size(w, h) method on <svg> expects both arguments to be numbers')
        return this
      }
      this.setAttribute('width', w)
      this.setAttribute('height', h)
      this.setAttribute('viewBox', `0 0 ${w} ${h}`)
      return this
    }

    // SVGSVGElement has a built-in read-only IDL attribute called `viewBox`
    // (returns an SVGAnimatedRect), so a plain assignment silently fails on a
    // proper SVGSVGElement created with createElementNS. Object.defineProperty
    // creates an own property that shadows the prototype getter.
    Object.defineProperty(ele, 'viewBox', {
      value: function (x, y, w, h) {
        if (typeof x !== 'number' || typeof y !== 'number' || typeof w !== 'number' || typeof h !== 'number') {
          console.error('( ◕ ◞ ◕ ) nn: the .viewBox(x, y, w, h) method expects all four arguments to be numbers')
          return this
        }
        this.setAttribute('viewBox', `${x} ${y} ${w} ${h}`)
        return this
      },
      writable: true,
      configurable: true
    })
  }

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ line-specific properties ~ ~ ~ ~ ~ ~ ~ ~ ~

  if (tag === 'line') {
    Object.defineProperty(ele, 'x2', {
      get: function () { return parseFloat(this.getAttribute('x2')) || 0 },
      set: function (v) { this.setAttribute('x2', v) },
      configurable: true
    })

    Object.defineProperty(ele, 'y2', {
      get: function () { return parseFloat(this.getAttribute('y2')) || 0 },
      set: function (v) { this.setAttribute('y2', v) },
      configurable: true
    })
  }

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ bounding box / position properties ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  Object.defineProperty(ele, 'screenX', {
    get: function () { return this.getBoundingClientRect().x },
    configurable: true
  })

  Object.defineProperty(ele, 'screenY', {
    get: function () { return this.getBoundingClientRect().y },
    configurable: true
  })

  // x property
  if (tag === 'circle' || tag === 'ellipse') {
    Object.defineProperty(ele, 'x', {
      get: function () { return parseFloat(this.getAttribute('cx')) || 0 },
      set: function (v) { this.setAttribute('cx', v) },
      configurable: true
    })
  } else if (tag === 'rect' || tag === 'text' || tag === 'tspan' || tag === 'image' || tag === 'use') {
    Object.defineProperty(ele, 'x', {
      get: function () { return parseFloat(this.getAttribute('x')) || 0 },
      set: function (v) { this.setAttribute('x', v) },
      configurable: true
    })
  } else if (tag === 'line') {
    Object.defineProperty(ele, 'x', {
      get: function () { return parseFloat(this.getAttribute('x1')) || 0 },
      set: function (v) { this.setAttribute('x1', v) },
      configurable: true
    })
  } else if (tag === 'g') {
    Object.defineProperty(ele, 'x', {
      get: function () {
        const t = this.getAttribute('transform') || ''
        const m = t.match(/translate\(\s*([-\d.]+)/)
        return m ? parseFloat(m[1]) : 0
      },
      set: function (v) {
        const t = this.getAttribute('transform') || ''
        const m = t.match(/translate\(\s*([-\d.]+)[,\s]+([-\d.]+)/)
        const cy = m ? parseFloat(m[2]) : 0
        setTransformPart('translate', `${v}, ${cy}`)
      },
      configurable: true
    })
  } else {
    // path, polygon, polyline, etc. — read-only from getBBox
    Object.defineProperty(ele, 'x', {
      get: function () {
        try { return this.getBBox().x } catch (e) { return 0 }
      },
      configurable: true
    })
  }

  // y property
  if (tag === 'circle' || tag === 'ellipse') {
    Object.defineProperty(ele, 'y', {
      get: function () { return parseFloat(this.getAttribute('cy')) || 0 },
      set: function (v) { this.setAttribute('cy', v) },
      configurable: true
    })
  } else if (tag === 'rect' || tag === 'text' || tag === 'tspan' || tag === 'image' || tag === 'use') {
    Object.defineProperty(ele, 'y', {
      get: function () { return parseFloat(this.getAttribute('y')) || 0 },
      set: function (v) { this.setAttribute('y', v) },
      configurable: true
    })
  } else if (tag === 'line') {
    Object.defineProperty(ele, 'y', {
      get: function () { return parseFloat(this.getAttribute('y1')) || 0 },
      set: function (v) { this.setAttribute('y1', v) },
      configurable: true
    })
  } else if (tag === 'g') {
    Object.defineProperty(ele, 'y', {
      get: function () {
        const t = this.getAttribute('transform') || ''
        const m = t.match(/translate\(\s*[-\d.]+[,\s]+([-\d.]+)/)
        return m ? parseFloat(m[1]) : 0
      },
      set: function (v) {
        const t = this.getAttribute('transform') || ''
        const m = t.match(/translate\(\s*([-\d.]+)/)
        const cx = m ? parseFloat(m[1]) : 0
        setTransformPart('translate', `${cx}, ${v}`)
      },
      configurable: true
    })
  } else {
    Object.defineProperty(ele, 'y', {
      get: function () {
        try { return this.getBBox().y } catch (e) { return 0 }
      },
      configurable: true
    })
  }

  // width property
  if (tag === 'rect' || tag === 'image' || tag === 'svg') {
    Object.defineProperty(ele, 'width', {
      get: function () { return parseFloat(this.getAttribute('width')) || 0 },
      set: function (v) { this.setAttribute('width', v) },
      configurable: true
    })
  } else {
    Object.defineProperty(ele, 'width', {
      get: function () {
        try { return this.getBBox().width } catch (e) { return 0 }
      },
      configurable: true
    })
  }

  // height property
  if (tag === 'rect' || tag === 'image' || tag === 'svg') {
    Object.defineProperty(ele, 'height', {
      get: function () { return parseFloat(this.getAttribute('height')) || 0 },
      set: function (v) { this.setAttribute('height', v) },
      configurable: true
    })
  } else {
    Object.defineProperty(ele, 'height', {
      get: function () {
        try { return this.getBBox().height } catch (e) { return 0 }
      },
      configurable: true
    })
  }

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ factory methods (svg, g, symbol, defs) ~ ~ ~ ~ ~ ~ ~

  if (tag === 'svg' || tag === 'g' || tag === 'symbol' || tag === 'defs') {
    const ns = 'http://www.w3.org/2000/svg'

    ele.circle = function (cx, cy, r) {
      if (typeof cx !== 'number' || typeof cy !== 'number' || typeof r !== 'number') {
        console.error('( ◕ ◞ ◕ ) nn: .circle(cx, cy, r) expects all three arguments to be numbers')
        return
      }
      const el = document.createElementNS(ns, 'circle')
      el.setAttribute('cx', cx)
      el.setAttribute('cy', cy)
      el.setAttribute('r', r)
      this.appendChild(el)
      return augmentSVGElement(el)
    }

    ele.ellipse = function (cx, cy, rx, ry) {
      if (typeof cx !== 'number' || typeof cy !== 'number' || typeof rx !== 'number') {
        console.error('( ◕ ◞ ◕ ) nn: .ellipse(cx, cy, rx, ry) expects at least three number arguments')
        return
      }
      const rry = (typeof ry === 'number') ? ry : rx
      const el = document.createElementNS(ns, 'ellipse')
      el.setAttribute('cx', cx)
      el.setAttribute('cy', cy)
      el.setAttribute('rx', rx)
      el.setAttribute('ry', rry)
      this.appendChild(el)
      return augmentSVGElement(el)
    }

    ele.rect = function (x, y, w, h) {
      const hh = (typeof h === 'number') ? h : w
      const el = document.createElementNS(ns, 'rect')
      el.setAttribute('x', x)
      el.setAttribute('y', y)
      el.setAttribute('width', w)
      el.setAttribute('height', hh)
      this.appendChild(el)
      return augmentSVGElement(el)
    }

    ele.line = function (x1, y1, x2, y2) {
      if (typeof x1 !== 'number' || typeof y1 !== 'number' || typeof x2 !== 'number' || typeof y2 !== 'number') {
        console.error('( ◕ ◞ ◕ ) nn: .line(x1, y1, x2, y2) expects all four arguments to be numbers')
        return
      }
      const el = document.createElementNS(ns, 'line')
      el.setAttribute('x1', x1)
      el.setAttribute('y1', y1)
      el.setAttribute('x2', x2)
      el.setAttribute('y2', y2)
      this.appendChild(el)
      return augmentSVGElement(el)
    }

    ele.path = function (d) {
      if (typeof d !== 'string') {
        console.error('( ◕ ◞ ◕ ) nn: .path(d) expects a path data string')
        return
      }
      const el = document.createElementNS(ns, 'path')
      el.setAttribute('d', d)
      this.appendChild(el)
      return augmentSVGElement(el)
    }

    ele.polygon = function (points) {
      let pts
      if (typeof points === 'string') {
        pts = points
      } else if (Array.isArray(points)) {
        pts = points.map(p => `${p[0]},${p[1]}`).join(' ')
      } else {
        console.error('( ◕ ◞ ◕ ) nn: .polygon(points) expects a points string or an array of [x, y] pairs')
        return
      }
      const el = document.createElementNS(ns, 'polygon')
      el.setAttribute('points', pts)
      this.appendChild(el)
      return augmentSVGElement(el)
    }

    ele.polyline = function (points) {
      let pts
      if (typeof points === 'string') {
        pts = points
      } else if (Array.isArray(points)) {
        pts = points.map(p => `${p[0]},${p[1]}`).join(' ')
      } else {
        console.error('( ◕ ◞ ◕ ) nn: .polyline(points) expects a points string or an array of [x, y] pairs')
        return
      }
      const el = document.createElementNS(ns, 'polyline')
      el.setAttribute('points', pts)
      this.appendChild(el)
      return augmentSVGElement(el)
    }

    ele.text = function (str, x, y) {
      const el = document.createElementNS(ns, 'text')
      if (str !== undefined) el.textContent = str
      if (typeof x === 'number') el.setAttribute('x', x)
      if (typeof y === 'number') el.setAttribute('y', y)
      this.appendChild(el)
      return augmentSVGElement(el)
    }

    ele.group = function () {
      const el = document.createElementNS(ns, 'g')
      this.appendChild(el)
      return augmentSVGElement(el)
    }

    ele.image = function (href, x, y, w, h) {
      const el = document.createElementNS(ns, 'image')
      if (typeof href === 'string') el.setAttribute('href', href)
      if (typeof x === 'number') el.setAttribute('x', x)
      if (typeof y === 'number') el.setAttribute('y', y)
      if (typeof w === 'number') el.setAttribute('width', w)
      if (typeof h === 'number') el.setAttribute('height', h)
      this.appendChild(el)
      return augmentSVGElement(el)
    }
  }

  return ele
}

if (typeof module !== 'undefined') module.exports = { augment: augmentSVGElement }
else window.NNSvg = { augment: augmentSVGElement }

},{"./css-url-helper.js":8}],11:[function(require,module,exports){
class Data {
  // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
  // internal helpers
  // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

  static _parseCSV (csvText, headers) {
    const records = []
    let record = []
    let field = ''
    let insideQuotes = false

    for (let i = 0; i < csvText.length; i++) {
      const char = csvText[i]
      const nextChar = csvText[i + 1]
      if (char === '"' && field === '' && !insideQuotes) {
        insideQuotes = true
        continue
      } else if (char === '"' && insideQuotes) {
        if (nextChar === '"') { field += char; i++ } else insideQuotes = false
        continue
      } else if (char === ',' && !insideQuotes) {
        record.push(field.trim())
        field = ''
        continue
      } else if (char === '\n' && !insideQuotes) {
        record.push(field.trim())
        records.push(record)
        record = []
        field = ''
        continue
      } else {
        field += char
      }
    }

    if (field !== '' || record.length > 0) {
      record.push(field.trim())
      records.push(record)
    }

    if (!headers) return records

    const headerRow = records.shift()
    if (!headerRow || headerRow.length === 0) {
      console.error('( ◕ ◞ ◕ ) nn.parse: the CSV data is missing its headers')
      return null
    }

    return records.map(row =>
      headerRow.reduce((obj, key, i) => {
        obj[key] = row[i]
        return obj
      }, {})
    )
  }

  static _stringifyCSV (arrayOfObjects) {
    const headers = Object.keys(arrayOfObjects[0])
    const rows = arrayOfObjects.map(obj =>
      headers.map(h => {
        const value = String(obj[h])
        return '"' + value.replace(/"/g, '""') + '"'
      }).join(',')
    )
    return [headers.join(','), ...rows].join('\n')
  }

  static _triggerDownload (filename, href, isObjectURL) {
    const a = document.createElement('a')
    a.href = href
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    if (isObjectURL) URL.revokeObjectURL(href)
  }

  static _blobDownload (str, mimeType, filename) {
    const blob = new Blob([str], { type: mimeType })
    const url = URL.createObjectURL(blob)
    Data._triggerDownload(filename, url, true)
  }

  static _readFile (file, headers) {
    const meta = { name: file.name, size: file.size, type: file.type }
    if (file.type.startsWith('image/') || file.type.startsWith('video/') || file.type.startsWith('audio/')) {
      return Promise.resolve(Object.assign(meta, { data: URL.createObjectURL(file) }))
    }
    return file.text().then(text => {
      const isCSV = file.type === 'text/csv' || file.name.endsWith('.csv')
      const isJSON = file.type === 'application/json' || file.name.endsWith('.json')
      let data
      if (isCSV) data = Data._parseCSV(text, headers)
      else if (isJSON) {
        try { data = JSON.parse(text) } catch (e) { data = text }
      } else {
        data = text
      }
      return Object.assign(meta, { data })
    })
  }

  // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
  // public API
  // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

  static parse (str, options) {
    if (typeof str !== 'string') {
      console.error('( ◕ ◞ ◕ ) nn.parse: expects a string')
      return null
    }
    const opts = (typeof options === 'object' && options !== null) ? options : {}
    const headers = opts.headers !== false
    const trimmed = str.trim()
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      try {
        return JSON.parse(str)
      } catch (e) {
        console.error('( ◕ ◞ ◕ ) nn.parse: failed to parse as JSON')
        console.error(e)
        return null
      }
    }
    return Data._parseCSV(str, headers)
  }

  static serialize (data, format) {
    if (format === 'csv') {
      if (!Array.isArray(data) || !data.every(i => typeof i === 'object' && i !== null && !Array.isArray(i))) {
        console.error('( ◕ ◞ ◕ ) nn.serialize: CSV format requires an array of objects')
        return null
      }
      return Data._stringifyCSV(data)
    }
    if (format === 'json') return JSON.stringify(data)
    // auto-detect
    const isArrayOfObjects = Array.isArray(data) &&
      data.length > 0 &&
      data.every(item => typeof item === 'object' && item !== null && !Array.isArray(item))
    if (isArrayOfObjects) return Data._stringifyCSV(data)
    return JSON.stringify(data)
  }

  static download (data, filename) {
    if (data === null || data === undefined) {
      console.error('( ◕ ◞ ◕ ) nn.download: first argument cannot be null or undefined')
      return null
    }

    const isCanvas = data instanceof window.HTMLCanvasElement
    const isImg = data instanceof window.HTMLImageElement
    const isSVG = data instanceof window.SVGElement
    const isEle = data instanceof window.HTMLElement
    const isStr = typeof data === 'string'
    const isArrayOfObjects = Array.isArray(data) &&
      data.length > 0 &&
      data.every(i => typeof i === 'object' && i !== null && !Array.isArray(i))

    // canvas or image → PNG (or JPG if filename says so)
    if (isCanvas || isImg) {
      let canvas = data
      if (isImg) {
        canvas = document.createElement('canvas')
        canvas.width = data.naturalWidth || data.width
        canvas.height = data.naturalHeight || data.height
        canvas.getContext('2d').drawImage(data, 0, 0)
      }
      const isJPG = filename && /\.jpe?g$/i.test(filename)
      const ext = isJPG ? 'jpeg' : 'png'
      const dataURL = canvas.toDataURL('image/' + ext)
      Data._triggerDownload(filename || ('sketch.' + (isJPG ? 'jpg' : 'png')), dataURL, false)
      return dataURL
    }

    // SVG element → .svg
    if (isSVG) {
      const str = data.outerHTML
      Data._blobDownload(str, 'image/svg+xml', filename || 'image.svg')
      return str
    }

    // any other DOM element → .html
    if (isEle) {
      const str = data.outerHTML
      Data._blobDownload(str, 'text/html', filename || 'page.html')
      return str
    }

    // array of plain objects → .csv
    if (isArrayOfObjects) {
      const str = Data._stringifyCSV(data)
      Data._blobDownload(str, 'text/csv', filename || 'data.csv')
      return str
    }

    // any other non-string value → .json
    if (!isStr) {
      const str = JSON.stringify(data)
      Data._blobDownload(str, 'application/json', filename || 'data.json')
      return str
    }

    // string: infer filename from content if none provided
    let name = filename
    if (!name) {
      const t = data.trim()
      if (t.startsWith('<')) name = 'page.html'
      else if (t.startsWith('{') || t.startsWith('[')) name = 'data.json'
      else name = 'file.txt'
    }
    const ext = name.split('.').pop()
    const mimeMap = {
      html: 'text/html',
      json: 'application/json',
      csv: 'text/csv',
      svg: 'image/svg+xml',
      txt: 'text/plain'
    }
    Data._blobDownload(data, mimeMap[ext] || 'text/plain', name)
    return data
  }

  static upload (options) {
    const opts = (typeof options === 'object' && options !== null) ? options : {}
    const types = opts.types || []
    const maxSize = opts.maxSize || null
    const filter = opts.filter || null
    const multiple = opts.multiple || false
    const headers = opts.headers !== false

    return new Promise(resolve => {
      const input = document.createElement('input')
      input.type = 'file'
      if (types.length > 0) input.accept = types.join(',')
      if (multiple) input.multiple = true

      input.addEventListener('cancel', () => resolve(multiple ? [] : null))

      input.addEventListener('change', async () => {
        const files = Array.from(input.files)

        const results = await Promise.all(files.map(async file => {
          const meta = { name: file.name, size: file.size, type: file.type }
          if (maxSize !== null && file.size > maxSize * 1024) {
            return Object.assign(meta, { error: 'exceeds maxSize of ' + maxSize + 'KB' })
          }
          if (types.length > 0) {
            const matched = types.some(t =>
              t.endsWith('/*') ? file.type.startsWith(t.slice(0, -1)) : file.type === t
            )
            if (!matched) {
              return Object.assign(meta, { error: 'does not match accepted types' })
            }
          }
          if (filter !== null && !filter(file)) {
            return Object.assign(meta, { error: 'rejected by filter' })
          }
          return Data._readFile(file, headers)
        }))

        resolve(multiple ? results : (results.length > 0 ? results[0] : null))
      })

      input.click()
    })
  }
}

if (typeof module !== 'undefined') module.exports = Data
else window.Data = Data

},{}],12:[function(require,module,exports){
class Maths {
  static norm (value, min, max) { return (value - min) / (max - min) }

  static clamp (value, min, max) { return Math.max(min, Math.min(max, value)) }

  static lerp (a, b, t) { return (1 - t) * a + t * b }

  static _lerp (norm, min, max) { return (max - min) * norm + min }

  static map (value, sourceMin, sourceMax, destMin, destMax) {
    return this._lerp(this.norm(value, sourceMin, sourceMax), destMin, destMax)
  }

  static dist (p1x, p1y, p2x, p2y) {
    if (typeof p2x === 'undefined' && typeof p2y === 'undefined') {
      return Math.abs(p1x - p1y)
    }
    return Math.sqrt(Math.pow(p2x - p1x, 2) + Math.pow(p2y - p1y, 2))
  }

  static angleBtw (p1x, p1y, p2x, p2y) {
    return Math.atan2(p2y - p1y, p2x - p1x)
  }

  // ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ .
  // ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . conversions
  // ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ .

  static radToDeg (radians) {
    return radians * (180.0 / Math.PI)
  }

  static degToRad (degrees) {
    return degrees * (Math.PI / 180.0)
  }

  static cartesianToPolar (x, y) {
    var distance = Math.sqrt(x * x + y * y)
    var radians = Math.atan2(y, x)
    var degrees = radians * (180 / Math.PI)
    return { distance: distance, radians: radians, degrees: degrees }
  }

  static polarToCartesian (distance, angle) {
    var x = distance * Math.cos(angle)
    var y = distance * Math.sin(angle)
    return { x: x, y: y }
  }

  // ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ ._
  // ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ .  randomness
  // ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ .

  static shuffle (a) { // via: https://stackoverflow.com/a/6274381/1104148
    let j, x, i
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1))
      x = a[i]
      a[i] = a[j]
      a[j] = x
    }
    return a
  }

  static randomInt (min, max) {
    if (typeof max === 'undefined') { max = min; min = 0 }
    return Math.floor(min + Math.random() * (max - min + 1))
  }

  static randomFloat (min, max) {
    if (typeof max === 'undefined') { max = min; min = 0 }
    return min + Math.random() * (max - min)
  }

  static random (val, val2) {
    const err = msg => console.error(`( ◕ ◞ ◕ ) nn: ${msg}`)
    const warn = msg => console.warn(`( ◕ ◞ ◕ ) nn: ${msg}`)
    // no args → random float in [0, 1)
    if (typeof val === 'undefined' && typeof val2 === 'undefined') {
      return this.randomFloat(0, 1)
    }
    // array → random item
    if (Array.isArray(val)) {
      if (val.length === 0) {
        err('the first argument to .random() was an empty array, add at least one item.')
        return undefined
      }
      return val[Math.floor(Math.random() * val.length)]
    }
    // string → random word; if single word, random char
    if (typeof val === 'string') {
      if (!/\S/u.test(val)) {
        err('the first argument to .random() was an empty/whitespace-only string, add some letters or words.')
        return undefined
      }
      const words = val.match(/\S+/gu) || []
      if (words.length === 1) {
        const chars = Array.from(words[0])
        return chars[Math.floor(Math.random() * chars.length)]
      }
      return words[Math.floor(Math.random() * words.length)]
    }
    // number(s) → random float in range
    if (typeof val === 'number') {
      if (!Number.isFinite(val)) {
        err('the first argument to .random() must be a finite number.')
        return undefined
      }
      if (typeof val2 === 'undefined') {
        return this.randomFloat(0, val)
      }
      if (typeof val2 !== 'number' || !Number.isFinite(val2)) {
        err('when the first argument in .random() is a number, the second argument (max) must also be a finite number.')
        return undefined
      }
      if (val === val2) {
        warn('you passed identical min and max to the .random() method, returning that exact value.')
        return val
      }
      if (val > val2) {
        warn('you passed a min that was greater than max to the .random() method, so I swapped them for you.')
        return this.randomFloat(val2, val)
      }
      return this.randomFloat(val, val2)
    }
    // anything else
    err('the first argument to .random() should be an Array, String, Number, or nothing.')
    return undefined
  }

  static perlin () { // via: https://github.com/joeiddon/perlin
    return {
      randVect: function () {
        const theta = Math.random() * 2 * Math.PI
        return { x: Math.cos(theta), y: Math.sin(theta) }
      },
      dot_prod_grid: function (x, y, vx, vy) {
        let gVect
        const dVect = { x: x - vx, y: y - vy }
        if (this.gradients[[vx, vy]]) {
          gVect = this.gradients[[vx, vy]]
        } else {
          gVect = this.randVect()
          this.gradients[[vx, vy]] = gVect
        }
        return dVect.x * gVect.x + dVect.y * gVect.y
      },
      smootherstep: function (x) {
        return 6 * x ** 5 - 15 * x ** 4 + 10 * x ** 3
      },
      interp: function (x, a, b) {
        return a + this.smootherstep(x) * (b - a)
      },
      seed: function () {
        this.gradients = {}
      },
      gradients: {},
      memory: {},
      get: function (x, y = 0) {
        const hasIt = Object.prototype.hasOwnProperty.call(this.memory, [x, y])
        if (hasIt) return this.memory[[x, y]]
        const xf = Math.floor(x)
        const yf = Math.floor(y)
        // interpolate
        const tl = this.dot_prod_grid(x, y, xf, yf)
        const tr = this.dot_prod_grid(x, y, xf + 1, yf)
        const bl = this.dot_prod_grid(x, y, xf, yf + 1)
        const br = this.dot_prod_grid(x, y, xf + 1, yf + 1)
        const xt = this.interp(x - xf, tl, tr)
        const xb = this.interp(x - xf, bl, br)
        const v = this.interp(y - yf, xt, xb)
        this.memory[[x, y]] = v
        return v
      }
    }
  }

  // ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ .
  // ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ .  easing
  // ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ . _ . ~ * ~ .

  static easeInQuad (t) { // accelerating from zero velocity
    return t * t
  }

  static easeOutQuad (t) { // decelerating to zero velocity
    return t * (2 - t)
  }

  static easeInOutQuad (t) { // acceleration until halfway, then deceleration
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  }

  static easeInCubic (t) { // accelerating from zero velocity
    return t * t * t
  }

  static easeOutCubic (t) { // decelerating to zero velocity
    return (--t) * t * t + 1
  }

  static easeInOutCubic (t) { // acceleration until halfway, then deceleration
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  }

  static easeInQuart (t) { // accelerating from zero velocity
    return t * t * t * t
  }

  static easeOutQuart (t) { // decelerating to zero velocity
    return 1 - (--t) * t * t * t
  }

  static easeInOutQuart (t) { // acceleration until halfway, then deceleration
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
  }

  static easeInQuint (t) { // accelerating from zero velocity
    return t * t * t * t * t
  }

  static easeOutQuint (t) { // decelerating to zero velocity
    return 1 + (--t) * t * t * t * t
  }

  static easeInOutQuint (t) { // acceleration until halfway, then deceleration
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
  }

  // easings below this point via: https://easings.net

  static easeInSine (x) {
    return 1 - Math.cos((x * Math.PI) / 2)
  }

  static easeOutSine (x) {
    return Math.sin((x * Math.PI) / 2)
  }

  static easeInOutSine (x) {
    return -(Math.cos(Math.PI * x) - 1) / 2
  }

  static easeInCirc (x) {
    return 1 - Math.sqrt(1 - Math.pow(x, 2))
  }

  static easeOutCirc (x) {
    return Math.sqrt(1 - Math.pow(x - 1, 2))
  }

  static easeInOutCirc (x) {
    return x < 0.5
      ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
      : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2
  }

  static easeInElastic (x) {
    const c4 = (2 * Math.PI) / 3
    return x === 0 ? 0 : x === 1
      ? 1 : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4)
  }

  static easeOutElastic (x) {
    const c4 = (2 * Math.PI) / 3
    return x === 0 ? 0 : x === 1
      ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1
  }

  static easeInOutElastic (x) {
    const c5 = (2 * Math.PI) / 4.5
    return x === 0 ? 0 : x === 1
      ? 1 : x < 0.5
        ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
        : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1
  }

  static easeInExpo (x) {
    return x === 0 ? 0 : Math.pow(2, 10 * x - 10)
  }

  static easeOutExpo (x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x)
  }

  static easeInOutExpo (x) {
    return x === 0 ? 0 : x === 1
      ? 1 : x < 0.5
        ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2
  }

  static easeInBack (x) {
    const c1 = 1.70158
    const c3 = c1 + 1
    return c3 * x * x * x - c1 * x * x
  }

  static easeOutBack (x) {
    const c1 = 1.70158
    const c3 = c1 + 1
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2)
  }

  static easeInOutBack (x) {
    const c1 = 1.70158
    const c2 = c1 * 1.525
    return x < 0.5
      ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
      : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2
  }

  static easeInBounce (x) {
    return 1 - this.easeOutBounce(1 - x)
  }

  static easeOutBounce (x) {
    const n1 = 7.5625
    const d1 = 2.75
    if (x < 1 / d1) {
      return n1 * x * x
    } else if (x < 2 / d1) {
      return n1 * (x -= 1.5 / d1) * x + 0.75
    } else if (x < 2.5 / d1) {
      return n1 * (x -= 2.25 / d1) * x + 0.9375
    } else {
      return n1 * (x -= 2.625 / d1) * x + 0.984375
    }
  }

  static easeInOutBounce (x) {
    return x < 0.5
      ? (1 - this.easeOutBounce(1 - 2 * x)) / 2
      : (1 + this.easeOutBounce(2 * x - 1)) / 2
  }
}

if (typeof module !== 'undefined') module.exports = Maths

},{}],13:[function(require,module,exports){
class Media {
  static popup (url, xOrObj, y, w, h) {
    if (typeof url !== 'string') {
      console.error('( ◕ ◞ ◕ ) nn.popup: first argument must be a URL string')
      return null
    }
    let px = 0; let py = 0; let pw = 400; let ph = 300
    if (typeof xOrObj === 'object' && xOrObj !== null) {
      if (xOrObj.left !== undefined) px = xOrObj.left
      if (xOrObj.top !== undefined) py = xOrObj.top
      if (xOrObj.width !== undefined) pw = xOrObj.width
      if (xOrObj.height !== undefined) ph = xOrObj.height
    } else {
      if (typeof xOrObj === 'number') px = xOrObj
      if (typeof y === 'number') py = y
      if (typeof w === 'number') pw = w
      if (typeof h === 'number') ph = h
    }
    return window.open(url, '_blank', `width=${pw},height=${ph},left=${px},top=${py}`)
  }

  static loadImage (url) {
    return new Promise((resolve, reject) => {
      // const img = new window.Image()
      const img = this.create('img')
      img.addEventListener('load', () => resolve(img))
      img.addEventListener('error', (err) => reject(err))
      img.src = url
    })
  }

  static async filterImage (image, algorithm, opts = {}) {
    if (typeof algorithm !== 'function') {
      console.error('( ◕ ◞ ◕ ) nn.filterImage: the second argument must be a function')
      return
    }

    const isImg = image instanceof window.HTMLImageElement
    const isString = typeof image === 'string'

    if (!isImg && !isString) {
      console.error('( ◕ ◞ ◕ ) nn.filterImage: first argument must be an <img> element or a base64 data URL string')
      return
    }
    if (isString && image.indexOf('data:image') !== 0) {
      console.error('( ◕ ◞ ◕ ) nn.filterImage: string data must be a base64 encoded data URL')
      return
    }

    // load base64 string into an image element first
    if (isString) image = await window.nn.loadImage(image)

    const canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height

    const ctx = canvas.getContext('2d')
    ctx.drawImage(image, 0, 0)
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const d = imageData.data

    if (opts.raw) {
      algorithm(d)
    } else {
      const pixels = []
      for (let i = 0; i < d.length; i += 4) {
        pixels.push({ r: d[i], g: d[i + 1], b: d[i + 2], a: d[i + 3] })
      }
      algorithm(pixels)
      for (let i = 0; i < d.length; i += 4) {
        const px = pixels[i / 4]
        d[i] = px.r; d[i + 1] = px.g; d[i + 2] = px.b; d[i + 3] = px.a
      }
    }

    ctx.putImageData(imageData, 0, 0)
    const data = canvas.toDataURL()
    image.src = data

    return { image, canvas, data }
  }

  static filterVideo (video, algorithm, opts = {}) {
    if (!(video instanceof window.HTMLVideoElement)) {
      console.error('( ◕ ◞ ◕ ) nn.filterVideo: first argument must be a <video> element')
      return null
    }
    if (algorithm !== null && typeof algorithm !== 'function') {
      console.error('( ◕ ◞ ◕ ) nn.filterVideo: second argument must be a function or null')
      return null
    }

    const canvas = this.create('canvas')
    const ctx = canvas.getContext('2d')
    let rafId = null
    let currentAlgorithm = algorithm
    let currentRaw = !!opts.raw
    let explicitSize = false // set to true once .size() is called externally

    function tick () {
      rafId = requestAnimationFrame(tick)
      const vw = video.videoWidth || video.width
      const vh = video.videoHeight || video.height
      if (vw === 0 || vh === 0) return // video not ready yet
      // auto-sync to native dimensions each frame unless the caller has
      // explicitly resized the canvas via .size() — in that case, respect it
      // and scale the video content to fit instead
      if (!explicitSize) {
        if (canvas.width !== vw) canvas.width = vw
        if (canvas.height !== vh) canvas.height = vh
      }
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      if (currentAlgorithm) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const d = imageData.data
        if (currentRaw) {
          currentAlgorithm(d)
        } else {
          const pixels = []
          for (let i = 0; i < d.length; i += 4) {
            pixels.push({ r: d[i], g: d[i + 1], b: d[i + 2], a: d[i + 3] })
          }
          currentAlgorithm(pixels)
          for (let i = 0; i < d.length; i += 4) {
            const px = pixels[i / 4]
            d[i] = px.r; d[i + 1] = px.g; d[i + 2] = px.b; d[i + 3] = px.a
          }
        }
        ctx.putImageData(imageData, 0, 0)
      }
    }

    rafId = requestAnimationFrame(tick)

    canvas.update = function (fn, updateOpts = {}) {
      if (fn !== null && typeof fn !== 'function') {
        console.error('( ◕ ◞ ◕ ) nn.filterVideo: update() expects a function or null')
        return
      }
      currentAlgorithm = fn
      if (updateOpts.raw !== undefined) currentRaw = !!updateOpts.raw
    }
    canvas.stop = function () { cancelAnimationFrame(rafId) }

    // wrap .size() and .resize() so calling either opts out of auto-sync
    const _size = canvas.size.bind(canvas)
    canvas.size = canvas.resize = function (w, h) {
      explicitSize = true
      return _size(w, h)
    }

    return canvas
  }

  // unified entry point — dispatches to the appropriate dedicated method.
  // an optional callback can be passed as the second argument to avoid async/await.
  static async askFor (type, callback) {
    if (typeof type !== 'string') {
      console.error('( ◕ ◞ ◕ ) nn.askFor: first argument must be a string, e.g. nn.askFor(\'video\') or nn.askFor(\'gps\')')
      return null
    }
    let result
    if (type === 'video') result = await this.askForStream({ video: true })
    else if (type === 'audio') result = await this.askForStream({ audio: true })
    else if (type === 'capture') result = await this.askForCapture()
    else if (type === 'gps') return await this.askForGPS(callback) // handles callback internally
    else if (type === 'notifications') result = await this.askForNotifications()
    else if (type === 'clipboard') result = await this.askForClipboard()
    else if (type === 'bluetooth') result = await this.askForBluetooth()
    else if (type === 'usb') result = await this.askForUSB()
    else if (type === 'serial') result = await this.askForSerial()
    else if (type === 'motion') result = await this.askForMotion()
    else if (type === 'orientation') result = await this.askForOrientation()
    else {
      console.error('( ◕ ◞ ◕ ) nn.askFor: unrecognised type \'' + type + '\' — valid values are: video, audio, capture, gps, notifications, clipboard, bluetooth, usb, serial, motion, orientation')
      return null
    }
    if (typeof callback === 'function') callback(result)
    return result
  }

  static async askForStream (constraints) {
    if (typeof constraints !== 'object' || constraints === null) {
      console.error('( ◕ ◞ ◕ ) nn.askForStream: pass a constraints object, e.g. { video: true } or { audio: true, video: true }')
      return null
    }
    const { audio, video } = constraints
    if (audio === undefined && video === undefined) {
      console.error('( ◕ ◞ ◕ ) nn.askForStream: the constraints object must have at least an audio or video property')
      return null
    }
    const validate = (v, name) => {
      if (typeof v !== 'boolean' && (typeof v !== 'object' || v === null)) {
        console.error(`( ◕ ◞ ◕ ) nn.askForStream: ${name} must be true, false, or a constraints object`)
      }
    }
    if (audio !== undefined) validate(audio, 'audio')
    if (video !== undefined) validate(video, 'video')
    return await navigator.mediaDevices.getUserMedia(constraints)
  }

  static async askForCapture (constraints) {
    const opts = (typeof constraints === 'object' && constraints !== null) ? constraints : {}
    return await navigator.mediaDevices.getDisplayMedia(opts)
  }

  static async askForNotifications () {
    return await window.Notification.requestPermission()
  }

  static async askForClipboard () {
    return await navigator.clipboard.readText()
  }

  static async askForBluetooth (filters) {
    const params = (typeof filters === 'object' && filters !== null)
      ? filters
      : { acceptAllDevices: true }
    return await navigator.bluetooth.requestDevice(params)
  }

  static async askForUSB (filters) {
    const f = (typeof filters === 'object' && filters !== null) ? [filters] : []
    return await navigator.usb.requestDevice({ filters: f })
  }

  static async askForSerial (filters) {
    const f = (typeof filters === 'object' && filters !== null) ? [filters] : []
    return await navigator.serial.requestPort({ filters: f })
  }

  static async askForMotion () {
    if (typeof window.DeviceMotionEvent !== 'undefined' &&
        typeof window.DeviceMotionEvent.requestPermission === 'function') {
      return await window.DeviceMotionEvent.requestPermission()
    }
    return 'granted' // non-iOS devices don't require explicit permission
  }

  static async askForOrientation () {
    if (typeof window.DeviceOrientationEvent !== 'undefined' &&
        typeof window.DeviceOrientationEvent.requestPermission === 'function') {
      return await window.DeviceOrientationEvent.requestPermission()
    }
    return 'granted' // non-iOS devices don't require explicit permission
  }

  static MIDI (func) {
    if (typeof func !== 'function') {
      console.error('( ◕ ◞ ◕ ) nn.MIDI: requires a callback function, this will run everytime you interact with your MIDI device.')
    }

    function onMIDISuccess (midiAccess) {
      const inputs = midiAccess.inputs.values()
      for (const input of inputs) {
        console.log(`( ◕ ◞ ◕ ) nn.MIDI: ${input.name} connected!`)
        input.onmidimessage = (message) => func({
          dev: input.name, chl: message.data[1], val: message.data[2]
        })
      }
    }

    navigator.requestMIDIAccess()
      .then(onMIDISuccess)
      .catch(err => console.error(`( ◕ ◞ ◕ ) nn.MIDI: ${err}`))
  }

  static hyper (media) {
    if (!media || typeof media.currentTime === 'undefined') {
      console.error('( ◕ ◞ ◕ ) nn.hyper: first argument must be an audio or video element')
      return null
    }

    const cues = []
    let lastTime = 0
    let isSeeking = false

    // while seeking, suppress timeupdate checks
    media.addEventListener('seeking', () => { isSeeking = true })
    // once the seek lands, update lastTime so cues between old and new
    // positions are not retroactively fired
    media.addEventListener('seeked', () => {
      isSeeking = false
      lastTime = media.currentTime
    })
    // on each tick, fire any cues the playhead has naturally passed over
    media.addEventListener('timeupdate', () => {
      if (isSeeking) return
      const current = media.currentTime
      cues.forEach(cue => {
        if (cue.time > lastTime && cue.time <= current) cue.fn()
      })
      lastTime = current
    })

    const watcher = {
      at (time, fn) {
        if (typeof time !== 'number') {
          console.error('( ◕ ◞ ◕ ) nn.hyper().at: first argument must be a number (time in seconds)')
          return this
        }
        if (typeof fn !== 'function') {
          console.error('( ◕ ◞ ◕ ) nn.hyper().at: second argument must be a function')
          return this
        }
        cues.push({ time, fn })
        return this
      },
      off (time, fn) {
        if (typeof time !== 'number') {
          console.error('( ◕ ◞ ◕ ) nn.hyper().off: first argument must be a number (time in seconds)')
          return this
        }
        if (typeof fn !== 'function') {
          console.error('( ◕ ◞ ◕ ) nn.hyper().off: second argument must be a function')
          return this
        }
        // remove the first cue that matches both time and fn reference
        const idx = cues.findIndex(c => c.time === time && c.fn === fn)
        if (idx !== -1) cues.splice(idx, 1)
        return this
      }
    }

    return watcher
  }

  static askForGPS (callbackOrOptions, maybeOptions) {
    let callback = null
    let includeAlerts = {}

    // Handle arguments flexibly
    if (typeof callbackOrOptions === 'function') {
      callback = callbackOrOptions
      includeAlerts = maybeOptions || {}
    } else {
      includeAlerts = callbackOrOptions || {}
    }

    return new Promise((resolve, reject) => {
      const handleSuccess = (position) => {
        const { latitude: lat, longitude: lng } = position.coords
        const timestamp = position.timestamp
        const coords = position.coords
        const data = { lat, lng, timestamp, coords }

        if (callback) callback(data)
        resolve(data)
      }

      const handleError = (error) => {
        console.error(`( ◕ ◞ ◕ ) nn.GPS: ${error.message}`)
        reject(error)
      }

      if (!('geolocation' in navigator)) {
        const m = includeAlerts.support ||
          'oh no! your device does not support geolocation'
        console.log(`( ◕ ◞ ◕ ) nn.GPS: ${m}`)
        if (typeof includeAlerts.support === 'string') window.alert(m)
        return reject(new Error(m))
      }

      navigator.permissions.query({ name: 'geolocation' }).then(result => {
        if (result.state === 'granted' || result.state === 'prompt') {
          navigator.geolocation.getCurrentPosition(handleSuccess, handleError)
        } else if (result.state === 'denied') {
          const m = includeAlerts.enable ||
            'Please enable location services for this website in your browser settings.'
          console.log(`( ◕ ◞ ◕ ) nn.GPS: ${m}`)
          if (typeof includeAlerts.enable === 'string') window.alert(m)
          reject(new Error(m))
        }
      }).catch(err => {
        console.error('( ◕ ◞ ◕ ) nn.GPS permission check failed:', err)
        reject(err)
      })
    })
  }
}

if (typeof module !== 'undefined') module.exports = Media
else window.Media = Media

},{}],14:[function(require,module,exports){
class Music {
  static noteToMidi (note) {
    const noteRegex = /^([A-G])(b|#)?(\d+)$/
    const match = note.match(noteRegex)
    if (!match) return null

    const [, letter, accidental, octaveStr] = match
    let semitone = Music.NOTE_TO_SEMITONE[letter]
    if (accidental === '#') semitone++
    if (accidental === 'b') semitone--

    const octave = parseInt(octaveStr)
    return semitone + (octave + 1) * 12
  }

  static midiToFrequency (midi) {
    if (typeof midi !== 'number' || Number.isNaN(midi)) return null
    return 440 * Math.pow(2, (midi - 69) / 12)
  }

  static frequencyToMidi (frequency) {
    if (typeof frequency !== 'number' || frequency <= 0 || Number.isNaN(frequency)) return null
    return Math.round(12 * Math.log2(frequency / 440) + 69)
  }

  static midiToNote (midi) {
    if (typeof midi !== 'number' || Number.isNaN(midi)) return null
    const rounded = Math.round(midi)
    const semitone = ((rounded % 12) + 12) % 12
    const octave = Math.floor(rounded / 12) - 1
    return Music.SEMITONE_TO_NOTE[semitone] + octave
  }

  static noteToFrequency (note) {
    const midi = Music.noteToMidi(note)
    return midi === null ? null : Music.midiToFrequency(midi)
  }

  static frequencyToNote (frequency) {
    const midi = Music.frequencyToMidi(frequency)
    return midi === null ? null : Music.midiToNote(midi)
  }

  static randomMode () {
    const steps = []
    let total = 0

    while (total < 12) {
      const step = (Math.random() < 0.4 || total > 10) ? 1 : 2
      if (total + step <= 12) {
        steps.push(step)
        total += step
      }
    }

    // make sure there's only 7 steps
    while (steps.length !== 7) {
      if (steps.length < 7) steps.push(1)
      else steps.pop() // remove last item
    }

    return steps
  }

  static createScale (root = 'C', mode = 'major', includeEndOctave = false) {
    const modes = Music.MODES

    const steps = mode instanceof Array
      ? mode : mode === 'random'
        ? this.randomMode() : modes[mode.toLowerCase()]

    if (!steps) return null

    // parse root: pitch-class + optional octave
    const noteRegex = /^([A-G])(b|#)?(\d+)?$/
    const match = root.match(noteRegex)
    if (!match) return null

    const [, letter, accidental, octaveStr] = match
    const rootNote = letter + (accidental || '')
    let octave = octaveStr ? parseInt(octaveStr) : 4
    const annotateOctave = !!octaveStr

    const notes = Music.SEMITONE_TO_NOTE

    let idx = notes.indexOf(rootNote)
    if (idx < 0) return null

    const scale = []
    // first degree
    scale.push(annotateOctave ? rootNote + octave : rootNote)

    // build each next degree
    for (const interval of steps) {
      idx += interval
      if (idx >= notes.length) {
        idx %= notes.length
        octave++
      }
      scale.push(annotateOctave ? notes[idx] + octave : notes[idx])
    }

    // By default, omit the terminal octave note
    if (!includeEndOctave && scale.length > 0) scale.pop()
    return scale
  }

  static createChord (scale, ch = 'triad') {
    const chord = []
    const shape = ch instanceof Array ? ch : Music.CHORDS[ch.toLowerCase()]
    for (const degree of shape) {
      // Convert degree to array index
      const scaleIndex = (degree - 1) % scale.length
      const note = scale[scaleIndex]
      chord.push(note)
    }
    return chord
  }

  static rotateScale (scale, k = 0) {
    if (!Array.isArray(scale) || scale.length === 0) return []
    const n = scale.length
    const r = ((k % n) + n) % n
    if (r === 0) return scale.slice()
    return scale.slice(r).concat(scale.slice(0, r))
  }

  static transposeScale (scale, semitones = 0) {
    if (!Array.isArray(scale) || scale.length === 0 || !Number.isFinite(semitones)) return scale ? scale.slice() : scale

    return scale.map(x => {
      if (typeof x === 'number') {
        // MIDI number in, MIDI number out
        return x + semitones
      }

      if (typeof x !== 'string') return x

      // note name with optional octave?
      const m = /^([A-Ga-g])(#{1}|b{1})?(\d+)?$/.exec(x)
      if (!m) return x // unknown token; leave as-is

      const letter = m[1].toUpperCase()
      const acc = m[2] || ''
      const hasOct = m[3] != null

      if (hasOct) {
        // use midi math when octave is present
        const midi = Music.noteToMidi(letter + acc + m[3])
        return midi == null ? x : Music.midiToNote(midi + semitones)
      } else {
        // pitch-class only: wrap within 12
        let pc = Music.NOTE_TO_SEMITONE[letter]
        if (acc === '#') pc += 1
        if (acc === 'b') pc -= 1
        const wrapped = ((pc + semitones) % 12 + 12) % 12
        return Music.SEMITONE_TO_NOTE[wrapped]
      }
    })
  }

  static stripOctave (x) {
    const stripOne = (val) => {
      if (typeof val !== 'string') return val
      const m = /^([A-Ga-g])(#{1}|b{1})?(\d+)?$/.exec(val)
      if (!m) return val
      const letter = m[1].toUpperCase()
      const acc = m[2] || ''
      return letter + acc
    }

    if (Array.isArray(x)) return x.map(stripOne)
    return stripOne(x)
  }

  static voiceChord (ch, oct = 4) {
    if (!Array.isArray(ch) || ch.length === 0) return []

    let startOctave = (typeof oct === 'number' && isFinite(oct)) ? Math.floor(oct) : 4
    let prevMidi = -Infinity
    const out = []

    for (const n of ch) {
      // MIDI number input → keep numbers, ensure strictly ascending by lifting 12s
      if (typeof n === 'number' && isFinite(n)) {
        let m = Math.round(n)
        while (m <= prevMidi) m += 12
        prevMidi = m
        out.push(m)
        continue
      }

      // Non-string tokens are passed through
      if (typeof n !== 'string') { out.push(n); continue }

      // note name with optional octave
      const m = /^([A-Ga-g])(#{1}|b{1})?(\d+)?$/.exec(n)
      if (!m) { out.push(n); continue }

      const letter = m[1].toUpperCase()
      const acc = m[2] || ''
      const hasOct = m[3] != null

      let octave = hasOct ? parseInt(m[3]) : startOctave
      let midi = Music.noteToMidi(letter + acc + octave)
      if (midi == null || !isFinite(midi)) { out.push(n); continue }

      // raise by octaves until strictly above previous MIDI
      while (midi <= prevMidi) {
        octave += 1
        midi = Music.noteToMidi(letter + acc + octave)
        if (midi == null) break
      }

      prevMidi = midi
      out.push(Music.midiToNote(midi))

      // If no octave was provided, carry the updated octave forward
      if (!hasOct) startOctave = octave
    }

    return out
  }
}

Music.NOTE_TO_SEMITONE = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }
Music.SEMITONE_TO_NOTE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
Music.CHORDS = {
  'root-only': [1],
  // basic chords
  'power-chord': [1, 5], // popular in rock/punk music
  triad: [1, 3, 5], // used to derive major and minor chords (from their respective scales)
  // seventh chords, to derive major7, minor7, dominant7, dim7
  seventh: [1, 3, 5, 7],
  // extended chords
  ninth: [1, 3, 5, 7, 9], // 9th chords (major9, minor9, dominant9)
  eleventh: [1, 3, 5, 7, 9, 11], // 11th chords
  thirteenth: [1, 3, 5, 7, 9, 11, 13], // 13th chords
  // suspended chords
  sus2: [1, 2, 5], // suspended 2nd
  sus4: [1, 4, 5], // suspended 4th
  dominant7sus4: [1, 4, 5, 7],
  // couple more
  add9: [1, 3, 5, 9],
  'six-chord': [1, 3, 5, 6]
}
Music.MODES = {
  // greek modes
  ionian: [2, 2, 1, 2, 2, 2, 1], // major
  dorian: [2, 1, 2, 2, 2, 1, 2],
  phrygian: [1, 2, 2, 2, 1, 2, 2],
  lydian: [2, 2, 2, 1, 2, 2, 1],
  mixolydian: [2, 2, 1, 2, 2, 1, 2],
  aeolian: [2, 1, 2, 2, 1, 2, 2], // minor
  locrian: [1, 2, 2, 1, 2, 2, 2],
  // greek extended
  phrygiandominant: [1, 3, 1, 2, 1, 2, 2],
  'dorian-b2': [1, 2, 2, 2, 2, 1, 2],
  'lydian-augmented': [2, 2, 2, 2, 1, 2, 1],
  'lydian-b7': [2, 2, 2, 1, 2, 1, 2],
  'mixolydian-b13': [2, 2, 1, 2, 1, 2, 2],
  'locrian-#2': [2, 1, 2, 1, 2, 2, 2],
  'super-locrian': [1, 2, 1, 2, 2, 2, 2],
  // other modes
  major: [2, 2, 1, 2, 2, 2, 1],
  minor: [2, 1, 2, 2, 1, 2, 2],
  'harmonic-minor': [2, 1, 2, 2, 1, 3, 1],
  'melodic-minor': [2, 1, 2, 2, 2, 2, 1],
  'major-pentatonic': [2, 2, 3, 2, 3],
  'minor-pentatonic': [3, 2, 2, 3, 2],
  blues: [3, 2, 1, 1, 3, 2],
  'minor-blues': [2, 1, 2, 1, 1, 1, 2, 2],
  'major-blues': [2, 1, 1, 1, 1, 1, 2, 1, 2],
  augmented: [2, 2, 2, 2, 2, 2],
  diminished: [2, 1, 2, 1, 2, 1, 2, 1],
  'jazz-melodic-minor': [2, 1, 2, 2, 2, 2, 1],
  'whole-half-diminished': [2, 1, 2, 1, 2, 1, 2, 1],
  'half-whole-diminished': [1, 2, 1, 2, 1, 2, 1, 2],
  enigmatic: [1, 3, 2, 2, 2, 1, 1],
  'double-harmonic': [1, 3, 1, 2, 1, 3, 1],
  'hungarian-minor': [2, 1, 3, 1, 1, 3, 1],
  persian: [1, 3, 1, 1, 2, 3, 1],
  arabian: [2, 2, 1, 1, 2, 2, 2],
  japanese: [1, 4, 2, 1, 4],
  egyptian: [2, 3, 2, 3, 2],
  hirajoshi: [2, 1, 4, 1, 4]
}

if (typeof module !== 'undefined') module.exports = Music
else window.Music = Music

},{}],15:[function(require,module,exports){
const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const times = (n, fn) => {
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
}

const range = (startOrEnd, end, stepOrMap, maybeMap) => {
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
}

if (typeof module !== 'undefined') module.exports = { sleep, times, range }

},{}]},{},[1]);
