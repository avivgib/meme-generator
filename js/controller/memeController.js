'use strict'

var gElCanvas
var gCtx
var gMeme

function renderMeme() {
    gElCanvas = document.querySelector('.meme-canvas')
    gCtx = gElCanvas.getContext('2d')
    gMeme = getMeme()

    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    drawImage()
}

function drawImage() {
    const img = gImgs.find((img) => img.id === gMeme.selectedImgId)
    if (img) {
        const image = new Image()
        image.src = img.url
        image.onload = () => {
            gCtx.drawImage(image, 0, 0, gElCanvas.width, gElCanvas.height)
            drawText()
        }
    }
}

function drawText() {
    gMeme.lines.forEach((line) => {
        if (!line.txt || !line.color || !line.size) {
            console.error(`Invalid line properties: ${line}`)
            return
        }

        gCtx.font = `${line.size}px Arial`
        gCtx.fillStyle = line.color
        gCtx.textAlign = 'center'

        const x = gElCanvas.width / 2
        const y = line.y + line.size
        gCtx.fillText(line.txt, x, y)
    });
}

function updateText() {
    clearCanvasText()
    drawText(gMeme)
}

function clearCanvasText() {
    gCtx.cl
}

function onTextChange(text) {
    setLineTxt(text)
    updateText()
}

function onColorChange(color) {
    setColor(color)
    renderMeme()
}

function onIncreaseFont() {
    increaseFont()
    renderMeme()
}

function onDecreaseFont() {
    decreaseFont()
    renderMeme()
}

function onImgSelect(imgId) {
    setImg(imgId)
    renderMeme()
    showSection('editor-section')
}

function onDownloadMeme(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}