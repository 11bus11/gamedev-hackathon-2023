
import { dieTween } from "../tweens/tweens.js";

/**
 * Defines an Actor, anything that can interact on the map.
 * Actors should extend this, i.e. traps, pickups, buttons, enemies, the player, etc
 * Methods and values common to all actors should be defined here.
 */
export class Actor extends Phaser.Physics.Arcade.Sprite {

    #scene = null;      // The scene this actor is in
    #spawn = null;      // Original spawn point
    #isAlive = true;    // Is this actor alive?

    #rect = null;       // Bounds rect

    #maxDistance = 0;   // If higher than 0 this actor will not move more than maxDistance from it's spawn point

    constructor(scene, rect, image) {
        super(scene, rect.x, rect.y, image);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.#scene = scene;

        this.#spawn = Object.freeze({ x: rect.x, y: rect.y });

        this.body.setCollideWorldBounds(true);
        this.body.setSize(rect.w, rect.h);

        this.#rect = rect;
    }

    /*
     * Accessors 
     */
    get alive() { return this.#isAlive; }
    get spawn() { return this.#spawn; }

    set maxDistance(val) { this.#maxDistance = val; }
    get maxDistance() { return this.#maxDistance; }

    get blockedLeft() {
        return (
            this.body.blocked.left ||
            (
                !this.#maxDistance ? false :
                    this.x < this.#spawn.x - this.#maxDistance
            )

        );
    }

    get blockedRight() {
        return (
            this.body.blocked.right ||
            (
                !this.#maxDistance ? false :
                    this.x > this.#spawn.x + this.#maxDistance
            )
        );
    }

    /*
     * Collision detection
     */
    setColliders(...args) {
        for (const collider of args) {
            this.#scene.physics.add.collider(this, collider);
        }
    }

    /*
     * Animation
     */
    addAnimation(key, sprite, prefix, count, rate) {
        if (!this.scene.anims.exists(key)) {
            this.scene.anims.create({
                key, frameRate: rate,
                frames: this.scene.anims.generateFrameNames(sprite, {
                    prefix, end: count
                })
            });
        }
    }

    playAnimation(key) {
        !this.anims.isPlaying && this.anims.play('time-crystal-idle');
    }

    checkDirection() {
        if (this.body.velocity.x < 0) {
            this.setScale(-1, 1);
            this.body.setOffset(this.#rect.w, 0);
        } else {
            this.setScale(1, 1);
            this.body.setOffset(0, 0);
        }
    }

    /*
     * Actor actions
     */
    jump(velocity) {
        if (this.#isAlive && this.body.blocked.down) {
            this.body.setVelocityY(velocity);
        }
    }

    move(velocity) {
        if (this.#isAlive) {
            this.body.setVelocityX(velocity);
            this.checkDirection();
        }
    }

    /*
     * Lifecycle
     */
    update() { }

    disable() {
        this.disableBody(false, false);
    }

    die(tween = dieTween) {
        this.disable();

        const t = tween(
            this.#scene, this,
            () => this.destroy(true)
        );

        this.#isAlive = false;
    }
}