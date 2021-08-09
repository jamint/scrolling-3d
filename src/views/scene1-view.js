import EventBus from "eventing-bus"
import { el } from "../common/utils"

const handleClick = () => {
  EventBus.publish("scene1")
}

el(".text-container .btn-container .btn").addEventListener("click", handleClick)
