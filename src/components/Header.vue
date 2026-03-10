<template>
  <header class="bg-gradient-to-br from-primary to-primary-light pt-4">
    <div class="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center relative z-10">
      <img src="/logo.png" class="h-22 w-auto">
      <nav aria-label="Navegação principal">
        <button @click="toggleMenu" class="lg:hidden bg-transparent border-none cursor-pointer"
          :aria-expanded="menuOpen" aria-controls="nav-menu">
          <span class="block w-6 h-0.5 bg-white mb-1.5"></span>
          <span class="block w-6 h-0.5 bg-white mb-1.5"></span>
          <span class="block w-6 h-0.5 bg-white"></span>
        </button>
      </nav>

      <ul id="nav-menu"
        :class="['hidden lg:flex gap-8 items-center absolute lg:static top-20 left-0 right-0 bg-white lg:bg-transparent flex-col lg:flex-row p-6 lg:p-0 shadow-lg lg:shadow-none z-50', { '!flex': menuOpen }]">
        <li><a href="#missao" @click="closeMenu"
            class="font-heading font-semibold text-xs md:text-sm uppercase tracking-wider text-gray-800 lg:text-white/90 lg:hover:text-white hover:text-primary lg:hover:text-white relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary-light hover:after:w-full after:transition-all duration-300">
            Nossa Missão
          </a></li>

        <li><a href="#historia" @click="closeMenu"
            class="font-heading font-semibold text-xs md:text-sm uppercase tracking-wider text-gray-800 lg:text-white/90 lg:hover:text-white hover:text-primary lg:hover:text-white relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary-light hover:after:w-full after:transition-all duration-300">
            Nossa História
          </a></li>
        <li><a href="#servicos" @click="closeMenu"
            class="font-heading font-semibold text-xs md:text-sm uppercase tracking-wider text-gray-800 lg:text-white/90 lg:hover:text-white hover:text-primary lg:hover:text-white relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary-light hover:after:w-full after:transition-all duration-300">
            Serviços
          </a></li>
        <li><a href="#galeria" @click="closeMenu"
            class="font-heading font-semibold text-xs md:text-sm uppercase tracking-wider text-gray-800 lg:text-white/90 lg:hover:text-white hover:text-primary lg:hover:text-white relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary-light hover:after:w-full after:transition-all duration-300">
            Galeria
          </a></li>
        <li><a href="#transparencia" @click="closeMenu"
            class="font-heading font-semibold text-xs md:text-sm uppercase tracking-wider text-gray-800 lg:text-white/90 lg:hover:text-white hover:text-primary lg:hover:text-white relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary-light hover:after:w-full after:transition-all duration-300">
            Balanço e Balancetes
          </a></li>
        <Redes />
      </ul>
    </div>
    <Hero />
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import Redes from "./Redes.vue"
import Hero from "./Hero.vue"

const menuOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

function handleClickOutside(e: MouseEvent) {
  const header = document.querySelector('header')
  if (header && !header.contains(e.target as Node) && menuOpen.value) {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>