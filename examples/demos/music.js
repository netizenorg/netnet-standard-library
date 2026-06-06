/*
  ( ◕ ◞ ◕ ) this generative demo is meant to showcase how you can combine the Tone.js web audio library with the nn library's music theory method (as well as some <html> methods for the UI) to recreate simplified version of this piece: https://mcpa.jake.fun/ by Jake Albaugh.

  copying and remixing other artists’ work is a great way to learn. Read the comments below to understand what each section does, then try remixing this demo yourself. Start by changing numbers and other values, then experiment with the logic. Stay open to surprises: unexpected results can lead to new directions you might not have thought to go in otherwise.
*/
// keep track of global vars for ArpeggioLogic loop
let loop, piano, toggle, bassNote, leadNote
let step = 0
// play at 120 beats per minute
Tone.Transport.bpm.value = 135
// every measure (bar) has 6 beats
Tone.Transport.timeSignature = 4

// create synths
const lead = new Tone.PolySynth(Tone.AMSynth)
const bass = new Tone.DuoSynth()

// create FX
const distortion = new Tone.Distortion(0.8)
const reverb = new Tone.Freeverb(0.7, 3000)

// create output mixer
const leadVol = new Tone.Gain(0.8).toDestination()
const bassVol = new Tone.Gain(0.5).toDestination()

// chain the synths through the fx and out to the mix
lead.chain(reverb, leadVol)
bass.chain(distortion, bassVol)

// 🎹  - 🎹  - 🎹  - 🎹  - 🎹  - 🎹  - 🎹  - 🎹
// this function creates the visual interface
function createUI () {
  nn.get('body').css({
    background: '#6c8cff',
    fontFamily: 'sans-serif'
  })
  // CSS styles to share amont UI elements
  const styles = {
    background: 'black',
    color: 'white',
    border: 'none',
    borderRadius: 24,
    padding: 8,
    margin: 2
  }
  // dropdown menu to choose the root/tonic note for the scale
  nn.create('p').content('CHOOSE KEY').addTo('body')
  nn.create('span').content(' root ').addTo('body')
  const root = nn.create('select')
    .set('options', nn.notes)
    .css(styles)
    .addTo('body')
  // dropdown menu to choose the greek mode for the scale
  nn.create('span').content(' mode ').addTo('body')
  const greek = ['ionian', 'dorian', 'phrygian', 'lydian', 'mixolydian', 'aeolian', 'locrian']
  const mode = nn.create('select')
    .set('options', greek)
    .css(styles)
    .addTo('body')
  // dropdown menu to choose a BPM (tempo)
  const bpms = [45, 60, 75, 90, 105, 120, 135, 150]
  nn.create('span').content(' tempo ').addTo('body')
  const bpm = nn.create('select')
    .set('options', bpms)
    .css(styles)
    .addTo('body')
  // select which degree (idnex) from the scale to play for each step
  nn.create('p').content('CHOOSE PROGRESSION').addTo('body')
  const degs = ['i', 'II', 'iii', 'iv', 'V', 'VI', 'vii']
  const prog = ['i', 'iii', 'vii', 'iv', 'V', 'iii', 'VI', 'II']
  nn.times(8, (i) => {
    const deg = nn.create('select').addTo('body')
      .set('options', degs) // add degree options
      .set(`#deg-${i}`) // set id so we can "get" it later
      .css(styles)
    deg.value = prog[i] // set value for initial progression
  })
  // line divider
  nn.create('hr').css('margin', 10).addTo('body')
  // piano visualization
  piano = viz.createPianoUI({
    labels: true,
    octaves: [2, 6],
    on: {
      mousedown: (n) => lead.triggerAttack(n),
      mouseup: (n) => lead.triggerRelease(n)
    }
  })
  // line divider
  nn.create('hr').css('margin', 10).addTo('body')
  // toggle button to start/stop playback
  toggle = nn.create('button')
    .content('start')
    .css(styles)
    .css('cursor', 'pointer')
    .addTo('body')
    .on('click', toggleTransport)
  // set initial values
  bpm.value = Tone.Transport.bpm.value
  root.value = 'G'
  mode.value = 'locrian'
}

// 🔊 - 🔊 - 🔊 - 🔊 - 🔊 - 🔊 - 🔊 - 🔊 - 🔊 - 🔊 - 🔊 - 🔊
// this function toggle's the background chords on/off
function toggleTransport () {
  // if the Transport is currently stopped
  if (Tone.Transport.state === 'stopped') {
    // if we haven't started the loop function yet
    if (!loop) { // create and start the loop
      // set the loop to play every quarter-note triplet '4t'
      loop = new Tone.Loop(ArpeggioLogic, '16n').start(0)
    }
    // start the transport
    Tone.Transport.start()
    // update button content
    toggle.content('stop')
  } else { // otherwise, pause the transport
    Tone.Transport.stop()
    toggle.content('start')
    step = 0
  }
}

// 🔊 - 🔊 - 🔊 - 🔊 - 🔊 - 🔊 - 🔊 - 🔊 - 🔊 - 🔊 - 🔊 - 🔊
// here is our algorithmic musical logic
function ArpeggioLogic (time) {
  // get current beat and bar from Tone.js's Transport
  // const [bar, beat] = Tone.Transport.position.split(':').map(Number)

  const measure = Math.floor(step / 12) % 8
  const arpStep = step % 6

  // console.log(bar, beat, );
  // grab current values from first three drop down menus
  const menus = nn.getAll('select')
  const root = menus[0].value
  const mode = menus[1].value
  const tempo = menus[2].value

  // set BPM if it's changed
  if (Tone.Transport.bpm.value !== Number(tempo)) {
    Tone.Transport.bpm.value = tempo
  }

  // create the main scale
  const scale = nn.createScale(root, mode)
  // find the currently selected degree for this measure
  const degrees = ['i', 'II', 'iii', 'iv', 'V', 'VI', 'vii']
  const cur = nn.get(`#deg-${measure}`).value // selected degree
  const idx = degrees.indexOf(cur) // translate to index value

  // play bass note on the first beat of every bar
  if (arpStep === 0) {
    // "voice" the scale, meaning add the octave number
    const voicedBassScale = nn.voiceChord(scale, 2) // 2nd oct
    const cur = nn.get(`#deg-${measure}`).value
    const idx = degrees.indexOf(cur)
    piano.release(bassNote)
    bassNote = voicedBassScale[idx]
    bass.triggerAttackRelease(bassNote, '1m', time)
    piano.attack(bassNote)
    // update select menu visual
    const reset = { background: 'black', color: 'white' }
    nn.getAll('select').forEach(s => s.css(reset))
    // highlight the current degree
    nn.get(`#deg-${measure}`).css({
      background: 'white',
      color: 'black'
    })
  }

  // our lead synth will be arpeggiating a chord
  // rotate scale to current degree
  const rotated = nn.rotateScale(scale, idx)
  // use first note from rotated scale for root
  const chord = nn.createChord(rotated, 'triad')
  // voice the chord (ie. give it octave numbers)
  const voiced1 = nn.voiceChord(chord, 4) // 2 octs above base
  const voiced2 = nn.voiceChord(chord, 5) // 3 octs above base
  piano.release(leadNote)
  // choose note from 4th octave for first half of measure
  if (arpStep < 3) {
    leadNote = voiced1[arpStep]
  } else { // for second half of measure choose form 5th oct
    leadNote = voiced2[arpStep - 3]
  }

  lead.triggerAttackRelease(leadNote, '4n', time)
  piano.attack(leadNote)

  // increase step count
  step++
}

// create the UI once the page loads
nn.on('load', createUI)
