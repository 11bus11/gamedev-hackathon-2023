import { Level } from "./level.js";

import { Viking } from "../entities/enemy.js";
import { Crystal } from "../entities/crystal.js";


export class TestMap extends Level {

    #map = null;
    #tileset = null;
    // Map Layers
    #layers = null;

    #player = null;
    #viking = null;

    #createLayer(name, collides = false) {
        const layer = this.#map.createLayer(name, this.#tileset, 0, 0);
        if (collides) {
            layer.setCollisionByProperty({collides: true});
        }
        return layer;
    }

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

        this.#player = this.createPlayer(this.#map);

        this.#viking = new Viking(this, 200, 260, "test-viking");
        this.#viking.setColliders(...this.#layers); // Static colliders

        // Dynamic colliders. Player -> list of enemies, objects etc.
        this.physics.add.overlap(this.#player, this.#viking, this.#player.enemyCollision, null, this.#player);

        const pickupDefs = this.#map.getObjectLayer('pickups');
        const pickups = [];
        for (const def of pickupDefs.objects) {
            const pickup = new Crystal(this, def.x, def.y);
            pickup.setColliders(...this.#layers);
            pickups.push(pickup);
        }
        this.physics.add.overlap(this.#player, pickups, this.#player.getCrystal, null, this.#player);
    }

    update() {
        this.#player.update();
        this.#viking.update();
    }
}