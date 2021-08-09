import EventBus from "eventing-bus"
import { constants, setIsTesting } from "./model"

import "./styles/style.scss"
import "./experience"
import "./controllers/scroll-controller"
import "./views/loading-view"

/**
 * For testing
 */

const startTesting = (goto) => {
  setIsTesting(true)
  setTimeout(() => {
    // EventBus.publish("scene1")
    // EventBus.publish(constants.START_EXPERIENCE)
  }, 1000)
}

// startTesting()
