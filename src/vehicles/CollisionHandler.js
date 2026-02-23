/**
 * Gère les événements de collision et les impacts.
 */
export class CollisionHandler {
    constructor(vehicle) {
        this.vehicle = vehicle;
        this.init();
    }

    init() {
        this.vehicle.physics.body.addEventListener('collide', (e) => {
            const relativeVelocity = e.contact.getImpactVelocityAlongNormal();
            if (Math.abs(relativeVelocity) > 5) {
                this.onHighImpact(relativeVelocity);
            }
        });
    }

    onHighImpact(velocity) {
        console.log(`Impact détecté: ${velocity.toFixed(2)}m/s`);
        // Possibilité d'ajouter des dégâts visuels ici
        this.vehicle.audio?.playCollisionSound?.(velocity);
    }
}
