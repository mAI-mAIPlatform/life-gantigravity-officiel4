export class NotificationSystem {
    constructor() {
        this.container = document.createElement('div');
        this.container.id = 'notification-container';
        this.container.className = 'fixed top-24 left-1/2 -translate-x-1/2 z-[60] flex flex-col items-center space-y-2 pointer-events-none';
        document.body.appendChild(this.container);
    }

    show(message, type = 'info', duration = 3000) {
        const notif = document.createElement('div');

        const colors = {
            info: 'border-accent/40 bg-black/80 text-accent',
            success: 'border-green-500/40 bg-green-900/20 text-green-400',
            error: 'border-red-500/40 bg-red-900/20 text-red-400',
            warning: 'border-yellow-500/40 bg-yellow-900/20 text-yellow-400'
        };

        notif.className = `px-6 py-3 rounded border backdrop-blur-md shadow-lg animate-slide-down transform transition-all duration-300 ${colors[type] || colors.info}`;

        notif.innerHTML = `
            <div class="flex items-center space-x-3">
                <span class="text-[10px] font-black italic tracking-tighter uppercase whitespace-nowrap">SYSTEM // ${type}</span>
                <span class="text-xs font-bold text-white">${message}</span>
            </div>
        `;

        this.container.appendChild(notif);

        setTimeout(() => {
            notif.classList.add('opacity-0', '-translate-y-4');
            setTimeout(() => notif.remove(), 400);
        }, duration);
    }
}

// Global instance
window.notifier = new NotificationSystem();
