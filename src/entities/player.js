import { Actor } from "./actor.js";

export class Player extends Actor {
    #jumpKey;
    #leftKey;
    #rightKey;

    constructor(scene, x, y) {
        super(scene, x, y, 'test-sprite');
        this.#jumpKey = this.scene.input.keyboard.addKey('W');
        this.#leftKey = this.scene.input.keyboard.addKey('A');
        this.#rightKey = this.scene.input.keyboard.addKey('D');
        this.body.setSize(32,32);
    }

    update() {

    }
}