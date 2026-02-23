/**
 * ErrorReporter - Système de diagnostic et d'alerte de bugs
 * Version 1.0.0
 */
export class ErrorReporter {
    constructor() {
        this.errors = [];
        this.ui = null;
        this.init();
    }

    init() {
        console.log('ErrorReporter: Système d\'alerte actif.');

        // Interception des erreurs globales
        window.onerror = (message, source, lineno, colno, error) => {
            this.report({
                type: 'Runtime Error',
                message,
                source: `${source}:${lineno}:${colno}`,
                stack: error?.stack
            });
            return false;
        };

        // Interception des promesses rejetées non gérées
        window.onunhandledrejection = (event) => {
            this.report({
                type: 'Promise Rejection',
                message: event.reason?.message || event.reason,
                stack: event.reason?.stack
            });
        };

        // Optionnel : Intercepter console.error
        const originalConsoleError = console.error;
        console.error = (...args) => {
            this.report({
                type: 'Console Error',
                message: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg).join(' ')
            });
            originalConsoleError.apply(console, args);
        };
    }

    report(errorData) {
        this.errors.push({
            ...errorData,
            timestamp: new Date().toLocaleTimeString()
        });

        console.warn('⚠️ BUG DÉTECTÉ:', errorData.message);
        this.showUI();
    }

    createUI() {
        if (this.ui) return;

        this.ui = document.createElement('div');
        this.ui.id = 'error-reporter-ui';
        this.ui.className = 'fixed top-4 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-lg pointer-events-none p-4';
        document.body.appendChild(this.ui);
    }

    showUI() {
        this.createUI();
        const latestError = this.errors[this.errors.length - 1];

        const card = document.createElement('div');
        card.className = 'bg-red-950/90 backdrop-blur-3xl border border-red-500/50 p-6 rounded-2xl shadow-2xl mb-4 transform translate-y-[-20px] opacity-0 transition-all duration-500 pointer-events-auto shadow-red-500/20';

        card.innerHTML = `
            <div class="flex items-start gap-4">
                <div class="bg-red-500 text-white p-2 rounded-lg font-black text-xs animate-pulse">BUG</div>
                <div class="flex-1">
                    <div class="flex justify-between items-center mb-1">
                        <span class="text-[10px] font-black uppercase tracking-widest text-red-400">${latestError.type}</span>
                        <span class="text-[8px] text-white/30 font-mono">${latestError.timestamp}</span>
                    </div>
                    <div class="text-white text-xs font-bold leading-relaxed mb-3">${latestError.message}</div>
                    ${latestError.source ? `<div class="text-[9px] text-white/40 font-mono break-all mb-2">${latestError.source}</div>` : ''}
                    
                    <button class="text-[9px] font-black uppercase tracking-widest text-white/30 hover:text-white transition-colors" onclick="this.parentElement.parentElement.parentElement.remove()">Ignorer</button>
                </div>
            </div>
        `;

        this.ui.prepend(card);

        // Animation d'entrée
        setTimeout(() => {
            card.classList.remove('translate-y-[-20px]', 'opacity-0');
            card.classList.add('translate-y-0', 'opacity-100');
        }, 10);

        // On ne supprime plus automatiquement les erreurs pour permettre une lecture longue.
        // L'utilisateur doit cliquer sur "Ignorer" pour les enlever.
    }
}
