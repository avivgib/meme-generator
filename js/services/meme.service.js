'use strict'

var gImgs = [
    { id: 1, url: 'imgs/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'imgs/2.jpg', keywords: ['cute', 'dog'] },
    { id: 3, url: 'imgs/3.jpg', keywords: ['cute', 'baby', 'dog'] },
    { id: 4, url: 'imgs/4.jpg', keywords: ['cute', 'cat'] },
    { id: 5, url: 'imgs/5.jpg', keywords: ['funny', 'baby'] },
    { id: 6, url: 'imgs/6.jpg', keywords: ['funny', 'man'] },
    { id: 7, url: 'imgs/7.jpg', keywords: ['cute', 'baby'] },
    { id: 8, url: 'imgs/8.jpg', keywords: ['happy', 'man'] },
    { id: 9, url: 'imgs/9.jpg', keywords: ['funny', 'child'] },
    { id: 10, url: 'imgs/10.jpg', keywords: ['happy', 'man'] },
    { id: 11, url: 'imgs/11.jpg', keywords: ['fight', 'man'] },
    { id: 12, url: 'imgs/12.jpg', keywords: ['funny', 'man'] },
    { id: 13, url: 'imgs/13.jpg', keywords: ['funny', 'man'] },
    { id: 14, url: 'imgs/14.jpg', keywords: ['serious', 'man'] },
    { id: 15, url: 'imgs/15.jpg', keywords: ['serious', 'man'] },
    { id: 16, url: 'imgs/16.jpg', keywords: ['funny', 'man'] },
    { id: 17, url: 'imgs/17.jpg', keywords: ['funny', 'man'] },
    { id: 18, url: 'imgs/18.jpg', keywords: ['funny', 'toy'] }
]

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

function getLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function getMeme() {
    return gMeme
}

function getImgs() {
    return gImgs
}


// Set color
function setColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

// function resetEditorData() {
//     const selectedLine = gMeme.lines[gMeme.selectedLineIdx];
//     selectedLine.txt = ''
//     selectedLine.size = 30
//     selectedLine.color = 'black'
//     selectedLine.borderColor = '#FFFFFF'
//     selectedLine.borderWidth = 5
//     selectedLine.textAlign = 'center'
//     selectedLine.posX = 0
//     selectedLine.posY = 10
// }

// function resetDomEditor() {
//     focusAndCleanTextInput()

//     // const elColor = document.querySelector('.color-input')
//     // elColor.value = 'black'

//     // const elColor = document.querySelector('.color-input')
//     // elColor.value = 'black'

//     // const elColor = document.querySelector('.color-input')
//     // elColor.value = 'black'


//     // // const elColor = document.querySelector('.color-input')
//     // // elColor.value = 'black'

//     // const elbtnFillColor = document.querySelector('.btn-fill-color')
//     // elbtnFillColor.value = selectedLine.color

//     // const elBorderPaint = document.querySelector('.btn-border-paint')
//     // elBorderPaint.value = selectedLine.borderColor
// }

function focusAndCleanTextInput() {
    const elTextInput = document.querySelector('.text-input')
    elTextInput.value = ''
    elTextInput.focus()
}