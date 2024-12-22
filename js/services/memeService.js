'use strict'

var gImgs = [{
    id: 1,
    url: 'imgs/1.jpg',
    keywords: ['funny', 'cat']
}]

var gMeme = {
    selectedImgId: null,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'white',
            x: 0,
            y: 0,
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
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function increaseFont() {
    gMeme.lines[gMeme.selectedLineIdx].size += 2
}

function decreaseFont() {
    gMeme.lines[gMeme.selectedLineIdx].size -= 2
    // gMeme.fontSize = Math.max(10, gMeme.fontSize - 2)
}