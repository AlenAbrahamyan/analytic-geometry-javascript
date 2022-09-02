const boxWrapper = document.getElementById("box-wrapper")
////
const triangle = document.createElement("div");
document.body.appendChild(triangle);

function createLineElement(x, y, length, angle, color='black') {
  var line = document.createElement("div");
  var styles = 'border: 3.5px solid '+ color +'; '
             + 'width: ' + length + 'px; '
             + 'height: 0px; '
             + '-moz-transform: rotate(' + angle + 'rad); '
             + '-webkit-transform: rotate(' + angle + 'rad); '
             + '-o-transform: rotate(' + angle + 'rad); '
             + '-ms-transform: rotate(' + angle + 'rad); '
             + 'position: absolute; '
             + 'top: ' + y + 'px; '
             + 'left: ' + x + 'px; ';
  line.setAttribute('style', styles);
  return line;
}

function createLine(x1, y1, x2, y2, color='black') {
  var a = x1 - x2,
      b = y1 - y2,
      c = Math.sqrt(a * a + b * b);

  var sx = (x1 + x2) / 2,
      sy = (y1 + y2) / 2;

  var x = sx - c / 2,
      y = sy;

  var alpha = Math.PI - Math.atan2(-b, a);

  return createLineElement(x, y, c, alpha, color);
}

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

      triangle.innerHTML = ''

      triangle.appendChild(createLine(arrowX, arrowY, arrowX, event.clientY, 'green'));
      triangle.appendChild(createLine(event.clientX, event.clientY, arrowX, event.clientY, 'blue'));
      triangle.appendChild(createLine(arrowX, arrowY, event.clientX, event.clientY, 'red'));
    }

    window.addEventListener("mousemove", eventMoveHandler, false)

    window.addEventListener(
      "mouseup",
      function eventEndHandler() {
        window.removeEventListener("mousemove", eventMoveHandler, false)
        window.removeEventListener("mouseup", eventEndHandler)
        triangle.innerHTML = ''
      },
      false
    )
  },
  false
)
