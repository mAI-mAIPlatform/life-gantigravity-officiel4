/**
 * Chapitre 7 - Agent (L'Archiviste)
 */
export class AdventureAgentC7 {
    constructor() { this.name = "Oracle"; this.role = "IA de Maintenance"; }
    getInitialDialogue() {
        return {
            name: this.name, role: this.role,
            text: "Des secteurs de ma mémoire sont corrompus. Retrouvez les fragments d'archive dans le Cloud de la ville.",
            options: [{ text: "Initialisation du protocole.", callback: () => window.app.adventureManager.startChapter(7) }]
        };
    }
}
/**
 * Chapitre 7 - Legend
 */
export const AdventureLegendC7 = { title: "Mémoire Vive", difficulty: "Élevée" };
/**
 * Chapitre 7 - Dialogue
 */
export const AdventureDialogueC7 = {
    steps: { intro: { text: "Le Cloud est instable. Ne restez pas trop longtemps connecté.", options: [{ text: "Compris.", callback: () => { } }] } }
};
