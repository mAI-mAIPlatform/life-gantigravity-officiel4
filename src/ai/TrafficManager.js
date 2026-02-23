import { Vehicle } from '../vehicles/Vehicle';

export class TrafficManager {
    constructor(scene, world) {
        this.scene = scene;
        this.world = world;
        this.vehicles = [];
        this.maxVehicles = 20;
    }

    spawnTraffic() {
        for (let i = 0; i < this.maxVehicles; i++) {
            const car = new Vehicle(this.scene, this.world, 'ai');
            // Random scatter
            car.body.position.set(
                (Math.random() - 0.5) * 200,
                5,
                (Math.random() - 0.5) * 200
            );
            this.vehicles.push(car);
        }
    }

    update() {
        this.vehicles.forEach(car => {
            // Simple AI: Drive forward and slight random steering
            car.drive(1, (Math.random() - 0.5) * 0.1);
            car.update();

            // Basic "Keep on road" logic or respawn if too far
            if (car.body.position.y < -10) {
                car.body.position.set((Math.random() - 0.5) * 100, 10, (Math.random() - 0.5) * 100);
                car.body.velocity.set(0, 0, 0);
            }
        });
    }
}
