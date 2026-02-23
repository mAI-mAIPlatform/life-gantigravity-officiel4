import * as THREE from 'three';

export class Weapon {
    constructor(scene, type = 'pistol') {
        this.scene = scene;
        this.type = type;
        this.mesh = null;
        this.isEquipped = false;

        this.config = {
            pistol: { damage: 20, fireRate: 0.5, range: 50, color: 0x333333 },
            rifle: { damage: 35, fireRate: 0.1, range: 100, color: 0x556655 }
        };

        this.init();
    }

    init() {
        const conf = this.config[this.type];
        const geometry = new THREE.BoxGeometry(0.1, 0.2, 0.5);
        const material = new THREE.MeshStandardMaterial({ color: conf.color });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.visible = false;
        this.scene.add(this.mesh);
    }

    equip(parent) {
        this.isEquipped = true;
        this.mesh.visible = true;
        parent.add(this.mesh);
        this.mesh.position.set(0.3, 0.5, 0.5); // Right hand position
    }

    unequip() {
        this.isEquipped = false;
        this.mesh.visible = false;
        if (this.mesh.parent) {
            this.mesh.parent.remove(this.mesh);
        }
    }

    fire(raycaster) {
        console.log(`Firing ${this.type}!`);
        // We'll handle hit detection in the CombatSystem
        const conf = this.config[this.type];
        return {
            damage: conf.damage,
            range: conf.range
        };
    }
}
