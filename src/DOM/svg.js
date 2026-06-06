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
