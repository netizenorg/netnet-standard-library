/* global ne, neTemplate */
// •.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•
// •.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•*•.¸¸¸.•* some example helper functions

window.remix = () => {
  // const hash = ne.generateHash()
  const localLib = '<script src="../build/nn.min.js"></script>'
  const cdn = '<script src="https://cdn.jsdelivr.net/gh/netizenorg/netnet-standard-library/build/nn.min.js"></script>'
  let hash = neTemplate.replace(localLib, cdn)
  hash = ne._encode(hash.replace('{{code}}', `\n\n${ne.code}\n`))
  const url = `https://netnet.studio/?layout=dock-left#code/${hash}`
  window.open(url, '_blank')
}

window.appendLibs = (code) => {
  let str = ''
  if (code.includes('viz.')) {
    str += '<script src="https://algorithmicmusic.online/js/viz-helpers.js"></script>\n'
  }
  if (code.includes('Matter')) {
    str += '<script src="https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.20.0/matter.min.js"></script>\n'
  }
  if (code.includes('Hydra')) {
    str += '<script src="https://unpkg.com/hydra-synth"></script>'
  }
  if (code.includes('.estimateHands')) {
    str += '<script src="https://cdn.jsdelivr.net/npm/@mediapipe/hands"></script>\n<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core"></script>\n<script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/hand-pose-detection"></script>'
  }
  if (code.includes('THREE.')) {
    str += '<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.1/three.js"></script>\n<script src="https://cdn.jsdelivr.net/npm/three@0.146.0/examples/js/renderers/CSS3DRenderer.js"></script>'
  }
  if (code.includes('Tone.')) {
    str += '<script src="https://unpkg.com/tone"></script>'
  }
  return str
}

window.reset = () => {
  window.toggleNfo()
  // const netnetFace = '<p style="opacity:0.7"><i>Edit code to experiment, double click any part for more info on it. <span class="link" onclick="remix()">Remix this on netnet!</a></i></p>'
  const netnetFace = '<p style="opacity:0.7"><i>Edit code to experiment; double click any piece for more info; <span class="link" onclick="remix()">Remix this on netnet!</a></i></p>'
  document.querySelector('#nfo').innerHTML = netnetFace
  document.querySelector('#nfo').className = ''
  ne.spotlight('clear')
}

window.showJSNFO = (eve) => {
  document.querySelector('#nfo').innerHTML = `
    <p><b>${eve.nfo.keyword.text} ⮕</b> ${eve.nfo.description.html}</p>
  `
}

window.toggleNfo = () => {
  if (ne.code === '// example code will display here...') {
    document.querySelector('#nfo').style.display = 'none'
  } else if (document.querySelector('#nfo').style.display !== 'block') {
    document.querySelector('#nfo').style.display = 'block'
  }
}

window.markErrors = (eve) => {
  const explainError = (err) => {
    ne.spotlight(err.line)
    document.querySelector('#nfo').className = 'error'
    document.querySelector('#nfo').innerHTML = err.friendly
      ? `<p>${err.friendly}</p>` : `<p>${err.message}</p>`
  }

  ne.marker(null)
  const lines = []
  if (eve.length === 0) window.reset()
  eve.forEach(e => {
    if (lines.includes(e.line)) return
    lines.push(e.line)
    const clk = () => explainError(e)
    if (e.type === 'warning') ne.marker(e.line, 'yellow', clk)
    else ne.marker(e.line, 'red', clk)
  })
}
