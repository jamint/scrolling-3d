import EventBus from "eventing-bus"
import { constants } from "../model"

const handleStartExperience = () => {
  // const viewEl = document.querySelector("#header-view")
  // viewEl.classList.add("show")
}

EventBus.on(constants.START_EXPERIENCE, handleStartExperience)
