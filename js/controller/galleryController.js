'use strict'

function renderGallery() {
    const gallery = document.querySelector('.gallery-container')
    const images = getImgs() 

    const strHtml = images.map((img) =>  `
        <img src="${img.url}" alt="Meme Image" onclick="onImgSelect(${img.id})">
        `).join('')

        gallery.innerHTML = strHtml
}

function onImgSelect(imgId) {
    setImg(imgId)
    resetEditor()
    renderMeme()

    const elEditorBtn = document.querySelector('.editor')
    showSection('editor-section', elEditorBtn)

    const elTextInput = document.querySelector('.text-input')
    elTextInput.focus()
    elTextInput.value = ''
    const elColor = document.querySelector('.color-input')
    elColor.value = 'black'
}