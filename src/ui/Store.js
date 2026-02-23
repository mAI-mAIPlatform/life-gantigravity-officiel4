export class Store {
    constructor(economy) {
        this.economy = economy;
        this.isOpen = false;
        this.items = [
            { id: 'skin_alpha', name: 'Alpha Skin', price: 1500, category: 'Skins', description: 'Advanced combat suit for elites.' },
            { id: 'car_neon', name: 'Neon Sports Car', price: 5000, category: 'Vehicles', description: 'Glow in the dark high-speed vehicle.' },
            { id: 'weapon_gold', name: 'Golden Pistol', price: 2500, category: 'Weapons', description: 'Flashy and deadly.' }
        ];

        this.initUI();
    }

    initUI() {
        const overlay = document.getElementById('store-overlay');
        if (!overlay) return;

        overlay.innerHTML = `
            <div class="glass-panel p-8 rounded-3xl w-full max-w-5xl h-[80vh] flex flex-col relative overflow-hidden shadow-2xl">
                <!-- Header -->
                <div class="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
                    <div>
                        <h2 class="text-5xl font-black italic tracking-tighter text-white">BOUTIQUE m's</h2>
                        <div class="text-[10px] uppercase tracking-[0.5em] text-accent font-bold mt-1">Exclusivités NeoCity</div>
                    </div>
                    <div class="flex items-center space-x-6">
                        <div class="bg-accent/10 border border-accent/30 px-6 py-2 rounded-full text-accent font-black credits-display text-lg">
                            ${this.economy.credits} m's
                        </div>
                        <button id="close-store" class="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-300">✕</button>
                    </div>
                </div>

                <!-- Main Grid -->
                <div class="flex flex-1 space-x-12 overflow-hidden">
                    <!-- Categories -->
                    <div class="w-56 flex flex-col space-y-3">
                        <button class="store-tab active bg-accent/20 p-4 text-left font-black uppercase tracking-[0.2em] text-[10px] border-l-4 border-accent text-accent transition-all">Tout</button>
                        <button class="store-tab hover:bg-white/5 p-4 text-left text-white/50 font-black uppercase tracking-[0.2em] text-[10px] border-l-4 border-transparent hover:text-white transition-all">Skins</button>
                        <button class="store-tab hover:bg-white/5 p-4 text-left text-white/50 font-black uppercase tracking-[0.2em] text-[10px] border-l-4 border-transparent hover:text-white transition-all">Véhicules</button>
                        <button class="store-tab hover:bg-white/5 p-4 text-left text-white/50 font-black uppercase tracking-[0.2em] text-[10px] border-l-4 border-transparent hover:text-white transition-all">Armes</button>
                    </div>

                    <!-- Items Grid -->
                    <div class="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pr-6 scrollbar-thin">
                        ${this.generateItemCards()}
                    </div>

                    <!-- Redemption Side -->
                    <div class="w-72 bg-white/5 p-8 rounded-3xl border border-white/10 flex flex-col shadow-inner">
                        <h3 class="text-[10px] font-black text-white/40 uppercase mb-6 tracking-[0.3em]">Activer un Code</h3>
                        <input type="text" id="redeem-input" placeholder="CODE-MS-2026" class="bg-black/40 border border-white/10 p-4 rounded-xl text-center text-white font-mono mb-4 outline-none focus:border-accent transition-all uppercase tracking-widest">
                        <button id="redeem-btn" class="bg-white text-black font-black p-4 rounded-xl uppercase tracking-widest hover:bg-accent transition-all duration-500 shadow-xl shadow-white/5">ACTIVER</button>
                        <div id="redeem-msg" class="mt-4 text-[10px] text-center h-4 font-bold tracking-widest"></div>
                        
                        <div class="mt-auto pt-8 border-t border-white/5 text-[9px] text-white/20 uppercase leading-relaxed tracking-wider text-center">
                            Achetez des m's sur les plateformes officielles MATHIAS pour débloquer du contenu premium.
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('close-store').onclick = () => this.toggle();
        document.getElementById('redeem-btn').onclick = () => this.handleRedeem();

        this.bindPurchases();
    }

    generateItemCards() {
        return this.items.map(item => `
            <div class="bg-gradient-to-b from-white/10 to-transparent border border-white/10 p-8 flex flex-col group hover:border-accent/60 transition-all duration-500 rounded-3xl">
                <div class="text-[9px] text-accent font-black uppercase mb-2 tracking-[0.3em]">${item.category === 'Skins' ? 'TENUES' : item.category === 'Vehicles' ? 'VEHICULES' : 'ARSENAL'}</div>
                <div class="text-2xl font-black mb-3 group-hover:text-accent transition-all tracking-tighter italic uppercase text-white">${item.name}</div>
                <div class="text-[11px] text-white/40 mb-8 leading-relaxed font-medium">${item.description}</div>
                <button class="buy-btn mt-auto bg-white/5 hover:bg-accent hover:text-black py-4 rounded-xl font-black transition-all duration-500 flex justify-between px-6 items-center border border-white/10 hover:border-accent group/btn" data-id="${item.id}" data-price="${item.price}">
                    <span class="tracking-widest text-[10px]">ACHETER</span>
                    <span class="text-[10px] opacity-60 font-bold tracking-tighter">${item.price} m's</span>
                </button>
            </div>
        `).join('');
    }

    bindPurchases() {
        const btns = document.querySelectorAll('.buy-btn');
        btns.forEach(btn => {
            btn.onclick = () => {
                const price = parseInt(btn.dataset.price);
                const id = btn.dataset.id;
                if (this.economy.subtractCredits(price)) {
                    btn.innerHTML = '<span class="tracking-widest text-[10px]">DÉJÀ POSSÉDÉ</span>';
                    btn.disabled = true;
                    btn.classList.remove('bg-white/5', 'hover:bg-accent');
                    btn.classList.add('bg-accent', 'text-black');
                    console.log('Acheté:', id);
                } else {
                    const msg = document.getElementById('redeem-msg');
                    msg.textContent = 'M\'S INSUFFISANTS !';
                    msg.className = 'mt-4 text-[10px] text-center text-red-500 font-bold tracking-widest shake';
                    setTimeout(() => msg.textContent = '', 3000);
                }
            };
        });
    }

    handleRedeem() {
        const input = document.getElementById('redeem-input');
        const msg = document.getElementById('redeem-msg');
        const res = this.economy.redeemCode(input.value.trim().toUpperCase());

        msg.textContent = res.success ? 'CODE ACTIVÉ !' : 'CODE INVALIDE';
        msg.className = `mt-4 text-[10px] text-center font-bold tracking-widest ${res.success ? 'text-accent' : 'text-red-500'}`;

        if (res.success) {
            input.value = '';
            // Refresh balance
            const displays = document.querySelectorAll('.credits-display');
            displays.forEach(d => d.textContent = `${this.economy.credits} m's`);
        }
    }

    toggle() {
        this.isOpen = !this.isOpen;
        const overlay = document.getElementById('store-overlay');
        if (overlay) {
            overlay.classList.toggle('active', this.isOpen);
        }
    }
}
