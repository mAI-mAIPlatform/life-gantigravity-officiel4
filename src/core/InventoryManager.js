export class InventoryManager {
    constructor() {
        this.items = [];
        this.capacity = 20;
        this.isOpen = false;

        this.ui = {
            container: document.getElementById('inventory-overlay'),
            grid: document.getElementById('inventory-grid')
        };
    }

    addItem(item) {
        if (this.items.length < this.capacity) {
            this.items.push(item);
            this.updateUI();
            return true;
        }
        return false;
    }

    removeItem(index) {
        if (index >= 0 && index < this.items.length) {
            const item = this.items.splice(index, 1)[0];
            this.updateUI();
            return item;
        }
        return null;
    }

    toggle() {
        this.isOpen = !this.isOpen;
        if (this.ui.container) {
            this.ui.container.classList.toggle('hidden');
            this.ui.container.classList.toggle('flex');
        }
    }

    updateUI() {
        if (!this.ui.grid) return;

        this.ui.grid.innerHTML = '';

        for (let i = 0; i < this.capacity; i++) {
            const slot = document.createElement('div');
            slot.className = 'w-16 h-16 bg-white/5 border border-white/10 rounded flex items-center justify-center relative';

            if (this.items[i]) {
                const item = this.items[i];
                slot.innerHTML = `<span class="text-xs">${item.name}</span>`;
                slot.title = item.description || '';
            }

            this.ui.grid.appendChild(slot);
        }
    }
}
