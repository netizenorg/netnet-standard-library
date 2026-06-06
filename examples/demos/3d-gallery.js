/*
  ( ◕ ◞ ◕ ) this generative and interactive demo is meant to showcase how you can combine the Three.js 3D rendering library (specifically using their CSS-3D-Render) with the nn library's <html> rendering methods (as well as some of it's utility and color theory methods) to create a 3D scene of floating cat images

  copying and remixing other artists’ work is a great way to learn. Read the comments below to understand what each section does, then try remixing this demo yourself. Start by changing numbers and other values, then experiment with the logic. Stay open to surprises: unexpected results can lead to new directions you might not have thought to go in otherwise.
*/
let renderer, scene, cam
let cats = []

// △ ▲ △ ▲ △ ▲ △ ▲ △ ▲ △ ▲ △ ▲ △ ▲ △ ▲ △ ▲ △ ▲ △ ▲ △ ▲
// this function uses the nn library to create a <a> link with a cat <img> inside, then it uses Three.js to turn that into a 3D object in a 3D scene.
function createCat () {
  // create a <a> tag that links to the cat image API in a new tab
  const link = nn.create('a')
    .set('href', 'https://cataas.com/')
    .set('target', '_blank')
  // this cat image API URL will return a random cat image each time
  const url = 'https://cataas.com/cat?c=' + nn.random()
  // create an <img> element for the cat image, add it to the link tag
  nn.create('img')
    .set('src', url)
    .size(100)
    .sepia(1)
    .css('border-radius', '50%')
    .addTo(link)
  // create a 3D object for the <img> inside the linked <a>
  const catObj = new THREE.CSS3DObject(link)
  // pick a random position in 3D space
  const x = nn.random(-300, 300)
  const y = nn.random(-300, 300)
  const z = nn.random(-300, 300)
  catObj.position.set(x, y, z)
  // pick a random rotation starting point
  catObj.rotation.y = nn.random(360)
  // add it to the scene, and the cats array (so we can loop through them later)
  scene.add(catObj)
  cats.push(catObj)
}

// △ ▲ △ ▲ △ ▲ △ ▲ △ ▲ △ ▲ △ ▲ △ ▲ △ ▲ △ ▲ △ ▲ △ ▲ △ ▲
// this setup function runs once when the page loads
function setup () {
  // create a monochromatic color scheme with 2 colors
  const colors = nn.colorScheme({
    harmony: 'monochromatic',
    base: 'rebeccapurple',
    count: 2
  }).reverse()
  // use those colors to create a radial (ie. circle) gradient
  const gradient = nn.colorGradient(colors, 'circle')
  // update the page's CSS using this new gradient as a background
  nn.get('body').css({
    background: gradient,
    margin: 0,
    overflow: 'hidden',
    height: '100vh'
  })

  // create the Three.js Scene and Camera
  scene = new THREE.Scene()
  cam = new THREE.PerspectiveCamera(75, nn.width / nn.height, 0.1, 1000)

  // create a Three.js "renderer" using the CSS3DRenderer (that's how we add HTML elements created with nn into a 3D scene created with Three.js)
  renderer = new THREE.CSS3DRenderer()
  renderer.setSize(nn.width, nn.height)
  nn.get('body').appendChild(renderer.domElement)

  // run the createCat() function 50 times
  nn.times(50, createCat)

  // move the camera back in space so we can clearly see the cat image
  cam.position.z = 300
}

// △ ▲ △ ▲ △ ▲ △ ▲ △ ▲ △ ▲ △ ▲ △ ▲ △ ▲ △ ▲ △ ▲ △ ▲ △ ▲
// this recursive animate function will run ~ 60 times per second
function animate () {
  requestAnimationFrame(animate) // ~60 fps

  // loop through all the cats in the array
  cats.forEach(catObj => {
    // rotate each cat a little bit on the Y axis
    catObj.rotation.y += 0.01
  })

  // map mouse movements to a specific 3D range rate (-300 through 300)
  const targetX = nn.map(nn.mouseX, 0, nn.width, -300, 300)
  const targetY = nn.map(nn.mouseY, 0, nn.height, -300, 300)
  // use those new targets to tween the camera position
  cam.position.x += (targetX - cam.position.x) * 0.05
  cam.position.y += (targetY - cam.position.y) * 0.05
  // making sure the camera is always pointed at the center
  cam.lookAt(0, 0, 0)

  // render what the camera sees every frame
  renderer.render(scene, cam)
}

// when the page loads run setup() and animate()
nn.on('load', setup)
nn.on('load', animate)
