'use strict'

function renderMeme() {
    const canvas = document.querySelector('.meme-canvas')
    const ctx = canvas.getContext('2d')
    const meme = getMeme()

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw image
    const img = gImgs.find((img) => img.id === meme.selectedImgId)
    if (img) {
        const image = new Image()
        image.src = img.url
        image.onload = () => {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
            drawText(ctx, meme, canvas)
        }
    } else {
        drawText(ctx, meme, canvas)
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
        ctx.fillText(line.txt, canvas.width / 2, line.y + 20)
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
}