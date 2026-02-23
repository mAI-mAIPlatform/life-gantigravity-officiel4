export class Settings {
    constructor() {
        this.isOpen = false;
        this.config = JSON.parse(localStorage.getItem('life_settings')) || {
            volume: 80,
            graphics: 'Ultra',
            postProcessing: true
        };
        this.initUI();
    }

    initUI() {
        const overlay = document.getElementById('settings-overlay');
        if (!overlay) return;

        overlay.innerHTML = `
            <div class="glass-panel p-10 rounded-[40px] w-full max-w-md flex flex-col items-center shadow-2xl">
                <h2 class="text-4xl font-black italic tracking-tighter text-white mb-2">PARAMÈTRES</h2>
                <div class="text-[10px] uppercase tracking-[0.6em] text-accent font-black mb-10">Configuration Système</div>
                
                <div class="w-full space-y-10">
                    <div class="flex flex-col">
                        <div class="flex justify-between mb-4">
                            <span class="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Volume Global</span>
                            <span id="vol-val" class="text-[10px] text-accent font-black">${this.config.volume}%</span>
                        </div>
                        <input type="range" id="vol-slider" value="${this.config.volume}" class="accent-accent bg-white/10 h-[2px] appearance-none rounded-full cursor-pointer">
                    </div>

                    <div class="flex flex-col">
                        <span class="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-4">Qualité Visuelle</span>
                        <select id="graphics-select" class="bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-accent transition-all font-bold text-xs">
                            <option value="Low" ${this.config.graphics === 'Low' ? 'selected' : ''}>Performance (Basse)</option>
                            <option value="Medium" ${this.config.graphics === 'Medium' ? 'selected' : ''}>Équilibrée (Moyenne)</option>
                            <option value="High" ${this.config.graphics === 'High' ? 'selected' : ''}>Qualité (Haute)</option>
                            <option value="Ultra" ${this.config.graphics === 'Ultra' ? 'selected' : ''}>Cinématique (Ultra)</option>
                        </select>
                    </div>

                    <div class="flex justify-between items-center group cursor-pointer">
                        <span class="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Post-Traitement HDR</span>
                        <div class="relative inline-block w-12 h-6 transition duration-200 ease-in">
                            <input type="checkbox" id="pp-toggle" ${this.config.postProcessing ? 'checked' : ''} class="opacity-0 w-0 h-0 peer">
                            <label for="pp-toggle" class="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-white/10 rounded-full transition-all duration-300 peer-checked:bg-accent before:absolute before:content-[''] before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all duration-300 peer-checked:before:translate-x-6"></label>
                        </div>
                    </div>
                </div>

                <button id="close-settings" class="mt-12 w-full py-4 bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] rounded-xl hover:bg-accent transition-all duration-500 shadow-lg">Sauvegarder & Fermer</button>
            </div>
        `;

        document.getElementById('close-settings').onclick = () => this.toggle();
        document.getElementById('vol-slider').oninput = (e) => {
            this.config.volume = e.target.value;
            document.getElementById('vol-val').textContent = `${this.config.volume}%`;
            this.save();
        };
        document.getElementById('graphics-select').onchange = (e) => {
            this.config.graphics = e.target.value;
            this.save();
        };
        document.getElementById('pp-toggle').onchange = (e) => {
            this.config.postProcessing = e.target.checked;
            this.save();
        };
    }

    save() {
        localStorage.setItem('life_settings', JSON.stringify(this.config));
    }

    toggle() {
        this.isOpen = !this.isOpen;
        const overlay = document.getElementById('settings-overlay');
        if (overlay) {
            overlay.classList.toggle('active', this.isOpen);
        }
    }
}
