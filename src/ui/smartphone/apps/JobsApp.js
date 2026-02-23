/**
 * Jobs App : Liste des missions et quêtes.
 */
export class JobsApp {
    render() {
        return `
            <div class="space-y-3">
                <div class="text-[10px] font-bold text-accent italic mb-2">MISSIONS DISPONIBLES</div>
                ${this.renderJob('Le Sentier de Néon', 'Chapitre 1', 'Kael')}
                ${this.renderJob('Coupure de Courant', 'Chapitre 2', 'Sora')}
                ${this.renderJob('Contrebande', 'Chapitre 3', 'Silas')}
            </div>
        `;
    }

    renderJob(title, desc, contact) {
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
