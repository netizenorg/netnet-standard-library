// function to update the page's background
// with a newly randomized gradient
function update () {
  // create a complementary color scheme, try: 'analogous', 'triad', 'split-complementary', 'square', 'monochromatic', 'shades', or 'random'.
  const colors = nn.colorScheme({
    harmony: 'complementary',
    base: nn.randomColor()
  })
  // create a gradient from left to right
  // using the generated color scheme
  const grad = nn.colorGradient(colors, 'to right')
  // apply the gradient to the <body>'s background
  nn.get('body').css('background', grad)
}

// when the page loads, run update()
nn.on('load', update)
// anytime we click the page, run update() again
nn.on('click', update)
