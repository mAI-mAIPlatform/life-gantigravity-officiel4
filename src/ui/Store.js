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
            <div class="bg-black/90 backdrop-blur-xl border border-white/10 p-8 rounded-lg w-full max-w-5xl h-[80vh] flex flex-col relative overflow-hidden">
                <!-- Header -->
                <div class="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                    <h2 class="text-4xl font-black italic tracking-tighter text-white">m's STORE</h2>
                    <div class="flex items-center space-x-6">
                        <div class="bg-accent/20 border border-accent/50 px-4 py-1 rounded text-accent font-bold credits-display">
                            ${this.economy.credits} m's
                        </div>
                        <button id="close-store" class="text-white/40 hover:text-white transition">CLOSE [ESC]</button>
                    </div>
                </div>

                <!-- Main Grid -->
                <div class="flex flex-1 space-x-8 overflow-hidden">
                    <!-- Categories -->
                    <div class="w-48 flex flex-col space-y-2">
                        <button class="store-tab active bg-white/10 p-3 text-left font-bold uppercase tracking-widest text-xs border-l-2 border-accent">All</button>
                        <button class="store-tab hover:bg-white/5 p-3 text-left text-white/50 font-bold uppercase tracking-widest text-xs">Skins</button>
                        <button class="store-tab hover:bg-white/5 p-3 text-left text-white/50 font-bold uppercase tracking-widest text-xs">Vehicles</button>
                        <button class="store-tab hover:bg-white/5 p-3 text-left text-white/50 font-bold uppercase tracking-widest text-xs">Weapons</button>
                    </div>

                    <!-- Items Grid -->
                    <div class="flex-1 grid grid-cols-3 gap-6 overflow-y-auto pr-4 scrollbar-thin">
                        ${this.generateItemCards()}
                    </div>

                    <!-- Redemption Side -->
                    <div class="w-64 bg-white/5 p-6 rounded border border-white/10 flex flex-col">
                        <h3 class="text-xs font-bold text-white/40 uppercase mb-4 tracking-widest">Redeem Code</h3>
                        <input type="text" id="redeem-input" placeholder="XXXXMSCODE" class="bg-black border border-white/20 p-3 text-center text-white font-mono mb-4 outline-none focus:border-accent">
                        <button id="redeem-btn" class="bg-accent text-black font-bold p-3 uppercase tracking-tighter hover:bg-white transition">Activate</button>
                        <div id="redeem-msg" class="mt-4 text-xs text-center h-4"></div>
                        
                        <div class="mt-auto pt-8 border-t border-white/5 text-[10px] text-white/30 uppercase leading-relaxed">
                            Buy m's on official MATHIAS platforms to unlock premium content.
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
            <div class="bg-gradient-to-b from-white/5 to-transparent border border-white/10 p-6 flex flex-col group hover:border-accent/40 transition">
                <div class="text-[10px] text-accent font-bold uppercase mb-1 tracking-widest">${item.category}</div>
                <div class="text-xl font-bold mb-2 group-hover:text-accent transition">${item.name}</div>
                <div class="text-xs text-white/50 mb-6 leading-relaxed">${item.description}</div>
                <button class="buy-btn mt-auto bg-white/10 hover:bg-accent hover:text-black py-2 font-bold transition flex justify-between px-4 items-center" data-id="${item.id}" data-price="${item.price}">
                    <span>BUY</span>
                    <span class="text-xs opacity-50 font-normal">${item.price} m's</span>
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
                    btn.textContent = 'OWNED';
                    btn.disabled = true;
                    btn.classList.add('bg-accent', 'text-black');
                    console.log('Purchased:', id);
                } else {
                    alert('Not enough m\'s!');
                }
            };
        });
    }

    handleRedeem() {
        const input = document.getElementById('redeem-input');
        const msg = document.getElementById('redeem-msg');
        const res = this.economy.redeemCode(input.value.trim().toUpperCase());

        msg.textContent = res.message;
        msg.className = `mt-4 text-xs text-center ${res.success ? 'text-accent' : 'text-red-500'}`;

        if (res.success) {
            input.value = '';
        }
    }

    toggle() {
        this.isOpen = !this.isOpen;
        const overlay = document.getElementById('store-overlay');
        if (overlay) {
            overlay.classList.toggle('hidden', !this.isOpen);
            overlay.classList.toggle('flex', this.isOpen);
        }
    }
}
