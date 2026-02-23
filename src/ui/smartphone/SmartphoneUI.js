/**
 * SmartphoneUI : Interface visuelle moderne et ultra-stylisée (Glassmorphism).
 */
export class SmartphoneUI {
    constructor(smartphone) {
        this.phone = smartphone;
        this.container = null;
        this.createUI();
        this.listen();
    }

    createUI() {
        // Injection du HTML du téléphone dans le DOM
        const phoneHTML = `
            <div id="smartphone-shell" class="hidden fixed right-8 bottom-8 w-[320px] h-[600px] bg-white/10 backdrop-blur-2xl rounded-[40px] border border-white/20 shadow-2xl overflow-hidden z-[100] transition-all duration-500 transform translate-y-full opacity-0">
                <!-- Barre de statut -->
                <div class="h-8 flex justify-between items-center px-6 text-[10px] text-white/70">
                    <span id="phone-clock">12:00</span>
                    <div class="flex gap-1 items-center">
                        <div class="w-3 h-3 bg-white/20 rounded-full"></div>
                        <div class="w-4 h-2 bg-green-400/50 rounded-sm"></div>
                    </div>
                </div>

                <!-- Contenu dynamique (Home ou App) -->
                <div id="phone-content" class="h-[calc(100%-60px)] p-6 overflow-y-auto">
                    <!-- App Grid (Home) -->
                    <div id="phone-home" class="grid grid-cols-3 gap-6">
                        ${this.renderAppIcon('Bank', '🏦', '#ff4d4d')}
                        ${this.renderAppIcon('Clock', '⌚', '#4dabff')}
                        ${this.renderAppIcon('Map', '🗺️', '#4dff88')}
                        ${this.renderAppIcon('Jobs', '💼', '#ffcc00')}
                        ${this.renderAppIcon('News', '📰', '#ff66b2')}
                        ${this.renderAppIcon('NeoHits', '📻', '#cc66ff')}
                        ${this.renderAppIcon('Settings', '⚙️', '#aaaaaa')}
                        ${this.renderAppIcon('Store', '🛒', '#00ffcc')}
                        ${this.renderAppIcon('Vibs', '📱', '#ff3366')}
                    </div>
                    
                    <!-- App View (Cachée par défaut) -->
                    <div id="phone-app-view" class="hidden h-full">
                        <div class="flex items-center gap-2 mb-4">
                            <button id="phone-back" class="text-white/50 hover:text-white">←</button>
                            <h2 id="phone-app-title" class="text-white font-bold uppercase tracking-widest text-xs"></h2>
                        </div>
                        <div id="phone-app-render" class="text-white text-sm"></div>
                    </div>
                </div>

                <!-- Barre Home bouton physique -->
                <div class="h-10 flex justify-center items-center">
                    <button id="phone-home-btn" class="w-12 h-1.5 bg-white/30 rounded-full hover:bg-white/60 transition-colors"></button>
                </div>
            </div>
        `;

        const wrapper = document.createElement('div');
        wrapper.innerHTML = phoneHTML;
        document.body.appendChild(wrapper.firstElementChild);
        this.container = document.getElementById('smartphone-shell');

        // Timer horloge
        setInterval(() => {
            const now = new Date();
            const clock = document.getElementById('phone-clock');
            if (clock) clock.textContent = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
        }, 1000);
    }

    renderAppIcon(name, emoji, color) {
        return `
            <div data-app="${name}" class="phone-icon-btn group cursor-pointer flex flex-col items-center gap-2">
                <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110 shadow-lg" style="background: ${color}22; border: 1px solid ${color}44;">
                    ${emoji}
                </div>
                <span class="text-[10px] text-white/80 font-medium">${name}</span>
            </div>
        `;
    }

    listen() {
        // Toggle global
        window.addEventListener('smartphone-toggle', (e) => {
            if (e.detail.open) {
                this.container.classList.remove('hidden');
                setTimeout(() => {
                    this.container.classList.remove('translate-y-full', 'opacity-0');
                    this.container.classList.add('translate-y-0', 'opacity-100');
                }, 10);
            } else {
                this.container.classList.add('translate-y-full', 'opacity-0');
                this.container.classList.remove('translate-y-0', 'opacity-100');
                setTimeout(() => this.container.classList.add('hidden'), 500);
            }
        });

        // Ouverture App
        this.container.querySelectorAll('.phone-icon-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const appName = btn.getAttribute('data-app');
                this.phone.openApp(appName);
            });
        });

        // Retour Home / Back
        document.getElementById('phone-back').addEventListener('click', () => this.showHome());
        document.getElementById('phone-home-btn').addEventListener('click', () => this.showHome());

        window.addEventListener('smartphone-app-open', (e) => {
            this.renderApp(e.detail.name);
        });
    }

    showHome() {
        document.getElementById('phone-home').classList.remove('hidden');
        document.getElementById('phone-app-view').classList.add('hidden');
    }

    renderApp(name) {
        const home = document.getElementById('phone-home');
        const view = document.getElementById('phone-app-view');
        const title = document.getElementById('phone-app-title');
        const renderArea = document.getElementById('phone-app-render');

        home.classList.add('hidden');
        view.classList.remove('hidden');
        title.textContent = name;

        // Appel du rendu spécifique de l'app si elle existe
        const appInstance = this.phone.apps.get(name);
        if (appInstance && appInstance.render) {
            renderArea.innerHTML = appInstance.render();
            if (appInstance.onOpen) appInstance.onOpen(renderArea);
        } else {
            renderArea.innerHTML = `<div class="p-4 text-center text-white/50">Application ${name} en cours de maintenance...</div>`;
        }
    }
}
