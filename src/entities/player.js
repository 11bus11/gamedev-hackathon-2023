import { Actor } from "./actor.js";

export class Player extends Actor {
    #jumpKey;
    #leftKey;
    #rightKey;

    #startParadox;          // Starts recording a paradox
    #endParadox;            // Ends recording a paradox and/or plays it back
    #recording = false;
    #paradox = null;

    constructor(scene, rect) {
        super(scene, rect, 'test-sprite');
        // Movement
        this.#jumpKey = this.scene.input.keyboard.addKey('W');
        this.#leftKey = this.scene.input.keyboard.addKey('A');
        this.#rightKey = this.scene.input.keyboard.addKey('D');
        // Actions
          // Operate/Use?
          // Fire
        // Paradox
        this.#startParadox = this.scene.input.keyboard.addKey('Q');
        this.#endParadox = this.scene.input.keyboard.addKey('E');
    }

    playParadox() {}

    update() {
        this.body.velocity.x = 0;
        if (this.#jumpKey?.isDown) this.jump(-300); // Should probably have these values set as character attributes? I.e. jumpSpeed, moveSpeed
        if (this.#leftKey?.isDown) this.move(-100);
        if (this.#rightKey?.isDown) this.move(100);

        if (this.#startParadox?.isDown && !this.#recording) {
            // Start recording player actions
            this.#paradox = {
                origin: {x: this.x, y: this.y},
                start: performance.now(),
                actions: [{
                    time: 0,
                    jump: this.#jumpKey?.isDown,
                    left: this.#leftKey?.isDown,
                    right: this.#rightKey?.isDown
                }],
                playing:false
            }
        }

        if (this.#endParadox?.isDown && !this.#endParadox.playing) {
            this.#recording = false;
            this.playParadox();
        }
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

export class Paradox extends Actor {
    constructor(scene, rect) {
        super(scene, rect, 'test-sprite');
    }

    update() {}
}