import { Actor } from "./actor.js";
import { Viking } from "./enemy.js";

export class Player extends Actor {
    #jumpKey;
    #leftKey;
    #rightKey;

    constructor(scene, x, y) {
        super(scene, x, y, 'test-sprite');
        this.#jumpKey = this.scene.input.keyboard.addKey('Space');
        this.#leftKey = this.scene.input.keyboard.addKey('A');
        this.#rightKey = this.scene.input.keyboard.addKey('D');
    }

    update() {
        this.body.velocity.x = 0;
        if (this.#jumpKey?.isDown) this.jump(-200); // Should probably have these values set as character attributes? I.e. jumpSpeed, moveSpeed
        if (this.#leftKey?.isDown) this.move(-100);
        if (this.#rightKey?.isDown) this.move(100);
    }
}