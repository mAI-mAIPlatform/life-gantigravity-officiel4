import { Vehicle } from './Vehicle.js';
import { VehicleData } from './VehicleData.js';

/**
 * Usine pour instancier des véhicules.
 */
export class VehicleFactory {
    static create(scene, world, type = 'car') {
        const config = JSON.parse(JSON.stringify(VehicleData[type]));
        return new Vehicle(scene, world, config);
    }
}
