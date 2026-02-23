export class CreditsStore {
    constructor() {
        this.isOpen = false;
        this.initUI();
    }

    initUI() {
        const overlay = document.getElementById('credits-overlay');
        if (!overlay) return;

        overlay.innerHTML = `
            <div class="bg-black/95 backdrop-blur-2xl border border-white/10 p-12 rounded-lg w-full max-w-2xl flex flex-col items-center text-center">
                <div class="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mb-8 border border-accent/30 scale-110">
                    <img src="./src/assets/logo.png" alt="Life Logo" class="w-12 opacity-80">
                </div>
                
                <h2 class="text-4xl font-black italic tracking-tighter text-white mb-2">M'S PLATFORM</h2>
                <p class="text-xs uppercase tracking-[0.4em] text-white/30 mb-12">The Future of Virtual Life</p>
                
                <div class="space-y-6 w-full text-white/70">
                    <div class="flex justify-between border-b border-white/5 pb-2">
                        <span class="text-xs font-bold uppercase tracking-widest text-white/40">Powered by</span>
                        <span class="text-xs">MATHIAS Platforms</span>
                    </div>
                    <div class="flex justify-between border-b border-white/5 pb-2">
                        <span class="text-xs font-bold uppercase tracking-widest text-white/40">Lead Architect</span>
                        <span class="text-xs">Antigravity AI</span>
                    </div>
                    <div class="flex justify-between border-b border-white/5 pb-2">
                        <span class="text-xs font-bold uppercase tracking-widest text-white/40">Engine</span>
                        <span class="text-xs">Three.js | Cannon.js</span>
                    </div>
                    <div class="flex justify-between border-b border-white/5 pb-2">
                        <span class="text-xs font-bold uppercase tracking-widest text-white/40">UI Framework</span>
                        <span class="text-xs">Tailwind CSS v4</span>
                    </div>
                </div>

                <p class="mt-12 text-[10px] text-white/30 italic">Developed with passion for the Life community.</p>

                <button id="close-credits" class="mt-12 text-white/40 hover:text-white uppercase tracking-widest text-xs transition">Dismiss</button>
            </div>
        `;

        document.getElementById('close-credits').onclick = () => this.toggle();
    }

    toggle() {
        this.isOpen = !this.isOpen;
        const overlay = document.getElementById('credits-overlay');
        if (overlay) {
            overlay.classList.toggle('hidden', !this.isOpen);
            overlay.classList.toggle('flex', this.isOpen);
        }
    }
}
