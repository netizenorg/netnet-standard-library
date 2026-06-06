/*
  ⚠️ THIS SCRIPT IS ENTIRELY AI GENERATED (Anthropic Claude Sonnet 4.6) ⚠️
  ⚠️ WE SHOULD DOUBLE CHECK THE WORK; EVERYTIME WE RUN IT, SPOT CHECK RESULTS ⚠️
*/

// Extra doc entries for methods that don't have their own entry in the src docs
// files — typically methods returned by another function. These follow the same
// shape as regular doc entries, plus a required `namespace` field and an optional
// `url` override (used when the best link is a parent entry rather than the
// method's own page).

module.exports = [

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ nnFilterVideo
  // Methods on the <canvas> returned by nn.filterVideo()

  {
    namespace: 'nnFilterVideo',
    name: 'update',
    url: 'https://netizenorg.github.io/netnet-standard-library/docs/#media/filterVideo',
    friendly: 'Swaps the filter function (and optionally the raw-vs-objects setting) on a live video canvas created by <code>nn.filterVideo()</code>, without stopping and restarting the animation loop. Pass a new function as the first argument, and optionally <code>{ raw: true }</code> as the second to switch between pixel-objects mode and flat-array mode.'
  },

  {
    namespace: 'nnFilterVideo',
    name: 'stop',
    url: 'https://netizenorg.github.io/netnet-standard-library/docs/#media/filterVideo',
    friendly: 'Stops the per-frame animation loop on a live video canvas created by <code>nn.filterVideo()</code>. Once stopped the canvas freezes on its last frame. There is no built-in resume — call <code>nn.filterVideo()</code> again if you need to restart.'
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ nnHyper
  // Methods on the cue object returned by nn.hyper()

  {
    namespace: 'nnHyper',
    name: 'at',
    url: 'https://netizenorg.github.io/netnet-standard-library/docs/#media/hyper',
    friendly: 'Registers a callback to fire when the playhead of an audio or video element naturally reaches a specific time. The first argument is the time in seconds, and the second is the function to call. Seeking past a cue silently skips it — the callback only fires when the playhead passes through the time during normal playback. Returns the cue object so you can chain multiple <code>.at()</code> calls.'
  },

  {
    namespace: 'nnHyper',
    name: 'off',
    url: 'https://netizenorg.github.io/netnet-standard-library/docs/#media/hyper',
    friendly: 'Removes a previously registered time cue. Pass the same time (in seconds) and the same function reference that you originally passed to <code>.at()</code>. If no matching cue is found nothing happens.'
  },

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ nnSVG
  // Methods on SVG shape elements that don't have their own top-level doc entry

  {
    namespace: 'nnSVG',
    name: 'borderRadius',
    url: 'https://netizenorg.github.io/netnet-standard-library/docs/#svg/rect',
    friendly: 'Rounds the corners of an SVG <code>&lt;rect&gt;</code>. Pass one value to round all corners equally, or two values to set the horizontal (<code>rx</code>) and vertical (<code>ry</code>) radii independently. Returns the element so you can keep chaining.'
  }

]
