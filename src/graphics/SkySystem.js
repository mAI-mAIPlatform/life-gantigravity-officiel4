import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

export class SkySystem {
    constructor(scene, directionalLight) {
        this.scene = scene;
        this.sun = directionalLight;
        this.time = 12; // Start at noon
        this.dayDuration = 600; // 10 minutes for a full day cycle

        this.colors = {
            day: new THREE.Color(0x87ceeb),
            night: new THREE.Color(0x0a0a1a),
            sunset: new THREE.Color(0xff4500)
        };

        // Initialize background to avoid null error on update
        this.scene.background = new THREE.Color(this.colors.day);

        this.init();
    }

    init() {
        console.log('Sky System Initialized.');
    }

    update(dt) {
        this.time += (dt / this.dayDuration) * 24;
        if (this.time >= 24) this.time = 0;

        const hour = this.time;
        const sunAngle = (hour / 24) * Math.PI * 2;

        // Sun position
        this.sun.position.x = Math.cos(sunAngle) * 500;
        this.sun.position.y = Math.sin(sunAngle) * 500;

        // Intensity and fog
        if (hour > 6 && hour < 18) {
            // Day
            const factor = Math.sin((hour - 6) / 12 * Math.PI);
            this.sun.intensity = 1.0 + (factor * 0.5);
            this.scene.background.lerpColors(this.colors.sunset, this.colors.day, factor);
            if (this.scene.fog) this.scene.fog.color.copy(this.scene.background);
        } else {
            // Night
            const factor = Math.max(0, Math.sin((hour < 6 ? hour + 6 : hour - 18) / 12 * Math.PI));
            this.sun.intensity = 0.1;
            this.scene.background.lerpColors(this.colors.night, this.colors.sunset, factor);
            if (this.scene.fog) this.scene.fog.color.copy(this.scene.background);
        }

        TWEEN.update();
    }
}
