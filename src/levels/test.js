import { Player } from "../entities/player.js";


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
    }

    create() {
        this.#map = this.make.tilemap({key: 'test', tileWidth: 16, tileHeight: 16});

        this.#tileset = this.#map.addTilesetImage('egypt-tiles', 'egypt-tiles');

        this.#layers.background = this.#createLayer('background');
        this.#layers.platforms = this.#createLayer('platforms', true);
        this.#layers.walls = this.#createLayer('walls', true);



        const debugGraphics = this.add.graphics().setAlpha(0.7);
        this.#layers.walls.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
        });




        this.#player = new Player(this, 50, 260);
        this.#player.setColliders(this.#layers.platforms, this.#layers.walls);
    }

    update() {
        this.#player.update();
    }
}