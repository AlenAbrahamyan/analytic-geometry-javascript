const boxWrapper = document.getElementById("box-wrapper")
const elements = document.getElementsByClassName("element")

const initialAxisElements = []
//
for (let element of elements) {
  const el = getComputedStyle(element)
  initialAxisElements.push({
    x: parseFloat(el.left) + parseFloat(el.width) / 2,
    y: parseFloat(el.top) + parseFloat(el.height) / 2,
    width: parseFloat(el.width),
    height: parseFloat(el.height),
  })
}

console.log(initialAxisElements)
const getCurrentRotation = (el) => {
  var st = window.getComputedStyle(el, null)
  var tm =
    st.getPropertyValue("-webkit-transform") ||
    st.getPropertyValue("-moz-transform") ||
    st.getPropertyValue("-ms-transform") ||
    st.getPropertyValue("-o-transform") ||
    st.getPropertyValue("transform")
  ;("none")
  if (tm != "none") {
    var values = tm.split("(")[1].split(")")[0].split(",")
    var angle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI))
    return angle < 0 ? angle + 360 : angle
  }
  return 0
}

const newCoordsByRotate = (initCoords, axis, rotate) => {
  const R = Math.sqrt(
    (axis.x - initCoords.x) ** 2 + (axis.y - initCoords.y) ** 2
  )

  const curDeg =
    (Math.atan((initCoords.y - axis.y) / (initCoords.x - axis.x)) * 180) /
    Math.PI

  const d = initCoords.x - axis.x < 0 ? 180 : 0

  const x = R * Math.cos(((curDeg + rotate - d) / 180) * Math.PI) + axis.x
  const y = R * Math.sin(((curDeg + rotate - d) / 180) * Math.PI) + axis.y
  return { x, y }
}

const rotate = document.getElementById("rotate")

rotate.addEventListener(
  "mousedown",
  () => {
    const arrow = document.getElementById("box-wrapper")
    const arrowRects = arrow.getBoundingClientRect()
    const arrowX = arrowRects.left + arrowRects.width / 2
    const arrowY = arrowRects.top + arrowRects.height / 2
    const axis = { x: arrowX, y: arrowY }

    const eventMoveHandler = (event) => {
      const angle =
        Math.atan2(event.clientY - axis.y, event.clientX - axis.x) + Math.PI / 2
      const deg = (angle * 180) / Math.PI
      boxWrapper.style.transform = `rotate(${deg}deg)`

      for (let i = 0; i < elements.length; i++) {
        elements[i].style.transform = `rotate(${deg}deg)`

        const newPos = newCoordsByRotate(initialAxisElements[i], axis, deg)
        elements[i].style.left = newPos.x - initialAxisElements[i].width / 2 + "px"
        elements[i].style.top = newPos.y - initialAxisElements[i].height / 2 + "px"
      }
    }

    window.addEventListener("mousemove", eventMoveHandler, false)

    window.addEventListener(
      "mouseup",
      function eventEndHandler() {
        window.removeEventListener("mousemove", eventMoveHandler, false)
        window.removeEventListener("mouseup", eventEndHandler)
      },
      false
    )
  },
  false
)
