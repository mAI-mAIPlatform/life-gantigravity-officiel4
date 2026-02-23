import * as THREE from 'three';
import { PhysicsWorld } from '../physics/PhysicsWorld';
import { Player } from '../entities/Player';
import { NeoCity } from '../world/NeoCity';
import { TrafficManager } from '../ai/TrafficManager';
import { EconomyManager } from '../core/EconomyManager';
import { CombatSystem } from '../core/CombatSystem';
import { NPCManager } from '../ai/NPCManager';
import { PathfindingSystem } from '../ai/Pathfinding';
import { SkySystem } from '../graphics/SkySystem';
import { PostProcessingSystem } from '../graphics/PostProcessing';

export class GameEngine {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 30000);
        this.renderer = new THREE.WebGLRenderer({
            antialias: false,
            powerPreference: "high-performance"
        });

        this.physics = new PhysicsWorld();
        this.economy = new EconomyManager();
        this.traffic = new TrafficManager(this.scene, this.physics.world);
        this.pathfinding = new PathfindingSystem();
        this.npcs = new NPCManager(this.scene, this.physics.world, this.pathfinding);

        this.player = null;
        this.combat = null;
        this.city = null;
        this.sky = null;
        this.postProcessing = null;
        this.clock = new THREE.Clock();

        this.init();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowMap;
        this.container.appendChild(this.renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);

        const sun = new THREE.DirectionalLight(0xffffff, 1.2);
        sun.position.set(100, 200, 100);
        sun.castShadow = true;
        sun.shadow.mapSize.set(2048, 2048);
        this.scene.add(sun);

        this.sky = new SkySystem(this.scene, sun);
        this.postProcessing = new PostProcessingSystem(this.scene, this.camera, this.renderer);

        this.player = new Player(this.scene, this.physics.world);
        this.combat = new CombatSystem(this.scene, this.physics.world, this.player);
        this.city = new NeoCity(this.scene, this.physics.world);

        window.addEventListener('resize', () => this.onResize());

        window.addEventListener('player-interact', () => this.handlePlayerInteraction());

        this.animate();
    }

    handlePlayerInteraction() {
        if (!this.player) return;
        let closest = null;
        let minDist = 5;

        this.traffic.vehicles.forEach(car => {
            const dist = this.player.mesh.position.distanceTo(car.mesh.position);
            if (dist < minDist) {
                minDist = dist;
                closest = car;
            }
        });

        if (closest) {
            this.player.enterVehicle(closest);
        }
    }

    async loadWorld() {
        await this.city.load();

        const navMesh = this.scene.getObjectByName('NavMesh');
        if (navMesh) this.pathfinding.setNavMesh(navMesh);

        this.traffic.spawnTraffic();
        this.npcs.spawnNPCs();
    }

    onResize() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
        if (this.postProcessing) this.postProcessing.setSize(w, h);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const deltaTime = Math.min(this.clock.getDelta(), 0.1);

        this.physics.update(deltaTime);
        if (this.traffic) {
            this.traffic.update();
            this.traffic.vehicles.forEach(car => car.update(deltaTime));
        }
        if (this.npcs) {
            this.npcs.update(deltaTime);
            if (this.player && !this.player.isInVehicle) this.npcs.checkInteractions(this.player.mesh.position);
        }
        if (this.sky) this.sky.update(deltaTime);

        if (this.player) {
            if (this.player.isInVehicle && this.player.currentVehicle) {
                const targetPos = this.player.currentVehicle.physics.body.position;
                const camOffset = new THREE.Vector3(0, 10, 20).applyQuaternion(this.player.currentVehicle.physics.body.quaternion);
                this.camera.position.lerp(targetPos.clone().add(camOffset), 0.1);
                this.camera.lookAt(targetPos);
            } else {
                this.player.update();
                const targetPos = this.player.mesh.position;
                const camOffset = new THREE.Vector3(0, 8, 15).applyQuaternion(this.player.mesh.quaternion);
                this.camera.position.lerp(targetPos.clone().add(camOffset), 0.1);
                this.camera.lookAt(targetPos);
            }
        }

        if (this.postProcessing) {
            this.postProcessing.render(deltaTime);
        } else {
            this.renderer.render(this.scene, this.camera);
        }
    }
}
