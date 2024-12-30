'use strict'

function renderGallery() {
    const gallery = document.querySelector('.gallery-container')
    const images = getImgs() 

    const strHtml = images.map((img) =>  `
        <img src="${img.url}" alt="Meme Image" onclick="onImageSelect(${img.id})">
        `).join('')

    gallery.innerHTML = strHtml
}

function onImageSelect(imgId) {
    const selectedImage = gImgs.find((img) => img.id === imgId)
    
    if (selectedImage) {
        const imgUrl = selectedImage.url
        initCanvas(imgUrl)
    }

    const elEditorBtn = document.querySelector('.editor')
    showSection('editor-section', elEditorBtn)
    focusAndCleanTextInput()
}