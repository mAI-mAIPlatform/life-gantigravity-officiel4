import * as THREE from 'three';

/**
 * Éclairage futuriste District Core.
 * @param {THREE.Scene} scene - La scène Three.js.
 */
export function createLights(scene) {
    console.log("Configuration lumières District Core...");

    // Lumières néon globales
    const ambientLight = new THREE.AmbientLight(0x0a0a2a, 0.4);
    scene.add(ambientLight);

    // Lumière directionnelle (Lune/Soleil artificiel)
    const moonLight = new THREE.DirectionalLight(0x5555ff, 0.8);
    moonLight.position.set(-100, 500, -100);
    moonLight.castShadow = true;
    moonLight.shadow.mapSize.set(4096, 4096);
    scene.add(moonLight);

    // Quelques PointLights pour l'ambiance au sol
    for (let i = 0; i < 5; i++) {
        const light = new THREE.PointLight(0xff00ff, 10, 100);
        light.position.set((Math.random() - 0.5) * 500, 10, (Math.random() - 0.5) * 500);
        scene.add(light);
    }
}
