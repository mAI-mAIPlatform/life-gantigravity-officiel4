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
            <div class="text-center mb-6 py-4">
                <div class="text-4xl mb-2">🤳</div>
                <div class="text-2xl font-black italic tracking-tighter" style="color: #ff3366">VIBS</div>
            </div>

            <div class="flex justify-around mb-8 p-4 bg-white/5 rounded-2xl border border-white/10">
                <div class="text-center">
                    <div class="text-lg font-bold" id="vibs-followers">${this.followers}</div>
                    <div class="text-[8px] uppercase text-white/40">Followers</div>
                </div>
                <div class="text-center">
                    <div class="text-lg font-bold">12</div>
                    <div class="text-[8px] uppercase text-white/40">Posts</div>
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
