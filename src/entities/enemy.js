import { Actor } from "./actor.js";
import Factory from "../utils/factory.js";

export default class Enemies extends Factory {}

Enemies.register(
    class Viking extends Actor {
        #dir = -100;

        constructor(scene, x, y) {
            super(scene, x, y, 'test-viking');
        }

        update() {
            if (this.alive) {
                if (this.body.blocked.left) {
                    this.#dir = 100;
                }
                if (this.body.blocked.right) {
                    this.#dir = -100;
                }
                this.move(this.#dir);
                if (!this.body.blocked.down) {
                    this.#dir *= -1;
                    this.move(this.#dir);
                }
            }
        }
    }
);

