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
                <div class="absolute top-1/2 left-1/2 w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_red]"></div>
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
