/**
 * Gestionnaire d'entrées clavier pour le véhicule.
 */
export class InputManager {
    constructor(vehicle) {
        this.vehicle = vehicle;
        this.keys = {
            forward: false,
            backward: false,
            left: false,
            right: false,
            handbrake: false
        };

        this.init();
    }

    init() {
        window.addEventListener('keydown', (e) => this.onKey(e.code, true));
        window.addEventListener('keyup', (e) => this.onKey(e.code, false));
    }

    onKey(code, isDown) {
        switch (code) {
            case 'ArrowUp': case 'KeyW': this.keys.forward = isDown; break;
            case 'ArrowDown': case 'KeyS': this.keys.backward = isDown; break;
            case 'ArrowLeft': case 'KeyA': this.keys.left = isDown; break;
            case 'ArrowRight': case 'KeyD': this.keys.right = isDown; break;
            case 'Space': this.keys.handbrake = isDown; break;
        }
    }

    update() {
        const v = this.vehicle.raycast.vehicle;
        const config = this.vehicle.config;

        const engineForce = (this.keys.forward ? -config.enginePower : 0) + (this.keys.backward ? config.enginePower : 0);
        const steerVal = (this.keys.left ? config.maxSteer : 0) + (this.keys.right ? -config.maxSteer : 0);
        const brakeVal = this.keys.handbrake ? config.brakeForce : 0;

        v.applyEngineForce(engineForce, 2);
        v.applyEngineForce(engineForce, 3);
        v.setSteeringValue(steerVal, 0);
        v.setSteeringValue(steerVal, 1);
        v.setBrake(brakeVal, 0);
        v.setBrake(brakeVal, 1);
        v.setBrake(brakeVal, 2);
        v.setBrake(brakeVal, 3);
    }
}
