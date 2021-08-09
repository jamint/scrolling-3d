import EventBus from "eventing-bus"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

import { constants, getCamera } from "../model"

const handleStartExperience = () => {
  const cam = getCamera()
  ScrollTrigger.defaults({
    markers: true,
  })
  // gsap.set(cam.position, { x: 0, y: 0, z: 20 })

  /**
   * Section 3
   */
  gsap.fromTo(
    cam.position,
    {
      x: -5,
      y: 2,
      z: 3,
    },
    {
      scrollTrigger: {
        trigger: ".section-3",
        start: "top center",
        end: "+=400",
        // toggleActions: "play none none none",
        scrub: 1,
        // markers: true,
      },
      x: 50,
      y: -35,
      z: 70,
      ease: "power1.inOut",
    }
  )

  /**
   * Section 2
   */
  gsap.fromTo(
    cam.position,
    {
      x: 0,
      y: 0,
      z: 20,
    },
    {
      scrollTrigger: {
        trigger: ".section-2",
        start: "top center",
        end: "+=400",
        // toggleActions: "play none none none",
        scrub: 1,
        // markers: true,
      },
      //   duration: 5,
      x: -5,
      y: 2,
      z: 3,
      ease: "power1.inOut",
    }
  )

  /**
   * Section 1
   */

  gsap.fromTo(
    cam.position,
    { x: 0, y: 0, z: 7 },
    {
      scrollTrigger: {
        trigger: ".section-1",
        start: "top center",
        end: "+=400",
        id: "beer",
        // toggleActions: "play none none none",
        scrub: 1,
      },
      //   duration: 5,
      x: 0,
      y: 0,
      z: 20,
    }
  )

  /**
   * Section 0
   */
  gsap.fromTo(
    cam.position,
    { x: 0, y: 0, z: 130 },
    {
      duration: 4,
      x: 0,
      y: 0,
      z: 7,
      ease: "power4.out",
    }
  )
}

EventBus.on(constants.START_EXPERIENCE, handleStartExperience)
