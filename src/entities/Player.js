import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export class Player {
    constructor(scene, world) {
        this.scene = scene;
        this.world = world;

        this.speed = 5;
        this.input = { forward: 0, backward: 0, left: 0, right: 0 };

        this.init();
    }

    init() {
        this.isInVehicle = false;
        this.currentVehicle = null;

        // Physics Body (Capsule)
        const radius = 0.5;
        const height = 1.8;
        this.body = new CANNON.Body({
            mass: 1,
            shape: new CANNON.Cylinder(radius, radius, height, 8),
            position: new CANNON.Vec3(0, 5, 0),
            fixedRotation: true
        });
        this.world.addBody(this.body);

        // Visual Mesh
        const geometry = new THREE.CapsuleGeometry(radius, height - radius * 2, 4, 8);
        const material = new THREE.MeshStandardMaterial({ color: 0x00ff88 });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.castShadow = true;
        this.scene.add(this.mesh);

        // Input Listeners
        window.addEventListener('keydown', (e) => this.onKey(e, 1));
        window.addEventListener('keyup', (e) => this.onKey(e, 0));
    }

    onKey(e, value) {
        if (this.isInVehicle && this.currentVehicle) {
            // Forward inputs to vehicle if inside
            return;
        }

        switch (e.code) {
            case 'KeyW': this.input.forward = value; break;
            case 'KeyS': this.input.backward = value; break;
            case 'KeyA': this.input.left = value; break;
            case 'KeyD': this.input.right = value; break;
        }

        if (e.code === 'KeyE' && value === 1) {
            this.handleInteraction();
        }
    }

    handleInteraction() {
        if (this.isInVehicle) {
            this.exitVehicle();
        } else {
            // Check for nearby vehicles (this will be called from GameEngine)
            window.dispatchEvent(new CustomEvent('player-interact'));
        }
    }

    enterVehicle(vehicle) {
        this.isInVehicle = true;
        this.currentVehicle = vehicle;
        this.mesh.visible = false;
        this.body.collisionResponse = false;

        vehicle.isActive = true; // Activer les contrôles et les sons
        console.log('Joueur monté dans le véhicule');
    }

    exitVehicle() {
        if (!this.currentVehicle) return;

        const vehiclePos = this.currentVehicle.physics.body.position;
        this.body.position.set(vehiclePos.x + 3, vehiclePos.y + 1, vehiclePos.z);
        this.body.collisionResponse = true;

        this.currentVehicle.isActive = false; // Désactiver les contrôles

        this.isInVehicle = false;
        this.currentVehicle = null;
        this.mesh.visible = true;
        console.log('Joueur descendu du véhicule');
    }

    update() {
        if (this.isInVehicle && this.currentVehicle) {
            // Sync player position to vehicle
            this.mesh.position.copy(this.currentVehicle.physics.body.position);
            this.body.position.copy(this.currentVehicle.physics.body.position);
            this.body.velocity.set(0, 0, 0);
            return;
        }

        // Movement Logic
        const velocity = new CANNON.Vec3(0, this.body.velocity.y, 0);

        // Calculate direction based on rotation
        const forward = new THREE.Vector3(0, 0, -this.input.forward + this.input.backward);
        const right = new THREE.Vector3(this.input.right - this.input.left, 0, 0);

        const moveDir = new THREE.Vector3().addVectors(forward, right).normalize();

        this.body.velocity.x = moveDir.x * this.speed;
        this.body.velocity.z = moveDir.z * this.speed;

        // Sync Mesh
        this.mesh.position.copy(this.body.position);
    }
}
