var FPS = 32;
var DEBUG = true;
var NOSOUND = false;

var drawInterval = 50;
var frameCount = 0;
var fps = 0;
var averageFPS = 0;
var maxfps = 1 / (drawInterval / 1000);
var lastTime = new Date();

var height = 600;
var width = 800;

var grid = null;
var cnv;

var iconDir = "../img/icons/"
var tileDir = "../img/tilesets/";
var spriteDir = "../img/sprites/";

$(document).ready(function(){
	$("#gameScreen").attr("height", $(window).height());
	$("#gameScreen").attr("width", $(window).width());

	// Local Dev
	if (window.location.hostname != "www.zodiackingdom.com"){
		NOSOUND = true;
		DEBUG = true;
	}

	$(window).resize(function(){
		$("#gameScreen").attr("height", $(window).height());
		$("#gameScreen").attr("width", $(window).width());
	});

	height = $("#gameScreen").height();
	width = $("#gameScreen").width();

	cnv = document.getElementById('gameScreen');
	//cnv.onmousemove = grid.over;

	initializeGame();

	$('.draggable').draggable({containment: "parent"});
	var content = $('#backgroundViewer').html();
	$('#background').fancybox({
		'content': content,
		'padding' : 20
	});

	document.onkeypress = keyboardParseInput;
	if (/*@cc_on!@*/false){ // check for Internet Explorer
		document.onfocusin = onFocus;
		document.onfocusout = onBlur;
	}
	else{
		window.onfocus = onFocus;
		window.onblur = onBlur;
	}

	if (!NOSOUND){
		soundManager.url = '../js/soundmanager/swf/';
		soundManager.flashVersion = 9;
		soundManager.useHighPerformance = true;
		soundManager.useFastPolling = true;
		soundManager.onready(function(){
			var s = soundManager.createSound({
				id:'village',
				url: ('Caves of sorrow.ogg'),
				autoLoad: true,
				autoPlay: true,
				onload: function(success) {
				},
				volume: 50
			});

			if (!soundManager._disabled) {
				if (s){
					loopSound(s);
				}
			}
			else{
				alert(soundManager._disabled)
			}
		});
	}
	$("#stats").click(function(){
		
	});
	//soundManager.debugFlash = true;
	//soundManager.debugMode = true;

	if(!("WebSocket" in window)){
		$('#chatLog, input, button, #examples').fadeOut("fast");	
		$('<p>Oh no, you need a browser that supports WebSockets. How about <a href="http://www.google.com/chrome">Google Chrome</a>?</p>').appendTo('#container');		
	}
	else{
		connect();
	}
});

function getSprites(name){
	return spriteDir + getImage(name);
}

function getTiles(name){
	return tileDir + getImage(name);
}

function getImage(name){
	if (name.indexOf(".") == -1){
		name = name + ".png";
	}

	return name;
}

function GameGrid(context,room){
	this.x = 0;
	this.y = 0;
	this.sq = [];
	this.dirty = [];
	this.active = true;
	this.canvas = context;

	this.map = new Map();
	this.player = new Mobile();
	this.camera = new Camera(this.map);

	this.draw = function(){
		this.camera.draw(this.canvas);
	}

	this.update = function(){

	}

	this.init = function(){
		this.update();
		this.draw();
	}
}

function loadGrid(map){
	grid = new GameGrid(cnv.getContext("2d"), map);
	//grid.x = $(cnv).offset();
}

function initializeGame(){
	$('#gameScreen').click(function(event) { });
	//$('#gameScreen').mousewheel(function(event, delta) {
		//grid.zoom(delta);
	//});

	//var map = new Map("img/maps/frostsilver.jpg");

	loadGrid("map");
	grid.draw();

	setInterval(function() {
		grid.update();
		grid.draw();
	}, 1000/FPS);
}

function SpriteSheet(image){
	this.Name = "";
	this.tileSize = 16;
	this.Sprites = [];
	this.image = new Image();
	this.image.src = image;

	return this;
}

function TileMap(tiledata,collisiondata){
	this.tileData = Array(3);
	this.collisionData = Array(3);
	this.tileSize = 16;
	this.image = new Image();
	this.image.src = image;

	return this;
}

function Tile(){
	this.name = "";
	this.color = "#fff";

	return this;
}

function Player(){
	
}

function Mobile(){
	this.sprite = new SpriteSheet(getSprites("human_base.png"));
	this.direction = 0;
	this.frame = 1;
	this.maxFrames;
	this.isPlaying = false;
	this.isFemale = false;
	this.visible = true;
	this.x = 0;
	this.y = 0;
	
	this.draw = function(canvas, size){
		if (this.visible){
			canvas.drawEntity(this, size);
		}
	}

	return this;
}

function Item(){
	this.name = "Sample Item";
	this.sprite = new SpriteSheet(getSprites("items_3.png"));
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

function Map(tileset){
	this.tileset = new SpriteSheet(getTiles("set_0.gif"));
	this.tileSize = 16;
	this.tileData = [
		[0,1,2,0,19,133,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19],
		[18,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19],
		[19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19],
		[19,19,19,19,133,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19],
		[19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19],
		[19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19],
		[19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19],
		[19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19],
		[19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19],
		[19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19],
		[19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19],
		[19,19,32,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19],
		[19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19],
		[19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19],
		[19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19],
		[19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19],
		[19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19],
		[19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19],
		[19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19],
		[19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19],
		[19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19],
		[19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19],
		[19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19],
		[19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19],
		[19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19],
		[19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19],
	];
	this.color = "#ccc";

	this.width = this.tileData[0].length;
	this.height = this.tileData.length;
	this.x = 0;
	this.y = 0;

	this.mobiles = [];
	this.items = [];
	this.tiles = [];
	
	var mob = new Mobile();
	this.mobiles.push(mob);
	mob.x = 19;
	mob.y = 3;

	var item = new Item();
	this.items.push(item);
	item.x = 2;
	item.y = 3;
	//item.sprite.image.src = null;
	//alert(grid.player);
	//this.mobiles.push(grid.player);
	//alert(this.mobiles[0].sprite.image.src);

	this.load = function(data){
		this.tileData = data;
	}

	this.update = function(){
		
	}

	this.draw = function(canvas, startX, startY, endY, endX, zoom){
		endY = startY + endY;
		endX = startX + endX;
		$("#output").empty();

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

		for(y=0;y<endY;y++){
			for(x=0;x<endX;x++){
				canvas.drawTile(this.tileset, this.tileData[y][x], this.tileSize * grid.camera.zoom, x-startX, y-startY);
			}
		}
		for(i=0;i<this.items.length;i++){
			var item = this.items[i];
			item.draw(canvas, this.tileSize * grid.camera.zoom);
		}
		for(i=0;i<this.mobiles.length;i++){
			var mob = this.mobiles[i];
			mob.draw(canvas, this.tileSize * grid.camera.zoom); //canvas.drawSprite(mob.sprite, mob.frame, mob.sprite.tileSize, mob.x-startX, mob.y-startY, zoom);
		}

		if (DEBUG){
			debug(fps + " FPS<br />" + roundNumber(averageFPS,2) + " average FPS");
			debug("x:" + grid.camera.x + " y:" + grid.camera.y);
			//debug("viewing: " + grid.camera.x + "-" + (grid.camera.x + grid.camera.columns()) + "/" + grid.camera.y + "-" + (grid.camera.y + grid.camera.rows()));
			frameCount++;
		}

		canvas.drawEntity(grid.player);
		canvas.fillStyle = "#000";
		canvas.font = 'italic bold 30px sans-serif';
		canvas.textBaseline = 'bottom';
		canvas.fillText("Demo",grid.camera.width()/2, grid.camera.height()/2);
	}

	return this;
}

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

function RenderChunk(){
	
}

/*XFrame.prototype.draw = function(ctx, x, y) {
   ctx.save();
   ctx.transform(this.m11, this.m12, this.m21, this.m22, this.dx+x, this.dy+y);
   ctx.drawImage(this.imageSource, (this.cellIndex % this.graphicSheet.columns) * this.graphicSheet.cellWidth,
      Math.floor(this.cellIndex / this.graphicSheet.columns) * this.graphicSheet.cellHeight,
      this.graphicSheet.cellWidth, this.graphicSheet.cellHeight, 0, 0, this.graphicSheet.cellWidth, this.graphicSheet.cellHeight);
   ctx.restore();
};*/

function Camera(map,canvas){
	this.x = 0;
	this.y = 0;
	this.zoom = 4.0;

	this.map = map;

	this.width = function(){return $("#gameScreen").width();}
	this.height = function(){return $("#gameScreen").height();}

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

	this.draw = function(canvas){
		if (!grid.active)
			return;

		canvas.clearRect(0,0,width,height);
		this.map.draw(canvas, this.x, this.y, this.rows(), this.columns(), this.zoom);
	}

	return this;
}

function onBlur(){
	grid.active = false;
	document.body.className = 'blurred';
}

function onFocus(){
	grid.active = true;
	document.body.className = 'focused';
}

getKeyValue = function(key){
	switch(key){
		case 'up':return 38;
		case 'down':return 40;
		case 'left':return 37;
		case 'right':return 39;
		case 'enter':return 13;
	}
}

keyboardParseInput = function(event){
	switch(event.keyCode){
		case getKeyValue('up'):
			if (grid.camera.y > 0){
				grid.camera.y--;
				grid.player.y--;
			}
		break;

		case getKeyValue('down'):
			//if (grid.camera.y < grid.camera.rows()-1){
				grid.player.y++;
				grid.camera.y++;
			//}
		break;

		case getKeyValue('left'):
			if (grid.camera.x > 0){
				grid.player.x--;
				grid.camera.x--;
			}
		break;

		case getKeyValue('right'):
			//if (grid.camera.x < grid.camera.columns()-1){
				grid.player.x++;
				grid.camera.x++;
			//}
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

function debug(text){
	$("#output").append(text + "<br />\n");
}

function connect(){
	var socket;
	var host = "ws://zodiackingdom.com:2595/survival/server/server.php";

	try{
		socket = new WebSocket(host);
		message('<p class="event">Connecting...');
		socket.onopen = function(msg){
			socket.send('connected');
			message('<p class="event">Socket Status: '+socket.readyState+' (open)');	
		}

		socket.onerror = function(msg){
			message('<p class="error">Error: '+msg.data+'</p>');
		}

		socket.onmessage = function(msg){
			message('<p class="message">Received: '+msg.data);					
		}

		socket.onclose = function(msg){
			message('<p class="event">Connection Closed.');
		}			

	} catch(exception){
		message('<p>Error: '+exception);
	}

	function send(){
		var text = $('#text').val();
		if(text==""){
			message('<p class="warning">Please enter a message');
			return ;	
		}
		try{
			socket.send(text);
			message('<p class="event">Sent: '+text)
		} catch(exception){
			message('<p class="warning">');
		}
		$('#text').val("");
	}

	function message(msg){
		$('#chat').append(msg+'</p>');
	}

	$('#text').keypress(function(event) {
		if (event.keyCode == '13') {
			send();
		}
	});	

	$('#disconnect').click(function(){
		socket.close();
	});

}