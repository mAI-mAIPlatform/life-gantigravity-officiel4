import { PaintSystem } from './PaintSystem.js';
import { PerformanceUpgrades } from './PerformanceUpgrades.js';
import { VisualComponents } from './VisualComponents.js';
import { WheelCustomizer } from './WheelCustomizer.js';

/**
 * Système central de personnalisation du véhicule.
 */
export class Customizer {
    constructor(vehicle) {
        this.vehicle = vehicle;
        this.paint = new PaintSystem(this.vehicle);
        this.performance = new PerformanceUpgrades(this.vehicle);
        this.visuals = new VisualComponents(this.vehicle);
        this.wheels = new WheelCustomizer(this.vehicle);
    }

    applyFullKit(kitName) {
        console.log(`Application du kit: ${kitName}`);
        // Logique pour appliquer un preset complet
    }
}
