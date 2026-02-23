import * as THREE from 'three';

/**
 * Génère le tracé routier de test.
 * @param {THREE.Scene} scene - La scène Three.js.
 * @returns {THREE.Group} - Le groupe contenant les routes.
 */
export function createRoutes(scene) {
    console.log("Génération des routes...");
    const routesGroup = new THREE.Group();

    // Route principale (Nord-Sud)
    const roadNSGeo = new THREE.PlaneGeometry(12, 200);
    const roadMaterial = new THREE.MeshStandardMaterial({ color: 0x1a1a1a });
    const roadNS = new THREE.Mesh(roadNSGeo, roadMaterial);
    roadNS.rotation.x = -Math.PI / 2;
    roadNS.position.y = 0.02; // Z-fighting prevention
    roadNS.receiveShadow = true;
    routesGroup.add(roadNS);

    // Route secondaire (Est-Ouest)
    const roadEWGeo = new THREE.PlaneGeometry(200, 12);
    const roadEW = new THREE.Mesh(roadEWGeo, roadMaterial);
    roadEW.rotation.x = -Math.PI / 2;
    roadEW.position.y = 0.025;
    roadEW.receiveShadow = true;
    routesGroup.add(roadEW);

    // Marquage au sol (Lignes blanches)
    const lineGeo = new THREE.PlaneGeometry(0.5, 200);
    const lineMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const line = new THREE.Mesh(lineGeo, lineMaterial);
    line.rotation.x = -Math.PI / 2;
    line.position.y = 0.03;
    routesGroup.add(line);

    scene.add(routesGroup);
    return routesGroup;
}
