<template>
  <section class="relative flex items-center justify-center text-center text-white pb-5 md:pl-40 mt-10 md:mt-0"
    aria-labelledby="hero-title">
    <div class="absolute bottom-0 left-0 md:left-30 z-1 pointer-events-none translate-y-[20px] md:translate-y-[50px]">
      <img src="/sawanna.png" class="h-[clamp(200px,20vh,300px)] md:h-[clamp(400px,50vh,500px)] object-contain" />
    </div>
    <div class="z-10 max-w-3xl ml-50">
      <div class="flex justify-center items-center gap-4 mb-6 hidden md:flex">
        <img src="/logo3.png" class="w-32 h-32 md:w-64 md:h-64" />
        <h1 id="hero-title" class="font-heading text-4xl md:text-8xl font-bold mb-4">
          Instituto Sawanna
        </h1>
      </div>
      <p class="text-xl md:text-2xl mb-10 opacity-90 leading-relaxed">
        Acolhimento, amor e atendimento multidisciplinar gratuito para crianças e famílias em tratamento.
      </p>
    </div>
    <!-- Onda decorativa -->
    <div class="absolute bottom-0 left-0 w-full leading-none translate-y-[1px]">
      <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
        class="w-full h-16 sm:h-20 md:h-24 lg:h-28 block">
        <path
          d="M0 120L48 114C96 108 192 96 288 90C384 84 480 84 576 88C672 92 768 100 864 104C960 108 1056 108 1152 104C1248 100 1344 92 1392 88L1440 84V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
          fill="white" />
      </svg>
    </div>
  </section>
</template>