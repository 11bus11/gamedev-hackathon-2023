import { Example } from "./scenes/example";

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
  scene: Example,
};

const game = new Phaser.Game(config);
