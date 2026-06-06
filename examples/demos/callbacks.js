// hide scroll bars
nn.get('body').css('overflow', 'hidden')

// a function to add a random flower to the page
function randomFlower () {
  // pick a random flower symbol from string
  const flower = nn.random('❁✿❀❁✿❀')
  // create a random size and color
  const s = nn.random(20, 40) // between 20 - 40
  const c = nn.randomColor()
  // create ranodom (x,y) coordinates
  const x = nn.random(nn.width) // 0 - page's width
  const y = nn.random(nn.height) // 0 - page's height
  // create and add it to the page
  nn.create('div')
    .content(flower)
    .css('font-size', s)
    .css('color', c)
    .position(x, y)
    .addTo('body')
}

// the .times() method takes two arguments
// first an amount of times to run a function
// and a second a reference to the function.
// Here we pass a the function above by its name
nn.times(100, randomFlower)

// but we could also define "anonymous functions"
// (functions without names) directly as arguments
nn.times(40, () => {
  // create a few random values
  const rot = nn.random(360) // 0 - 360
  const hue = nn.random(360) // 0 - 360
  const sat = nn.random(1, 4) // 1 - 4
  const siz = nn.random() // 0.0 - 0.1
  const x = nn.random(nn.width) // 0 - page-width
  const y = nn.random(nn.height) // 0 - page-height
  // generate randomized butterfly GIF
  nn.create('img')
    .set('src', 'butterfly.gif')
    .rotate(rot)
    .hueRotate(hue)
    .saturate(sat)
    .scale(siz)
    .position(x, y)
    .addTo('body')
})
