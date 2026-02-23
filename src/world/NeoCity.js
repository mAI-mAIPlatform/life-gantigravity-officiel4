import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as CANNON from 'cannon-es';

export class NeoCity {
    constructor(scene, world) {
        this.scene = scene;
        this.world = world;
        this.loader = new OBJLoader();
        this.model = null;
    }

    async load() {
        console.log('Loading NeoCity model...');
        return new Promise((resolve, reject) => {
            this.loader.load(
                '/assets/ville.obj',
                (obj) => {
                    this.model = obj;
                    this.model.traverse((child) => {
                        if (child.isMesh) {
                            child.receiveShadow = true;
                            child.castShadow = true;
                            // Add physics for each mesh (Simplified: static box for now or trimesh)
                            this.addPhysics(child);
                        }
                    });
                    this.scene.add(this.model);
                    console.log('NeoCity Loaded');
                    resolve();
                },
                (xhr) => {
                    const progress = (xhr.loaded / xhr.total) * 100;
                    if (window.app) {
                        // Update UI loading bar if exists
                        const bar = document.getElementById('loading-bar');
                        if (bar) bar.style.width = `${progress}%`;
                    }
                },
                (err) => {
                    console.error('Error loading NeoCity:', err);
                    reject(err);
                }
            );
        });
    }

    addPhysics(mesh) {
        // Simple static ground for now if it's too complex
        // In a real game, you'd use a Trimesh or decomposed collision shapes
        const boundingBox = new THREE.Box3().setFromObject(mesh);
        const size = new THREE.Vector3();
        boundingBox.getSize(size);
        const center = new THREE.Vector3();
        boundingBox.getCenter(center);

        const groundBody = new CANNON.Body({
            mass: 0, // static
            shape: new CANNON.Box(new CANNON.Vec3(size.x / 2, size.y / 2, size.z / 2)),
            position: new CANNON.Vec3(center.x, center.y, center.z)
        });
        this.world.addBody(groundBody);
    }
}
