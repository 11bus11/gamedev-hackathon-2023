/**
 * Base class for game levels
 */
export class LevelScene extends Phaser.Scene {
    // Tiled map
    #map = null;        // Phaser Map object
    #tileset = null;    // Phaser tile set
    #layers = {};       // Phaser map layers
    // Actors
    #player = null;     // Player object
    #enemies = [];      // List of enemy objects
    #pickups = [];      // List of pickups

    // Loaders
    loadMap(key, url) { this.load.tilemapTiledJSON(key, url); }
    loadImage(key, url) { this.load.image({key, url}); }

    // Creation
    #createMapLayer(name, collides = false) {
        this.#layers[name] = this.#map.createLayer(name, this.#tileset, 0, 0);
        if (collides) {
            this.#layers[name].setCollisionByProperty({ collides: true });
        }
    }

    _setMapLayers(...args) {
        for (const layer of args) {
            this.#createMapLayer(layer.name, layer.collides);
        }
    }

    // Accessors
    get map() { return this.#map; }
    get tileset() { return this.#tileset; }
    get mapLayers() { return this.#layers; }
    get player() { return this.#player; }
    get enemies() { return this.#enemies; }
    get pickups() { return this.#pickups; }

}