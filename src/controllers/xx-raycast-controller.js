import EventBus from "eventing-bus"
import * as THREE from "three"
import {
  constants,
  getScene,
  getCurrSection,
  getCurrBoard,
  setCurrBoard,
  getCamera,
  zoomBoardView,
  getIsEndBoardZoomed,
} from "../model"

const raycaster = new THREE.Raycaster(),
  mouse = new THREE.Vector2()

/**
 * Event handlers
 */
const handleCurrentSection = () => {
  const section = getCurrSection()
  if (section === 0 || section === 3) {
    document.querySelector("body").addEventListener("click", handleClick)
    document.querySelector("body").addEventListener("mousemove", handleMouseMove)
  } else {
    document.querySelector("body").removeEventListener("click", handleClick)
    document.querySelector("body").removeEventListener("mousemove", handleMouseMove)
  }
}

const handleMouseMove = (evt) => {
  evt.preventDefault()
  mouse.x = (evt.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(evt.clientY / window.innerHeight) * 2 + 1
  raycaster.setFromCamera(mouse, getCamera())
  const intersects = raycaster.intersectObjects(getScene().children, true)

  if (intersects && intersects.length > 0) {
    document.body.style.cursor = "pointer"
  } else {
    document.body.style.cursor = "default"
  }
}

EventBus.on(constants.SECTION_CHANGED, handleCurrentSection)

/**
 * Fn
 */
const handleClick = (evt) => {
  const section = getCurrSection()

  evt.preventDefault()
  mouse.x = (evt.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(evt.clientY / window.innerHeight) * 2 + 1
  raycaster.setFromCamera(mouse, getCamera())
  const intersects = raycaster.intersectObjects(getScene().children, true)
  if (intersects.length > 0) {
    const boardID = intersects[0].object.parent.modelID
    // console.log("Intersection:", intersects[0].object.parent.modelID)
    if (section === 0) {
      if (getCurrBoard() !== boardID) setCurrBoard(boardID)
    }
    if (section === 3) {
      if (!getIsEndBoardZoomed()) zoomBoardView(true)
    }
  }
}
