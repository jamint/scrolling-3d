import EventBus from "eventing-bus"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)
import { scrollTriggerMove } from "../animation/animation"

import { constants, getCamera, getOrbitControls } from "../model"

const cArr = [
    [0, 0, 18],
    [0, 0, 8],
    [-32, 1, 0.2],
    [15, 0, -206],
    [-1, 0, 103],
  ],
  controlsArr = [
    [0, 0, 0],
    [0, 0, 0],
    [-30, 0, 0],
    [10, 0, -200],
    [-3, 0, 100],
  ]

const handleAssetsLoaded = () => {
  const camera = getCamera(),
    controls = getOrbitControls()

  ScrollTrigger.defaults({
    markers: false,
  })

  pinText()

  // Initial text IN
  gsap.to(".section-0 .container", { opacity: 1, delay: 3 })

  for (let i = 1; i < 5; i++) {
    scrollTriggerMove({
      obj: camera.position,
      trigger: ".section-" + i,
      fromX: cArr[i - 1][0],
      fromY: cArr[i - 1][1],
      fromZ: cArr[i - 1][2],
      toX: cArr[i][0],
      toY: cArr[i][1],
      toZ: cArr[i][2],
    })
    scrollTriggerMove({
      obj: controls.target,
      trigger: ".section-" + i,
      fromX: controlsArr[i - 1][0],
      fromY: controlsArr[i - 1][1],
      fromZ: controlsArr[i - 1][2],
      toX: controlsArr[i][0],
      toY: controlsArr[i][1],
      toZ: controlsArr[i][2],
    })
  }

  gsap.fromTo(camera.position, { x: 0, y: 0, z: 130 }, { duration: 3, x: cArr[0][0], y: cArr[0][1], z: cArr[0][2] })
  gsap.set(controls.target, { x: 0, y: 0, z: 0 })
}

const pinText = () => {
  // Section pinning
  // for (let i = 1; i < 5; i++) {
  //   console.log(i)
  //   const container = ".section-" + i + " .container"
  //   gsap.from(container, {
  //     scrollTrigger: {
  //       trigger: container,
  //       start: "center center",
  //       end: "top top",
  //       pin: true,
  //       scrub: 1,
  //       id: "text-" + i,
  //     },
  //   })
  // }
}

EventBus.on(constants.ASSETS_LOADED, handleAssetsLoaded)
