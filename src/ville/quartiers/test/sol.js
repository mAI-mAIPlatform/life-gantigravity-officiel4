import * as THREE from 'three';

/**
 * Génère le sol de base du quartier de test.
 * @param {THREE.Scene} scene - La scène Three.js.
 * @returns {THREE.Mesh} - Le mesh du sol.
 */
export function createSol(scene) {
    console.log("Génération du sol...");
    const geometry = new THREE.PlaneGeometry(200, 200);
    const material = new THREE.MeshStandardMaterial({ 
        color: 0x444444,
        roughness: 0.8,
        metalness: 0.2
    });
    const sol = new THREE.Mesh(geometry, material);
    sol.rotation.x = -Math.PI / 2;
    sol.receiveShadow = true;
    scene.add(sol);
    return sol;
}
