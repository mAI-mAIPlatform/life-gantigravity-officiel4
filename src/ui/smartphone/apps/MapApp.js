/**
 * Map App : Carte interactive simplifiée.
 */
export class MapApp {
    render() {
        return `
            <div class="h-64 bg-white/5 rounded-2xl border border-white/10 overflow-hidden relative mb-4">
                <!-- Simulation d'un radar/map -->
                <div class="absolute inset-0 flex items-center justify-center">
                    <div class="w-48 h-48 border border-white/10 rounded-full animate-ping opacity-20"></div>
                </div>
                <div class="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-10">
                    <div class="border border-white/20"></div><div class="border border-white/20"></div><div class="border border-white/20"></div><div class="border border-white/20"></div>
                    <div class="border border-white/20"></div><div class="border border-white/20"></div><div class="border border-white/20"></div><div class="border border-white/20"></div>
                </div>
                <!-- Player Marker -->
            <div class="h-64 bg-white/5 rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center">
                <div class="text-[10px] text-white/20 uppercase tracking-widest italic text-center px-4">Système de Géo-Localisation NeoCity</div>
                
                <div class="absolute bottom-2 right-2 flex flex-col gap-1">
                    <div class="flex items-center gap-2">
                        <div class="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                        <span class="text-[8px] text-white/60">Position Actuelle</span>
                    </div>
                </div>
            </div>

            <div class="space-y-3">
                <div class="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                    <span class="text-xl">📍</span>
                    <div>
                        <div class="text-[10px] font-bold">District Core</div>
                        <div class="text-[8px] text-white/40">Vous êtes ici</div>
                    </div>
                </div>
                <div class="flex items-center gap-3 p-3 bg-white/5 rounded-xl opacity-50">
                    <span class="text-xl">🛠️</span>
                    <div>
                        <div class="text-[10px] font-bold">Quartier de Test</div>
                        <div class="text-[8px] text-white/40">500m - Nord-Est</div>
                    </div>
                </div>
            </div>
        `;
    }
}
