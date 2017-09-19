const TOTAL_DEGREES = 360
const STEP_DEGREES = 15
const STEPS = 350
const PI = 3.14159
const SPEED = 1.5

const width = window.innerWidth / 2
const height = window.innerHeight / 2
const initialRadius = window.innerWidth / 2

noise.seed(Math.random())

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight,
  1,
  1000
)
camera.position.set(0, 0, 1000)
camera.lookAt(new THREE.Vector3(0, 0, 0))

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const material = new THREE.LineBasicMaterial({
  color: 0xffffff,
  opacity: 0.1,
  transparent: true,
  linewidth: 3
})

function updateScene(frameCount) {
  scene.remove(...scene.children)

  const geometry = new THREE.Geometry()
  const line = new THREE.Line(geometry, material)

  for (let step = 0; step < STEPS; step++) {
    const p = step / STEPS
    const radius = initialRadius * (p - 0.5)

    for (let i = 0; i <= TOTAL_DEGREES; i += STEP_DEGREES) {
      const noiseFactor = noise.perlin3(
        i / (STEPS / 2),
        step / (STEPS / 4),
        frameCount / 200 * SPEED
      )
      const x = radius * Math.cos(i / 360 * PI) * noiseFactor
      const y = radius * Math.sin(i / 360 * PI) * noiseFactor
      geometry.vertices.push(
        new THREE.Vector3(
          x + p * width - width / 2,
          y + p * height - height / 2,
          0
        )
      )
    }
  }
  scene.add(line)
}

function loop(frameCount = 0) {
  requestAnimationFrame(() => {
    updateScene(frameCount)
    renderer.render(scene, camera)
    loop(frameCount + 1)
  })
}

loop()
