import * as THREE from "three"
import EventBus from "eventing-bus"
import HDRbg from "../static/hdr_500.hdr"
import Stats from "stats-js"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js"
import { constants, setThreeScene, setAssetsLoaded, setCamera, setOrbitControls, getModelsArr, getOrbitControls } from "./model"
// import { modelsData } from "./data/model-objects-data"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger.js"

import { createOrbitPositionTestSphere } from "./common/test-sphere"

const fov = 46,
  controlsEnabled = false,
  envMapExposure = 0.7,
  directionali1Intensity = 2,
  directional1Position = [5, 30, 3],
  ambientIntensity = 0.3,
  earthSrc = "earth-03.glb",
  moonSrc = "moon-01.glb",
  marsSrc = "mars-01.glb"

let canvas = null,
  scene = null,
  renderer = null,
  camera = null,
  controls = null,
  pmremGenerator = null,
  sizes = null,
  showOrbitTestSphere = false

let earth = null,
  earthClouds = null,
  moon = null,
  mars = null

/**
 * Loaders
 */
const stats = new Stats()
// loadingBarElement = document.querySelector(".loading-bar")

const statsEl = document.querySelector("#stats-container")
statsEl.appendChild(stats.dom)

let sceneReady = false
const loadingManager = new THREE.LoadingManager(
  () => {
    setAssetsLoaded()
    // EventBus.publish(constants.START_EXPERIENCE)
    sceneReady = true

    window.setTimeout(() => {
      // loadingBarElement.classList.add("ended")
      // loadingBarElement.style.transform = ""
    }, 1000)
  },
  // Progress
  (itemUrl, itemsLoaded, itemsTotal) => {
    // const progressRatio = itemsLoaded / itemsTotal
    // loadingBarElement.style.transform = `scaleX(${progressRatio})`
  }
)

const handleResize = () => {
  const w = document.querySelector(".canvas-container").getBoundingClientRect().width
  const h = document.querySelector(".canvas-container").getBoundingClientRect().height
  sizes.width = w
  sizes.height = h
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  renderer.setSize(w, h)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  // postprocessing.composer.setSize(w, h)
}

const init = () => {
  sizes = {
    width: document.querySelector(".canvas-container").getBoundingClientRect().width,
    height: document.querySelector(".canvas-container").getBoundingClientRect().height,
  }
  canvas = document.querySelector("canvas.webgl")
  scene = new THREE.Scene()
  setThreeScene(scene)

  renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true })
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.shadowMap.enabled = true
  renderer.shadowMapSoft = true
  renderer.outputEncoding = THREE.sRGBEncoding
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(sizes.width, sizes.height)
  renderer.setClearColor(0xbbdbc1, 0)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = envMapExposure

  camera = new THREE.PerspectiveCamera(fov, sizes.width / sizes.height, 0.1, 3000)
  // camera.position.set(0, 0, 20)
  // console.log(camera.position)
  scene.add(camera)
  setCamera(camera)

  controls = new OrbitControls(camera, canvas)
  setOrbitControls(controls)
  // controls.enableDamping = true
  getOrbitControls().enabled = controlsEnabled
  // controls.minAzimuthAngle = -0.7
  // controls.maxAzimuthAngle = 0.7
  // controls.minAzimuthAngle = -0.4
  // controls.maxAzimuthAngle = 0.5
  // controls.minPolarAngle = 0.9
  // controls.maxPolarAngle = 1.8
  // controls.enableZoom = false

  pmremGenerator = new THREE.PMREMGenerator(renderer)
  pmremGenerator.compileEquirectangularShader()
}

const loadLights = () => {
  new RGBELoader().setDataType(THREE.UnsignedByteType).load(HDRbg, function (texture) {
    const envMap = pmremGenerator.fromEquirectangular(texture).texture
    scene.environment = envMap
    texture.dispose()
    pmremGenerator.dispose()
    texture.encoding = THREE.RGBEEncoding
    setTimeout(() => {
      loadModel()
    }, 100)
  })

  const directional1 = new THREE.DirectionalLight("#ffffff", directionali1Intensity)
  directional1.position.set(directional1Position[0], directional1Position[1], directional1Position[2])
  // directional1.castShadow = true
  // directional1.shadow.bias = -0.0004
  // scene.add(directional1)
  // const directional1Helper = new THREE.DirectionalLightHelper(directional1, 5, "red")
  // scene.add(directional1Helper)

  let ambient = new THREE.AmbientLight(0xffffff, ambientIntensity)
  scene.add(ambient)
}

/**
 * Model
 */

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath("draco/")

const loadModel = () => {
  // const geometry = new THREE.SphereGeometry(1, 32, 16)
  // const material = new THREE.MeshStandardMaterial({ color: 0xffff00 })
  // const sphere = new THREE.Mesh(geometry, material)
  // scene.add(sphere)

  // Particles
  const textureLoader = new THREE.TextureLoader()
  const particleTexture = textureLoader.load("/star-particle.png")

  const particlesGeometry = new THREE.BufferGeometry()
  const count = 10000
  const positions = new Float32Array(count * 3)

  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 300
  }
  particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
  const particlesMaterial = new THREE.PointsMaterial()
  particlesMaterial.size = 0.7
  particlesMaterial.sizeAttenuation = true
  particlesMaterial.color = new THREE.Color("#ffffff")

  particlesMaterial.transparent = true
  particlesMaterial.alphaMap = particleTexture
  // particlesMaterial.alphaTest = 0.01
  // // particlesMaterial.depthTest = false
  // particlesMaterial.depthWrite = false
  // particlesMaterial.blending = THREE.AdditiveBlending
  // particlesMaterial.vertexColors = true

  const particles = new THREE.Points(particlesGeometry, particlesMaterial)
  scene.add(particles)

  EventBus.publish(constants.START_EXPERIENCE)

  if (showOrbitTestSphere) createOrbitPositionTestSphere()

  // Earth
  const gltfLoader = new GLTFLoader()
  gltfLoader.load(earthSrc, (gltf) => {
    let model = gltf.scene
    scene.add(model)
    model.traverse(function (child) {
      if (child.isMesh && child.geometry) {
        if (child.name === "Earth") earth = child
        if (child.name === "Clouds") earthClouds = child
      }
    })
  })
  // Moon
  gltfLoader.load(moonSrc, (gltf) => {
    let model = gltf.scene
    scene.add(model)
    model.position.set(-30, 0, 0)
    model.scale.set(0.2, 0.2, 0.2)
    model.traverse(function (child) {
      if (child.isMesh && child.geometry) {
        if (child.name === "Moon") moon = child
      }
    })
  })
  // Mars
  gltfLoader.load(marsSrc, (gltf) => {
    let model = gltf.scene
    scene.add(model)
    model.position.set(0, 0, -200)
    model.scale.set(1, 1, 1)
    model.traverse(function (child) {
      if (child.isMesh && child.geometry) {
        if (child.name === "Mars") mars = child
      }
    })
  })
}

/**
 * Tick
 */

const tick = () => {
  window.requestAnimationFrame(tick)
  controls.update()
  renderer.render(scene, camera)
  stats.update()
  if (earth && earthClouds) {
    earth.rotation.y -= 0.0007
    earthClouds.rotation.y -= 0.0003
  }
  if (moon) {
    moon.rotation.y -= 0.0007
  }
  if (mars) {
    mars.rotation.y -= 0.001
  }
  // postprocessing.composer.render(0.1)
}

// const initPostProcessing = () => {
//   const renderPass = new RenderPass(scene, camera)
//   // renderPass.clear = false
//   renderer.autoClear = false
//   var parameters = {
//     minFilter: THREE.LinearFilter,
//     magFilter: THREE.LinearFilter,
//     format: THREE.RGBAFormat,
//     stencilBuffer: false,
//   }

//   var renderTarget = new THREE.WebGLRenderTarget(sizes.w, sizes.h, parameters)

//   const bokehPass = new BokehPass(scene, camera, {
//     focus: 50.0,
//     aperture: 0.035,
//     maxblur: 0.01,
//     width: sizes.w,
//     height: sizes.h,
//   })

//   const composer = new EffectComposer(renderer, renderTarget)

//   composer.addPass(renderPass)
//   composer.addPass(bokehPass)

//   postprocessing.composer = composer
//   postprocessing.bokeh = bokehPass
// }

/**
 * Initialization
 */

setTimeout(() => {
  init()
  loadLights()
  // initPostProcessing()
  tick()
  window.addEventListener("resize", handleResize)
  handleResize()
}, 0)
