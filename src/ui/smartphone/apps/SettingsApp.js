/**
 * Settings App : Configuration du smartphone.
 */
export class SettingsApp {
    render() {
        return `
            <div class="space-y-6">
                <!-- Profil -->
                <div class="flex items-center gap-4 p-4 bg-white/10 rounded-2xl border border-white/10">
                    <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl">👤</div>
                    <div>
                        <div class="text-sm font-bold">NeoPlayer_01</div>
                        <div class="text-[8px] text-white/40">ID: 8DE-AC1-EA</div>
                    </div>
                </div>

                <!-- Liste options -->
                <div class="space-y-1">
                    ${this.renderOption('Mode Avion', 'Néant', '✈️')}
                    ${this.renderOption('Wi-Fi', 'Connecté', '📡')}
                    ${this.renderOption('Bluetooth', 'Oui', '⚡')}
                    ${this.renderOption('Luminosité', '100%', '☀️')}
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
