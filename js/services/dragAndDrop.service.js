'use strict'
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
var shouldDrawRect = true
let gStartPos

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        renderMeme()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown, { passive: false })
    gElCanvas.addEventListener('mousemove', onMove, { passive: false })
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDrewRect() {
    if (!gSelectedLine) return;

    const line = gSelectedLine;

    gCtx.font = `${line.size}px Arial`;
    gCtx.textAlign = line.textAlign;

    const metrics = gCtx.measureText(line.txt);
    const textWidth = metrics.width;
    const textHeight = line.size;

    const paddingX = 10;
    const paddingY = 10;

    let x = line.posX;
    let y = line.posY - textHeight - paddingY / 2;

    if (line.textAlign === 'center') {
        x -= (textWidth / 2 + paddingX);
    } else if (line.textAlign === 'right') {
        x -= (textWidth + paddingX);
    } else { 
        x -= paddingX;
    }

    gCtx.strokeStyle = 'black';
    gCtx.lineWidth = 2;
    gCtx.strokeRect(x, y, textWidth + (paddingX * 2), textHeight + (paddingY * 2));
}


function hideRect() {
    shouldDrawRect = false
    renderMeme()
}

function onDown(ev) {
    const pos = getEvPos(ev)

    if (isLineClicked(pos)) {
        gStartPos = pos
        gElCanvas.style.cursor = 'grabbing'
        ev.preventDefault()
    }
}

function onMove(ev) {
    const pos = getEvPos(ev)

    if (!gStartPos) {
        gElCanvas.style.cursor = isLineClicked(pos) ? 'grab' : 'default'
        return
    }

    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y

    gSelectedLine.posX += dx
    gSelectedLine.posY += dy
    gStartPos = pos

    renderMeme()
    ev.preventDefault()
}

function onUp(ev) {
    gStartPos = null
}

function isLineClicked(pos) {
    const line = gMeme.lines.find((line) => {
        const metrics = gCtx.measureText(line.txt);
        const textWidth = metrics.width;
        const textHeight = line.size;
        const paddingX = 10;
        const paddingY = 10;

        const xStart = line.posX - (line.textAlign === 'center' ? textWidth / 2 + paddingX : line.textAlign === 'right' ? textWidth + paddingX : paddingX);
        const xEnd = xStart + textWidth + (paddingX * 2);
        const yStart = line.posY - textHeight - paddingY / 2;
        const yEnd = yStart + textHeight + paddingY;

        return pos.x >= xStart && pos.x <= xEnd && pos.y >= yStart && pos.y <= yEnd;
    });

    if (line) {
        gMeme.selectedLineIdx = gMeme.lines.indexOf(line);
        gSelectedLine = line;
        gInput.value = gSelectedLine.txt;
        renderMeme();
        return true;
    }

    return false;
}


function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }

    return pos
}

function onChooseImgPicker() {
    document.querySelector('.hiddeninput').click()
}