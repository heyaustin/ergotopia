export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, "player");
      this.scene = scene;
      scene.add.existing(this);
      scene.physics.world.enable(this);
      this.setCollideWorldBounds(true); 
    }

    move(cursors){
      this.stop();
      if (cursors.left.isDown) {
          this.setVelocityX(-160);
      }
      else if (cursors.right.isDown) {
          this.setVelocityX(160);
      }
  
      if (cursors.up.isDown) {
          this.setVelocityY(-160);
      }
      else if (cursors.down.isDown) {
          this.setVelocityY(160);
      }

      console.log(this.x, this.y)

    }

    stop(){
      this.setVelocity(0);
    }
}