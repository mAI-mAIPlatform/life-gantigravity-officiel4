/**
 * Chapitre 1 - Agent (Le Mentor du District Core)
 */
export class AdventureAgentC1 {
    constructor() {
        this.name = "Kael";
        this.role = "Ex-Pilote de Drift";
    }

    getInitialDialogue() {
        return {
            name: this.name,
            role: this.role,
            text: "Hé toi ! T'as l'air de savoir tenir un volant. NeoCity cache des secrets sous ses néons. Tu veux voir ce que les gratte-ciels ne montrent pas ?",
            options: [
                { text: "Je t'écoute.", callback: () => window.app.adventureManager.startChapter(1) },
                { text: "Pas le temps.", callback: () => { } }
            ]
        };
    }
}
