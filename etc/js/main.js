import { Scene } from "./scene.js"

function calculateGameSize(aspectRatioWidth, aspectRatioHeight) {
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = aspectRatioWidth / aspectRatioHeight;

    if (windowRatio < gameRatio) {
        return { width: windowWidth, height: windowWidth / gameRatio };
    } else {
        return { width: windowHeight * gameRatio, height: windowHeight };
    }
}
var gameSize = calculateGameSize(16, 9);

const config = {
    type: Phaser.AUTO,
    width: gameSize.width,
    height: gameSize.height,
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
