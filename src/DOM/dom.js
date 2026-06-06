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
