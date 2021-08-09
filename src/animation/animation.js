import EventBus from "eventing-bus"
import gsap from "gsap"
import { constants, getCamera, getIsTesting, getOrbitControls } from "../model"
import { sceneData } from "../data/scene-data"
import { el } from "../common/utils"

let camera = null,
  controls = null,
  moon = null,
  spaceBG = null,
  textContainer = null

/**
 * Event handlers
 */
const duration = (dur) => {
  return getIsTesting() ? dur * 0.1 : dur
}
const delay = (del) => {
  return getIsTesting() ? del * 0.1 : del
}

const handleStartExperience = () => {
  init()
  const data = sceneData.find((d) => d.name === "introScene"),
    curtain = el(".curtain")

  moon = el(".moon")
  spaceBG = el(".space-bg")
  textContainer = el(".text-container")

  // Set
  gsap.set(camera.position, { x: data.initCameraPos[0], y: data.initCameraPos[1], z: data.initCameraPos[2] })
  gsap.set(controls.target, { x: data.initControlPos[0], y: data.initControlPos[1], z: data.initControlPos[2] })
  gsap.set(textContainer, { alpha: 0 })

  // Animate moon and text IN
  gsap.to(curtain, {
    alpha: 0,
    delay: delay(1),
    ease: "power3.out",
    onComplete: () => curtain.classList.add("display-none"),
  })
  gsap.to(moon, { duration: duration(4), top: "55%", ease: "power1.out" })
  gsap.to(spaceBG, { duration: duration(4), y: -100, ease: "power1.out" })
  gsap.fromTo(textContainer, { alpha: 0 }, { duration: 1, alpha: 1, y: -40, delay: delay(2), ease: "power2.out" })
}

const animateStartToScene1 = () => {
  const data = sceneData.find((d) => d.name === "introScene"),
    skyBG = el(".sky-bg")

  // Text, moon and stars OUT
  gsap.to(textContainer, { duration: 3, y: "-100vh", ease: "power1.in" })
  gsap.to(textContainer, {
    duration: duration(0.6),
    alpha: 0,
    ease: "power1.out",
    onComplete: () => textContainer.classList.add("display-none"),
  })
  gsap.to(moon, {
    duration: duration(2),
    y: "-200vh",
    ease: "power2.in",
    onComplete: () => {
      moon.classList.add("display-none")
    },
  })
  // gsap.to(spaceBG, {
  //   duration: duration(6),
  //   y: "-200vh",
  //   ease: "power2.in",
  //   onComplete: () => spaceBG.classList.add("display-none"),
  // })

  // Sky and model IN
  // gsap.fromTo(
  //   skyBG,
  //   { alpha: 0 },
  //   { onStart: () => skyBG.classList.remove("display-none"), duration: duration(3), opacity: 1, delay: delay(4) }
  // )
  gsap.to(camera.position, {
    duration: duration(3),
    x: data.endCameraPos[0],
    y: data.endCameraPos[1],
    z: data.endCameraPos[2],
    delay: delay(1),
    ease: "power4.out",
  })
  gsap.to(controls.target, {
    duration: duration(3),
    x: data.endControlsPos[0],
    y: data.endControlsPos[1],
    z: data.endControlsPos[2],
    delay: delay(1),
    ease: "power4.out",
  })
}

EventBus.on(constants.START_EXPERIENCE, handleStartExperience)
EventBus.on("scene1", animateStartToScene1)

const init = () => {
  camera = getCamera()
  controls = getOrbitControls()
}

// const tick = () => {
//   if (clouds) clouds.rotation.y += 0.00002
//   window.requestAnimationFrame(tick)
// }
