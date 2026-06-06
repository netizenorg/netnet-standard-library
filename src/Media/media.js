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
