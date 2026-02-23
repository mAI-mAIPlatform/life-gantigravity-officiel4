import * as THREE from 'three';
import { Pathfinding } from 'three-pathfinding';

export class PathfindingSystem {
    constructor() {
        this.pathfinding = new Pathfinding();
        this.zoneName = 'city';
        this.navMesh = null;
    }

    setNavMesh(mesh) {
        this.navMesh = mesh;
        this.pathfinding.setZoneData(this.zoneName, Pathfinding.createZone(mesh.geometry));
        console.log('NavMesh initialized for Pathfinding.');
    }

    findPath(startPos, endPos) {
        const groupID = this.pathfinding.getGroup(this.zoneName, startPos);
        const path = this.pathfinding.findPath(startPos, endPos, this.zoneName, groupID);
        return path;
    }

    getClosestNode(position) {
        return this.pathfinding.getClosestNode(position, this.zoneName, this.pathfinding.getGroup(this.zoneName, position));
    }
}
