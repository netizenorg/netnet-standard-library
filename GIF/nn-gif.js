/* global HTMLElement */
/*
  TODO:
    maybe moveTo should be relative to center when dealing with numbers?
    maybe add a rotation() method?
    create nn.createGif() factory method?
*/
class GIF extends HTMLElement {
  constructor (opts) {
    super()

    if (typeof opts !== 'object' && typeof opts !== 'string') {
      throw new Error('nn.GIF: expects either a string (path to the image file) or an object (with image settings)')
    }

    // cusom animation properties
    this.frames = []
    this.idx = 0
    this._dx = 1
    this._fps = opts.fps ? 1000 / opts.fps : 12
    this._palindrome = opts.palindrome ? opts.palindrome : false
    this.interval = false

    // internal image element
    this.img = document.createElement('img')
    this.appendChild(this.img)
    this._updateSrc(opts)
    this._updateSize(opts)
    this._updatePosition(opts)
    if (opts.transition) this.transition(opts.transition)
    if (opts.css) this.css(opts.css)

    // add <nn-gif> to parent element
    if (opts.parent) this.addTo(opts.parent)
    else document.body.appendChild(this)
  }

  connectedCallback () {
    // console.log('connected')
  }

  // ------ GETTERS / SETTERS for GIF Properties -------------------------------
  // ---------------------------------------------------------------------------

  get src () {
    if (this.frames.length > 0) {
      return this.frames
    } else return this.img.src
  }

  set src (opts) {
    this._updateSrc(opts)
  }

  get fps () {
    return this._fps
  }

  set fps (num) {
    const err = this._checkNum(num, 'fps')
    if (err) throw new Error(err)
    this._startInterval(this.frames, num)
  }

  get palindrome () {
    return this._palindrome
  }

  set palindrome (bool) {
    this._palindrome = bool
    this._startInterval(this.frames)
  }

  // ------- VALIDATION --------------------------------------------------------
  // these are internal methods that check to see the user is passing the right
  // arguments, if not it returns the approprate error
  // ---------------------------------------------------------------------------

  _checkParent (sel) {
    if (typeof sel !== 'string') {
      return 'nn.GIF: parent parameter expecting a CSS query string'
    } else {
      const p = document.querySelector(sel)
      if (!p) return `nn.GIF: do element was found on the page matching this selector: ${sel}`
    }
  }

  _checkNum (num, param) {
    if (typeof num !== 'number') {
      return `nn.GIF: ${param} parameter should be a number`
    }
  }

  _checkCSSVal (str, prop) {
    const regex = /^(\d+)(px|pt|em|rem|vw|vh|vmin|vmax|%)?$/
    if (!regex.test(str)) return `nn.GIF: was epxecting a valid CSS value for ${prop}`
  }

  _isImgagePath (str) {
    const regex = /\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i
    return regex.test(str)
  }

  _checkImagePaths (imgs) {
    const checkArr = () => {
      let allImages = true
      for (let i = 0; i < imgs.length; i++) {
        if (!this._isImgagePath(imgs[i])) allImages = false
      }
      return allImages
    }

    if (typeof imgs === 'string') {
      if (!this._isImgagePath(imgs)) {
        return 'nn.GIF: expecting a string which is a path to an image file.'
      }
    } else if (imgs instanceof Array) {
      if (!checkArr(imgs)) {
        return 'nn.GIF: expecting a string which is a path to an image file.'
      }
    } else if (typeof imgs === 'object') {
      if (!imgs.src) {
        return 'nn.GIF: missing the src parameter'
      } else if (typeof imgs.src === 'string') {
        if (!this._isImgagePath(imgs.src)) {
          return 'nn.GIF: src parameter should be a string which is a path to an image file.'
        }
      } else if (imgs.src instanceof Array) {
        if (!checkArr(imgs.src)) {
          return 'nn.GIF: src parameter should be a string which is a path to an image file.'
        }
      } else {
        return 'nn.GIF: src parameter should either be an image path string or Array of strings.'
      }
    }
  }

  // ------ PRIVATE METHODS ----------------------------------------------------
  // ---------------------------------------------------------------------------

  _startInterval (arr, fps) {
    this.frames = arr
    if (fps) this._fps = fps
    clearInterval(this.interval)
    this.interval = setInterval(() => {
      this.img.src = this.frames[this.idx]
      this.idx += this._dx
      if (!this._palindrome && this.idx >= this.frames.length) {
        this.idx = 0
      } else if (this._palindrome && (this.idx < 0 || this.idx >= this.frames.length)) {
        this._dx = -this._dx
        this.idx += this._dx * 2
      }
    }, 1000 / this._fps)
  }

  _updateSrc (opts) {
    if (typeof opts !== 'object' && typeof opts !== 'string') {
      throw new Error('nn.src: expects either a string (path to the image file) or an Array of strings, or an object (with image settings)')
    }

    let err = this._checkImagePaths(opts)
    if (opts.fps && !err) err = this._checkNum(opts.fps, 'fps')
    if (err) throw new Error(err)

    if (typeof opts === 'string') {
      this.img.src = opts
    } else if (opts instanceof Array) {
      this._startInterval(opts)
    } else if (typeof opts === 'object') {
      this._startInterval(opts.src, opts.fps)
    }
  }

  _updateSize (opts) {
    const check = (v, p) => {
      if (v) {
        if (typeof v === 'number') {
          this.img[p] = v
        } else if (typeof v === 'string') {
          const err = this._checkCSSVal(v, p)
          if (err) throw new Error(err)
          if (!this.style.display) this.style.display = 'inline-block'
          this.img.style[p] = '100%'
          this.style[p] = v
        }
      }
    }

    if (opts.width) check(opts.width, 'width')
    if (opts.height) check(opts.height, 'height')
  }

  _updatePosition (opts) {
    const check = (v, p) => {
      if (v) {
        if (!this.style.position) this.style.position = 'absolute'
        if (typeof v === 'string') {
          const err = this._checkCSSVal(v, p)
          if (err) throw new Error(err)
        }
        if (typeof v === 'number') this.style[p] = `${v}px`
        else this.style[p] = v
      }
    }

    if (opts.x) check(opts.x, 'left')
    if (opts.y) check(opts.y, 'top')
  }

  // ------ PUBLIC METHODS -----------------------------------------------------
  // ---------------------------------------------------------------------------

  addTo (sel) {
    const err = this._checkParent(sel)
    if (err) throw new Error(err)
    this.remove()
    document.querySelector(sel).appendChild(this)
    return this
  }

  moveTo (x, y) {
    this._updatePosition({ x, y })
    return this
  }

  resize (width, height) {
    this._updateSize({ width, height })
    return this
  }

  loop (fps, palindrome) {
    if (typeof palindrome === 'boolean') {
      this._palindrome = palindrome
    } else if (typeof palindrome !== 'undefined') {
      throw new Error('nn.GIF: the optional second argument to loop (palindrome) should be a boolean value')
    }
    const err = this._checkNum(fps, 'fps')
    if (err) throw new Error(err)
    this._startInterval(this.frames, fps)
    return this
  }

  transition (dur, easing) {
    if (typeof dur !== 'string' && typeof dur !== 'number') {
      throw new Error('nn.GIF: transition expecting either a number or string value as it\'s duration')
    }
    dur = (typeof dur === 'number') ? dur + 'ms' : dur

    const regex = /^\d+(s|ms)$/
    if (regex.test(dur)) {
      if (easing) this.style.transition = `all ${dur} ${easing}`
      else this.style.transition = `all ${dur}`
    } else {
      this.style.transition = dur
    }
    return this
  }

  css (obj) {
    if (typeof obj !== 'object') {
      throw new Error('nn.GIF: css is expecting an object of CSS properties and values')
    }
    for (const prop in obj) {
      const val = obj[prop]
      if (typeof val !== 'string') {
        throw new Error('nn.GIF: css values should be strings')
      }
      this.style[prop] = val
    }
    return this
  }
}

if (window) window.customElements.define('nn-gif', GIF)
if (typeof module !== 'undefined') module.exports = GIF
