
import { Actor } from "./actor.js";

export class Crystal extends Actor {
    constructor(scene, x, y) {
        super(scene, x, y, 'crystal');
        this.body.setSize(16, 16);
    }
}