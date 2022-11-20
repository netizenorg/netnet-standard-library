# netnet-standard-library

`nn` (netnet-standard-library.js) is a browser based JavaScript library designed to aid creative coders (artists, designers, etc), it's a core *utility* library used within [netnet.studio](https://netnet.studio); both in the sense that it can be used to create sketches in netnet, but also that it's used to create netet.studio itself. It can also be used outside of netnet.studio as you would any other typical JavaScript library (with some exceptions, see note below).

There are loads of amazing creative coding libraries out there ([p5.js](https://p5js.org/), [three.js](https://threejs.org/), [tone.js](https://tonejs.github.io/), [A-Frame](https://aframe.io/), [D3.js](https://d3js.org/), [Paper.js](http://paperjs.org/), etc) which extend the capabilities of the Web's creative APIs and often provide a framework for expressing higher level concepts (the way A-Frame's Entity-Component-System adds game design principles to the WebGL and WebXR APIs or the way Tone.js adds music theory to the WebAudio API). Unlike these libraries, `nn` doesn't extend or abstract the Web's more creative APIs, instead it has a much more modest goal of expanding on JavaScript's standard library (like it's `Math` object) as well as some of the Web's core APIs (like `window` and `navigator`), in this way it's more of a *utility* library than it is a creative *framework*.

This repo consists of a number of git "sub-modules", namely [Averigua.js](https://github.com/nbriz/Averigua),  [Maths.js](https://github.com/nbriz/Maths), [Color.js](https://github.com/nbriz/Color) and [FileUploader.js](https://github.com/nbriz/FileUploader), all of which can be used independently. This repo simply packages them up in one place and adds a few more properties and methods specifically for aiding beginners embarking on their creative coding journey on [netnet.studio](https://netnet.studio).

# using the library

You can [download the minified library here](https://raw.githubusercontent.com/netizenorg/netnet-standard-library/main/build/nn.min.js). You can use this library directly on netnet.studio by simply including a script tag in your sketch.

```html
<!-- import the library -->
<script src="js/nn.min.js"></script>
<script>

</script>
```

# API / documentation

## properties (internal variables)

- [nn.width](docs/API.md#width) `// browser's current width`
- [nn.height](docs/API.md#height) `// browser's current height`
- [nn.mouseX](docs/API.md#mouseX) `// mouse's current x position`
- [nn.mouseY](docs/API.md#mouseY) `// mouse's current y position`

## methods (internal functions)

Functions for detecting useful information about your visitor's device. These come from the [Averigua.js](https://github.com/nbriz/Averigua) sub-module.

- [nn.isMobile()](docs/API.md#isMobile) `// is the visitor on a mobile device`
- [nn.hasWebGL()](docs/API.md#hasWebGL) `// does their device support 3D graphics`
- [nn.hasWebVR()](docs/API.md#hasWebVR) `// does their device support Virtual Reality`
- [nn.hasMIDI()](docs/API.md#hasMIDI) `// does their device support MIDI`
- [nn.hasTouch()](docs/API.md#hasTouch) `// does their device have a touch screen`
- [nn.orientation()](docs/API.md#orientation) `// what is the device's orientation`
- [nn.screen()](docs/API.md#screen) `// info about their screen`
- [nn.gpuInfo()](docs/API.md#gpuInfo) `// info about their graphics card`
- [nn.browserInfo()](docs/API.md#browserInfo) `// what type of browser are they on`
- [nn.platformInfo()](docs/API.md#platformInfo) `// info about their computer`
- [nn.audioSupport()](docs/API.md#audioSupport) `// info about their browser's audio support`
- [nn.videoSupport()](docs/API.md#videoSupport) `// info about their browser's video support`

Other useful **math** functions often used in creative coding projects which are not included in JavaScript's built in `Math` object. These come from the [Maths.js](https://github.com/nbriz/Maths) sub-module.

- [nn.norm()](docs/API.md#norm) `// normalize a value`
- [nn.clamp()](docs/API.md#clamp) `// clamp a value to given range`
- [nn.lerp()](docs/API.md#lerp) `// linear interpolation`
- [nn.map()](docs/API.md#map) `// map a value from one range to another`
- [nn.dist()](docs/API.md#dist) `// the distance between two points`
- [nn.angleBtw()](docs/API.md#angleBtw) `// the angle between two points`
- [nn.radToDeg()](docs/API.md#radToDeg) `// convert an angle in radians to degrees`
- [nn.degToRad()](docs/API.md#degToRad) `// convert an angle in degrees to radians`
- [nn.cartesianToPolar()](docs/API.md#cartesianToPolar) `// convert cartesian coordinates to polar`
- [nn.polarToCartesian()](docs/API.md#polarToCartesian) `// convert polar coordinates to cartesian`
- [nn.shuffle()](docs/API.md#shuffle) `// randomize the items in an array`
- [nn.randomInt()](docs/API.md#randomInt) `// generate a random integer (whole number)`
- [nn.randomFloat()](docs/API.md#randomFloat) `// generate a random float (decimal number)`
- [nn.random()](docs/API.md#random) `// generate a random number, or select a random item from an array`
- [nn.perlin()](docs/API.md#perlin) `// generate random "perlin" noise`
- [nn.ease()](docs/API.md#ease) `// a collection of easing/tweening functions`

Functions for doing various **color** maths. These come from the [Color.js](https://github.com/nbriz/Color) sub-module.

- [nn.randomColor()](docs/API.md#randomColor) `// generate a random color string`
- [nn.isLight()](docs/API.md#isLight) `// checks if a color is light or dark`
- [nn.colorMatch()](docs/API.md#colorMatch) `// finds color strings in larger strings`
- [nn.alpha2hex()](docs/API.md#alpha2hex) `// converts alpha float value to hex byte string`
- [nn.hex2alpha()](docs/API.md#hex2alpha) `// converts a hex byte string to alpha float value`
- [nn.hex2rgb()](docs/API.md#hex2rgb) `// converts a hex color string to an rgb object`
- [nn.hex2hsl()](docs/API.md#hex2hsl) `// converts a hex color string to an hsl object`
- [nn.hex2hsv()](docs/API.md#hex2hsv) `// converts a hex color string to an hsv object`
- [nn.rgb2hex()](docs/API.md#rgb2hex) `// converts r, g, b values to a hex color string`
- [nn.rgb2hsl()](docs/API.md#rgb2hsl) `// converts r, g, b values to an hsl object`
- [nn.rgb2hsv()](docs/API.md#rgb2hsv) `// converts r, g, b values to an hsv object`
- [nn.hsl2hex()](docs/API.md#hsl2hex) `// converts h, s, l values to a hex color string`
- [nn.hsl2rgb()](docs/API.md#hsl2rgb) `// converts h, s, l values to an rgb object`
- [nn.hsl2hsv()](docs/API.md#hsl2hsv) `// converts h, s, l values to an hsv object`
- [nn.hsv2hex()](docs/API.md#hsv2hex) `// converts h, s, v values to a hex color string`
- [nn.hsv2rgb()](docs/API.md#hsv2rgb) `// converts h, s, v values to an rgb object`
- [nn.hsv2hsl()](docs/API.md#hsv2hsl) `// converts h, s, v values to an hsl object`


## classes

- [nn.FileUploader](docs/API.md#FileUploader) *This comes from the [FileUploader.js](https://github.com/nbriz/FileUploader) sub-module.*

# contributions

If you'd like to contribute to this repository, below are the steps you should take to setup a local project as well as contribute any bug fixes, additions or other changes.

### setup
0. start by [fork our repo](https://github.com/netizenorg/netnet-standard-library/fork) this repo
1. then clone your fork `git clone https://github.com/[YOUR_USER_NAME]/netnet.studio.git`
2. then navigate into that directory `cd netnet-standard-library` and then pull the code from the sub-modules `npm run pull-modules`
3. setup a remote "upstream" to our repo: `git remote add upstream https://github.com/netizenorg/netnet-standard-library.git`

### development

0. before starting on a new feature it's always a good idea to run `git pull upstream main` to pull updates from our repo. Also, if/when any of the individual sub-module repositories have been updated, you can run `npm run update-modules` to update the local modules.
1. create a "feature" branch `git checkout -b [FEATURE-NAME]` for your contribution.
2. if you're adding a new sub-module, run `git sub-module add [module-github-URL]`, and then include them in the `main.js` file, otherwise you can add simply add new properties or methods directly to the library in the `main.js` file.
3. as you work locally you can
  - use the `npm run build` command to create new builds of the library
  - use the `test.html` page to test your changes
  - use the `npm run lint` command to ensure you're conforming to our [coding style](https://standardjs.com/) before making any commits.
3. when you're ready, create a [PR](https://github.com/netizenorg/netnet-standard-library/pulls) *from* your `feature` branch and *into* our `main` branch.
4. Once your PR has been merged, clean things up before starting on another feature
```
git checkout main
git pull upstream main
git push origin --delete [FEATURE-NAME]
git branch --delete [FEATURE-NAME]
```
