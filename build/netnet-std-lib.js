(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (process){(function (){
/* global DocumentTouch */
/*
    Averigua
    -----------
    by Nick Briz <nickbriz@gmail.com>
    GNU GPLv3 - https://www.gnu.org/licenses/gpl-3.0.txt
    2019

    -----------
       info
    -----------

    A vanilla JS class that checks for all the things i'm always checking for.

    -----------
       usage
    -----------

    Averigua.isNode()         // Boolean
    Averigua.isBrowser()      // Boolean
    Averigua.isMobile()       // Boolean

    Averigua.hasWebGL()       // Boolean
    Averigua.hasWebVR()       // Boolean
    Averigua.hasMIDI()        // Boolean
    Averigua.hasTouch()       // Boolean

    Averigua.doNotTrack()     // Boolean

    Averigua.language()       // returns object with language and country
    Averigua.timeZone()       // String

    Averigua.orientation()    // String (landscape, portrait or no-support)
    Averigua.screen()         // returns object with screen info

    Averigua.gpuInfo()        // returns object with GPU info
    Averigua.browserInfo()    // returns object with browser info
    Averigua.platformInfo()   // returns object with platform info

    Averigua.audioSupport()   // returns object with audio support info
    Averigua.videoSupport()   // returns object with video support info
    Averigua.pluginSupport()  // returns array with plugin info objects
    Averigua.storageSupport() // returns object with web storage support info
    Averigua.fontSupport()    // returns array of supported fonts
*/
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
    let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []
    let tem
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || []
      return 'IE ' + (tem[1] || '')
    }
    if (M[1] === 'Chrome') {
      tem = ua.match(/\b(OPR|Edge)\/(\d+)/)
      if (tem !== null) return tem.slice(1).join(' ').replace('OPR', 'Opera')
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?']
    if ((tem = ua.match(/version\/(\d+)/i)) !== null) M.splice(1, 1, tem[1])
    // check for Brave browser
    if (window.navigator.brave &&
        window.navigator.brave.isBrave.name === 'isBrave') {
      M[0] = 'Brave'; M[1] = null
    }
    return { name: M[0], version: M[1] }
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
},{"_process":7,"os":6}],2:[function(require,module,exports){
/*
    Color
    -----------
    by Nick Briz <nickbriz@gmail.com>
    GNU GPLv3 - https://www.gnu.org/licenses/gpl-3.0.txt
    2019

    -----------
       info
    -----------

    A vanilla JS class with common Color maths

    -----------
       usage
    -----------

    // hsv && hsl methods that start w/an underscore expect/return values like:
    // { h: 0-1, s: 0-1, v: 0-1 }
    // where as those that don't expect/return values like:
    // { h: 0-360, s: 0-100, v: 0-100 }

    Color.alpha2hex(a)
    Color.hex2alpha(hex)

    Color._hex2rgb(hex)
    Color.hex2rgb(hex)
    Color._hex2hsl(hex)
    Color.hex2hsl(hex)
    Color._hex2hsv(hex)
    Color.hex2hsv(hex)

    Color._rgb2hex(r, g, b)
    Color.rgb2hex(r, g, b)
    Color._rgb2hsl(r, g, b)
    Color.rgb2hsl(r, g, b)
    Color._rgb2hsv(r, g, b)
    Color.rgb2hsv(r, g, b)

    Color._hsl2hex(h, s, l)
    Color.hsl2hex(h, s, l)
    Color._hsl2rgb(h, s, l)
    Color.hsl2rgb(h, s, l)
    Color._hsl2hsv(h, s, l)
    Color.hsl2hsv(h, s, l)

    Color._hsv2hex(h, s, v)
    Color.hsv2hex(h, s, v)
    Color._hsv2rgb(h, s, v)
    Color.hsv2rgb(h, s, v)
    Color._hsv2hsl(h, s, v)
    Color.hsv2hsl(h, s, v)

    // creates a random color string
    Color.random()

    // also accepts two optional arguments, type and alpha
    // type can be: 'hex', 'rgb', 'rgba', 'hsl' or 'hsla'
    // alpha can be a float value (0.0 - 1.0) or a boolean
    Color.random(type, alpha)

    // determines whether a hex or rgb color string is light or dark
    // returns true for light colors and false for dark colors
    Color.isLight(colorString)

    // match method takes a string and returns the first color string it finds
    // in the form of a parsed array (if no color is found it returns null)
    // for example:

    Color.match('color: rgba(34, 56, 88, 0.5); font-size: 23px;')
    // returns ["rgb", "rgba(34, 56, 88, 0.5)", "34", "56", "88", "0.5"]
*/
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
    if (hex.length === 9) hex = hex.substring(0, 7)
    else if (hex.length === 5) hex = hex.substring(0, 4)
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

  static _rgb2hsl (r, g, b) { // (1, 0, 0) => { h: 0, s: 1, l: 0.5 }
    const c = this._rgb2hsv(r, g, b)
    return this._hsv2hsl(c.h, c.s, c.v)
  }

  static rgb2hsl (r, g, b) { // (255, 0, 0) => { h: 0, s: 100, l: 50 }
    const c = this._rgb2hsv(r / 255, g / 255, b / 255)
    const o = this._hsv2hsl(c.h, c.s, c.v)
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
    // const c = this._hsl2rgb(h, s, l)
    // return this._rgb2hex(c.r, c.g, c.b)
    const f = this._hsl2rgb(h, s, l)

    const toHex = x => {
      const hex = Math.round(x * 255).toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }

    return `#${toHex(f.r)}${toHex(f.g)}${toHex(f.b)}`
  }

  static hsl2hex (h, s, l) { // (0, 100, 50) => '#ff0000'
    // const c = this.hsl2rgb(h, s, l)
    // return this.rgb2hex(c.r, c.g, c.b)
    h /= 360
    s /= 100
    l /= 100

    return this._hsl2hex(h, s, l)
  }

  static _hsl2rgb (h, s, l) { // (0, 1, 0.5) => { r: 1, g: 0, b: 0 }
    h = h * 360
    const a = s * Math.min(l, 1 - l)
    const f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return { r: f(0), g: f(8), b: f(4) }
  }

  static hsl2rgb (h, s, l) { // (0, 100, 50) => { r: 255, g: 0, b: 0 }
    const scale = (num, inMin, inMax, outMin, outMax) => {
      return (num - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
    }
    h = Math.round(scale(h, 0, 360, 0, 1) * 10) / 10
    s = Math.round(scale(s, 0, 100, 0, 1) * 10) / 10
    l = Math.round(scale(l, 0, 100, 0, 1) * 10) / 10

    const c = this._hsl2rgb(h, s, l)

    return {
      r: Math.ceil(c.r * 255),
      g: Math.ceil(c.g * 255),
      b: Math.ceil(c.b * 255)
    }
  }

  static _hsl2hsv (h, s, l) { // (0, 1, 0.5) => { h: 0, s: 1, v: 1 }
    l *= 2
    s *= (l <= 1) ? l : 2 - 1
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

  // ~ ~ ~
    
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
      hex = `#${(Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6)}`
      return a ? hex + a : hex
    }
  }

  // via: https://awik.io/determine-color-bright-dark-using-javascript/
  static isLight (color) {
    // Variables for red, green, blue values
    let r, g, b
    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {
      // If RGB --> store the red, green, blue values in separate variables
      color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/)
      r = color[1]
      g = color[2]
      b = color[3]
    } else {
      // If hex --> Convert it to RGB: http://gist.github.com/983661
      color = +('0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&'))
      r = color >> 16
      g = color >> 8 & 255
      b = color & 255
    }

    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b))

    // Using the HSP value, determine whether the color is light or dark
    return hsp > 127.5
  }

  static match (str) {
    const hexRegex = /#[a-f\d]{3}(?:[a-f\d]?|(?:[a-f\d]{3}(?:[a-f\d]{2})?)?)\b/
    const hex = str.match(hexRegex)
    const rgbRegex = /rgba?\((?:(25[0-5]|2[0-4]\d|1?\d{1,2}|(?:\d{1,2}|100)%),\s*(25[0-5]|2[0-4]\d|1?\d{1,2}|(?:\d{1,2}|100)%),\s*(25[0-5]|2[0-4]\d|1?\d{1,2}|(?:\d{1,2}|100)%)(?:,\s*((?:\d{1,2}|100)%|0(?:\.\d+)?|1))?|(25[0-5]|2[0-4]\d|1?\d{1,2}|(?:\d{1,2}|100)%)\s+(25[0-5]|2[0-4]\d|1?\d{1,2}|(?:\d{1,2}|100)%)\s+(25[0-5]|2[0-4]\d|1?\d{1,2}|(?:\d{1,2}|100)%)(?:\s+((?:\d{1,2}|100)%|0(?:\.\d+)?|1))?)\)/
    const rgb = str.match(rgbRegex)
    const hslRegex = /hsla?\((?:(-?\d+(?:deg|g?rad|turn)?),\s*((?:\d{1,2}|100)%),\s*((?:\d{1,2}|100)%)(?:,\s*((?:\d{1,2}|100)%|0(?:\.\d+)?|1))?|(-?\d+(?:deg|g?rad|turn)?)\s+((?:\d{1,2}|100)%)\s+((?:\d{1,2}|100)%)(?:\s+((?:\d{1,2}|100)%|0(?:\.\d+)?|1))?)\)/
    const hsl = str.match(hslRegex)
    if (hex) return ['hex', ...hex]
    else if (rgb) return ['rgb', ...rgb]
    else if (hsl) return ['hsl', ...hsl]
    else return null
  }
}

if (typeof module !== 'undefined') module.exports = Color

},{}],3:[function(require,module,exports){
/* global alert */
/*
    FileUploader
    -----------
    by Nick Briz <nickbriz@gmail.com>
    GNU GPLv3 - https://www.gnu.org/licenses/gpl-3.0.txt
    2019

    -----------
       info
    -----------

    this class for quickly handling file uploads via clicking on elements or
    drag and dropping onto elements.

    -----------
       usage
    -----------

    const fu = new FileUploader({
      maxSize: 1000,                        // limit max file size in kb
      types: ['image/jpeg','audio/mpeg3'],  // limit allowed file mime types
      filter: callback,                      // or alternative callback filter
      click: '#button',                     // selector for clickable element
      drop: '#background',                  // selector for drag&drop element
      dropping: callback,                   // runs when file is dragged over
      dropped: callback,                    // runs when file has been dropped
      ready: callback,                      // runs when data is ready
      error: callback,                      // runs when there's an error
    })

*/
class FileUploader {
  constructor (config) {
    this.clickEle = document.querySelectorAll(config.click)
    this.dropEle = document.querySelector(config.drop)
    this.dropping = config.dropping
    this.dropped = config.dropped
    this.maxSize = config.maxSize
    this.types = config.types
    this.filter = config.filter
    this.error = config.error
    this.ready = (typeof config.ready === 'function') ? config.ready
      : this.err('missing "ready" callback to constructor to handle data')

    if (this.clickEle) this.createClickable()

    if ('draggable' in document.createElement('span')) {
      if (this.dropEle) {
        this.dropEle.addEventListener('dragenter', (e) => this.dndEnter(e), false)
        this.dropEle.addEventListener('dragover', (e) => this.dndOver(e), false)
        this.dropEle.addEventListener('drop', (e) => this.dndDrop(e), false)
      }
    } else {
      this.err('your browser does not support drag and drop')
    }
  }

  err (message) {
    if (this.error) this.error(message)
    console.error(`FileUploader: ${message}`)
  }

  createClickable () {
    this.input = document.createElement('input')
    this.input.setAttribute('type', 'file')
    this.input.setAttribute('hidden', true)
    document.body.appendChild(this.input)
    this.input.addEventListener('change', (e) => {
      this.readFile(this.input.files[0])
    })
    for (let i = 0; i < this.clickEle.length; i++) {
      this.clickEle[i].addEventListener('click', () => {
        this.input.click()
      })
    }
  }

  dndEnter (e) {
    e.stopPropagation()
    e.preventDefault()
    if (this.dropping) this.dropping(this.dropEle)
  }

  dndOver (e) {
    e.stopPropagation()
    e.preventDefault()
  }

  dndDrop (e) {
    e.stopPropagation()
    e.preventDefault()
    if (this.dropped) this.dropped(this.dropEle)
    if (e.dataTransfer.files.length > 1) {
      alert('You can only drag and drop one file at a time.')
    } else this.readFile(e.dataTransfer.files[0])
  }

  isAllowed (type) {
    if (this.types) {
      return this.types.indexOf(type) > -1
    } else if (this.filter) {
      return this.filter(type)
    } else return true
  }

  readFile (file) {
    const maxBytes = (this.maxSize) ? this.maxSize * 1000 : Infinity
    if (typeof FileReader !== 'undefined' &&
      this.isAllowed(file.type) &&
      file.size <= maxBytes) {
      const reader = new window.FileReader()
      reader.onload = (e) => {
        this.handleFile(file.name, file.type, e.target.result)
      }
      reader.readAsDataURL(file)
    } else {
      if (typeof FileReader === 'undefined' && this.error) {
        this.error('browser does not support FileReader')
      } else if (!this.isAllowed(file.type)) {
        this.error(`attempted to upload restricted file type ${file.type}`)
      } else if (file.size > maxBytes) {
        this.error(`file larger than max size of ${maxBytes}`)
      }
    }
  }

  handleFile (name, type, data) {
    this.ready({ name, type, data })
  }
}

if (typeof module !== 'undefined') module.exports = FileUploader

},{}],4:[function(require,module,exports){
/*
    Maths
    -----------
    by Nick Briz <nickbriz@gmail.com>
    GNU GPLv3 - https://www.gnu.org/licenses/gpl-3.0.txt
    2019

    -----------
       info
    -----------

    A vanilla JS class with Math functions not included in the JS standard
    library Math object

    -----------
       usage
    -----------

    Maths.norm(value, min, max)
    Maths.clamp(value, min, max)
    Maths.lerp(valueA, valueB, t)
    Maths.map(value, sourceMin, sourceMax, destMin, destMax)

    Maths.dist(p1x, p1y, p2x, p2y)
    Maths.angleBtw(p1x, p1y, p2x, p2y)

    Maths.radToDeg(radians)
    Maths.degToRad(degrees)
    Maths.cartesianToPolar(x, y)
    Maths.polarToCartesian(distance, angle)

    Maths.shuffle(array)
    Maths.randomInt(min, max)
    Maths.randomFloat(min, max)
    Maths.random(val, val2)
    Maths.perlin()

    Maths.easeInQuad(t)
    Maths.easeOutQuad(t)
    Maths.easeInOutQuad(t)
    Maths.easeInCubic(t)
    Maths.easeOutCubic(t)
    Maths.easeInOutCubic(t)
    Maths.easeInQuart(t)
    Maths.easeOutQuart(t)
    Maths.easeInOutQuart(t)
    Maths.easeInQuint(t)
    Maths.easeOutQuint(t)
    Maths.easeInOutQuint(t)
    Maths.easeInSine(t)
    Maths.easeOutSine(t)
    Maths.easeInOutSine(t)
    Maths.easeInCirc(t)
    Maths.easeOutCirc(t)
    Maths.easeInOutCirc(t)
    Maths.easeInElastic(t)
    Maths.easeOutElastic(t)
    Maths.easeInOutElastic(t)
    Maths.easeInExpo(t)
    Maths.easeOutExpo(t)
    Maths.easeInOutExpo(t)
    Maths.easeInBack(t)
    Maths.easeOutBack(t)
    Maths.easeInOutBack(t)
    Maths.easeInBounce(t)
    Maths.easeOutBounce(t)
*/
class Maths {
  static norm (value, min, max) { return (value - min) / (max - min) }

  static clamp (value, min, max) { return Math.max(min, Math.min(max, value)) }

  static lerp (a, b, t) { return (1 - t) * a + t * b }

  static _lerp (norm, min, max) { return (max - min) * norm + min }

  static map (value, sourceMin, sourceMax, destMin, destMax) {
    return this._lerp(this.norm(value, sourceMin, sourceMax), destMin, destMax)
  }

  static dist (p1x, p1y, p2x, p2y) {
    return Math.sqrt(Math.pow(p2x - p1x, 2) + Math.pow(p2y - p1y, 2))
  }

  static angleBtw (p1x, p1y, p2x, p2y) {
    return Math.atan2(p2x - p1x, p2y - p1y)
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
    if (val instanceof Array) {
      return val[Math.floor(Math.random() * val.length)]
    } else {
      let min, max
      if (val && !val2) {
        min = 0; max = val
      } else if (val && val2) {
        min = val; max = val2
      } else {
        min = 0; max = 1
      }
      return this.randomFloat(min, max)
    }
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
      memory: {},
      get: function (x, y) {
        y = y || 0
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

},{}],5:[function(require,module,exports){
const Color = require('./Color/Color.js')
const Maths = require('./Maths/Maths.js')
const Averigua = require('./Averigua/Averigua.js')

window.nn = {
  _mouseX: 0,
  _mouseY: 0,
  _trackingMouse: false,
  _trackMouse: function () {
    window.addEventListener('mousemove', (e) => {
      this._mouseX = e.clientX
      this._mouseY = e.clientY
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
  * @method isMobile
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
  * // coule return something like
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
  * // coule return something like
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
  * @method randomFloat
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
  * @class fileUploader
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
  * const fu = new FileUploader({
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
  * const fu = new FileUploader({
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
  fileUploader: require('./FileUploader/FileUploader.js')
}

},{"./Averigua/Averigua.js":1,"./Color/Color.js":2,"./FileUploader/FileUploader.js":3,"./Maths/Maths.js":4}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{}]},{},[5]);
