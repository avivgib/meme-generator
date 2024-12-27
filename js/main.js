'use strict'

function onInit() {
    renderGallery()
    showSection('gallery-section', document.querySelector('[data-section="gallery-section"]'));
}

function showSection(sectionClass, clickedButton) {
    document.querySelectorAll('section').forEach(section => section.classList.add('hidden'))
    document.querySelector(`.${sectionClass}`).classList.remove('hidden')
    
    document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active'))
    if (clickedButton) {
        clickedButton.classList.add('active')
    }
}