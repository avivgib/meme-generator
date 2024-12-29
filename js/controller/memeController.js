'use strict'

var gElCanvas
var gCtx
var gCachedImage = null

// Rendering Functions
function renderMeme() {
    gElCanvas = document.querySelector('.meme-canvas')
    gCtx = gElCanvas.getContext('2d')
    gMeme = getMeme()

    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    loadImageOnce(() => {
        console.log('Image is loaded!')
        drawText()
    })
}

function loadImageOnce(callback) {
    if (gCachedImage) {
        // if image exist, draw it
        drawImageToCanvas(gCachedImage)
        if (callback) callback()
        return
    }

    // load the image in the first time
    const img = gImgs.find((img) => img.id === gMeme.selectedImgId)
    if (!img) return

    const image = new Image()
    image.src = img.url
    image.onload = () => {
        gCachedImage = image
        drawImageToCanvas(image)
        if (callback) callback()
    }
}

function drawImageToCanvas(image) {
    const { width: canvasWidth, height: canvasHeight } = gElCanvas
    const { width: imgWidth, height: imgHeight } = image

    const { x, y, width, height } = calculateImageDimensions(canvasWidth, canvasHeight, imgWidth, imgHeight)
    gCtx.drawImage(image, x, y, width, height)
}

function calculateImageDimensions(canvasWidth, canvasHeight, imgWidth, imgHeight) {
    const canvasAspectRatio = canvasWidth / canvasHeight
    const imgAspectRatio = imgWidth / imgHeight

    let width, height
    if (imgAspectRatio > canvasAspectRatio) {
        // Image is wider than canvas
        width = canvasWidth
        height = canvasWidth / imgAspectRatio
    } else {
        // Image is taller than canvas
        width = canvasHeight * imgAspectRatio
        height = canvasHeight
    }

    const x = (canvasWidth - width) / 2
    const y = (canvasHeight - height) / 2

    return { x, y, width, height }
}

function drawText() {
    gMeme.lines.forEach((line) => {
        if (!line.txt || !line.color || !line.size) return

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
function onAddText(text) {
    setLineTxt(text)
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
