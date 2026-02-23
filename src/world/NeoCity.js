import * as THREE from 'three';
import { CityManager } from '../map/cityManager.js';

/**
 * NeoCity : Gestionnaire de la ville.
 * Désormais piloté par le CityManager pour une modularité totale.
 */
export class NeoCity {
    constructor(scene, world) {
        this.scene = scene;
        this.world = world;
        this.cityManager = new CityManager(this.scene, this.world);
    }

    /**
     * Charge la ville via le CityManager.
     */
    async load() {
        console.log('Initialisation de NeoCity (Via CityManager)...');
        await this.cityManager.loadAllDistricts();
        console.log('NeoCity chargée via CityManager.');
        return Promise.resolve();
    }
}
