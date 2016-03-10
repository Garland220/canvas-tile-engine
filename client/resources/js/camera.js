
function Camera(map, canvas) {
  this.x = 0;
  this.y = 0;
  this.zoom = 1.0;

  this.map = map;

  this.width = function() { return columns * 32; }
  this.height = function() { return rows * 32; }

  this.columns = function(){
    var col = Math.ceil(this.width() / (this.map.tileSize * this.zoom));

    if (col > map.width) {
      col = map.width;
    }

    return col;
  };

  this.rows = function(){
    var row = Math.ceil(this.height() / (this.map.tileSize * this.zoom));
    if (row > map.height)
      row = map.height;
    return row;
  };

  // follow: function(entity) {
  //   this.pos.x = this.move('x', entity.pos.x, entity.size.x );
  //   this.pos.y = this.move('y', entity.pos.y, entity.size.y );

  //   ig.game.screen.x = this.pos.x;
  //   ig.game.screen.y = this.pos.y;
  // },

  this.draw = function(canvas, clear){
    if (!grid.active)
      return;

    if (clear) {
      canvas.clearRect(0, 0, this.width, this.height);
    }

    this.map.draw(canvas, this.x, this.y, this.rows(), this.columns(), this.zoom);
  }

  return this;
}