import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export class ModelLoader {
    constructor() {
        this.loader = new GLTFLoader();
        this.cache = new Map();
    }

    async load(url) {
        if (this.cache.has(url)) {
            return this.cache.get(url).clone();
        }

        return new Promise((resolve, reject) => {
            this.loader.load(url, (gltf) => {
                this.cache.set(url, gltf.scene);
                resolve(gltf.scene.clone());
            },
                (xhr) => {
                    // Progress
                },
                (error) => {
                    console.error(`Error loading model: ${url}`, error);
                    reject(error);
                });
        });
    }

    /**
     * Loads a character model with its animations
     */
    async loadCharacter(url) {
        return new Promise((resolve, reject) => {
            this.loader.load(url, (gltf) => {
                resolve({
                    scene: gltf.scene,
                    animations: gltf.animations
                });
            }, undefined, reject);
        });
    }
}
