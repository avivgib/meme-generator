function setLineTxt(text = 'Enter Text', position = { x: 200, y: 35 }) {
    return {
        txt: text,
        size: 30,
        color: 'white',
        borderColor: 'black',
        borderWidth: 1,
        textAlign: 'center',
        posX: position.x,
        posY: position.y,
    }
}

// Add Text
function addText(inputElement) {
    const elText = inputElement.value
    if (gMeme.lines.length) {
        gSelectedLine.txt = elText
    } else {
        gMeme.lines.push(setLineTxt(elText))
        gMeme.selectedLineIdx++
    }
}

function addLine(count, text = 'Enter Text') {
    const canvasWidth = 400
    const canvasHeight = 450

    var lineHeight = gMeme.lines.length ? gMeme.lines[gMeme.selectedLineIdx].posY + 40 : canvasHeight / 2
    var lineWidth = gMeme.lines.length ? gMeme.lines[gMeme.selectedLineIdx].posX + count : canvasWidth / 2

    lineWidth = lineWidth >= canvasWidth ? 0 : lineWidth
    lineHeight = lineHeight >= canvasHeight ? 50 : lineHeight
    
    const newLine = setLineTxt(text, { x: lineWidth, y: lineHeight })
    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

function switchLine() {
    if (gMeme.selectedLineIdx > 0) gMeme.selectedLineIdx-- 
    else gMeme.selectedLineIdx = gMeme.lines.length - 1
}

// Highlight selected text
// function highlightSelectedText() {
//     const selectedLine = gMeme.lines[gMeme.selectedLineIdx];
//     console.log('Selected Line:', selectedLine);
// }


function changeFontSize(delta) {
    const maxFontSize = Math.floor(gElCanvas.width / 8)
    const minFontSize = 22
    const selectedLine = gMeme.lines[gMeme.selectedLineIdx]

    selectedLine.size = Math.min(Math.max(selectedLine.size + delta, minFontSize), maxFontSize)
}

function alignText(alignType) {
    const textWidth = gSelectedLine.txt.length
    gSelectedLine.textAlign = alignType
    
    if (alignType === 'left') gSelectedLine.posX = 10
    else if (alignType === 'center') gSelectedLine.posX = (gElCanvas.width - textWidth) / 2 
    else gSelectedLine.posX = gElCanvas.width - textWidth
}


function onCanvasClick(event) {
    const canvas = document.querySelector('.meme-canvas');
    const rect = canvas.getBoundingClientRect();

    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    const clickedLineIdx = gMeme.lines.findIndex(line => {
        const textWidth = gCtx.measureText(line.txt).width;
        const textHeight = line.size;
        return (
            clickX >= line.x &&
            clickX <= line.x + textWidth &&
            clickY >= line.y - textHeight &&
            clickY <= line.y
        );
    });

    if (clickedLineIdx !== -1) {
        gMeme.selectedLineIdx = clickedLineIdx;

        const selectedLine = gMeme.lines[clickedLineIdx];
        document.querySelector('.text-input').value = selectedLine.txt;
        renderMeme();
    }
}

function focusAndCleanTextInput() {
    const elTextInput = document.querySelector('.text-input')
    elTextInput.value = ''
    elTextInput.focus()
}

function drawTextBox() {
    if (!gSelectedLine) return

    const line = gSelectedLine

    gCtx.font = `${line.size}px Arial`
    gCtx.textAlign = line.textAlign

    const metrics = gCtx.measureText(line.txt)
    const textHeight = line.size
    const textWidth = metrics.width

    const paddingX = 10
    const paddingY = 10

    let x = line.posX
    let y = line.posY - textHeight

    if (line.textAlign === 'center') {
        x -= textWidth / 2 + paddingX;
    } else if (line.textAlign === 'right') {
        x -= textWidth + (paddingX * 2);
    }

    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 2
    gCtx.strokeRect(x, y, textWidth + (paddingX * 2), textHeight + paddingY)
}