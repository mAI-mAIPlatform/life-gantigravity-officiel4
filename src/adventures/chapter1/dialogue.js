/**
 * Chapitre 1 - Dialogue (Arborescence)
 */
export const AdventureDialogueC1 = {
    steps: {
        intro: {
            text: "Parfait. Le premier secret est simple : une puce de données est cachée au sommet d'un gratte-ciel du District Core. Trouve-la avant que la corpo ne s'en rende compte.",
            options: [
                { text: "J'y vais de ce pas.", callback: () => console.log("Mission acceptée !") },
                { text: "C'est dangereux ?", callback: () => window.app.dialogueSystem.start(AdventureDialogueC1.steps.danger) }
            ]
        },
        danger: {
            text: "Dans cette ville, même respirer est dangereux. Mais la récompense en vaut la peine. Alors, tu es de la partie ?",
            options: [
                { text: "Compte sur moi.", callback: () => { } }
            ]
        }
    }
};
