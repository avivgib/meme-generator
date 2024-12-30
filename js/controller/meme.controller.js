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

function onAddText(inputElement) {
    const text = inputElement.value

    if (gMeme.lines.length) {
        const selectedLine = gMeme.lines[gMeme.selectedLineIdx]
        selectedLine.txt = text
    } else {
        addLine(0, text)
    }
    renderMeme()
}

function onAddLine(count) {
    addLine(count)
    gInput.value = ''
    renderMeme()
}

function onRemoveLine() {
    if (gMeme.lines.length && gMeme.lines.length > 0) {
        removeLine()
        gMeme.selectedLineIdx = gMeme.lines.length - 1
        gSelectedLine = gMeme.lines[gMeme.selectedLineIdx]
        gInput.value = gSelectedLine.txt
    } else {
        gInput.value = ''
    }
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    renderMeme()
}

function onColorChange(color) {
    setColor(color)
}

function onChangeFontSize(delta) {
    changeFontSize(delta)
    renderMeme()
}

function onAlignText(alignType) {
    alignText(alignType)
    renderMeme()
}

function onPickFillColor() {
    const elFillColor = document.querySelector('.fill-color')
    elFillColor.addEventListener('input', (event) => {
        gSelectedLine.color = event.target.value
        renderMeme()
    })
    elFillColor.click()
}

function onPickBorderColor() {
    const elBorderColor = document.querySelector('.border-color')
    elBorderColor.addEventListener('input', (event) => {
        gSelectedLine.borderColor = event.target.value
        renderMeme()
    })
    elBorderColor.click()
}

function onDownloadMeme(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

