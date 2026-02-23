/**
 * AdventureManager : Orchestrateur des chapitres et du lore.
 */
export class AdventureManager {
    constructor(scene, dialogueSystem) {
        this.scene = scene;
        this.dialogue = dialogueSystem;
        this.currentChapter = 0;
        this.chapters = new Map();
    }

    async init() {
        console.log("Adventure Manager : Chargement des histoires...");
        // Simulation de chargement dynamique
        return Promise.resolve();
    }

    startChapter(id) {
        this.currentChapter = id;
        console.log(`🎬 Démarrage de l'Aventure : Chapitre ${id}`);
        // Logique spécifique par chapitre ici
    }
}
