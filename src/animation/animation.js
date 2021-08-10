import gsap from "gsap"

export const scrollTriggerMove = (o) => {
  gsap.fromTo(
    o.obj,
    { x: o.fromX, y: o.fromY, z: o.fromZ },
    {
      x: o.toX,
      y: o.toY,
      z: o.toZ,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: o.trigger,
        scrub: 1,
        start: "top center",
        end: "center center",
      },
    }
  )
}
