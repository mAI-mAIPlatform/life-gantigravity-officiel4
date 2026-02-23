/**
 * Vibs App : Réseau social et système de followers.
 */
export class VibsApp {
    constructor() {
        this.followers = Math.floor(Math.random() * 50);
        this.lastFollowerTime = Date.now();
    }

    render() {
        return `
            <div class="flex flex-col gap-4">
                <div class="flex items-center justify-between p-4 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-2xl border border-white/10">
                    <div>
                        <div class="text-xs font-black text-white italic">VIBS</div>
                        <div class="text-[8px] text-white/50 uppercase tracking-widest">Abonnés</div>
                    </div>
                    <div class="text-2xl font-black text-white" id="vibs-followers">${this.followers}</div>
                </div>
                <div class="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div>
                        <div class="text-xs font-black text-white italic">POSTS</div>
                        <div class="text-[8px] text-white/50 uppercase tracking-widest">Publiés</div>
                    </div>
                    <div class="text-2xl font-black text-white">12</div>
                </div>
            </div>

            <div class="space-y-4">
                <div class="bg-white/10 p-3 rounded-xl">
                    <div class="flex items-center gap-2 mb-2">
                        <div class="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-purple-500"></div>
                        <span class="text-[10px] font-bold">Neo_Citizen_01</span>
                    </div>
                    <div class="text-[11px] text-white/80">"Le District Core est incroyable ce soir ! #Life #NeonCity"</div>
                </div>
                <div class="bg-white/10 p-3 rounded-xl opacity-60">
                    <div class="flex items-center gap-2 mb-2">
                        <div class="w-6 h-6 rounded-full bg-blue-500"></div>
                        <span class="text-[10px] font-bold">Drone_Racer</span>
                    </div>
                    <div class="text-[11px] text-white/80">"Quelqu'un pour un run sur l'autoroute ?"</div>
                </div>
            </div>

            <div class="mt-8 text-[9px] text-center text-white/30 italic">
                Nouveau follower toutes les 30 min (+100 m's)
            </div>
        `;
    }

    onOpen(container) {
        // Écouter les nouveaux followers pendant que l'app est ouverte
        window.addEventListener('vibs-new-follower', (e) => {
            const el = document.getElementById('vibs-followers');
            if (el) el.textContent = e.detail.count;
        });
    }
}
