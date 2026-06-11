# Changelog

All notable changes to the `nn` (netnet-standard-library) are documented here.
This project follows [Semantic Versioning](https://semver.org/) >> `MAJOR.MINOR.PATCH`:
a **major** bump means there are breaking changes, a **minor** bump adds new things without breaking anything, and a **patch** bump is a small bug fix.

---

## [1.0.1] — 2026-06-11

No code changes. Re-tagged to fix a jsDelivr CDN caching issue — the `@1.0.0` CDN URL was permanently cached with pre-release content before the stable build was published. Use `@1.0.1` in your CDN URL to get the correct build.

---

## [1.0.0] — 2026-06-06

### ⚠️ Breaking changes

These are changes that may require updates to existing sketches:

- **`nn.modifyPixels()` renamed to `nn.filterImage()`** — the new version also takes the image as its first argument: `nn.filterImage(image, fn)`.
- **`nn.FileUploader` class removed** — replaced by `nn.upload()` (see *Added — Data* below).
- **Data helpers renamed and consolidated:**
  - `nn.parseData()` / `nn.parseCSV()` / `nn.parseJSON()` → `nn.parse()`
  - `nn.stringifyData()` / `nn.stringifyCSV()` / `nn.stringifyJSON()` → `nn.serialize()`
- **Low-level color converters removed** — `nn.hex2rgb()`, `nn.hex2hsl()`, `nn.hex2hsv()`, `nn.rgb2hex()`, `nn.rgb2hsl()`, `nn.rgb2hsv()`, `nn.hsl2hex()`, `nn.hsl2rgb()`, `nn.hsl2hsv()`, `nn.hsv2hex()`, `nn.hsv2rgb()`, `nn.hsv2hsl()` are all gone. Use `nn.toRGB()`, `nn.toHSL()`, and `nn.toHex()` instead — they each accept any color format as input.

---

### ✨ Added

**Properties**
- `nn.pointer` — the first currently active pointer contact as `{ x, y, id, type }`, or `null` when nothing is touching/clicking. Works for mouse, touch, and stylus.
- `nn.pointers` — array of *all* currently active pointer contacts. Use this for multi-touch.

**Chainable element methods**
- `.size(w, h)` — set width and height in one call; omit `h` for a square
- `.set('.my-class')` and `.set('#my-id')` — shorthand for assigning a class or ID without passing a key/value pair
- `.css()` smart url() shorthand — for image-only CSS properties (`cursor`, `background-image`, etc.), passing an emoji or plain text string auto-generates an inline SVG data URL (e.g. `.css('cursor', '💿')`)
- `.value` — on `<input type="number">` and `<input type="range">`, automatically returns a JavaScript `number` instead of a string

**Media**
- `nn.filterVideo(video, fn, opts?)` — apply a live per-frame pixel filter to a `<video>` element every frame; returns a `<canvas>` that updates in real time, with `.update(fn, opts?)` to swap the filter and `.stop()` to cancel. Pass `{ raw: true }` for a flat `Uint8ClampedArray` instead of pixel objects (recommended for performance)
- `nn.popup(url, x, y, w, h)` — open a new browser window at a specific position and size
- `nn.hyper(media)` — attach time-based cues to an `<audio>` or `<video>` element; call `.at(seconds, fn)` to fire a function when the playhead reaches that time

**Permissions** — `nn.askFor()` is now a unified device-access dispatcher (e.g. `nn.askFor('video')`, `nn.askFor('bluetooth')`); these named helpers were also added:
- `nn.askForCapture()` — screen, window, or tab capture
- `nn.askForNotifications()` — push notification permission
- `nn.askForClipboard()` — read clipboard text
- `nn.askForBluetooth(filters?)` — Web Bluetooth device picker
- `nn.askForUSB(filters?)` — USB device picker
- `nn.askForSerial(filters?)` — serial port picker
- `nn.askForMotion()` — device motion permission (required on iOS 13+)
- `nn.askForOrientation()` — device orientation permission (required on iOS 13+)

**Data**
- `nn.parse(str)` — unified JSON/CSV parser; auto-detects format. Replaces `parseData`, `parseCSV`, and `parseJSON`.
- `nn.serialize(data, format?)` — unified serializer. Replaces `stringifyData`, `stringifyCSV`, and `stringifyJSON`.
- `nn.download(data, filename?)` — trigger a browser file download; auto-detects the file type from the data you pass in (canvas → PNG, SVG element → SVG, array of objects → CSV, etc.)
- `nn.upload(options?)` — Promise-based file picker that resolves with `{ name, size, type, data }`. Replaces the old `nn.FileUploader` class.

**Feature detection** — new detection helpers:
- `nn.isBrowser()` — `true` if running in a browser environment
- `nn.hasWebXR()`, `nn.hasWebAudio()`, `nn.hasMediaDevices()`
- `nn.hasDeviceMotion()`, `nn.hasDeviceOrientation()`, `nn.hasPointerLock()`, `nn.hasGamepad()`
- `nn.hasWebSerial()`, `nn.hasWebUSB()`, `nn.hasBluetooth()`
- `nn.hasSpeechRecognition()`, `nn.hasSpeechSynthesis()`, `nn.hasWebAssembly()`, `nn.hasFullscreen()`
- `nn.language()` — user's language/locale preference
- `nn.timeZone()` — user's IANA timezone string
- `nn.storageSupport()` — localStorage / sessionStorage / indexedDB availability
- `nn.fontSupport()` — available system font families

**Color**
- `nn.toHex(color)` — convert any color format to a hex string
- `nn.lerpColor(a, b, t)` — smoothly interpolate between two colors (in HSL space, along the shortest hue path); returns a hex string
- `nn.colorGradient(colors, stepsOrDirection)` — multi-stop gradient; pass a number to get an array of interpolated hex colors, or a CSS direction string to get a ready-to-use CSS `linear-gradient` / `radial-gradient` / `conic-gradient` string
- `nn.closestColor(color, palette)` — find the nearest match to a color in an array of colors (using RGB Euclidean distance)

**SVG rendering** — `nn.create('svg')` now returns a fully augmented SVG element. This was not available in v1.
- Shape factories: `.circle()`, `.ellipse()`, `.rect()`, `.line()`, `.path()`, `.polygon()`, `.polyline()`, `.text()`, `.group()`, `.image()`
- Layout: `.position()`, `.positionOrigin()`, `.size()`, `.borderRadius()` (rect only)
- Styling: `.fill()`, `.stroke()`, `.strokeWidth()`, `.strokeDash()`, `.strokeOffset()`, `.opacity()`, `.textAlign()`, `.textBaseline()`
- Transforms: `.rotate()`, `.scale()`, `.translate()`

**Versioning**
- The library now uses semantic versioning with git tags. You can pin your project to a specific version in the CDN URL to prevent your code from changing unexpectedly when the library updates:
  ```html
  <script src="https://cdn.jsdelivr.net/gh/netizenorg/netnet-standard-library@1.0.1/build/nn.min.js"></script>
  ```

---

### 🔄 Changed

- `nn.askFor()` now works as a unified device permission dispatcher (e.g. `nn.askFor('video')`, `nn.askFor('bluetooth')`, `nn.askFor('gps')`) in addition to the original camera/mic role.
- `nn.filterImage()` (formerly `nn.modifyPixels`) now takes the image as its first argument and returns `{ image, canvas, data }`.
- Canvas state properties: `fillColor` and `strokeColor` are the new preferred names, but `fillStyle` and `strokeStyle` still work as aliases — no code changes needed.
- **Internal:** all source modules moved into a `src/` subdirectory. This only affects contributors — end-user behavior is unchanged.

---

### ❌ Removed

| Removed | Use instead |
|---|---|
| `nn.modifyPixels()` | `nn.filterImage(image, fn)` |
| `nn.FileUploader` class | `nn.upload(options?)` |
| `nn.loadData()` | native `fetch()` + `nn.parse()` |
| `nn.parseData()`, `nn.parseCSV()`, `nn.parseJSON()` | `nn.parse()` |
| `nn.stringifyData()`, `nn.stringifyCSV()`, `nn.stringifyJSON()` | `nn.serialize()` |
| `nn.hex2rgb()`, `nn.hex2hsl()`, `nn.hex2hsv()` | `nn.toRGB()`, `nn.toHSL()`, `nn.toHex()` |
| `nn.rgb2hex()`, `nn.rgb2hsl()`, `nn.rgb2hsv()` | `nn.toHex()`, `nn.toHSL()` |
| `nn.hsl2hex()`, `nn.hsl2rgb()`, `nn.hsl2hsv()` | `nn.toHex()`, `nn.toRGB()` |
| `nn.hsv2hex()`, `nn.hsv2rgb()`, `nn.hsv2hsl()` | `nn.toHex()`, `nn.toRGB()`, `nn.toHSL()` |
| `nn.bindCSS()` | *(no direct replacement — was a netnet.studio-specific helper)* |
| `nn.fetch()` | native `fetch()` *(was a netnet.studio-only CORS proxy)* |

---

## [0.9.0] — initial pre-release

Initial pre-release. The library was used in production via netnet.studio but the public API was not yet considered stable.
