class Media {
  static loadImage (url) {
    return new Promise((resolve, reject) => {
      // const img = new window.Image()
      const img = this.create('img')
      img.addEventListener('load', () => resolve(img))
      img.addEventListener('error', (err) => reject(err))
      img.src = url
    })
  }

  static async modifyPixels (image, algorithm) {
    // validation
    if (typeof image === 'string') {
      if (image.indexOf('data:image') !== 0) {
        console.error('( ◕ ◞ ◕ ) nn.modifyPixels: string data passed into the first argument must be a base64 encoded image')
      }
    } else if (!(image instanceof window.Image)) {
      console.error('( ◕ ◞ ◕ ) nn.modifyPixels: the first argument must either be a base64 encoded image or an HTML image element')
    }

    if (typeof algorithm !== 'function') {
      console.error('( ◕ ◞ ◕ ) nn.modifyPixels: the second argument must be a function, the algorithm you want to use to process the image')
    }
    // ..........
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!(image instanceof window.Image)) {
      image = await window.nn.loadImage(image)
    }

    canvas.width = image.width
    canvas.height = image.height
    ctx.drawImage(image, 0, 0)
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const imgdata = imageData.data
    algorithm(imgdata)
    ctx.putImageData(imageData, 0, 0)
    const data = canvas.toDataURL()
    image.src = data

    return { image, canvas, data }
  }

  static async askFor (opts) {
    // just an alias for "askForStream" for now
    return await this.askForStream(opts)
  }

  static async askForStream (constraints) {
    if (typeof constraints !== 'object' || constraints === null) {
      console.error('( ◕ ◞ ◕ ) nn.askFor: you forgot to pass an argument, should be something like { video: true }')
    }

    const { audio, video } = constraints

    if (audio === undefined && video === undefined) {
      console.error('( ◕ ◞ ◕ ) nn.askFor: the object you passed must have at least an audio or video property.')
    }

    const validateMediaConstraints = (media, mediaName) => {
      if (typeof media === 'boolean') {
        return null
      } else if (typeof media === 'object' && media !== null) {
        return null
      } else {
        return `${mediaName} property should be either true, false or an object with media parameters`
      }
    }

    if (audio) {
      const err = validateMediaConstraints(audio, 'audio')
      if (err) console.error(`( ◕ ◞ ◕ ) nn.askFor: ${err}`)
    } else if (video) {
      const err = validateMediaConstraints(video, 'video')
      if (err) console.error(`( ◕ ◞ ◕ ) nn.askFor: ${err}`)
    }

    const stream = await navigator.mediaDevices.getUserMedia(constraints)
    return stream
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
