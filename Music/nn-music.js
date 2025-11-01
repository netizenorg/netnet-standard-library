class Music {
  static noteToMidi (note) {
    const noteRegex = /^([A-G])(b|#)?(\d+)$/
    const match = note.match(noteRegex)
    if (!match) return null

    const [, letter, accidental, octaveStr] = match
    let semitone = Music.NOTE_TO_SEMITONE[letter]
    if (accidental === '#') semitone++
    if (accidental === 'b') semitone--

    const octave = parseInt(octaveStr)
    return semitone + (octave + 1) * 12
  }

  static midiToFrequency (midi) {
    if (typeof midi !== 'number' || Number.isNaN(midi)) return null
    return 440 * Math.pow(2, (midi - 69) / 12)
  }

  static frequencyToMidi (frequency) {
    if (typeof frequency !== 'number' || frequency <= 0 || Number.isNaN(frequency)) return null
    return Math.round(12 * Math.log2(frequency / 440) + 69)
  }

  static midiToNote (midi) {
    if (typeof midi !== 'number' || Number.isNaN(midi)) return null
    const rounded = Math.round(midi)
    const semitone = ((rounded % 12) + 12) % 12
    const octave = Math.floor(rounded / 12) - 1
    return Music.SEMITONE_TO_NOTE[semitone] + octave
  }

  static noteToFrequency (note) {
    const midi = Music.noteToMidi(note)
    return midi === null ? null : Music.midiToFrequency(midi)
  }

  static frequencyToNote (frequency) {
    const midi = Music.frequencyToMidi(frequency)
    return midi === null ? null : Music.midiToNote(midi)
  }

  static randomMode () {
    const steps = []
    let total = 0

    while (total < 12) {
      const step = (Math.random() < 0.4 || total > 10) ? 1 : 2
      if (total + step <= 12) {
        steps.push(step)
        total += step
      }
    }

    // make sure there's only 7 steps
    while (steps.length !== 7) {
      if (steps.length < 7) steps.push(1)
      else steps.pop() // remove last item
    }

    return steps
  }

  static createScale (root = 'C', mode = 'major') {
    const modes = Music.MODES

    const steps = mode instanceof Array
      ? mode : mode === 'random'
        ? this.randomMode() : modes[mode.toLowerCase()]

    if (!steps) return null

    // parse root: pitch-class + optional octave
    const noteRegex = /^([A-G])(b|#)?(\d+)?$/
    const match = root.match(noteRegex)
    if (!match) return null

    const [, letter, accidental, octaveStr] = match
    const rootNote = letter + (accidental || '')
    let octave = octaveStr ? parseInt(octaveStr) : 4
    const includeOctave = !!octaveStr

    const notes = Music.SEMITONE_TO_NOTE

    let idx = notes.indexOf(rootNote)
    if (idx < 0) return null

    const scale = []
    // first degree
    scale.push(includeOctave ? rootNote + octave : rootNote)

    // build each next degree
    for (const interval of steps) {
      idx += interval
      if (idx >= notes.length) {
        idx %= notes.length
        octave++
      }
      scale.push(includeOctave ? notes[idx] + octave : notes[idx])
    }

    return scale
  }

  static createChord (scale, ch = 'triad') {
    const chord = []
    const shape = ch instanceof Array ? ch : Music.CHORDS[ch.toLowerCase()]
    for (const degree of shape) {
      // Convert degree to array index
      const scaleIndex = (degree - 1) % scale.length
      const note = scale[scaleIndex]
      chord.push(note)
    }
    return chord
  }

  static rotateScale (scale, k = 0) {
    if (!Array.isArray(scale) || scale.length === 0) return []
    const n = scale.length
    const r = ((k % n) + n) % n
    if (r === 0) return scale.slice()
    return scale.slice(r).concat(scale.slice(0, r))
  }

  static transposeScale (scale, semitones = 0) {
    if (!Array.isArray(scale) || scale.length === 0 || !Number.isFinite(semitones)) return scale ? scale.slice() : scale

    return scale.map(x => {
      if (typeof x === 'number') {
        // MIDI number in, MIDI number out
        return x + semitones
      }

      if (typeof x !== 'string') return x

      // note name with optional octave?
      const m = /^([A-Ga-g])(#{1}|b{1})?(\d+)?$/.exec(x)
      if (!m) return x // unknown token; leave as-is

      const letter = m[1].toUpperCase()
      const acc = m[2] || ''
      const hasOct = m[3] != null

      if (hasOct) {
        // use midi math when octave is present
        const midi = Music.noteToMidi(letter + acc + m[3])
        return midi == null ? x : Music.midiToNote(midi + semitones)
      } else {
        // pitch-class only: wrap within 12
        let pc = Music.NOTE_TO_SEMITONE[letter]
        if (acc === '#') pc += 1
        if (acc === 'b') pc -= 1
        const wrapped = ((pc + semitones) % 12 + 12) % 12
        return Music.SEMITONE_TO_NOTE[wrapped]
      }
    })
  }
}

Music.NOTE_TO_SEMITONE = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }
Music.SEMITONE_TO_NOTE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
Music.CHORDS = {
  'root-only': [1],
  // basic chords
  'power-chord': [1, 5], // popular in rock/punk music
  triad: [1, 3, 5], // used to derive major and minor chords (from their respective scales)
  // seventh chords, to derive major7, minor7, dominant7, dim7
  seventh: [1, 3, 5, 7],
  // extended chords
  ninth: [1, 3, 5, 7, 9], // 9th chords (major9, minor9, dominant9)
  eleventh: [1, 3, 5, 7, 9, 11], // 11th chords
  thirteenth: [1, 3, 5, 7, 9, 11, 13], // 13th chords
  // suspended chords
  sus2: [1, 2, 5], // suspended 2nd
  sus4: [1, 4, 5], // suspended 4th
  dominant7sus4: [1, 4, 5, 7],
  // couple more
  add9: [1, 3, 5, 9],
  'six-chord': [1, 3, 5, 6]
}
Music.MODES = {
  // greek modes
  ionian: [2, 2, 1, 2, 2, 2, 1], // major
  dorian: [2, 1, 2, 2, 2, 1, 2],
  phrygian: [1, 2, 2, 2, 1, 2, 2],
  lydian: [2, 2, 2, 1, 2, 2, 1],
  mixolydian: [2, 2, 1, 2, 2, 1, 2],
  aeolian: [2, 1, 2, 2, 1, 2, 2], // minor
  locrian: [1, 2, 2, 1, 2, 2, 2],
  // greek extended
  phrygiandominant: [1, 3, 1, 2, 1, 2, 2],
  'dorian-b2': [1, 2, 2, 2, 2, 1, 2],
  'lydian-augmented': [2, 2, 2, 2, 1, 2, 1],
  'lydian-b7': [2, 2, 2, 1, 2, 1, 2],
  'mixolydian-b13': [2, 2, 1, 2, 1, 2, 2],
  'locrian-#2': [2, 1, 2, 1, 2, 2, 2],
  'super-locrian': [1, 2, 1, 2, 2, 2, 2],
  // other modes
  major: [2, 2, 1, 2, 2, 2, 1],
  minor: [2, 1, 2, 2, 1, 2, 2],
  'harmonic-minor': [2, 1, 2, 2, 1, 3, 1],
  'melodic-minor': [2, 1, 2, 2, 2, 2, 1],
  'major-pentatonic': [2, 2, 3, 2, 3],
  'minor-pentatonic': [3, 2, 2, 3, 2],
  blues: [3, 2, 1, 1, 3, 2],
  'minor-blues': [2, 1, 2, 1, 1, 1, 2, 2],
  'major-blues': [2, 1, 1, 1, 1, 1, 2, 1, 2],
  augmented: [2, 2, 2, 2, 2, 2],
  diminished: [2, 1, 2, 1, 2, 1, 2, 1],
  'jazz-melodic-minor': [2, 1, 2, 2, 2, 2, 1],
  'whole-half-diminished': [2, 1, 2, 1, 2, 1, 2, 1],
  'half-whole-diminished': [1, 2, 1, 2, 1, 2, 1, 2],
  enigmatic: [1, 3, 2, 2, 2, 1, 1],
  'double-harmonic': [1, 3, 1, 2, 1, 3, 1],
  'hungarian-minor': [2, 1, 3, 1, 1, 3, 1],
  persian: [1, 3, 1, 1, 2, 3, 1],
  arabian: [2, 2, 1, 1, 2, 2, 2],
  japanese: [1, 4, 2, 1, 4],
  egyptian: [2, 3, 2, 3, 2],
  hirajoshi: [2, 1, 4, 1, 4]
}

if (typeof module !== 'undefined') module.exports = Music
else window.Music = Music
