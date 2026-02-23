import * as THREE from 'three';

/**
 * Génère des bâtiments de test de manière procédurale.
 * @param {THREE.Scene} scene - La scène Three.js.
 * @returns {THREE.Group} - Le groupe contenant les bâtiments.
 */
export function createBuildings(scene) {
    console.log("Génération des bâtiments...");
    const buildingsGroup = new THREE.Group();

    const buildingCount = 12;
    const colors = [0x777777, 0x888888, 0x666666, 0x999999];

    for (let i = 0; i < buildingCount; i++) {
        const width = 6 + Math.random() * 4;
        const height = 10 + Math.random() * 20;
        const depth = 6 + Math.random() * 4;

        const geometry = new THREE.BoxGeometry(width, height, depth);
        const material = new THREE.MeshStandardMaterial({
            color: colors[Math.floor(Math.random() * colors.length)],
            roughness: 0.5
        });

        const building = new THREE.Mesh(geometry, material);

        // Placement aléatoire sur les bords des routes
        const angle = (i / buildingCount) * Math.PI * 2;
        const dist = 30 + Math.random() * 10;
        building.position.set(
            Math.cos(angle) * dist,
            height / 2,
            Math.sin(angle) * dist
        );

        building.castShadow = true;
        building.receiveShadow = true;
        buildingsGroup.add(building);
    }

    scene.add(buildingsGroup);
    return buildingsGroup;
}
