
import { Player } from "../entities/player.js";

function calcRect(def) {
    return {
        x: (def.x + def.width / 2),
        y: (def.y + def.height / 2),
        w: def.width,
        h: def.hieght
    };
}

export class Level extends Phaser.Scene {

    #mapLayers = [];

    #player = null;
    #actors = [];

    /*
     * Accessors
     */
    get player() { return this.#player; }
    get actors() { return this.#actors; }

    /*
     * Resource loading
     */
    loadImages(...args) {
        for (const image of args) {
            this.load.image(image);
        }
    }

    /*
     * Creation
     */
    #createMapLayers(map, tiles, layers) {
        for (const def of layers) {
            const layer = map.createLayer(def.name, tiles, 0, 0);
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
        this.#player = new Player(this, calcRect(spawn));
        this.#player.setColliders(this.#mapLayers);
        return this.#player;
    }

    createActors(map, layer, factory, player, callback, context = this) {
        const actors = [];
        const defs = map.getObjectLayer(layer).objects;

        for (const def of defs) {
            const actor = factory.create(def.type.toLowerCase(), this, calcRect(def));
            
            if (def.properties) {
                for (const prop of def.properties) {
                    actor[prop.name] = prop.value;
                }
            }

            actor.setColliders(this.#mapLayers);
            actors.push(actor);
        }
        this.physics.add.overlap(player, actors, callback, null, context);

        this.#actors.push(...actors);

        return actors;
    }

    /*
     * Updates
     */
    updateActors() {
        this.#player.update();
        
        for (const actor of this.#actors) {
            actor.update();
        }
    }
}