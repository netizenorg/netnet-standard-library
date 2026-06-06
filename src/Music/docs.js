const MUSIC_DOCS = [
  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ conversions ~ ~ ~ ~ ~ ~ ~ ~

  {
    name: 'noteToMidi',
    source: { filepath: 'src/Music/music.js', start: 2, end: 14 },
    signature: 'nn.noteToMidi(note)',
    description: 'Converts a note name string to a MIDI note number. Note names follow the format letter + optional accidental + octave, e.g. `"C4"`, `"A#3"`, `"Bb5"`. Middle C is `"C4"` = MIDI `60`; concert A is `"A4"` = MIDI `69`. Returns `null` for unrecognized input.',
    friendly: 'This method converts a note name like <code>"C4"</code> or <code>"A#3"</code> into its MIDI number. MIDI numbers are how most music software refers to pitches internally, for example middle C (<code>"C4"</code>) is 60.',
    params: [
      { name: 'note', description: 'A note name string, e.g. `"A4"`, `"C#3"`, `"Bb5"`.' }
    ],
    returns: 'An integer MIDI note number, or `null` for unrecognized input.',
    example: `let midiInfo, noteList, octave

// function to update MIDI info anytime
// the note or octave number change
function updateMidiInfo () {
  // create a note string from the current
  // noteList value and octave value, ex 'C4'
  const note = noteList.value + octave.value
  // pass it into the method to conver it
  const m = nn.noteToMidi(note)
  // update the content of the midiInfo
  const c = \` = \${m} (in MIDI)\`
  midiInfo.content(c)
}

// set page's CSS
nn.get('body').css({
  background: 'rebeccapurple',
  fontSize: 32,
  color: 'white'
})

// create a drop down list for notes
noteList = nn.create('select')
  .css('font-size', 32)
  .set('options', nn.notes)
  .addTo('body')
  .on('change', updateMidiInfo)

// create a number input for octave
octave = nn.create('input')
  .css('width', 60)
  .css('font-size', 32)
  .addTo('body')
  .set({
    type: 'number',
    min: 0,
    max: 8,
    step: 1,
    value: 4
  })
  .on('change', updateMidiInfo)

// create elements for conversion output
midiInfo = nn.create('span')
  .content(' = 60 (in MIDI)')
  .addTo('body')
`
  },

  {
    name: 'midiToNote',
    source: { filepath: 'src/Music/music.js', start: 26, end: 32 },
    signature: 'nn.midiToNote(midi)',
    description: 'Converts a MIDI note number back to a note name string, e.g. `60` → `"C4"`, `69` → `"A4"`. Accidentals are always expressed as sharps. Returns `null` for non-numeric input.',
    friendly: 'This method converts a MIDI number back into a human-readable note name. For example, <code>60</code> gives you <code>"C4"</code> (middle C) and <code>69</code> gives you <code>"A4"</code>.',
    params: [
      { name: 'midi', description: 'A MIDI note number (integer), e.g. `60`, `69`, `21`.' }
    ],
    returns: 'A note name string like `"C4"` or `"A#3"`, or `null` for invalid input.',
    example: `let noteInfo, midiInput

// function to update the note name anytime
// the MIDI number changes
function updateNoteInfo () {
  // get the current MIDI value from the input
  const midi = midiInput.value
  // convert it to a note name string
  const note = nn.midiToNote(midi)
  // update the conversion output
  noteInfo.content(' = ' + note + ' (note name)')
}

// set page's CSS
nn.get('body').css({
  background: 'rebeccapurple',
  fontSize: 32,
  color: 'white'
})

// create a number input for the MIDI value
midiInput = nn.create('input')
  .css('width', 80)
  .css('font-size', 32)
  .addTo('body')
  .set({
    type: 'number',
    min: 0,
    max: 127,
    step: 1,
    value: 60
  })
  .on('change', updateNoteInfo)

// create an element for the conversion output
noteInfo = nn.create('span')
  .content(' = C4 (note name)')
  .addTo('body')
`
  },

  {
    name: 'noteToFrequency',
    source: { filepath: 'src/Music/music.js', start: 34, end: 37 },
    signature: 'nn.noteToFrequency(note)',
    description: 'Converts a note name directly to its frequency in Hz. `"A4"` → `440`, `"A5"` → `880`, frequency doubles every octave. Combines `noteToMidi` and `midiToFrequency` in one step. Returns `null` for unrecognized note names.',
    friendly: 'This method converts a note name into its frequency in Hz, the number you need to play that pitch with the Web Audio API. For example, <code>"A4"</code> gives you <code>440</code> Hz.',
    params: [
      { name: 'note', description: 'A note name string, e.g. `"A4"`, `"C#3"`, `"Bb5"`.' }
    ],
    returns: 'The frequency in Hz as a float, or `null` for unrecognized input.',
    example: `let freqInfo, noteList, octave

// function to update the frequency anytime
// the note or octave number change
function updateFreqInfo () {
  // create a note string from the current
  // noteList value and octave value, ex 'C4'
  const note = noteList.value + octave.value
  // convert it to a frequency in Hz
  const freq = nn.noteToFrequency(note)
  // update the conversion output
  freqInfo.content(' = ' + +freq.toFixed(2) + ' Hz')
}

// set page's CSS
nn.get('body').css({
  background: 'rebeccapurple',
  fontSize: 32,
  color: 'white'
})

// create a drop down list for notes
noteList = nn.create('select')
  .css('font-size', 32)
  .set('options', nn.notes)
  .addTo('body')
  .on('change', updateFreqInfo)

// create a number input for octave
octave = nn.create('input')
  .css('width', 60)
  .css('font-size', 32)
  .addTo('body')
  .set({
    type: 'number',
    min: 0,
    max: 8,
    step: 1,
    value: 4
  })
  .on('change', updateFreqInfo)

// create an element for the conversion output
freqInfo = nn.create('span')
  .content(' = 261.63 Hz')
  .addTo('body')
`
  },

  {
    name: 'frequencyToNote',
    source: { filepath: 'src/Music/music.js', start: 39, end: 42 },
    signature: 'nn.frequencyToNote(frequency)',
    description: 'Returns the nearest note name for a given frequency in Hz. The result is rounded to the closest semitone. useful for snapping an audio analysis result to a musical pitch. Returns `null` for non-positive or invalid input.',
    friendly: 'This method converts a frequency in Hz back into the nearest note name. For example, <code>440</code> gives you <code>"A4"</code>. It\'s useful for identifying what note a detected sound is closest to.',
    params: [
      { name: 'frequency', description: 'A frequency in Hz, e.g. `440`, `261.63`.' }
    ],
    returns: 'The nearest note name string, or `null` for invalid input.',
    example: `let noteInfo, freqInput

// function to update the note name anytime
// the frequency value changes
function updateNoteInfo () {
  // get the current frequency from the input
  const freq = freqInput.value
  // find the closest note name for that frequency
  const note = nn.frequencyToNote(freq)
  // update the conversion output
  noteInfo.content(' = ' + note + ' (note name)')
}

// set page's CSS
nn.get('body').css({
  background: 'rebeccapurple',
  fontSize: 32,
  color: 'white'
})

// create a number input for the frequency
freqInput = nn.create('input')
  .css('width', 120)
  .css('font-size', 32)
  .addTo('body')
  .set({
    type: 'number',
    min: 20,
    max: 20000,
    step: 1,
    value: 440
  })
  .on('change', updateNoteInfo)

// add a Hz label after the input
nn.create('span').content(' Hz').addTo('body')

// create an element for the conversion output
noteInfo = nn.create('span')
  .content(' = A4 (note name)')
  .addTo('body')
`
  },

  {
    name: 'midiToFrequency',
    source: { filepath: 'src/Music/music.js', start: 16, end: 19 },
    signature: 'nn.midiToFrequency(midi)',
    description: 'Converts a MIDI note number to its frequency in Hz using the formula `440 × 2^((midi − 69) / 12)`. MIDI `69` (`A4`) = `440 Hz` is the tuning reference. Frequency doubles with each octave (every 12 semitones). Returns `null` for non-numeric or `NaN` input.',
    friendly: 'This method converts a MIDI note number into its frequency in Hz. For example, MIDI <code>69</code> (<code>"A4"</code>) gives you <code>440</code> Hz, which is the standard tuning reference pitch.',
    params: [
      { name: 'midi', description: 'A MIDI note number, e.g. `69` for A4, `60` for middle C.' }
    ],
    returns: 'The frequency in Hz as a float, or `null` for invalid input.',
    example: `let freqInfo, midiInput

// function to update the frequency anytime
// the MIDI number changes
function updateFreqInfo () {
  // get the current MIDI value from the input
  const midi = midiInput.value
  // convert it to a frequency in Hz
  const freq = nn.midiToFrequency(midi)
  // update the conversion output
  freqInfo.content(' = ' + +freq.toFixed(2) + ' Hz')
}

// set page's CSS
nn.get('body').css({
  background: 'rebeccapurple',
  fontSize: 32,
  color: 'white'
})

// create a number input for the MIDI value
midiInput = nn.create('input')
  .css('width', 80)
  .css('font-size', 32)
  .addTo('body')
  .set({
    type: 'number',
    min: 0,
    max: 127,
    step: 1,
    value: 69
  })
  .on('change', updateFreqInfo)

// create an element for the conversion output
freqInfo = nn.create('span')
  .content(' = 440 Hz')
  .addTo('body')
`
  },

  {
    name: 'frequencyToMidi',
    source: { filepath: 'src/Music/music.js', start: 21, end: 24 },
    signature: 'nn.frequencyToMidi(frequency)',
    description: 'Converts a frequency in Hz to the nearest MIDI note number (always rounded to an integer). The inverse of `midiToFrequency`. Returns `null` for non-positive or invalid input.',
    friendly: 'This method converts a frequency in Hz into the nearest MIDI note number. For example, <code>440</code> Hz gives you <code>69</code>. It\'s the reverse of <code>nn.midiToFrequency()</code>.',
    params: [
      { name: 'frequency', description: 'A frequency in Hz, e.g. `440`, `261.63`.' }
    ],
    returns: 'The nearest MIDI note number as an integer, or `null` for invalid input.',
    example: `let midiInfo, freqInput

// function to update the MIDI number anytime
// the frequency value changes
function updateMidiInfo () {
  // get the current frequency from the input
  const freq = freqInput.value
  // find the nearest MIDI note number
  const midi = nn.frequencyToMidi(freq)
  // update the conversion output
  midiInfo.content(' = MIDI ' + midi)
}

// set page's CSS
nn.get('body').css({
  background: 'rebeccapurple',
  fontSize: 32,
  color: 'white'
})

// create a number input for the frequency
freqInput = nn.create('input')
  .css('width', 120)
  .css('font-size', 32)
  .addTo('body')
  .set({
    type: 'number',
    min: 20,
    max: 20000,
    step: 1,
    value: 440
  })
  .on('change', updateMidiInfo)

// add a Hz label after the input
nn.create('span').content(' Hz').addTo('body')

// create an element for the conversion output
midiInfo = nn.create('span')
  .content(' = MIDI 69')
  .addTo('body')
`
  },

  {
    name: 'stripOctave',
    source: { filepath: 'src/Music/music.js', start: 162, end: 174 },
    signature: 'nn.stripOctave(x)',
    description: 'Removes the octave number from a note name string, returning just the pitch class. `"C4"` → `"C"`, `"A#3"` → `"A#"`. Accepts a single string or an array of strings. Values without an octave number or non-string values are passed through unchanged.',
    friendly: 'This method strips the octave number off a note name, leaving just the pitch class. For example, <code>"C4"</code> becomes <code>"C"</code> and <code>"A#3"</code> becomes <code>"A#"</code>.',
    params: [
      { name: 'x', description: 'A note name string like `"C4"`, or an array of note name strings.' }
    ],
    returns: 'A pitch-class string, or an array of pitch-class strings.',
    example: `const note = 'C#4'
// strip the octave number off
const stripped = nn.stripOctave(note)
const message = note + ' without octave is ' + stripped

// set page's content and CSS
nn.get('body')
  .content(message)
  .css({
    background: 'rebeccapurple',
    fontSize: 32,
    color: 'white'
  })`
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ scales ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  {
    name: 'createScale',
    source: { filepath: 'src/Music/music.js', start: 65, end: 106 },
    signature: 'nn.createScale(root, mode, includeEndOctave)',
    description: 'Generates a musical scale as an array of note names. If `root` includes an octave number (e.g. `"C4"`) the output includes octave annotations; without one, only pitch-class names are returned (e.g. `"C"`, `"D"`). Pass `\'random\'` as `mode` to generate a random scale, or pass a custom array of semitone step intervals. Set `includeEndOctave` to `true` to append the root one octave higher. Available named modes include `"major"`, `"minor"`, `"dorian"`, `"phrygian"`, `"lydian"`, `"mixolydian"`, `"aeolian"`, `"locrian"`, `"blues"`, `"major-pentatonic"`, `"minor-pentatonic"`, and more, see `nn.modes` for the full list.',
    friendly: 'This method generates a musical scale as an array of note names. You give it a root note and a mode name like <code>"major"</code> or <code>"blues"</code>, and it returns all the notes in that scale.',
    params: [
      { name: 'root', description: 'The root note, e.g. `"C"`, `"A#"`, `"Bb4"`. Include an octave number to get octave-annotated output.' },
      { name: 'mode', optional: true, description: 'A mode name string, a custom array of semitone step intervals, or `\'random\'`. Defaults to `\'major\'`.' },
      { name: 'includeEndOctave', optional: true, description: 'If `true`, appends the root note one octave higher at the end. Defaults to `false`.' }
    ],
    returns: 'An array of note name strings, or `null` for invalid input.',
    example: `let piano, modesList, notesList, output

function update () {
  // get currently selected root/mode from
  // the drop down selection lists
  const root = notesList.value
  const mode = modesList.value
  // pass those values into the method to
  // get an array with notes from that scale
  const scale = nn.createScale(root, mode, true)
  // reset visuals
  piano.reset()
  piano.attack(scale)
  output.content(scale)
}


// set page's background
nn.get('body').css({ background: 'rebeccapurple', margin: 0 })

// create the piano keyboard (C4–B5)
// NOTE: this uses the "viz" library
// from https://algorithmicmusic.online
piano = viz.createPianoUI({
  labels: true,
  octaves: [4, 6],
  accentColor: 'coral'
})

nn.create('br').addTo('body')

// selectors for root note and mode
const noteStrings = nn.notes.map(n => n + 4)
notesList = nn.create('select')
  .set('options', noteStrings)
  .addTo('body')
  .on('input', update)

const modeNames = Object.keys(nn.modes)
modesList = nn.create('select')
  .set('options', modeNames)
  .addTo('body')
  .on('input', update)

// displays the scale note names as text
output = nn.create('pre')
  .addTo('body')
  .css({
    color: 'white',
    fontFamily: 'monospace',
    fontSize: 14,
    margin: '6px 4px'
  })


nn.on('load', update)`
  },

  {
    name: 'randomMode',
    source: { filepath: 'src/Music/music.js', start: 44, end: 63 },
    signature: 'nn.randomMode()',
    description: 'Generates a random set of 7 scale step intervals (each either `1` for a half step or `2` for a whole step) that sum to 12 semitones. The result can be passed directly to `createScale` as the `mode` argument to produce an algorithmically-invented scale.',
    friendly: 'This method generates a random set of musical intervals that define a made-up scale. You can pass the result straight into <code>nn.createScale()</code> to get an array of notes in that invented scale.',
    params: [],
    returns: 'An array of 7 integers (`1` or `2`) summing to `12`.',
    example: `let piano, output

function update () {
  // generate a random set of scale step intervals
  // and build a scale from C4 using those intervals
  const steps = nn.randomMode()
  const scale = nn.createScale('C4', steps, true)
  // highlight the scale on the piano
  piano.reset()
  piano.attack(scale)
  // show the step pattern and note names
  output.content(steps.join(', ') + '<br>' + scale.join(', '))
}

// set page's background
nn.get('body').css({ background: 'rebeccapurple', margin: 0 })

// create the piano keyboard (C4–B5)
// NOTE: this uses the "viz" library
// from https://algorithmicmusic.online
piano = viz.createPianoUI({
  labels: true,
  octaves: [4, 6],
  accentColor: 'coral'
})

nn.create('br').addTo('body')

// button to generate a new random scale
nn.create('button')
  .content('randomize')
  .addTo('body')
  .on('click', update)

// displays the step pattern and note names
output = nn.create('pre')
  .addTo('body')
  .css({
    color: 'white',
    fontFamily: 'monospace',
    fontSize: 14,
    margin: '6px 4px'
  })

nn.on('load', update)`
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ scale manipulation ~ ~ ~ ~

  {
    name: 'rotateScale',
    source: { filepath: 'src/Music/music.js', start: 120, end: 126 },
    signature: 'nn.rotateScale(scale, k)',
    description: 'Rotates a scale array by `k` steps, cycling the first `k` notes to the end. This is how the seven Greek modes relate to each other, each is a rotation of the major scale starting from a different degree. `k = 0` is the original scale, `k = 1` starts from the second degree, and so on.',
    friendly: 'This method rotates a scale so it starts from a different note in the sequence. For example, rotating C major by 1 step gives you D Dorian, which uses the same notes but starts on D instead.',
    params: [
      { name: 'scale', description: 'An array of note names as returned by `createScale`.' },
      { name: 'k', optional: true, description: 'Number of steps to rotate. Defaults to `0`. Wraps around the length of the scale.' }
    ],
    returns: 'A new array of note names with the rotation applied.',
    example: `let rotationInput, output

function update () {
  // get the rotation amount from the input
  const k = rotationInput.value
  // build C major then rotate it by k steps
  const major = nn.createScale('C', 'major')
  const scale = nn.rotateScale(major, k)
  // display the rotated scale note names
  output.content(scale.join(', '))
}

// set page's CSS
nn.get('body').css({
  background: 'rebeccapurple',
  fontSize: 32,
  color: 'white'
})

// number input to pick the rotation amount (0–6)
rotationInput = nn.create('input')
  .css('font-size', 32)
  .addTo('body')
  .set({
    type: 'number',
    min: 0,
    max: 6,
    step: 1,
    value: 0
  })
  .on('input', update)

// displays the rotated scale note names
output = nn.create('span')
  .addTo('body')

nn.on('load', update)`
  },

  {
    name: 'transposeScale',
    source: { filepath: 'src/Music/music.js', start: 128, end: 160 },
    signature: 'nn.transposeScale(scale, semitones)',
    description: 'Shifts every note in a scale by a given number of semitones. Works with pitch-class names (e.g. `"C"`, `"D#"`), octave-annotated names (e.g. `"C4"`, `"Eb5"`), and MIDI numbers. Positive values transpose up, negative values down. The interval structure is preserved, only the root changes.',
    friendly: 'This method shifts every note in a scale up or down by a number of semitones, like moving a piece of music to a different key. Positive numbers go up in pitch, negative numbers go down.',
    params: [
      { name: 'scale', description: 'An array of note names or MIDI numbers.' },
      { name: 'semitones', optional: true, description: 'Number of semitones to shift. Defaults to `0`. Positive = up, negative = down.' }
    ],
    returns: 'A new array of the same length with every note shifted by `semitones`.',
    example: `let piano, semitoneInput, output

function update () {
  // get current semitone shift from the slider
  const semitones = semitoneInput.value
  // build C major then transpose it by that many semitones
  const base = nn.createScale('C4', 'major', true)
  const scale = nn.transposeScale(base, semitones)
  // highlight the transposed scale on the piano
  piano.reset()
  piano.attack(scale)
  output.content(semitones + ' semitones: ' + scale.join(', '))
}

// set page's background
nn.get('body').css({ background: 'rebeccapurple', margin: 0 })

// create the piano keyboard (C4–B5)
// NOTE: this uses the "viz" library
// from https://algorithmicmusic.online
piano = viz.createPianoUI({
  labels: true,
  octaves: [3, 6],
  accentColor: 'coral'
})

nn.create('br').addTo('body')

// range slider to pick the semitone offset
semitoneInput = nn.create('input')
  .addTo('body')
  .set({
    type: 'range',
    min: -12,
    max: 12,
    step: 1,
    value: 0
  })
  .on('input', update)

// displays the transposed scale note names
output = nn.create('pre')
  .addTo('body')
  .css({
    color: 'white',
    fontFamily: 'monospace',
    fontSize: 14,
    margin: '6px 4px'
  })

nn.on('load', update)`
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ chords ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  {
    name: 'createChord',
    source: { filepath: 'src/Music/music.js', start: 108, end: 118 },
    signature: 'nn.createChord(scale, ch)',
    description: 'Extracts a chord from a scale by picking notes at specific scale degrees. The `ch` argument is a chord name string (e.g. `"triad"`, `"seventh"`) or a custom array of degree numbers (e.g. `[1, 3, 5]`). Available named chords include `"triad"`, `"seventh"`, `"ninth"`, `"eleventh"`, `"thirteenth"`, `"power-chord"`, `"sus2"`, `"sus4"`, `"add9"`, `"six-chord"`, and more, see `nn.chords` for the full list.',
    friendly: 'This method picks specific notes out of a scale to form a chord. You pass it a scale array and a chord type like <code>"triad"</code> or <code>"seventh"</code>, and it returns just the notes that make up that chord.',
    params: [
      { name: 'scale', description: 'An array of note names as returned by `createScale`.' },
      { name: 'ch', optional: true, description: 'A chord name string or an array of 1-based degree numbers. Defaults to `"triad"`.' }
    ],
    returns: 'An array of note name strings representing the chord tones.',
    example: `let piano, chordSelect, output

function update () {
  const chordType = chordSelect.value
  // build a scale with octave annotations
  const scale = nn.createScale('C4', 'major', true)
  // extract the chord notes from that scale
  const chord = nn.createChord(scale, chordType)
  // highlight the chord tones on the piano
  piano.reset()
  piano.attack(chord)
  output.content(chord.join(', '))
}

// set page's background
nn.get('body').css({ background: 'rebeccapurple', margin: 0 })

// create the piano keyboard (C4–B5)
// NOTE: this uses the "viz" library
// from https://algorithmicmusic.online
piano = viz.createPianoUI({
  labels: true,
  octaves: [4, 6],
  accentColor: 'coral'
})

nn.create('br').addTo('body')

// selector for chord type
chordSelect = nn.create('select')
  .set('options', Object.keys(nn.chords))
  .addTo('body')
  .on('input', update)

// displays the chord note names
output = nn.create('pre')
  .addTo('body')
  .css({
    color: 'white',
    fontFamily: 'monospace',
    fontSize: 14,
    margin: '6px 4px'
  })

nn.on('load', update)`
  },

  {
    name: 'voiceChord',
    source: { filepath: 'src/Music/music.js', start: 176, end: 223 },
    signature: 'nn.voiceChord(ch, oct)',
    description: 'Takes an array of pitch-class note names (or MIDI numbers) and returns a voiced version with octave annotations added so every note is strictly ascending in pitch. Starting from octave `oct` (default `4`), each note is placed in the lowest octave that keeps it above the previous. Use this to convert chord data from `createChord` into a playable voicing with no overlapping pitches.',
    friendly: 'This method takes a chord of pitch names without octave numbers and assigns each one an octave so all the notes go in ascending order with no overlaps. It\'s what you use to turn a chord from <code>nn.createChord()</code> into a properly voiced chord ready to use with something like Tone.js.',
    params: [
      { name: 'ch', description: 'An array of pitch-class note names (e.g. `["C", "E", "G"]`) or MIDI numbers.' },
      { name: 'oct', optional: true, description: 'The starting octave for the first note. Defaults to `4`.' }
    ],
    returns: 'An array of octave-annotated note name strings in strictly ascending order.',
    example: `let piano, chordSelect, octaveInput, output

function update () {
  // get the selected chord type and starting octave
  const chordType = chordSelect.value
  const oct = octaveInput.value
  // build a C major scale (pitch classes only)
  // and extract the chord notes from it
  const scale = nn.createScale('C', 'major')
  const chord = nn.createChord(scale, chordType)
  // add octave numbers so pitches are strictly ascending
  const voiced = nn.voiceChord(chord, oct)
  // highlight the voiced chord on the piano
  piano.reset()
  piano.attack(voiced)
  const o = chord.join(', ') + '→ ' + voiced.join(', ')
  output.content(o)
}

// set page's background
nn.get('body').css({ background: 'rebeccapurple', margin: 0 })

// create the piano keyboard (C4–B5)
// NOTE: this uses the "viz" library
// from https://algorithmicmusic.online
piano = viz.createPianoUI({
  labels: true,
  octaves: [2, 6],
  accentColor: 'coral'
})

nn.create('br').addTo('body')

// selector for chord type
chordSelect = nn.create('select')
  .set('options', Object.keys(nn.chords))
  .addTo('body')
  .on('input', update)

// number input for starting octave
octaveInput = nn.create('input')
  .css('width', 60)
  .addTo('body')
  .set({
    type: 'number',
    min: 2,
    max: 6,
    step: 1,
    value: 4
  })
  .on('input', update)

// displays the pitch classes and voiced notes
output = nn.create('pre')
  .addTo('body')
  .css({
    color: 'white',
    fontFamily: 'monospace',
    fontSize: 14,
    margin: '6px 4px'
  })

nn.on('load', update)`
  }
]

if (typeof module !== 'undefined') module.exports = MUSIC_DOCS
else window.MUSIC_DOCS = MUSIC_DOCS
