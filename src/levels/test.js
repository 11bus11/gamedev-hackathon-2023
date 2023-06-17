
export class TestMap extends Phaser.Scene {

    #map = null;
    #tileset = null;
    // Map Layers
    #layers = {
        walls: null,
        spikes: null,
        platforms: null,
        background: null
    }

    #createLayer(name) {
        this.#map.createLayer(name, this.#tileset, 0, 0);
        this.#map.setCollisionByProperty({collides: true});
    }

    preload() {
        this.load.setBaseURL("src/assets/");
        this.load.image({
            key: 'egypt-tiles',
            url: 'tilemaps/egypt-tiles.png'
        });
        this.load.tilemapTiledJSON('test', 'tilemaps/test.json');
    }

    create() {
        this.#map = this.make.tilemap({key: 'test', tileWidth: 16, tileHeight: 16});
        this.#tileset = this.#map.addTilesetImage('egypt-tiles', 'egypt-tiles');

        this.#layers.background = this.#createLayer('background');
        this.#layers.platforms = this.#createLayer('platforms');
        this.#layers.spikes = this.#createLayer('spikes');
        this.#layers.walls = this.#createLayer('walls');
    }
}