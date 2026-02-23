import * as THREE from 'three';
import { getDialogue } from './DialogueDB';

export class AdvancedAI {
    constructor(npc, pathfinding) {
        this.npc = npc;
        this.pathfinding = pathfinding;

        this.states = ['IDLE', 'WANDERING', 'TALKING'];
        this.currentState = 'IDLE';

        this.targetPos = new THREE.Vector3();
        this.path = [];
        this.pathIndex = 0;

        this.timer = 0;
        this.init();
    }

    init() {
        this.setRandomTarget();
    }

    setRandomTarget() {
        // Random point in area (example range)
        this.targetPos.set(
            (Math.random() - 0.5) * 200,
            0,
            (Math.random() - 0.5) * 200
        );

        if (this.pathfinding) {
            this.path = this.pathfinding.findPath(this.npc.mesh.position, this.targetPos);
            this.pathIndex = 0;
        }

        this.currentState = 'WANDERING';
    }

    update(dt) {
        this.timer += dt;

        switch (this.currentState) {
            case 'IDLE':
                if (this.timer > 3) {
                    this.setRandomTarget();
                    this.timer = 0;
                }
                break;

            case 'WANDERING':
                this.moveAlongPath(dt);
                break;

            case 'TALKING':
                // NPC stops to talk
                break;
        }
    }

    moveAlongPath(dt) {
        if (!this.path || this.path.length === 0 || this.pathIndex >= this.path.length) {
            this.currentState = 'IDLE';
            return;
        }

        const target = this.path[this.pathIndex];
        const dist = this.npc.mesh.position.distanceTo(target);

        if (dist < 1) {
            this.pathIndex++;
        } else {
            const dir = new THREE.Vector3().subVectors(target, this.npc.mesh.position).normalize();
            this.npc.mesh.position.addScaledVector(dir, 5 * dt); // Speed 5
            this.npc.mesh.lookAt(target);
        }
    }

    interact() {
        this.currentState = 'TALKING';
        this.timer = 0;
        const dialogue = getDialogue();
        console.log(`NPC says: ${dialogue}`);

        // Show dialogue in UI (this will be handled by a UI system later)
        window.dispatchEvent(new CustomEvent('npc-dialogue', { detail: { text: dialogue } }));

        setTimeout(() => {
            if (this.currentState === 'TALKING') this.currentState = 'IDLE';
        }, 5000);
    }
}
