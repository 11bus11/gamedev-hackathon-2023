import { Player } from "../entities/player.js";

export class Level extends Phaser.Scene {

    #mapLayers = [];

    // Resource loading
    loadImages(...args) {
        for (const image of args) {
            this.load.image(image);
        }
    }

    // Map creation
    #createMapLayers(map, tiles, layers) {
        for (const def of layers) {
            const layer =map.createLayer(def.name, tiles, 0, 0);
            this.#mapLayers.push(layer);
            if (def.collides) {
                layer.setCollisionByProperty({collides: true});
            }
        }
    }

    createMap(name, tileset, layers, tilesize = 16) {
        const map = this.make.tilemap({key: name, tileWidth: tilesize, tileHeight: tilesize});

        const tiles = map.addTilesetImage(tileset);

        this.#createMapLayers(map, tiles, layers);
        
        return [map, tiles, this.#mapLayers];
    }

    createPlayer(map) {
        // Grab the player spawn point from the map
        const spawn = map.getObjectLayer('player').objects[0];
        const player = new Player(this, spawn.x, spawn.y);
        player.setColliders(this.#mapLayers);
        return player;
    }
}