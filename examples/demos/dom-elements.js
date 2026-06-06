// get the page's <body> element
// and modify it's CSS
nn.get('body').css({
  height: '100vh',
  margin: 0,
  background: nn.rgb(0, 0, 0, 0.25),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden'
})

// a fraction of the page's current width
const frac = nn.width * 0.7
// create an array with 4 random colors
const stops = nn.times(4, () => nn.randomColor())
// create a gradient from those 4 random color stops
const grad = nn.colorGradient(stops, 'to right')

// create a new <div> element
// set its background color, size and rotation
// and add it to the page's <body>
nn.create('div')
  .css('background', grad)
  .size(frac)
  .rotate(45)
  .addTo('body')

// create a <h1> element
// set it's content, position and CSS
// and add it to the page's <body>
nn.create('h1')
  .content('hello world wide\nweb')
  .position(40, 0)
  .css({
    margin: 0,
    color: 'white',
    mixBlendMode: 'difference',
    fontSize: nn.height * 0.25,
    fontFamily: 'sans-serif',
    fontWeight: 'bold'
  })
  .addTo('body')
