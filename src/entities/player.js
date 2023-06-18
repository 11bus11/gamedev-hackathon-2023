import { Actor } from "./actor.js";

export class Player extends Actor {
    #jumpKey;
    #leftKey;
    #rightKey;

    constructor(scene, rect) {
        super(scene, rect, 'test-sprite');
        this.#jumpKey = this.scene.input.keyboard.addKey('W');
        this.#leftKey = this.scene.input.keyboard.addKey('A');
        this.#rightKey = this.scene.input.keyboard.addKey('D');
    }

    update() {
        this.body.velocity.x = 0;
        if (this.#jumpKey?.isDown) this.jump(-250); // Should probably have these values set as character attributes? I.e. jumpSpeed, moveSpeed
        if (this.#leftKey?.isDown) this.move(-100);
        if (this.#rightKey?.isDown) this.move(100);
    }

    getPickup(player, pickup) {
        pickup.die();
        // React to pidkup here :-
    }

    enemyCollision(player, enemy) {
        // Destroys enemy only if player lands on them
        if (enemy.body.touching.up) {
            enemy.die();
        }
        // TODO: Harm player if not jumping on enemy
    }
}