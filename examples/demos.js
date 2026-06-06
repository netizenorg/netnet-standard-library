window.DEMO_DOCS = [
  // ........................................................... DEMOS .........
  {
    name: 'drawing-tool',
    title: 'nn demo',
    description: 'An interactive GIF-drawing tool created with the <code>nn</code> library. Drawings can be saved as HTML pages.',
    filename: 'drawing-tool.js'
  },
  {
    name: 'matter-circles',
    title: 'nn + Matter.js (for physics)',
    description: 'A generative and interactive demo combining <a href="https://brm.io/matter-js/" target="_blank">Matter.js</a> physics with <code>nn</code>\'s SVG rendering and color theory. Inspired by <a href="https://www.instagram.com/p/DYSP-_5Kx6a/" target="_blank">Emanuele Colombo</a>.',
    filename: 'matter-circles.js'
  },
  {
    name: 'hydra-waves',
    title: 'nn + hydra.js (for shader background)',
    description: 'A generative splash page demo combining <a href="https://hydra.ojack.xyz" target="_blank">hydra.js</a> graphic shaders with <code>nn</code> to create moving GIFs. Background based on a shader by <a href="https://hydra.ojack.xyz/?sketch_id=example_16" target="_blank">Olivia Jack</a>.',
    filename: 'hydra-waves.js'
  },
  {
    name: 'tf-filter',
    title: 'nn + TensorFlow.js (for pose detection)',
    description: 'An interactive demo combining the machine learning library <a href="https://www.tensorflow.org/js" target="_blank">TensorFlow.js</a> with <code>nn</code>\'s video filtering and DOM/canvas rendering. Inspired by this demo by <a href="https://www.instagram.com/p/DZCn7wHopoz/" target="_blank">_cklive_</a>.',
    filename: 'tf-filter.js'
  },
  {
    name: '3d-gallery',
    title: 'nn + Three.js (for 3D rendering)',
    description: 'An interactive demo combining the 3D rendering library <a href="https://threejs.org/" target="_blank">Three.js</a> with <code>nn</code>\'s HTML rendering and other utility methods. Inspired by coding tricks learned form <a href="https://mrdoob.com/" target="_blank">mr.doob</a>.',
    filename: '3d-gallery.js'
  },
  {
    name: 'music',
    title: 'nn + Tone.js (for sound scheduling/synthesis)',
    description: 'An generative demo combining the web audio framework <a href="https://tonejs.github.io/" target="_blank">Tone.js</a> with <code>nn</code>\'s music theory methods. Inspired by <a href="https://mcpa.jake.fun/" target="_blank">Jake Albaugh</a>.',
    filename: 'music.js'
  },
  // ................................................. GETTING STARTED .........
  {
    name: 'dom-elements',
    title: 'Dynamic HTML/CSS',
    description: 'At the heart of <code>nn</code> are <code>get()</code> and <code>create()</code>, the former retrieves existing HTML elements from the page, while the latter builds new ones from scratch. Both interact with the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model" target="_blank">DOM</a> (the browser\'s JavaScript API for modifying and rendering the HTML elements on your page), through a beginner-friendly, chainable interface. <i>Chaining</i> lets you link multiple actions in a single statement, like <code style="word-break: break-all;">nn.create().css().size().addTo()</code>, replacing verbose native JavaScript with concise, readable code. <a href="docs/#dom/get">Check out the docs to learn more</a>',
    filename: 'dom-elements.js'
  },
  {
    name: 'callbacks',
    title: 'Callback Functions',
    description: 'A common pattern in <code>nn</code>, and creative coding in general, is the callback function: a block of code you pass as an argument to another function/method to be executed later. You can define a function separately and pass it by name, like <code>randomFlower</code> in this example, or define it anonymously right where it\'s needed using arrow syntax <code>() => { ... }</code>. This flexibility lets you reuse named functions for clarity or write quick, one-off behaviors inline.',
    filename: 'callbacks.js'
  },
  {
    name: 'events',
    title: 'Browser Events',
    description: 'Events are how your code reacts to the world around it. In <code>nn</code>, you use <code>on()</code> to listen for specific moments, like the page loading (<code>\'load\'</code>) or a user clicking (<code>\'click\'</code>) and many <a href="https://devdoc.net/web/developer.mozilla.org/en-US/docs/DOM/DOM_event_reference.1.html" target="_blank">more</a>, and then trigger a function whenever they happen. Instead of running your code once and stopping, you attach these "event listeners" to make your work interactive, responding instantly to user actions or browser states. <a href="docs/#dom/on">Check out the docs to learn more</a>',
    filename: 'events.js'
  },
  {
    name: 'async',
    title: 'async Functions',
    description: 'Some tasks, like asking for camera permission or loading an image, take time and won\'t happen instantly. To handle this, <code>nn</code> uses <code>async</code> functions paired with the <code>await</code> keyword. By marking a function as <code>async</code>, you tell the code to pause at specific lines (like <code>await nn.askFor(\'video\')</code>) until a task is truly finished, rather than rushing ahead and breaking things. This ensures your code waits for the user\'s permission or for data to load before trying to use it, while keeping the code simple and linear.',
    filename: 'async-await.js'
  },
  {
    name: 'rendering',
    title: 'Canvas vs SVG',
    description: 'Beyond HTML, <code>nn</code> offers two other drawing modes. <a href="https://en.wikipedia.org/wiki/Raster_graphics" target="_blank">Raster rendering</a> via the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API" target="_blank">&lt;canvas&gt; API</a> paints a mosaic of pixels, once drawn, shapes vanish into the grid and can\'t be moved individually, but this feature makes it perfect for high-speed animations. <a href="docs/#canvas/circle">Check out the docs to learn more</a><br><br><a href="https://en.wikipedia.org/wiki/Vector_graphics" target="_blank">Vector rendering</a> through the <a href="https://developer.mozilla.org/en-US/docs/Web/SVG" target="_blank">&lt;svg&gt; API</a> keeps graphics crisp at any size, treating every shape as a separate object you can edit independently. However, because the browser calculates every shape, SVG slows down with massive amounts of moving parts. <a href="docs/#svg/circle">Check out the docs for more</a><br><br>Use <code>&lt;canvas&gt;</code> when you need pixel level control and complex high-speed animations, and choose <code>&lt;svg&gt;</code> when you need crisp, interactive diagrams or data visualizations where individual elements must remain selectable and editable.',
    filename: 'rendering.js'
  },
  {
    name: 'animate',
    title: 'Animation Loop',
    description: 'Many creative coding projects follow a setup/draw pattern to organize initialization and animation. The setup function runs once when the page loads to prepare your environment: creating canvases, initializing variables, and setting up the stage. The draw (or animate) function then runs repeatedly, usually 60 times per second, by calling itself recrusively, usually with <code>requestAnimationFrame</code>, to update the screen frame by frame.',
    filename: 'animate.js'
  }
]
