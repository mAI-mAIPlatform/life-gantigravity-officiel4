import * as THREE from 'three';
import { AdvancedAI } from '../ai/AdvancedAI';

export class NPC {
    constructor(scene, world, pathfinding, position) {
        this.scene = scene;
        this.world = world;
        this.pathfinding = pathfinding;

        this.init(position);
    }

    init(position) {
        // Visual (Placeholder refined capsule)
        const geometry = new THREE.CapsuleGeometry(0.4, 1.0, 4, 8);
        const material = new THREE.MeshStandardMaterial({
            color: Math.random() * 0xffffff,
            roughness: 0.7,
            metalness: 0.1
        });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.copy(position);
        this.mesh.castShadow = true;
        this.scene.add(this.mesh);

        // AI
        this.ai = new AdvancedAI(this, this.pathfinding);
    }

    update(dt) {
        if (this.ai) this.ai.update(dt);
    }
}
