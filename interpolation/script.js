const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const width = (canvas.width = window.innerWidth)
const height = (canvas.height = window.innerHeight)
//////////
let x = width / 2
let ballX = x

let y = height / 2
let ballY = y

const interpolation = (start, end, alpha) => end * alpha + start * (1 - alpha)

window.addEventListener("mousedown", (e) => {
  x = e.clientX
  y = e.clientY
})

const moveBall = () => {
  ctx.clearRect(0, 0, width, height)
  
  ctx.fillStyle = "#ea6370"
  ballX = interpolation(ballX, x, 0.05)
  ballY = interpolation(ballY, y, 0.05)
  ctx.beginPath()
  ctx.arc(ballX, ballY, 50, 0, 2 * Math.PI)
  ctx.fill()

  ctx.beginPath()
  ctx.moveTo(ballX, ballY)
  ctx.lineTo(x, y)
  ctx.stroke()

  requestAnimationFrame(moveBall)
}

moveBall()
