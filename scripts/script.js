// ==========================================
// INSTITUTO SAWANNA - SCRIPT.JS (Tailwind)
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const header = document.querySelector('header');
    
    if (navToggle && navMenu) {
        // Toggle menu
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('hidden');
        });
        
        // Fechar menu ao clicar em um link
        const navLinks = document.querySelectorAll('#nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 1024) {
                    navMenu.classList.add('hidden');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', function(e) {
            if (!header.contains(e.target) && !navMenu.classList.contains('hidden')) {
                navMenu.classList.add('hidden');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
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