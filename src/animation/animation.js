import EventBus from "eventing-bus"
import { constants } from "../model"
import gsap from "gsap"

const arrowDownEl = document.querySelector(".arrow-down")

export const scrollTriggerMove = (o) => {
  gsap.fromTo(
    o.obj,
    { x: o.fromX, y: o.fromY, z: o.fromZ },
    {
      onStart: () => gsap.to(arrowDownEl, { opacity: 0 }),
      x: o.toX,
      y: o.toY,
      z: o.toZ,
      ease: "power1.inOut",
      onComplete: () => console.log("end move"),
      scrollTrigger: {
        trigger: o.trigger,
        scrub: 1,
        start: "top center",
        end: "center center",
      },
    }
  )
}

const handleAssetsLoaded = () => {
  gsap.fromTo(arrowDownEl, { opacity: 0 }, { duration: 1.5, opacity: 1, delay: 2 })
  gsap.fromTo(arrowDownEl, { y: 0 }, { y: -20, yoyo: true, repeat: 3, delay: 3, ease: "power2.out" })
}

EventBus.on(constants.ASSETS_LOADED, handleAssetsLoaded)
