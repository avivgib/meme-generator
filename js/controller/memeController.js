'use strict'

var gElCanvas
var gCtx

function renderMeme() {
    gElCanvas = document.querySelector('.meme-canvas')
    gCtx = gElCanvas.getContext('2d')
    const meme = getMeme()

    // Clear canvas
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)

    // Draw image
    drawImage(meme)
}

function drawImage(meme) {
    const img = gImgs.find((img) => img.id === meme.selectedImgId)
    if (img) {
        const image = new Image()
        image.src = img.url
        image.onload = () => {
            gCtx.drawImage(image, 0, 0, gElCanvas.width, gElCanvas.height)
            drawText(meme)
        }
    } else {
        drawText(meme)
    }
}

function drawText(meme) {
    meme.lines.forEach((line) => {
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

function onTextChange(text) {
    setLineTxt(text)
    renderMeme()
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