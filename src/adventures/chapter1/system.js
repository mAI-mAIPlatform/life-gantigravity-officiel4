/**
 * Chapitre 1 - System (Logique de jeu)
 */
export class AdventureSystemC1 {
    constructor(scene) {
        this.scene = scene;
        this.marker = null;
    }

    init() {
        console.log("Système de mission Chapitre 1 activé.");
        this.spawnObjective();
    }

    spawnObjective() {
        // Placement d'un marqueur visuel au District Core
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshStandardMaterial({ color: 0x00ff88, emissive: 0x00ff88, emissiveIntensity: 5 });
        this.marker = new THREE.Mesh(geometry, material);
        this.marker.position.set(200, 150, 200); // Sommet d'un bâtiment
        this.scene.add(this.marker);
    }
}
