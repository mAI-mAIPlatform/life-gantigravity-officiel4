import { QuartierTest } from '../ville/quartiers/test/index.js';
import { DistrictCore } from './districts/district_core/index.js';

/**
 * CityManager : Orchestrateur central de tous les quartiers.
 * Gère le chargement et la connexion des différents segments de la ville.
 */
export class CityManager {
    constructor(scene, world) {
        this.scene = scene;
        this.world = world;
        this.districts = new Map();
    }

    /**
     * Charge tous les quartiers de la ville.
     */
    async loadAllDistricts() {
        console.log("🏙️ City Manager : Démarrage du chargement de la ville...");

        // 1. Quartier de Test (Déjà existant)
        const qTest = new QuartierTest(this.scene, this.world);
        qTest.init();
        this.districts.set('test', qTest);

        // 2. District Core (La nouvelle zone futuriste)
        const dCore = new DistrictCore(this.scene, this.world);
        dCore.init();
        this.districts.set('core', dCore);

        console.log("🏙️ City Manager : Ville entièrement chargée.");
        return Promise.resolve();
    }

    /**
     * Récupère un district par son nom.
     */
    getDistrict(name) {
        return this.districts.get(name);
    }
}
