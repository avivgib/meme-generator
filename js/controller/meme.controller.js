'use strict'

var gElCanvas
var gCtx
var gSelectedLine
var gSelectedImage
var gStartPosition
const gInput = document.querySelector('.text-input')


function initCanvas(imgUrl) {
    gSelectedImage = imgUrl
    renderMeme()
}

function renderMeme() {
    gElCanvas = document.querySelector('.meme-canvas')
    gCtx = gElCanvas.getContext('2d')
    gSelectedLine = getLine()

    const img = new Image()
    img.src = gSelectedImage

    img.onload = () => {
        gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
        resizeCanvas()
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        renderLines()
        onL()
    }
}

// Maintain the image proportions
function resizeCanvas() {
    const img = new Image()
    img.src = gSelectedImage
    if (window.outerWidth > 768) {
        gElCanvas.width = 394
    } else {
        gElCanvas.width = window.outerWidth - 30
    }

    const canvasHeight = (img.height * gElCanvas.width) / img.width
    gElCanvas.height = canvasHeight
}

function renderLines() {
    gMeme.lines.forEach((line) => {
        gCtx.font = `${line.size}px Arial`
        gCtx.textAlign = line.textAlign
        gCtx.fillStyle = line.color
        gCtx.strokeStyle = line.borderColor
        gCtx.lineWidth = line.borderWidth

        gCtx.fillText(line.txt, line.posX, line.posY)
        gCtx.strokeText(line.txt, line.posX, line.posY)
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
function onAddText(text) {
    if (text) {
        setLineTxt(text)
    } else {
        addText()
    }

    renderMeme()
    renderTextOnly()
}

function onColorChange(color) {
    setColor(color)
    renderTextOnly()
}

function onIncreaseFont() {
    increaseFont()
    renderTextOnly()
}

function onDecreaseFont() {
    decreaseFont()
    renderTextOnly()
}

function onDownloadMeme(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function renderTextOnly() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    drawImageToCanvas(gCachedImage)
    drawText()
}
