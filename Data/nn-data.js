class Data {
  static parseCSV (csvText) {
    if (typeof csvText !== 'string') {
      console.error('nn: parseCSV() method expects a string of CSV data as it\'s first argument')
      return
    } else if (csvText.trim().length === 0) {
      console.error('nn: the CSV string is empty')
      return
    }

    const lines = csvText.trim().split('\n')
    if (lines.length === 0) {
      console.error('nn: no data was found in the CSV string')
      return
    }

    const headers = lines.shift().split(',')
    if (headers.length === 0) {
      console.error('nn: the CSV data is missing it\'s headers')
      return
    }

    const isValidCSV = lines.every(line => line.split(',').length === headers.length)
    if (!isValidCSV) {
      console.error('nn: the CSV data is malformed. Each row must have the same number of elements as the header.')
      return
    }

    return lines.map(line => {
      const values = line.split(',').map(value => {
        // Trim whitespace
        let trimmedValue = value.trim()
        // Remove surrounding double quotes if present
        if (trimmedValue.startsWith('"') && trimmedValue.endsWith('"')) {
          trimmedValue = trimmedValue.substring(1, trimmedValue.length - 1)
        }
        return trimmedValue
      })
      return headers.reduce((object, header, index) => {
        object[header] = values[index]
        return object
      }, {})
    })
  }

  static parseJSON (jsonText) {
    return JSON.parse(jsonText)
  }

  static stringifyCSV (arrayOfObjects) {
    if (!Array.isArray(arrayOfObjects)) {
      console.error('nn: stringifyCSV() is expecting an array of objects')
      return
    } else if (arrayOfObjects.length === 0) {
      console.error('nn: the array passed to stringifyCSV() is empty')
      return
    }

    const allObjectsValid = arrayOfObjects.every(obj => typeof obj === 'object' && obj !== null && Object.keys(obj).length > 0)
    if (!allObjectsValid) {
      console.error('nn: all items in the array passed to stringifyCSV() must be non-empty objects')
      return
    }

    const headers = Object.keys(arrayOfObjects[0])

    // const allObjectsHaveSameKeys = arrayOfObjects.every(obj =>
    //   Object.keys(obj).length === headers.length &&
    //   headers.every(header => obj[header])
    // )
    // if (!allObjectsHaveSameKeys) {
    //   console.warn('nn: not all the objects in the array passed to stringifyCSV() have the same keys, this could pose an issue.')
    // }

    // Map the array of objects to a CSV string
    const rows = arrayOfObjects.map(obj => {
      return headers.map(header => {
        // Handle values that contain commas or newlines
        const value = `${obj[header]}` // Ensure the value is a string
        return `"${value.replace(/"/g, '""')}"` // Escape double quotes
      }).join(',')
    })
    // Combine headers and rows
    const csv = [
      headers.join(','), // Join headers to create the header row
      ...rows // Spread rows array
    ].join('\n') // Join with newline characters to form the CSV string
    return csv
  }

  static stringifyJSON (data) {
    return JSON.stringify(data)
  }

  static parseData (data) {
    if (typeof data === 'string') {
      if (data.trim().startsWith('{') || data.trim().startsWith('[')) {
        try {
          return this.parseJSON(data)
        } catch (error) {
          console.error('nn: there was an error parsing your JSON string')
          console.error(error)
        }
      } else return this.parseCSV(data)
    } else {
      return this.parseJSON(data)
    }
  }

  static stringifyData (data) {
    // Determine format based on data structure
    if (Array.isArray(data) && data.every(item => typeof item === 'object' && !Array.isArray(item))) {
      // Data is an array of objects, suitable for CSV format
      return this.stringifyCSV(data)
    } else {
      return this.stringifyJSON(data)
    }
  }

  static async loadData (path, type) {
    const getExt = (fp) => {
      const idx = fp.lastIndexOf('.')
      return (idx === -1) ? '' : fp.substring(idx + 1)
    }
    const ext = type || getExt(path)
    const res = await window.fetch(path)
    if (ext === 'json') {
      const data = await res.json()
      return data
    } else {
      const data = await res.text()
      if (ext === 'csv') return this.parseCSV(data)
      else return data
    }
  }
}

if (typeof module !== 'undefined') module.exports = Data
else window.Data = Data
