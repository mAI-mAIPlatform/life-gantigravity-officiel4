import * as THREE from 'three';
import { EffectComposer, RenderPass, BloomEffect, EffectPass, BrightnessContrastEffect, SelectiveBloomEffect } from 'postprocessing';

export class PostProcessingSystem {
    constructor(scene, camera, renderer) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;

        this.composer = new EffectComposer(renderer);
        this.init();
    }

    init() {
        this.composer.addPass(new RenderPass(this.scene, this.camera));

        const bloom = new BloomEffect({
            intensity: 1.5,
            luminanceThreshold: 0.1,
            luminanceSmoothing: 0.9,
            height: 480
        });

        const effectPass = new EffectPass(this.camera, bloom);
        this.composer.addPass(effectPass);

        console.log('Post-Processing Initialized (Bloom).');
    }

    render(dt) {
        this.composer.render(dt);
    }

    setSize(width, height) {
        this.composer.setSize(width, height);
    }
}
