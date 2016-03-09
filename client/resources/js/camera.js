
function Camera(map,canvas) {
  this.x = 0;
  this.y = 0;
  this.zoom = 1.0;

  this.map = map;

  // this.width = function() { return $("#gameScreen").width(); }
  // this.height = function() { return $("#gameScreen").height(); }
  this.width = function() { return 800; }
  this.height = function() { return 600; }

  this.columns = function(){
    var col = Math.ceil(this.width() / (this.map.tileSize * this.zoom));
    if (col > map.width)
      col = map.width;
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

  this.draw = function(canvas){
    if (!grid.active)
      return;

    canvas.clearRect(0,0,width,height);
    this.map.draw(canvas, this.x, this.y, this.rows(), this.columns(), this.zoom);
  }

  return this;
}