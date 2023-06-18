
import { Actor } from "./actor.js";
import Factory from "../utils/factory.js";

export default class Pickups extends Factory {}

Pickups.register(
    class Crystal extends Actor {
        constructor(scene, rect) {
            super(scene, rect, 'crystal');
            this.addAnimation('time-crystal-idle', 'time-crystal', 'idle-', 3, 8);
        }

        update() {
            if (this.alive) {
                this.playAnimation('time-crystal-idle');
            } 
        }
    }
);