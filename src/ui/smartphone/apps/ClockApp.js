/**
 * Clock App : Horloge et Temps universel in-game.
 */
export class ClockApp {
    render() {
        return `
            <div class="flex flex-col items-center justify-center h-full py-10">
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
