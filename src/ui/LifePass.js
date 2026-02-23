export class LifePass {
    constructor() {
        this.level = parseInt(localStorage.getItem('life_pass_level')) || 1;
        this.xp = parseInt(localStorage.getItem('life_pass_xp')) || 0;
        this.maxXp = 1000;
        this.isOpen = false;

        this.rewards = [
            { level: 1, name: 'Basic Skin', unlocked: true },
            { level: 2, name: '500 m\'s', unlocked: this.level >= 2 },
            { level: 3, name: 'Sports Car', unlocked: this.level >= 3 },
            { level: 4, name: 'Heavy Rifle', unlocked: this.level >= 4 },
            { level: 5, name: 'Penthouse Key', unlocked: this.level >= 5 }
        ];

        this.initUI();
    }

    initUI() {
        const overlay = document.getElementById('lifepass-overlay');
        if (!overlay) return;

        overlay.innerHTML = `
            <div class="glass-panel p-10 rounded-3xl w-full max-w-4xl h-[70vh] flex flex-col relative overflow-hidden shadow-2xl">
                <div class="flex justify-between items-center mb-10 border-b border-white/5 pb-6">
                    <div>
                        <h2 class="text-5xl font-black italic tracking-tighter text-accent">LIFE PASS</h2>
                        <div class="text-[10px] uppercase text-white/40 tracking-[0.5em] mt-1">Saison 1 : Nouveaux Départs</div>
                    </div>
                    <div class="text-right">
                        <div class="text-white font-black text-2xl italic uppercase tracking-tighter">Niveau ${this.level}</div>
                        <div class="text-white/30 text-[10px] uppercase font-bold tracking-widest">${this.xp} / ${this.maxXp} XP</div>
                    </div>
                </div>

                <div class="w-full bg-white/5 h-3 rounded-full overflow-hidden mb-16 p-[2px] border border-white/5">
                    <div class="bg-gradient-to-r from-accent to-emerald-400 h-full rounded-full transition-all duration-1000 shadow-[0_0_15px_#00ff88]" style="width: ${(this.xp / this.maxXp) * 100}%"></div>
                </div>

                <div class="flex-1 grid grid-cols-5 gap-6 overflow-x-auto pb-6 scrollbar-thin">
                    ${this.generateRewardTrack()}
                </div>

                <button id="close-lifepass" class="mt-8 self-center px-12 py-3 border border-white/10 rounded-full text-white/40 hover:text-white hover:bg-white/5 uppercase tracking-[0.4em] text-[10px] font-black transition-all duration-300">Retour au Menu</button>
            </div>
        `;

        document.getElementById('close-lifepass').onclick = () => this.toggle();
    }

    generateRewardTrack() {
        return this.rewards.map(reward => `
            <div class="flex flex-col items-center ${reward.unlocked ? 'opacity-100 scale-100' : 'opacity-30 scale-95'} group transition-all duration-500">
                <div class="w-full aspect-square bg-gradient-to-br from-white/10 to-transparent border ${reward.unlocked ? 'border-accent/50 box-shadow-[0_0_20px_rgba(0,255,136,0.2)]' : 'border-white/10'} rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/10 transition-all shadow-xl">
                    <div class="text-xl font-black italic text-white/20">${reward.level}</div>
                </div>
                <div class="text-[10px] font-black text-center uppercase tracking-widest text-white mb-2">${reward.name === 'Basic Skin' ? 'SKIN BASIQUE' : reward.name === 'Sports Car' ? 'VOITURE SPORT' : reward.name === 'Heavy Rifle' ? 'FUSIL LOURD' : reward.name === 'Penthouse Key' ? 'CLÉ PENTHOUSE' : reward.name}</div>
                ${reward.unlocked ? '<div class="text-[8px] text-accent font-black tracking-[0.2em] border border-accent/30 px-2 py-1 rounded">DÉBLOQUÉ</div>' : '<div class="text-[8px] text-white/20 font-black tracking-[0.2em]">VERROUILLÉ</div>'}
            </div>
        `).join('');
    }

    toggle() {
        this.isOpen = !this.isOpen;
        const overlay = document.getElementById('lifepass-overlay');
        if (overlay) {
            overlay.classList.toggle('active', this.isOpen);
        }
    }
}
