'use strict';

var FPS = 32,
  DEBUG = true,
  NOSOUND = false,

  drawInterval = 50,
  frameCount = 0,
  fps = 0,
  averageFPS = 0,
  maxfps = 1 / (drawInterval / 1000),
  lastTime = new Date(),
  context,

  height = 600,
  width = 800,

  grid = null,
  tile = 0;


window.addEventListener('load', init, false);

function init() {
  var canvas;

  window.addEventListener('blur', client.blur, false);
  window.addEventListener('focus', client.focus, false);
  window.addEventListener('offline', server.disconnect, false);

  if (window.location.hostname != "www.zodiackingdom.com") {
    // Local Dev
    NOSOUND = true;
    DEBUG = true;
  }

  if (!NOSOUND) {
    try {
      window.AudioContext = window.AudioContext||window.webkitAudioContext;
      context = new AudioContext();
    }
    catch(e) {
      alert('Web Audio API is not supported in this browser');
    }
  }

  if(!("WebSocket" in window)) {
    log('Your browser does not support WebSockets.', true);
  }
  else{
    server.connect();
  }

  canvas = document.getElementById('gameScreen');

  window.addEventListener('keypress', keyboardInput, false);
  canvas.addEventListener('wheel', mouseWheel, false);
  canvas.addEventListener('mousemove', mouseOver, false);
  canvas.addEventListener('click', mouseClick, false);
  document.getElementById('tilesheet').addEventListener('click', loadTile, false);
  document.getElementsByName('save')[0].addEventListener('click', save, false);

  initializeGame(canvas);
}

function loadTile(e) {
  var offsetX = e.currentTarget.offsetLeft,
    offsetY = e.currentTarget.offsetTop,
    deltaX = e.clientX - offsetX,
    deltaY = e.clientY - offsetY,

    width = e.currentTarget.offsetWidth,
    height = e.currentTarget.offsetHeight,
    rows = Math.ceil(width / 32),
    columns = Math.ceil(width / 32);

  tile = Math.ceil(rows * columns)

  // row = Math.floor(tile / columns);
  // tile = tile - (row * columns);

  // tile = Math.floor((deltaX) / 32);
  // tile = Math.floor(tile / ((deltaX * deltaY)/32));

  // tile_num = tile_y * num_tiles_x + tile_x
  tile = Math.floor(deltaY/32) * columns + Math.floor(deltaX/32);

  console.log(Math.floor(deltaX/32), Math.floor(deltaY/32));
  console.log(tile);
}


function log(message, error) {
  if (error == true) {
    console.error(message);
  }
  else {
    console.log(message);
  }
}

function debug(text){
  log(text);
}

function GameGrid(room){
  this.x = 0;
  this.y = 0;
  this.sq = [];
  this.dirty = [];
  this.active = true;

  this.map = new Map();
  this.player = new Mobile();
  this.camera = new Camera(this.map);

  this.draw = function() {
    this.camera.draw(client.canvas.context);
  }

  this.update = function() {

  }

  this.init = function() {
    this.update();
    this.draw();
  }
}

function loadGrid(map){
  grid = new GameGrid(map);
  //grid.x = $(cnv).offset();
}

function initializeGame(canvas) {
  client.initialize(canvas);

  loadGrid("map");
  grid.draw();

  setInterval(function() {
    grid.update();
    grid.draw();
  }, 1000/FPS);
}

function SpriteSheet(image){
  this.Name = "";
  this.tileSize = 32;
  this.Sprites = [];
  this.image = new Image();
  this.image.src = image;

  return this;
}

function TileMap(tiledata,collisiondata){
  this.tileData = Array(3);
  this.collisionData = Array(3);
  this.tileSize = 32;
  this.image = new Image();
  this.image.src = image;

  return this;
}

function Tile(){
  this.name = "";
  this.color = "#fff";

  return this;
}

function mouseOver(e) {
  var x = e.clientX,
    y = e.clientY - client.canvas.offsetY;

  x = Math.floor((x - grid.map.x - grid.camera.x) / (32 * 1));
  y = Math.floor((y - grid.map.y - grid.camera.y) / (32 * 1));

  if (x < 0 || y < 0){
    return;
  }

  grid.mouseX = x;
  grid.mouseY = y;

  // log(e);
}

function mouseWheel() {

}

function mouseClick() {
  grid.map.click();
}

function save() {
  grid.map.save();
}

function keyboardInput(event) {
  switch(event.keyCode){
    case 38: // Up
      if (grid.camera.y > 0){
        grid.camera.y--;
        grid.player.y--;
      }
    break;

    case 40: // Down
      //if (grid.camera.y < grid.camera.rows()-1){
        grid.player.y++;
        grid.camera.y++;
      //}
    break;

    case 37: // Left
      if (grid.camera.x > 0){
        grid.player.x--;
        grid.camera.x--;
      }
    break;

    case 39: // Right
      //if (grid.camera.x < grid.camera.columns()-1){
        grid.player.x++;
        grid.camera.x++;
      //}
    break;

    case 13: // Enter
      server.send();
    break;
  }

  grid.draw();   // draw map with new coordinates
}

function loopSound(sound) {
  sound.play({
    onfinish: function() {
      loopSound(sound);
    }
  });
}

function roundNumber(num, dec) {
  var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
  return result;
}
