import { Actor } from "./actor.js";


const PLAYER_JUMP = -300;
const PLAYER_MOVE = 100;


export class Player extends Actor {
    #jumpKey;
    #leftKey;
    #rightKey;

    #startParadox;          // Starts recording a paradox
    #endParadox;            // Ends recording a paradox and/or plays it back
    #recording = false;
    #paradox = null;

    #paradoxActor = null;

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

    playParadox() {
        if (this.#paradoxActor) {
            this.#paradoxActor.die();
        }
        if (this.#paradox) {
            this.#paradoxActor = new Paradox(this.scene, this, this.#paradox, this.#paradox.origin);
            // Reset player position
            this.x = this.#paradox.origin.x;
            this.y = this.#paradox.origin.y;
        }
    }

    paradoxComplete() {
        this.#paradoxActor = false;
    }

    update() {
        this.body.velocity.x = 0;
        if (this.#jumpKey?.isDown) this.jump(PLAYER_JUMP); // Should probably have these values set as character attributes? I.e. jumpSpeed, moveSpeed
        if (this.#leftKey?.isDown) this.move(-PLAYER_MOVE);
        if (this.#rightKey?.isDown) this.move(PLAYER_MOVE);

        if (this.#startParadox?.isDown && !this.#recording) {
            // Start recording player actions
            this.#recording = true;
            this.#paradox = {
                origin: {x: this.x, y: this.y, w: 32, h: 32},
                start: performance.now(),
                actions: [{
                    time: 0,
                    jump: this.#jumpKey?.isDown,
                    left: this.#leftKey?.isDown,
                    right: this.#rightKey?.isDown
                }]
            }
        }

        if (this.#recording) {
            const paradoxTime = performance.now() - this.#paradox.start;
            this.#paradox.actions.push({
                time: paradoxTime,
                jump: this.#jumpKey?.isDown,
                left: this.#leftKey?.isDown,
                right: this.#rightKey?.isDown
            });
            // Paradox max time is 30seconds
            if (paradoxTime >= 30000) {
                this.#recording = false;
            }
        }

        if (this.#endParadox?.isDown) {
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
    #player;
    #paradox;
    #current = 0;
    #paradoxStart;

    constructor(scene, player, paradox, rect) {
        super(scene, rect, 'test-sprite');
        this.#player = player;
        scene.addActor(this);

        this.tint = 0x00FFFF;
        this.alpha = 0.75;

        this.#paradox = paradox;
        this.#paradoxStart = performance.now();
    }

    update() {
        if (this.alive) {
            const paradoxTime = performance.now() - this.#paradoxStart;
            const paradox = this.#paradox;
            const current = this.#current;
            // Get the current action:
            if (paradox.actions[current].time <= paradoxTime) {
                const actions = paradox.actions[current];

                if (actions.jump) this.jump(PLAYER_JUMP); 
                if (actions.left) this.move(-PLAYER_MOVE);
                if (actions.right) this.move(PLAYER_MOVE);

                this.#current++;
                if (this.#current >= paradox.actions.length) {
                    this.#player.paradoxComplete();
                    this.die();
                }
            }
        }
    }
}