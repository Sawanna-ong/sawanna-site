<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import ServiceCard from "./ServiceCard.vue"

interface Service {
  id: string
  title: string
  icon?: string
  image?: string
  shortDesc?: string
  fullDesc?: string
  details?: string[]
}

// carrega todos os json da pasta
const modules = import.meta.glob("../data/servicos/*.json", {
  eager: true
})

// transforma em array
const services: Service[] = Object.values(modules).map(m => (m as { default: Service }).default)

const selectedService = ref<Service | null>(null)

function openService(id: string) {
  const svc = services.find(s => s.id === id)
  if (svc) {
    selectedService.value = svc
    // trigger animation reset
    nextTick(() => {
      const content = document.getElementById('modal-content')
      if (content) {
        content.classList.remove('scale-95', 'opacity-0')
        content.classList.add('scale-100', 'opacity-100')
      }
    })
  }
}

function closeService() {
  const content = document.getElementById('modal-content')
  if (content) {
    content.classList.remove('scale-100', 'opacity-100')
    content.classList.add('scale-95', 'opacity-0')
  }
  setTimeout(() => {
    selectedService.value = null
  }, 300)
}

function handleEscape(e: KeyboardEvent) {
  if (e.key === 'Escape') closeService()
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})
onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>

<template>
    <section id="servicos" class="py-12 md:py-24 px-4">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-12">
                <h2 class="font-heading text-4xl font-bold text-secondary">
                    Nossos Serviços
                </h2>
            </div>
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                <ServiceCard
                    v-for="service in services"
                    :key="service.id"
                    :service="service"
                    @select="openService"
                />
            </div>
        </div>
    </section>

    <!-- modal -->
    <div
        v-if="selectedService"
        id="service-modal"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
        <div
            id="modal-content"
            class="bg-white rounded-3xl max-w-3xl w-full transform transition-all scale-95 opacity-0"
        >
            <div class="relative">
                <div
                    v-if="selectedService.image"
                    class="h-48 bg-cover bg-center rounded-t-3xl relative overflow-hidden"
                    :style="{ backgroundImage: `url('${selectedService.image}')` }"
                >
                    <div class="absolute inset-0 bg-black/40"></div>
                </div>
                <div
                    v-else
                    class="h-48 bg-gradient-to-br from-secondary to-secondary-light rounded-t-3xl flex items-center justify-center relative overflow-hidden"
                >
                    <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <i
                        :class="`fa-solid ${selectedService.icon || ''}`"
                        class="text-6xl text-white/90 relative z-10 drop-shadow-lg"
                    ></i>
                </div>
                <button
                    @click="closeService"
                    class="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors z-20"
                >
                    <i class="fa-solid fa-xmark text-xl"></i>
                </button>
                <div class="p-8">
                    <h3 class="font-heading text-3xl font-bold text-secondary mb-4">
                        {{ selectedService.title }}
                    </h3>
                    <p class="text-lg text-gray-700 mb-6 leading-relaxed">
                        {{ selectedService.fullDesc }}
                    </p>
                    <h4 class="font-heading font-bold text-secondary mb-3">
                        O que oferecemos:
                    </h4>
                    <ul class="space-y-2 mb-6">
                        <li
                            v-for="detail in selectedService.details"
                            :key="detail"
                            class="flex items-start gap-3"
                        >
                            <i class="fa-solid fa-check-circle text-secondary mt-1"></i>
                            <span>{{ detail }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>