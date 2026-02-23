import * as CANNON from 'cannon-es';
import * as THREE from 'three';

/**
 * Configuration du RaycastVehicle et des roues.
 */
export class RaycastVehicleSetup {
    constructor(world, chassisBody, config) {
        this.world = world;
        this.chassisBody = chassisBody;
        this.config = config;

        this.vehicle = new CANNON.RaycastVehicle({
            chassisBody: this.chassisBody,
            indexForwardAxis: 2,
            indexRightAxis: 0,
            indexUpAxis: 1
        });

        this.wheelMeshes = [];
        this.init();
    }

    init() {
        const options = this.config.wheelOptions;
        const positions = this.config.wheelPositions;

        positions.forEach(pos => {
            options.chassisConnectionPointLocal.copy(pos);
            this.vehicle.addWheel(options);
        });

        this.vehicle.addToWorld(this.world);
    }

    setupWheelVisuals(scene) {
        const wheelGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 12);
        wheelGeo.rotateZ(Math.PI / 2);
        const wheelMat = new THREE.MeshStandardMaterial({ color: 0x222222 });

        for (let i = 0; i < this.vehicle.wheelInfos.length; i++) {
            const wheelMesh = new THREE.Mesh(wheelGeo, wheelMat);
            scene.add(wheelMesh);
            this.wheelMeshes.push(wheelMesh);
        }
    }

    updateWheelVisuals() {
        for (let i = 0; i < this.vehicle.wheelInfos.length; i++) {
            this.vehicle.updateWheelTransform(i);
            const t = this.vehicle.wheelInfos[i].worldTransform;
            this.wheelMeshes[i].position.copy(t.position);
            this.wheelMeshes[i].quaternion.copy(t.quaternion);
        }
    }
}
