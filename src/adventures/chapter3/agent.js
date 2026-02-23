/**
 * Chapitre 3 - Agent (Le Marchand de l'Ombre)
 */
export class AdventureAgentC3 {
    constructor() {
        this.name = "Silas";
        this.role = "Contrebandier";
    }

    getInitialDialogue() {
        return {
            name: this.name,
            role: this.role,
            text: "Pssst... Tu cherches du matos de pointe ? J'ai ce qu'il te faut, mais il me manque une caisse perdue lors d'un accident.",
            options: [
                { text: "Où ça ?", callback: () => window.app.adventureManager.startChapter(3) }
            ]
        };
    }
}
