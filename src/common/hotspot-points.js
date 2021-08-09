import * as THREE from "three"

export const getHotspotPoints = () => {
  const desktop = window.innerWidth > window.innerHeight
  console.log(desktop)
  return [
    {
      // left
      position: desktop ? new THREE.Vector3(-2.3, 1, 0.6) : new THREE.Vector3(-1.4, -0.8, 0.6),
      element: document.querySelector(".point-left"),
    },
    {
      // right
      position: desktop ? new THREE.Vector3(3.4, 0, 0.6) : new THREE.Vector3(1.4, 3.2, 0.6),
      element: document.querySelector(".point-right"),
    },
    {
      // pickups
      position: new THREE.Vector3(-1.8, -1.9, 2.6),
      element: document.querySelector("#pickups-hotspot"),
    },
    {
      // bridge
      position: new THREE.Vector3(-1.1, -4.3, 2.5),
      element: document.querySelector("#bridge-hotspot"),
    },
    {
      // knobs
      position: new THREE.Vector3(-1.2, -2.8, 3.5),
      element: document.querySelector("#knobs-hotspot"),
    },
    {
      // body
      position: new THREE.Vector3(0, -3, 1),
      element: document.querySelector("#body-hotspot"),
    },
    {
      // tuners
      position: new THREE.Vector3(5.1, 0.6, 0.5),
      element: document.querySelector("#tuners-hotspot"),
    },
    {
      // neck
      position: new THREE.Vector3(3.8, -0.1, -0.2),
      element: document.querySelector("#neck-hotspot"),
    },
  ]
}
