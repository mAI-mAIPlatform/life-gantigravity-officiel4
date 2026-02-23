/**
 * Simule des bruits de moteur réalistes via l'Audio API de Three.js ou Web Audio.
 */
export class EngineAudio {
    constructor(vehicle) {
        this.vehicle = vehicle;
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.oscillator = null;
        this.gainNode = null;
        this.isRunning = false;
    }

    start() {
        if (this.isRunning) return;
        this.oscillator = this.audioCtx.createOscillator();
        this.gainNode = this.audioCtx.createGain();

        this.oscillator.type = 'sawtooth';
        this.oscillator.frequency.setValueAtTime(50, this.audioCtx.currentTime);

        this.gainNode.gain.setValueAtTime(0.1, this.audioCtx.currentTime);

        this.oscillator.connect(this.gainNode);
        this.gainNode.connect(this.audioCtx.destination);

        this.oscillator.start();
        this.isRunning = true;
    }

    update() {
        if (!this.isRunning) return;

        const speed = this.vehicle.physics.body.velocity.length();
        const rpm = 1000 + (speed * 100);
        const pitch = rpm / 20;

        this.oscillator.frequency.setTargetAtTime(pitch, this.audioCtx.currentTime, 0.1);
    }

    playCollisionSound(velocity) {
        // Bruit d'impact synthétique rapide
        const impactOsc = this.audioCtx.createOscillator();
        const impactGain = this.audioCtx.createGain();
        impactOsc.connect(impactGain);
        impactGain.connect(this.audioCtx.destination);

        impactOsc.frequency.setValueAtTime(100, this.audioCtx.currentTime);
        impactGain.gain.setValueAtTime(velocity / 50, this.audioCtx.currentTime);
        impactGain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.5);

        impactOsc.start();
        impactOsc.stop(this.audioCtx.currentTime + 0.5);
    }
}
