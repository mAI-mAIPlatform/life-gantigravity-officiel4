/**
 * Logique avancée de drift et de glisse latérale.
 */
export class DriftLogic {
    constructor(vehicle) {
        this.vehicle = vehicle;
        this.driftFactor = 0;
    }

    update(deltaTime) {
        const velocity = this.vehicle.physics.body.velocity;
        const forward = this.vehicle.physics.body.quaternion.vmult(new CANNON.Vec3(0, 0, 1));

        // Calcul de l'angle de dérive
        const dot = velocity.dot(forward);
        const speed = velocity.length();

        if (speed > 5) {
            this.driftFactor = 1 - (Math.abs(dot) / speed);
            if (this.driftFactor > 0.2) {
                this.applyDriftForces();
            }
        }
    }

    applyDriftForces() {
        // Réduction de la friction latérale pour simuler le drift
        const v = this.vehicle.raycast.vehicle;
        v.wheelInfos.forEach((w, i) => {
            w.frictionSlip = this.vehicle.config.baseFriction * (1 - this.driftFactor * 0.5);
        });
    }
}
import * as CANNON from 'cannon-es';
