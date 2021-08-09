import EventBus from "eventing-bus"
import { constants, getCurrScene, setCurrScene, getAnimatedObjectsArr, getCurrHotspot } from "../model"

const viewEl = document.querySelector("#back-btn-view"),
  backBtn = viewEl.querySelector(".btn")

const handleSceneChanged = () => {
  const scene = getCurrScene()
  if (scene === 1 || scene === 2) {
    setTimeout(() => {
      viewEl.classList.add("show")
    }, 2700)
  } else {
    viewEl.classList.remove("show")
  }
}

const handleClick = () => {
  const arr = getAnimatedObjectsArr()
  let endingScene = null

  if (getCurrScene() === 1) setCurrScene(0)
  if (getCurrScene() === 2) setCurrScene(0)
  arr.map((d, i) => {
    if (d.hotspotID === getCurrHotspot()) {
      endingScene = d.zoomGroup
    }
  })
  if (getCurrScene() === 3) setCurrScene(endingScene)
}

viewEl.addEventListener("click", handleClick)
EventBus.on(constants.SCENE_CHANGED, handleSceneChanged)
