function Map(tileset) {
  this.id = 0;
  this.name = '';
  this.music = '';
  this.audio;
  this.tileset = new SpriteSheet(client.getTile("desert_2.png"));
  this.tileSize = 32;
  this.tileData = [];
  this.color = "#ccc";

  this.width = 0;
  this.height = 0;
  this.x = 0;
  this.y = 0;

  this.mobiles = [];
  this.items = [];
  this.tiles = [];


  this.load = function(data) {
    server.send('load_map', true);
  }


  this.save = function() {
    server.send('save_map', JSON.stringify({
      id: this.id,
      name: this.name,
      music: this.music,
      tile_set: this.tileset.image.src,
      tile_data: this.tileData
    }));
  }


  this.click = function() {
    var x = grid.mouseX + grid.camera.x,
      y = grid.mouseY + grid.camera.y;

    this.tileData[y][x] = tile;

    this.save();
  }


  this.changeMusic = function(music) {
    this.music = music;

    if (this.audio) {
      this.audio.pause();
      this.audio = undefined;
    }

    this.audio = new Audio('audio/' + this.music);
    this.audio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    this.audio.play();

    window.dispatchEvent(new Event('changemusic'));
  }


  this.showTitle = function(title) {
    element = document.querySelector('.mapTitle')
    element.innerHTML = title;
    element.style.display = 'block';
    setTimeout(function() { element.style.opacity = 1;
      setTimeout(function() { element.style.opacity = 0;
        setTimeout(function() { element.style.display = 'none'; }, 700);
      }, 3500);
    }, 500);
  }


  this.update = function(id, tileData, name, music) {
    var title,
      loopSkip = 5;

    if (music != this.music) {
      this.changeMusic(music);
    }
    if (name != this.name) {
      this.showTitle(name);
    }

    this.id = id;
    this.name = name
    this.tileData = tileData;
    this.width = this.tileData[0].length;
    this.height = this.tileData.length;

    window.dispatchEvent(new Event('mapupdate'));
  }

  this.draw = function(canvas, startX, startY, endY, endX, zoom) {
    if (!(this.width > 0)) {
      return;
    }

    endY = startY + endY;
    endX = startX + endX;

    if (DEBUG){
      var nowTime = new Date();
      var diffTime = Math.ceil((nowTime.getTime() - lastTime.getTime()));

      if (diffTime >= 1000){
        averageFPS = frameCount * 0.9 + fps * 0.1;
        fps = frameCount;
        frameCount = 0.0;
        lastTime = nowTime;
      }
    }

    for(var y=0;y<endY;y++){
      for(var x=0;x<endX;x++){
        canvas.drawTile(this.tileset, this.tileData[y][x], this.tileSize * grid.camera.zoom, x-startX, y-startY);
      }
    }
    for(var i=0;i<this.items.length;i++){
      var item = this.items[i];
      item.draw(canvas, this.tileSize * grid.camera.zoom);
    }
    for(var i=0;i<this.mobiles.length;i++){
      var mob = this.mobiles[i];
      mob.draw(canvas, this.tileSize * grid.camera.zoom);

      // canvas.drawSprite(mob.sprite, mob.frame, mob.sprite.tileSize, mob.x-startX, mob.y-startY, zoom);
    }

    canvas.strokeRect(grid.mouseX * 32, grid.mouseY * 32, 32, 32);

    canvas.drawEntity(grid.player, this.tileSize * grid.camera.zoom);

    if (DEBUG && false){
      debug(fps + " FPS<br />" + roundNumber(averageFPS,2) + " average FPS");
      debug("x:" + grid.camera.x + " y:" + grid.camera.y);
      //debug("viewing: " + grid.camera.x + "-" + (grid.camera.x + grid.camera.columns()) + "/" + grid.camera.y + "-" + (grid.camera.y + grid.camera.rows()));
      frameCount++;
    }



    // canvas.fillStyle = "#000";
    // canvas.font = 'italic bold 30px sans-serif';
    // canvas.textBaseline = 'bottom';
    // canvas.fillText('Testing upscale ratio',grid.camera.width()/2, grid.camera.height()/2);
  }

  return this;
}
