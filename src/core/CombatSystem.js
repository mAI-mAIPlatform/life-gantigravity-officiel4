import * as THREE from 'three';
import { Weapon } from './Weapon';

export class CombatSystem {
    constructor(scene, world, player) {
        this.scene = scene;
        this.world = world;
        this.player = player;

        this.health = 100;
        this.maxHealth = 100;
        this.weapons = [new Weapon(scene, 'pistol'), new Weapon(scene, 'rifle')];
        this.currentWeaponIndex = 0;

        this.raycaster = new THREE.Raycaster();

        this.init();
    }

    init() {
        console.log('Combat System Initialized');
        this.createHealthUI();

        // Equip first weapon
        if (this.weapons.length > 0) {
            this.weapons[this.currentWeaponIndex].equip(this.player.mesh);
        }

        // Input for shooting
        window.addEventListener('mousedown', (e) => {
            if (e.button === 0) this.shoot();
        });
    }

    createHealthUI() {
        if (document.getElementById('health-ui')) return;
        const healthBar = document.createElement('div');
        healthBar.id = 'health-ui';
        healthBar.className = 'fixed bottom-8 left-8 w-64 h-4 bg-white/10 rounded-full overflow-hidden border border-white/20 z-20';
        healthBar.innerHTML = `<div id="health-fill" class="h-full bg-red-500 transition-all duration-300" style="width: 100%"></div>`;
        document.body.appendChild(healthBar);
    }

    shoot() {
        const weapon = this.weapons[this.currentWeaponIndex];
        if (!weapon) return;

        const info = weapon.fire();

        // Raycast from player center forward
        const direction = new THREE.Vector3(0, 0, -1);
        direction.applyQuaternion(this.player.mesh.quaternion);

        this.raycaster.set(this.player.mesh.position, direction);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);

        if (intersects.length > 0) {
            const hit = intersects[0];
            if (hit.distance <= info.range) {
                console.log('Hit:', hit.object.name || 'Object');
                // Impact visual
                this.createImpact(hit.point);
            }
        }
    }

    createImpact(point) {
        const geo = new THREE.SphereGeometry(0.05);
        const mat = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        const spark = new THREE.Mesh(geo, mat);
        spark.position.copy(point);
        this.scene.add(spark);
        setTimeout(() => this.scene.remove(spark), 200);
    }

    takeDamage(amount) {
        this.health = Math.max(0, this.health - amount);
        this.updateUI();
        if (this.health <= 0) {
            this.die();
        }
    }

    updateUI() {
        const fill = document.getElementById('health-fill');
        if (fill) {
            fill.style.width = `${(this.health / this.maxHealth) * 100}%`;
        }
    }

    die() {
        console.log('Player has died!');
        setTimeout(() => {
            this.health = this.maxHealth;
            this.updateUI();
            this.player.body.position.set(0, 10, 0);
        }, 2000);
    }
}
