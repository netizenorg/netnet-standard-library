const UTILS_DOCS = [
  {
    name: 'sleep',
    source: { filepath: 'Utils/utils.js', start: 1, end: 3 },
    signature: 'nn.sleep(ms)',
    description: 'Returns a `Promise` that resolves after `ms` milliseconds. Use it with `async`/`await` to pause execution inside an async function without blocking the rest of the page.',
    friendly: 'This method pauses your code for a given number of milliseconds before continuing. Use it with <code>await</code> inside an <code>async</code> function, for example <code>await nn.sleep(1000)</code> waits one second.',
    params: [
      { name: 'ms', description: 'The number of milliseconds to wait.' }
    ],
    returns: 'A `Promise` that resolves after the given delay.',
    example: `// adjust css so any child element gets centered
nn.get('body').css({
  background: 'rebeccapurple',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

// create a square div, add it to the boyd
const box = nn.create('div')
  .addTo('body')
  .size(100)
  .css('background', 'coral')

async function pulse () {
  // fade out
  box.css('opacity', 0.1)
  await nn.sleep(500) // wait half a second
  // fade back in
  box.css('opacity', 1)
  await nn.sleep(500) // wait half a second
  // call function again
  pulse()
}

// start the loop once the page has loaded
nn.on('load', pulse) `
  },

  {
    name: 'times',
    source: { filepath: 'Utils/utils.js', start: 5, end: 18 },
    signature: 'nn.times(n, fn)',
    description: 'Calls `fn` exactly `n` times, passing the current index (`0`-based) as the argument each time, and returns an array of the return values. A concise alternative to writing a `for` loop when you want to build a collection or run a side effect a fixed number of times.',
    friendly: 'This method calls a function a specific number of times, a shorthand for writing a <code>for</code> loop. For example, <code>nn.times(5, draw)</code> calls your <code>draw</code> function five times in a row.',
    params: [
      { name: 'n', description: 'How many times to call the function.' },
      { name: 'fn', description: 'The function to call. Receives the current index as its argument.' }
    ],
    returns: 'An array of the values returned by each call to `fn`.',
    example: `// set page's body layout to css flex-box
nn.get('body').css({
  background: 'rebeccapurple',
  display: 'flex',
  flexWrap: 'wrap',
  gap: 10
})

function randomColorDiv () {
  const hue = nn.random(360)
  // create a box with random hue background
  nn.create('div')
    .addTo('body')
    .size(60)
    .css({
      background: nn.hsl(hue, 80, 65),
      borderRadius: 8
    })
}

// call randomColorDiv() 12 times
nn.times(12, randomColorDiv)`
  },

  {
    name: 'range',
    source: { filepath: 'Utils/utils.js', start: 20, end: 59 },
    signature: 'nn.range(end) / nn.range(start, end, step?, map?)',
    description: 'Generates an array of numbers from `start` (default `0`) up to but not including `end`, incrementing by `step` (default `1`). An optional `map` function can be passed as the last argument to transform each value before it is added to the array. Counting downward is supported by passing a negative `step` or by having `start` greater than `end`.',
    friendly: 'This method generates an array of numbers between a start and end value. For example, <code>nn.range(1, 5)</code> gives you <code>[1, 2, 3, 4]</code>, which you can then loop over to create or position things.',
    params: [
      { name: 'start', description: 'The starting value (optional, defaults to `0`).' },
      { name: 'end', description: 'The end value (exclusive).' },
      { name: 'step', description: 'The increment between values (optional, defaults to `1` or `-1`).' },
      { name: 'map', description: 'An optional function `(value, index) => newValue` applied to each entry.' }
    ],
    returns: 'An array of numbers (or mapped values).',
    example: `// set page's body layout to css flex-box
nn.get('body').css({
  background: 'rebeccapurple',
  display: 'flex',
  alignItems: 'flex-end',
  gap: 6
})

function createBar (n) {
  // create a vertical bar
  // each bar's height is mapped from the
  // value n passed into this function
  nn.create('div')
    .addTo('body')
    .size(40, n * 30)
    .css({
      background: 'coral',
      borderRadius: '4px 4px 0 0'
    })
}

// build a little bar chart using range
// we create an array of values 1-9
// then we call createBar passing it each value
nn.range(1, 9).forEach(createBar)`
  }
]

if (typeof module !== 'undefined') module.exports = UTILS_DOCS
else window.UTILS_DOCS = UTILS_DOCS
