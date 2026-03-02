// services-render.js - ES module for rendering services from CMS data

export function renderServices(servicesData) {
    const container = document.getElementById('services-container');

    if (!container) return;
    
    container.innerHTML = servicesData.map(service => {
        // if the CMS provided an image, show it above the icon
        const imgMarkup = service.image
            ? `<div class="mb-4">
                    <img src="${service.image}" alt="${service.title}" class="mx-auto h-20 w-auto object-contain rounded-lg" />
               </div>`
            : '';

        return `
        <article
            class="group bg-white p-6 rounded-3xl text-center shadow-sm hover:shadow-pink transition-all duration-300 border-t-4 border-transparent hover:border-secondary cursor-pointer"
            data-service-id="${service.id}"
            role="button"
            tabindex="0"
            aria-label="Ver detalhes de ${service.title}"
        >
            ${imgMarkup}
            <div class="w-16 h-16 mx-auto mb-4 bg-bg-soft rounded-full flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                <i class="fa-solid ${service.icon} text-2xl text-secondary group-hover:text-white"></i>
            </div>
            <h3 class="font-heading text-secondary font-bold mb-2">${service.title}</h3>
            <p class="text-gray-600 text-sm line-clamp-2">${service.shortDesc}</p>
            <div class="mt-4 text-secondary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                Clique para saber mais →
            </div>
        </article>
    `;
    }).join('');
    
    container.querySelectorAll('article').forEach(card => {
        card.addEventListener('click', () => {
            const serviceId = card.getAttribute('data-service-id');
            openService(servicesData, serviceId);
        });
        
        // Suporte a teclado (Enter/Space)
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const serviceId = card.getAttribute('data-service-id');
                openService(servicesData, serviceId);
            }
        });
    });
}

// Abre modal com detalhes
function openService(servicesData, serviceId) {
    const service = servicesData.find(s => s.id === serviceId);
    if (!service) return;
    
    const modal = document.getElementById('service-modal');
    const content = document.getElementById('modal-content');
    
    if (!modal || !content) return;
    
    // image banner if available
    const banner = service.image
        ? `<div class="h-48 bg-cover bg-center rounded-t-3xl relative overflow-hidden" style="background-image:url('${service.image}')">
                <div class="absolute inset-0 bg-black/40"></div>
            </div>`
        : `<div class="h-48 bg-gradient-to-br from-primary to-secondary rounded-t-3xl flex items-center justify-center relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <i class="fa-solid ${service.icon} text-6xl text-white/90 relative z-10 drop-shadow-lg"></i>
            </div>`;

    content.innerHTML = `
        <div class="relative">
            ${banner}
            <button onclick="closeModal()" class="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors z-20">
                <i class="fa-solid fa-xmark text-xl"></i>
            </button>
            <div class="p-8">
                <h3 class="font-heading text-3xl font-bold text-primary mb-4">${service.title}</h3>
                <p class="text-lg text-gray-700 mb-6 leading-relaxed">${service.fullDesc}</p>
                <h4 class="font-heading font-bold text-secondary mb-3">O que oferecemos:</h4>
                <ul class="space-y-2 mb-6">
                    ${service.details.map(detail => `
                        <li class="flex items-start gap-3">
                            <i class="fa-solid fa-check-circle text-secondary mt-1"></i>
                            <span>${detail}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    requestAnimationFrame(() => {
        content.classList.remove('scale-95', 'opacity-0');
        content.classList.add('scale-100', 'opacity-100');
    });
}

function closeModal() {
    const modal = document.getElementById('service-modal');
    const content = document.getElementById('modal-content');
    
    content.classList.remove('scale-100', 'opacity-100');
    content.classList.add('scale-95', 'opacity-0');
    
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }, 300);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

window.closeModal = closeModal;