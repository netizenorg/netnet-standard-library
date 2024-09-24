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
      document.querySelector(parent).appendChild(this)
      return this
    }

    ele.set = function (obj) {
      if (typeof obj !== 'object') {
        console.error('nn: the .set() method is expecting an object of HTML attributes and values')
      }
      for (const prop in obj) {
        const val = obj[prop]
        if (prop === 'stream') {
          if (!(val instanceof window.MediaStream)) {
            console.error('nn: when passing a "stream" property to .set() the value should a "Promise" which will resolve to a MediaStream object.')
          }
          ele.srcObject = val
        } else {
          ele.setAttribute(prop, val)
        }
      }
      return this
    }

    ele.css = function (obj) {
      if (typeof obj !== 'object') {
        console.error('nn: the .css() method is expecting an object of CSS properties and values')
      }
      for (const prop in obj) {
        const val = obj[prop]
        const rightValueType = typeof val === 'string' || typeof val === 'number'
        if (!rightValueType) {
          console.error('nn: the CSS values in the object passed to .css() should be strings or a numbers')
        } else if (typeof val === 'string') {
          this.style[prop] = val
        } else if (typeof val === 'number') {
          this.style[prop] = val
          if (this.style[prop] === '') {
            this.style[prop] = val + 'px'
          }
        }

        if (rightValueType && this.style[prop] === '') {
          console.error(`nn: "${val}" is not a valid value for the "${prop}" property in CSS`)
        }
      }
      return this
    }

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
