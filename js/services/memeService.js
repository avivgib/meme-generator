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
            txt: '',
            size: 30,
            color: 'white',
            x: 0,
            y: 10,
        }
    ]
}

// var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getMeme() {
    return gMeme
}

function getImgs() {
    return gImgs
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt.toUpperCase()

    // const elTxt = document.querySelector('')
}

function setColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function increaseFont() {
    const maxFontSize = gElCanvas.width / 10
    const currentSize = gMeme.lines[gMeme.selectedLineIdx].size

    gMeme.lines[gMeme.selectedLineIdx].size = Math.min(currentSize + 2, maxFontSize)
}

function decreaseFont() {
    gMeme.lines[gMeme.selectedLineIdx].size = Math.max(20, gMeme.lines[gMeme.selectedLineIdx].size - 2)
    // gMeme.fontSize = Math.max(10, gMeme.fontSize - 2)
}