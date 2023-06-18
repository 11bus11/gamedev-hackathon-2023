import { Level } from "./level.js";

import { Viking } from "../entities/enemy.js";
import { Crystal } from "../entities/crystal.js";


export class TestMap extends Level {

    #map = null;
    #tileset = null;
    // Map Layers
    #layers = {
        walls: null,
        platforms: null,
        background: null
    }

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

        this.load.image({
            key: 'egypt-tiles',
            url: 'tilemaps/egypt-tiles.png'
        });

        this.load.image({
            key: 'crystal',
            url: 'items/test-crystal.png'
        });
        this.load.tilemapTiledJSON('test', 'tilemaps/test.json');

        this.load.image({
            key: 'test-sprite',
            url: 'characters/test.png'
        });

        this.load.image({
            key: 'test-viking',
            url: 'characters/viking-head.png'
        });
    }

    create() {
        this.#map = this.make.tilemap({key: 'test', tileWidth: 16, tileHeight: 16});

        this.#tileset = this.#map.addTilesetImage('egypt-tiles', 'egypt-tiles');

        this.#layers.background = this.#createLayer('background');
        this.#layers.platforms = this.#createLayer('platforms', true);
        this.#layers.walls = this.#createLayer('walls', true);

        this.#player = new Player(this, 50, 260);
        this.#player.setColliders(this.#layers.platforms, this.#layers.walls, this.#viking);

        this.#viking = new Viking(this, 200, 260, "test-viking");
        this.#viking.setColliders(this.#layers.platforms, this.#layers.walls); // Static colliders

        // Dynamic colliders. Player -> list of enemies, objects etc.
        this.physics.add.overlap(this.#player, this.#viking, this.#player.enemyCollision, null, this.#player);

        const pickupDefs = this.#map.getObjectLayer('pickups');
        const pickups = [];
        for (const def of pickupDefs.objects) {
            const pickup = new Crystal(this, def.x, def.y);
            pickup.setColliders(this.#layers.platforms, this.#layers.walls);
            pickups.push(pickup);
        }
        this.physics.add.overlap(this.#player, pickups, this.#player.getCrystal, null, this.#player);
    }

    update() {
        this.#player.update();
        this.#viking.update();
    }
}