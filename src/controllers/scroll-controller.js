import EventBus from "eventing-bus"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

import { constants, getCamera, getOrbitControls } from "../model"

const handleAssetsLoaded = () => {
  const cam = getCamera(),
    controls = getOrbitControls(),
    ease = "power2.inOut"

  ScrollTrigger.defaults({
    // markers: true,
  })

  /**
   * Section 3 - Mars
   */
  gsap.fromTo(
    cam.position,
    {
      x: -32,
      y: 1,
      z: 0.2,
    },
    {
      scrollTrigger: {
        trigger: ".section-3",
        start: "top center",
        end: "+=800",
        scrub: 1,
        id: "mars",
      },
      x: 0,
      y: 0,
      z: -208,
      ease,
    }
  )
  // Controls
  gsap.fromTo(
    controls.target,
    { x: -30, y: 0, z: 0 },
    {
      x: 0,
      y: 0,
      z: -200,
      scrollTrigger: {
        trigger: ".section-3",
        start: "top center",
        end: "+=800",
        scrub: 1,
      },
      ease,
    }
  )

  /**
   * Section 2 - Moon
   */
  // Camera
  gsap.fromTo(
    cam.position,
    {
      x: 0,
      y: 0,
      z: 8,
    },
    {
      x: -32,
      y: 1,
      z: 0.2,
      scrollTrigger: {
        trigger: ".section-2",
        start: "top center",
        end: "+=800",
        scrub: 1,
        id: "moon",
      },
      ease,
    }
  )
  // Controls
  gsap.fromTo(
    controls.target,
    { x: 0, y: 0, z: 0 },
    {
      x: -30,
      y: 0,
      z: 0,
      scrollTrigger: {
        trigger: ".section-2",
        start: "top center",
        end: "+=800",
        scrub: 1,
        id: "moon",
      },
      ease,
    }
  )

  /**
   * Section 1 - Earth Zoom
   */

  // Camera
  gsap.fromTo(
    cam.position,
    { x: 0, y: 0, z: 18 },
    {
      scrollTrigger: {
        trigger: ".section-1",
        start: "top center",
        end: "+=600",
        id: "earth",
        scrub: 1,
      },
      //   duration: 5,
      x: 0,
      y: 0,
      z: 8,
      ease,
    }
  )

  /**
   * Intro
   */
  // Camera
  gsap.fromTo(
    cam.position,
    { x: 0, y: 0, z: 130 },
    {
      duration: 4,
      x: 0,
      y: 0,
      z: 18,
      delay: 1,
      ease: "power4.inOut",
    }
  )
  // Controls
  gsap.fromTo(controls.target, { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 })

  gsap.fromTo(".section-0", { opacity: 0 }, { duration: 3, opacity: 1, delay: 4 })
}

EventBus.on(constants.ASSETS_LOADED, handleAssetsLoaded)
