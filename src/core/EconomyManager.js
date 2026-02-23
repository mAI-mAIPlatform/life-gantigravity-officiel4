export class EconomyManager {
    constructor() {
        this.credits = parseInt(localStorage.getItem('life_credits')) || 0;
        this.redeemedCodes = JSON.parse(localStorage.getItem('life_redeemed_codes')) || [];

        this.init();
    }

    init() {
        console.log('Economy Manager Initialized. Credits:', this.credits);
        this.updateUI();
    }

    addCredits(amount) {
        this.credits += amount;
        this.save();
        this.updateUI();
        window.dispatchEvent(new CustomEvent('credits-updated', { detail: { credits: this.credits } }));
    }

    subtractCredits(amount) {
        if (this.credits >= amount) {
            this.credits -= amount;
            this.save();
            this.updateUI();
            return true;
        }
        return false;
    }

    redeemCode(code) {
        if (this.redeemedCodes.includes(code)) {
            return { success: false, message: 'Code already redeemed!' };
        }

        const match = code.match(/^(\d+)MSCODE$/);
        if (match) {
            const amount = parseInt(match[1]);
            if (amount > 0 && amount <= 20000) {
                this.addCredits(amount);
                this.redeemedCodes.push(code);
                this.save();
                return { success: true, message: `Réclamé ${amount} m's!` };
            }
        }

        return { success: false, message: 'Code invalide !' };
    }

    save() {
        localStorage.setItem('life_credits', this.credits);
        localStorage.setItem('life_redeemed_codes', JSON.stringify(this.redeemedCodes));
    }

    updateUI() {
        const displays = document.querySelectorAll('.credits-display');
        displays.forEach(d => d.textContent = `${this.credits} m's`);
    }
}
