const DATA_DOCS = [
  {
    name: 'loadData',
    source: { filepath: 'Data/data.js', start: 149, end: 164 },
    signature: 'nn.loadData(path, type?)',
    description: 'Fetches a file at `path` and returns its contents as parsed data. For `.json` files it returns a JavaScript object or array. For `.csv` files it returns an array of objects, one per row, with keys taken from the header row. For any other extension, the raw text is returned. Pass an optional `type` string (`\'json\'` or `\'csv\'`) to override the extension-based detection.',
    params: [
      { name: 'path', description: 'The URL or relative path to the file.' },
      { name: 'type', optional: true, description: 'Optional format override: `\'json\'` or `\'csv\'`.' }
    ],
    returns: 'A `Promise` resolving with the parsed data.',
    example: `// use "async" so we can "await" the data load
async function setup () {
  // load and parse a CSV file into an array of objects
  const data = await nn.loadData('artists.csv')
  // each row becomes an object with keys from the header
  data.forEach(artist => {
    nn.create('p')
      .content(artist.name + ' — ' + artist.movement)
      .addTo('body')
  })
}

nn.on('load', setup)`
  },

  {
    name: 'parseCSV',
    source: { filepath: 'Data/data.js', start: 2, end: 73 },
    signature: 'nn.parseCSV(csvText)',
    description: 'Parses a CSV string into an array of objects. The first row is treated as the header and becomes the keys for each object. Handles quoted fields and escaped double-quotes. Returns `undefined` if the input is empty or missing headers.',
    params: [
      { name: 'csvText', description: 'A string of CSV data with a header row.' }
    ],
    returns: 'An array of objects, one per row, with keys from the header row.',
    example: `// set up the page
nn.get('body').css({
  background: 'rebeccapurple',
  color: 'white',
  fontFamily: 'monospace',
  padding: 20
})

// a small CSV string (you could also load this from a file)
const csv = \`name,movement,born
Frida Kahlo,Surrealism,1907
Wassily Kandinsky,Expressionism,1866
Georgia O'Keeffe,Modernism,1887\`

// parse the CSV into an array of objects
const artists = nn.parseCSV(csv)

// render each artist as a line of text
artists.forEach(artist => {
  nn.create('p')
    .content(artist.name + ' (' + artist.movement + ', b.' + artist.born + ')')
    .addTo('body')
})`
  },

  {
    name: 'parseJSON',
    source: { filepath: 'Data/data.js', start: 75, end: 77 },
    signature: 'nn.parseJSON(jsonText)',
    description: 'Parses a JSON string into a JavaScript object or array. This is a thin wrapper around `JSON.parse()`. For auto-detecting format between CSV and JSON, see `nn.parseData()`.',
    params: [
      { name: 'jsonText', description: 'A valid JSON string.' }
    ],
    returns: 'The parsed JavaScript value (object, array, string, number, etc.).',
    example: `// set up the page
nn.get('body').css({
  background: 'rebeccapurple',
  color: 'white',
  fontFamily: 'monospace',
  padding: 20
})

// a JSON string (you could also load this from a file)
const json = \`[
  { "name": "Frida Kahlo",        "movement": "Surrealism"   },
  { "name": "Wassily Kandinsky",  "movement": "Expressionism"},
  { "name": "Georgia O'Keeffe",   "movement": "Modernism"    }
]\`

// parse the JSON string into an array of objects
const artists = nn.parseJSON(json)

// render each artist
artists.forEach(artist => {
  nn.create('p')
    .content(artist.name + ' — ' + artist.movement)
    .addTo('body')
})`
  },

  {
    name: 'parseData',
    source: { filepath: 'Data/data.js', start: 124, end: 137 },
    signature: 'nn.parseData(data)',
    description: 'Automatically detects whether a string is JSON or CSV and parses it accordingly. Strings that start with `{` or `[` are treated as JSON; everything else is treated as CSV. Useful when you want one function that handles both formats without caring which one you have.',
    params: [
      { name: 'data', description: 'A JSON or CSV string.' }
    ],
    returns: 'The parsed data — an object or array for JSON, an array of objects for CSV.',
    example: `// set up the page
nn.get('body').css({
  background: 'rebeccapurple',
  color: 'white',
  fontFamily: 'monospace',
  padding: 20
})

// parseData works with CSV...
const csv = \`name,movement
Frida Kahlo,Surrealism
Georgia O'Keeffe,Modernism\`

const fromCSV = nn.parseData(csv)
nn.create('p').content('from CSV: ' + fromCSV[0].name).addTo('body')

// ...and also with JSON
const json = '[{"name":"Kandinsky","movement":"Expressionism"}]'

const fromJSON = nn.parseData(json)
nn.create('p').content('from JSON: ' + fromJSON[0].name).addTo('body')`
  },

  {
    name: 'stringifyCSV',
    source: { filepath: 'Data/data.js', start: 79, end: 118 },
    signature: 'nn.stringifyCSV(arrayOfObjects)',
    description: 'Converts an array of objects into a CSV string. The keys of the first object become the header row. Values containing commas or quotes are automatically escaped. All objects in the array should share the same keys.',
    params: [
      { name: 'arrayOfObjects', description: 'An array of plain objects to serialize.' }
    ],
    returns: 'A CSV string with a header row.',
    example: `// set up the page
nn.get('body').css({
  background: 'rebeccapurple',
  color: 'white',
  fontFamily: 'monospace',
  padding: 20
})

// an array of objects to convert
const artists = [
  { name: 'Frida Kahlo',       movement: 'Surrealism',    born: 1907 },
  { name: 'Wassily Kandinsky', movement: 'Expressionism', born: 1866 },
  { name: "Georgia O'Keeffe",  movement: 'Modernism',     born: 1887 }
]

// convert to a CSV string
const csv = nn.stringifyCSV(artists)

// display the raw CSV text
nn.create('pre').content(csv).addTo('body')`
  },

  {
    name: 'stringifyJSON',
    source: { filepath: 'Data/data.js', start: 120, end: 122 },
    signature: 'nn.stringifyJSON(data)',
    description: 'Converts a JavaScript value into a JSON string. This is a thin wrapper around `JSON.stringify()`. For auto-detecting format between CSV and JSON, see `nn.stringifyData()`.',
    params: [
      { name: 'data', description: 'Any JSON-serialisable value — object, array, string, number, boolean, or null.' }
    ],
    returns: 'A JSON string.',
    example: `// set up the page
nn.get('body').css({
  background: 'rebeccapurple',
  color: 'white',
  fontFamily: 'monospace',
  padding: 20
})

// some data to convert
const artists = [
  { name: 'Frida Kahlo',       movement: 'Surrealism'    },
  { name: 'Wassily Kandinsky', movement: 'Expressionism' }
]

// convert to a JSON string
const json = nn.stringifyJSON(artists)

// display the raw JSON text
nn.create('pre').content(json).addTo('body')`
  },

  {
    name: 'stringifyData',
    source: { filepath: 'Data/data.js', start: 139, end: 147 },
    signature: 'nn.stringifyData(data)',
    description: 'Automatically picks the best format for serializing your data. An array of plain objects is converted to CSV; everything else is converted to JSON. The inverse of `nn.parseData()`.',
    params: [
      { name: 'data', description: 'The data to serialize.' }
    ],
    returns: 'A CSV string for arrays of objects, or a JSON string for everything else.',
    example: `// set up the page
nn.get('body').css({
  background: 'rebeccapurple',
  color: 'white',
  fontFamily: 'monospace',
  padding: 20
})

// an array of objects → stringifyData picks CSV
const artists = [
  { name: 'Frida Kahlo',       movement: 'Surrealism'    },
  { name: 'Wassily Kandinsky', movement: 'Expressionism' }
]
const asCSV = nn.stringifyData(artists)
nn.create('p').content('as CSV:').addTo('body')
nn.create('pre').content(asCSV).addTo('body')

// anything else → stringifyData picks JSON
const config = { theme: 'dark', fontSize: 14 }
const asJSON = nn.stringifyData(config)
nn.create('p').content('as JSON:').addTo('body')
nn.create('pre').content(asJSON).addTo('body')`
  }
]

if (typeof module !== 'undefined') module.exports = DATA_DOCS
else window.DATA_DOCS = DATA_DOCS
