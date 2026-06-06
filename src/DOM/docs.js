const DOM_DOCS = [
  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ window & events ~ ~ ~ ~ ~ ~ ~
  {
    name: 'on',
    source: { filepath: 'DOM/dom.js', start: 18, end: 56 },
    signature: 'nn.on(event, callback, options?) / ele.on(event, callback, options?)',
    description: 'Attaches an event listener. When called directly on `nn`, it listens on the `window`. When called on an element returned by `nn.get()` or `nn.create()`, it listens on that specific element and returns the element so further calls can be chained. Pass an optional third argument, a boolean (`true` for capture phase) or an [AddEventListenerOptions](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#options), to control listener behaviour.',
    friendly: 'This is an event listener, a piece of code that waits for a specific action, like a \'click\',  \'keypress\' and <a href="https://devdoc.net/web/developer.mozilla.org/en-US/docs/DOM/DOM_event_reference.1.html" target="_blank">others</a>, and then runs a function when that action happens. We specify the type of the event (a string) we want to listen for as the first argument, and pass the name of (or "reference" to) the function we want to call as the second argument.',
    params: [
      { name: 'event', description: 'The event type as a string, e.g. `\'click\'`, `\'mousemove\'`, `\'keydown\'`, `\'load\'` and <a href="https://devdoc.net/web/developer.mozilla.org/en-US/docs/DOM/DOM_event_reference.1.html" target="_blank">more</a>.' },
      { name: 'callback', description: 'The function to call when the event fires. Receives the event object as its argument.' },
      { name: 'options', optional: true, description: 'Optional. A boolean (capture phase) or an `AddEventListenerOptions` object.' }
    ],
    returns: 'For `nn.on()`: nothing. For element `.on()`: the element, so calls can be chained.',
    example: `function setup () {
  nn.create('button')
    .content('click me!')
    .addTo('body')
    .on('click', update)
  // ^ when we click the button,
  // we call the update() function
}

function update () {
  const bg = nn.randomColor()
  nn.get('body').css('background', bg)
}

// when the page loads
// we call the setup() function
nn.on('load', setup)`
  },

  {
    name: 'off',
    source: { filepath: 'DOM/dom.js', start: 58, end: 81 },
    signature: 'nn.off(event, callback, options?) / ele.off(event, callback, options?)',
    description: 'Removes an event listener previously added with `.on()`. You must pass the exact same function reference that was originally passed to `.on()`. When called on `nn`, it removes a window-level listener. When called on an element, it removes an element-level listener and returns the element for chaining.',
    friendly: 'If you had previously set an event listener with <code>.on()</code> you can remove it with <code>.off()</code>, just make sure you pass the same event type (a string) and function name to this method as you originally did with on.',
    params: [
      { name: 'event', description: 'The event type as a string, matching the one used in `.on()`.' },
      { name: 'callback', description: 'The exact same function reference that was passed to `.on()`.' },
      { name: 'options', optional: true, description: 'Optional capture/options — must match what was passed to `.on()`.' }
    ],
    returns: 'For `nn.off()`: nothing. For element `.off()`: the element.',
    example: `let dots = 0

nn.get('body').css('background', 'rebeccapurple')

function update () {
  // if there are less than 3 dots
  if (dots < 3) {
    // create a new "dot"
    nn.create('div')
      .positionOrigin('center')
      .position(nn.mouseX, nn.mouseY)
      .addTo('body')
      .size(50)
      .css({
        background: nn.randomColor(),
        borderRadius: '50%'
      })
    // increment dot count by 1
    dots++
  } else { // if there are more than 3 dots
    // remove the event listener
    nn.off('click', update)
  }
}

// when the page loads
// we call the setup() function
nn.on('click', update)`
  },

  {
    name: 'mouseX',
    source: { filepath: 'DOM/dom.js', start: 589, end: 593 },
    signature: 'nn.mouseX',
    description: 'A read-only property that returns the current horizontal mouse position in pixels, relative to the left edge of the viewport. Updated automatically whenever the mouse moves. Accessing this property for the first time starts the internal mouse tracker.',
    friendly: 'This property stores a number, the current horizontal mouse position in pixels relative to the left edge of the window',
    params: [],
    returns: 'The current mouse X position as a number.',
    example: `// update page's CSS
nn.get('body').css({
  background: 'rebeccapurple',
  margin: 0
})

// create a <div>, add it to the page
nn.create('div')
  .size(10, nn.height)
  .css('background', 'coral')
  .addTo('body')

function update () {
  // get the <div>, currently there's
  // only one on this page, and update
  // its width to match current mouse X
  nn.get('div').size(nn.mouseX, null)
}

// when the mouse moves, run update()
nn.on('mousemove', update)`
  },

  {
    name: 'mouseY',
    source: { filepath: 'DOM/dom.js', start: 594, end: 598 },
    signature: 'nn.mouseY',
    description: 'A read-only property that returns the current vertical mouse position in pixels, relative to the top edge of the viewport. Updated automatically alongside `nn.mouseX`.',
    friendly: 'This property stores a number, the current vertical mouse position in pixels relative to the top edge of the window',
    params: [],
    returns: 'The current mouse Y position as a number.',
    example: `// update page's CSS
nn.get('body').css({
  background: 'rebeccapurple',
  margin: 0
})

// create a <div>, add it to the page
nn.create('div')
  .size(nn.width, 10)
  .css('background', 'coral')
  .addTo('body')

function update () {
  // get the <div>, currently there's
  // only one on this page, and update
  // its height to match current mouse Y
  nn.get('div').size(null, nn.mouseY)
}

// when the mouse moves, run update()
nn.on('mousemove', update)`
  },

  {
    name: 'mouseDown',
    source: { filepath: 'DOM/dom.js', start: 599, end: 603 },
    signature: 'nn.mouseDown',
    description: 'A read-only boolean that is `true` while any mouse button is held down, and `false` otherwise. Updated automatically alongside `nn.mouseX` and `nn.mouseY`.',
    friendly: 'This property stores a boolean value, <code>true</code> if the mouse is currently being pressed down, or <code>false</code> if it is not.',
    params: [],
    returns: '`true` when a mouse button is pressed, `false` otherwise.',
    example: `function draw () {
  // if the mouse is pressed down
  if (nn.mouseDown) {
    // then create an <img> of a butterfly
    // at the mouse's current location
    nn.create('img')
      .set('src', 'butterfly.gif')
      .css('pointer-events', 'none')
      .set('draggable', 'false')
      .positionOrigin('center')
      .position(nn.mouseX, nn.mouseY)
      .addTo('body')
  }
}

// run draw() everytime the mouse moves
nn.on('mousemove', draw)`
  },

  {
    name: 'pointer',
    source: { filepath: 'DOM/dom.js', start: 36, end: 48 },
    signature: 'nn.pointer',
    description: 'A read-only property that returns the first currently active pointer contact as an object `{ x, y, id, type }`, or `null` when nothing is pressing or touching. `x` and `y` are viewport coordinates; `type` is `\'mouse\'`, `\'touch\'`, or `\'pen\'`. Convenient shorthand for `nn.pointers[0]` when you only need to track one contact at a time.',
    friendly: 'A pointer can be your mouse, but it could also be a pen/stylus or a finger touching a screen (on mobile devies), it\'s an object with <code>pointer.x</code> and <code>pointer.y</code> properties as well as <code>pointer.type</code> (mouse, touch or pen) and <code>pointer.id</code> (if there\'s more than one finger touching the screen)',
    params: [],
    returns: '`{ x, y, id, type }` for the first active contact, or `null`.',
    example: `// create a full-screen canvas
const canvas = nn.create('canvas')
  .resize(nn.width, nn.height)
  .position(0, 0)
  .addTo('body')

canvas.strokeColor = 'transparent'

function draw () {
  // if there aren't any pointers
  if (!nn.pointer) return // exit function
  // otherwise, draw a random colored circle
  canvas.fillColor = nn.randomColor()
  // at the pointer's position
  canvas.circle(nn.pointer.x, nn.pointer.y, 20)
}

// works with both mouse clicks and finger touches
nn.on('pointermove', draw)`
  },

  {
    name: 'pointers',
    source: { filepath: 'DOM/dom.js', start: 22, end: 35 },
    signature: 'nn.pointers',
    description: 'A read-only property that returns a live array of all currently active pointer contacts, each as `{ x, y, id, type }`. The array is empty when nothing is pressing or touching. `type` is `\'mouse\'`, `\'touch\'`, or `\'pen\'`. On a touchscreen, each simultaneous finger gets its own entry. On desktop, a mouse button press adds one entry for as long as the button is held. Because active contacts are the only entries, there is no stale "last position" ambiguity.',
    friendly: 'This is an array (or list) of "pointers", which can be a mouse, a pen/stylus or fingers touching a screen (on mobile devies). Pointers are objects with <code>p.x</code> and <code>p.y</code> properties as well as <code>p.type</code> (mouse, touch or pen)',
    params: [],
    returns: 'An array of `{ x, y, id, type }` objects — one per active contact. Empty when nothing is active.',
    example: `// create a full-screen canvas
const canvas = nn.create('canvas')
  .resize(nn.width, nn.height)
  .position(0, 0)
  .addTo('body')

canvas.strokeColor = 'transparent'

function draw () {
  // for every point (we'll call it "p")
  // in pointers, draw a random color circle
  nn.pointers.forEach(p => {
    // choose a random color
    canvas.fillColor = nn.randomColor()
    // and draw a circle at that positino
    canvas.circle(p.x, p.y, 20)
  })
}

// works with both mouse clicks and finger touches
nn.on('pointermove', draw)`
  },

  {
    name: 'width',
    source: { filepath: 'DOM/dom.js', start: 604, end: 608 },
    signature: 'nn.width / element.width',
    description: 'A read-only property with two uses. On `nn`, it returns the browser window\'s inner width in pixels (`window.innerWidth`). On an element returned by `nn.get()` or `nn.create()`, it returns the element\'s rendered width including padding and borders, sourced from `getBoundingClientRect()`.',
    friendly: 'This is either the width of the screen in pixels when <code>nn.width</code>, or of a particular element, for example <code>img.width</code>',
    params: [],
    returns: 'A number in pixels.',
    example: `// update page's CSS
nn.get('body').css({
  background: 'rebeccapurple',
  margin: 0
})

// vertical halfway point of the page
const hw = nn.width / 2

// create a <div>, add it to the page
// set it's CSS so that it's half the
// width of the page
nn.create('div')
  .size(hw, nn.height)
  .css('background', 'coral')
  .addTo('body')`
  },

  {
    name: 'height',
    source: { filepath: 'DOM/dom.js', start: 609, end: 613 },
    signature: 'nn.height / element.height',
    description: 'A read-only property with two uses. On `nn`, it returns the browser window\'s inner height in pixels (`window.innerHeight`). On an element returned by `nn.get()` or `nn.create()`, it returns the element\'s rendered height including padding and borders, sourced from `getBoundingClientRect()`.',
    friendly: 'This is either the height of the screen in piexels when <code>nn.height</code>, or of a particular element, for example <code>img.height</code>',
    params: [],
    returns: 'A number in pixels.',
    example: `// update page's CSS
nn.get('body').css({
  background: 'rebeccapurple',
  margin: 0
})

// horizontal halfway point of the page
const hh = nn.height / 2

// create a <div>, add it to the page
// set it's CSS so that it's half the
// width of the page
nn.create('div')
  .size(nn.width, hh)
  .css('background', 'coral')
  .addTo('body')`
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ selecting & creating ~ ~ ~ ~ ~ ~
  {
    name: 'get',
    source: { filepath: 'DOM/dom.js', start: 102, end: 575 },
    signature: 'nn.get(query) / element.get(query)',
    description: 'Finds an element and augments it with all of the nn helper methods (`.css()`, `.on()`, `.content()`, `.addTo()`, etc.) so you can immediately chain calls onto it. Pass a CSS selector string to search the whole document, or pass an `HTMLElement` reference directly. Elements returned by `nn.create()` are already augmented. Augmented elements also have their own `.get()` method for scoped, descendants-only queries.',
    friendly: 'When there\'s there\'s an element on your page you want to reference or modify in your JavaScript you can "get" it using this method, you can pass an elemnt type <code>.get(\'div\')</code>, a class <code>.get(\'.title\')</code> or id <code>.get(\'#title\')</code>. It will find the first element that matches the argument string.',
    params: [
      { name: 'query', description: 'A CSS selector string (e.g. `\'#myId\'`, `\'p\'`, `\'.my-class\'`) or an existing `HTMLElement` reference.' }
    ],
    returns: 'The matching element augmented with nn helper methods, or `undefined` if nothing was found.',
    example: `// the HTML page being rendered to the right
// is empty, except for a single html element
// the <body>, which we "get" and modify below
nn.get('body')
  .content('Hello World Wid Web!')
  .rotate(20)
  .css({
    background: 'rebeccapurple',
    color: 'white',
    margin: 100,
    fontSize: 40
  })`
  },

  {
    name: 'getAll',
    source: { filepath: 'DOM/dom.js', start: 95, end: 100 },
    signature: 'nn.getAll(query) / element.getAll(query)',
    description: 'Returns an array of all elements in the document matching a CSS selector, each augmented with nn helper methods. When called on an augmented element, the search is scoped to that element\'s descendants only. Returns an empty array if nothing matches.',
    friendly: 'Similar to <code>nn.get()</code>, which can be used to grab a specific element, by id for example <code>.get(\'#title\')</code>, when there\'s multiple elements on your page you want to grab all at once you can pull them into an array using this method. For example <code>nn.getAll(\'.cards\')</code> returns a list of all the elements where <code>class="cards"</code>.',
    params: [
      { name: 'query', description: 'A CSS selector string.' }
    ],
    returns: 'An array of augmented elements (may be empty).',
    example: `function setup () {
  // set up the page's CSS
  nn.get('body').css({
    background: 'rebeccapurple',
    padding: 20,
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10
  })
  // create 100 boxes
  nn.times(100, () => {
    nn.create('div')
      .addTo('body')
      .size(60)
      .css({
        background: 'white',
        opacity: 0.2,
        borderRadius: 6,
        cursor: 'pointer'
      })
  })
}

function update () {
  // get every <div>, then for each...
  nn.getAll('div').forEach(div => {
    // ...randomly update its color and opacity
    div.css({
      background: nn.randomColor(),
      opacity: nn.random(0.4, 1)
    })
  })
}

// run setup() soon as the page loads
nn.on('load', setup)
// run update() anytime we click the page
nn.on('click', update)
`
  },

  {
    name: 'create',
    source: { filepath: 'DOM/dom.js', start: 83, end: 93 },
    signature: 'nn.create(type)',
    description: 'Creates a new HTML element of the given tag name and immediately augments it with all nn helper methods. The element is not added to the page until you chain `.addTo()`.',
    friendly: 'You can use this method to dynamically create any HTML element via JavaScript. Keep in mind, it won\'t be rendered on the page until you also call `.addTo()` to inject it into a specific element, like <code>nn.create(\'input\').addTo(\'body\')</code>',
    params: [
      { name: 'type', description: 'An HTML tag name as a string, e.g. `\'div\'`, `\'p\'`, `\'canvas\'`, `\'button\'`, `\'input\'`, `\'img\'`, `\'svg\'`, etc.' }
    ],
    returns: 'The newly created element, augmented with nn helper methods.',
    example: `// style the <body> so that anything we add to
// it get's centered on the page
nn.get('body').css({
  background: 'rebeccapurple',
  color: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh'
})

// create a <span>, chain methods
nn.create('span')
  .content('👋')
  .addTo('body')

// we could also create it this way
const hi = nn.create('span')
// and apply methods this way
hi.content('hi!')
hi.addTo('body')`
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ element methods ~ ~ ~ ~ ~ ~
  {
    name: 'content',
    source: { filepath: 'DOM/dom.js', start: 183, end: 189 },
    signature: 'element.content(str)',
    description: 'Sets the `innerHTML` of the element to the provided string and returns the element so further calls can be chained. Replaces any existing content. Pass an empty string (`\'\'`) or `null` to clear the element completely.',
    friendly: 'This method is used to change the content inside of the element. Passing an empty string or <code>null</code> clears out the content of the elment',
    params: [
      { name: 'str', description: 'An HTML string to set as the element\'s inner content.' }
    ],
    returns: 'The element.',
    example: `// ger reference to <body> element
nn.get('body') // then style its CSS
  .css('background', 'rebeccapurple')
  .css('color', 'coral')
  .css('font-size', 50)
  .content('hello world!') // add content to it
`
  },

  {
    name: 'addTo',
    source: { filepath: 'DOM/dom.js', start: 225, end: 233 },
    signature: 'element.addTo(parent)',
    description: 'Appends the element to a parent and returns the element for chaining. `parent` can be a CSS selector string or an `HTMLElement` or `nn` augmented element reference. If the element already has a parent it is removed from its current location first, then re-appended to the new parent.',
    friendly: 'This method places the element onto the page by injecting it inside a parent element. For example, <code>.addTo(\'body\')</code> makes it visible by adding it inside the <code>&lt;body&gt;</code> tag.',
    params: [
      { name: 'parent', description: 'A CSS selector string or an `HTMLElement` or `nn` augmented element reference.' }
    ],
    returns: 'The element.',
    example: `// set up the page
nn.get('body').css({
  background: 'rebeccapurple',
  padding: 20
})

// create a flex container and add it to <body>
const row = nn.create('div')
  .css({ display: 'flex', gap: 10, flexWrap: 'wrap' })
  .addTo('body') // <-- using a selector string

// add 8 coloured boxes to the container element
nn.times(8, () => {
  nn.create('div')
    .size(60)
    .css({
      background: nn.randomColor(),
      borderRadius: 8
    })
    .addTo(row) // <-- using an element reference
})`
  },

  {
    name: 'set',
    source: { filepath: 'DOM/dom.js', start: 257, end: 302 },
    signature: 'element.set(obj|prop, val?)',
    description: 'Sets one or more HTML attributes on the element and returns it for chaining. Pass a property name and value, or a plain object of name/value pairs. As a shorthand, pass a CSS-selector-style string to set `class` or `id`: `.set(\'.foo\')` sets `className` to `\'foo\'`, `.set(\'.foo.bar\')` sets it to `\'foo bar\'`, and `.set(\'#my-id\')` sets the element\'s `id`. Two additional special cases: passing `\'options\'` with an array on a `&lt;select&gt;` element populates it with `&lt;option&gt;` children; passing `\'stream\'` with a `MediaStream` assigns it to `srcObject`.',
    friendly: 'This method sets HTML attributes on an element, like the <code>src</code> on an image or <code>href</code> on a link. For example <code>.set(\'src\', \'photo.jpg\')</code> tells an <code>&lt;img&gt;</code> which image file to display.',
    params: [
      { name: 'prop', description: 'An attribute name string, a plain object of attribute name/value pairs, a `\'.class-name\'` shorthand to set `className`, or a `\'#id\'` shorthand to set `id`.' },
      { name: 'val', optional: true, description: 'The attribute value. Omit when passing an object or a shorthand string as the first argument.' }
    ],
    returns: 'The element.',
    example: `// style the page
nn.get('body').css({
  background: 'rebeccapurple',
  padding: 20
})

const pic = nn.create('img')
  .set('src', 'chicago.jpg') // set a single value
  .set('alt', 'a random photo') // with two args
  .css('display', 'block')
  .css('width', 400)
  .addTo('body')

// update functio for range <input> slider
function updateSat () {
  // "this" is the slider
  pic.saturate(this.value)
}

// update function for <select> drop-down
function updateImage () {
  // "this" is the drop-down
  pic.set('src', this.value)
}

nn.create('select')
  .set('options', ['chicago.jpg', 'butterfly.gif'])
  .addTo('body')
  .on('change', updateImage)

nn.create('input')
  .size(300, null)
  .set({ // set multiple attributes at once
    type: 'range',  // by passing an object
    min: 0,
    max: 1,
    step: 0.01,
    value: 0.5
  })
  .addTo('body')
  .on('input', updateSat)
  // ^ run update() when slider changes`
  },

  {
    name: 'css',
    source: { filepath: 'DOM/dom.js', start: 267, end: 294 },
    signature: 'element.css(obj|prop, val))',
    description: 'Sets one or more inline CSS styles on the element and returns it for chaining. Pass a CSS property name and value, or a plain object of CSS property/value pairs. Property names can use camelCase, e.g. `backgroundColor`, or quoted kebab-case, `\'background-color\'`. Numeric values automatically get `\'px\'` appended when needed, so `.css(\'width\', 200)` becomes `width: 200px`.',
    friendly: 'This method applies CSS styles directly to an element, like changing its <code>background</code>, <code>width</code>, or <code>fontSize</code>. You can set one style at a time or pass an object with many styles at once.',
    params: [
      { name: 'prop', description: 'A CSS property name (camelCase or string), or an object of property/value pairs.' },
      { name: 'val', optional: true, description: 'The CSS value (string or number). Omit when passing an object as the first argument.' }
    ],
    returns: 'The element.',
    example: `// style the page
nn.get('body').css({
  background: 'rebeccapurple',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh'
})

// create a card
const card = nn.create('div')
  .css({
    background: 'coral',
    borderRadius: 12,
    padding: 20,
    fontFamily: 'monospace',
    userSelect: 'none',
    color: 'white',
    cursor: 'pointer',
    fontSize: 18
  })
  .content('click to recolor')
  .addTo('body')

// change a single CSS property on click
card.on('click', () => {
  card.css('background', nn.randomColor())
})`
  },

  {
    name: 'transition',
    source: { filepath: 'DOM/dom.js', start: 296, end: 309 },
    signature: 'element.transition(obj|prop, duration)',
    description: 'Sets a CSS `transition` on the element and returns it for chaining. Pass a property name and duration, or an object where each key is a CSS property and each value is a duration. Duration can be a number (milliseconds) or a CSS string like `\'0.3s ease-in-out\'`. This makes subsequent `.css()` and transform changes animate smoothly.',
    friendly: 'This method makes style changes animate smoothly rather than snapping instantly to their new values. For example, <code>.transition(\'background\', 500)</code> means any future background color change will smoothly fade over 500 milliseconds.',
    params: [
      { name: 'prop', description: 'A CSS property name (camelCase), or an object of property/duration pairs.' },
      { name: 'duration', optional: true, description: 'Duration as a number (ms) or a CSS timing string. Omit when passing an object.' }
    ],
    returns: 'The element.',
    example: `// style the page
nn.get('body').css({
  background: 'rebeccapurple',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh'
})

// create a box with smooth CSS transitions
const box = nn.create('div')
  .addTo('body')
  .size(100)
  .css({
    background: 'coral',
    border: '1px solid white',
    borderRadius: 8,
    cursor: 'pointer'
  })
  .transition({
    background: '0.5s ease',
    borderRadius: '0.3s ease',
    transform: '0.4s ease'
  })
  // ^ try commenting out the transition
  // block above and click on the rendered
  // square to notice the difference.

// animate the box on click
nn.on('click', () => {
  box
    .css('background', nn.randomColor())
    .css('borderRadius', nn.random(4, 50))
    .rotate(nn.random(360))
})`
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ transforms ~ ~ ~ ~ ~ ~ ~ ~
  {
    name: 'position',
    source: { filepath: 'DOM/dom.js', start: 405, end: 423 },
    signature: 'element.position(x, y, type?)',
    description: 'Positions the element using CSS `left` / `top` and returns it for chaining. By default uses `position: absolute`, but you can pass `\'relative\'`, `\'fixed\'`, or `\'sticky\'` as the third argument. If `.positionOrigin(\'center\')` was previously called, `x` and `y` refer to the element\'s center rather than its top-left corner.',
    friendly: 'This method places the element at a specific (x, y) coordinate on the page, where x is measured from the left edge and y from the top edge of the window.',
    params: [
      { name: 'x', description: 'The horizontal position in pixels.' },
      { name: 'y', description: 'The vertical position in pixels.' },
      { name: 'type', optional: true, description: 'CSS position type: `\'absolute\'` (default), `\'relative\'`, `\'fixed\'`, or `\'sticky\'`.' }
    ],
    returns: 'The element.',
    example: `// set up the page
nn.get('body').css({
  margin: 0,
  background: 'rebeccapurple',
  height: '100vh'
})

// create a dot that follows the mouse
const dot = nn.create('div')
  .size(40)
  .css({
    borderRadius: '50%',
    background: 'coral',
    pointerEvents: 'none'
  })
  // x, y will refer to the center
  .positionOrigin('center')
  // start at screen center
  .position(nn.width / 2, nn.height / 2)
  .addTo('body')

// when the mouse moves...
nn.on('mousemove', () => {
  // update the dot's position to match mouse
  dot.position(nn.mouseX, nn.mouseY)
})`
  },

  {
    name: 'positionOrigin',
    source: { filepath: 'DOM/dom.js', start: 425, end: 432 },
    signature: 'element.positionOrigin(type)',
    description: 'Controls how `.position()` interprets coordinates. Pass `\'center\'` so that `x` and `y` refer to the element\'s center point. Pass `\'default\'` (or call with no argument) to restore top-left corner behaviour. Must be set before calling `.position()`. Returns the element for chaining.',
    friendly: 'By default <code>.position(x, y)</code> places the element\'s top-left corner at those coordinates. Calling <code>.positionOrigin(\'center\')</code> first makes the coordinates point to the element\'s center instead.',
    params: [
      { name: 'type', description: '`\'center\'` coordinates target the element\'s center. `\'default\'` coordinates target the top-left corner.' }
    ],
    returns: 'The element.',
    example: `// set up the page
nn.get('body').css({
  margin: 0,
  background: 'rebeccapurple',
  height: '100vh'
})

// variables to position both boxes
// even though the (x,y) value are the same
// they appear in differnt positions
// becuase their (x,y) origins are different
const x = 200
const y = 200

// coral box: default origin (top-left at 200, 200)
nn.create('div')
  .size(80)
  .css('background', 'coral')
  .position(x, y)
  .addTo('body')

// transparent white box:
// center origin (center at 200, 200)
nn.create('div')
  .size(80)
  .css({
    background: 'white',
    opacity: 0.5
  })
  .positionOrigin('center') // <-- center origin
  .position(x, y)
  .addTo('body')`
  },

  {
    name: 'size',
    source: { filepath: 'DOM/dom.js', start: 469, end: 492 },
    signature: 'element.size(w, h?)',
    description: 'Sets the element\'s width and height. Numbers are treated as pixels; strings are used as-is so any CSS unit works, e.g. `\'100vw\'`, `\'50%\'`. If only one argument is passed the same value is applied to both width and height. Pass `null` for either dimension to leave it unchanged. If the element\'s computed `display` is `\'inline\'`, it is automatically bumped to `\'inline-block\'` (once, on the first call) so that the dimensions take effect. Returns the element for chaining.',
    friendly: 'This method sets the width and height of an element. Pass numbers to use pixels, or strings like <code>\'100vw\'</code> or <code>\'50%\'</code> for other units. Pass just one value to make it a square, or pass <code>null</code> for a dimension you want to leave unchanged.',
    params: [
      { name: 'w', description: 'Width as a number (pixels), a CSS string like `\'100vw\'`, or `null` to leave width unchanged.' },
      { name: 'h', optional: true, description: 'Height as a number (pixels), a CSS string, or `null` to leave height unchanged. Defaults to `w` if omitted (square).' }
    ],
    returns: 'The element.',
    example: `// set up the page
nn.get('body').css({
  background: 'rebeccapurple',
  margin: 0
})

nn.create('div')
  .css('background', 'coral')
  .size(120, 60) // fixed pixel size
  .position(40, 40)
  .addTo('body')

nn.create('div')
  .css('background', 'steelblue')
  .size(80) // square shorthand
  .position(40, 140)
  .addTo('body')

nn.create('div')
  .css({ background: 'gold', opacity: 0.6 })
  .size('50vw', '20vh') // CSS unit strings
  .position(0, 260)
  .addTo('body')`
  },

  {
    name: 'rotate',
    source: { filepath: 'DOM/dom.js', start: 391, end: 394 },
    signature: 'element.rotate(deg)',
    description: 'Applies a CSS `rotate()` transform to the element and returns it for chaining. Combines correctly with `scale()` and `skew()`, all three helpers share the same `transform` style string and update it non-destructively.',
    friendly: 'This method rotates the element by a given number of degrees. Positive values spin it clockwise; negative values spin it counter-clockwise.',
    params: [
      { name: 'deg', description: 'The rotation angle in degrees. Positive values rotate clockwise.' }
    ],
    returns: 'The element.',
    example: `// style the page
nn.get('body').css({
  background: 'rebeccapurple',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh'
})

function spin () {
  // becuase this function is passed to the
  // box's click listener, "this" is the box
  this.data.angle += 45
  this.rotate(this.data.angle)
}

// create a square
const box = nn.create('div')
  .size(100)
  .css({
    background: 'coral',
    cursor: 'pointer'
  })
  // if any CSS changes, transition it
  // dont' just jump to new value
  .transition('all', 500)
  .addTo('body')
  .on('click', spin)

// create an internal data property
// to track the angle (start at 0)
box.data.angle = 0`
  },

  {
    name: 'scale',
    source: { filepath: 'DOM/dom.js', start: 385, end: 389 },
    signature: 'element.scale(x, y?)',
    description: 'Applies a CSS `scale()` transform to the element and returns it for chaining. If `y` is omitted the element scales uniformly. `1` is normal size, `2` is double, `0.5` is half. Coexists on the same `transform` string as `rotate()` and `skew()`.',
    friendly: 'This method resizes the element relative to its original size. A value of <code>1</code> is normal, <code>2</code> is double the size, and <code>0.5</code> is half.',
    params: [
      { name: 'x', description: 'Horizontal scale factor (`1` = original size).' },
      { name: 'y', optional: true, description: 'Vertical scale factor. Defaults to `x` for uniform scaling.' }
    ],
    returns: 'The element.',
    example: `// style the page
nn.get('body').css({
  background: 'rebeccapurple',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh'
})

// create a box that pops when hovered
const box = nn.create('div')
  .size(100)
  .css({
    background: 'coral',
    cursor: 'pointer'
  })
  // animate any transformation changes
  // like rotate, scale or skew
  .transition('transform', '200ms ease')
  .addTo('body')

box
  .on('mouseover', () => box.scale(1.3))
  .on('mouseout', () => box.scale(1))`
  },

  {
    name: 'skew',
    source: { filepath: 'DOM/dom.js', start: 396, end: 400 },
    signature: 'element.skew(xDeg, yDeg?)',
    description: 'Applies a CSS `skew()` transform to the element. `xDeg` shears along the horizontal axis; `yDeg` shears along the vertical axis (defaults to `0`). Returns the element for chaining.',
    friendly: 'This method slants the element along the horizontal and/or vertical axis, creating a leaning or shearing effect, like italicizing a shape.',
    params: [
      { name: 'xDeg', description: 'Horizontal skew angle in degrees.' },
      { name: 'yDeg', optional: true, description: 'Vertical skew angle in degrees (defaults to `0`).' }
    ],
    returns: 'The element.',
    example: `// style the page
nn.get('body').css({
  background: 'rebeccapurple',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 16,
  height: '100vh'
})

// create a row of boxes with increasing skew
nn.times(5, i => {
  nn.create('div')
    .size(60, 80)
    .css('background', 'coral')
    .skew(i * 6)
    .addTo('body')
})`
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ css filters ~ ~ ~ ~ ~ ~ ~
  {
    name: 'blur',
    source: { filepath: 'DOM/dom.js', start: 324, end: 327 },
    signature: 'element.blur(px)',
    description: 'Applies a CSS `blur()` filter to the element. Stacks with other filter helpers (`brightness`, `grayscale`, etc.), all filter helpers share the same `filter` style string and update it non-destructively. Returns the element for chaining.',
    friendly: 'This method blurs the element, making it look out of focus. The higher the number, the blurrier it appears.',
    params: [
      { name: 'px', description: 'Blur radius in pixels. Default `0`.' }
    ],
    returns: 'The element.',
    example: `// set up the page
nn.get('body').css({
  background: 'rebeccapurple',
  padding: 20
})

function moreBlurry () {
  // becuase this function is passed to the
  // img's click listener, "this" is the img
  this.data.b += 1
  this.blur(this.data.b)
}

// create an image that blurs a little more on each click
const img = nn.create('img')
  .set('src', 'chicago.jpg')
  .css({
    width: 400,
    borderRadius: 8,
    cursor: 'pointer'
  })
  .addTo('body')
  .on('click', moreBlurry)

img.data.b = 0 // keep track of blur amount`
  },

  {
    name: 'brightness',
    source: { filepath: 'DOM/dom.js', start: 329, end: 332 },
    signature: 'element.brightness(val)',
    description: 'Applies a CSS `brightness()` filter to the element. `1` is the original brightness, `0` produces black, values above `1` over-expose. Returns the element for chaining.',
    friendly: 'This method adjusts how bright the element appears. A value of <code>1</code> is normal, <code>0</code> is completely black, and values above <code>1</code> make it brighter than normal.',
    params: [
      { name: 'val', description: 'Brightness multiplier. `0` = black, `1` = normal, `2` = double brightness. Default `1`.' }
    ],
    returns: 'The element.',
    example: `// set up the page
nn.get('body').css({
  background: 'rebeccapurple',
  padding: 20
})

// image that brightens on hover
const img = nn.create('img')
  .set('src', 'chicago.jpg')
  .css({ width: 400, borderRadius: 8 })
  .brightness(0.4)
  .addTo('body')

img
  .on('mouseover', () => img.brightness(1.3))
  .on('mouseout', () => img.brightness(0.4))`
  },

  {
    name: 'contrast',
    source: { filepath: 'DOM/dom.js', start: 334, end: 337 },
    signature: 'element.contrast(val)',
    description: 'Applies a CSS `contrast()` filter. `1` is normal contrast, `0` is flat gray, values above `1` push colors further apart. Returns the element for chaining.',
    friendly: 'This method adjusts the contrast of the element. A value of <code>1</code> is normal, <code>0</code> turns it flat gray, and values above <code>1</code> make light areas lighter and dark areas darker.',
    params: [
      { name: 'val', description: 'Contrast multiplier. `0` = flat gray, `1` = normal, `2` = high contrast. Default `1`.' }
    ],
    returns: 'The element.',
    example: `// set up the page
nn.get('body').css({
  background: 'rebeccapurple',
  padding: 20
})

// because this toggle() function is called
// by the img's click listener, "this" = img
function toggle () {
  // flip the toggle
  this.data.toggled = !this.data.toggled
  // if toggled contrast is 4, otherwise its 1
  const c = this.data.toggled ? 4 : 1
  this.contrast(c)
}

// create <img> element
const img = nn.create('img')
  .set('src', 'chicago.jpg')
  .css({
    width: 400,
    borderRadius: 8,
    cursor: 'pointer'
  })
  .addTo('body')
  .on('click', toggle)

// keep track of custom data property
img.data.toggled = false`
  },

  {
    name: 'dropShadow',
    source: { filepath: 'DOM/dom.js', start: 339, end: 342 },
    signature: 'element.dropShadow(x, y, blur, color)',
    description: 'Applies a CSS `drop-shadow()` filter. Unlike the `box-shadow` property, this filter traces the element\'s actual visible pixels, so it works correctly on transparent PNGs, SVGs, and cutout shapes. Returns the element for chaining.',
    friendly: 'This method adds a shadow to the element. Unlike a regular box shadow, this one traces the actual visible shape of the element, so it works properly on images with transparent backgrounds.',
    params: [
      { name: 'x', description: 'Horizontal shadow offset in pixels.' },
      { name: 'y', description: 'Vertical shadow offset in pixels.' },
      { name: 'blur', description: 'Blur radius in pixels.' },
      { name: 'color', description: 'Shadow color as a CSS color string.' }
    ],
    returns: 'The element.',
    example: `// set up a dark page
nn.get('body').css({
  background: '#111',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh'
})

// create a coral-colored circle div with a glow
nn.create('div')
  .size(120)
  .css({
    background: 'coral',
    borderRadius: '50%'
  })
  .dropShadow(0, 0, 30, 'coral')  // <- adjust values
  .addTo('body')`
  },

  {
    name: 'grayscale',
    source: { filepath: 'DOM/dom.js', start: 344, end: 347 },
    signature: 'element.grayscale(val)',
    description: 'Applies a CSS `grayscale()` filter. `0` is full color, `1` is fully desaturated. Returns the element for chaining.',
    friendly: 'This method removes color from the element. A value of <code>0</code> keeps it in full color, and <code>1</code> turns it completely black and white.',
    params: [
      { name: 'val', description: 'Amount of grayscale from `0` (full color) to `1` (fully gray). Default `0`.' }
    ],
    returns: 'The element.',
    example: `// set up the page
nn.get('body').css({
  background: 'rebeccapurple',
  padding: 20
})

// image that fades to grayscale on hover
const img = nn.create('img')
  .set('src', 'chicago.jpg')
  .css({
    width: 400,
    borderRadius: 8,
    cursor: 'pointer'
  })
  .addTo('body')

// when we hover over and out fro the image
// adjust the image's grayscale
img
  .on('mouseover', () => img.grayscale(1))
  .on('mouseout', () => img.grayscale(0))`
  },

  {
    name: 'hueRotate',
    source: { filepath: 'DOM/dom.js', start: 349, end: 352 },
    signature: 'element.hueRotate(deg)',
    description: 'Applies a CSS `hue-rotate()` filter, shifting all colors in the element by the given angle around the color wheel. `0` and `360` are the same. Returns the element for chaining.',
    friendly: 'This method shifts all the colors in the element by a given number of degrees around the color wheel. Think of it like cycling through different color palettes without changing the shapes or patterns.',
    params: [
      { name: 'deg', description: 'Degrees to rotate all colors (0–360). Default `0`.' }
    ],
    returns: 'The element.',
    example: `// set up the page
nn.get('body').css({
  background: 'rebeccapurple',
  padding: 20
})

// because this shift() function is called
// by the img's click listener, "this" = img
function shift () {
  // shift hue by 45 degress around the color wheel
  this.data.hue += 45
  // apply new hue value to "this" image
  this.hueRotate(this.data.hue)
}

// create <img> element
const img = nn.create('img')
  .set('src', 'chicago.jpg')
  .css({
    width: 400,
    borderRadius: 8,
    cursor: 'pointer'
  })
  .addTo('body')
  .on('click', shift)

// keep track of custom data property
img.data.hue = 0`
  },

  {
    name: 'invert',
    source: { filepath: 'DOM/dom.js', start: 354, end: 357 },
    signature: 'element.invert(val)',
    description: 'Applies a CSS `invert()` filter. `0` has no effect, `1` fully inverts all colors. Values between `0` and `1` produce a partial inversion. Returns the element for chaining.',
    friendly: 'This method flips all the colors to their opposites, like a photo negative. A value of <code>1</code> fully inverts; <code>0</code> has no effect.',
    params: [
      { name: 'val', description: 'Inversion amount from `0` (no effect) to `1` (fully inverted). Default `0`.' }
    ],
    returns: 'The element.',
    example: `// set up the page
nn.get('body').css({
  background: 'rebeccapurple',
  padding: 20
})

// because this toggle() function is called
// by the img's click listener, "this" = img
function toggle () {
  // flip the toggle
  this.data.inverted = !this.data.inverted
  // if inverted then invert is 1, otherwise 0
  const i = this.data.inverted ? 1 : 0
  this.invert(i)
}

// create <img> element
const img = nn.create('img')
  .set('src', 'chicago.jpg')
  .css({
    width: 400,
    borderRadius: 8,
    cursor: 'pointer'
  })
  .addTo('body')
  .on('click', toggle)

// keep track of custom data property
img.data.inverted = false`
  },

  {
    name: 'opacity',
    source: { filepath: 'DOM/dom.js', start: 359, end: 362 },
    signature: 'element.opacity(val)',
    description: 'Applies a CSS `opacity()` filter (not the `opacity` style property, this version participates in the stacked filter pipeline). `1` is fully opaque, `0` is fully transparent. Returns the element for chaining.',
    friendly: 'This method controls how transparent the element is. A value of <code>1</code> is fully visible, and <code>0</code> makes it completely invisible.',
    params: [
      { name: 'val', description: 'Opacity from `0` (transparent) to `1` (opaque). Default `1`.' }
    ],
    returns: 'The element.',
    example: `// style the page
nn.get('body').css({
  background: 'rebeccapurple',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 12,
  height: '100vh'
})

// create 5 boxes
nn.times(5, i => {
  // each one with a slightly different opacity
  const o = 0.2 + i * 0.2

  nn.create('div')
    .size(80)
    .css({
      background: 'coral',
      borderRadius: 8
    })
    .opacity(o)
    .addTo('body')
})`
  },

  {
    name: 'sepia',
    source: { filepath: 'DOM/dom.js', start: 364, end: 367 },
    signature: 'element.sepia(val)',
    description: 'Applies a CSS `sepia()` filter, shifting the element\'s colors toward warm brownish tones. `0` is no effect, `1` is fully sepia. Returns the element for chaining.',
    friendly: 'This method gives the element a warm brownish vintage tone, like an old photograph. A value of <code>0</code> is no change; <code>1</code> is fully sepia.',
    params: [
      { name: 'val', description: 'Sepia amount from `0` (no effect) to `1` (fully sepia). Default `0`.' }
    ],
    returns: 'The element.',
    example: `// set up the page
nn.get('body').css({
  background: 'rebeccapurple',
  padding: 20
})

// image that fades to sepia on hover
const img = nn.create('img')
  .set('src', 'chicago.jpg')
  .css({
    width: 400,
    borderRadius: 8,
    cursor: 'pointer'
  })
  .addTo('body')

img
  .on('mouseover', () => img.sepia(1))
  .on('mouseout', () => img.sepia(0))`
  },

  {
    name: 'saturate',
    source: { filepath: 'DOM/dom.js', start: 369, end: 372 },
    signature: 'element.saturate(val)',
    description: 'Applies a CSS `saturate()` filter. `1` is normal, `0` is fully desaturated (same as `grayscale(1)`), values above `1` oversaturate colors. Returns the element for chaining.',
    friendly: 'This method controls how vivid or muted the colors are. A value of <code>1</code> is normal, <code>0</code> makes it grayscale, and higher values like <code>3</code> make the colors intensely vibrant.',
    params: [
      { name: 'val', description: 'Saturation multiplier. `0` = grayscale, `1` = normal, `3` = oversaturated. Default `1`.' }
    ],
    returns: 'The element.',
    example: `// set up the page
nn.get('body').css({
  background: 'rebeccapurple',
  padding: 20
})

// image that glows with oversaturation on hover
const img = nn.create('img')
  .set('src', 'chicago.jpg')
  .css({
    width: 400,
    borderRadius: 8,
    cursor: 'pointer'
  })
  .saturate(0.3)
  .addTo('body')

img
  .on('mouseover', () => img.saturate(3))
  .on('mouseout', () => img.saturate(0.3))`
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ element properties ~ ~ ~ ~ ~ ~
  {
    name: 'x',
    source: { filepath: 'DOM/dom.js', start: 446, end: 456 },
    signature: 'element.x',
    description: 'A read-only property that returns the element\'s horizontal distance from the left edge of the viewport, sourced from `getBoundingClientRect()`. Equivalent to `element.left`. Defined as a getter so it always reflects the element\'s current position.',
    friendly: 'This property contains a number representing how far the element\'s left edge is from the left side of the window, in pixels.',
    params: [],
    returns: 'A number in pixels.',
    example: `// style the page
nn.get('body').css({
  background: 'rebeccapurple',
  color: 'white',
  padding: 0
})

// create <pre> tag to display coordinates
const coor = nn.create('pre').addTo('body')

// create a box at a random spot
const box = nn.create('div')
  .size(100)
  .css({
    background: 'coral',
    cursor: 'pointer'
  })
  .addTo('body')
  .on('click', update)

function update ( ){
  // move the box to a random spot on the page
  // without the box going out of bounds
  box.position(
    nn.random(nn.width - box.width),
    nn.random(nn.height - box.height)
  )
  // display the current box coordinates
  const m = \`
    x: \${box.x},
    y: \${box.y}
  \`
  coor.content(m)
}`
  },

  {
    name: 'y',
    source: { filepath: 'DOM/dom.js', start: 446, end: 456 },
    signature: 'element.y',
    description: 'A read-only property that returns the element\'s vertical distance from the top edge of the viewport, sourced from `getBoundingClientRect()`. Equivalent to `element.top`. Defined as a getter so it always reflects the element\'s current position.',
    friendly: 'This property contains a number representing how far the element\'s top edge is from the top of the window, in pixels.',
    params: [],
    returns: 'A number in pixels.',
    example: `// style the page
nn.get('body').css({
  background: 'rebeccapurple',
  color: 'white',
  padding: 0
})

// create <pre> tag to display coordinates
const coor = nn.create('pre').addTo('body')

// create a box at a random spot
const box = nn.create('div')
  .size(100)
  .css({
    background: 'coral',
    cursor: 'pointer'
  })
  .addTo('body')
  .on('click', update)

function update ( ){
  // move the box to a random spot on the page
  // without the box going out of bounds
  box.position(
    nn.random(nn.width - box.width),
    nn.random(nn.height - box.height)
  )
  // display the current box coordinates
  const m = \`
    x: \${box.x},
    y: \${box.y}
  \`
  coor.content(m)
}`
  },

  {
    name: 'top',
    source: { filepath: 'DOM/dom.js', start: 446, end: 456 },
    signature: 'element.top',
    description: 'A read-only property that returns the distance from the top edge of the viewport to the top edge of the element, sourced from `getBoundingClientRect()`. Equivalent to `element.y`.',
    friendly: 'This property contains a number representing how far the element\'s top edge is from the top of the window, in pixels. Same value as <code>.y</code>.',
    params: [],
    returns: 'A number in pixels.',
    example: `// style the page
nn.get('body').css({
  background: 'rebeccapurple',
  color: 'white',
  padding: 0
})

// create <pre> tag to display coordinates
const coor = nn.create('pre').addTo('body')

// create a box at a random spot
const box = nn.create('div')
  .size(100)
  .css({
    background: 'coral',
    cursor: 'pointer'
  })
  .addTo('body')
  .on('click', update)

function update ( ){
  // move the box to a random spot on the page
  // without the box going out of bounds
  box.position(
    nn.random(nn.width - box.width),
    nn.random(nn.height - box.height)
  )
  // display the current box coordinates
  const m = \`the box is currently
\${Math.round(box.left)}px from left of screen
\${Math.round(box.top)}px from top of screen
\${Math.round(box.right)}px from right of screen
\${Math.round(box.bottom)}px from bottom of screen
  \`
  coor.content(m)
}`
  },

  {
    name: 'left',
    source: { filepath: 'DOM/dom.js', start: 446, end: 456 },
    signature: 'element.left',
    description: 'A read-only property that returns the distance from the left edge of the viewport to the left edge of the element, sourced from `getBoundingClientRect()`. Equivalent to `element.x`.',
    friendly: 'This property contains a number representing how far the element\'s left edge is from the left side of the window, in pixels. Same value as <code>.x</code>.',
    params: [],
    returns: 'A number in pixels.',
    example: `// style the page
nn.get('body').css({
  background: 'rebeccapurple',
  color: 'white',
  padding: 0
})

// create <pre> tag to display coordinates
const coor = nn.create('pre').addTo('body')

// create a box at a random spot
const box = nn.create('div')
  .size(100)
  .css({
    background: 'coral',
    cursor: 'pointer'
  })
  .addTo('body')
  .on('click', update)

function update ( ){
  // move the box to a random spot on the page
  // without the box going out of bounds
  box.position(
    nn.random(nn.width - box.width),
    nn.random(nn.height - box.height)
  )
  // display the current box coordinates
  const m = \`the box is currently
\${Math.round(box.left)}px from left of screen
\${Math.round(box.top)}px from top of screen
\${Math.round(box.right)}px from right of screen
\${Math.round(box.bottom)}px from bottom of screen
  \`
  coor.content(m)
}`
  },

  {
    name: 'bottom',
    source: { filepath: 'DOM/dom.js', start: 446, end: 456 },
    signature: 'element.bottom',
    description: 'A read-only property that returns the distance from the top edge of the viewport to the bottom edge of the element, sourced from `getBoundingClientRect()`. Equal to `element.top + element.height`.',
    friendly: 'This property contains a number representing how far the element\'s bottom edge is from the top of the window, in pixels.',
    params: [],
    returns: 'A number in pixels.',
    example: `// style the page
nn.get('body').css({
  background: 'rebeccapurple',
  color: 'white',
  padding: 0
})

// create <pre> tag to display coordinates
const coor = nn.create('pre').addTo('body')

// create a box at a random spot
const box = nn.create('div')
  .size(100)
  .css({
    background: 'coral',
    cursor: 'pointer'
  })
  .addTo('body')
  .on('click', update)

function update ( ){
  // move the box to a random spot on the page
  // without the box going out of bounds
  box.position(
    nn.random(nn.width - box.width),
    nn.random(nn.height - box.height)
  )
  // display the current box coordinates
  const m = \`the box is currently
\${Math.round(box.left)}px from left of screen
\${Math.round(box.top)}px from top of screen
\${Math.round(box.right)}px from right of screen
\${Math.round(box.bottom)}px from bottom of screen
  \`
  coor.content(m)
}`
  },

  {
    name: 'right',
    source: { filepath: 'DOM/dom.js', start: 446, end: 456 },
    signature: 'element.right',
    description: 'A read-only property that returns the distance from the left edge of the viewport to the right edge of the element, sourced from `getBoundingClientRect()`. Equal to `element.left + element.width`.',
    friendly: 'This property contains a number representing how far the element\'s right edge is from the left side of the window, in pixels.',
    params: [],
    returns: 'A number in pixels.',
    example: `// style the page
nn.get('body').css({
  background: 'rebeccapurple',
  color: 'white',
  padding: 0
})

// create <pre> tag to display coordinates
const coor = nn.create('pre').addTo('body')

// create a box at a random spot
const box = nn.create('div')
  .size(100)
  .css({
    background: 'coral',
    cursor: 'pointer'
  })
  .addTo('body')
  .on('click', update)

function update ( ){
  // move the box to a random spot on the page
  // without the box going out of bounds
  box.position(
    nn.random(nn.width - box.width),
    nn.random(nn.height - box.height)
  )
  // display the current box coordinates
  const m = \`the box is currently
\${Math.round(box.left)}px from left of screen
\${Math.round(box.top)}px from top of screen
\${Math.round(box.right)}px from right of screen
\${Math.round(box.bottom)}px from bottom of screen
  \`
  coor.content(m)
}`
  },

  {
    name: 'data',
    source: { filepath: 'DOM/dom.js', start: 458, end: 534 },
    signature: 'element.data',
    description: 'A proxy that reads and writes the element\'s `dataset` (HTML `data-*` attributes) while automatically converting types. Assigning `element.data.count = 5` stores `"5"` on the element; reading it back returns the JavaScript number `5`. Booleans, `null`, arrays, and plain objects are all round-tripped correctly. Deleting a key removes the corresponding attribute.',
    friendly: 'This property lets you attach your own custom data directly to an element. For example, <code>box.data.score = 10</code> stores a score on that element, and <code>box.data.score</code> reads it back later.',
    params: [],
    returns: 'A proxy object. Reads return values with their original types; writes update the corresponding `data-*` attribute.',
    example: `// style the page
nn.get('body').css({
  background: 'rebeccapurple',
  display: 'flex',
  flexWrap: 'wrap',
  gap: 10,
  padding: 20
})

function createCard () {
  // create a div
  const card = nn.create('div')
    .size(80)
    .css({ // style it to look like a number card
      background: 'coral',
      borderRadius: 8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontFamily: 'monospace',
      fontSize: 28,
      cursor: 'pointer'
    })
    .addTo('body')

  // store initial count on the element
  card.data.count = 0
  // update it's content with the number
  card.content(card.data.count)

  // setup click listener
  card.on('click', () => { // when user clicks
    // increase data count by one
    card.data.count++
    // update content to reflect the change
    card.content(card.data.count)
  })
}

// run createCard() six times
nn.times(6, createCard)`
  }
]

if (typeof module !== 'undefined') module.exports = DOM_DOCS
else window.DOM_DOCS = DOM_DOCS
