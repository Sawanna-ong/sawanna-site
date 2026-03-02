// main.js
import './input.css'

// pega todas as imagens separadas por pasta
const galleryLines = {
    line1: import.meta.glob('/public/gallery/line1/*.{png,jpg,jpeg}', { eager: true }),
    line2: import.meta.glob('/public/gallery/line2/*.{png,jpg,jpeg}', { eager: true }),
    line3: import.meta.glob('/public/gallery/line3/*.{png,jpg,jpeg}', { eager: true }),
}

const container = document.getElementById("gallery-container")

Object.entries(galleryLines).forEach(([folderName, images], index) => {

    console.log(`Renderizando ${folderName} com ${Object.keys(images).length} imagens`)

    const wrapper = document.createElement("div")
    wrapper.className = "carousel-wrapper"

    const track = document.createElement("div")
    track.className = "carousel-track"

    // alterna direção automaticamente
    if (index % 2 !== 0) {
        track.classList.add("reverse")
    }

    const imagePaths = Object.values(images).map(img => img.default)

    // duplica para loop infinito
    const duplicated = [...imagePaths, ...imagePaths]

    duplicated.forEach(src => {
        const img = document.createElement("img")
        img.src = src
        img.className = "carousel-img"
        track.appendChild(img)
    })

    wrapper.appendChild(track)
    container.appendChild(wrapper)
})