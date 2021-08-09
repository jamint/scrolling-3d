import EventBus from "eventing-bus"
import gsap from "gsap"
import { constants, getCurrScene, setCurrScene, setCurrHotspot, getOrbitControls } from "../model"

const viewEl = document.querySelector("#hotspots-view"),
  p0 = viewEl.querySelector(".point-left"),
  p1 = viewEl.querySelector(".point-right"),
  p2 = viewEl.querySelector("#pickups-hotspot"),
  p3 = viewEl.querySelector("#bridge-hotspot"),
  p4 = viewEl.querySelector("#body-hotspot"),
  p5 = viewEl.querySelector("#tuners-hotspot"),
  p6 = viewEl.querySelector("#neck-hotspot"),
  p7 = viewEl.querySelector("#knobs-hotspot"),
  mainHotspotsArr = [p0, p1],
  scene1HotspotsArr = [p2, p3, p4, p7],
  scene2HotspotsArr = [p5, p6]

let currAnimatedHotspotArr = []

/**
 * Event handlers
 */

const handleSceneChanged = () => {
  killAnimatedHotspotTweens()
  currAnimatedHotspotArr = []
  if (getCurrScene() === 0) {
    showHotspots(mainHotspotsArr)
    hideHotspots(scene1HotspotsArr)
    hideHotspots(scene2HotspotsArr)
  }
  if (getCurrScene() === 1) {
    showHotspots(scene1HotspotsArr)
    hideHotspots(mainHotspotsArr)
  }
  if (getCurrScene() === 2) {
    showHotspots(scene2HotspotsArr)
    hideHotspots(mainHotspotsArr)
  }
  if (getCurrScene() === 3) {
    hideHotspots(scene1HotspotsArr)
    hideHotspots(scene2HotspotsArr)
  }
}

const handleClicked = (evt, b) => {
  // left
  if (evt.currentTarget.id === "point-left") {
    setCurrScene(1)
  }
  // right
  if (evt.currentTarget.id === "point-right") {
    setCurrScene(2)
  }
  if (evt.currentTarget.id === "pickups-hotspot") {
    setCurrHotspot("pickups-hotspot")
    setCurrScene(3)
  }
  if (evt.currentTarget.id === "bridge-hotspot") {
    setCurrHotspot("bridge-hotspot")
    setCurrScene(3)
  }
  if (evt.currentTarget.id === "body-hotspot") {
    setCurrHotspot("body-hotspot")
    setCurrScene(3)
  }
  if (evt.currentTarget.id === "tuners-hotspot") {
    setCurrHotspot("tuners-hotspot")
    setCurrScene(3)
  }
  if (evt.currentTarget.id === "neck-hotspot") {
    setCurrHotspot("neck-hotspot")
    setCurrScene(3)
  }
  if (evt.currentTarget.id === "knobs-hotspot") {
    console.log("goto knobs")
    setCurrHotspot("knobs-hotspot")
    setCurrScene(3)
  }
}

const allHotspots = [...mainHotspotsArr, ...scene1HotspotsArr, ...scene2HotspotsArr]
allHotspots.map((d) => {
  d.addEventListener("click", handleClicked)
})

EventBus.on(constants.SCENE_CHANGED, handleSceneChanged)

/**
 * Fn
 */

const showHotspots = (arr) => {
  currAnimatedHotspotArr = arr
  arr.map((d, i) => {
    gsap.fromTo(
      d,
      { alpha: 0 },
      {
        duration: 1.4,
        onStart: () => {
          d.classList.add("show")
        },
        alpha: 1,
        ease: "elastic.out(1.2, 0.75)",
        delay: 2 + i * 0.2,
      }
    )
  })
  animateHotspots()
}
const animateHotspots = () => {
  currAnimatedHotspotArr.map((d, i) => {
    animateRing(i)
  })
}

const animateRing = (idx) => {
  const ring = currAnimatedHotspotArr[idx].querySelector(".anim-ring")
  gsap.set(ring, { opacity: 0.75, scale: 1.1 })
  gsap.to(ring, {
    duration: 2.3,
    opacity: 0,
    scale: 1.75,
    ease: "power4.out",
    onComplete: () => {
      setTimeout(() => {
        animateRing(idx)
      }, 100)
    },
  })
}

const killAnimatedHotspotTweens = () => {
  currAnimatedHotspotArr.map((d) => {
    gsap.killTweensOf(d.querySelector(".anim-ring"))
  })
}

const hideHotspots = (arr) => {
  arr.map((d, i) => {
    gsap.to(d, { duration: 0.2, alpha: 0, delay: i * 0.1, ease: "power2.in", onComplete: () => d.classList.remove("show") })
  })
}
