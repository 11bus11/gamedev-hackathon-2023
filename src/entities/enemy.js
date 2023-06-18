import { Actor } from "./actor.js";
import Factory from "../utils/factory.js";

export default class Enemies extends Factory {}

Enemies.register(
    class Viking extends Actor {
        #dir = -50;

        constructor(scene, rect) {
            super(scene, rect, 'test-viking');
        }

        update() {
            if (this.alive) {
                if (this.blockedLeft) {
                    this.#dir = 50;
                }
                if (this.blockedRight) {
                    this.#dir = -50;
                }
                
                this.move(this.#dir);
            }
        }
    }
);

