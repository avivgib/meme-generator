'use strict'

function renderGallery() {
    const gallery = document.querySelector('.gallery-container')
    const images = getImgs() 

    const strHtml = images.map((img) =>  `
        <img src="${img.url}" alt="Meme Image" onclick="onImgSelect(${img.id})">
        `).join('')

        gallery.innerHTML = strHtml
}