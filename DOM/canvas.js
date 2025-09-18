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
  ele.resize = function (width, height) {
    if (typeof width !== 'number' || typeof height !== 'number') {
      throw new Error(`canvas.resize() expects two numbers, for example canvas.resize(640, 480) but you passed ${typeof width} and ${typeof height}`)
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

  ele.getPixels = function () {
    const data = this.getPixelData()
    const pixels = []
    for (let i = 0; i < data.length; i += 4) {
      pixels.push({ r: data[i], g: data[i + 1], b: data[i + 2], a: data[i + 3] })
    }
    return pixels
  }

  ele.setPixels = function (pixels, x = 0, y = 0, w, h) {
    if (!Array.isArray(pixels)) {
      throw new Error(`canvas.setPixels() expects an array of pixel objects, but you passed a ${typeof pixels}`)
    }
    w = w || this.width
    h = h || this.height
    if (typeof x !== 'number' || typeof y !== 'number' || typeof w !== 'number' || typeof h !== 'number') {
      throw new Error('canvas.setPixels() x, y, width, height must be numbers, for example canvas.setPixels(pixels, 0, 0, 100, 100)')
    }
    const imageData = this.ctx.getImageData(x, y, w, h)
    const data = imageData.data
    for (let i = 0; i < data.length; i += 4) {
      const idx = Math.floor(i / 4)
      const px = pixels[idx]
      if (!px || typeof px.r !== 'number' || typeof px.g !== 'number' || typeof px.b !== 'number' || typeof px.a !== 'number') {
        throw new Error(`canvas.setPixels() pixel at index ${idx} is invalid; each pixel needs numeric r, g, b, a properties`)
      }
      data[i] = px.r; data[i + 1] = px.g; data[i + 2] = px.b; data[i + 3] = px.a
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
    if ([x, y, w, h].some(v => typeof v !== 'number')) {
      throw new Error('canvas.rect() expects numbers, for example canvas.rect(10, 10, 100, 50)')
    }
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
    this.ctx.closePath()
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
  ele.translate = function (x, y) { if (typeof x !== 'number' || typeof y !== 'number') throw new Error('translate() expects two numbers'); this.ctx.translate(x, y); return this }
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

  // Fit buffer to parent size with devicePixelRatio scaling (clears canvas)
  ele.fitToParent = function (dpr) {
    const parent = this.parentNode
    if (!(parent instanceof window.HTMLElement)) {
      throw new Error('canvas.fitToParent() requires the canvas to be in the DOM (use .addTo() first)')
    }
    const cssW = parent.clientWidth || parent.offsetWidth
    const cssH = parent.clientHeight || parent.offsetHeight
    const ratio = (typeof dpr === 'number' && isFinite(dpr) && dpr > 0) ? dpr : (window.devicePixelRatio || 1)

    // preserve context state (do not preserve pixels)
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
      lineDash: this.ctx.getLineDash ? this.ctx.getLineDash() : [],
      lineDashOffset: this.ctx.lineDashOffset
    }

    // set CSS display size
    this.style.width = cssW + 'px'
    this.style.height = cssH + 'px'

    // set buffer size (clears canvas)
    this.width = Math.max(1, Math.floor(cssW * ratio))
    this.height = Math.max(1, Math.floor(cssH * ratio))

    // reapply state
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
    if (this.ctx.setLineDash && Array.isArray(props.lineDash)) this.ctx.setLineDash(props.lineDash)

    // scale so 1 unit = 1 CSS pixel
    if (this.ctx.setTransform) this.ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
    else this.ctx.scale(ratio, ratio)

    return this
  }

  return ele
}

if (typeof module !== 'undefined') module.exports = { augment: augmentCanvas }
else window.NNCanvas = { augment: augmentCanvas }
