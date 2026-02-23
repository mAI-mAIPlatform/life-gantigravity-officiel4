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
            <div class="bg-black/90 backdrop-blur-xl border border-white/10 p-8 rounded-lg w-full max-w-4xl h-[70vh] flex flex-col relative overflow-hidden">
                <div class="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                    <h2 class="text-4xl font-black italic tracking-tighter text-accent">LIFE PASS</h2>
                    <div class="text-right">
                        <div class="text-xs uppercase text-white/40 tracking-[0.5em] mb-1">Season 1: Neo Beginning</div>
                        <div class="text-white font-bold">Level ${this.level} <span class="text-white/30 font-normal">| ${this.xp}/${this.maxXp} XP</span></div>
                    </div>
                </div>

                <div class="w-full bg-white/5 h-2 rounded-full overflow-hidden mb-12">
                    <div class="bg-accent h-full transition-all duration-1000" style="width: ${(this.xp / this.maxXp) * 100}%"></div>
                </div>

                <div class="flex-1 grid grid-cols-5 gap-4 overflow-x-auto pb-4">
                    ${this.generateRewardTrack()}
                </div>

                <button id="close-lifepass" class="mt-8 text-white/40 hover:text-white uppercase tracking-widest text-xs transition">Back to Menu</button>
            </div>
        `;

        document.getElementById('close-lifepass').onclick = () => this.toggle();
    }

    generateRewardTrack() {
        return this.rewards.map(reward => `
            <div class="flex flex-col items-center ${reward.unlocked ? 'opacity-100' : 'opacity-40'} group">
                <div class="w-full aspect-square bg-white/5 border ${reward.unlocked ? 'border-accent/50' : 'border-white/10'} rounded flex items-center justify-center mb-4 group-hover:bg-white/10 transition">
                    <div class="text-[10px] text-white/50">${reward.level}</div>
                </div>
                <div class="text-xs font-bold text-center uppercase tracking-tighter">${reward.name}</div>
                ${reward.unlocked ? '<div class="text-[8px] text-accent mt-1">UNLOCKED</div>' : ''}
            </div>
        `).join('');
    }

    toggle() {
        this.isOpen = !this.isOpen;
        const overlay = document.getElementById('lifepass-overlay');
        if (overlay) {
            overlay.classList.toggle('hidden', !this.isOpen);
            overlay.classList.toggle('flex', this.isOpen);
        }
    }
}
