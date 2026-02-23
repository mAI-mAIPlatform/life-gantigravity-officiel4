export class CreditsStore {
    constructor() {
        this.isOpen = false;
        this.initUI();
    }

    initUI() {
        const overlay = document.getElementById('credits-overlay');
        if (!overlay) return;

        overlay.innerHTML = `
            <div class="glass-panel p-12 rounded-[50px] w-full max-w-2xl flex flex-col items-center text-center shadow-2xl overflow-hidden relative">
                <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent"></div>
                
                <div class="w-32 h-32 bg-accent/10 rounded-full flex items-center justify-center mb-10 border border-accent/20 shadow-[0_0_30px_rgba(0,255,136,0.1)]">
                    <img src="./src/assets/logo.png" alt="Life Logo" class="w-16 opacity-90 drop-shadow-[0_0_10px_rgba(0,255,136,0.5)]">
                </div>
                
                <h2 class="text-5xl font-black italic tracking-tighter text-white mb-2">PLATEFORME m's</h2>
                <p class="text-[10px] uppercase tracking-[0.6em] text-accent font-black mb-12">Le Futur de la Vie Virtuelle</p>
                
                <div class="space-y-6 w-full text-white/70">
                    <div class="flex justify-between border-b border-white/5 pb-3">
                        <span class="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Développé par</span>
                        <span class="text-xs font-bold text-white uppercase italic">MATHIAS Platforms</span>
                    </div>
                    <div class="flex justify-between border-b border-white/5 pb-3">
                        <span class="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Architecte Principal</span>
                        <span class="text-xs font-bold text-white uppercase italic">Antigravity AI</span>
                    </div>
                    <div class="flex justify-between border-b border-white/5 pb-3">
                        <span class="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Moteur Graphique</span>
                        <span class="text-xs font-bold text-white uppercase italic">Three.js | Cannon.js</span>
                    </div>
                    <div class="flex justify-between border-b border-white/5 pb-3">
                        <span class="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Framework UI</span>
                        <span class="text-xs font-bold text-white uppercase italic">Tailwind CSS v4</span>
                    </div>
                </div>

                <p class="mt-12 text-[9px] text-white/20 italic uppercase tracking-widest font-medium">Développé avec passion pour la communauté NeoCity.</p>

                <button id="close-credits" class="mt-12 w-full py-4 border border-white/10 rounded-2xl text-white/40 hover:text-white hover:bg-white/5 uppercase tracking-[0.5em] text-[9px] font-black transition-all duration-500">FERMER</button>
            </div>
        `;

        document.getElementById('close-credits').onclick = () => this.toggle();
    }

    toggle() {
        this.isOpen = !this.isOpen;
        const overlay = document.getElementById('credits-overlay');
        if (overlay) {
            overlay.classList.toggle('active', this.isOpen);
        }
    }
}
