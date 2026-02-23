/**
 * Chapitre 4 - Agent (Le Collectionneur)
 */
export class AdventureAgentC4 {
    constructor() { this.name = "Vesper"; this.role = "Collectionneur d'Art"; }
    getInitialDialogue() {
        return {
            name: this.name, role: this.role,
            text: "Un NFT physique a été dérobé. Il se trouve quelque part dans le District Core. Récupère-le.",
            options: [{ text: "Bien reçu.", callback: () => window.app.adventureManager.startChapter(4) }]
        };
    }
}
