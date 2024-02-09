class Data {
  static parseCSV (csvText) {
    if (typeof csvText !== 'string') {
      console.error('nn: parseCSV() method expects a string of CSV data as it\'s first argument')
      return
    } else if (csvText.trim().length === 0) {
      console.error('nn: the CSV string is empty')
      return
    }

    // Initialize state variables
    const records = []
    let record = []
    let field = ''
    let insideQuotes = false

    for (let i = 0; i < csvText.length; i++) {
      const char = csvText[i]
      const nextChar = csvText[i + 1]

      if (char === '"' && field === '' && !insideQuotes) {
        // Start of a quoted field
        insideQuotes = true
        continue
      } else if (char === '"' && insideQuotes) {
        if (nextChar === '"') {
          // Double quotes inside quoted field, add a single quote to the field
          field += char
          i++ // Skip the next character
        } else {
          // End of a quoted field
          insideQuotes = false
        }
        continue
      } else if (char === ',' && !insideQuotes) {
        // End of a field
        record.push(field.trim())
        field = ''
        continue
      } else if (char === '\n' && !insideQuotes) {
        // End of a record
        record.push(field.trim())
        records.push(record)
        record = []
        field = ''
        continue
      } else {
        // Part of a field
        field += char
      }
    }

    // Handle last field and record (if not empty)
    if (field !== '' || record.length > 0) {
      record.push(field.trim())
      records.push(record)
    }

    // Extract headers
    const headers = records.shift()
    if (!headers || headers.length === 0) {
      console.error('nn: the CSV data is missing its headers')
      return
    }

    // Convert records into objects
    return records.map(record => {
      return headers.reduce((object, header, index) => {
        object[header] = record[index]
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
