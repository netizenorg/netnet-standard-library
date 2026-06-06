# nn — netnet standard library: LLM context

## How to use this document

This file is context for an LLM assistant helping a student write code with the `nn` (netnet standard library). Include it at the start of a conversation with any LLM chatbot (e.g. paste its contents before your question) so the assistant understands the library's API and patterns.

When helping with `nn` code, the assistant should:
- **Always prefer `nn` methods over vanilla JS equivalents.** If a method exists in this library that accomplishes the task, use it — don't rewrite it with raw DOM APIs or `document.querySelector`, etc.
- **Follow the chaining pattern.** Most element methods return `this`, so calls should be chained fluently: `.css(...).position(...).addTo('body').on('click', fn)`.
- **Use `nn.on('load', fn)` for setup code** that depends on the DOM being ready, rather than `window.onload` or `DOMContentLoaded`.
- **Never recommend loading the library via npm or a bundler** for sketches — it is loaded via a `<script>` tag and accessed as `window.nn` (or just `nn`).

## Overview

`nn` is a browser-side creative coding library exposed as a single global object. It is loaded via a `<script>` tag and everything is accessed through `window.nn`. The library covers DOM manipulation, canvas and SVG rendering, data handling, math, color theory, music theory, media/device access, and feature detection.

## Core concepts

### The `nn` object
All top-level utilities live on `nn`: `nn.random()`, `nn.lerp()`, `nn.rgb()`, `nn.parse()`, etc.

### Augmented elements
`nn.get(query)` and `nn.create(type)` return native DOM elements augmented with extra methods (`.css()`, `.on()`, `.content()`, `.addTo()`, transforms, filters, etc.). These extra methods all return `this` so calls chain fluently:

```js
nn.create('div')
  .css({ background: 'coral', width: 100, height: 100 })
  .position(200, 200)
  .addTo('body')
  .on('click', () => { ... })
```

### Canvas elements
When `nn.create('canvas')` or `nn.get('canvas')` is called, the returned element is also augmented with canvas drawing methods (`circle`, `rect`, `line`, etc.) and state properties (`fillColor`, `strokeColor`, `lineWidth`, etc.).

### SVG elements
When `nn.create('svg')` is called the returned element has factory methods (`svg.circle()`, `svg.rect()`, `svg.path()`, etc.) that create child SVG shapes and return them. Those child shapes have their own chainable style methods (`.fill()`, `.stroke()`, `.rotate()`, etc.).

---

## API Reference

---

### Rendering (HTML / DOM)

#### Window properties (on `nn`)

**`nn.mouseX`** — Read-only. Current mouse X position in pixels from the left edge of the viewport. Starts the internal mouse tracker on first access.

**`nn.mouseY`** — Read-only. Current mouse Y position in pixels from the top of the viewport.

**`nn.mouseDown`** — Read-only boolean. `true` while any mouse button is held down.

**`nn.pointer`** — Read-only. The first currently active pointer contact as `{ x, y, id, type }`, or `null` when nothing is pressing or touching. `type` is `'mouse'`, `'touch'`, or `'pen'`. Shorthand for `nn.pointers[0]`. Works for both mouse clicks and finger touches.

**`nn.pointers`** — Read-only. A live array of all currently active pointer contacts, each `{ x, y, id, type }`. Empty when nothing is active. On touchscreens each simultaneous finger gets its own entry. On desktop a held mouse button adds one entry. No stale last-position ambiguity — if the array is empty, nothing is pressing.

**`nn.width`** — Read-only. `window.innerWidth` in pixels. Also available on augmented elements as `element.width` (bounding rect width).

**`nn.height`** — Read-only. `window.innerHeight` in pixels. Also available on augmented elements as `element.height` (bounding rect height).

#### Window event methods (on `nn`)

**`nn.on(event, callback, options?)`** — Attaches a window-level event listener. `event` is a string like `'load'`, `'mousemove'`, `'keydown'`, `'pointermove'`. Returns nothing.

**`nn.off(event, callback, options?)`** — Removes a window-level listener. Must pass the exact same function reference used in `.on()`. Returns nothing.

#### Selecting & creating elements (on `nn`)

**`nn.get(query)`** — Finds and augments an element. `query` is a CSS selector string or an existing `HTMLElement`. Returns the augmented element or `undefined`.

**`nn.getAll(query)`** — Returns an array of all matching augmented elements (may be empty).

**`nn.create(type)`** — Creates and augments a new element. `type` is a tag name string (`'div'`, `'p'`, `'canvas'`, `'img'`, `'input'`, `'svg'`, etc.). The element is not in the DOM until `.addTo()` is called. Returns the augmented element.

---

#### Element methods (chainable on augmented elements)

All of the following are available on any element returned by `nn.get()`, `nn.create()`, or `nn.getAll()`. They return the element for chaining unless noted.

**`.on(event, callback, options?)`** — Attaches an element-level event listener. Returns the element.

**`.off(event, callback, options?)`** — Removes an element-level listener previously added with `.on()`. Must pass the same function reference. Returns the element.

**`.content(str)`** — Sets `innerHTML`. Pass `''` to clear. Returns the element.

**`.addTo(parent)`** — Appends the element to `parent` (CSS selector string or element reference). If the element already has a parent it is moved. Returns the element.

**`.set(prop, val) / .set(obj)`** — Sets HTML attributes. Pass a name + value, or a plain object of name/value pairs. Special cases: `'options'` + array on a `<select>` populates `<option>` children; `'stream'` + `MediaStream` sets `srcObject`. Shorthand: `.set('.my-class')` sets `className`; `.set('#my-id')` sets `id`. Returns the element.

**`.css(prop, val) / .css(obj)`** — Sets inline CSS. Numeric values automatically get `'px'` appended when needed. Property names can be camelCase or kebab-case strings. Smart url() shorthand: for image-only properties (`cursor`, `background-image`, `mask-image`, `border-image-source`, `list-style-image`), passing an emoji, unicode character, or any plain text string auto-generates an inline SVG data URL — e.g. `.css('cursor', '💿')` or `.css('background-image', '★')`. Passing a filename like `'cat.png'` auto-wraps it in `url(...)`. CSS keywords and function values (`rgba()`, `linear-gradient()`, etc.) are always passed through unchanged. Returns the element.

**`.transition(prop, duration) / .transition(obj)`** — Sets a CSS `transition`. `duration` can be a number (ms) or a string like `'0.3s ease-in-out'`. Makes subsequent `.css()` and transform calls animate smoothly. Returns the element.

**`.get(query)`** — Scoped querySelector within this element. Returns an augmented element or `undefined`.

**`.getAll(query)`** — Scoped querySelectorAll within this element. Returns an array.

---

#### Element transforms (chainable, share the same `transform` string non-destructively)

**`.position(x, y, type?)`** — Positions using CSS `left`/`top`. Default `type` is `'absolute'`; also accepts `'relative'`, `'fixed'`, `'sticky'`. If `.positionOrigin('center')` was set, x/y refer to the element's center. When called on an element with zero dimensions (e.g. not yet in the DOM, or an unloaded image), the position is automatically re-applied once dimensions become available (via `requestAnimationFrame` for general elements, `load` event for images).

**`.positionOrigin(type)`** — `'center'` makes `.position()` coordinates refer to the element's center. `'default'` restores top-left behavior. Call before `.position()`.

**`.rotate(deg)`** — CSS `rotate()` transform. Positive = clockwise.

**`.scale(x, y?)`** — CSS `scale()` transform. If `y` omitted, scales uniformly. `1` = normal.

**`.skew(xDeg, yDeg?)`** — CSS `skew()` transform. `yDeg` defaults to `0`.

---

#### Element CSS filters (chainable, share the same `filter` string non-destructively)

**`.blur(px)`** — CSS `blur()`. Radius in pixels.

**`.brightness(val)`** — CSS `brightness()`. `0` = black, `1` = normal, `2` = double.

**`.contrast(val)`** — CSS `contrast()`. `0` = flat gray, `1` = normal, `2` = high.

**`.dropShadow(x, y, blur, color)`** — CSS `drop-shadow()` filter. Traces actual visible pixels, unlike `box-shadow`.

**`.grayscale(val)`** — CSS `grayscale()`. `0` = full color, `1` = fully gray.

**`.hueRotate(deg)`** — CSS `hue-rotate()`. Shifts all colors around the wheel.

**`.invert(val)`** — CSS `invert()`. `0` = no effect, `1` = fully inverted.

**`.opacity(val)`** — CSS `opacity()` filter (participates in the stacked filter pipeline, not the `opacity` style property). `0` = transparent, `1` = opaque.

**`.sepia(val)`** — CSS `sepia()`. `0` = no effect, `1` = fully sepia.

**`.saturate(val)`** — CSS `saturate()`. `0` = grayscale, `1` = normal, `3` = oversaturated.

---

#### Element read-only bounding rect properties

Sourced from `getBoundingClientRect()`. Defined as getters so they always reflect current layout.

**`element.x`** — Distance from viewport left to element left. Equivalent to `element.left`.

**`element.y`** — Distance from viewport top to element top. Equivalent to `element.top`.

**`element.width`** — Rendered width including padding and borders.

**`element.height`** — Rendered height including padding and borders.

**`element.top`** — Distance from viewport top to element top edge. Equivalent to `element.y`.

**`element.left`** — Distance from viewport left to element left edge. Equivalent to `element.x`.

**`element.bottom`** — Distance from viewport top to element bottom edge. Equals `top + height`.

**`element.right`** — Distance from viewport left to element right edge. Equals `left + width`.

---

#### Element data proxy

**`element.data`** — A proxy for the element's `dataset` (HTML `data-*` attributes) that automatically coerces types. Writing `element.data.count = 5` stores `"5"`; reading it back gives the number `5`. Booleans, `null`, arrays, and plain objects all round-trip correctly. Deleting a key removes the attribute.

---

#### Element value coercion

**`element.value`** — On `<input type="number">` and `<input type="range">`, returns a JavaScript `number` instead of the default string. All other input types return a string as normal.

---

### Rendering (Canvas)

A canvas element returned by `nn.create('canvas')` or `nn.get('canvas')` has all the HTML element chainable methods above, plus the following drawing methods and state properties.

#### Setup

**`canvas.resize(width, height)`** — Sets the drawing buffer size. Returns the canvas.

**`canvas.clear()`** — Clears all pixels. Call at the start of each animation frame. Returns the canvas.

#### State properties (get/set)

**`canvas.fillColor`** — Maps to `fillStyle`. Assign a CSS color string, `CanvasGradient`, or `CanvasPattern`.

**`canvas.strokeColor`** — Maps to `strokeStyle`. Set to `'transparent'` to suppress outlines.

**`canvas.lineWidth`** — Stroke width in pixels (default `1`).

**`canvas.lineCap`** — `'butt'` (default), `'round'`, or `'square'`.

**`canvas.lineJoin`** — `'miter'` (default), `'round'`, or `'bevel'`.

**`canvas.font`** — CSS font shorthand, e.g. `'bold 24px monospace'`.

**`canvas.textAlign`** — `'left'`, `'right'`, `'center'`, `'start'`, or `'end'`.

**`canvas.textBaseline`** — `'alphabetic'`, `'top'`, `'hanging'`, `'middle'`, `'ideographic'`, or `'bottom'`.

**`canvas.blendMode`** — Maps to `globalCompositeOperation`. Values include `'source-over'` (default), `'multiply'`, `'screen'`, `'overlay'`, `'difference'`, `'lighter'`, and many more.

**`canvas.globalAlpha`** — Global opacity multiplier (`0`–`1`, default `1`).

**`canvas.shadowBlur`** — Drop shadow blur radius. Set alongside `canvas.getContext('2d').shadowColor`.

#### Drawing shapes

**`canvas.circle(x, y, r)`** — Filled + stroked circle.

**`canvas.ellipse(x, y, rx, ry?)`** — Filled + stroked ellipse. `ry` defaults to `rx`.

**`canvas.rect(x, y, w, h?)`** — Filled + stroked rectangle. `h` defaults to `w` for a square.

**`canvas.line(x1, y1, x2, y2)`** — Stroked line.

**`canvas.triangle(x1, y1, x2, y2, x3, y3)`** — Filled + stroked triangle.

**`canvas.text(str, x, y, type?)`** — Draws text. `type` is `'fill'` (default) or `'stroke'`.

#### Transforms (use inside save/restore pairs)

**`canvas.save()`** / **`canvas.restore()`** — Push / pop the drawing state stack. Always use as a pair.

**`canvas.translate(x, y)`** — Shifts the coordinate origin.

**`canvas.rotate(radians)`** — Rotates the coordinate system. Use `nn.degToRad()` to convert.

**`canvas.scale(x, y?)`** — Scales the coordinate system.

#### Custom paths

**`canvas.beginPath()`** — Starts a new path. Render with `canvas.getContext('2d').fill()` / `.stroke()`.

**`canvas.arc(x, y, r, startAngle, endAngle, counterclockwise?)`** — Adds an arc to the current path. Angles in radians.

**`canvas.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)`** — Adds a cubic Bézier curve to the path.

#### Pixel data

**`canvas.getPixels()`** — Returns a flat `Uint8ClampedArray` of RGBA pixel data (`[r, g, b, a, r, g, b, a, ...]`).

**`canvas.setPixels(pixelArray)`** — Writes a `Uint8ClampedArray` back to the canvas. Must be same length as `getPixels()` output.

#### Images & gradients

**`canvas.drawImage(src, x, y, w?, h?)`** — Draws an image. `src` can be a URL string, `<img>`, `<video>`, or `<canvas>`. If a URL string is passed, loading is handled automatically.

**`canvas.createLinearGradient(x0, y0, x1, y1)`** — Returns a `CanvasGradient`. Call `.addColorStop(offset, color)` on it, then assign to `canvas.fillColor`.

---

### Rendering (SVG)

A `<svg>` element returned by `nn.create('svg')` has factory methods for adding child shapes. Each factory method returns the created child element, augmented with SVG-specific style and transform methods.

#### SVG factory methods (on the `<svg>` container and `<g>` groups)

**`svg.circle(cx, cy, r)`** — Creates and appends a `<circle>`.

**`svg.ellipse(cx, cy, rx, ry?)`** — Creates and appends an `<ellipse>`.

**`svg.rect(x, y, w, h?)`** — Creates and appends a `<rect>`.

**`svg.line(x1, y1, x2, y2)`** — Creates and appends a `<line>`.

**`svg.path(d)`** — Creates and appends a `<path>` with SVG path data string.

**`svg.polygon(points)`** — Creates and appends a `<polygon>`. `points` is a string or `[[x,y],...]` array.

**`svg.text(str, x?, y?)`** — Creates and appends a `<text>` element.

**`svg.group()`** — Creates and appends a `<g>` group element. Groups also have all the factory methods above.

**`svg.viewBox(x, y, w, h)`** — Sets the SVG `viewBox`, defining an internal coordinate system independent of actual pixel size.

#### SVG shape style methods (chainable on any SVG shape)

**`.fill(color)`** — Sets fill attribute. Use `'none'` for no fill.

**`.stroke(color)`** — Sets stroke color.

**`.strokeWidth(n)`** — Sets stroke thickness.

**`.strokeDash(pattern)`** — Sets `stroke-dasharray`. Pass a number or array of numbers.

**`.strokeOffset(n)`** — Sets `stroke-dashoffset`. Animating this draws lines.

**`.opacity(n)`** — Sets element opacity (`0`–`1`).

#### SVG layout methods (chainable on SVG shapes)

**`.position(x, y, x2?, y2?)`** — Moves the element. Meaning of x/y depends on type: circles/ellipses update `cx`/`cy`; rects/text update `x`/`y`; groups update their `translate()` transform; lines update `x1`/`y1` (optionally `x2`/`y2`).

**`.positionOrigin(type)`** — `'center'` makes `.position()` center rects and text on the given point.

**`.size(...)`** — Resizes the element. For circles: `r`. For ellipses: `rx, ry`. For rects/svg: `width, height`.

**`.borderRadius(rx, ry?)`** — Sets rounded corners on a `<rect>` by setting its `rx`/`ry` attributes. Only available on rect elements.

#### SVG transform methods (chainable on SVG shapes)

**`.rotate(deg, cx?, cy?)`** — SVG `rotate()` transform. Optional center point; without it, rotation is around the SVG origin.

**`.scale(x, y?)`** — SVG `scale()` transform.

**`.translate(x, y)`** — SVG `translate()` transform. Additive offset layered on top of existing coordinates.

#### SVG text alignment (on `<text>` and `<tspan>`)

**`.textAlign(val)`** — Sets `text-anchor`. Accepts `'left'`/`'start'`, `'center'`/`'middle'`, `'right'`/`'end'`.

**`.textBaseline(val)`** — Sets `dominant-baseline`. Accepts `'top'`, `'middle'`, `'bottom'`, `'alphabetic'`, `'hanging'`, `'ideographic'`.

---

### Data

**`nn.parse(str, options?)`** — Parses a JSON or CSV string. Auto-detects format: strings starting with `{` or `[` are parsed as JSON; everything else as CSV. For CSV, the first row is used as object keys by default. Pass `{ headers: false }` to get a 2D array instead.
- Returns: parsed object/array (JSON), array of objects (CSV with headers), or 2D array (CSV without headers).

**`nn.serialize(data, format?)`** — Converts data to a string. An array of plain objects → CSV; everything else → JSON. Pass `'csv'` or `'json'` as `format` to override.
- Returns: CSV or JSON string.

**`nn.download(data, filename?)`** — Triggers a browser file download. Auto-detects format: `<canvas>`/`<img>` → `.png` (or `.jpg`); `<svg>` → `.svg`; other DOM elements → `.html`; array of objects → `.csv`; plain string → `.txt`; everything else → `.json`. Also returns the serialized value.

**`nn.upload(options?)`** — Opens the file picker. Returns a Promise resolving with `{ name, size, type, data }`. `data` is a blob URL for images/video/audio, array of objects for CSV, parsed object for JSON, raw text otherwise. On validation failure resolves with `{ name, size, type, error }`.
- Options: `types` (array of MIME types), `maxSize` (KB), `filter` (function), `multiple` (boolean), `headers` (boolean for CSV parsing).
- With `multiple: true`: resolves with an array of result objects.

---

### Utilities

**`nn.sleep(ms)`** — Returns a Promise that resolves after `ms` milliseconds. Use with `async`/`await`.

**`nn.times(n, fn)`** — Calls `fn` exactly `n` times, passing the 0-based index. Returns an array of return values. Concise alternative to a `for` loop.

**`nn.range(end) / nn.range(start, end, step?, map?)`** — Generates an array of numbers from `start` (default `0`) up to but not including `end`. `step` defaults to `1` (or `-1` when counting down). Optional `map` function transforms each value.

---

### Maths

**`nn.lerp(a, b, t)`** — Linear interpolation. `t` is `0`–`1`. Returns the value `t` of the way from `a` to `b`.

**`nn.norm(value, min, max)`** — Normalizes a value from a range to `0`–`1`. Inverse of `lerp`.

**`nn.clamp(value, min, max)`** — Constrains a value to stay within `[min, max]`.

**`nn.map(value, sourceMin, sourceMax, destMin, destMax)`** — Re-maps a value from one range to another.

**`nn.dist(p1x, p1y, p2x?, p2y?)`** — Euclidean distance between two 2D points. With 2 args returns absolute difference (1D distance).

**`nn.angleBtw(p1x, p1y, p2x, p2y)`** — Angle in radians from point 1 to point 2, measured from the positive X axis. Range `-π` to `π`.

**`nn.radToDeg(radians)`** — Converts radians to degrees.

**`nn.degToRad(degrees)`** — Converts degrees to radians.

**`nn.cartesianToPolar(x, y)`** — Returns `{ distance, radians, degrees }`.

**`nn.polarToCartesian(distance, angle)`** — Returns `{ x, y }`.

**`nn.shuffle(arr)`** — Shuffles an array in-place (Fisher-Yates). Returns the same array (mutates).

**`nn.randomInt(min, max)`** — Random integer, inclusive of both ends. With one arg, `min` defaults to `0`.

**`nn.randomFloat(min, max)`** — Random float. With one arg, `min` defaults to `0`.

**`nn.random(val?, val2?)`** — Flexible: no args → float `0`–`1`; one number → float `0`–`n`; two numbers → float in range; array → random element; string with spaces → random word; single word → random character.

**`nn.perlin()`** — Creates a Perlin noise object. Call `.get(x)` for 1D or `.get(x, y)` for 2D noise (values ≈ `-1` to `1`). Call `.seed()` to randomize. Create multiple objects for independent noise fields.

**`nn.ease(type, t)`** — Applies an easing curve to `t` (`0`–`1`). `type` is a string like `'InOutCubic'`, `'OutBounce'`, `'InElastic'`. Available families: `Quad`, `Cubic`, `Quart`, `Quint`, `Sine`, `Circ`, `Elastic`, `Expo`, `Back`, `Bounce`, each with `In`, `Out`, `InOut` variants.

---

### Color Theory

**`nn.randomColor(type?, alpha?)`** — Random color string. `type` can be `'hex'` (default), `'rgb'`, `'rgba'`, `'hsl'`, `'hsla'`. `alpha` is `0`–`1` or `true` for random alpha.

**`nn.rgb(r, g, b, alpha?)`** — Builds a CSS `rgb()` / `rgba()` string from channel values `0`–`255`.

**`nn.hex(r, g, b, alpha?)`** — Builds a hex color string `'#rrggbb'` from channel values `0`–`255`.

**`nn.hsl(h, s, l, alpha?)`** — Builds a CSS `hsl()` / `hsla()` string. `h` is `0`–`360`, `s` and `l` are `0`–`100`.

**`nn.toRGB(value)`** — Converts any color to `{ r, g, b }`. Accepts hex strings, CSS named colors, CSS color strings, `{r,g,b}` / `{h,s,l}` objects, or a hue number.

**`nn.toHex(value)`** — Converts any color to a hex string.

**`nn.toHSL(value)`** — Converts any color to `{ h, s, l }`. `h` is `0`–`360`, `s` and `l` are `0`–`100`.

**`nn.alpha2hex(alpha)`** — Converts `0.0`–`1.0` alpha to a 2-char hex byte string (appended to 6-digit hex for 8-digit hex colors).

**`nn.hex2alpha(hex)`** — Converts a 2-char hex byte string back to a `0.0`–`1.0` float.

**`nn.lerpColor(a, b, t)`** — Blends two colors. Interpolates in HSL space along the shortest hue path. Returns a hex string.

**`nn.colorGradient(colors, stepsOrDirection)`** — Multi-stop gradient. With a number: returns an array of interpolated hex color steps. With a CSS direction string: returns a ready-to-use CSS gradient string (`linear-gradient`, `radial-gradient`, or `conic-gradient` is auto-detected from the string).

**`nn.colorScheme(options)`** — Generates a palette based on color theory. Options: `harmony` (`'analogous'`, `'complementary'`, `'triad'`, `'split-complementary'`, `'square'`, `'monochromatic'`, `'shades'`, `'random'`), `base` (any color), `count`, `saturation`, `lightness`, `includeBase`. Returns an array of hex strings.

**`nn.isLight(color)`** — Returns `true` if a color is perceptually light.

**`nn.colorContrast(a, b)`** — Returns the WCAG contrast ratio (`1`–`21`). AA requires `≥ 4.5`, AAA requires `≥ 7`.

**`nn.colorMatch(str)`** — Finds the first CSS color in a string. Returns `[type, colorString]` or `null`.

**`nn.closestColor(color, palette)`** — Finds the closest match to `color` in a palette array using RGB Euclidean distance.

---

### Music Theory

Note name format: letter + optional accidental + octave, e.g. `'C4'`, `'A#3'`, `'Bb5'`. Middle C = `'C4'` = MIDI `60`. Concert A = `'A4'` = MIDI `69`.

**`nn.noteToMidi(note)`** — Note name → MIDI integer. Returns `null` for invalid input.

**`nn.midiToNote(midi)`** — MIDI integer → note name string (accidentals as sharps).

**`nn.noteToFrequency(note)`** — Note name → frequency in Hz.

**`nn.frequencyToNote(frequency)`** — Hz → nearest note name string.

**`nn.midiToFrequency(midi)`** — MIDI → Hz. Formula: `440 × 2^((midi − 69) / 12)`.

**`nn.frequencyToMidi(frequency)`** — Hz → nearest MIDI integer.

**`nn.stripOctave(x)`** — Removes octave number from a note name. `'C4'` → `'C'`. Accepts a string or array.

**`nn.createScale(root, mode?, includeEndOctave?)`** — Returns an array of note name strings. `root` e.g. `'C'` or `'C4'`. `mode` can be a named string (`'major'`, `'minor'`, `'dorian'`, `'phrygian'`, `'lydian'`, `'mixolydian'`, `'aeolian'`, `'locrian'`, `'blues'`, `'major-pentatonic'`, `'minor-pentatonic'`, and others, see `nn.modes`), a custom step interval array, or `'random'`. If root includes an octave number, output includes octave annotations.

**`nn.randomMode()`** — Returns a random array of 7 step intervals summing to 12. Use as `mode` in `createScale`.

**`nn.rotateScale(scale, k?)`** — Rotates a scale array by `k` positions. Returns a new array.

**`nn.transposeScale(scale, semitones?)`** — Shifts every note in a scale by `semitones`. Works with pitch-class names, octave-annotated names, or MIDI numbers.

**`nn.createChord(scale, ch?)`** — Picks chord tones from a scale. `ch` is a chord name (`'triad'`, `'seventh'`, `'ninth'`, `'eleventh'`, `'thirteenth'`, `'power-chord'`, `'sus2'`, `'sus4'`, `'add9'`, `'six-chord'`, and others, see `nn.chords`) or a `[1,3,5]`-style degree array. Default is `'triad'`.

**`nn.voiceChord(ch, oct?)`** — Adds octave numbers to pitch-class note names so every note is strictly ascending. Starting from `oct` (default `4`). Useful for converting `createChord` output into playable MIDI pitches.

**`nn.notes`** — Object mapping semitone numbers to note names.

**`nn.modes`** — Object listing all available mode names and their step interval arrays.

**`nn.chords`** — Object listing all available chord names and their degree arrays.

---

### Media / Devices

**`nn.loadImage(url)`** — Returns a Promise that resolves with a loaded `<img>` element.

**`nn.filterImage(image, fn)`** — Loads an image onto a hidden canvas, passes its raw `Uint8ClampedArray` pixel data (RGBA, 4 values per pixel) to `fn` for in-place modification, then writes it back. Returns a Promise resolving with `{ image, canvas, data }`.

**`nn.filterVideo(video, fn)`** — Applies a pixel filter to a live `<video>` element every frame via `requestAnimationFrame`. Returns a `<canvas>` that updates each frame. Has `.update(fn)` to swap the filter and `.stop()` to cancel the loop.

**`nn.askFor(type, callback?)`** — Unified device access. `type` is one of: `'video'`, `'audio'`, `'capture'`, `'gps'`, `'notifications'`, `'clipboard'`, `'bluetooth'`, `'usb'`, `'serial'`, `'motion'`, `'orientation'`. Returns a Promise.

**`nn.askForStream(constraints)`** — Full `getUserMedia` access with constraints (e.g. `{ video: true, audio: true }`). Returns a Promise with a `MediaStream`.

**`nn.askForCapture(constraints?)`** — Screen/window/tab capture. Returns a Promise with a `MediaStream`. Must be called from a user gesture.

**`nn.askForNotifications()`** — Requests notification permission. Returns a Promise with `'granted'`, `'denied'`, or `'default'`.

**`nn.askForClipboard()`** — Reads the clipboard. Returns a Promise with the text string.

**`nn.askForBluetooth(filters?)`** — Shows Bluetooth device picker. Returns a Promise with a `BluetoothDevice`.

**`nn.askForUSB(filters?)`** — Shows USB device picker. Returns a Promise with a `USBDevice`.

**`nn.askForSerial(filters?)`** — Shows serial port picker. Returns a Promise with a `SerialPort`.

**`nn.askForMotion()`** — Requests device motion permission (iOS 13+). Returns a Promise with `'granted'` or `'denied'`.

**`nn.askForOrientation()`** — Requests device orientation permission (iOS 13+). Returns a Promise with `'granted'` or `'denied'`.

**`nn.askForGPS(callback?, options?)`** — Gets the user's location. Returns a Promise with `{ lat, lng, timestamp, coords }`. Optional `options.support` / `options.enable` strings for custom error messages.

**`nn.hyper(media).at(seconds, fn)`** — Attaches time-based cues to an `<audio>` or `<video>` element. `.at(seconds, fn)` fires `fn` when the playhead reaches that time. `.off(seconds, fn)` removes a cue. Seeking past a cue silently skips it.

**`nn.popup(url, x, y, w, h)`** — Opens a new browser window. Alternatively pass `(url, { left, top, width, height })`. Returns the window reference.

**`nn.MIDI(fn)`** — Requests Web MIDI access and registers `fn` as the handler for all incoming MIDI messages. `fn` receives `{ dev, chl, val }`.

---

### Feature Detection

All methods return a boolean unless noted. Useful as guards before using advanced APIs.

**`nn.isBrowser()`** — `true` if running in a browser.

**`nn.isMobile()`** — `true` if the user agent looks like a mobile device.

**`nn.hasWebGL()`** — WebGL support.

**`nn.hasWebVR()`** — WebVR API (deprecated, prefer WebXR).

**`nn.hasWebXR()`** — WebXR Device API (AR/VR).

**`nn.hasMIDI()`** — Web MIDI API.

**`nn.hasTouch()`** — Touch screen detected.

**`nn.hasWebAudio()`** — Web Audio API (`AudioContext`).

**`nn.hasMediaDevices()`** — `getUserMedia` available.

**`nn.hasDeviceMotion()`** — `DeviceMotionEvent` available.

**`nn.hasDeviceOrientation()`** — `DeviceOrientationEvent` available.

**`nn.hasPointerLock()`** — Pointer Lock API.

**`nn.hasGamepad()`** — Gamepad API.

**`nn.hasWebSerial()`** — Web Serial API.

**`nn.hasWebUSB()`** — Web USB API.

**`nn.hasBluetooth()`** — Web Bluetooth API.

**`nn.hasSpeechRecognition()`** — Speech Recognition API.

**`nn.hasSpeechSynthesis()`** — Speech Synthesis API.

**`nn.hasWebAssembly()`** — WebAssembly support.

**`nn.hasFullscreen()`** — Fullscreen API.

**`nn.screen()`** — Returns `{ orientation, colorDepth, width, height }`.

**`nn.orientation()`** — Returns `'landscape'`, `'portrait'`, or `'no-support'`.

**`nn.gpuInfo()`** — Returns `{ vendor, renderer }` GPU strings via WebGL debug extension.

**`nn.browserInfo()`** — Returns `{ name, version }` parsed from user-agent.

**`nn.platformInfo()`** — Returns `{ mobile, browser, oscpu, processors, platform }`.

**`nn.audioSupport()`** — Returns `{ mp3, vorbis, wav, aac }` with `'probably'` / `'maybe'` / `'no'` values.

**`nn.videoSupport()`** — Returns `{ captions, poster, webm, h264, theora }` with support strings.

**`nn.storageSupport()`** — Returns `{ localStorage, sessionStorage, indexedDB }` booleans.

**`nn.fontSupport()`** — Returns an array of available system font family names.

**`nn.language()`** — Returns `{ language }` or `{ language, country }`.

**`nn.timeZone()`** — Returns an IANA timezone string (e.g. `'America/Chicago'`) or UTC offset number.

---

## Common patterns

### Full-page canvas with animation loop
```js
let canvas

function setup () {
  canvas = nn.create('canvas')
    .resize(nn.width, nn.height)
    .position(0, 0)
    .addTo('body')
}

function draw () {
  requestAnimationFrame(draw)
  canvas.clear()
  canvas.fillColor = 'coral'
  canvas.circle(nn.mouseX, nn.mouseY, 40)
}

nn.on('load', setup)
nn.on('load', draw)
```

### Touch + mouse unified input with nn.pointers
```js
nn.on('pointermove', () => {
  for (const p of nn.pointers) {
    canvas.circle(p.x, p.y, 30)
  }
})
```

### Chaining element creation
```js
const card = nn.create('div')
  .css({ background: 'coral', padding: 20, borderRadius: 8 })
  .content('<h2>Hello</h2>')
  .addTo('body')
  .on('click', () => card.css('background', nn.randomColor()))
```

### Fetching and parsing external data (CSV from Google Sheets)
```js
async function setup () {
  const res = await fetch(csvUrl)
  const text = await res.text()
  const data = nn.parse(text) // array of objects
}
nn.on('load', setup)
```

### SVG scene
```js
nn.get('body')
  .css('background', 'rebeccapurple')
  .css('margin', 0)

svg = nn.create('svg').addTo('body')

const circ = svg
  .circle(200, 200, 80)
  .fill('coral')
  .stroke('white')
  .strokeWidth(3)

nn.on('mousemove', () => {
  circ.position(nn.mouseX, nn.mouseY)
})
```

### Smooth animation with lerp
```js
let currentX = nn.width / 2

function animate () {
  requestAnimationFrame(animate)
  currentX = nn.lerp(currentX, nn.mouseX, 0.08) // eases toward mouse
  canvas.clear()
  canvas.circle(currentX, nn.height / 2, 40)
}
```

### Using positionOrigin('center')
```js
// Always call positionOrigin BEFORE position.
// For elements with unknown dimensions at call time (not yet in DOM,
// or CSS not yet applied), position is automatically re-applied once
// dimensions are available.
nn.create('div')
  .positionOrigin('center')
  .position(nn.mouseX, nn.mouseY) // x,y = center of div
  .addTo('body')
  .css({ width: 50, height: 50, borderRadius: '50%', background: 'coral' })
```
