import * as THREE from 'three';

/**
 * Gère l'ajout d'éléments visuels comme des ailerons.
 */
export class VisualComponents {
    constructor(vehicle) {
        this.vehicle = vehicle;
        this.components = new Map();
    }

    addSpoiler() {
        const geo = new THREE.BoxGeometry(2.2, 0.1, 0.5);
        const mat = new THREE.MeshStandardMaterial({ color: 0x111111 });
        const spoiler = new THREE.Mesh(geo, mat);
        spoiler.position.set(0, 0.6, -1.8);
        this.vehicle.mesh.add(spoiler);
        this.components.set('spoiler', spoiler);
    }

    removeComponent(name) {
        const comp = this.components.get(name);
        if (comp) {
            this.vehicle.mesh.remove(comp);
            this.components.delete(name);
        }
    }
}
