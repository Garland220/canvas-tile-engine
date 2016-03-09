var version = '0.0.4',
  util = require('util'),
  fs = require("fs"),
  express = require('express'),
  app = express(),
  http = require('http').Server(app),
  io = require('socket.io')(http),
  pg = require("pg"),
  SETTINGS = require('./settings.json'),
  client = new pg.Client(SETTINGS.database);


client.connect(function(error) {
  if (error) {
    console.error(error);
    return;
  }
});


app.set('view engine', 'jade');
app.use(express.static('client/resources'));
app.get('/', function(req, res){
  res.render('index', {
    title: 'ZK-Engine',
    header: 'Engine test',
    'version': version
  });
});


app.get('/map', function(req, res){
  res.setHeader('Content-Type', 'application/json');
  res.send();
});


var Clients = [];
io.on('connection', function(socket) {
  Clients.push(socket);

  console.log('A user connected from %s', socket.handshake.address);

  socket.on('login', function() {
    console.log('User %s authenticated');
  });

  socket.on('chat', function(msg) {
    console.log('message: ' + msg);

    io.emit('chat', msg);
  });

  socket.on('command', function(msg) {
    console.log('command: ' + msg);
  });

  socket.on('load_map', function(data) {
    console.log('Map requested')

    client.query('SELECT * FROM maps WHERE id = 1', function(error, result) {
      if (error) {
        console.error(error)
      }
      else {
        result = result.rows[0];
        socket.emit('load_map', JSON.stringify({id: result.id, name: result.name, tile_data: JSON.parse(result.tile_data), music: result.music}));
      }
    });
  });

  socket.on('save_map', function(data) {
    console.log('Saving map');

    data = JSON.parse(data);
    var q = util.format('UPDATE maps SET name = \'%s\', tile_data = \'%s\', tile_set = \'%s\', music = \'%s\' WHERE id = %d', data.name, JSON.stringify(data.tile_data), data.tile_set, data.music, data.id);

    client.query(q, function(error, result) {
        if (error) {
          console.log(error);
        }
        // result = result.rows[0];
        // socket.emit('load_map', JSON.stringify({id: result.id, name: result.name, tile_data: JSON.parse(result.tile_data), music: result.music}));
    });
  });

  socket.on('new_map', function(data) {
    console.log('Creating new map');

    data = JSON.parse(data);

    client.query(util.format('INSERT INTO maps ("name", "tile_data", "tile_set", "music") VALUES (%s, %s, %s, %s)', data.name, JSON.stringify(data.tile_data), data.tile_set, data.music, function(error, result) {
        if (error) {
          console.error(error)
        }
        result = result.rows[0];
        socket.emit('new_map', JSON.stringify({id: result.id, name: result.name, tile_data: JSON.parse(result.tile_data), music: result.music}));
    }));
  });

  socket.on('disconnect', function(){
    console.log('User disconnected');
    // RemoveClient(client);
  });
});


http.listen(SETTINGS.port, function(){
  console.log('listening on *:'+SETTINGS.port);
});
