'use strict'

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

    const sectionToShow = document.querySelector(`.${sectionClass}`)
    if (sectionToShow) {
        sectionToShow.classList.remove('hidden')
    }

    if (sectionClass === 'gallery-section') {
        const elGalleryButton = document.querySelector('.gallery')
        clickedButton = elGalleryButton
    }

    document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active'))
    if (clickedButton) {
        clickedButton.classList.add('active')
    }
}