import EventBus from "eventing-bus"
import gsap from "gsap"
import * as THREE from "three"
import { constants, getCamera, getMouseOrbitMove } from "../model"

const mouse = new THREE.Vector2()

const handleStartExperience = () => {
  document.addEventListener("mousemove", onMouseMove, false)
}

const onMouseMove = (e) => {
  // if (getMouseOrbitMove()) {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1
  // mouse.y = (e.clientY / window.innerHeight) * 2 - 1
  gsap.to(getCamera().position, { duration: 1, x: mouse.x * 3, ease: "none" })
  // gsap.to(getCamera().position, { duration: 1, y: mouse.y * 4, ease: "none" })
  // }
}

EventBus.on(constants.START_EXPERIENCE, handleStartExperience)
