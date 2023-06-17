import { TestMap } from "./levels/test.js";

const config = {
  scale: {
    mode: Phaser.Scale.FIT,
  },
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: TestMap,
};

const game = new Phaser.Game(config);
