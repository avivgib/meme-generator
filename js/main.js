'use strict'

document.addEventListener('DOMContentLoaded', () => {
    onInit();
})

function onInit() {
    renderGallery()
    const galleryButton = document.querySelector('.gallery')

    if (galleryButton) {
        galleryButton.classList.add('active')
        showSection('gallery-section', galleryButton)
    }
}

function showSection(sectionClass, clickedButton) {
    document.querySelectorAll('section').forEach(section => section.classList.add('hidden'))
    // document.querySelector(`.${sectionClass}`).classList.remove('hidden')
    
    const sectionToShow = document.querySelector(`.${sectionClass}`)
    if (sectionToShow) {
        sectionToShow.classList.remove('hidden')
    }

    document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active'))
    if (clickedButton) {
        clickedButton.classList.add('active')
    }
}