/**
 * Gère le changement de jantes et de pneus.
 */
export class WheelCustomizer {
    constructor(vehicle) {
        this.vehicle = vehicle;
    }

    changeRims(style) {
        console.log(`Jantes changées pour le style: ${style}`);
        // Logique pour modifier le mesh des roues dans RaycastVehicleSetup
    }
}
