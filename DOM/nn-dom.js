class DOM {
  static on (event, callback) {
    const eve = ['afterprint', 'appinstalled', 'beforeinstallprompt', 'beforeprint', 'beforeunload', 'blur', 'copy', 'cut', 'devicemotion', 'deviceorientation', 'deviceorientationabsolute', 'error', 'focus', 'gamepadconnected', 'gamepaddisconnected', 'hashchange', 'languagechange', 'load', 'message', 'messageerror', 'offline', 'online', 'orientationchange', 'Deprecated', 'pagehide', 'pageshow', 'paste', 'popstate', 'rejectionhandled', 'resize', 'storage', 'unhandledrejection', 'unload', 'keydown', 'keypress', 'keyup', 'losecapture', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'mousewheel', 'move', 'moveend', 'movestart', 'click', 'contextmenu', 'dblclick']
    if (typeof event !== 'string') {
      console.error('nn: the first argument to the .on() method should be an event type written as a string')
    } else if (typeof callback !== 'function') {
      console.error('nn: the second argument to the .on() method should be a function you want to call "on" that event')
    }
    window.addEventListener(event, callback)
    if (!eve.includes(event)) console.warn(`nn: you might want to make sure that '${event}' is a valid window event type`)
  }

  static create (type) {
    const eles = ['html', 'base', 'head', 'link', 'meta', 'style', 'title', 'body', 'address', 'article', 'aside', 'footer', 'header', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hgroup', 'main', 'nav', 'section', 'blockquote', 'dd', 'div', 'dl', 'dt', 'figcaption', 'figure', 'hr', 'li', 'ol', 'p', 'pre', 'ul', 'a', 'abbr', 'b', 'bdi', 'bdo', 'br', 'cite', 'code', 'data', 'dfn', 'em', 'i', 'kbd', 'mark', 'q', 'rb', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'small', 'span', 'strong', 'sub', 'sup', 'time', 'u', 'var', 'wbr', 'area', 'audio', 'img', 'map', 'track', 'video', 'embed', 'iframe', 'object', 'param', 'picture', 'source', 'svg', 'math', 'canvas', 'noscript', 'script', 'del', 'ins', 'caption', 'col', 'colgroup', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'button', 'datalist', 'fieldset', 'form', 'input', 'label', 'legend', 'meter', 'optgroup', 'option', 'output', 'progress', 'select', 'textarea', 'details', 'dialog', 'menu', 'summary', 'slot', 'template', 'acronym', 'applet', 'basefont', 'bgsound', 'big', 'blink', 'center', 'command', 'content', 'dir', 'element', 'font', 'frame', 'frameset', 'image', 'isindex', 'keygen', 'listing', 'marquee', 'menuitem', 'multicol', 'nextid', 'nobr', 'noembed', 'noframes', 'plaintext', 'shadow', 'spacer', 'strike', 'tt', 'xmp']
    if (!eles.includes(type)) console.warn(`nn: are you sure that '${type}' is a valid HTMLElement?`)
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
    const eve = ['activate', 'afterupdate', 'beforeactivate', 'beforecopy', 'beforecut', 'beforedeactivate', 'beforeeditfocus', 'beforepaste', 'beforeupdate', 'blur', 'click', 'contextmenu', 'controlselect', 'copy', 'cut', 'dblclick', 'deactivate', 'drag', 'dragend', 'dragenter', 'dragleave', 'dragover', 'dragstart', 'drop', 'errorupdate', 'filterchange', 'focus', 'focusin', 'focusout', 'help', 'input', 'keydown', 'keypress', 'keyup', 'losecapture', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'mousewheel', 'move', 'moveend', 'movestart', 'paste', 'propertychange', 'readystatechange', 'resize', 'resizeend', 'resizestart', 'selectstart', 'timeerror']
    const mev = ['abort', 'canplay', 'canplaythrough', 'durationchange', 'emptied', 'encrypted', 'ended', 'error', 'loadeddata', 'loadedmetadata', 'loadstart', 'pause', 'play', 'playing', 'progress', 'ratechange', 'seeked', 'seeking', 'stalled', 'suspend', 'timeupdate', 'volumechange', 'waiting']

    const ele = (query instanceof window.HTMLElement) ? query : document.querySelector(query)

    if (typeof query === 'string' && !ele) {
      console.error(`nn.get: couldn't find an HTML element matching the CSS selector query "${query}"`)
      return undefined
    } else if (!ele) {
      return undefined
    }

    ele.on = function (event, callback) {
      if (typeof event !== 'string') {
        console.error('nn: the first argument to the .on() method should be an event type written as a string')
      } else if (typeof callback !== 'function') {
        console.error('nn: the second argument to the .on() method should be a function you want to call "on" that event')
      }
      this.addEventListener(event, callback)
      const es = (this instanceof window.HTMLMediaElement) ? [...eve, ...mev] : eve
      if (!es.includes(event)) console.warn(`nn: you might want to make sure that this element has a '${event}' event type`)
      return this
    }

    ele.content = function (c) {
      if (typeof c !== 'string') {
        console.error('nn: the .content() method is expecting some content as a string')
      }
      this.innerHTML = c
      return this
    }

    ele.addTo = function (parent) {
      if (typeof parent !== 'string' && !(parent instanceof window.HTMLElement)) {
        console.error('nn: the .addTo() method expects either a CSS query selector string or an HTMLElement')
      }
      if (this.parentNode) this.remove()
      if (parent instanceof window.HTMLElement) parent.appendChild(this)
      else document.querySelector(parent).appendChild(this)
      return this
    }

    ele.set = function (obj, val) {
      const setAttr = (prop, val) => {
        if (prop === 'stream') {
          if (!(val instanceof window.MediaStream)) {
            console.error('nn: when passing a "stream" property to .set() the value should a "Promise" which will resolve to a MediaStream object.')
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

      if (typeof obj === 'string' && typeof val !== 'undefined') {
        setAttr(obj, val)
      } else if (typeof obj === 'object' && !val) {
        for (const prop in obj) {
          const val = obj[prop]
          setAttr(prop, val)
        }
      } else {
        console.error('nn: the .set() method expects two arguments, an HTML attribute and value, or an object of HTML attributes and values')
      }
      return this
    }

    ele.css = function (obj, val) {
      if (typeof obj === 'string' && typeof val !== 'undefined') {
        const prop = obj; obj = {}; obj[prop] = val
      } else if (typeof obj !== 'object') {
        console.error('nn: the .css() method expects two arguments, a CSS property and value, or an object of CSS properties and values')
      }

      for (const prop in obj) {
        const val = obj[prop]
        const rightValueType = typeof val === 'string' || typeof val === 'number'
        if (!rightValueType) {
          console.error('nn: the CSS values in the object passed to .css() should be strings or a numbers')
        } else if (typeof val === 'string') {
          this.style[prop] = val
        } else if (typeof val === 'number') {
          const before = this.style[prop]
          this.style[prop] = val
          if (this.style[prop] === '' || before === this.style[prop]) {
            this.style[prop] = val + 'px'
          }
        }

        if (rightValueType && this.style[prop] === '') {
          console.error(`nn: "${val}" is not a valid value for the "${prop}" property in CSS`)
        }
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
        console.error(`nn: the .position(x) method expects the first argument to be a number, but you passed a ${typeof x}`)
      } else if (typeof y !== 'number' && typeof y !== 'undefined' && y !== null) {
        console.error(`nn: the .position(x, y) method expects the second argument to be a number, but you passed a ${typeof y}`)
      } else if (typeof type !== 'string' && typeof type !== 'undefined' && type !== null) {
        console.error(`nn: the .position(x, y, type) method expects the third argument to be a string, specificaly a type of CSS positioning: ${types.map(s => `"${s}"`).join(', ')}`)
      } else if (typeof type === 'string' && !types.includes(type)) {
        console.error(`nn: the .position(x, y, type) method expects the third argument to be a valid CSS positioning value, specificaly: ${types.map(s => `"${s}"`).join(', ')}`)
      }
      y = y || this.y
      this.style.position = type || 'absolute'
      const ox = this.__nn_positionOrigin === 'center' ? -(this.width / 2) : 0
      const oy = this.__nn_positionOrigin === 'center' ? -(this.height / 2) : 0
      this.style.left = ox + x + 'px'
      this.style.top = oy + y + 'px'
      return this
    }

    ele.positionOrigin = function (type) {
      if (type !== 'center' && type !== 'default' && type !== null && type !== undefined) {
        console.error('nn: the .positionOrigin() method expects either "center" or "default" (which is top/left)')
      }
      if (type === 'center') this.__nn_positionOrigin = 'center'
      else this.__nn_positionOrigin = 'default'
      return this
    }

    // getters for box properties
    // -------------------------------------------------
    const avoid = (e) => {
      return e instanceof window.HTMLIFrameElement ||
        // e instanceof window.HTMLVideoElement ||
        e instanceof window.HTMLImageElement ||
        e instanceof window.HTMLCanvasElement
    }
    const box = ['x', 'y', 'width', 'height', 'top', 'left', 'bottom', 'right']
    box.forEach(prop => {
      const sizeProp = (prop === 'width' || prop === 'height')
      if (typeof ele[prop] !== 'number' || ele[prop] === 0) {
        if (sizeProp && avoid(ele)) return
        Object.defineProperty(ele, prop, {
          get: function () { return this.getBoundingClientRect()[prop] },
          configurable: true
        })
      }
    })

    return ele
  }
}

if (typeof module !== 'undefined') module.exports = DOM
else window.DOM = DOM
