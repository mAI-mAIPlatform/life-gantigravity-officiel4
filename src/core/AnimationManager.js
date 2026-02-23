import * as THREE from 'three';

export class AnimationManager {
    constructor(scene, animations) {
        this.mixer = new THREE.AnimationMixer(scene);
        this.actions = {};
        this.currentAction = null;

        animations.forEach(clip => {
            const action = this.mixer.clipAction(clip);
            this.actions[clip.name.toLowerCase()] = action;
        });
    }

    play(name, duration = 0.5) {
        const action = this.actions[name.toLowerCase()];
        if (!action) return;

        if (this.currentAction === action) return;

        if (this.currentAction) {
            this.currentAction.fadeOut(duration);
        }

        action.reset()
            .setEffectiveTimeScale(1)
            .setEffectiveWeight(1)
            .fadeIn(duration)
            .play();

        this.currentAction = action;
    }

    update(dt) {
        this.mixer.update(dt);
    }
}
