import { VehicleFactory } from '../vehicles/VehicleFactory';

export class TrafficManager {
    constructor(scene, world) {
        this.scene = scene;
        this.world = world;
        this.vehicles = [];
        this.maxVehicles = 10; // Réduit pour test
    }

    spawnTraffic() {
        for (let i = 0; i < this.maxVehicles; i++) {
            const car = VehicleFactory.create(this.scene, this.world, 'car');

            // Placement aléatoire
            car.physics.body.position.set(
                (Math.random() - 0.5) * 300,
                5,
                (Math.random() - 0.5) * 300
            );

            this.vehicles.push(car);
        }
    }

    update() {
        this.vehicles.forEach(car => {
            // Pour l'instant on laisse les voitures d'IA à l'arrêt ou via config
            // car.update(); // Mettre à jour la physique et les visuels

            if (car.physics.body.position.y < -10) {
                car.physics.body.position.set((Math.random() - 0.5) * 100, 10, (Math.random() - 0.5) * 100);
                car.physics.body.velocity.set(0, 0, 0);
            }
        });
    }
}
