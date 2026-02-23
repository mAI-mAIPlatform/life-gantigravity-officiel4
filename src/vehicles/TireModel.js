/**
 * Modèle de pneu et courbes de friction.
 */
export class TireModel {
    constructor(type = 'street') {
        this.type = type;
        this.grip = 1.0;
        this.stiffness = 2.0;
    }

    getFrictionForSurface(surfaceType) {
        const surfaceMods = {
            'asphalt': 1.0,
            'grass': 0.5,
            'sand': 0.3
        };
        return this.grip * (surfaceMods[surfaceType] || 1.0);
    }
}
