import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export class Vehicle {
    constructor(scene, world, type = 'car') {
        this.scene = scene;
        this.world = world;
        this.type = type;

        this.isPlayerControlled = false;

        this.init();
    }

    init() {
        // Chassis shape
        const chassisShape = new CANNON.Box(new CANNON.Vec3(1, 0.5, 2));
        this.chassisBody = new CANNON.Body({ mass: 1500 });
        this.chassisBody.addShape(chassisShape);
        this.chassisBody.position.set(0, 5, 0);

        // Raycast Vehicle
        this.vehicle = new CANNON.RaycastVehicle({
            chassisBody: this.chassisBody,
            indexForwardAxis: 2,
            indexRightAxis: 0,
            indexUpAxis: 1
        });

        // Wheel options
        const options = {
            radius: 0.4,
            directionLocal: new CANNON.Vec3(0, -1, 0),
            suspensionStiffness: 30,
            suspensionRestLength: 0.3,
            frictionSlip: 1.4,
            dampingRelaxation: 2.3,
            dampingCompression: 4.4,
            maxSuspensionForce: 100000,
            rollInfluence: 0.01,
            axleLocal: new CANNON.Vec3(1, 0, 0),
            chassisConnectionPointLocal: new CANNON.Vec3(1, 1, 0),
            maxSuspensionTravel: 0.3,
            customSlidingRotationalSpeed: -30,
            useCustomSlidingRotationalSpeed: true
        };

        // Add wheels
        const pos = [
            new CANNON.Vec3(-1, 0, 1.5),
            new CANNON.Vec3(1, 0, 1.5),
            new CANNON.Vec3(-1, 0, -1.5),
            new CANNON.Vec3(1, 0, -1.5)
        ];

        pos.forEach(p => {
            options.chassisConnectionPointLocal.copy(p);
            this.vehicle.addWheel(options);
        });

        this.vehicle.addToWorld(this.world);

        // Visuals
        const geometry = new THREE.BoxGeometry(2, 1, 4);
        const material = new THREE.MeshStandardMaterial({
            color: this.type === 'ai' ? 0x999999 : 0xffcc00,
            metalness: 0.8,
            roughness: 0.2
        });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.castShadow = true;
        this.scene.add(this.mesh);

        // Wheel visuals
        this.wheelMeshes = [];
        const wheelGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 12);
        wheelGeo.rotateZ(Math.PI / 2);
        const wheelMat = new THREE.MeshStandardMaterial({ color: 0x333333 });

        for (let i = 0; i < this.vehicle.wheelInfos.length; i++) {
            const wheelMesh = new THREE.Mesh(wheelGeo, wheelMat);
            this.scene.add(wheelMesh);
            this.wheelMeshes.push(wheelMesh);
        }
    }

    update() {
        // Sync visual with physics
        this.mesh.position.copy(this.chassisBody.position);
        this.mesh.quaternion.copy(this.chassisBody.quaternion);

        for (let i = 0; i < this.vehicle.wheelInfos.length; i++) {
            this.vehicle.updateWheelTransform(i);
            const t = this.vehicle.wheelInfos[i].worldTransform;
            this.wheelMeshes[i].position.copy(t.position);
            this.wheelMeshes[i].quaternion.copy(t.quaternion);
        }
    }

    applyInputs(forward, steer, brake) {
        const force = forward * 2000;
        const steerVal = steer * 0.5;
        const brakeVal = brake * 100;

        this.vehicle.applyEngineForce(-force, 2);
        this.vehicle.applyEngineForce(-force, 3);

        this.vehicle.setSteeringValue(steerVal, 0);
        this.vehicle.setSteeringValue(steerVal, 1);

        this.vehicle.setBrake(brakeVal, 0);
        this.vehicle.setBrake(brakeVal, 1);
        this.vehicle.setBrake(brakeVal, 2);
        this.vehicle.setBrake(brakeVal, 3);
    }
}
