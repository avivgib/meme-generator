'use strict'

var gMeme = {
    selectedImgId: null,
    selectedLineIdx: 0,
    canvasBackground: null,
    lines: [
        {
            txt: 'Enter Text',
            size: 30,
            color: 'white',
            borderColor: 'black',
            borderWidth: 1,
            textAlign: 'center',
            posX: 200,
            posY: 40,
        }
    ]
}

function getMeme() {
    return gMeme
}

function getLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function getLines() {
    return gMeme.lines
}

function getSelectedLineIndex() {
    return gMeme.selectedLineIdx
}

function updateLineText(selectedLineIdx, text) {
    const selectedLine = gMeme.lines[selectedLineIdx]
    selectedLine.txt = text
}

function focusAndCleanTextInput() {
    const elTextInput = document.querySelector('.text-input')
    elTextInput.value = ''
    elTextInput.focus()
}