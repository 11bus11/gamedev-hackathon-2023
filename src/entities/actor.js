
/**
 * Defines an Actor, anything that can interact on the map.
 * Actors should extend this, i.e. traps, pickups, buttons, enemies, the player, etc
 * Methods and values common to all actors should be defined here.
 */
export class Actor extends Phaser.Physics.Arcade.Sprite {

    #scene = null;
    #isAlive = true;

    constructor(scene, x, y, image) {
        super(scene, x, y, image);
        this.#scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);
        this.body.setSize(32, 32);
    }


    get alive() { return this.#isAlive; }

    setColliders(...args) {
        for (const collider of args) {
            this.#scene.physics.add.collider(this, collider);
        }
    }

    disable() {
        this.disableBody(false, false);
    }

    die() {
        this.#isAlive = false;
        this.destroy(true);
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
}