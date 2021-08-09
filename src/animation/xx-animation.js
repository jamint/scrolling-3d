import EventBus from "eventing-bus"
import gsap from "gsap/gsap-core"
import {
  constants,
  getThreeScene,
  getCurrScene,
  getIsDesktop,
  getOrbitControls,
  getAnimatedObjectsArr,
  getCamera,
  getCurrHotspot,
  getGuitar,
  setMouseOrbitMove,
} from "../model"
import { getDeviceAppropriateData } from "../common/utils"
import { _ticker } from "gsap/gsap-core"
import { modelObjectsData } from "../data/model-objects-data"

let firstTime = true,
  animateDisplayObject = false,
  displayObject = null

/**
 * Event handlers
 */

const handleSceneChanged = () => {
  const isDesktop = getIsDesktop(),
    controls = getOrbitControls()

  if (getCurrScene() === 0) {
    if (!firstTime) handleBackToMain()
    firstTime = false
  }
  if (getCurrScene() === 1) {
    animateToPointLeft()
    showAllObjectsVisible()
    if (displayObject) removeDisplayObj()
  }
  if (getCurrScene() === 2) {
    animateToPointRight()
    showAllObjectsVisible()
    if (displayObject) removeDisplayObj()
  }
  if (getCurrScene() === 3) {
    animateToHotspotDescription(getCurrHotspot())
    animateForDisplayObject()
  }

  // Mouse move orbit
  setMouseOrbitMove(false)
  controls.enabled = false

  if (getCurrScene() !== 3) {
    setTimeout(() => {
      if (isDesktop) setMouseOrbitMove(true)
      // else controls.enabled = true
    }, 2000)
  }
}

const handleStartExperience = () => {
  const guitar = getGuitar(),
    camera = getCamera(),
    controls = getOrbitControls(),
    duration = 2,
    delay = 1,
    ease = "elastic.out(0.8, 0.75)",
    data = getDeviceAppropriateData("initialPos"),
    guitarObj = getGuitar().getObjectByName("GuitarEmpty")

  gsap.set(camera.position, { z: 20 })
  gsap.set(guitar.position, { x: -50 })
  gsap.set(guitarObj.rotation, { x: 6 })
  guitar.visible = true

  gsap.to(guitarObj.rotation, { duration: duration + 1, x: 0, delay, ease })
  gsap.to(guitar.position, { duration, x: data.modelPos[0], y: data.modelPos[1], z: data.modelPos[2], delay, ease })
  gsap.to(guitar.rotation, { duration, x: data.modelRot[0], y: data.modelRot[1], z: data.modelRot[2], delay, ease })
  gsap.to(camera.position, { duration, x: data.cameraPos[0], y: data.cameraPos[1], z: data.cameraPos[2], delay, ease })
  gsap.to(controls.target, { duration, x: data.controls[0], y: data.controls[1], z: data.controls[2], delay, ease })
}

const handleBackToMain = () => {
  const arr = getAnimatedObjectsArr(),
    camera = getCamera(),
    controls = getOrbitControls(),
    guitar = getGuitar(),
    duration = 1.5,
    delay = 0,
    ease = "power4.inOut",
    data = getDeviceAppropriateData("initialPos")

  gsap.to(guitar.position, { duration: duration, x: data.modelPos[0], y: data.modelPos[1], z: data.modelPos[2], delay, ease })
  gsap.to(guitar.rotation, { duration: duration, x: data.modelRot[0], y: data.modelRot[1], z: data.modelRot[2], delay, ease })
  gsap.to(camera.position, { duration, x: data.cameraPos[0], y: data.cameraPos[1], z: data.cameraPos[2], delay, ease })
  gsap.to(controls.target, { duration, x: data.controls[0], y: data.controls[1], z: data.controls[2], delay, ease })

  arr.map((d, i) => {
    gsap.to(d.model.position, { duration, z: d.origPosZ, ease })
    if (d.name === "StringsEmpty") {
      setTimeout(() => {
        d.model.visible = true
      }, 1000)
    }
  })
}

EventBus.on(constants.SCENE_CHANGED, handleSceneChanged)
EventBus.on(constants.START_EXPERIENCE, handleStartExperience)

/**
 * Fn
 */

const animateToPointLeft = () => {
  const arr = getAnimatedObjectsArr(),
    camera = getCamera(),
    controls = getOrbitControls(),
    guitar = getGuitar(),
    duration = 1.5,
    delay = 0,
    ease = "power4.inOut",
    data = getDeviceAppropriateData("pointLeft")

  gsap.to(guitar.position, { duration: duration, x: data.modelPos[0], y: data.modelPos[1], z: data.modelPos[2], delay, ease })
  gsap.to(guitar.rotation, { duration: duration, x: data.modelRot[0], y: data.modelRot[1], z: data.modelRot[2], delay, ease })
  gsap.to(camera.position, { duration, x: data.cameraPos[0], y: data.cameraPos[1], z: data.cameraPos[2], delay, ease })
  gsap.to(controls.target, { duration, x: data.controls[0], y: data.controls[1], z: data.controls[2], delay, ease })

  setTimeout(() => {
    gsap.to(camera.position, { duration: 1, x: data.cameraPos[0], y: data.cameraPos[1], z: data.cameraPos[2] + 4, ease })
  }, 1400)

  // Explode objects out
  arr.map((d, i) => {
    const z = d.explodePosFactor
    gsap.to(d.model.position, { duration: 1, z, ease, delay: 1.3 + i * 0.01 })
    // }
    if (d.name === "StringsEmpty") {
      setTimeout(() => {
        d.model.visible = false
      }, 600)
    }
  })
}

export const animateToPointRight = () => {
  const arr = getAnimatedObjectsArr(),
    camera = getCamera(),
    controls = getOrbitControls(),
    guitar = getGuitar(),
    duration = 1.5,
    delay = 0,
    ease = "power4.inOut",
    data = getDeviceAppropriateData("pointRight")

  gsap.to(guitar.position, { duration: duration, x: data.modelPos[0], y: data.modelPos[1], z: data.modelPos[2], delay, ease })
  gsap.to(guitar.rotation, { duration: duration, x: data.modelRot[0], y: data.modelRot[1], z: data.modelRot[2], delay, ease })
  gsap.to(camera.position, { duration, x: data.cameraPos[0], y: data.cameraPos[1], z: data.cameraPos[2], delay, ease })
  gsap.to(controls.target, { duration, x: data.controls[0], y: data.controls[1], z: data.controls[2], delay, ease })

  // Guitar
  arr.map((d, i) => {
    const z = d.explodePosFactor
    gsap.to(d.model.position, { duration: 1, z, ease, delay: 1.3 + i * 0.01 })
    if (d.name === "StringsEmpty") {
      setTimeout(() => {
        d.model.visible = false
      }, 600)
    }
  })
}

const animateToHotspotDescription = (hotspotID) => {
  const arr = getAnimatedObjectsArr(),
    guitar = getGuitar(),
    controls = getOrbitControls(),
    camera = getCamera(),
    duration = 1,
    delay = 0.2,
    ease = "power4.inOut",
    data = getDeviceAppropriateData("initialPos")

  gsap.to(guitar.position, { duration: duration, x: data.modelPos[0], y: data.modelPos[1] - 5, z: -80, delay, ease })
  gsap.to(camera.position, { duration, x: data.cameraPos[0], y: data.cameraPos[1], z: data.cameraPos[2], ease })
  gsap.to(guitar.rotation, { duration: duration, x: data.modelRot[0], y: data.modelRot[1], z: data.modelRot[2], delay, ease })
  gsap.to(controls.target, { duration, x: data.controls[0], y: data.controls[1], z: data.controls[2], ease })

  arr.map((d, i) => {
    gsap.to(d.model.position, { duration, z: d.origPosZ, ease })
    if (d.name === "StringsEmpty") {
      setTimeout(() => {
        d.model.visible = true
      }, 600)
    }
  })
}

// Selected object moving to product description view
const animateForDisplayObject = () => {
  const isDesktop = getIsDesktop()

  const arr = getAnimatedObjectsArr(),
    duration = 1,
    ease = "power4.out",
    currHotspot = getCurrHotspot()

  const data = modelObjectsData.find((element) => element.hotspotID === currHotspot)
  const zoom = isDesktop ? data.descriptionZoom : data.descriptionMobileZoom

  arr.map((d, i) => {
    if (getCurrHotspot() === d.hotspotID) {
      if (!d.forDisplayObject) return

      displayObject = d.forDisplayObject

      displayObject.scale.set(zoom, zoom, zoom)
      setTimeout(() => {
        getThreeScene().add(displayObject)
        gsap.to(displayObject.position, {
          duration,
          x: 0,
          y: isDesktop ? 0.78 : 2.4,
          z: 10,
          ease,
        })
        animateDisplayObject = true
      }, 500)
    }
  })
  setTimeout(() => {
    tickDisplayObject()
  }, 700)
}

const tickDisplayObject = () => {
  let currAngleX = 0,
    maxAngleX = 0.1,
    speedX = 0.015,
    currAngleY = 0,
    maxAngleY = 0.5,
    speedY = 0.005
  const tick = () => {
    if (animateDisplayObject) {
      currAngleX += speedX
      currAngleY += speedY
      displayObject.rotation.x = Math.sin(currAngleX) * maxAngleX
      displayObject.rotation.y = Math.cos(currAngleY) * maxAngleY
      requestAnimationFrame(tick)
    }
  }
  tick()
}

const removeDisplayObj = () => {
  setTimeout(() => {
    getThreeScene().remove(displayObject)
    animateDisplayObject = false
    displayObject = null
  }, 200)
}

const showAllObjectsVisible = () => {
  const arr = getAnimatedObjectsArr()

  arr.map((d, i) => {
    d.model.visible = true
  })
}
