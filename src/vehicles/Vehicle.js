import * as THREE from 'three';
import { PhysicsHandler } from './PhysicsHandler.js';
import { CollisionHandler } from './CollisionHandler.js';
import { RaycastVehicleSetup } from './RaycastVehicleSetup.js';
import { DriftLogic } from './DriftLogic.js';
import { InputManager } from './InputManager.js';
import { EngineAudio } from './EngineAudio.js';
import { Customizer } from './Customizer.js';

/**
 * Orchestrateur principal du véhicule modulaire.
 */
export class Vehicle {
    constructor(scene, world, config) {
        this.scene = scene;
        this.world = world;
        this.config = config;

        this.isActive = false; // Désactivé par défaut (pas d'input joueur)

        // Modules
        this.physics = new PhysicsHandler(this.world, this.config);
        this.raycast = new RaycastVehicleSetup(this.world, this.physics.body, this.config);
        this.drift = new DriftLogic(this);
        this.input = new InputManager(this);
        this.audio = new EngineAudio(this);
        this.customizer = new Customizer(this);
        this.collisions = new CollisionHandler(this);

        this.mesh = this.createVisuals();
    }

    createVisuals() {
        const geo = new THREE.BoxGeometry(
            this.config.chassisWidth,
            this.config.chassisHeight,
            this.config.chassisDepth
        );
        const mat = new THREE.MeshStandardMaterial({ color: this.config.color });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.castShadow = true;
        this.scene.add(mesh);

        // Setup wheels visuals via Raycast Setup
        this.raycast.setupWheelVisuals(this.scene);

        return mesh;
    }

    update(deltaTime) {
        if (this.isActive) {
            this.input.update();
            this.audio.start(); // S'assurer que le moteur tourne
        }

        this.physics.update();
        this.drift.update(deltaTime);
        this.audio.update();

        // Sync visuals
        if (this.mesh && this.physics.body) {
            this.mesh.position.copy(this.physics.body.position);
            this.mesh.quaternion.copy(this.physics.body.quaternion);
            this.raycast.updateWheelVisuals();
        }
    }
}
