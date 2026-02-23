import { createSol } from './sol.js';
import { createRoutes } from './routes.js';
import { createBuildings } from './buildings.js';
import { createLights } from './lights.js';
import { createCollisions } from './collisions.js';

/**
 * Assembler du Quartier de Test.
 * Centralise la création de tous les éléments du quartier.
 */
export class QuartierTest {
    constructor(scene, world) {
        this.scene = scene;
        this.world = world;

        this.sol = null;
        this.routes = null;
        this.buildings = null;
        this.lights = null;
    }

    /**
     * Initialise tous les composants du quartier.
     */
    init() {
        console.log("--- Construction du Quartier de Test ---");

        // 1. Lumières
        this.lights = createLights(this.scene);

        // 2. Géométrie
        this.sol = createSol(this.scene);
        this.routes = createRoutes(this.scene);
        this.buildings = createBuildings(this.scene);

        // 3. Physique
        createCollisions(this.world, {
            buildings: this.buildings
        });

        console.log("--- Quartier de Test Terminé ---");
    }
}
