<script setup lang="ts">
import type { PropType } from 'vue'

interface Service {
  id: string
  title: string
  icon?: string
  image?: string
  shortDesc?: string
  // additional fields not needed here
}

const props = defineProps({
  service: {
    type: Object as PropType<Service>,
    required: true
  }
})

const emit = defineEmits<{
  (e: 'select', id: string): void
}>()

function handleClick() {
  emit('select', props.service.id)
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    handleClick()
  }
}
</script>

<template>
  <article
    class="group bg-white p-6 rounded-3xl text-center shadow-sm hover:shadow-pink transition-all duration-300 border-t-4 border-transparent hover:border-secondary cursor-pointer"
    :data-service-id="service.id"
    role="button"
    tabindex="0"
    :aria-label="`Ver detalhes de ${service.title}`"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <div v-if="service.image" class="mb-4">
      <img
        :src="service.image"
        :alt="service.title"
        class="mx-auto h-20 w-auto object-contain rounded-lg"
      />
    </div>
    <div
      class="w-16 h-16 mx-auto mb-4 bg-bg-soft rounded-full flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors duration-300"
    >
      <i :class="`fa-solid ${service.icon || ''}`" class="text-2xl text-secondary group-hover:text-white"></i>
    </div>
    <h3 class="font-heading text-secondary font-bold mb-2">{{ service.title }}</h3>
    <p class="text-gray-600 text-sm line-clamp-2">{{ service.shortDesc }}</p>
    <div class="mt-4 text-secondary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
      Clique para saber mais →
    </div>
  </article>
</template>