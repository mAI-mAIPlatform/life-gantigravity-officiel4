export class InventaireUI {
    constructor(inventoryManager) {
        this.inventory = inventoryManager;
        this.isOpen = false;
        this.initUI();
    }

    initUI() {
        const overlay = document.getElementById('inventory-overlay');
        if (!overlay) return;

        overlay.innerHTML = `
            <div class="glass-panel p-8 rounded-3xl w-full max-w-3xl h-[65vh] flex flex-col relative overflow-hidden shadow-2xl">
                <div class="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
                    <div>
                        <h2 class="text-4xl font-black italic tracking-tighter text-white">CASIER <span class="text-accent italic text-xl">SÉCURISÉ</span></h2>
                        <div class="text-[9px] uppercase tracking-[0.6em] text-white/30 font-bold mt-1">Inventaire Personnel NeoCity</div>
                    </div>
                    <button id="close-inventory" class="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-300">✕</button>
                </div>

                <div class="flex-1 flex space-x-10 overflow-hidden">
                    <!-- Grid -->
                    <div id="inventory-grid-modular" class="flex-1 grid grid-cols-4 gap-4 overflow-y-auto pr-4 scrollbar-thin">
                        <!-- Slots -->
                    </div>

                    <!-- Details Panel -->
                    <div class="w-64 bg-white/5 rounded-3xl border border-white/10 p-8 flex flex-col items-center text-center shadow-inner">
                        <div class="w-28 h-28 bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-full mb-8 flex items-center justify-center shadow-lg">
                            <div class="text-white/10 uppercase tracking-[0.3em] text-[8px] font-black">Vide</div>
                        </div>
                        <h3 id="item-title" class="text-lg font-black italic tracking-tighter uppercase mb-2 text-white">Sélectionner</h3>
                        <p id="item-desc" class="text-[10px] text-white/40 leading-relaxed mb-10 font-medium">Cliquez sur un objet de votre casier pour voir les détails et l'équiper.</p>
                        <button id="equip-btn" class="mt-auto w-full bg-white text-black py-4 text-[10px] font-black uppercase tracking-[0.3em] rounded-xl hover:bg-accent transition-all duration-500 disabled:opacity-10 shadow-xl" disabled>ÉQUIPER</button>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('close-inventory').onclick = () => this.toggle();
        this.renderGrid();
    }

    renderGrid() {
        const grid = document.getElementById('inventory-grid-modular');
        if (!grid) return;

        grid.innerHTML = '';
        for (let i = 0; i < 16; i++) {
            const item = this.inventory.items[i];
            const slot = document.createElement('div');
            slot.className = `aspect-square bg-white/5 border border-white/10 rounded-2xl cursor-pointer hover:border-accent/60 transition-all duration-500 flex items-center justify-center p-4 group ${item ? 'border-accent/30 bg-accent/5 shadow-[0_0_15px_rgba(0,255,136,0.05)]' : 'hover:bg-white/5'}`;

            if (item) {
                slot.innerHTML = `<span class="text-[10px] text-center font-black uppercase tracking-tighter group-hover:text-accent transition-all text-white/80">${item.name}</span>`;
                slot.onclick = () => this.showDetails(item);
            }

            grid.appendChild(slot);
        }
    }

    showDetails(item) {
        document.getElementById('item-title').textContent = item.name;
        document.getElementById('item-desc').textContent = item.description || 'Aucune description disponible.';
        const btn = document.getElementById('equip-btn');
        btn.disabled = false;
        btn.onclick = () => console.log('Équipé :', item.id);
    }

    toggle() {
        this.isOpen = !this.isOpen;
        const overlay = document.getElementById('inventory-overlay');
        if (overlay) {
            overlay.classList.toggle('active', this.isOpen);
            if (this.isOpen) this.renderGrid();
        }
    }
}
