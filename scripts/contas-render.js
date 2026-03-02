// =====================================================
// contas-render.js - Renderiza dados de contas
// =====================================================

export function renderContas(bancosPatrimoniais, balancetes) {
    const container = document.getElementById('contas-container');
    if (!container) return;

    // Ordenar por ano (descendente)
    const anosOrdenados = new Set([
        ...bancosPatrimoniais.map(b => b.year),
        ...balancetes.map(b => b.year)
    ]);
    const anos = Array.from(anosOrdenados).sort((a, b) => b - a);

    // Gerar HTML para cada ano
    const html = anos.map(ano => {
        const balanco = bancosPatrimoniais.find(b => b.year === ano);
        const balancete = balancetes.find(b => b.year === ano);

        return `
            <article class="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <span class="inline-block bg-secondary text-white px-4 py-1 rounded-lg font-bold text-sm mb-4">${ano}</span>
                <h3 class="font-heading text-xl font-bold text-gray-800 mb-4">Contas ${ano}</h3>
                <ul class="space-y-3">
                    ${balanco ? `
                    <li>
                        <a href="${balanco.pdf}" target="_blank"
                            class="flex items-center gap-2 p-3 bg-bg-pink rounded-lg hover:bg-bg-soft transition-colors duration-200">
                            <i class="fa-solid fa-scale-balanced text-xl text-secondary"></i>
                            <span>Balanço Patrimonial (PDF)</span>
                        </a>
                    </li>
                    ` : ''}
                    ${balancete ? `
                    <li>
                        <a href="${balancete.pdf}" target="_blank"
                            class="flex items-center gap-2 p-3 bg-bg-pink rounded-lg hover:bg-bg-soft transition-colors duration-200">
                            <i class="fa-solid fa-receipt text-xl text-secondary"></i>
                            <span>Balancete (PDF)</span>
                        </a>
                    </li>
                    ` : ''}
                </ul>
            </article>
        `;
    }).join('');

    container.innerHTML = html;
}
