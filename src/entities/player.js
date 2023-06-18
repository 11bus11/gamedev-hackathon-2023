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
    }

    update() {
        this.body.velocity.x = 0;
        if (this.#jumpKey?.isDown) this.jump(-250); // Should probably have these values set as character attributes? I.e. jumpSpeed, moveSpeed
        if (this.#leftKey?.isDown) this.move(-100);
        if (this.#rightKey?.isDown) this.move(100);
    }

    enemyCollision(player, enemy) {
        // Destroys enemy only if player lands on them
        if (enemy.body.touching.up) {
            enemy.disable();
            const tween = this.scene.tweens.add({
                targets: enemy,
                alpha: 0.3,
                scaleX: 1.5,
                scaleY: 1.5,
                ease: 'Linear',
                duration: 200,
                onComplete: () => enemy.die()
            });
        }
        // TODO: Harm player if not jumping on enemy
    }
}