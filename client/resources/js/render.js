
CanvasRenderingContext2D.prototype.drawEntity = function(entity, size){
  var x = entity.x - grid.camera.x;
  var y = entity.y - grid.camera.y;

  var endX = grid.camera.x + grid.camera.columns();
  var endY = grid.camera.y + grid.camera.rows();

  if (x >= 0 && y >= 0 && x <= endX && y <= endY){
    this.drawSprite(entity.sprite, entity.frame, size, x, y, grid.camera.zoom);
  }
}

CanvasRenderingContext2D.prototype.drawSprite = function(sprite, frame, size, x, y){
  var tileSize = sprite.tileSize;
  var rows = Math.ceil(sprite.image.height / (tileSize));
  var columns = Math.ceil(sprite.image.width / (tileSize));
  var row = Math.floor(frame / columns);
  frame = frame - (row * columns);

  if (sprite.image != 'undefined' && (sprite.image.src != null) && (sprite.image.src != 'undefined')){
    this.drawImage(sprite.image, (tileSize * frame), (tileSize * row), tileSize, tileSize, (x * size), (y * size), size, size);
  }
  else{
    this.fillStyle = '#ccc';
    this.fillRect(x * size, y * size, size, size);
  }
}

CanvasRenderingContext2D.prototype.drawTile = function(tilemap, tileId, size, x, y){
  var tileSize = tilemap.tileSize;
  var rows = Math.ceil(tilemap.image.height / (tileSize));
  var columns = Math.ceil(tilemap.image.width / (tileSize));
  var row = Math.floor(tileId / columns);
  tileId = tileId - (row * columns);

  if (tilemap.image != 'undefined' && (tilemap.image.src != null) && (tilemap.image.src != 'undefined')){
    this.drawImage(tilemap.image, (tileSize * tileId), (tileSize * row), tileSize, tileSize, (x * size), (y * size), size, size);
  }
  else{
    this.fillStyle = '#ccc';
    this.fillRect(x * size, y * size, size, size);
  }
}

function RenderChunk() {

}

/*XFrame.prototype.draw = function(ctx, x, y) {
   ctx.save();
   ctx.transform(this.m11, this.m12, this.m21, this.m22, this.dx+x, this.dy+y);
   ctx.drawImage(this.imageSource, (this.cellIndex % this.graphicSheet.columns) * this.graphicSheet.cellWidth,
      Math.floor(this.cellIndex / this.graphicSheet.columns) * this.graphicSheet.cellHeight,
      this.graphicSheet.cellWidth, this.graphicSheet.cellHeight, 0, 0, this.graphicSheet.cellWidth, this.graphicSheet.cellHeight);
   ctx.restore();
};*/
