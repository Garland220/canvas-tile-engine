'use strict';

function Mobile() {
  this.sprite = new SpriteSheet(client.getSprite('human_base.png'));
  this.direction = 0;
  this.frame = 1;
  this.maxFrames;
  this.isPlaying = false;
  this.isFemale = false;
  this.visible = true;
  this.x = 0;
  this.y = 0;

  debug(this.sprite)

  this.draw = function(canvas, size){
    if (this.visible){
      canvas.drawEntity(this, size);
    }
  }

  return this;
}

function Player() {

}