/**
 * Chapitre 6 - Agent (Le Chimiste)
 */
export class AdventureAgentC6 {
    constructor() { this.name = "Dimitri"; this.role = "Marchand de Bio-Néon"; }
    getInitialDialogue() {
        return {
            name: this.name, role: this.role,
            text: "Mes fleurs néon se fanent. Apporte-moi l'engrais spécial qui se trouve dans le District Est.",
            options: [{ text: "Je m'en occupe.", callback: () => window.app.adventureManager.startChapter(6) }]
        };
    }
}
/**
 * Chapitre 6 - Legend
 */
export const AdventureLegendC6 = { title: "Néon Organique", difficulty: "Facile" };
