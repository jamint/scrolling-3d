import EventBus from "eventing-bus"
import gsap from "gsap"
import { constants, getCurrSection, setCurrScene } from "../model"

const viewEl = document.querySelector("#loading-view"),
  container1El = viewEl.querySelector(".container1"),
  container2El = viewEl.querySelector(".container2"),
  title = viewEl.querySelector(".title"),
  img = viewEl.querySelector("img"),
  by = viewEl.querySelector(".by"),
  loadingBar = viewEl.querySelector(".loading-bar"),
  continueBtnContainer = viewEl.querySelector(".btn-container"),
  continueBtn = viewEl.querySelector(".continue-btn"),
  elArr = [title, img, by, continueBtnContainer],
  loadingEl = viewEl.querySelector(".loading-msg"),
  continueEl = viewEl.querySelector(".continue-msg")

/**
 * Event handlers
 */

const handleAssetsLoaded = () => {
  continueBtn.classList.add("ready")
  loadingEl.style.display = "none"
  continueEl.style.display = "block"
  gsap.to(continueBtnContainer, { duration: 0.7, scale: 1.2, yoyo: true, repeat: 1, ease: "power4.inOut" })
}

const handleContinueClick = () => {
  viewEl.classList.remove("show")
  setTimeout(() => {
    setCurrScene(0)
    EventBus.publish(constants.START_EXPERIENCE)
  }, 1000)
  setTimeout(() => {
    viewEl.style.display = "none"
  }, 2000)
}

continueBtn.addEventListener("click", handleContinueClick)
EventBus.on(constants.ASSETS_LOADED, handleAssetsLoaded)

/**
 * Fn
 */

const init = () => {
  const delay = 1
  setTimeout(() => {
    gsap.from(elArr, { duration: 1, y: 50, alpha: 0, stagger: 0.2, ease: "power4.out" })
    container1El.classList.add("show")
    container2El.classList.add("show")
  }, delay * 500)
  setTimeout(() => {
    gsap.to(loadingBar, { alpha: 1 })
  }, 1000)
  continueEl.style.display = "none"
}

init()
