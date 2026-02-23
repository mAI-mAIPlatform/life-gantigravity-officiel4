import { Vehicle } from './Vehicle.js';
import { VehicleData } from './VehicleData.js';

/**
 * Usine pour instancier des véhicules.
 */
export class VehicleFactory {
    static create(scene, world, type = 'car') {
        const source = VehicleData[type];

        // Helper pour s'assurer qu'on a un Vec3 valide
        const toVec3 = (v) => {
            if (v && typeof v.clone === 'function') return v.clone();
            return new CANNON.Vec3(v?.x || 0, v?.y || 0, v?.z || 0);
        };

        // Clonage profond ultra-robuste
        const config = {
            ...source,
            wheelOptions: {
                ...source.wheelOptions,
                directionLocal: toVec3(source.wheelOptions.directionLocal),
                axleLocal: toVec3(source.wheelOptions.axleLocal),
                chassisConnectionPointLocal: toVec3(source.wheelOptions.chassisConnectionPointLocal)
            },
            wheelPositions: source.wheelPositions.map(p => toVec3(p))
        };

        return new Vehicle(scene, world, config);
    }
}
