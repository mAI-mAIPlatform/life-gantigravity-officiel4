/**
 * Clock App : Horloge et Temps universel in-game.
 */
export class ClockApp {
    render() {
        return `
            <div class="flex flex-col items-center justify-center h-full py-10">
                <div class="text-[60px] font-light tracking-tighter text-white mb-2" id="phone-app-big-clock">12:00</div>
                <div class="text-[10px] text-white/40 uppercase tracking-widest mb-10">Lundi, 23 Février 2026</div>

                <div class="w-full space-y-4">
                    <div class="flex justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                        <span class="text-xs">NeoCity</span>
                        <span class="text-xs text-white/60">En direct</span>
                    </div>
                    <div class="flex justify-between p-4 bg-white/5 rounded-xl border border-white/5 opacity-50">
                        <span class="text-xs">Paris</span>
                        <span class="text-xs text-white/60">+9h</span>
                    </div>
                </div>
            </div>
        `;
    }

    onOpen(container) {
        const update = () => {
            const now = new Date();
            const el = document.getElementById('phone-app-big-clock');
            if (el) el.textContent = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
        };
        setInterval(update, 1000);
        update();
    }
}
