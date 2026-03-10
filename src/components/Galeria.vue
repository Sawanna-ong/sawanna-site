<script setup lang="ts">
// continuous scrolling carousel like index.html script
const modules = import.meta.glob("../assets/gallery/*.{jpg,png,jpeg,webp}", {
  eager: true,
  import: "default"
})

const images: string[] = Object.values(modules) as string[]

const totalImages = images.length
const imagesPerLine = Math.ceil(totalImages / 3)
const lines = [
  images.slice(0, imagesPerLine),
  images.slice(imagesPerLine, imagesPerLine * 2),
  images.slice(imagesPerLine * 2)
]
</script>

<template>
  <section id="galeria" class="py-12 md:py-24 px-4 bg-bg-pink overflow-hidden">

    <div class="text-center mb-8 md:mb-16">
      <h2 class="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-4">
        Nossa Galeria
      </h2>

      <p class="text-xl text-gray-600 mb-4">
        Momentos de amor e esperança
      </p>

      <div class="w-20 h-1 bg-secondary mx-auto rounded"></div>
    </div>

    <div class="mx-auto">
      <!-- three-line continuous carousel -->
      <div
        v-for="(lineImages, idx) in lines"
        :key="idx"
        class="carousel-wrapper mb-6"
      >
        <div :class="['carousel-track', { reverse: idx % 2 !== 0 }]">
          <img
            v-for="(src, j) in [...lineImages, ...lineImages]"
            :key="`${idx}-${j}`"
            :src="src"
            class="carousel-img"
          />
        </div>
      </div>
    </div>

  </section>
</template>