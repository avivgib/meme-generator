'use strict'

var gElCanvas
var gCtx
var gSelectedLine
var gSelectedImage
var gStartPosition
var gInput

function initCanvas(imgUrl) {
    gElCanvas = document.querySelector('.meme-canvas')
    gInput = document.querySelector('.text-input')
    gSelectedImage = imgUrl
    renderMeme()
}

function renderMeme() {
    gCtx = gElCanvas.getContext('2d')
    gSelectedLine = getLine()

    const img = new Image()
    img.src = gSelectedImage

    img.onload = () => {
        gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
        resizeCanvas()
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        renderLines()
        drawTextBox()
    }
}

// Maintain the image proportions
function resizeCanvas() {
    const img = new Image()
    img.src = gSelectedImage

    gElCanvas.width = window.outerWidth > 768 ? 394 : window.outerWidth - 30
    gElCanvas.height = (img.height * gElCanvas.width) / img.width
}

function renderLines() {
    const lines = getLines()
    lines.forEach((line) => {
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
    const text = inputElement.value.trim()
    if (!text) return

    const selectedLineIdx = getSelectedLineIndex()
    selectedLineIdx !== -1 ? updateLineText(selectedLineIdx, text) : addLine(0, text)
    
    renderMeme()
}

function onAddLine(count) {
    addLine(count)
    gInput.value = ''
    renderMeme()
}

function onRemoveLine() {
    removeLine()
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    renderMeme()
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

