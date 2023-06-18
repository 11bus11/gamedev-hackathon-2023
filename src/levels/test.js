import { Level } from "./level.js";

import Enemies from "../entities/enemy.js";
import Pickups from "../entities/pickups.js";


export class TestMap extends Level {

    #map = null;
    #tileset = null;
    // Map Layers
    #layers = null;

    // #player = null;
    #enemies = null;
    #pickups = null;

    preload() {
        this.load.setBaseURL("src/assets/");

        this.load.tilemapTiledJSON('test', 'tilemaps/test.json');

        this.loadImages(
            { key: 'egypt-tiles', url: 'tilemaps/egypt-tiles.png'},
            { key: 'test-viking', url: 'characters/viking-head.png' },
            { key: 'test-sprite', url: 'characters/test.png'},
            { key: 'crystal', url: 'items/test-crystal.png' }
        )
    }

    create() {
        [this.#map, this.#tileset, this.#layers] = this.createMap('test', 'egypt-tiles', [
            { name: 'background', collides: false },
            { name: 'platforms', collides: true },
            { name: 'walls', collides: true}
        ], 16);

        this.createPlayer(this.#map);

        this.#enemies = this.createActors(this.#map, 'enemies', Enemies, this.player, this.player.enemyCollision, this.player);
        this.#pickups = this.createActors(this.#map, 'pickups', Pickups, this.player, this.player.getPickup, this.player);
    }

    update() {
        this.updateActors();
    }
}