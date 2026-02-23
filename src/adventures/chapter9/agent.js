/**
 * Chapitre 9 - Agent (L'Influenceuse)
 */
export class AdventureAgentC9 {
    constructor() { this.name = "Luna"; this.role = "Star de VIBS"; }
    getInitialDialogue() {
        return {
            name: this.name, role: this.role,
            text: "Mes fans veulent du spectacle ! Fais un saut de 50 mètres avec ta voiture devant le bâtiment Life-Corp.",
            options: [{ text: "C'est parti pour le show !", callback: () => window.app.adventureManager.startChapter(9) }]
        };
    }
}
/**
 * Chapitre 9 - Legend
 */
export const AdventureLegendC9 = { title: "Grand Saut", difficulty: "Cascade" };
