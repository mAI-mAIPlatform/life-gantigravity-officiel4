/**
 * Smartphone : Cœur logique du téléphone.
 * Gère l'état, le cycle de vie des applications et la communication avec le moteur.
 */
export class Smartphone {
    constructor() {
        this.isOpen = false;
        this.currentApp = null;
        this.apps = new Map();
        this.init();
    }

    init() {
        console.log("Smartphone : Initialisation logicielle...");
        this.startBackgroundTasks();
    }

    startBackgroundTasks() {
        // Logique VIBS : +1 follower toutes les 30 min (1800000ms)
        setInterval(() => {
            const vibs = this.apps.get('Vibs');
            if (vibs) {
                vibs.followers++;
                // Simuler l'ajout de 100 m's via l'économie globale si possible
                if (window.app && window.app.engine && window.app.engine.economy) {
                    window.app.engine.economy.addMoney(100);
                }
                console.log("Vibs : Nouveau follower ! +100 m's");
                window.dispatchEvent(new CustomEvent('vibs-new-follower', { detail: { count: vibs.followers } }));
            }
        }, 1800000);
    }

    registerApp(name, appInstance) {
        this.apps.set(name, appInstance);
    }

    toggle() {
        this.isOpen = !this.isOpen;
        window.dispatchEvent(new CustomEvent('smartphone-toggle', { detail: { open: this.isOpen } }));
    }

    openApp(name) {
        if (this.apps.has(name)) {
            this.currentApp = name;
            console.log(`Smartphone : Ouverture de l'application ${name}`);
            window.dispatchEvent(new CustomEvent('smartphone-app-open', { detail: { name } }));
        }
    }

    closeApp() {
        this.currentApp = null;
        window.dispatchEvent(new CustomEvent('smartphone-app-close'));
    }
}
