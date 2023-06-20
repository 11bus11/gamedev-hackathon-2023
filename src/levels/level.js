
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

    loadSprites(...args) {
        for (const sprite of args) {
            this.load.atlas(sprite.key, sprite.image, sprite.atlas);
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

    setupCamera() {
        this.#camera = this.cameras.main;
        this.#camera.setBounds(0, 0, this.#map.widthInPixels, this.#map.heightInPixels);
        this.#camera.startFollow(this.#player);
    }

    createActors(layer, factory, player, callback, context = this) {
        const actors = [];
        const defs = this.#map.getObjectLayer(layer)?.objects;
        if (!defs) return null;

        for (const def of defs) {
            const actor = factory.create(def.type.toLowerCase(), this, calcRect(def));
            if (!actor) continue;
            
            if (def.properties) {
                for (const prop of def.properties) {
                    actor[prop.name] = prop.value;
                }
            }

            actor.setColliders(this.#layers);
            actors.push(actor);
            this.addActor(actor);
        }
        this.physics.add.overlap(player, actors, callback, null, context);
    }

    addActor(actor) {
        if (actor) this.#actors.push(actor);
    }

    updateActors() {
        this.#player.update();
        
        for (const actor of this.#actors) {
            actor.update();
        }
    }

    removeActor(actor) {
        const actors = this.#actors;
        const loc = actors.indexOf(actor);
        const last = actors.length - 1;
        if (loc > -1) {
            // We don't care about order here
            [actors[loc], actors[last]] = [actors[last], actors[loc]];
            actors.pop();
        }
    }
}