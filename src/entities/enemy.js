import { Actor } from "./actor.js";

export class Viking extends Actor {

    constructor(scene, x, y) {
        super(scene, x, y, 'test-viking');
        this.body.setSize(12,32);
    }

    update() {
        
    } 
}