/**
 * News App : Actualités de NeoCity.
 */
export class NewsApp {
    render() {
        return `
            <div class="flex flex-col gap-4">
                <div class="rounded-xl overflow-hidden border border-white/10">
                    <div class="h-24 bg-gradient-to-tr from-orange-500 to-red-600"></div>
                    <div class="p-3 bg-white/5">
                        <h3 class="text-[11px] font-bold mb-1">ALERTE : Record de Drift au District Core</h3>
                        <p class="text-[9px] text-white/60">Un pilote inconnu a atteint un score phénoménal hier soir...</p>
                    </div>
                </div>

                <div class="p-3 bg-white/5 rounded-xl border border-white/10">
                    <h3 class="text-[11px] font-bold mb-1">Économie : Le m's en hausse</h3>
                    <p class="text-[9px] text-white/60">La valeur de la monnaie locale explose suite à l'extension...</p>
                </div>

                <div class="p-3 bg-white/5 rounded-xl border border-white/10">
                    <h3 class="text-[11px] font-bold mb-1">MÉNI-QUIZ : Gagnez des récompenses</h3>
                    <p class="text-[9px] text-white/60">Participez au grand quiz NeoCity ce weekend.</p>
                </div>
            </div>
        `;
    }
}
