'use strict'

function renderMeme() {
    const elCanvas = document.querySelector('.meme-canvas')
    const ctx = elCanvas.getContext('2d')
    const meme = getMeme()

    // Clear canvas
    ctx.clearRect(0, 0, elCanvas.width, elCanvas.height)

    // Draw image
    const img = gImgs.find((img) => img.id === meme.selectedImgId)
    if (img) {
        const image = new Image()
        image.src = img.url
        image.onload = () => {
            ctx.drawImage(image, 0, 0, elCanvas.width, elCanvas.height)
            drawText(ctx, meme, elCanvas)
        }
    } else {
        drawText(ctx, meme, elCanvas)
    }
}

function drawText(ctx, meme, canvas) {
    meme.lines.forEach((line) => {
        if (!line.txt || !line.color || !line.size) {
            console.error(`Invalid line properties: ${line}`)
            return
        }

        ctx.font = `${line.size}px Arial`
        ctx.fillStyle = line.color
        ctx.textAlign = 'center'

        const x = canvas.width / 2
        const y = line.y + line.size
        ctx.fillText(line.txt, x, y)
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