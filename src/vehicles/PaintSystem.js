/**
 * Gère la peinture et les finitions du véhicule.
 */
export class PaintSystem {
    constructor(vehicle) {
        this.vehicle = vehicle;
    }

    setColor(hex) {
        this.vehicle.mesh.material.color.set(hex);
    }

    setMetallic(val) {
        this.vehicle.mesh.material.metalness = val;
    }
}
