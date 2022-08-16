var box = document.getElementById("box");
var boxWrapper = document.getElementById("box-wrapper");
const minWidth = 40;
const minHeight = 40;
//
////
var initX, initY, mousePressX, mousePressY, initW, initH, initRotate;

function repositionElement(x, y) {
    boxWrapper.style.left = x + 'px';
    boxWrapper.style.top = y + 'px';
}

function resize(w, h) {
    box.style.width = w + 'px';
    box.style.height = h + 'px';
}


function getCurrentRotation(el) {
    var st = window.getComputedStyle(el, null);
    var tm = st.getPropertyValue("-webkit-transform") ||
        st.getPropertyValue("-moz-transform") ||
        st.getPropertyValue("-ms-transform") ||
        st.getPropertyValue("-o-transform") ||
        st.getPropertyValue("transform")
    "none";
    if (tm != "none") {
        var values = tm.split('(')[1].split(')')[0].split(',');
        var angle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
        return (angle < 0 ? angle + 360 : angle);
    }
    return 0;
}

function rotateBox(deg) {
    boxWrapper.style.transform = `rotate(${deg}deg)`;
}

// drag support
boxWrapper.addEventListener('mousedown', function (event) {
    if (event.target.className.indexOf("dot") > -1) {
        return;
    }

    initX = this.offsetLeft;
    initY = this.offsetTop;
    mousePressX = event.clientX;
    mousePressY = event.clientY;


    function eventMoveHandler(event) {
        repositionElement(initX + (event.clientX - mousePressX),
            initY + (event.clientY - mousePressY));
    }

    boxWrapper.addEventListener('mousemove', eventMoveHandler, false);
    window.addEventListener('mouseup', function eventEndHandler() {
        boxWrapper.removeEventListener('mousemove', eventMoveHandler, false);
        window.removeEventListener('mouseup', eventEndHandler);
    }, false);

}, false);
// done drag support

// handle resize
var rightMid = document.getElementById("right-mid");
var leftMid = document.getElementById("left-mid");
var topMid = document.getElementById("top-mid");
var bottomMid = document.getElementById("bottom-mid");

var leftTop = document.getElementById("left-top");
var rightTop = document.getElementById("right-top");
var rightBottom = document.getElementById("right-bottom");
var leftBottom = document.getElementById("left-bottom");

function resizeHandler(event, left = false, top = false, xResize = false, yResize = false) {
    initX = boxWrapper.offsetLeft;
    initY = boxWrapper.offsetTop;
    mousePressX = event.clientX;
    mousePressY = event.clientY;

    initW = box.offsetWidth;
    initH = box.offsetHeight;

    initRotate = getCurrentRotation(boxWrapper);
    var initRadians = initRotate * Math.PI / 180;
    var cosFraction = Math.cos(initRadians);
    var sinFraction = Math.sin(initRadians);
    function eventMoveHandler(event) {
        var wDiff = (event.clientX - mousePressX);
        var hDiff = (event.clientY - mousePressY);
        var rotatedWDiff = cosFraction * wDiff + sinFraction * hDiff;
        var rotatedHDiff = cosFraction * hDiff - sinFraction * wDiff;

        var newW = initW, newH = initH, newX = initX, newY = initY;

        if (xResize) {
            if (left) {
                newW = initW - rotatedWDiff;
                if (newW < minWidth) {
                  newW = minWidth;
                  rotatedWDiff = initW - minWidth;
                }
            } else {
                newW = initW + rotatedWDiff;
                if (newW < minWidth) {
                  newW = minWidth;
                  rotatedWDiff = minWidth - initW;
                }
            }
            newX += 0.5 * rotatedWDiff * cosFraction;
            newY += 0.5 * rotatedWDiff * sinFraction;
        }

        if (yResize) {
            if (top) {
                newH = initH - rotatedHDiff;
                if (newH < minHeight) {
                  newH = minHeight;
                  rotatedHDiff = initH - minHeight;
                }
            } else {
                newH = initH + rotatedHDiff;
                if (newH < minHeight) {
                  newH = minHeight;
                  rotatedHDiff = minHeight - initH;
                }
            }
            newX -= 0.5 * rotatedHDiff * sinFraction;
            newY += 0.5 * rotatedHDiff * cosFraction;
        }

        resize(newW, newH);
        repositionElement(newX, newY);
    }


    window.addEventListener('mousemove', eventMoveHandler, false);
    window.addEventListener('mouseup', function eventEndHandler() {
        window.removeEventListener('mousemove', eventMoveHandler, false);
        window.removeEventListener('mouseup', eventEndHandler);
    }, false);
}


rightMid.addEventListener('mousedown', e => resizeHandler(e, false, false, true, false));
leftMid.addEventListener('mousedown', e => resizeHandler(e, true, false, true, false));
topMid.addEventListener('mousedown', e => resizeHandler(e, false, true, false, true));
bottomMid.addEventListener('mousedown', e => resizeHandler(e, false, false, false, true));
leftTop.addEventListener('mousedown', e => resizeHandler(e, true, true, true, true));
rightTop.addEventListener('mousedown', e => resizeHandler(e, false, true, true, true));
rightBottom.addEventListener('mousedown', e => resizeHandler(e, false, false, true, true));
leftBottom.addEventListener('mousedown', e => resizeHandler(e, true, false, true, true));

// handle rotation
var rotate = document.getElementById("rotate");
rotate.addEventListener('mousedown', function (event) {
    // if (event.target.className.indexOf("dot") > -1) {
    //     return;
    // }

    initX = this.offsetLeft;
    initY = this.offsetTop;
    mousePressX = event.clientX;
    mousePressY = event.clientY;


    var arrow = document.querySelector("#box");
    var arrowRects = arrow.getBoundingClientRect();
    var arrowX = arrowRects.left + arrowRects.width / 2;
    var arrowY = arrowRects.top + arrowRects.height / 2;

    function eventMoveHandler(event) {
        var angle = Math.atan2(event.clientY - arrowY, event.clientX - arrowX) + Math.PI / 2;
        rotateBox(angle * 180 / Math.PI);
    }

    window.addEventListener('mousemove', eventMoveHandler, false);

    window.addEventListener('mouseup', function eventEndHandler() {
        window.removeEventListener('mousemove', eventMoveHandler, false);
        window.removeEventListener('mouseup', eventEndHandler);
    }, false);
}, false);

resize(200, 350);
repositionElement(300, 300);
