'use strict'

var gElCanvas
var gCtx

// Rendering Functions
function renderMeme() {
    gElCanvas = document.querySelector('.meme-canvas')
    gCtx = gElCanvas.getContext('2d')
    gMeme = getMeme()

    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    drawImage()
}

function saveCanvasBackground() {
    gMeme.canvasBackground = gCtx.getImageData(0, 0, gElCanvas.width, gElCanvas.height)
}

function drawImage() {
    const img = gImgs.find((img) => img.id === gMeme.selectedImgId)
    if (img) {
        const image = new Image()
        image.src = img.url
        image.onload = () => {
            gCtx.drawImage(image, 0, 0, gElCanvas.width, gElCanvas.height)
            saveCanvasBackground()
            drawText()
        }
    }
}

function drawText() {
    gCtx.putImageData(gMeme.canvasBackground, 0, 0)

    gMeme.lines.forEach((line) => {
        if (!line.txt || !line.color || !line.size) {
            console.error(`Invalid line properties: ${line}`)
            return
        }

        configureTextStyle(line)
        const { x, y } = calculateTextPosition(line)
        gCtx.fillText(line.txt, x, y)
    })
}

function configureTextStyle(line) {
    gCtx.font = `${line.size}px Arial`
    gCtx.fillStyle = line.color || 'white'
    gCtx.textAlign = 'center'
    gCtx.strokeStyle = 'rgba(0, 0, 0, 0)'
}

function calculateTextPosition(line) {
    const x = gElCanvas.width / 2
    const y = line.y + line.size
    return { x, y }
}

// Event Handlers
function onTextChange(text) {
    setLineTxt(text)
    drawText()
}

function onColorChange(color) {
    setColor(color)
    drawText()
}

function onIncreaseFont() {
    increaseFont()
    drawText()
}

function onDecreaseFont() {
    decreaseFont()
    drawText()
}

function onImgSelect(imgId) {
    setImg(imgId)
    renderMeme()
    showSection('editor-section')

    const elTextInput = document.querySelector('.meme-text-input')
    if (elTextInput) elTextInput.focus()
}

function onDownloadMeme(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}