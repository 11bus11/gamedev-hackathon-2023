
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

    #map = null;
    #tileset = null;
    #layers = [];

    #camera = null;

    #player = null;
    #actors = [];

    /*
     * Accessors
     */
    get map() { return this.#map; }
    get tileset() { return this.#tileset; }
    get layers() { return this.#layers; }
    get camera() { return this.#camera; }
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
    #createMapLayers(layers) {
        for (const def of layers) {
            const layer = this.#map.createLayer(def.name, this.#tileset, 0, 0);
            this.#layers.push(layer);
            if (def.collides) {
                layer.setCollisionByProperty({collides: true});
            }
        }
    }

    createMap(name, tileset, layers, tilesize = 16) {
        this.#map = this.make.tilemap({key: name, tileWidth: tilesize, tileHeight: tilesize});

        this.#tileset = this.#map.addTilesetImage(tileset);

        this.#createMapLayers(layers);

        this.physics.world.setBounds(0, 0, this.#map.widthInPixels, this.#map.heightInPixels);
    }

    createPlayer() {
        // Grab the player spawn point from the map
        const spawn = this.#map.getObjectLayer('player').objects[0];
        this.#player = new Player(this, calcRect(spawn));
        this.#player.setColliders(this.#layers);
        return this.#player;
    }

    createActors(layer, factory, player, callback, context = this) {
        const actors = [];
        const objLayer = this.#map.getObjectLayer(layer);
        if (!objLayer) return null;
        const defs = objLayer.objects;

        for (const def of defs) {
            const actor = factory.create(def.type.toLowerCase(), this, calcRect(def));
            
            if (def.properties) {
                for (const prop of def.properties) {
                    actor[prop.name] = prop.value;
                }
            }

            actor.setColliders(this.#layers);
            actors.push(actor);
        }
        this.physics.add.overlap(player, actors, callback, null, context);

        this.#actors.push(...actors);

        return actors;
    }

    setupCamera() {
        this.#camera = this.cameras.main;
        this.#camera.setBounds(0, 0, this.#map.widthInPixels, this.#map.heightInPixels);
        this.#camera.startFollow(this.#player);
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