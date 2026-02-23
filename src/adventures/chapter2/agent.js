/**
 * Chapitre 2 - Agent (La Hackeuse de l'Underground)
 */
export class AdventureAgentC2 {
    constructor() {
        this.name = "Sora";
        this.role = "Cyber-Hackeuse";
    }

    getInitialDialogue() {
        return {
            name: this.name,
            role: this.role,
            text: "Kael m'a dit que tu étais fiable. J'ai besoin de quelqu'un pour injecter ce virus dans le réseau de distribution électrique.",
            options: [
                { text: "Pourquoi ?", callback: () => window.app.dialogueSystem.start(AdventureDialogueC2.steps.why) },
                { text: "Donne-moi ça.", callback: () => window.app.adventureManager.startChapter(2) }
            ]
        };
    }
}
