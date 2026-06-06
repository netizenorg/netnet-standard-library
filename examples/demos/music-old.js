// keep track of background chord loop
let backgroundLoop
// create a scale for our music by picking a random root note and a random greek mode
const greekModes = ['ionian', 'dorian', 'phrygian', 'lydian', 'mixolydian', 'aeolian', 'locrian']
const mode = nn.random(greekModes)
const root = nn.random(nn.notes)
const scale = nn.createScale(root, mode)

// Tone.js synth for background chords
const bgSynth = new Tone.PolySynth(Tone.Synth, {
  oscillator: {
    type: 'fatsawtooth'
  },
  envelope: {
    attack: 1,
    release: 3
  }
}).toDestination()
bgSynth.volume.value = -18

// 🤖 - 🤖 - 🤖 - 🤖 - 🤖 - 🤖 - 🤖 - 🤖 - 🤖
// this function creates an SVG robot
function createRobot () {
  // robot's head is an <svg> element
  const robot = nn.create('svg')
    .set('id', 'robot')
    .css('border-radius', '20%')
    .css('cursor', 'pointer')
    .transition('all', 200)
    .position(50, 50)
    .addTo('body')
  // with two circles for eyes
  robot.circle(30, 25, 5).strokeWidth(2).stroke('white')
  robot.circle(70, 25, 5).strokeWidth(2).stroke('white')
  // the robot's mouth is an audio waveform
  const wave = viz.createWaveform({
    ele: '#robot',
    width: '100px',
    height: '100px',
    background: 'rebeccapurple',
    color: 'white',
    lineWidth: 2
  })
  // this is the robot's voice, a Tone.js synth
  const roboVoice = new Tone.Synth({
    oscillator: {
      type: 'pulse',
      width: 0.35
    }
  })
  roboVoice.connect(wave)
  roboVoice.toDestination()
  roboVoice.volume.value = -10

  // play and hold a note when we click the robot
  robot.on('mousedown', () => {
    // pick a random note from the scale (at 2nd octave)
    const note = nn.random(scale) + '2'
    roboVoice.triggerAttack(note)
    // increase size of robot
    robot.scale(1.2)
  })
  // stop playing the note when we release click
  robot.on('mouseup', () => {
    // stop playing that note
    roboVoice.triggerRelease()
    // shrink robot back to normal scale
    robot.scale(1)
  })
}



// 🔊 - 🔊 - 🔊 - 🔊 - 🔊 - 🔊 - 🔊 - 🔊 - 🔊 - 🔊 - 🔊 - 🔊
// this function toggle's the background chords on/off
function toggleTransport () {
  const s = Tone.Transport.state
  if (s === 'stopped' || s === 'paused') {
    // start the transport
    Tone.Transport.start()
    // if we haven't started the backgroundLoop yet
    if (!backgroundLoop) {
      // create and start the background loop
      backgroundLoop = new Tone.Loop(playBackgroundChords)
      backgroundLoop.start()
    }
  } else { // pause the transport
    Tone.Transport.pause()
  }
}

function playBackgroundChords (time) {
  // get current beat and bar from Tone.js's Transport
  const [bar, beat] = Tone.Transport.position.split(':').map(Number)
  // only play background chord on the first beat
  if (beat === 0) {
    // if we're in an even bar/measure
    if (bar % 2 === 0) {
      // play chord from (I) first degree
      const s = nn.createScale(scale[0], mode)
      const chord = nn.createChord(s, 'ninth')
      const voiced = nn.voiceChord(chord, '3')
      bgSynth.triggerAttackRelease(voiced, '1m')
    } else {
      // otherwise play chord from (V) fifth degree
      const s = nn.createScale(scale[4], mode)
      const chord = nn.createChord(s, 'ninth')
      const voiced = nn.voiceChord(chord, '3')
      bgSynth.triggerAttackRelease(voiced, '1m')
    }
  }
}

function createToggle () {
  nn.create('button')
    .content('toggle background chords')
    .addTo('body')
    .on('click', toggleTransport)
}

// create the robot and toggle button when the page loads
nn.on('load', createRobot)
nn.on('load', createToggle)
