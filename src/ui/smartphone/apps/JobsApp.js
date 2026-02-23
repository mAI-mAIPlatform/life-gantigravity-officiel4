/**
 * Jobs App : Liste des missions et quêtes.
 */
export class JobsApp {
    render() {
        return `
            <div class="space-y-3">
                ${this.renderJob('Livreur Urbain', 'Livre 3 colis dans le District Core', '💰 500 m\'s', '🔥 Difficile')}
                ${this.renderJob('Testeur de Drift', 'Atteint 500pts de drift', '💰 200 m\'s', '🟢 Facile')}
                ${this.renderJob('Maintenance Néon', 'Répare les enseignes du centre', '💰 800 m\'s', '🟠 Moyen')}
                ${this.renderJob('Hack de Drone', 'Détourne un drone de sécurité', '💰 1,500 m\'s', '💀 Expert')}
            </div>
        `;
    }

    renderJob(title, desc, reward, difficulty) {
        return `
            <div class="p-4 bg-white/10 rounded-2xl border border-white/10 hover:bg-white/20 transition-colors cursor-pointer group">
                <div class="flex justify-between items-start mb-2">
                    <span class="text-xs font-bold uppercase">${title}</span>
                    <span class="text-[8px] text-white/40">${difficulty}</span>
                </div>
                <p class="text-[10px] text-white/70 mb-3">${desc}</p>
                <div class="text-[10px] font-bold text-green-400">${reward}</div>
            </div>
        `;
    }
}
