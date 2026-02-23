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
            <div class="bg-black/90 backdrop-blur-xl border border-white/10 p-8 rounded-lg w-full max-w-md flex flex-col items-center">
                <h2 class="text-3xl font-black italic tracking-tighter text-white mb-8">SETTINGS</h2>
                
                <div class="w-full space-y-6">
                    <div class="flex flex-col">
                        <div class="flex justify-between mb-2">
                            <span class="text-xs font-bold uppercase tracking-widest text-white/50">Volume</span>
                            <span id="vol-val" class="text-xs text-accent">${this.config.volume}%</span>
                        </div>
                        <input type="range" id="vol-slider" value="${this.config.volume}" class="accent-accent bg-white/10 h-1 appearance-none rounded-full">
                    </div>

                    <div class="flex flex-col">
                        <span class="text-xs font-bold uppercase tracking-widest text-white/50 mb-2">Graphics</span>
                        <select id="graphics-select" class="bg-white/5 border border-white/10 p-2 text-white outline-none focus:border-accent">
                            <option ${this.config.graphics === 'Low' ? 'selected' : ''}>Low</option>
                            <option ${this.config.graphics === 'Medium' ? 'selected' : ''}>Medium</option>
                            <option ${this.config.graphics === 'High' ? 'selected' : ''}>High</option>
                            <option ${this.config.graphics === 'Ultra' ? 'selected' : ''}>Ultra</option>
                        </select>
                    </div>

                    <div class="flex justify-between items-center">
                        <span class="text-xs font-bold uppercase tracking-widest text-white/50">Post-Processing</span>
                        <input type="checkbox" id="pp-toggle" ${this.config.postProcessing ? 'checked' : ''} class="accent-accent scale-125">
                    </div>
                </div>

                <button id="close-settings" class="mt-12 text-white/40 hover:text-white uppercase tracking-widest text-xs transition">Save & Close</button>
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
            overlay.classList.toggle('hidden', !this.isOpen);
            overlay.classList.toggle('flex', this.isOpen);
        }
    }
}
