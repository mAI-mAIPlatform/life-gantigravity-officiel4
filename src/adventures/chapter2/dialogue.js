/**
 * Chapitre 2 - Dialogue (Arborescence)
 */
export const AdventureDialogueC2 = {
    steps: {
        why: {
            text: "Ils nous font payer l'air qu'on respire. Une petite panne générale leur rappellera qui fait tourner cette ville.",
            options: [
                { text: "Je marche.", callback: () => window.app.adventureManager.startChapter(2) }
            ]
        }
    }
};
