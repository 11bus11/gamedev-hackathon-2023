import { Actor } from "./actor.js";

export class Viking extends Actor {

    constructor(scene, x, y) {
        super(scene, x, y, 'test-viking');
    }

    update() {
        this.body.setVelosityX(100);
    }
}