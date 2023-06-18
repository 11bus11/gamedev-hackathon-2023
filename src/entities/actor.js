
/**
 * Defines an Actor, anything that can interact on the map.
 * Actors should extend this, i.e. traps, pickups, buttons, enemies, the player, etc
 * Methods and values common to all actors should be defined here.
 */
export class Actor extends Phaser.Physics.Arcade.Sprite {

    #scene = null;      // The scene this actor is in
    #spawn = null;      // Original spawn point
    #isAlive = true;    // Is this actor alive?

    #maxDistance = 0;   // If higher than 0 this actor will not move more than maxDistance from it's spawn point

    constructor(scene, rect, image) {
        super(scene, rect.x, rect.y, image);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.#scene = scene;

        this.#spawn = Object.freeze({x: rect.x, y: rect.y});

        this.body.setCollideWorldBounds(true);
        this.body.setSize(rect.w, rect.h);
    }


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

    setColliders(...args) {
        for (const collider of args) {
            this.#scene.physics.add.collider(this, collider);
        }
    }

    disable() {
        this.disableBody(false, false);
    }

    die() {
        this.disable();
        const tween = this.#scene.tweens.add({
            targets: this,
            alpha: 0.3,
            scaleX: 1.5,
            scaleY: 1.5,
            ease: 'Linear',
            duration: 200,
            onComplete: () => this.destroy(true)
        });
        this.#isAlive = false;
    }

    jump(velocity) {
        if (this.#isAlive && this.body.blocked.down) {
          this.body.setVelocityY(velocity);
        }
    }

    move(velocity) {
        if (this.#isAlive) {
            this.body.setVelocityX(velocity);
        }
    }

    update() {}
}