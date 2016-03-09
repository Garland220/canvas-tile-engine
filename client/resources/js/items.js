function Item(){
  this.name = "Sample Item";
  this.sprite = new SpriteSheet(client.getSprite("items_3.png"));
  this.sprite.tileSize = 16;
  this.frame = 12;
  this.x = 0;
  this.y = 0;
  this.visible = true;

  this.draw = function(canvas, size){
    if (this.visible){
      canvas.drawEntity(this, size);
    }
  }

  return this;
}