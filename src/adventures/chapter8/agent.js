/**
 * Chapitre 8 - Agent (Le Chef de Gang)
 */
export class AdventureAgentC8 {
    constructor() { this.name = "Tank"; this.role = "Leader des Cyber-Rats"; }
    getInitialDialogue() {
        return {
            name: this.name, role: this.role,
            text: "Un autre gang a piqué notre territoire. Va leur montrer qui commande au District Core.",
            options: [{ text: "À l'attaque.", callback: () => window.app.adventureManager.startChapter(8) }]
        };
    }
}
/**
 * Chapitre 8 - Legend
 */
export const AdventureLegendC8 = { title: "Guerre des Gangs", difficulty: "Extrême" };
