import * as THREE from 'three';

/**
 * Génère le sol du District Core (Centre-ville futuriste).
 * @param {THREE.Scene} scene - La scène Three.js.
 * @returns {THREE.Mesh} - Le mesh du sol.
 */
export function createSol(scene) {
    console.log("Génération du sol District Core...");
    // Plus grand que le quartier de test
    const geometry = new THREE.PlaneGeometry(1000, 1000);
    const material = new THREE.MeshStandardMaterial({
        color: 0x111111,
        roughness: 0.9,
        metalness: 0.1
    });
    const sol = new THREE.Mesh(geometry, material);
    sol.rotation.x = -Math.PI / 2;
    sol.receiveShadow = true;
    scene.add(sol);
    return sol;
}
