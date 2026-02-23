import * as THREE from 'three';

/**
 * Génère des gratte-ciels géants futuristes pour le District Core.
 * @param {THREE.Scene} scene - La scène Three.js.
 * @returns {THREE.Group} - Le groupe contenant les bâtiments.
 */
export function createBuildings(scene) {
    console.log("Génération des gratte-ciels District Core...");
    const buildingsGroup = new THREE.Group();

    const buildingCount = 50;
    const colors = [0x1a1a2e, 0x16213e, 0x0f3460, 0x533483];

    for (let i = 0; i < buildingCount; i++) {
        // Bâtiments beaucoup plus hauts
        const width = 20 + Math.random() * 30;
        const height = 100 + Math.random() * 400;
        const depth = 20 + Math.random() * 30;

        const geometry = new THREE.BoxGeometry(width, height, depth);
        const material = new THREE.MeshStandardMaterial({
            color: colors[Math.floor(Math.random() * colors.length)],
            roughness: 0.3,
            metalness: 0.6
        });

        const building = new THREE.Mesh(geometry, material);

        // Placement dans les blocs de la grille (entre les routes)
        // Les routes sont tous les 200m. On place entre -400 et 400
        let x = (Math.floor(Math.random() * 10) - 5) * 200 + (Math.random() - 0.5) * 100;
        let z = (Math.floor(Math.random() * 10) - 5) * 200 + (Math.random() - 0.5) * 100;

        building.position.set(x, height / 2, z);
        building.castShadow = true;
        building.receiveShadow = true;

        // Ajout de "fenêtres" lumineuses (Emissive)
        const windowGeo = new THREE.PlaneGeometry(width + 0.2, 2, depth + 0.2);
        const windowMat = new THREE.MeshStandardMaterial({
            color: 0x00ffff,
            emissive: 0x00ffff,
            emissiveIntensity: 2
        });

        // Ajout de quelques bandes lumineuses
        for (let j = 0; j < 5; j++) {
            const stripe = new THREE.Mesh(new THREE.BoxGeometry(width + 0.5, 1, depth + 0.5), windowMat);
            stripe.position.y = (Math.random() - 0.5) * height;
            building.add(stripe);
        }

        buildingsGroup.add(building);
    }

    scene.add(buildingsGroup);
    return buildingsGroup;
}
