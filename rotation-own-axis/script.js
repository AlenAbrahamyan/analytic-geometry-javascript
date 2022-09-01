const boxWrapper = document.getElementById("box-wrapper")
////
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

const rotate = document.getElementById("rotate")

rotate.addEventListener(
  "mousedown",
  () => {
    const arrow = document.getElementById("box-wrapper")
    const arrowRects = arrow.getBoundingClientRect()
    const arrowX = arrowRects.left + arrowRects.width / 2
    const arrowY = arrowRects.top + arrowRects.height / 2

    const eventMoveHandler = (event) => {
      var angle =
        Math.atan2(event.clientY - arrowY, event.clientX - arrowX) + Math.PI / 2
      boxWrapper.style.transform = `rotate(${(angle * 180) / Math.PI}deg)`
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
