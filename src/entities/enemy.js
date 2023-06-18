import { Actor } from "./actor.js";

export class Viking extends Actor {

    constructor(scene, x, y) {
        super(scene, x, y, 'test-viking');
        this.body.setSize(32, 32);
    }

    update() {
        this.body.setVelosityX(100);

        this.body.maxDistance = 100;

        function hitEnemy(player) {
            player.disableBody(false, false);
        }
    }
}