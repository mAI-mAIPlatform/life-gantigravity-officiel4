import * as THREE from 'three';
import { NPC } from '../entities/NPC';

export class NPCManager {
    constructor(scene, world, pathfinding) {
        this.scene = scene;
        this.world = world;
        this.pathfinding = pathfinding;
        this.npcs = [];
        this.maxNPCs = 20;
    }

    spawnNPCs() {
        for (let i = 0; i < this.maxNPCs; i++) {
            const pos = new THREE.Vector3(
                (Math.random() - 0.5) * 150,
                0.5,
                (Math.random() - 0.5) * 150
            );
            const npc = new NPC(this.scene, this.world, this.pathfinding, pos);
            this.npcs.push(npc);
        }
        console.log(`Spawned ${this.npcs.length} NPCs.`);
    }

    update(dt) {
        this.npcs.forEach(npc => npc.update(dt));
    }

    checkInteractions(playerPos) {
        this.npcs.forEach(npc => {
            const dist = playerPos.distanceTo(npc.mesh.position);
            if (dist < 3) {
                npc.ai.interact();
            }
        });
    }
}
