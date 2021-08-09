import EventBus from "eventing-bus"
import { getModelsArr, getCurrSection, getCurrBoard, setSwipeDirection, constants } from "../model"

let startingClientX = null

/**
 * Event handlers
 */
const handleSectionChanged = () => {
  if (getCurrSection() === 0) {
    document.addEventListener("touchstart", handleTouchStart, false)
    document.addEventListener("touchmove", handleTouchMove, false)
  } else {
    document.removeEventListener("touchstart", handleTouchStart, false)
    document.removeEventListener("touchmove", handleTouchMove, false)
  }
}

EventBus.on(constants.SECTION_CHANGED, handleSectionChanged)

/**
 *
 * Fn
 */
function handleTouchStart(evt) {
  startingClientX = evt.touches[0].clientX
}

function handleTouchMove(evt) {
  const numBoards = getModelsArr().length,
    currClientX = evt.touches[0].clientX,
    currBoard = getCurrBoard()

  if (currClientX < startingClientX) {
    if (currBoard < numBoards - 1) {
      setSwipeDirection("right")
    }
  }
  if (currClientX > startingClientX) {
    if (currBoard > 0) {
      setSwipeDirection("left")
    }
  }
}
