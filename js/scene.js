import { Player } from "./player.js";

var playerImagHeight = 64;
var playerImagWidth = 64;
var configHeight = 0;
var configWidth = 0;

var textStyle = {
    font: "bold 32px Arial",
    fill: "#f00", // 文字顏色
    align: "center", // 對齊方式
    stroke: '#000', // 描邊顏色
    strokeThickness: 3, // 描邊厚度

};

export class Scene extends Phaser.Scene {
    constructor(){
        super({ key : "Scene"});
    }

    preload(){
        configWidth = this.sys.game.config.width;
        configHeight = this.sys.game.config.height;

        this.load.image("initialMap", "images/innitialMap.png");
        this.load.image("player", "images/human.png", { frameWidth: playerImagWidth, frameHeight: playerImagHeight });
    }

    create(){
        let map = this.add.image(0, 0, 'initialMap').setOrigin(0,0);
        map.displayWidth = configWidth;
        map.displayHeight = configHeight;
        map.setDepth(-1);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = new Player(this, configWidth / 8, configHeight - playerImagHeight);

        this.add.text(configWidth / 8 * 1, configHeight / 10, '第一關', textStyle).setOrigin(0.5,0.5);
        this.add.text(configWidth / 8 * 3, configHeight / 10, '第二關', textStyle).setOrigin(0.5,0.5);
        this.add.text(configWidth / 8 * 5, configHeight / 10, '第三關', textStyle).setOrigin(0.5,0.5);
        this.add.text(configWidth / 8 * 7, configHeight / 10, '遊玩紀錄', textStyle).setOrigin(0.5,0.5);
    }

    update(){
        this.player.move(this.cursors);

        if(this.player.y <= configHeight / 6 * 4){
            this.player.setVelocity(0);
            if(this.player.x<=configWidth / 4){
                window.location.href = './game1/game1.html';
            }
            else if(this.player.x<= configWidth / 4 * 2){
                window.location.href = './game2/game2.html';
            }
            else if(this.player.x<=configWidth / 4 * 3){
                window.location.href = './game3/game3.html';
            }
            else{
                window.location.href = './record/record.html';
            }
        }
    }
}