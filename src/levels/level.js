import { Player } from "../entities/player.js";

export class Level extends Phaser.Scene {

    #mapLayers = [];

    // Resource loading
    loadImages(...args) {
        for (const image of args) {
            this.load.image(image);
        }
    }

}