import * as THREE from 'three';
import { QuartierTest } from '../ville/quartiers/test/index.js';

/**
 * NeoCity : Gestionnaire de la ville.
 * Désormais basé sur une architecture modulaire par quartiers.
 */
export class NeoCity {
    constructor(scene, world) {
        this.scene = scene;
        this.world = world;
        this.quartiers = [];
    }

    /**
     * Charge les quartiers de la ville.
     */
    async load() {
        console.log('Initialisation de NeoCity (Modulaire)...');

        // Chargement du premier quartier de test
        const quartierTest = new QuartierTest(this.scene, this.world);
        quartierTest.init();

        this.quartiers.push(quartierTest);

        console.log('NeoCity Modulaire chargée avec succès.');
        return Promise.resolve();
    }
}
