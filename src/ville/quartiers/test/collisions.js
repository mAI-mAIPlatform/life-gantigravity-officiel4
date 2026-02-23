import * as CANNON from 'cannon-es';

/**
 * Gère le moteur physique spécifique au quartier de test.
 * @param {CANNON.World} world - Le monde physique Cannon.js.
 * @param {Object} objects - Les objets du quartier nécessitant des collisions.
 */
export function createCollisions(world, objects) {
    console.log("Initialisation du moteur physique...");

    // Sol physique
    const groundShape = new CANNON.Plane();
    const groundBody = new CANNON.Body({ mass: 0 }); // mass 0 = statique
    groundBody.addShape(groundShape);
    groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
    world.addBody(groundBody);

    // Collisions pour les bâtiments
    if (objects && objects.buildings) {
        objects.buildings.children.forEach(mesh => {
            const size = mesh.geometry.parameters;
            const shape = new CANNON.Box(new CANNON.Vec3(size.width / 2, size.height / 2, size.depth / 2));
            const body = new CANNON.Body({
                mass: 0,
                position: new CANNON.Vec3(mesh.position.x, mesh.position.y, mesh.position.z)
            });
            body.addShape(shape);
            world.addBody(body);
        });
    }
}
