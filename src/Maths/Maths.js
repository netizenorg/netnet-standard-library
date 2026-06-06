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
