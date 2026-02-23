/**
 * Bank App : Gestion du solde et historique.
 */
export class BankApp {
    render() {
        return `
            <div class="bg-black/40 p-4 rounded-xl border border-white/10 mb-4">
                <div class="text-[10px] text-white/50 mb-1">Solde Actuel</div>
                <div class="text-2xl font-bold text-green-400" id="bank-balance">1,250 m's</div>
            </div>
            
            <h3 class="text-[10px] uppercase text-white/30 mb-2 px-1">Transactions Récentes</h3>
            <div class="flex flex-col gap-2">
                ${this.renderTransaction('NeoStore', '- 250 m\'s', 'red')}
                ${this.renderTransaction('Vibs Bonus', '+ 100 m\'s', 'green')}
                ${this.renderTransaction('Job: Courcier', '+ 500 m\'s', 'green')}
            </div>
        `;
    }

    renderTransaction(label, amount, color) {
        return `
            <div class="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/5">
                <span class="text-xs">${label}</span>
                <span class="text-xs font-bold text-${color}-400">${amount}</span>
            </div>
        `;
    }
}
