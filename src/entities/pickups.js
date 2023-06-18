
import { Actor } from "./actor.js";
import Factory from "../utils/factory.js";

export default class Pickups extends Factory {}

Pickups.register(
    class Crystal extends Actor {
        constructor(scene, x, y) {
            super(scene, x, y, 'crystal');
            this.body.setSize(16, 16);
        }
    }
);