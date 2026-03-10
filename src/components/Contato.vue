<script setup>

function submitForm() {
    alert("Mensagem enviada com sucesso!")
}

import Redes from "./Redes.vue"

</script>

<template>
    <section id="contato" class="py-12 md:py-24 px-4 bg-bg-pink" aria-labelledby="contact-title">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-8 md:mb-16">
                <h2 id="contact-title"
                    class="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-4">Entre
                    em Contato</h2>
                <p class="text-xl text-gray-600 mb-4">Como você pode ajudar ou ser ajudado</p>
                <div class="w-20 h-1 bg-secondary mx-auto rounded"></div>
            </div>

            <div class="grid md:grid-cols-2 gap-12">
                <div>
                    <h3 class="font-heading text-2xl font-bold text-secondary mb-6">Informações de Contato</h3>
                    <address class="not-italic space-y-4 mb-8 text-lg">
                        <p>
                            <strong class="block text-secondary">Endereço:</strong>
                            <span id="cms-endereco">Rua Barão de Miracema, 378 Pelinca</span><br>
                            <span id="cms-cidade-estado">Campos dos Goytacazes - RJ</span>
                        </p>
                        <p>
                            <strong class="block text-secondary">Telefone:</strong>
                            <a id="cms-telefone" href="tel:+5522998161158" class="text-secondary hover:underline">(22)
                                99816-1158</a>
                        </p>
                        <p>
                            <strong class="block text-secondary">E-mail:</strong>
                            <a id="cms-email" href="mailto:instsawannaportodos@gmail.com"
                                class="text-secondary hover:underline">
                                instsawannaportodos@gmail.com
                            </a>
                        </p>
                    </address>

                    <div>
                        <h4 class="font-heading font-bold text-lg mb-4">Siga-nos</h4>
                        <Redes />
                    </div>
                </div>

                <form class="bg-white p-8 rounded-3xl shadow-lg" aria-label="Formulário de contato">
                    <h3 class="font-heading text-2xl font-bold text-secondary mb-6">Envie uma mensagem</h3>
                    <div class="space-y-4">
                        <div>
                            <label for="name" class="block font-semibold mb-2">Nome completo</label>
                            <input type="text" id="name" name="name" required aria-required="true"
                                class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-secondary focus:outline-none transition-colors">
                        </div>
                        <div>
                            <label for="email" class="block font-semibold mb-2">E-mail</label>
                            <input type="email" id="email" name="email" required aria-required="true"
                                class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-secondary focus:outline-none transition-colors">
                        </div>
                        <div>
                            <label for="phone" class="block font-semibold mb-2">Telefone</label>
                            <input type="tel" id="phone" name="phone"
                                class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-secondary focus:outline-none transition-colors">
                        </div>
                        <div>
                            <label for="subject" class="block font-semibold mb-2">Assunto</label>
                            <select id="subject" name="subject" required aria-required="true"
                                class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-secondary focus:outline-none transition-colors">
                                <option value="">Selecione um assunto</option>
                                <option value="ajuda">Quero ser voluntário</option>
                                <option value="doacao">Quero fazer uma doação</option>
                                <option value="atendimento">Preciso de atendimento</option>
                                <option value="parceria">Proposta de parceria</option>
                                <option value="outro">Outro</option>
                            </select>
                        </div>
                        <div>
                            <label for="message" class="block font-semibold mb-2">Mensagem</label>
                            <textarea id="message" name="message" rows="5" required aria-required="true"
                                class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-secondary focus:outline-none transition-colors resize-y min-h-32"></textarea>
                        </div>
                        <button type="submit"
                            class="w-full px-8 py-4 bg-secondary text-white font-heading font-semibold rounded-2xl shadow-lg hover:bg-secondary-dark hover:-translate-y-0.5 transition-all duration-200">Enviar
                            Mensagem</button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>