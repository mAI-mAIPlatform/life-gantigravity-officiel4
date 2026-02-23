import * as CANNON from 'cannon-es';

/**
 * Contient les configurations par défaut des véhicules.
 */
export const VehicleData = {
    car: {
        mass: 1500,
        chassisWidth: 2,
        chassisHeight: 1,
        chassisDepth: 4,
        color: 0xffcc00,
        enginePower: 2500,
        baseEnginePower: 2500,
        maxSteer: 0.5,
        brakeForce: 100,
        baseFriction: 1.4,
        wheelOptions: {
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
        },
        wheelPositions: [
            new CANNON.Vec3(-1, 0, 1.5),
            new CANNON.Vec3(1, 0, 1.5),
            new CANNON.Vec3(-1, 0, -1.5),
            new CANNON.Vec3(1, 0, -1.5)
        ]
    }
};
