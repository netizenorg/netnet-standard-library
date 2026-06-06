// reset the page's default margin
nn.get('body').css('margin', 0)

// create a <canvas> element,
// this is used to create generative
// and interactive "raster" visuals
const ctx = nn.create('canvas')
  .size(nn.width, nn.height / 2)
  .position(0, 0)
  .addTo('body')

ctx.fillColor = 'rebeccapurple'
ctx.rect(0, 0, ctx.width, ctx.height)

ctx.fillColor = 'coral'
ctx.strokeColor = 'transparent'
ctx.circle(ctx.width / 2, ctx.height / 2, 40)

ctx.font = 'bold 24px monospace'
ctx.textBaseline = 'top'
ctx.text('this was drawn with <canvas>', 10, 10)

// create an <svg> element,
// this is used to create generative
// and interative "vector" visuals
const svg = nn.create('svg')
  .size(nn.width, nn.height / 2)
  .position(0, nn.height / 2)
  .addTo('body')

svg.rect(0, 0, svg.width, svg.height)
  .fill('rebeccapurple')

svg.circle(svg.width / 2, svg.height / 2, 40)
  .fill('coral')

svg.text('this was drawn with <svg>', 10, 10)
  .fill('coral')
  .textBaseline('top')
  .set('font-weight', 'bold')
  .set('font-size', 24)
  .set('font-family', 'monospace')
