/**
 * Gère les améliorations de performance moteur.
 */
export class PerformanceUpgrades {
    constructor(vehicle) {
        this.vehicle = vehicle;
    }

    upgradeEngine(level) {
        const multipliers = [1.0, 1.2, 1.5, 2.0];
        this.vehicle.config.enginePower = this.vehicle.config.baseEnginePower * multipliers[level];
        console.log(`Moteur amélioré au niveau ${level}`);
    }
}
