'use strict'

function onInit() {
    renderGallery()
    showSection('gallery-section')
}

function showSection(sectionClass) {
    document.querySelectorAll('section').forEach(section => section.classList.add('hidden'))
    document.querySelector(`.${sectionClass}`).classList.remove('hidden')
}