const DATA_DOCS = [
  {
    name: 'parse',
    source: { filepath: 'src/Data/data.js', start: 113, end: 131 },
    signature: 'nn.parse(str, options?)',
    description: 'Parses a string into JavaScript data. Automatically detects whether the string is JSON or CSV. JSON strings (starting with `{` or `[`) are parsed with `JSON.parse()`. CSV strings are parsed into an array of objects using the first row as keys, or into a 2D array if you pass `{ headers: false }`.',
    friendly: 'This method converts a raw text string (like CSV or JSON) into actual JavaScript data you can work with. For example, if you fetch a spreadsheet from the web, passing the resulting text through this method turns it into an array of objects.',
    params: [
      { name: 'str', description: 'A JSON or CSV string.' },
      { name: 'options', optional: true, description: 'An optional options object. Pass `{ headers: false }` to parse CSV without a header row, returning a 2D array instead of an array of objects.' }
    ],
    returns: 'For JSON: the parsed object or array. For CSV with headers: an array of objects. For CSV without headers: a 2D array of strings.',
    example: `// we can use a spreadsheet, like Google Sheets, as
// a simple database, here's a link to one I made:
// https://docs.google.com/spreadsheets/d/1unMunzrHrWiqtaMRcuFm0PBVoY5ujfa3Ga6FJvp0Jgo/edit?usp=sharing

// below is the CSV text url for the sheet above
const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR1vmAj_vEbkvcbJbsrWGUrlhVJU_zYNe8F3280ud7wGakMTYXM7DCBOH2mlb_KOROkFtROBxT0zwlb/pub?output=csv'
// to make data accessible to my code, in settings:
// Share > Publish to Web, and then selecting
// "Comma-separated values (csv)" as the format.

let data // global varible for storing our data

async function setup () {
  // fetch the spreadsheet from the URL
  const req = await fetch(url)
  // pull out the text from the sheet
  const csv = await req.text()
  // convert it into structured data
  data = nn.parse(csv)

  // set up the page's styles
  nn.get('body').css({
    // full screen background image
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    // flebox layout, centered content
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  })

  // run draw after data has loaded
  draw()
}

function draw () {
  // pick a random item from the CSV
  const item = nn.random(data)

  // clear page's previous content
  // and update the background
  nn.get('body')
    .content('')
    .css('background-image', \`url(\${item.image})\`)

  // create text using data from CSV
  const m = \`I was just thinking about \${item.name}, my \${item.relation}.\`

  nn.create('p')
    .content(m)
    .css({
      padding: 20,
      background: nn.rgb(0, 0, 0, 0.75),
      color: 'white',
      fontFamily: 'monospace',
      cursor: 'pointer'
    })
    .addTo('body')
    .on('click', draw) // re-run draw on click
}

// run setup as soon as page loads
nn.on('load', setup)`
  },

  {
    name: 'serialize',
    source: { filepath: 'src/Data/data.js', start: 133, end: 148 },
    signature: 'nn.serialize(data, format?)',
    description: 'Converts JavaScript data into a string. By default, an array of plain objects becomes CSV and everything else becomes JSON. The inverse of `nn.parse()`. Pass `\'csv\'` or `\'json\'` as the second argument to override the auto-detection.',
    friendly: 'This method converts JavaScript data into a plain text string so it can be saved or sent somewhere. An array of objects becomes CSV text, and everything else becomes JSON text.',
    params: [
      { name: 'data', description: 'The data to serialize.' },
      { name: 'format', optional: true, description: 'Optional format override: `\'csv\'` or `\'json\'`. If omitted, an array of plain objects produces CSV and anything else produces JSON.' }
    ],
    returns: 'A CSV string for arrays of plain objects, or a JSON string for everything else.',
    example: `// set up the page
nn.get('body').css({
  background: 'rebeccapurple',
  padding: 20
})

// an array of objects
const artists = [
  { name: 'Frida Kahlo',  movement: 'Surrealism'    },
  { name: 'Kandinsky',    movement: 'Expressionism'  }
]

// convert artists data into CSV text
const csv = nn.serialize(artists)
// display that CSV data in a <textarea>
nn.create('textarea')
  .size(300, 70)
  .content(csv)
  .addTo('body')

// conver artists data into JSON text
const json = nn.serialize(artists, 'json')
// display that JSON data in a <textarea>
nn.create('textarea')
  .size(300, 70)
  .content(json)
  .addTo('body')`
  },

  {
    name: 'download',
    source: { filepath: 'src/Data/data.js', start: 127, end: 195 },
    signature: 'nn.download(data, filename?)',
    description: 'Triggers a file download in the browser. Automatically detects the type of data and picks the right format and file extension. Also returns the serialized string (or data URL for canvas/images) so you can use the result without downloading if needed. The `filename` argument is optional, if omitted a sensible default is used.',
    friendly: 'This method saves something to the user\'s computer as a file download. You can pass it a canvas, an image, an SVG, or plain data, and it automatically picks the right file format and extension.',
    params: [
      { name: 'data', description: 'What to download. A `&lt;canvas&gt;` or `&lt;img&gt;` → `.png` (or `.jpg`). An `&lt;svg&gt;` → `.svg`. Any other DOM element → `.html`. An array of plain objects → `.csv`. Anything else → `.json`. A plain string → saved as-is `.txt`' },
      { name: 'filename', optional: true, description: 'Optional filename including extension, e.g. `\'mysketch.png\'` or `\'results.csv\'`. Defaults: canvas → `sketch.png`, data → `data.csv` or `data.json`, element → `page.html`.' }
    ],
    returns: 'The data URL string for canvas/image downloads, or the serialized string for everything else.',
    example: `// set up a canvas to draw on
const canvas = nn.create('canvas')
  .resize(400, 400)
  .addTo('body')

// draw a simple circle
canvas.fillColor = 'rebeccapurple'
canvas.rect(0, 0, canvas.width, canvas.height)
canvas.fillColor = 'coral'
canvas.circle(200, 200, 80)

// clicking the canvas saves it as a JPG
canvas.on('click', () => {
  nn.download(canvas, 'my-sketch.jpg')
})`
  },

  {
    name: 'upload',
    source: { filepath: 'src/Data/data.js', start: 197, end: 248 },
    signature: 'nn.upload(options?)',
    description: 'Opens the browser\'s file picker and returns a `Promise` that resolves with a result object containing `name` (filename), `size` (bytes), `type` (MIME type), and `data` (the parsed contents). Images, video, and audio files resolve with a URL string as `data` (ready to assign to `img.src`, `video.src`, or `audio.src`), `.csv` files with an array of objects, `.json` files with a parsed object, and everything else with raw text. Pass an options object to restrict file types, limit file size, or allow multiple files.',
    friendly: 'This method opens the browser\'s file picker so the user can choose a file from their computer. It returns the file\'s contents already parsed, so images come back as a URL you can display, and CSV or JSON files come back as usable data.',
    params: [
      { name: 'options', optional: true, description: 'An optional configuration object with any of: `types` (array of MIME type strings to accept, e.g. `[\'image/*\', \'text/csv\']`), `maxSize` (max file size in KB), `filter` (a function `(file) => boolean` for custom validation), `multiple` (set `true` to allow picking multiple files, returns an array), `headers` (set `false` to parse CSV without a header row).' }
    ],
    returns: 'A `Promise` resolving with `{ name, size, type, data }` on success, or `{ name, size, type, error }` if the file failed validation. `data` is a URL string for images, video, and audio, an array of objects for CSV, a parsed object for JSON, or raw text otherwise. With `multiple: true`, resolves with an array of such objects.',
    example: `// set up the page
nn.get('body').css({
  background: 'rebeccapurple',
  color: 'white',
  fontSize: 20,
  padding: 40,
  cursor: 'pointer'
})

// container to hold image once uploaded
const output = nn.create('div').addTo('body')

// upload function
async function uploadImage () {
  // clear previous output content
  output.content('')

  // open the file picker
  const file = await nn.upload({
    types: ['image/*'], // must be image file...
    maxSize: 4000 // ...less than 4MB
  })

  // if there's an error, display it
  if (file.error) {
    output.content(file.error)
  } else { // otherwise create an <img> from data
    nn.create('img')
      .set('src', file.data)
      .addTo(output)
  }
}

// create upload button
nn.create('button')
  .content('upload image')
  .addTo('body')
  .on('click', uploadImage)`
  }
]

if (typeof module !== 'undefined') module.exports = DATA_DOCS
else window.DATA_DOCS = DATA_DOCS
