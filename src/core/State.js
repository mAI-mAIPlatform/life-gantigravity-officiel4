export class State {
    constructor() {
        this.status = 'MENU'; // MENU, LOADING, PLAYING, PAUSED
        this.player = {
            health: 100,
            money: 500,
            position: { x: 0, y: 0, z: 0 }
        };
    }

    setStatus(newStatus) {
        this.status = newStatus;
        console.log(`Global Status: ${this.status}`);
    }
}
