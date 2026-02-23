import * as THREE from 'three';

/**
 * Configure l'éclairage spécifique au quartier de test.
 * @param {THREE.Scene} scene - La scène Three.js.
 * @returns {Object} - Références vers les lumières créées.
 */
export function createLights(scene) {
    console.log("Configuration des lumières...");

    const ambientLight = new THREE.AmbientLight(0x404040, 0.6); // Lumière douce partout
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
    sunLight.position.set(50, 100, 50);
    sunLight.castShadow = true;

    // Optimisation des ombres
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 500;
    sunLight.shadow.camera.left = -100;
    sunLight.shadow.camera.right = 100;
    sunLight.shadow.camera.top = 100;
    sunLight.shadow.camera.bottom = -100;

    scene.add(sunLight);

    // Lumière d'appoint pour les zones d'ombre
    const hemLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.3);
    scene.add(hemLight);

    return { ambientLight, sunLight, hemLight };
}
