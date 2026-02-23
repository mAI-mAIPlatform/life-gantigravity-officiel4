import * as CANNON from 'cannon-es';

/**
 * Gère les collisions physiques du District Core.
 * @param {CANNON.World} world - Le monde physique Cannon.js.
 * @param {Object} objects - Les objets du quartier.
 */
export function createCollisions(world, objects) {
    console.log("Initialisation physique District Core...");

    // Sol (Le sol global est déjà là, mais on peut rajouter des spécificités si besoin)
    // Ici on va surtout ajouter les collisions pour les gratte-ciels
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
