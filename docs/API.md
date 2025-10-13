## Classes

<dl>
<dt><a href="#FileUploader">FileUploader</a></dt>
<dd></dd>
</dl>

## Members

<dl>
<dt><a href="#mouseX">mouseX</a></dt>
<dd><p>This property (or internal <code>nn</code> variable) is used to check the mouse&#39;s current &quot;x&quot; (horizontal) position, or the number of pixels from the left of the browser window to the mouse.</p>
</dd>
<dt><a href="#mouseY">mouseY</a></dt>
<dd><p>This property (or internal <code>nn</code> variable) is used to check the mouse&#39;s current &quot;y&quot; (vertical) position, or the number of pixels from the top of the browser window to the mouse.</p>
</dd>
<dt><a href="#mouseDown">mouseDown</a></dt>
<dd><p>This property (or internal <code>nn</code> variable) is used to check the mouse is currently pressed down or not.</p>
</dd>
<dt><a href="#width">width</a></dt>
<dd><p>This property (or internal <code>nn</code> variable) is used to check the browser window&#39;s current width</p>
</dd>
<dt><a href="#height">height</a></dt>
<dd><p>This property (or internal <code>nn</code> variable) is used to check the browser window&#39;s current height</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#on">on()</a> ⇒ <code>undefined</code></dt>
<dd><p>This method is an alias for <code>window.addEventListener()</code></p>
</dd>
<dt><a href="#off">off()</a> ⇒ <code>undefined</code></dt>
<dd><p>This method is an alias for <code>window.removeEventListener()</code> and is the companion to <code>nn.on()</code>.
Pass the same function reference you used with <code>nn.on()</code> to remove it.</p>
</dd>
<dt><a href="#create">create()</a> ⇒ <code>Object</code></dt>
<dd><p>This function acts as an alias for the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement">document.createElement()</a> method, except that it returns an &quot;overloaded&quot; HTMLElement with a few additional methods, <code>.content()</code> a method for adding content to the element (text or other HTML elements), <code>.set()</code> for applying an object of HTML attributes to the element, <code>.css()</code> for applying an object similar to a CSS rule to the element, <code>.addTo()</code> a method for appending the element to another (it will also remove it from it&#39;s current parent if necessary) and <code>.on()</code>, an alias for <a href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener">.addEventListener()</a></p>
</dd>
<dt><a href="#get">get()</a> ⇒ <code>Object</code></dt>
<dd><p>This function acts as an alias for the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector">document.querySelector()</a> method, except that it returns an &quot;overloaded&quot; HTMLElement, see the <code>create</code> method above for more info.</p>
</dd>
<dt><a href="#getAll">getAll()</a> ⇒ <code>Object</code></dt>
<dd><p>This function acts as an alias for the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll">document.querySelectorAll()</a> method, except that it returns an &quot;overloaded&quot; HTMLElement, see the <code>create</code> method above for more info.</p>
</dd>
<dt><a href="#loadImage">loadImage()</a> ⇒ <code>Object</code></dt>
<dd><p>This function takes an image/data url and returns a promise with an image element containing the loaded image. It&#39;s essentially a promise-based alternative to the standard image load event.</p>
</dd>
<dt><a href="#modifyPixels">modifyPixels()</a> ⇒ <code>Object</code></dt>
<dd><p>This function takes an image/data url and returns a promise with an image element containing the loaded image. It&#39;s essentially a promise-based alternative to the standard image load event.</p>
</dd>
<dt><a href="#askFor">askFor()</a> ⇒ <code>Object</code></dt>
<dd><p>This function is an alias for the Web&#39;s <a href="https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia">getUserMedia</a> with some additional beginner friendly argument validation. This is an alias for <code>nn.askForStream()</code></p>
</dd>
<dt><a href="#askForStream">askForStream()</a> ⇒ <code>Object</code></dt>
<dd><p>This function is an alias for the Web&#39;s <a href="https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia">getUserMedia</a> with some additional beginner friendly argument validation.</p>
</dd>
<dt><a href="#askForGPS">askForGPS()</a> ⇒ <code>Object</code></dt>
<dd><p>This function abstracts the Web&#39;s <a href="https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition">Geolocation API</a>. It will only work on a GPS enabled device and web browser.</p>
</dd>
<dt><a href="#MIDI">MIDI()</a> ⇒ <code>undefined</code></dt>
<dd><p>This function abstracts the Web&#39;s <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API">MIDI API</a>. It will only work on a MIDI enabled web browser.</p>
</dd>
<dt><a href="#noteToMidi">noteToMidi(note)</a> ⇒ <code>number</code> | <code>null</code></dt>
<dd><p>Convert a note (e.g. &#39;C4&#39;, &#39;G#3&#39;, &#39;Bb5&#39;) to its MIDI note number</p>
</dd>
<dt><a href="#noteToFrequency">noteToFrequency(note)</a> ⇒ <code>number</code> | <code>null</code></dt>
<dd><p>Convert a note (e.g. &#39;C4&#39;, &#39;F#2&#39;) to its frequency in hertz</p>
</dd>
<dt><a href="#midiToNote">midiToNote(midi)</a> ⇒ <code>string</code> | <code>null</code></dt>
<dd><p>Convert a MIDI note number to its note name in scientific pitch notation</p>
</dd>
<dt><a href="#midiToFrequency">midiToFrequency(midi)</a> ⇒ <code>number</code> | <code>null</code></dt>
<dd><p>Convert a MIDI note number to its frequency in hertz</p>
</dd>
<dt><a href="#frequencyToMidi">frequencyToMidi(frequency)</a> ⇒ <code>number</code> | <code>null</code></dt>
<dd><p>Convert a frequency in hertz to the nearest MIDI note number</p>
</dd>
<dt><a href="#frequencyToNote">frequencyToNote(frequency)</a> ⇒ <code>string</code> | <code>null</code></dt>
<dd><p>Convert a frequency in hertz to the nearest note in scientific pitch notation</p>
</dd>
<dt><a href="#randomMode">randomMode()</a> ⇒ <code>Array.&lt;number&gt;</code></dt>
<dd><p>Generate a random seven-step mode that spans exactly one octave (12 semitones)</p>
</dd>
<dt><a href="#createScale">createScale(root, mode)</a> ⇒ <code>Array.&lt;string&gt;</code> | <code>null</code></dt>
<dd><p>Build a scale from a root pitch or pitch-class and a mode name or array of intervals</p>
</dd>
<dt><a href="#createChord">createChord(scale, ch)</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>Create an array of notes in a chord by selecting from a scale</p>
</dd>
<dt><a href="#fetch">fetch()</a> ⇒ <code>Object</code></dt>
<dd><p>This functions works exactly like the Web&#39;s <a href="https://developer.mozilla.org/en-US/docs/Web/API/fetch">Fetch API</a> except that where the Fetch API will occasionally throw a CORS errors (which can generally only be resolved by making the request server side, and thus necessitates creating a custom server) our fetch function runs through netnet&#39;s proxy to get around this issue. <strong>NOTE:</strong> This function only works in netnet.studio sketches and is meant for experimental/educational use.</p>
</dd>
<dt><a href="#sleep">sleep(ms)</a> ⇒ <code>Promise</code></dt>
<dd><p>Languages like python, Bash and PHP have &quot;sleep&quot; functions built-in, unfortunately JavaScript does not, hence why we&#39;ve included it in this library. A &quot;sleep&quot; function pauses execution for a specified amount of time. This function is useful in asynchronous workflows when you want to intentionally delay something (like animations, polling, retries, or just slowing things down for dramatic effect).</p>
</dd>
<dt><a href="#times">times(n, fn)</a> ⇒ <code>Array.&lt;any&gt;</code></dt>
<dd><p>Call a function a number of times, passing the current index each time.
Returns an array of results from the callback.</p>
</dd>
<dt><a href="#range">range(startOrEnd, [end], [stepOrMap], [map])</a> ⇒ <code>Array.&lt;any&gt;</code></dt>
<dd><p>Create a numeric range as an array, with optional mapping.
<code>range(end[, map])</code> → [0, 1, ..., end-1]
<code>range(start, end[, step][, map])</code> → values from start toward end (end-exclusive) using <code>step</code>.
If <code>map</code> is provided, returns values mapped with <code>(value, index) =&gt; any</code>.</p>
</dd>
<dt><a href="#bindCSS">bindCSS()</a> ⇒ <code>void</code></dt>
<dd><p>Running this function will bind together any HTML elements with <code>data-bind-var</code> and <code>data-bind-click</code> attributes to CSS variables, enabling dynamic and interactive styling based on user input and actions. For example, an input element with <code>data-bind-var=&quot;--main-color&quot;</code> will update the CSS variable <code>--main-color</code> if it&#39;s value changes, and any element with <code>data-bind-click=&quot;--main-font: add(2px)&quot;</code> will add two pixels to the current value of CSS variable <code>--main-font</code> once clicked. Other operations include <code>sub(val)</code>, <code>toggle(valA, valB)</code>, and <code>cycle(val1, val2, etc...)</code>.</p>
</dd>
<dt><a href="#parseCSV">parseCSV(csvText)</a> ⇒ <code>Array.&lt;Object&gt;</code></dt>
<dd><p>This function parses a CSV (Comma-Separated Values) string into an array of JavaScript objects.</p>
</dd>
<dt><a href="#parseJSON">parseJSON(jsonText)</a> ⇒ <code>Object</code> | <code>Array</code></dt>
<dd><p>This function parses a JSON (JavaScript Object Notation) string into a JavaScript object.</p>
</dd>
<dt><a href="#stringifyCSV">stringifyCSV(arrayOfObjects)</a> ⇒ <code>String</code></dt>
<dd><p>This function converts an array of JavaScript objects into a CSV (Comma-Separated Values) string.</p>
</dd>
<dt><a href="#stringifyJSON">stringifyJSON(data, [space])</a> ⇒ <code>String</code></dt>
<dd><p>This function takes data (either object or an array) to converts into a JSON (JavaScript Object Notation) string.</p>
</dd>
<dt><a href="#stringifyData">stringifyData()</a> ⇒ <code>String</code></dt>
<dd><p>This function takes either a JSON object to turn into a JSON string, or an array of objects with matching keys to turn into a CSV string. It can be used to convert JavaScript data structures into string data that can be saved to a file or elsewhere.</p>
</dd>
<dt><a href="#parseData">parseData()</a> ⇒ <code>Object</code></dt>
<dd><p>This function takes either a JSON string or a CSV string and parses into a JavaScript data structure, either an object or an array of objects.</p>
</dd>
<dt><a href="#loadData">loadData()</a> ⇒ <code>Object</code></dt>
<dd><p>This function takes a path to a file containing some data (ex: .json, .csv, .txt) loads the file (using  the <a href="https://developer.mozilla.org/en-US/docs/Web/API/fetch">Fetch API</a>) and parses into a JavaScript data structure, either an object or an array of objects.</p>
</dd>
<dt><a href="#isMobile">isMobile()</a> ⇒ <code>Boolean</code></dt>
<dd><p>This function is used to check if the page&#39;s visitor is on a mobile device</p>
</dd>
<dt><a href="#hasWebGL">hasWebGL()</a> ⇒ <code>Boolean</code></dt>
<dd><p>This function is used to check if the visitors device supports WebGL</p>
</dd>
<dt><a href="#hasWebVR">hasWebVR()</a> ⇒ <code>Boolean</code></dt>
<dd><p>This function is used to check if the visitors device supports WebVR</p>
</dd>
<dt><a href="#hasMIDI">hasMIDI()</a> ⇒ <code>Boolean</code></dt>
<dd><p>This function is used to check if the visitors device supports MIDI</p>
</dd>
<dt><a href="#hasTouch">hasTouch()</a> ⇒ <code>Boolean</code></dt>
<dd><p>This function is used to check if the visitors device has a touch screen</p>
</dd>
<dt><a href="#orientation">orientation()</a> ⇒ <code>String</code></dt>
<dd><p>This function is used to check the visitor&#39;s device orientation on mobile</p>
</dd>
<dt><a href="#screen">screen()</a> ⇒ <code>Object</code></dt>
<dd><p>This function is used to check the visitor&#39;s device screen info</p>
</dd>
<dt><a href="#gpuInfo">gpuInfo()</a> ⇒ <code>Object</code></dt>
<dd><p>This function is used to check the visitor&#39;s device GPU info</p>
</dd>
<dt><a href="#browserInfo">browserInfo()</a> ⇒ <code>Object</code></dt>
<dd><p>This function is used to check the visitor&#39;s browser info</p>
</dd>
<dt><a href="#platformInfo">platformInfo()</a> ⇒ <code>Object</code></dt>
<dd><p>This function is used to check the visitor&#39;s platform info, this includes whether they&#39;re on a mible device, their browserInfo as well as their Operating System, platform and how many CPUs they have</p>
</dd>
<dt><a href="#audioSupport">audioSupport()</a> ⇒ <code>Object</code></dt>
<dd><p>This function is used to check the visitor&#39;s device&#39;s audio support, returns an object with the probability that their device supports specific audio formats</p>
</dd>
<dt><a href="#videoSupport">videoSupport()</a> ⇒ <code>Object</code></dt>
<dd><p>This function is used to check the visitor&#39;s device&#39;s video support, returns an object with the probability that their device supports specific video formats and features</p>
</dd>
<dt><a href="#norm">norm(value, min, max)</a> ⇒ <code>Number</code></dt>
<dd><p>Often times it&#39;s helpful to work with &quot;normalized&quot; values, or values between 0 - 1. This method will return a normalized a number from another range into a value between <code>0</code> and <code>1</code>.</p>
</dd>
<dt><a href="#clamp">clamp(value, min, max)</a> ⇒ <code>Number</code></dt>
<dd><p>This function is used to constrain a value inside a specified range.</p>
</dd>
<dt><a href="#lerp">lerp(valueA, valueB, t)</a> ⇒ <code>Number</code></dt>
<dd><p>Linear interpolation, or “lerp” for short, is a technique commonly used when programming things like games or GUIs. In principle, a lerp function “eases” the transition between two values <code>a</code> and <code>b</code> over time. The <code>t</code> argument is the amount to interpolate between the two values where 0.0 is equal to the first point, 0.5 is half-way in between, and 1.0 is equal to the second point.</p>
</dd>
<dt><a href="#map">map(value, inputMin, inputMax, outputMin, outputMax)</a> ⇒ <code>Number</code></dt>
<dd><p>This function will map a value from a given range (inputMin and inputMax) to another range (outputMin and outputMax)</p>
</dd>
<dt><a href="#dist">dist(x1, y1, x2, y2)</a> ⇒ <code>Number</code></dt>
<dd><p>This function calculates the distance between two points</p>
</dd>
<dt><a href="#angleBtw">angleBtw(x1, y1, x2, y2)</a> ⇒ <code>Number</code></dt>
<dd><p>This function calculates the angle between two points in radians</p>
</dd>
<dt><a href="#radToDeg">radToDeg(radians)</a> ⇒ <code>Number</code></dt>
<dd><p>This function converts a angle value in radians to degrees</p>
</dd>
<dt><a href="#degToRad">degToRad(degrees)</a> ⇒ <code>Number</code></dt>
<dd><p>This function converts a angle degrees to radians</p>
</dd>
<dt><a href="#cartesianToPolar">cartesianToPolar(x1, y1)</a> ⇒ <code>Object</code></dt>
<dd><p>This function converts a point described in the cartesian coordinate system (x, y) to that same point described in a polar coordinate system (distance, angle).</p>
</dd>
<dt><a href="#polarToCartesian">polarToCartesian(dist, angle)</a> ⇒ <code>Object</code></dt>
<dd><p>This function converts a point described in a polar coordinate system (distance, angle) to that same point described in the cartesian coordinate system.</p>
</dd>
<dt><a href="#shuffle">shuffle(arr, the)</a> ⇒ <code>Object</code></dt>
<dd><p>This function shuffles the items in an array</p>
</dd>
<dt><a href="#randomInt">randomInt(a, b)</a> ⇒ <code>Number</code></dt>
<dd><p>returns a random integer given a max value or a min/max range</p>
</dd>
<dt><a href="#randomFloat">randomFloat(a, b)</a> ⇒ <code>Number</code></dt>
<dd><p>This function returns a random float (decimal) given a max value or a min/max range</p>
</dd>
<dt><a href="#random">random(a, b)</a> ⇒ <code>Number</code></dt>
<dd><p>This random function can be used just like the standard <code>Math.random()</code> fucnciton in JavaScript, but it can also take a few different types of optional arguments. When passed an array, it will return a random item from that array. When passed a string it will return a random letter or word from that string. When passed number values it behaves the same as <code>nn.randomFloat</code> returning a random decimal value within a given range.</p>
</dd>
<dt><a href="#perlin">perlin(a, b)</a> ⇒ <code>Number</code></dt>
<dd><p>The perlin method returns a perlinNoise object, which first needs to be seeded &amp;&amp; then can be used to return 1 or 2 dimensional noise from -1 to 1</p>
</dd>
<dt><a href="#ease">ease(type, t)</a> ⇒ <code>Number</code></dt>
<dd><p>There are loads of great (and much more complex) &quot;easing&quot; and &quot;tweening&quot; libraries out there. This is a fairly rudementary easing function which simply contains the easing equations for a variety of common easing types, specifically: InQuad, OutQuad, InOutQuad, InCubic, OutCubic, InOutCubic, InQuart, OutQuart, InOutQuart, InQuint, OutQuint, InOutQuint, InSine, OutSine, InOutSine, InCirc, OutCirc, InOutCirc, InElastic, OutElastic, InOutElastic, InExpo, OutExpo, InOutExpo, InBack, OutBack, InOutBack, InBounce and OutBounce</p>
</dd>
<dt><a href="#randomColor">randomColor([type], [alpha])</a> ⇒ <code>String</code></dt>
<dd><p>This function generates random color strings. It accepts two optional arguments, type and alpha. The type can be: &#39;hex&#39;, &#39;rgb&#39;, &#39;rgba&#39;, &#39;hsl&#39; or &#39;hsla&#39; and the alpha can be a float value (0.0 - 1.0) or a boolean</p>
</dd>
<dt><a href="#colorScheme">colorScheme(options)</a> ⇒ <code>Array.&lt;String&gt;</code></dt>
<dd><p>Generate a color scheme (array of hex strings) from a base color and a harmony type.
Supports common harmony types such as &#39;analogous&#39; and &#39;monochromatic&#39;, and exposes
options for saturation, lightness, angles, count, and basic WCAG contrast handling.</p>
</dd>
<dt><a href="#toRGB">toRGB(value, [defaults])</a> ⇒ <code>Object</code></dt>
<dd><p>Normalize a color into an RGB object <code>{ r, g, b }</code> with 0–255 channels.
Accepts hex/rgb/hsl strings, <code>{h,s,l}</code>/<code>{r,g,b}</code> objects, or a hue number.</p>
</dd>
<dt><a href="#rgb">rgb(r, g, b, [a])</a> ⇒ <code>String</code></dt>
<dd><p>Build a CSS rgb/rgba color string from channel values.
If <code>a</code> is provided, returns an rgba string with alpha 0.0–1.0.</p>
</dd>
<dt><a href="#toHSL">toHSL(value, [defaults])</a> ⇒ <code>Object</code></dt>
<dd><p>Normalize a color into an HSL object <code>{ h, s, l }</code> where h is 0–360 and s/l are 0–100.
Accepts hex/rgb/hsl strings, <code>{h,s,l}</code>/<code>{r,g,b}</code>/<code>{h,s,v}</code> objects, or a hue number.</p>
</dd>
<dt><a href="#hsl">hsl(h, s, l, [a])</a> ⇒ <code>String</code></dt>
<dd><p>Build a CSS hsl/hsla color string from channel values.
If <code>a</code> is provided, returns an hsla string with alpha 0.0–1.0.</p>
</dd>
<dt><a href="#isLight">isLight(color)</a> ⇒ <code>Boolean</code></dt>
<dd><p>It can often be useful to know if a color is &quot;light&quot; or &quot;dark&quot; when pairing other colors with it, for example to determine if a font color should be black or white so that it best stands out on a given background color. The <code>.isLight()</code> method takes a color string (either in hex or rgb) and will return <code>true</code> if it is a light color or <code>false</code> if it is a dark color.</p>
</dd>
<dt><a href="#colorContrast">colorContrast(colorA, colorB)</a> ⇒ <code>Number</code></dt>
<dd><p>Compute the WCAG contrast ratio between two colors.
Returns a number ≥ 1. Typical thresholds: 4.5 (AA), 7 (AAA).
Accepts hex/rgb/hsl strings or channel objects.</p>
</dd>
<dt><a href="#colorMatch">colorMatch(string)</a> ⇒ <code>Array</code></dt>
<dd><p>This function takes a string and returns the first color string it finds in the form of a parsed array (if no color is found it returns null)</p>
</dd>
<dt><a href="#alpha2hex">alpha2hex(alpha)</a> ⇒ <code>String</code></dt>
<dd><p>This function takes an alpha value between <code>0.0</code> and <code>1.0</code> and returns its corresponding hex character string</p>
</dd>
<dt><a href="#hex2alpha">hex2alpha(hex)</a> ⇒ <code>Number</code></dt>
<dd><p>This function takes a hex character (byte) and converts it into an alpha value</p>
</dd>
<dt><a href="#hex2rgb">hex2rgb(hex)</a> ⇒ <code>Object</code></dt>
<dd><p>This function takes a hex color string and returns the corresponding red (0-255), green (0-255) and blue (0-255) color object. If you add an <code>_</code> (underscore) before the method name it will return normailzed float values.</p>
</dd>
<dt><a href="#hex2hsl">hex2hsl(hex)</a> ⇒ <code>Object</code></dt>
<dd><p>This function takes a hex color string and returns the corresponding hue (0-360), saturation (0-100) and lightness (0-100) color object. If you add an <code>_</code> (underscore) before the method name it will return normailzed float values.</p>
</dd>
<dt><a href="#hex2hsv">hex2hsv(hex)</a> ⇒ <code>Object</code></dt>
<dd><p>tThis function akes a hex color string and returns the corresponding hue (0-360), saturation (0-100) and value (0-100) color object. If you add an <code>_</code> (underscore) before the method name it will return normailzed float values.</p>
</dd>
<dt><a href="#rgb2hex">rgb2hex(red, green, blue)</a> ⇒ <code>String</code></dt>
<dd><p>This function takes red, green and blue color values and returns the corresponding hex string. If you add an <code>_</code> (underscore) before the method name it will expect normalized float values between <code>0-1</code></p>
</dd>
<dt><a href="#rgb2hsl">rgb2hsl(red, green, blue)</a> ⇒ <code>Object</code></dt>
<dd><p>This function takes red, green and blue color values and returns the corresponding hue (0-360), saturation (0-100) and lightness (0-100) color object. If you add an <code>_</code> (underscore) before the method name it will expect normalized float values between <code>0-1</code> and return normalized values between <code>0-1</code></p>
</dd>
<dt><a href="#rgb2hsv">rgb2hsv(red, green, blue)</a> ⇒ <code>Object</code></dt>
<dd><p>This function takes red, green and blue color values and returns the corresponding hue (0-360), saturation (0-100) and value (0-100) color object. If you add an <code>_</code> (underscore) before the method name it will expect normalized float values between <code>0-1</code> and return normalized values between <code>0-1</code></p>
</dd>
<dt><a href="#hsl2hex">hsl2hex(hue, saturation, lightness)</a> ⇒ <code>String</code></dt>
<dd><p>This function takes hue, saturation, and lightness color values and returns the corresponding hex string. If you add an <code>_</code> (underscore) before the method name it will expect normalized float values between <code>0-1</code></p>
</dd>
<dt><a href="#hsl2rgb">hsl2rgb(hue, saturation, lightness)</a> ⇒ <code>Object</code></dt>
<dd><p>This function takes hue, saturation, and lightness color values and returns the corresponding red (0-255), green (0-255) and blue (0-255) color object. If you add an <code>_</code> (underscore) before the method name it will expect normalized float values between <code>0-1</code> and return normalized values between <code>0-1</code></p>
</dd>
<dt><a href="#hsl2hsv">hsl2hsv(hue, saturation, lightness)</a> ⇒ <code>Object</code></dt>
<dd><p>This function takes hue, saturation, and lightness color values and returns the corresponding hue (0-360), saturation (0-100) and value (0-100) color object. If you add an <code>_</code> (underscore) before the method name it will expect normalized float values between <code>0-1</code> and return normalized values between <code>0-1</code></p>
</dd>
<dt><a href="#hsv2hex">hsv2hex(hue, saturation, value)</a> ⇒ <code>String</code></dt>
<dd><p>This function takes hue, saturation, and vlue color values and returns the corresponding hex string. If you add an <code>_</code> (underscore) before the method name it will expect normalized float values between <code>0-1</code></p>
</dd>
<dt><a href="#hsv2rgb">hsv2rgb(hue, saturation, value)</a> ⇒ <code>Object</code></dt>
<dd><p>This function takes hue, saturation, and vlue color values and returns the corresponding red (0-255), green (0-255) and blue (0-255) color object. If you add an <code>_</code> (underscore) before the method name it will expect normalized float values between <code>0-1</code> and return normalized values between <code>0-1</code></p>
</dd>
<dt><a href="#hsv2hsl">hsv2hsl(hue, saturation, value)</a> ⇒ <code>Object</code></dt>
<dd><p>This function takes hue, saturation, and vlue color values and returns the corresponding hue (0-360), saturation (0-100) and value (0-100) color object. If you add an <code>_</code> (underscore) before the method name it will expect normalized float values between <code>0-1</code> and return normalized values between <code>0-1</code></p>
</dd>
</dl>

<a name="FileUploader"></a>

## FileUploader
**Kind**: global class  
<a name="new_FileUploader_new"></a>

### new FileUploader(config)
This function abstracts the `<input type="file">` by providing a class for quickly handling file uploads via clicking on elements or drag and dropping onto elements.


| Param | Type | Description |
| --- | --- | --- |
| config | <code>Object</code> | the options object |
| config.maxSize | <code>number</code> | limit max file size in kb |
| config.types | <code>Array</code> | limit allowed file mime types, for ex ['image/jpeg','audio/mpeg3'] |
| config.filter | <code>function</code> | an alternative to "types", where you can provide your own filtering logic for accepted files types |
| config.click | <code>String</code> | selector for clickable element, ex '#button' |
| config.drop | <code>String</code> | selector for drag&drop element, ex '#background' |
| config.dropping | <code>function</code> | for ex callback, runs when file is dragged over |
| config.dropped | <code>function</code> | runs when file has been dropped |
| config.ready | <code>function</code> | runs when data is ready |
| config.error | <code>function</code> | runs when there's an error |

**Example**  
```js
// assuming HTML like this:
// <button id="my-btn">click to upload</button>
const fu = new nn.FileUploader({
  maxSize: 1000,
  types: ['image/jpeg', 'image/png'],
  click: '#my-btn',
  ready: (file) => {
    console.log(`the data for the ${file.type} file called ${file.name} is ready`)
    console.log(file.data)
  },
  error: (err) => {
    console.error(err)
  }
})

// or assuming HTML like this:
// <button id="my-btn">click to upload</button>
// <section id="main">
//   <!-- some other HTML stuff here -->
// </section>
const fu = new nn.FileUploader({
  click: '#my-btn',
  drop: '#main',
  filter: (type) => {
    let audio = [
      'audio/wav', 'audio/mpeg3', 'audio/mp4', 'audio/aac',
      'audio/aacp', 'audio/ogg', 'audio/webm', 'audio/ogg',
      'audio/webm', 'audio/mpeg']
    let types = [ ...audio, 'text/plain' ]
    if (type.indexOf('image') > -1) return true
    else if (types.indexOf(type) > -1) return true
    else return false
  },
  dropping: (e) => { e.style.opacity = 0.5 },
  dropped: (e) => { e.style.opacity = 1 },
  ready: (file) => {
    console.log(`the data for the ${file.type} file called ${file.name} is ready`)
    console.log(file.data)
  },
  error: (err) => {
    console.error(err)
  }
})
```
<a name="mouseX"></a>

## mouseX
This property (or internal `nn` variable) is used to check the mouse's current "x" (horizontal) position, or the number of pixels from the left of the browser window to the mouse.

**Kind**: global variable  
<a name="mouseY"></a>

## mouseY
This property (or internal `nn` variable) is used to check the mouse's current "y" (vertical) position, or the number of pixels from the top of the browser window to the mouse.

**Kind**: global variable  
<a name="mouseDown"></a>

## mouseDown
This property (or internal `nn` variable) is used to check the mouse is currently pressed down or not.

**Kind**: global variable  
<a name="width"></a>

## width
This property (or internal `nn` variable) is used to check the browser window's current width

**Kind**: global variable  
<a name="height"></a>

## height
This property (or internal `nn` variable) is used to check the browser window's current height

**Kind**: global variable  
<a name="on"></a>

## on() ⇒ <code>undefined</code>
This method is an alias for `window.addEventListener()`

**Kind**: global function  
**Returns**: <code>undefined</code> - returns undefined  
**Example**  
```js
nn.on('load', () => console.log('the page has loaded!'))
```
<a name="off"></a>

## off() ⇒ <code>undefined</code>
This method is an alias for `window.removeEventListener()` and is the companion to `nn.on()`.
Pass the same function reference you used with `nn.on()` to remove it.

**Kind**: global function  
**Returns**: <code>undefined</code> - returns undefined  
**Example**  
```js
const onResize = () => console.log('resized')
nn.on('resize', onResize)
// later...
nn.off('resize', onResize)
```
<a name="create"></a>

## create() ⇒ <code>Object</code>
This function acts as an alias for the [document.createElement()](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement) method, except that it returns an "overloaded" HTMLElement with a few additional methods, `.content()` a method for adding content to the element (text or other HTML elements), `.set()` for applying an object of HTML attributes to the element, `.css()` for applying an object similar to a CSS rule to the element, `.addTo()` a method for appending the element to another (it will also remove it from it's current parent if necessary) and `.on()`, an alias for [.addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

**Kind**: global function  
**Returns**: <code>Object</code> - an overloaded instance of an HTMLElement  
**Example**  
```js
// this creates a div with red "hello world" text and adds it to the body of our page
// essentially: <div style="color: red">hello world</div>
nn.create('div').content('hello world').css({ color: 'red' }).addTo('body')
```
<a name="get"></a>

## get() ⇒ <code>Object</code>
This function acts as an alias for the [document.querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) method, except that it returns an "overloaded" HTMLElement, see the `create` method above for more info.

**Kind**: global function  
**Returns**: <code>Object</code> - an overloaded instance of an HTMLElement  
**Example**  
```js
// assuming the page has some <h1> in it
nn.get('h1').on('click', () => console.log('the h1 was clicked!'))
```
<a name="getAll"></a>

## getAll() ⇒ <code>Object</code>
This function acts as an alias for the [document.querySelectorAll()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) method, except that it returns an "overloaded" HTMLElement, see the `create` method above for more info.

**Kind**: global function  
**Returns**: <code>Object</code> - an array of overloaded instances of an HTMLElements  
**Example**  
```js
// assuming the page has a few <a> elements
// this changes the content of the third link
nn.getAll('a')[2].content('new text!')
```
<a name="loadImage"></a>

## loadImage() ⇒ <code>Object</code>
This function takes an image/data url and returns a promise with an image element containing the loaded image. It's essentially a promise-based alternative to the standard image load event.

**Kind**: global function  
**Returns**: <code>Object</code> - A Promise that resolves to an image element  
**Example**  
```js
async function main () {
  const img = await nn.loadImage(imageDataURL)
  document.body.appendChild(img)
}

nn.on('load', main)
```
<a name="modifyPixels"></a>

## modifyPixels() ⇒ <code>Object</code>
This function takes an image/data url and returns a promise with an image element containing the loaded image. It's essentially a promise-based alternative to the standard image load event.

**Kind**: global function  
**Returns**: <code>Object</code> - A Promise that results to an object with three variations of the algorithmically processed image: data (base64 image data), image (HTML image element) and canvas (HTML5 canvas element)  
**Example**  
```js
new nn.FileUploader({
  click: 'button', // a button element in the HTML document
  ready: async (file) => {
    const obj = await nn.modifyPixels(file.data, (pixels) => {
      // this algorithm inverts the image
      for (let i = 0; i < pixels.length; i += 4) {
        pixels[i] = 255 - pixels[i] // red
        pixels[i + 1] = 255 - pixels[i + 1] // green
        pixels[i + 2] = 255 - pixels[i + 2] // blue
      }
    })
    console.log(obj)
    document.body.appendChild(obj.image)
  }
})
```
<a name="askFor"></a>

## askFor() ⇒ <code>Object</code>
This function is an alias for the Web's [getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) with some additional beginner friendly argument validation. This is an alias for `nn.askForStream()`

**Kind**: global function  
**Returns**: <code>Object</code> - A Promise that resolves to a stream object (exactly like the Web's getUserMedia API)  
**Example**  
```js
async function main () {
  const stream = await nn.askFor({ video: true })
  // assuming "video" is an instance of a video element
  video.srcObject = stream
}

nn.on('load', main)
```
<a name="askForStream"></a>

## askForStream() ⇒ <code>Object</code>
This function is an alias for the Web's [getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) with some additional beginner friendly argument validation.

**Kind**: global function  
**Returns**: <code>Object</code> - A Promise that resolves to a stream object (exactly like the Web's getUserMedia API)  
**Example**  
```js
async function main () {
  const stream = await nn.askForStream({ video: true })
  // assuming "video" is an instance of a video element
  video.srcObject = stream
}

nn.on('load', main)
```
<a name="askForGPS"></a>

## askForGPS() ⇒ <code>Object</code>
This function abstracts the Web's [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition). It will only work on a GPS enabled device and web browser.

**Kind**: global function  
**Returns**: <code>Object</code> - an object contaning `lat` and `lng` properties, as well as a `timestampe` and a `coords` property which contains [GeolocationCoordinates](https://developer.mozilla.org/en-US/docs/Web/API/GeolocationCoordinates) object.  
**Example**  
```js
nn.askForGPS((data) => {
  console.log(data.lat, data.lng)
})

// or like this....
async function getData () {
  const data = await nn.askForGPS()
  console.log(data.lat, data.lng)
}

nn.on('load', main)
```
<a name="MIDI"></a>

## MIDI() ⇒ <code>undefined</code>
This function abstracts the Web's [MIDI API](https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API). It will only work on a MIDI enabled web browser.

**Kind**: global function  
**Returns**: <code>undefined</code> - doesn't return anything  
**Example**  
```js
if (nn.hasMIDI() === true) {
    nn.MIDI(msg => {
      console.log(`device: ${msg.dev}, channel: ${msg.chl}, value: ${msg.val}`)
    })
  }
```
<a name="noteToMidi"></a>

## noteToMidi(note) ⇒ <code>number</code> \| <code>null</code>
Convert a note (e.g. 'C4', 'G#3', 'Bb5') to its MIDI note number

**Kind**: global function  
**Returns**: <code>number</code> \| <code>null</code> - MIDI note number (0–127) or null if invalid  

| Param | Type | Description |
| --- | --- | --- |
| note | <code>string</code> | A note in scientific pitch notation |

**Example**  
```js
nn.noteToMidi('A4')
// → 69
```
<a name="noteToFrequency"></a>

## noteToFrequency(note) ⇒ <code>number</code> \| <code>null</code>
Convert a note (e.g. 'C4', 'F#2') to its frequency in hertz

**Kind**: global function  
**Returns**: <code>number</code> \| <code>null</code> - Frequency in Hz or null if invalid  

| Param | Type | Description |
| --- | --- | --- |
| note | <code>string</code> | A note in scientific pitch notation |

**Example**  
```js
nn.noteToFrequency('A4')
// → 440
```
<a name="midiToNote"></a>

## midiToNote(midi) ⇒ <code>string</code> \| <code>null</code>
Convert a MIDI note number to its note name in scientific pitch notation

**Kind**: global function  
**Returns**: <code>string</code> \| <code>null</code> - Note like 'C4', or null if invalid  

| Param | Type | Description |
| --- | --- | --- |
| midi | <code>number</code> | MIDI note number |

**Example**  
```js
nn.midiToNote(60)
// → 'C4'
```
<a name="midiToFrequency"></a>

## midiToFrequency(midi) ⇒ <code>number</code> \| <code>null</code>
Convert a MIDI note number to its frequency in hertz

**Kind**: global function  
**Returns**: <code>number</code> \| <code>null</code> - Frequency in Hz or null if invalid  

| Param | Type | Description |
| --- | --- | --- |
| midi | <code>number</code> | MIDI note number |

**Example**  
```js
nn.midiToFrequency(69)
// → 440
```
<a name="frequencyToMidi"></a>

## frequencyToMidi(frequency) ⇒ <code>number</code> \| <code>null</code>
Convert a frequency in hertz to the nearest MIDI note number

**Kind**: global function  
**Returns**: <code>number</code> \| <code>null</code> - MIDI note number or null if invalid  

| Param | Type | Description |
| --- | --- | --- |
| frequency | <code>number</code> | Frequency in Hz |

**Example**  
```js
nn.frequencyToMidi(440)
// → 69
```
<a name="frequencyToNote"></a>

## frequencyToNote(frequency) ⇒ <code>string</code> \| <code>null</code>
Convert a frequency in hertz to the nearest note in scientific pitch notation

**Kind**: global function  
**Returns**: <code>string</code> \| <code>null</code> - Note like 'A4' or null if invalid  

| Param | Type | Description |
| --- | --- | --- |
| frequency | <code>number</code> | Frequency in Hz |

**Example**  
```js
nn.frequencyToNote(261.63)
// → 'C4'
```
<a name="randomMode"></a>

## randomMode() ⇒ <code>Array.&lt;number&gt;</code>
Generate a random seven-step mode that spans exactly one octave (12 semitones)

**Kind**: global function  
**Returns**: <code>Array.&lt;number&gt;</code> - Array of 7 intervals summing to 12  
**Example**  
```js
nn.randomMode()
// → [2,1,2,2,2,1,2]
```
<a name="createScale"></a>

## createScale(root, mode) ⇒ <code>Array.&lt;string&gt;</code> \| <code>null</code>
Build a scale from a root pitch or pitch-class and a mode name or array of intervals

**Kind**: global function  
**Returns**: <code>Array.&lt;string&gt;</code> \| <code>null</code> - Array of notes (with octave if provided) or null if invalid  

| Param | Type | Description |
| --- | --- | --- |
| root | <code>string</code> | Root like 'C', 'F#3', 'Bb4' |
| mode | <code>string</code> \| <code>Array.&lt;number&gt;</code> | Mode name (e.g. 'ionian', 'minor', 'random') or custom steps array |

**Example**  
```js
nn.createScale('C4', 'major')
// → ['C4','D4','E4','F4','G4','A4','B4','C5']
nn.createScale('D', 'dorian')
// → ['D','E','F','G','A','B','C','D']
```
<a name="createChord"></a>

## createChord(scale, ch) ⇒ <code>Array.&lt;string&gt;</code>
Create an array of notes in a chord by selecting from a scale

**Kind**: global function  
**Returns**: <code>Array.&lt;string&gt;</code> - Array of chord notes  

| Param | Type | Description |
| --- | --- | --- |
| scale | <code>Array.&lt;string&gt;</code> | Array of notes forming a scale |
| ch | <code>string</code> \| <code>Array.&lt;number&gt;</code> | Name of a chord shape (e.g. 'triad') or array of degree values |

**Example**  
```js
const cMajorScale = nn.createScale('C4', 'major')
const cMajorTriad = nn.createChord(cMajorScale, 'triad')
console.log(cMajorTriad)
// → ['C4','E4','G4']
```
<a name="fetch"></a>

## fetch() ⇒ <code>Object</code>
This functions works exactly like the Web's [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/fetch) except that where the Fetch API will occasionally throw a CORS errors (which can generally only be resolved by making the request server side, and thus necessitates creating a custom server) our fetch function runs through netnet's proxy to get around this issue. **NOTE:** This function only works in netnet.studio sketches and is meant for experimental/educational use.

**Kind**: global function  
**Returns**: <code>Object</code> - A Promise that resolves to a Response object (exactly like the Web's Fetch API)  
**Example**  
```js
async function main () {
  const req = await nn.fetch('https://dog.ceo/api/breeds/image/random')
  const json = await req.json()
  document.body.innerHTML = `<img src="${json.message}" alt="a random dog">`
}

nn.on('load', main)
```
<a name="sleep"></a>

## sleep(ms) ⇒ <code>Promise</code>
Languages like python, Bash and PHP have "sleep" functions built-in, unfortunately JavaScript does not, hence why we've included it in this library. A "sleep" function pauses execution for a specified amount of time. This function is useful in asynchronous workflows when you want to intentionally delay something (like animations, polling, retries, or just slowing things down for dramatic effect).

**Kind**: global function  
**Returns**: <code>Promise</code> - A Promise that resolves after the given duration.  

| Param | Type | Description |
| --- | --- | --- |
| ms | <code>Number</code> | The number of milliseconds to pause for. |

**Example**  
```js
async function blink () {
  while (true) {
    const on = nn.get('body').style.background === 'white'
    if (on) nn.get('body').css('background', 'black')
    else nn.get('body').css('background', 'white')
    await nn.sleep(500)
  }
}

nn.on('load', blink)
```
<a name="times"></a>

## times(n, fn) ⇒ <code>Array.&lt;any&gt;</code>
Call a function a number of times, passing the current index each time.
Returns an array of results from the callback.

**Kind**: global function  
**Returns**: <code>Array.&lt;any&gt;</code> - Array of results returned by `fn`  

| Param | Type | Description |
| --- | --- | --- |
| n | <code>number</code> | How many times to call `fn` (floats are floored, negatives become 0) |
| fn | <code>function</code> | Function called with the current index (0 → n-1) |

**Example**  
```js
// create 5 divs
nn.times(5, (i) => nn.create('div').content(`item ${i}`).addTo('body'))
```
<a name="range"></a>

## range(startOrEnd, [end], [stepOrMap], [map]) ⇒ <code>Array.&lt;any&gt;</code>
Create a numeric range as an array, with optional mapping.
`range(end[, map])` → [0, 1, ..., end-1]
`range(start, end[, step][, map])` → values from start toward end (end-exclusive) using `step`.
If `map` is provided, returns values mapped with `(value, index) => any`.

**Kind**: global function  
**Returns**: <code>Array.&lt;any&gt;</code> - Array of numbers (or mapped values if `map` provided).  

| Param | Type | Description |
| --- | --- | --- |
| startOrEnd | <code>number</code> | If one arg, the exclusive end. If two+, the start value. |
| [end] | <code>number</code> | Exclusive end (not included). If omitted, start at 0 to `startOrEnd`. |
| [stepOrMap] | <code>number</code> \| <code>function</code> | Step between values (defaults to 1 or -1), or a mapping function. |
| [map] | <code>function</code> | Optional mapping function `(value, index) => any`. |

**Example**  
```js
nn.range(4)           // [0,1,2,3]
nn.range(2, 6)        // [2,3,4,5]
nn.range(10, 4, -2)   // [10,8,6]
nn.range(2, 5, (v) => v * v) // [4,9,16]
nn.range(10, 4, -3, (v,i) => `${i}:${v}`) // ['0:10','1:7','2:4']
```
<a name="bindCSS"></a>

## bindCSS() ⇒ <code>void</code>
Running this function will bind together any HTML elements with `data-bind-var` and `data-bind-click` attributes to CSS variables, enabling dynamic and interactive styling based on user input and actions. For example, an input element with `data-bind-var="--main-color"` will update the CSS variable `--main-color` if it's value changes, and any element with `data-bind-click="--main-font: add(2px)"` will add two pixels to the current value of CSS variable `--main-font` once clicked. Other operations include `sub(val)`, `toggle(valA, valB)`, and `cycle(val1, val2, etc...)`.

**Kind**: global function  
**Example**  
```js
// HTML
<input type="range" data-bind-var="--main-width" min="0" max="100">
<button data-bind-click="--primary-color:toggle(#FF0000, #00FF00)">Toggle Color</button>

// CSS
:root {
  --main-width: 50px
  --primary-color: #FF0000
}

.element {
  width: var(--main-width);
  background-color: var(--primary-color);
}

// JavaScript
nn.bindCSS()

// Behavior:
// - Adjusting the range input updates the width of elements with class "element".
// - Clicking the button toggles the primary color between red and green.
```
<a name="parseCSV"></a>

## parseCSV(csvText) ⇒ <code>Array.&lt;Object&gt;</code>
This function parses a CSV (Comma-Separated Values) string into an array of JavaScript objects.

**Kind**: global function  
**Returns**: <code>Array.&lt;Object&gt;</code> - An array of objects representing the parsed CSV data.  

| Param | Type | Description |
| --- | --- | --- |
| csvText | <code>String</code> | The CSV string to parse. |

**Example**  
```js
const csvData = "name,age,city\nJohn,30,New York\nJane,40,Miami"
const jsonData = nn.parseCSV(csvData)
console.log(jsonData)
// Output:
// [
//   { name: "John", age: "30", city: "New York" },
//   { name: "Jane", age: "40", city: "Miami" }
// ]
```
<a name="parseJSON"></a>

## parseJSON(jsonText) ⇒ <code>Object</code> \| <code>Array</code>
This function parses a JSON (JavaScript Object Notation) string into a JavaScript object.

**Kind**: global function  
**Returns**: <code>Object</code> \| <code>Array</code> - The JavaScript object or array resulting from parsing the JSON string.  

| Param | Type | Description |
| --- | --- | --- |
| jsonText | <code>String</code> | The JSON string to parse. |

**Example**  
```js
const jsonString = '{"name":"John","age":30,"city":"New York"}'
const jsonObject = nn.parseJSON(jsonString)
console.log(jsonObject)
// Output:
// { name: "John", age: 30, city: "New York" }
```
<a name="stringifyCSV"></a>

## stringifyCSV(arrayOfObjects) ⇒ <code>String</code>
This function converts an array of JavaScript objects into a CSV (Comma-Separated Values) string.

**Kind**: global function  
**Returns**: <code>String</code> - A CSV string representing the provided data.  

| Param | Type | Description |
| --- | --- | --- |
| arrayOfObjects | <code>Array.&lt;Object&gt;</code> | The array of objects to convert into CSV. |

**Example**  
```js
const arr = [
  { name: "John", age: "30", city: "New York" },
  { name: "Jane", age: "40", city: "Miami" }
]
const csvString = nn.stringifyCSV(arr)
console.log(csvString)
// Output:
// "name,age,city\n"John","30","New York"\n"Jane","40","Miami""
```
<a name="stringifyJSON"></a>

## stringifyJSON(data, [space]) ⇒ <code>String</code>
This function takes data (either object or an array) to converts into a JSON (JavaScript Object Notation) string.

**Kind**: global function  
**Returns**: <code>String</code> - A JSON string representing the provided data.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>Object</code> \| <code>Array</code> |  | The data to convert into a JSON string. |
| [space] | <code>Number</code> | <code>2</code> | The number of spaces to use for indentation in the resulting JSON string (for readability). |

**Example**  
```js
const obj = { name: "John", age: 30, city: "New York" }
const jsonString = nn.stringifyJSON(obj)
console.log(jsonString)
// Output:
// "{\n  "name": "John",\n  "age": 30,\n  "city": "New York"\n}"
```
<a name="stringifyData"></a>

## stringifyData() ⇒ <code>String</code>
This function takes either a JSON object to turn into a JSON string, or an array of objects with matching keys to turn into a CSV string. It can be used to convert JavaScript data structures into string data that can be saved to a file or elsewhere.

**Kind**: global function  
**Example**  
```js
const arr = [
  { name: "John", age: "30", city: "New York" },
  { name: "Jane", age: "40", city: "Miami" }
]
const str = nn.stringifyData(arr)
```
<a name="parseData"></a>

## parseData() ⇒ <code>Object</code>
This function takes either a JSON string or a CSV string and parses into a JavaScript data structure, either an object or an array of objects.

**Kind**: global function  
**Example**  
```js
const str = `name,age,city
  "John","30","New York"
  "Jane","40","Miami"`
const arr = nn.parseData(str)
```
<a name="loadData"></a>

## loadData() ⇒ <code>Object</code>
This function takes a path to a file containing some data (ex: .json, .csv, .txt) loads the file (using  the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/fetch)) and parses into a JavaScript data structure, either an object or an array of objects.

**Kind**: global function  
**Example**  
```js
async function setup () {
  const data = await nn.loadData('countries-gps.csv')
  console.log(data)
}
```
<a name="isMobile"></a>

## isMobile() ⇒ <code>Boolean</code>
This function is used to check if the page's visitor is on a mobile device

**Kind**: global function  
**Returns**: <code>Boolean</code> - returns true if the visitor is on a mobile device  
<a name="hasWebGL"></a>

## hasWebGL() ⇒ <code>Boolean</code>
This function is used to check if the visitors device supports WebGL

**Kind**: global function  
**Returns**: <code>Boolean</code> - returns true if the visitors device supports WebGL  
<a name="hasWebVR"></a>

## hasWebVR() ⇒ <code>Boolean</code>
This function is used to check if the visitors device supports WebVR

**Kind**: global function  
**Returns**: <code>Boolean</code> - returns true if the visitors device supports WebVR  
<a name="hasMIDI"></a>

## hasMIDI() ⇒ <code>Boolean</code>
This function is used to check if the visitors device supports MIDI

**Kind**: global function  
**Returns**: <code>Boolean</code> - returns true if the visitors device supports MIDI  
<a name="hasTouch"></a>

## hasTouch() ⇒ <code>Boolean</code>
This function is used to check if the visitors device has a touch screen

**Kind**: global function  
**Returns**: <code>Boolean</code> - returns true if the visitors device has a touch screen  
<a name="orientation"></a>

## orientation() ⇒ <code>String</code>
This function is used to check the visitor's device orientation on mobile

**Kind**: global function  
**Returns**: <code>String</code> - returns either 'landscape', 'portrait' or 'no-support'  
<a name="screen"></a>

## screen() ⇒ <code>Object</code>
This function is used to check the visitor's device screen info

**Kind**: global function  
**Returns**: <code>Object</code> - returns screen object  
**Example**  
```js
nn.screen()
// could return { orientation: "no-support", colorDepth: 24, width: 1732, height: 787 }
```
<a name="gpuInfo"></a>

## gpuInfo() ⇒ <code>Object</code>
This function is used to check the visitor's device GPU info

**Kind**: global function  
**Returns**: <code>Object</code> - returns gpu info object  
**Example**  
```js
nn.gpuInfo()
// could return { vendor: "Intel", renderer: "Intel(R) HD Graphics 400" }
```
<a name="browserInfo"></a>

## browserInfo() ⇒ <code>Object</code>
This function is used to check the visitor's browser info

**Kind**: global function  
**Returns**: <code>Object</code> - returns browser info object  
**Example**  
```js
nn.browserInfo()
// could return  { name: "Firefox", version: "106" }
```
<a name="platformInfo"></a>

## platformInfo() ⇒ <code>Object</code>
This function is used to check the visitor's platform info, this includes whether they're on a mible device, their browserInfo as well as their Operating System, platform and how many CPUs they have

**Kind**: global function  
**Returns**: <code>Object</code> - returns platform info object  
<a name="audioSupport"></a>

## audioSupport() ⇒ <code>Object</code>
This function is used to check the visitor's device's audio support, returns an object with the probability that their device supports specific audio formats

**Kind**: global function  
**Returns**: <code>Object</code> - returns audio support info object  
**Example**  
```js
nn.audioSupport()
// could return something like
// { mp3: "maybe", vorbis: "probably", wav: "probably", aac: "probably" }
```
<a name="videoSupport"></a>

## videoSupport() ⇒ <code>Object</code>
This function is used to check the visitor's device's video support, returns an object with the probability that their device supports specific video formats and features

**Kind**: global function  
**Returns**: <code>Object</code> - returns video support info object  
**Example**  
```js
nn.videoSupport()
// could return something like
// { captions: "probably", poster: "probably", webm: "probably", h264: "probably", theora: "probably" }
```
<a name="norm"></a>

## norm(value, min, max) ⇒ <code>Number</code>
Often times it's helpful to work with "normalized" values, or values between 0 - 1. This method will return a normalized a number from another range into a value between `0` and `1`.

**Kind**: global function  
**Returns**: <code>Number</code> - the normalized value  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Number</code> | the number to normalize |
| min | <code>Number</code> | the smallest value in the input range |
| max | <code>Number</code> | the largest value in the input range |

**Example**  
```js
nn.norm(50, 0, 255) // returns 0.19607843137254902
```
<a name="clamp"></a>

## clamp(value, min, max) ⇒ <code>Number</code>
This function is used to constrain a value inside a specified range.

**Kind**: global function  
**Returns**: <code>Number</code> - the clamped value  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Number</code> | the number to clamp |
| min | <code>Number</code> | the smallest value in the input range |
| max | <code>Number</code> | the largest value in the input range |

**Example**  
```js
nn.clamp(50, 100, 200) // returns 100
```
<a name="lerp"></a>

## lerp(valueA, valueB, t) ⇒ <code>Number</code>
Linear interpolation, or “lerp” for short, is a technique commonly used when programming things like games or GUIs. In principle, a lerp function “eases” the transition between two values `a` and `b` over time. The `t` argument is the amount to interpolate between the two values where 0.0 is equal to the first point, 0.5 is half-way in between, and 1.0 is equal to the second point.

**Kind**: global function  
**Returns**: <code>Number</code> - the normalized value  

| Param | Type | Description |
| --- | --- | --- |
| valueA | <code>Number</code> | the first value/point |
| valueB | <code>Number</code> | the second value/point |
| t | <code>Number</code> | the amount to interpolate |

**Example**  
```js
nn.lerp(0, 255, 0.5)
```
<a name="map"></a>

## map(value, inputMin, inputMax, outputMin, outputMax) ⇒ <code>Number</code>
This function will map a value from a given range (inputMin and inputMax) to another range (outputMin and outputMax)

**Kind**: global function  
**Returns**: <code>Number</code> - the mapped value  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Number</code> | the value to re-map |
| inputMin | <code>Number</code> | the smallest value in the input range |
| inputMax | <code>Number</code> | the largest value in the input range |
| outputMin | <code>Number</code> | the smallest value in the output range |
| outputMax | <code>Number</code> | the largest value in the output range |

**Example**  
```js
nn.map(50, 0, 100, 20, 40) // returns 30
```
<a name="dist"></a>

## dist(x1, y1, x2, y2) ⇒ <code>Number</code>
This function calculates the distance between two points

**Kind**: global function  
**Returns**: <code>Number</code> - the distance between the two points  

| Param | Type | Description |
| --- | --- | --- |
| x1 | <code>Number</code> | the x position of the first point |
| y1 | <code>Number</code> | the y position of the first point |
| x2 | <code>Number</code> | the x position of the second point |
| y2 | <code>Number</code> | the y position of the second point |

**Example**  
```js
nn.dist(20,50, 100, 250) // returns 215.40659228538016
```
<a name="angleBtw"></a>

## angleBtw(x1, y1, x2, y2) ⇒ <code>Number</code>
This function calculates the angle between two points in radians

**Kind**: global function  
**Returns**: <code>Number</code> - the angle between the two points in radians  

| Param | Type | Description |
| --- | --- | --- |
| x1 | <code>Number</code> | the x position of the first point |
| y1 | <code>Number</code> | the y position of the first point |
| x2 | <code>Number</code> | the x position of the second point |
| y2 | <code>Number</code> | the y position of the second point |

**Example**  
```js
nn.angleBtw(20,50, 100, 250) // returns 0.3805063771123649
```
<a name="radToDeg"></a>

## radToDeg(radians) ⇒ <code>Number</code>
This function converts a angle value in radians to degrees

**Kind**: global function  
**Returns**: <code>Number</code> - the angle in degrees  

| Param | Type | Description |
| --- | --- | --- |
| radians | <code>Number</code> | an angle in radians |

**Example**  
```js
nn.radToDeg(3.145) // returns 180.1952265686439
```
<a name="degToRad"></a>

## degToRad(degrees) ⇒ <code>Number</code>
This function converts a angle degrees to radians

**Kind**: global function  
**Returns**: <code>Number</code> - the angle in radians  

| Param | Type | Description |
| --- | --- | --- |
| degrees | <code>Number</code> | an angle in degrees |

**Example**  
```js
nn.degToRad(180) // returns 3.141592653589793
```
<a name="cartesianToPolar"></a>

## cartesianToPolar(x1, y1) ⇒ <code>Object</code>
This function converts a point described in the cartesian coordinate system (x, y) to that same point described in a polar coordinate system (distance, angle).

**Kind**: global function  
**Returns**: <code>Object</code> - the poloar coordinate { distance, radians, degrees }  

| Param | Type | Description |
| --- | --- | --- |
| x1 | <code>Number</code> | the x position of the point |
| y1 | <code>Number</code> | the y position of the point |

**Example**  
```js
nn.cartesianToPolar(100, 100)
// returns { distance: 141.4213562373095, radians: 0.7853981633974483, degrees: 45 }
```
<a name="polarToCartesian"></a>

## polarToCartesian(dist, angle) ⇒ <code>Object</code>
This function converts a point described in a polar coordinate system (distance, angle) to that same point described in the cartesian coordinate system.

**Kind**: global function  
**Returns**: <code>Object</code> - the cartesian coordinate { x, y }  

| Param | Type | Description |
| --- | --- | --- |
| dist | <code>Number</code> | the distance value |
| angle | <code>Number</code> | the angle in radians |

**Example**  
```js
nn.polarToCartesian(141.4213562373095, 0.7853981633974483)
// returns { x: 100, y: 100 }
```
<a name="shuffle"></a>

## shuffle(arr, the) ⇒ <code>Object</code>
This function shuffles the items in an array

**Kind**: global function  
**Returns**: <code>Object</code> - the cartesian coordinate { x, y }  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | the array to shuffle |
| the | <code>Array</code> | suffled array |

**Example**  
```js
nn.shuffle([1,2,3,4,5]) // could return [ 4, 3, 5, 2, 1 ]
```
<a name="randomInt"></a>

## randomInt(a, b) ⇒ <code>Number</code>
returns a random integer given a max value or a min/max range

**Kind**: global function  
**Returns**: <code>Number</code> - a random integer within the specified range  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>Number</code> | when no `b` value is passed, this is the max value, otherwise it is the minimum value |
| b | <code>Number</code> | the max value |

**Example**  
```js
nn.randomInt(10, 50) // could return 34
nn.randomInt(10) // could return 6
```
<a name="randomFloat"></a>

## randomFloat(a, b) ⇒ <code>Number</code>
This function returns a random float (decimal) given a max value or a min/max range

**Kind**: global function  
**Returns**: <code>Number</code> - a random float within the specified range  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>Number</code> | when no `b` value is passed, this is the max value, otherwise it is the minimum value |
| b | <code>Number</code> | the max value |

**Example**  
```js
nn.randomFloat(10, 50) // could return 34.823298753
nn.randomFloat(10) // could return 6.213897459
```
<a name="random"></a>

## random(a, b) ⇒ <code>Number</code>
This random function can be used just like the standard `Math.random()` fucnciton in JavaScript, but it can also take a few different types of optional arguments. When passed an array, it will return a random item from that array. When passed a string it will return a random letter or word from that string. When passed number values it behaves the same as `nn.randomFloat` returning a random decimal value within a given range.

**Kind**: global function  
**Returns**: <code>Number</code> - a random item from the passed array, or a random float within the specified range  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>Number</code> \| <code>Array</code> | either an array to select a random item from, or a string to select a random letter or word from, or a number. When it's a number and no `b` value is passed, this is the max value, otherwise it is the minimum value |
| b | <code>Number</code> | the max value |

**Example**  
```js
nn.random(['straw', 'wood', 'brick']) // could return "brick"
nn.random('world wide web') // could return 'web'
nn.random('worldwideweb') // could return 'w'
nn.random(10, 50) // could return 34.823298753
nn.random(10) // could return 6.213897459
nn.random() // could return 0.103984723014
```
<a name="perlin"></a>

## perlin(a, b) ⇒ <code>Number</code>
The perlin method returns a perlinNoise object, which first needs to be seeded && then can be used to return 1 or 2 dimensional noise from -1 to 1

**Kind**: global function  
**Returns**: <code>Number</code> - a random item from the passed array, or a random float within the specified range  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>Number</code> \| <code>Array</code> | either an array to select a random item from, or a number. When it's a number and no `b` value is passed, this is the max value, otherwise it is the minimum value |
| b | <code>Number</code> | the max value |

**Example**  
```js
// assuming we've got a canvas && ctx...
const perlin = Maths.perlin()
perlin.seed()
for (let x = 0; x < canvas.width; x++) {
  let y = perlin.get(x * 0.1)
  y = Maths.map(y, -1, 1, 0, canvas.height)
  ctx.lineTo(x, y)
}
ctx.stroke()
```
<a name="ease"></a>

## ease(type, t) ⇒ <code>Number</code>
There are loads of great (and much more complex) "easing" and "tweening" libraries out there. This is a fairly rudementary easing function which simply contains the easing equations for a variety of common easing types, specifically: InQuad, OutQuad, InOutQuad, InCubic, OutCubic, InOutCubic, InQuart, OutQuart, InOutQuart, InQuint, OutQuint, InOutQuint, InSine, OutSine, InOutSine, InCirc, OutCirc, InOutCirc, InElastic, OutElastic, InOutElastic, InExpo, OutExpo, InOutExpo, InBack, OutBack, InOutBack, InBounce and OutBounce

**Kind**: global function  
**Returns**: <code>Number</code> - the eased output value  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>String</code> | the kind of easing (see list above) |
| t | <code>Number</code> | the changing/delta value |

**Example**  
```js
// example of using one of the easing functions to get a tweened scrolling * effect
function tween (from, to, i = 0) {
  if (this.tweenTimer) clearTimeout(this.tweenTimer)
  const dur = 2 // duration in seconds
  const fps = 1000 / 30 // 30 frames per second
  const inc = 1 / dur / fps
  i += inc
  if (i >= 1) return
  const pos = nn.ease('InOutQuart', i)
  const Y = nn.map(pos, 0, 1, from, to)
  window.scrollTo(0, Y)
  this.tweenTimer = setTimeout(() => tween(from, to, i), fps)
}
tween(0, 100) // scroll from 0 to 1000 w/an easeInOutQuart
```
<a name="randomColor"></a>

## randomColor([type], [alpha]) ⇒ <code>String</code>
This function generates random color strings. It accepts two optional arguments, type and alpha. The type can be: 'hex', 'rgb', 'rgba', 'hsl' or 'hsla' and the alpha can be a float value (0.0 - 1.0) or a boolean

**Kind**: global function  
**Returns**: <code>String</code> - color string  

| Param | Type | Description |
| --- | --- | --- |
| [type] | <code>String</code> | can be 'hex', 'rgb', 'rgba', 'hsl' or 'hsla' |
| [alpha] | <code>Number</code> \| <code>Boolean</code> | can be a float value (0.0 - 1.0) or a boolean |

**Example**  
```js
nn.randomColor() // returns a random hex color string, for ex: "#5cfba6"
nn.randomColor('hex', 0.5) // could return for ex: "#5cfba67f"
nn.randomColor('rgb') // ex: "rgb(136, 44, 204)"
nn.randomColor('rgba') // ex: "rgba(85, 177, 23, 1)"
nn.randomColor('rgb', true) // ex: "rgba(122, 46, 239, 0.53)"
nn.randomColor('rgb', 0.5) // ex: "rgba(107, 110, 7, 0.5)"
```
<a name="colorScheme"></a>

## colorScheme(options) ⇒ <code>Array.&lt;String&gt;</code>
Generate a color scheme (array of hex strings) from a base color and a harmony type.
Supports common harmony types such as 'analogous' and 'monochromatic', and exposes
options for saturation, lightness, angles, count, and basic WCAG contrast handling.

**Kind**: global function  
**Returns**: <code>Array.&lt;String&gt;</code> - Array of hex color strings  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | Configuration |
| options.harmony | <code>String</code> |  | Harmony type (e.g. 'analogous', 'monochromatic', 'complementary', 'triadic', etc.) |
| options.base | <code>String</code> \| <code>Object</code> \| <code>Number</code> |  | The base color (hex/rgb/hsl string or {h,s,l}/{r,g,b} or hue number) |
| [options.saturation] | <code>Number</code> |  | Override saturation (0–100) |
| [options.lightness] | <code>Number</code> |  | Override lightness (0–100) |
| [options.count] | <code>Number</code> |  | How many colors to return |
| [options.includeBase] | <code>Boolean</code> | <code>true</code> | Whether to include the base color |
| [options.angle] | <code>Number</code> | <code>30</code> | Angle step in degrees (used by analogous) |
| [options.offset] | <code>Number</code> | <code>30</code> | Offset angle in degrees (used by split/compound) |
| [options.contrast] | <code>Number</code> \| <code>String</code> |  | Min contrast ratio (e.g. 4.5, 7 or 'AA'/'AAA') against `contrastAgainst` |
| [options.contrastAgainst] | <code>String</code> \| <code>Object</code> \| <code>Number</code> |  | Color to compare contrast against |
| [options.contrastStrategy] | <code>String</code> | <code>&#x27;adjust&#x27;</code> | 'adjust' to tweak lightness, or 'filter' to skip non-compliant colors |
| [options.steps] | <code>Number</code> | <code>1</code> | Steps to search when adjusting for contrast (higher = finer) |

**Example**  
```js
nn.colorScheme({ harmony: 'analogous', base: '#ff0066', count: 5 })
```
<a name="toRGB"></a>

## toRGB(value, [defaults]) ⇒ <code>Object</code>
Normalize a color into an RGB object `{ r, g, b }` with 0–255 channels.
Accepts hex/rgb/hsl strings, `{h,s,l}`/`{r,g,b}` objects, or a hue number.

**Kind**: global function  
**Returns**: <code>Object</code> - RGB channels in 0–255  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>String</code> \| <code>Object</code> \| <code>Number</code> | The input color (hex/rgb/hsl string, object, or hue number) |
| [defaults] | <code>Object</code> | Optional defaults used when converting from hue (e.g., `{ saturation: 100, lightness: 50 }`) |

**Example**  
```js
nn.toRGB('#ff0000') // { r:255, g:0, b:0 }
nn.toRGB({ h: 200, s: 60, l: 50 }) // → { r:..., g:..., b:... }
```
<a name="rgb"></a>

## rgb(r, g, b, [a]) ⇒ <code>String</code>
Build a CSS rgb/rgba color string from channel values.
If `a` is provided, returns an rgba string with alpha 0.0–1.0.

**Kind**: global function  
**Returns**: <code>String</code> - CSS color string like 'rgb(255, 0, 0)' or 'rgba(255, 0, 0, 0.5)'  

| Param | Type | Description |
| --- | --- | --- |
| r | <code>Number</code> | red 0–255 |
| g | <code>Number</code> | green 0–255 |
| b | <code>Number</code> | blue 0–255 |
| [a] | <code>Number</code> | alpha 0.0–1.0 |

**Example**  
```js
nn.rgb(255, 0, 0)      // 'rgb(255, 0, 0)'
nn.rgb(255, 0, 0, 0.5) // 'rgba(255, 0, 0, 0.5)'
```
<a name="toHSL"></a>

## toHSL(value, [defaults]) ⇒ <code>Object</code>
Normalize a color into an HSL object `{ h, s, l }` where h is 0–360 and s/l are 0–100.
Accepts hex/rgb/hsl strings, `{h,s,l}`/`{r,g,b}`/`{h,s,v}` objects, or a hue number.

**Kind**: global function  
**Returns**: <code>Object</code> - HSL channels (0–360, 0–100, 0–100)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>String</code> \| <code>Object</code> \| <code>Number</code> | The input color (hex/rgb/hsl string, object, or hue number) |
| [defaults] | <code>Object</code> | Optional defaults used when converting from hue (e.g., `{ saturation: 100, lightness: 50 }`) |

**Example**  
```js
nn.toHSL('#ff0000') // { h:0, s:100, l:50 }
nn.toHSL({ r: 255, g: 0, b: 0 }) // → { h:0, s:100, l:50 }
```
<a name="hsl"></a>

## hsl(h, s, l, [a]) ⇒ <code>String</code>
Build a CSS hsl/hsla color string from channel values.
If `a` is provided, returns an hsla string with alpha 0.0–1.0.

**Kind**: global function  
**Returns**: <code>String</code> - CSS color string like 'hsl(0, 100%, 50%)' or 'hsla(0, 100%, 50%, 0.5)'  

| Param | Type | Description |
| --- | --- | --- |
| h | <code>Number</code> | hue 0–360 |
| s | <code>Number</code> | saturation 0–100 |
| l | <code>Number</code> | lightness 0–100 |
| [a] | <code>Number</code> | alpha 0.0–1.0 |

**Example**  
```js
nn.hsl(0, 100, 50)      // 'hsl(0, 100%, 50%)'
nn.hsl(0, 100, 50, 0.5) // 'hsla(0, 100%, 50%, 0.5)'
```
<a name="isLight"></a>

## isLight(color) ⇒ <code>Boolean</code>
It can often be useful to know if a color is "light" or "dark" when pairing other colors with it, for example to determine if a font color should be black or white so that it best stands out on a given background color. The `.isLight()` method takes a color string (either in hex or rgb) and will return `true` if it is a light color or `false` if it is a dark color.

**Kind**: global function  
**Returns**: <code>Boolean</code> - Returns true if the color passed is a "light" color  

| Param | Type | Description |
| --- | --- | --- |
| color | <code>String</code> | hex or rgb string color value |

**Example**  
```js
nn.isLight('#ffffcc') // returns true
nn.isLight('#001100') // returns false
```
<a name="colorContrast"></a>

## colorContrast(colorA, colorB) ⇒ <code>Number</code>
Compute the WCAG contrast ratio between two colors.
Returns a number ≥ 1. Typical thresholds: 4.5 (AA), 7 (AAA).
Accepts hex/rgb/hsl strings or channel objects.

**Kind**: global function  
**Returns**: <code>Number</code> - Contrast ratio (L1+0.05)/(L2+0.05)  

| Param | Type | Description |
| --- | --- | --- |
| colorA | <code>String</code> \| <code>Object</code> | First color (hex/rgb/hsl string or object) |
| colorB | <code>String</code> \| <code>Object</code> | Second color (hex/rgb/hsl string or object) |

**Example**  
```js
nn.colorContrast('#000', '#fff') // 21
nn.colorContrast('rgb(0,0,0)', 'hsl(0,0%,100%)') // 21
```
<a name="colorMatch"></a>

## colorMatch(string) ⇒ <code>Array</code>
This function takes a string and returns the first color string it finds in the form of a parsed array (if no color is found it returns null)

**Kind**: global function  
**Returns**: <code>Array</code> - an array of parsed color values found in the string  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>String</code> | an arbitrary string of text |

**Example**  
```js
nn.colorMatch('div { color: rgba(34, 56, 88, 0.5); font-size: 23px; }')
// returns ["rgb", "rgba(34, 56, 88, 0.5)", "34", "56", "88", "0.5"]
```
<a name="alpha2hex"></a>

## alpha2hex(alpha) ⇒ <code>String</code>
This function takes an alpha value between `0.0` and `1.0` and returns its corresponding hex character string

**Kind**: global function  
**Returns**: <code>String</code> - a hex character string  

| Param | Type | Description |
| --- | --- | --- |
| alpha | <code>Number</code> | alpha/opacity float value |

**Example**  
```js
nn.alpha2hex(0.5) // returns "7f"
```
<a name="hex2alpha"></a>

## hex2alpha(hex) ⇒ <code>Number</code>
This function takes a hex character (byte) and converts it into an alpha value

**Kind**: global function  
**Returns**: <code>Number</code> - an alpha value betwee `0` and `1`  

| Param | Type | Description |
| --- | --- | --- |
| hex | <code>String</code> | a byte of hexcode |

**Example**  
```js
nn.hex2alpha('7F') // returns 0.5
```
<a name="hex2rgb"></a>

## hex2rgb(hex) ⇒ <code>Object</code>
This function takes a hex color string and returns the corresponding red (0-255), green (0-255) and blue (0-255) color object. If you add an `_` (underscore) before the method name it will return normailzed float values.

**Kind**: global function  
**Returns**: <code>Object</code> - an object with `{r, g, b}` color number values  

| Param | Type | Description |
| --- | --- | --- |
| hex | <code>String</code> | a hex color string |

**Example**  
```js
nn.hex2rgb('#ff0000') // returns { r: 255, g: 0, b: 0 }
nn._hex2rgb('#ff0000') // returns  { r: 1, g: 0, b: 0 }
```
<a name="hex2hsl"></a>

## hex2hsl(hex) ⇒ <code>Object</code>
This function takes a hex color string and returns the corresponding hue (0-360), saturation (0-100) and lightness (0-100) color object. If you add an `_` (underscore) before the method name it will return normailzed float values.

**Kind**: global function  
**Returns**: <code>Object</code> - an object with `{h, s, l}` color number values  

| Param | Type | Description |
| --- | --- | --- |
| hex | <code>String</code> | a hex color string |

**Example**  
```js
nn.hex2hsl('#ff0000') // returns { h: 0, s: 100, l: 50 }
nn._hex2hsl('#ff0000') // returns  { h: 0, s: 1, l: 0.5 }
```
<a name="hex2hsv"></a>

## hex2hsv(hex) ⇒ <code>Object</code>
tThis function akes a hex color string and returns the corresponding hue (0-360), saturation (0-100) and value (0-100) color object. If you add an `_` (underscore) before the method name it will return normailzed float values.

**Kind**: global function  
**Returns**: <code>Object</code> - an object with `{h, s, v}` color number values  

| Param | Type | Description |
| --- | --- | --- |
| hex | <code>String</code> | a hex color string |

**Example**  
```js
nn.hex2hsv('#ff0000') // returns { h: 0, s: 100, v: 100 }
nn._hex2hsv('#ff0000') // returns  { h: 0, s: 1, v: 1 }
```
<a name="rgb2hex"></a>

## rgb2hex(red, green, blue) ⇒ <code>String</code>
This function takes red, green and blue color values and returns the corresponding hex string. If you add an `_` (underscore) before the method name it will expect normalized float values between `0-1`

**Kind**: global function  
**Returns**: <code>String</code> - a hex color string  

| Param | Type | Description |
| --- | --- | --- |
| red | <code>Number</code> | value between 0-255 |
| green | <code>Number</code> | value between 0-255 |
| blue | <code>Number</code> | value between 0-255 |

**Example**  
```js
nn.rgb2hex(255, 0, 0) // returns '#ff0000'
nn._rgb2hex(1, 0, 0) // returns '#ff0000'
```
<a name="rgb2hsl"></a>

## rgb2hsl(red, green, blue) ⇒ <code>Object</code>
This function takes red, green and blue color values and returns the corresponding hue (0-360), saturation (0-100) and lightness (0-100) color object. If you add an `_` (underscore) before the method name it will expect normalized float values between `0-1` and return normalized values between `0-1`

**Kind**: global function  
**Returns**: <code>Object</code> - an object with `{h, s, l}` color number values  

| Param | Type | Description |
| --- | --- | --- |
| red | <code>Number</code> | value between 0-255 |
| green | <code>Number</code> | value between 0-255 |
| blue | <code>Number</code> | value between 0-255 |

**Example**  
```js
nn.rgb2hsl(255, 0, 0) // returns { h: 0, s: 100, l: 50 }
nn._rgb2hsl(1, 0, 0) // returns { h: 0, s: 1, l: 0.5 }
```
<a name="rgb2hsv"></a>

## rgb2hsv(red, green, blue) ⇒ <code>Object</code>
This function takes red, green and blue color values and returns the corresponding hue (0-360), saturation (0-100) and value (0-100) color object. If you add an `_` (underscore) before the method name it will expect normalized float values between `0-1` and return normalized values between `0-1`

**Kind**: global function  
**Returns**: <code>Object</code> - an object with `{h, s, v}` color number values  

| Param | Type | Description |
| --- | --- | --- |
| red | <code>Number</code> | value between 0-255 |
| green | <code>Number</code> | value between 0-255 |
| blue | <code>Number</code> | value between 0-255 |

**Example**  
```js
nn.rgb2hsv(255, 0, 0) // return { h: 0, s: 100, v: 100 }
nn._rgb2hsv(1, 0, 0) // return { h: 0, s: 1, v: 1 }
```
<a name="hsl2hex"></a>

## hsl2hex(hue, saturation, lightness) ⇒ <code>String</code>
This function takes hue, saturation, and lightness color values and returns the corresponding hex string. If you add an `_` (underscore) before the method name it will expect normalized float values between `0-1`

**Kind**: global function  
**Returns**: <code>String</code> - a hex color string  

| Param | Type | Description |
| --- | --- | --- |
| hue | <code>Number</code> | value between 0-360 |
| saturation | <code>Number</code> | value between 0-100 |
| lightness | <code>Number</code> | value between 0-100 |

**Example**  
```js
nn.hsl2hex(0, 100, 50) // returns '#ff0000'
nn._hsl2hex(0, 1, 0.5) // returns '#ff0000'
```
<a name="hsl2rgb"></a>

## hsl2rgb(hue, saturation, lightness) ⇒ <code>Object</code>
This function takes hue, saturation, and lightness color values and returns the corresponding red (0-255), green (0-255) and blue (0-255) color object. If you add an `_` (underscore) before the method name it will expect normalized float values between `0-1` and return normalized values between `0-1`

**Kind**: global function  
**Returns**: <code>Object</code> - an object with `{r, g, b}` color number values  

| Param | Type | Description |
| --- | --- | --- |
| hue | <code>Number</code> | value between 0-360 |
| saturation | <code>Number</code> | value between 0-100 |
| lightness | <code>Number</code> | value between 0-100 |

**Example**  
```js
nn.hsl2rgb(0, 100, 50) // return { r: 255, g: 0, b: 0 }
nn._hsl2rgb(0, 1, 0.5) // return { r: 1, g: 0, b: 0 }
```
<a name="hsl2hsv"></a>

## hsl2hsv(hue, saturation, lightness) ⇒ <code>Object</code>
This function takes hue, saturation, and lightness color values and returns the corresponding hue (0-360), saturation (0-100) and value (0-100) color object. If you add an `_` (underscore) before the method name it will expect normalized float values between `0-1` and return normalized values between `0-1`

**Kind**: global function  
**Returns**: <code>Object</code> - an object with `{h, s, v}` color number values  

| Param | Type | Description |
| --- | --- | --- |
| hue | <code>Number</code> | value between 0-360 |
| saturation | <code>Number</code> | value between 0-100 |
| lightness | <code>Number</code> | value between 0-100 |

**Example**  
```js
nn.hsl2hsv(0, 100, 50) // return { h: 0, s: 100, v: 100 }
nn._hsl2hsv(0, 1, 0.5) // return { h: 0, s: 1, v: 1 }
```
<a name="hsv2hex"></a>

## hsv2hex(hue, saturation, value) ⇒ <code>String</code>
This function takes hue, saturation, and vlue color values and returns the corresponding hex string. If you add an `_` (underscore) before the method name it will expect normalized float values between `0-1`

**Kind**: global function  
**Returns**: <code>String</code> - a hex color string  

| Param | Type | Description |
| --- | --- | --- |
| hue | <code>Number</code> | value between 0-360 |
| saturation | <code>Number</code> | value between 0-100 |
| value | <code>Number</code> | value between 0-100 |

**Example**  
```js
nn.hsv2hex(0, 100, 100) // returns '#ff0000'
nn._hsv2hex(0, 1, 1) // returns '#ff0000'
```
<a name="hsv2rgb"></a>

## hsv2rgb(hue, saturation, value) ⇒ <code>Object</code>
This function takes hue, saturation, and vlue color values and returns the corresponding red (0-255), green (0-255) and blue (0-255) color object. If you add an `_` (underscore) before the method name it will expect normalized float values between `0-1` and return normalized values between `0-1`

**Kind**: global function  
**Returns**: <code>Object</code> - an object with `{r, g, b}` color number values  

| Param | Type | Description |
| --- | --- | --- |
| hue | <code>Number</code> | value between 0-360 |
| saturation | <code>Number</code> | value between 0-100 |
| value | <code>Number</code> | value between 0-100 |

**Example**  
```js
nn.hsv2rgb(0, 100, 100) // return { r: 255, g: 0, b: 0 }
nn._hsv2rgb(0, 1, 1) // return { r: 1, g: 0, b: 0 }
```
<a name="hsv2hsl"></a>

## hsv2hsl(hue, saturation, value) ⇒ <code>Object</code>
This function takes hue, saturation, and vlue color values and returns the corresponding hue (0-360), saturation (0-100) and value (0-100) color object. If you add an `_` (underscore) before the method name it will expect normalized float values between `0-1` and return normalized values between `0-1`

**Kind**: global function  
**Returns**: <code>Object</code> - an object with `{h, s, v}` color number values  

| Param | Type | Description |
| --- | --- | --- |
| hue | <code>Number</code> | value between 0-360 |
| saturation | <code>Number</code> | value between 0-100 |
| value | <code>Number</code> | value between 0-100 |

**Example**  
```js
nn.hsv2hsl(0, 100, 100) // returns { h: 0, s: 100, l: 50 }
nn._hsv2hsl(0, 1, 1) // returns { h: 0, s: 1, l: 0.5 }
```
