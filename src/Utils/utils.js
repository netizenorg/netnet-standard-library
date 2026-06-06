const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const times = (n, fn) => {
  if (typeof n !== 'number' || !isFinite(n)) {
    console.error('( ◕ ◞ ◕ ) nn.times: first argument should be a finite number')
    return []
  }
  if (typeof fn !== 'function') {
    console.error('( ◕ ◞ ◕ ) nn.times: second argument should be a function')
    return []
  }
  const count = Math.max(0, Math.floor(n))
  const out = []
  for (let i = 0; i < count; i++) out.push(fn(i))
  return out
}

const range = (startOrEnd, end, stepOrMap, maybeMap) => {
  if (typeof startOrEnd !== 'number' || !isFinite(startOrEnd)) {
    console.error('( ◕ ◞ ◕ ) nn.range: expects numbers. Usage: range(end) or range(start, end, step[, map])')
    return []
  }
  // Extract optional mapper
  let map
  if (typeof maybeMap === 'function') map = maybeMap
  else if (typeof stepOrMap === 'function') map = stepOrMap

  let start
  if (typeof end === 'undefined') {
    start = 0
    end = startOrEnd
  } else {
    start = startOrEnd
  }
  if (typeof end !== 'number' || !isFinite(end)) {
    console.error('( ◕ ◞ ◕ ) nn.range: end must be a finite number')
    return []
  }
  // Determine step
  let step
  if (typeof stepOrMap === 'number') step = stepOrMap
  if (typeof step === 'undefined' || step === null) {
    step = end > start ? 1 : -1
  }
  if (typeof step !== 'number' || !isFinite(step) || step === 0) {
    console.error('( ◕ ◞ ◕ ) nn.range: step must be a non-zero finite number')
    return []
  }
  const out = []
  // end-exclusive progression
  if (step > 0) {
    for (let i = 0, v = start; v < end; v += step, i++) out.push(map ? map(v, i) : v)
  } else {
    for (let i = 0, v = start; v > end; v += step, i++) out.push(map ? map(v, i) : v)
  }
  return out
}

if (typeof module !== 'undefined') module.exports = { sleep, times, range }
