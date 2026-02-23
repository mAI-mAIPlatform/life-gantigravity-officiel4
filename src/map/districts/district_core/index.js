import { createSol } from './sol.js';
import { createRoutes } from './routes.js';
import { createBuildings } from './buildings.js';
import { createLights } from './lights.js';
import { createCollisions } from './collisions.js';

/**
 * District Core : Le coeur futuriste de la ville.
 */
export class DistrictCore {
    constructor(scene, world) {
        this.scene = scene;
        this.world = world;

        this.sol = null;
        this.routes = null;
        this.buildings = null;
    }

    init() {
        console.log("--- Initialisation District Core ---");

        createLights(this.scene);
        this.sol = createSol(this.scene);
        this.routes = createRoutes(this.scene);
        this.buildings = createBuildings(this.scene);

        createCollisions(this.world, {
            buildings: this.buildings
        });

        console.log("--- District Core Prêt ---");
    }
}
