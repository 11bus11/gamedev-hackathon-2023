import { Level } from "./level.js";

import Enemies from "../entities/enemy.js";
import Pickups from "../entities/pickups.js";


export class TestMap extends Level {

    preload() {
        this.load.setBaseURL("src/assets/");

        this.load.tilemapTiledJSON('testbig', 'tilemaps/testbig.json');

        this.loadImages(
            { key: 'egypt-tiles', url: 'tilemaps/egypt-tiles.png'},
            { key: 'test-viking', url: 'characters/viking-head.png' },
            { key: 'test-sprite', url: 'characters/test.png'},
            { key: 'crystal', url: 'items/test-crystal.png' }
        )

        this.loadSprites(
            { key: 'time-crystal', image: 'items/time-crystal.png', atlas: 'items/time-crystal.json'}
        );
    }

    create() {
        this.createMap('testbig', 'egypt-tiles', [
            { name: 'background', collides: false },
            { name: 'platforms', collides: true },
            { name: 'walls', collides: true},
        ], 16);

        this.createPlayer();

        this.setupCamera();

        this.createActors('enemies', Enemies, this.player, this.player.enemyCollision, this.player);
        this.createActors('pickups', Pickups, this.player, this.player.getPickup, this.player);
    }

    update() {
        this.updateActors();
    }
}