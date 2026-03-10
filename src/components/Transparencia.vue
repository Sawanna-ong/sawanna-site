<script setup lang="ts">
import { computed } from 'vue'

const modules = import.meta.glob("../data/contas/*.json", {
    eager: true
})

// transformar em array e ordenar por ano descendente
interface Conta {
    year: number
    balanco?: string
    balancete?: string
    pdf?: string // manter compatibilidade se presente
}

const contasRaw: Conta[] = Object.values(modules).map(m => (m as any).default)
const contas = computed(() => {
    return [...contasRaw].sort((a, b) => b.year - a.year)
})
</script>

<template>
    <section id="transparencia" class="py-12 md:py-24 px-4" aria-labelledby="transparency-title">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-8 md:mb-16">
                <h2 id="transparency-title"
                    class="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-4">
                    Prestação de Contas</h2>
                <p class="text-xl text-gray-600 mb-4">Transparência é o nosso compromisso</p>
                <div class="w-20 h-1 bg-secondary mx-auto rounded"></div>
            </div>

            <div class="max-w-3xl mx-auto text-center mb-12">
                <p class="text-xl text-gray-600">Como organização sem fins lucrativos, acreditamos que a confiança é
                    construída através da transparência total na gestão dos recursos.</p>
            </div>

            <h3 class="font-heading text-2xl font-bold text-secondary mb-8 text-center">Demonstrações Contábeis</h3>
            <div class="grid md:grid-cols-3 gap-8">

                <article v-for="conta in contas" :key="conta.year"
                    class="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <span class="inline-block bg-secondary text-white px-4 py-1 rounded-lg font-bold text-sm mb-4">
                        {{ conta.year }}
                    </span>
                    <h3 class="font-heading text-xl font-bold text-gray-800 mb-4">Contas {{ conta.year }}</h3>
                    <ul class="space-y-3">
                        <li v-if="conta.balanco">
                            <a :href="conta.balanco" target="_blank"
                                class="flex items-center gap-2 p-3 bg-bg-pink rounded-lg hover:bg-bg-soft transition-colors duration-200">
                                <i class="fa-solid fa-scale-balanced text-xl text-secondary"></i>
                                <span>Balanço Patrimonial (PDF)</span>
                            </a>
                        </li>
                        <li v-if="conta.balancete">
                            <a :href="conta.balancete" target="_blank"
                                class="flex items-center gap-2 p-3 bg-bg-pink rounded-lg hover:bg-bg-soft transition-colors duration-200">
                                <i class="fa-solid fa-receipt text-xl text-secondary"></i>
                                <span>Balancete (PDF)</span>
                            </a>
                        </li>
                    </ul>
                </article>
            </div>
        </div>
    </section>
</template>