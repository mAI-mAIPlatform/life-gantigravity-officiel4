/**
 * Chapitre 5 - Agent (L'Infiltré)
 */
export class AdventureAgentC5 {
    constructor() { this.name = "Jax"; this.role = "Ex-Sécurité Life-Corp"; }
    getInitialDialogue() {
        return {
            name: this.name, role: this.role,
            text: "Ils vont transférer des serveurs de données. Intercepte le convoi.",
            options: [{ text: "Je suis prêt.", callback: () => window.app.adventureManager.startChapter(5) }]
        };
    }
}
