/**
 * DialogueSystem : Gère les interactions narratives ultra-poussées (Vibe IA / GTA).
 */
export class DialogueSystem {
    constructor() {
        this.container = null;
        this.currentDialogue = null;
        this.init();
    }

    init() {
        console.log("Système de Dialogue initialisé.");
        this.createUI();
    }

    createUI() {
        const ui = `
            <div id="dialogue-box" class="hidden fixed bottom-12 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 z-[200] shadow-2xl transition-all">
                <div class="flex flex-col gap-4">
                    <div class="flex items-center gap-4">
                        <div id="dialogue-avatar" class="w-12 h-12 rounded-full bg-accent/20 border border-accent/50 flex items-center justify-center text-xl shadow-lg">👤</div>
                        <div>
                            <div id="dialogue-name" class="text-accent font-black uppercase italic tracking-tighter text-xs">NOM DU PNJ</div>
                            <div id="dialogue-role" class="text-[8px] text-white/40 uppercase tracking-widest">Fonction</div>
                        </div>
                    </div>
                    <p id="dialogue-text" class="text-white text-sm leading-relaxed"></p>
                    <div id="dialogue-options" class="flex flex-wrap gap-2 mt-2"></div>
                </div>
            </div>
        `;
        const div = document.createElement('div');
        div.innerHTML = ui;
        document.body.appendChild(div.firstElementChild);
        this.container = document.getElementById('dialogue-box');
    }

    /**
     * Déclenche un dialogue.
     * @param {Object} config - { name, role, text, options }
     */
    start(config) {
        const nameEl = document.getElementById('dialogue-name');
        const roleEl = document.getElementById('dialogue-role');
        const textEl = document.getElementById('dialogue-text');
        const optionsEl = document.getElementById('dialogue-options');

        nameEl.textContent = config.name;
        roleEl.textContent = config.role || "Inconnu";
        textEl.textContent = "";
        optionsEl.innerHTML = "";

        this.container.classList.remove('hidden');
        this.typeEffect(textEl, config.text, () => {
            if (config.options) {
                config.options.forEach(opt => {
                    const btn = document.createElement('button');
                    btn.className = "px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] text-white uppercase hover:bg-accent hover:text-black transition-all font-bold tracking-widest";
                    btn.textContent = opt.text;
                    btn.onclick = () => {
                        if (opt.callback) opt.callback();
                        if (!opt.keepOpen) this.close();
                    };
                    optionsEl.appendChild(btn);
                });
            }
        });
    }

    typeEffect(element, text, callback) {
        let i = 0;
        const interval = setInterval(() => {
            element.textContent += text[i];
            i++;
            if (i >= text.length) {
                clearInterval(interval);
                if (callback) callback();
            }
        }, 20);
    }

    close() {
        this.container.classList.add('hidden');
    }
}
