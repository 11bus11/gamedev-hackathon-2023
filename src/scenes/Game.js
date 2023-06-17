import Phaser from "../lib/phaser.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  preload() {
    this.load.image();
  }

  create() {
    this.add.image();
  }
}
