/**
 * Chapitre 10 - Agent (Le Créateur)
 */
export class AdventureAgentC10 {
    constructor() { this.name = "Zéro"; this.role = "Le Premier Hackeur"; }
    getInitialDialogue() {
        return {
            name: this.name, role: this.role,
            text: "Tu as parcouru un long chemin. Il est temps de démanteler le protocole final. Es-tu prêt pour la fin ?",
            options: [{ text: "Je suis prêt.", callback: () => window.app.adventureManager.startChapter(10) }]
        };
    }
}
/**
 * Chapitre 10 - Legend
 */
export const AdventureLegendC10 = { title: "Démantèlement", difficulty: "Légendaire" };
