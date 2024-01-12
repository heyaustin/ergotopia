import { Scene } from "./scene.js"

const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 600,
    parent: 'app',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [ Scene ]
}

const game = new Phaser.Game(config);
