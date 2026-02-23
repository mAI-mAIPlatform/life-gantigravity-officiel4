import * as CANNON from 'cannon-es';

/**
 * Gère la création du corps physique (chassis) du véhicule.
 */
export class PhysicsHandler {
    constructor(world, config) {
        this.world = world;
        this.config = config;
        this.body = null;
        this.init();
    }

    init() {
        const shape = new CANNON.Box(new CANNON.Vec3(
            this.config.chassisWidth / 2,
            this.config.chassisHeight / 2,
            this.config.chassisDepth / 2
        ));

        this.body = new CANNON.Body({
            mass: this.config.mass,
            material: new CANNON.Material('vehicleMaterial')
        });

        this.body.addShape(shape);
        this.body.position.set(0, 5, 0);
        this.world.addBody(this.body);
    }

    update() {
        // Logique de stabilisation optionnelle
    }
}
