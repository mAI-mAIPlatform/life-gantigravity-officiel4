/**
 * Settings App : Configuration du smartphone.
 */
export class SettingsApp {
    render() {
        return `
            <div class="space-y-4">
                <div class="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div class="text-[8px] text-white/40 uppercase mb-3">Compte Utilisateur</div>
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-xl">👤</div>
                        <div>
                            <div class="text-xs font-bold text-white">Citoyen #742</div>
                            <div class="text-[8px] text-accent font-black uppercase tracking-widest">Niveau 1</div>
                        </div>
                    </div>
                </div>

                <div class="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div class="text-[8px] text-white/40 uppercase mb-3">Préférences Système</div>
                    ${this.renderToggle('Notifications', true)}
                    ${this.renderToggle('Mode Sombre', true)}
                    ${this.renderToggle('Son Spatial', false)}
                </div>

                <div class="mt-10 p-4 border border-red-500/30 rounded-xl text-center cursor-pointer hover:bg-red-500/10 transition-colors">
                    <span class="text-[10px] text-red-500 font-bold uppercase">Réinitialiser le téléphone</span>
                </div>
            </div>
        `;
    }

    renderOption(label, value, icon) {
        return `
            <div class="flex justify-between items-center p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
                <div class="flex items-center gap-3">
                    <span class="text-lg">${icon}</span>
                    <span class="text-xs text-white/80">${label}</span>
                </div>
                <span class="text-[10px] text-white/30">${value}</span>
            </div>
        `;
    }
}
