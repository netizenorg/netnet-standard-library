window.MENU_DATA = {
  'Rendering (HTML)': {
    data: {
      path: 'src/DOM/docs.js',
      global: 'DOM_DOCS'
    },
    menu: [
      { section: 'Window Properties', methods: ['width', 'height', 'mouseX', 'mouseY', 'mouseDown', 'pointer', 'pointers'] },
      { section: 'Window Events', methods: ['on', 'off'] },
      { section: 'HTML Elements', methods: ['get', 'getAll', 'create'] },
      { section: 'Element Properties', methods: ['x', 'y', 'width', 'height', 'top', 'left', 'bottom', 'right', 'data'] },
      { section: 'Element Methods', methods: ['content', 'addTo', 'set', 'css', 'transition', 'on', 'off'] },
      { section: 'Transforms', methods: ['position', 'positionOrigin', 'size', 'rotate', 'scale', 'skew'] },
      { section: 'CSS Filters', methods: ['blur', 'brightness', 'contrast', 'dropShadow', 'grayscale', 'hueRotate', 'invert', 'opacity', 'sepia', 'saturate'] }
    ]
  },
  'Rendering (Canvas)': {
    data: {
      path: 'src/DOM/canvas-docs.js',
      global: 'CANVAS_DOCS'
    },
    menu: [
      { section: 'Styling', methods: ['fillColor', 'strokeColor', 'lineWidth', 'lineCap', 'lineJoin'] },
      { section: 'Canvas Utilities', methods: ['clear', 'resize'] },
      { section: 'Drawing Shapes', methods: ['circle', 'rect', 'line', 'ellipse', 'triangle'] },
      { section: 'Text', methods: ['text', 'font', 'textAlign', 'textBaseline'] },
      { section: 'Custom Paths', methods: ['beginPath', 'arc', 'bezierCurveTo'] },
      { section: 'Images & Gradients', methods: ['drawImage', 'createLinearGradient'] },
      { section: 'Pixel Data', methods: ['getPixels', 'setPixels'] },
      { section: 'Effects', methods: ['blendMode', 'globalAlpha', 'shadowBlur'] },
      { section: 'Transforms', methods: ['save', 'translate', 'rotate', 'scale', 'restore'] }
    ]
  },
  'Rendering (SVG)': {
    data: {
      path: 'src/DOM/svg-docs.js',
      global: 'SVG_DOCS'
    },
    menu: [
      { section: 'Creating Shapes', methods: ['circle', 'rect', 'line', 'ellipse', 'path', 'polygon', 'text', 'group'] },
      { section: 'Styling', methods: ['fill', 'stroke', 'strokeWidth', 'strokeDash', 'strokeOffset', 'opacity'] },
      { section: 'Layout', methods: ['position', 'positionOrigin', 'size', 'viewBox'] },
      { section: 'Transforms', methods: ['rotate', 'scale', 'translate'] },
      { section: 'Text', methods: ['textAlign', 'textBaseline'] }
    ]
  },
  'Media / Devices': {
    data: {
      path: 'src/Media/docs.js',
      global: 'MEDIA_DOCS'
    },
    menu: [
      { section: 'Images', methods: ['loadImage', 'filterImage', 'filterVideo'] },
      { section: 'Hypermedia', methods: ['hyper', 'popup'] },
      { section: 'Device Access', methods: ['askFor', 'askForStream', 'askForCapture', 'askForNotifications', 'askForClipboard', 'askForBluetooth', 'askForUSB', 'askForSerial', 'askForMotion', 'askForOrientation', 'askForGPS', 'MIDI'] }
    ]
  },
  Data: {
    data: {
      path: 'src/Data/docs.js',
      global: 'DATA_DOCS'
    },
    menu: [
      { section: 'Parsing & Serializing', methods: ['parse', 'serialize'] },
      { section: 'Files', methods: ['download', 'upload'] }
    ]
  },
  Utilities: {
    data: {
      path: 'src/Utils/docs.js',
      global: 'UTILS_DOCS'
    },
    menu: [
      { methods: ['sleep', 'times', 'range'] }
    ]
  },
  Maths: {
    data: {
      path: 'src/Maths/docs.js',
      global: 'MATHS_DOCS'
    },
    menu: [
      { section: 'Core Math', methods: ['lerp', 'norm', 'clamp', 'map'] },
      { section: 'Geometry', methods: ['dist', 'angleBtw'] },
      { section: 'Conversions', methods: ['radToDeg', 'degToRad', 'cartesianToPolar', 'polarToCartesian'] },
      { section: 'Randomness', methods: ['shuffle', 'randomInt', 'randomFloat', 'random', 'perlin'] },
      { section: 'Easing / Tweening', methods: ['ease'] }
    ]
  },
  'Color Theory': {
    data: {
      path: 'src/Color/docs.js',
      global: 'COLOR_DOCS'
    },
    menu: [
      { section: 'Generating Colors', methods: ['rgb', 'hex', 'hsl', 'randomColor'] },
      { section: 'Converting Formats', methods: ['toRGB', 'toHex', 'toHSL', 'alpha2hex', 'hex2alpha'] },
      { section: 'Color Interpolation', methods: ['lerpColor', 'colorGradient'] },
      { section: 'Color Palettes', methods: ['colorScheme'] },
      { section: 'Color Analysis', methods: ['isLight', 'colorContrast', 'colorMatch', 'closestColor'] }
    ]
  },
  'Music Theory': {
    data: {
      path: 'src/Music/docs.js',
      global: 'MUSIC_DOCS'
    },
    menu: [
      { section: 'Conversions', methods: ['noteToMidi', 'midiToNote', 'noteToFrequency', 'frequencyToNote', 'midiToFrequency', 'frequencyToMidi', 'stripOctave'] },
      { section: 'Scales', methods: ['createScale', 'randomMode'] },
      { section: 'Scale Manipulation', methods: ['rotateScale', 'transposeScale'] },
      { section: 'Chords', methods: ['createChord', 'voiceChord'] }
    ]
  },
  'Feature Detection': {
    data: {
      path: 'src/Averigua/docs.js',
      global: 'AVERIGUA_DOCS'
    },
    menu: [
      { methods: ['hasWebGL', 'hasWebVR', 'hasWebXR', 'hasMIDI', 'hasTouch', 'hasWebAudio', 'hasMediaDevices', 'hasDeviceMotion', 'hasDeviceOrientation', 'hasPointerLock', 'hasGamepad', 'hasWebSerial', 'hasWebUSB', 'hasBluetooth', 'hasSpeechRecognition', 'hasSpeechSynthesis', 'hasWebAssembly', 'hasFullscreen'] },
      { section: 'Environment', methods: ['isBrowser', 'isMobile'] },
      { section: 'Device Info', methods: ['screen', 'orientation', 'gpuInfo'] },
      { section: 'Browser & Platform', methods: ['browserInfo', 'platformInfo'] },
      { section: 'Media Support', methods: ['audioSupport', 'videoSupport'] },
      { section: 'Storage & Fonts', methods: ['storageSupport', 'fontSupport'] },
      { section: 'Locale', methods: ['language', 'timeZone'] }
    ]
  }
}
