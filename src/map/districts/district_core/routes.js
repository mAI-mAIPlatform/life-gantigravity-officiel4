import * as THREE from 'three';

/**
 * Génère le tracé routier complexe du District Core.
 * @param {THREE.Scene} scene - La scène Three.js.
 * @returns {THREE.Group} - Le groupe contenant les routes.
 */
export function createRoutes(scene) {
    console.log("Génération des routes District Core...");
    const routesGroup = new THREE.Group();
    const roadMaterial = new THREE.MeshStandardMaterial({ color: 0x0a0a0a });

    // Grille de centre-ville (Avenues et Rues)
    const roadWidth = 20;
    const gridSize = 4;
    const spacing = 200;

    for (let i = -gridSize; i <= gridSize; i++) {
        // Vertical Roads
        const roadVGeo = new THREE.PlaneGeometry(roadWidth, 2000);
        const roadV = new THREE.Mesh(roadVGeo, roadMaterial);
        roadV.rotation.x = -Math.PI / 2;
        roadV.position.set(i * spacing, 0.05, 0);
        roadV.receiveShadow = true;
        routesGroup.add(roadV);

        // Horizontal Roads
        const roadHGeo = new THREE.PlaneGeometry(2000, roadWidth);
        const roadH = new THREE.Mesh(roadHGeo, roadMaterial);
        roadH.rotation.x = -Math.PI / 2;
        roadH.position.set(0, 0.06, i * spacing);
        roadH.receiveShadow = true;
        routesGroup.add(roadH);
    }

    scene.add(routesGroup);
    return routesGroup;
}
