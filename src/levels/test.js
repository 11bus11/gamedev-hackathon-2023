
import { Player } from "../entities/player.js";
import { Viking } from "../entities/enemy.js";



export class TestMap extends Phaser.Scene {

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
        this.physics.add.collider(this.#player, this.#viking, this.playerEnemyCollision, null, this);
    }

    update() {
        this.#player.update();
        this.#viking.update();
    }
}