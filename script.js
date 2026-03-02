// ==========================================
// INSTITUTO SAWANNA - SCRIPT.JS (Tailwind)
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('hidden');
            navMenu.classList.toggle('flex');
            navMenu.classList.toggle('flex-col');
            navMenu.classList.toggle('absolute');
            navMenu.classList.toggle('top-20');
            navMenu.classList.toggle('left-0');
            navMenu.classList.toggle('right-0');
            navMenu.classList.toggle('bg-white');
            navMenu.classList.toggle('p-6');
            navMenu.classList.toggle('shadow-lg');
        });
    }
    
    // Fechar menu ao clicar em um link (mobile)
    const navLinks = document.querySelectorAll('#nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 1024) {
                navMenu.classList.add('hidden');
                navMenu.classList.remove('flex', 'flex-col', 'absolute', 'top-20', 'left-0', 'right-0', 'bg-white', 'p-6', 'shadow-lg');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
    
    // Carrossel
    let currentSlide = 0;
    const track = document.getElementById('carousel-track');
    const indicators = document.querySelectorAll('[role="tablist"] button');
    const totalSlides = 5;
    
    function updateCarousel() {
        if (track) {
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        
        // Atualizar indicadores
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.remove('bg-gray-400');
                indicator.classList.add('bg-primary');
            } else {
                indicator.classList.add('bg-gray-400');
                indicator.classList.remove('bg-primary');
            }
            indicator.setAttribute('aria-selected', index === currentSlide);
        });
    }
    
    window.moveCarousel = function(direction) {
        currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
        updateCarousel();
    };
    
    window.goToSlide = function(index) {
        currentSlide = index;
        updateCarousel();
    };
    
    // Auto-play do carrossel
    setInterval(() => {
        moveCarousel(1);
    }, 5000);
    
    // Validação do formulário
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            this.reset();
        });
    }
});