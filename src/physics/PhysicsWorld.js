import * as CANNON from 'cannon-es';

export class PhysicsWorld {
    constructor() {
        this.world = new CANNON.World();
        this.world.gravity.set(0, -9.82, 0);
        this.world.broadphase = new CANNON.SAPBroadphase(this.world);
        this.world.defaultContactMaterial.friction = 0.4;

        console.log('Physics World Initialized');
    }

    update(deltaTime) {
        this.world.step(1 / 60, deltaTime, 3);
    }
}
