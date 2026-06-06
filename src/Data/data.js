class Data {
  // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
  // internal helpers
  // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

  static _parseCSV (csvText, headers) {
    const records = []
    let record = []
    let field = ''
    let insideQuotes = false

    for (let i = 0; i < csvText.length; i++) {
      const char = csvText[i]
      const nextChar = csvText[i + 1]
      if (char === '"' && field === '' && !insideQuotes) {
        insideQuotes = true
        continue
      } else if (char === '"' && insideQuotes) {
        if (nextChar === '"') { field += char; i++ } else insideQuotes = false
        continue
      } else if (char === ',' && !insideQuotes) {
        record.push(field.trim())
        field = ''
        continue
      } else if (char === '\n' && !insideQuotes) {
        record.push(field.trim())
        records.push(record)
        record = []
        field = ''
        continue
      } else {
        field += char
      }
    }

    if (field !== '' || record.length > 0) {
      record.push(field.trim())
      records.push(record)
    }

    if (!headers) return records

    const headerRow = records.shift()
    if (!headerRow || headerRow.length === 0) {
      console.error('( ◕ ◞ ◕ ) nn.parse: the CSV data is missing its headers')
      return null
    }

    return records.map(row =>
      headerRow.reduce((obj, key, i) => {
        obj[key] = row[i]
        return obj
      }, {})
    )
  }

  static _stringifyCSV (arrayOfObjects) {
    const headers = Object.keys(arrayOfObjects[0])
    const rows = arrayOfObjects.map(obj =>
      headers.map(h => {
        const value = String(obj[h])
        return '"' + value.replace(/"/g, '""') + '"'
      }).join(',')
    )
    return [headers.join(','), ...rows].join('\n')
  }

  static _triggerDownload (filename, href, isObjectURL) {
    const a = document.createElement('a')
    a.href = href
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    if (isObjectURL) URL.revokeObjectURL(href)
  }

  static _blobDownload (str, mimeType, filename) {
    const blob = new Blob([str], { type: mimeType })
    const url = URL.createObjectURL(blob)
    Data._triggerDownload(filename, url, true)
  }

  static _readFile (file, headers) {
    const meta = { name: file.name, size: file.size, type: file.type }
    if (file.type.startsWith('image/') || file.type.startsWith('video/') || file.type.startsWith('audio/')) {
      return Promise.resolve(Object.assign(meta, { data: URL.createObjectURL(file) }))
    }
    return file.text().then(text => {
      const isCSV = file.type === 'text/csv' || file.name.endsWith('.csv')
      const isJSON = file.type === 'application/json' || file.name.endsWith('.json')
      let data
      if (isCSV) data = Data._parseCSV(text, headers)
      else if (isJSON) {
        try { data = JSON.parse(text) } catch (e) { data = text }
      } else {
        data = text
      }
      return Object.assign(meta, { data })
    })
  }

  // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
  // public API
  // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

  static parse (str, options) {
    if (typeof str !== 'string') {
      console.error('( ◕ ◞ ◕ ) nn.parse: expects a string')
      return null
    }
    const opts = (typeof options === 'object' && options !== null) ? options : {}
    const headers = opts.headers !== false
    const trimmed = str.trim()
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      try {
        return JSON.parse(str)
      } catch (e) {
        console.error('( ◕ ◞ ◕ ) nn.parse: failed to parse as JSON')
        console.error(e)
        return null
      }
    }
    return Data._parseCSV(str, headers)
  }

  static serialize (data, format) {
    if (format === 'csv') {
      if (!Array.isArray(data) || !data.every(i => typeof i === 'object' && i !== null && !Array.isArray(i))) {
        console.error('( ◕ ◞ ◕ ) nn.serialize: CSV format requires an array of objects')
        return null
      }
      return Data._stringifyCSV(data)
    }
    if (format === 'json') return JSON.stringify(data)
    // auto-detect
    const isArrayOfObjects = Array.isArray(data) &&
      data.length > 0 &&
      data.every(item => typeof item === 'object' && item !== null && !Array.isArray(item))
    if (isArrayOfObjects) return Data._stringifyCSV(data)
    return JSON.stringify(data)
  }

  static download (data, filename) {
    if (data === null || data === undefined) {
      console.error('( ◕ ◞ ◕ ) nn.download: first argument cannot be null or undefined')
      return null
    }

    const isCanvas = data instanceof window.HTMLCanvasElement
    const isImg = data instanceof window.HTMLImageElement
    const isSVG = data instanceof window.SVGElement
    const isEle = data instanceof window.HTMLElement
    const isStr = typeof data === 'string'
    const isArrayOfObjects = Array.isArray(data) &&
      data.length > 0 &&
      data.every(i => typeof i === 'object' && i !== null && !Array.isArray(i))

    // canvas or image → PNG (or JPG if filename says so)
    if (isCanvas || isImg) {
      let canvas = data
      if (isImg) {
        canvas = document.createElement('canvas')
        canvas.width = data.naturalWidth || data.width
        canvas.height = data.naturalHeight || data.height
        canvas.getContext('2d').drawImage(data, 0, 0)
      }
      const isJPG = filename && /\.jpe?g$/i.test(filename)
      const ext = isJPG ? 'jpeg' : 'png'
      const dataURL = canvas.toDataURL('image/' + ext)
      Data._triggerDownload(filename || ('sketch.' + (isJPG ? 'jpg' : 'png')), dataURL, false)
      return dataURL
    }

    // SVG element → .svg
    if (isSVG) {
      const str = data.outerHTML
      Data._blobDownload(str, 'image/svg+xml', filename || 'image.svg')
      return str
    }

    // any other DOM element → .html
    if (isEle) {
      const str = data.outerHTML
      Data._blobDownload(str, 'text/html', filename || 'page.html')
      return str
    }

    // array of plain objects → .csv
    if (isArrayOfObjects) {
      const str = Data._stringifyCSV(data)
      Data._blobDownload(str, 'text/csv', filename || 'data.csv')
      return str
    }

    // any other non-string value → .json
    if (!isStr) {
      const str = JSON.stringify(data)
      Data._blobDownload(str, 'application/json', filename || 'data.json')
      return str
    }

    // string: infer filename from content if none provided
    let name = filename
    if (!name) {
      const t = data.trim()
      if (t.startsWith('<')) name = 'page.html'
      else if (t.startsWith('{') || t.startsWith('[')) name = 'data.json'
      else name = 'file.txt'
    }
    const ext = name.split('.').pop()
    const mimeMap = {
      html: 'text/html',
      json: 'application/json',
      csv: 'text/csv',
      svg: 'image/svg+xml',
      txt: 'text/plain'
    }
    Data._blobDownload(data, mimeMap[ext] || 'text/plain', name)
    return data
  }

  static upload (options) {
    const opts = (typeof options === 'object' && options !== null) ? options : {}
    const types = opts.types || []
    const maxSize = opts.maxSize || null
    const filter = opts.filter || null
    const multiple = opts.multiple || false
    const headers = opts.headers !== false

    return new Promise(resolve => {
      const input = document.createElement('input')
      input.type = 'file'
      if (types.length > 0) input.accept = types.join(',')
      if (multiple) input.multiple = true

      input.addEventListener('cancel', () => resolve(multiple ? [] : null))

      input.addEventListener('change', async () => {
        const files = Array.from(input.files)

        const results = await Promise.all(files.map(async file => {
          const meta = { name: file.name, size: file.size, type: file.type }
          if (maxSize !== null && file.size > maxSize * 1024) {
            return Object.assign(meta, { error: 'exceeds maxSize of ' + maxSize + 'KB' })
          }
          if (types.length > 0) {
            const matched = types.some(t =>
              t.endsWith('/*') ? file.type.startsWith(t.slice(0, -1)) : file.type === t
            )
            if (!matched) {
              return Object.assign(meta, { error: 'does not match accepted types' })
            }
          }
          if (filter !== null && !filter(file)) {
            return Object.assign(meta, { error: 'rejected by filter' })
          }
          return Data._readFile(file, headers)
        }))

        resolve(multiple ? results : (results.length > 0 ? results[0] : null))
      })

      input.click()
    })
  }
}

if (typeof module !== 'undefined') module.exports = Data
else window.Data = Data
