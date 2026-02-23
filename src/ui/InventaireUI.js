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
            <div class="bg-black/80 backdrop-blur-2xl border border-white/10 p-8 rounded-lg w-full max-w-2xl h-[60vh] flex flex-col relative overflow-hidden">
                <div class="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                    <h2 class="text-3xl font-black italic tracking-tighter text-white">CASIER <span class="text-accent opacity-50 italic text-xl">/ Inventory</span></h2>
                    <button id="close-inventory" class="text-white/40 hover:text-white transition uppercase tracking-widest text-[10px]">Close [I]</button>
                </div>

                <div class="flex-1 flex space-x-8 overflow-hidden">
                    <!-- Grid -->
                    <div id="inventory-grid-modular" class="flex-1 grid grid-cols-4 gap-4 overflow-y-auto pr-2 scrollbar-thin">
                        <!-- Slots -->
                    </div>

                    <!-- Details Panel -->
                    <div class="w-56 bg-white/5 rounded border border-white/10 p-6 flex flex-col items-center text-center">
                        <div class="w-24 h-24 bg-white/5 border border-white/10 rounded-full mb-6 flex items-center justify-center">
                            <div class="text-white/20 uppercase tracking-widest text-[8px]">No Item</div>
                        </div>
                        <h3 id="item-title" class="text-sm font-bold mb-2">Select an item</h3>
                        <p id="item-desc" class="text-[10px] text-white/40 leading-relaxed mb-8">Click on an item in your locker to view details and equip.</p>
                        <button id="equip-btn" class="mt-auto w-full bg-white/10 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition disabled:opacity-20" disabled>Equip</button>
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
            slot.className = `aspect-square bg-white/5 border border-white/10 rounded cursor-pointer hover:border-accent/50 transition flex items-center justify-center p-2 group ${item ? 'border-accent/30' : ''}`;

            if (item) {
                slot.innerHTML = `<span class="text-[10px] text-center font-bold uppercase group-hover:text-accent transition">${item.name}</span>`;
                slot.onclick = () => this.showDetails(item);
            }

            grid.appendChild(slot);
        }
    }

    showDetails(item) {
        document.getElementById('item-title').textContent = item.name;
        document.getElementById('item-desc').textContent = item.description || 'No description available.';
        const btn = document.getElementById('equip-btn');
        btn.disabled = false;
        btn.onclick = () => console.log('Equipped:', item.id);
    }

    toggle() {
        this.isOpen = !this.isOpen;
        const overlay = document.getElementById('inventory-overlay');
        if (overlay) {
            overlay.classList.toggle('hidden', !this.isOpen);
            overlay.classList.toggle('flex', this.isOpen);
            if (this.isOpen) this.renderGrid();
        }
    }
}
