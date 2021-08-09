import EventBus from "eventing-bus"
import { constants, getCurrScene, setCurrScene, getAnimatedObjectsArr, getCurrHotspot } from "../model"
import { modelObjectsData } from "../data/model-objects-data"

const viewEl = document.querySelector("#product-description-view"),
  scrollableEl = viewEl.querySelector(".scrollable"),
  descriptions = viewEl.querySelectorAll(".description-text"),
  closeBtn = viewEl.querySelector(".close-btn")

const handleSceneChanged = () => {
  const scene = getCurrScene(),
    hotspot = getCurrHotspot()

  if (scene === 3) {
    for (let i = 0; i < descriptions.length; i++) {
      descriptions[i].classList.remove("show")
    }
    if (hotspot === "pickups-hotspot") viewEl.querySelector("#description-pickups").classList.add("show")
    if (hotspot === "bridge-hotspot") viewEl.querySelector("#description-bridge").classList.add("show")
    if (hotspot === "knobs-hotspot") viewEl.querySelector("#description-knobs").classList.add("show")
    if (hotspot === "tuners-hotspot") viewEl.querySelector("#description-tuners").classList.add("show")
    if (hotspot === "neck-hotspot") viewEl.querySelector("#description-neck").classList.add("show")
    if (hotspot === "body-hotspot") viewEl.querySelector("#description-body").classList.add("show")
    setTimeout(() => {
      scrollableEl.scrollTop = 0
      viewEl.classList.add("show")
    }, 100)
  } else {
    setTimeout(() => {
      viewEl.classList.remove("show")
    }, 500)
  }
}

const handleClose = () => {
  const arr = getAnimatedObjectsArr(),
    currHotspot = getCurrHotspot()

  const data = modelObjectsData.find((element) => element.hotspotID === currHotspot)
  if (getCurrScene() === 3) setCurrScene(data.zoomGroup)
}

closeBtn.addEventListener("click", handleClose)
EventBus.on(constants.SCENE_CHANGED, handleSceneChanged)
