// main.js
import './input.css'
import { renderServices } from './services-render.js'

// =============================================
// 1. Carrega dados dos serviços do CMS (content/servicos/*.json)
// =============================================
const serviceModules = import.meta.glob('/content/servicos/*.json', { eager: true })
const servicesData = Object.values(serviceModules).map(mod => mod.default)

// =============================================
// 2. Carrega configurações do CMS
// =============================================
import contatoData from '/content/configuracoes/contato.json'
import geralData from '/content/configuracoes/geral.json'

// =============================================
// 3. Galeria - carrega imagens por pasta
// ============================================= 
const galleryLines = {
    line1: import.meta.glob('/public/gallery/line1/*.{png,jpg,jpeg}', { eager: true }),
    line2: import.meta.glob('/public/gallery/line2/*.{png,jpg,jpeg}', { eager: true }),
    line3: import.meta.glob('/public/gallery/line3/*.{png,jpg,jpeg}', { eager: true }),
}

// =============================================
// Inicialização quando DOM estiver pronto
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    // Renderiza serviços do CMS
    renderServices(servicesData)

    // Injeta dados gerais do CMS
    injectGeralData(geralData)

    // Injeta dados de contato do CMS
    injectContatoData(contatoData)
    // Renderiza galeria
    renderGallery()
})

// =============================================
// Injeta dados gerais (missão, história, CNPJ, etc.)
// =============================================
function injectGeralData(data) {
    // Hero subtítulo
    const heroSubtitulo = document.getElementById('cms-hero-subtitulo')
    if (heroSubtitulo) heroSubtitulo.textContent = data.heroSubtitulo || ''

    // Missão
    const missaoTexto = document.getElementById('cms-missao-texto')
    if (missaoTexto) missaoTexto.textContent = data.missao || ''

    const missaoComplemento1 = document.getElementById('cms-missao-complemento1')
    if (missaoComplemento1) missaoComplemento1.innerHTML = data.missaoComplemento1 || ''

    const missaoComplemento2 = document.getElementById('cms-missao-complemento2')
    if (missaoComplemento2) missaoComplemento2.innerHTML = data.missaoComplemento2 || ''

    // História
    const historiaDestaque = document.getElementById('cms-historia-destaque')
    if (historiaDestaque) historiaDestaque.innerHTML = data.historia || ''

    const historiaTexto = document.getElementById('cms-historia-texto')
    if (historiaTexto && data.historiaTexto) {
        const paragraphs = data.historiaTexto.split('\n\n')
        historiaTexto.innerHTML = paragraphs.map(p => `<p>${p.trim()}</p>`).join('')
    }

    const historiaCitacao = document.getElementById('cms-historia-citacao')
    if (historiaCitacao) historiaCitacao.textContent = `"${data.historiaCitacao || ''}"`

    // CNPJ no footer
    const cnpjEl = document.getElementById('cms-cnpj')
    if (cnpjEl) cnpjEl.textContent = `CNPJ: ${data.cnpj || 'XX.XXX.XXX/0001-XX'}`
}

// =============================================
// Injeta dados de contato
// =============================================
function injectContatoData(data) {
    // Endereço
    const endereco = document.getElementById('cms-endereco')
    if (endereco) endereco.textContent = data.endereco || '[Inserir endereço completo]'

    const cidadeEstado = document.getElementById('cms-cidade-estado')
    if (cidadeEstado) cidadeEstado.textContent = data.cidadeEstadoCep || '[Cidade - Estado, CEP]'

    // Telefone
    const telefone = document.getElementById('cms-telefone')
    if (telefone) {
        telefone.textContent = data.telefone || '(XX) XXXXX-XXXX'
        const tel = data.telefone ? data.telefone.replace(/\D/g, '') : ''
        if (tel) telefone.href = `tel:+55${tel}`
    }

    // E-mail
    const email = document.getElementById('cms-email')
    if (email) {
        email.textContent = data.email || '[Inserir email aqui]'
        if (data.email) email.href = `mailto:${data.email}`
    }

    // Redes sociais
    updateSocialLinks('cms-social-header', data)
    updateSocialLinks('cms-social-contato', data)
}

function updateSocialLinks(containerId, data) {
    const container = document.getElementById(containerId)
    if (!container) return

    const fbLink = container.querySelector('[data-social="facebook"]')
    const igLink = container.querySelector('[data-social="instagram"]')
    const waLink = container.querySelector('[data-social="whatsapp"]')

    if (fbLink && data.facebook) fbLink.href = data.facebook
    if (igLink && data.instagram) igLink.href = data.instagram
    if (waLink && data.whatsapp) waLink.href = data.whatsapp
}

// =============================================
// Renderiza galeria com carrosséis
// =============================================
function renderGallery() {
    const container = document.getElementById('gallery-container')
    if (!container) return

    Object.entries(galleryLines).forEach(([folderName, images], index) => {
        const wrapper = document.createElement('div')
        wrapper.className = 'carousel-wrapper'

        const track = document.createElement('div')
        track.className = 'carousel-track'

        if (index % 2 !== 0) {
            track.classList.add('reverse')
        }

        const imagePaths = Object.values(images).map(img => img.default)
        const duplicated = [...imagePaths, ...imagePaths]

        duplicated.forEach(src => {
            const img = document.createElement('img')
            img.src = src
            img.className = 'carousel-img'
            track.appendChild(img)
        })

        wrapper.appendChild(track)
        container.appendChild(wrapper)
    })
} 