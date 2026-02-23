/**
 * Store App : Boutique rapide in-app.
 */
export class StoreApp {
    render() {
        return `
            <div class="space-y-4">
                <div class="flex justify-between items-center px-1">
                    <div class="text-[10px] font-bold text-yellow-400 italic">OFFRES SPÉCIALES</div>
                    <button data-action="open-bank" class="text-[8px] text-white/30 border-b border-white/10">Mon Compte</button>
                </div>
                ${this.renderItem('Kit Drift Pro', '1,500 m\'s', '🏎️')}
                ${this.renderItem('Viseur Néon', '300 m\'s', '🔭')}
                ${this.renderItem('Pack 500 Credits', 'Gratuit', '💎')}
                
                <div class="mt-6 p-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl text-center text-black font-bold text-xs shadow-xl cursor-pointer">
                    DEVENIR PRÉMIUM
                </div>
            </div>
        `;
    }

    renderItem(name, price, icon) {
        return `
            <div class="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 cursor-pointer transition-all">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-xl">${icon}</div>
                    <span class="text-[10px] font-medium">${name}</span>
                </div>
                <span class="text-[10px] font-bold text-green-400">${price}</span>
            </div>
        `;
    }

    onOpen(container) {
        const bankBtn = container.querySelector('[data-action="open-bank"]');
        if (bankBtn) {
            bankBtn.addEventListener('click', () => {
                if (window.app && window.app.smartphone) {
                    window.app.smartphone.openApp('Bank');
                }
            });
        }
    }
}
