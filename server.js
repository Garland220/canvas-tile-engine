var version = '0.0.4',
  util = require('util'),
  fs = require("fs"),
  express = require('express'),
  app = express(),
  http = require('http').Server(app),
  io = require('socket.io')(http),
  pg = require("pg"),
  SETTINGS = require('./settings.json'),
  client = new pg.Client(SETTINGS.database),
  users,
  maps,
  mobiles,
  items;


client.connect(function(error) {
  if (error) {
    console.error(error);
    return;
  }
});


console.log('Loading users...');
client.query('SELECT * FROM users', function(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  users = results.rows;
  console.log('Complete');
});


console.log('Loading maps...');
client.query('SELECT * FROM maps', function(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  maps = results.rows;
  console.log('Complete');
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
    var map;

    console.log('Map requested');

    if (data && data.id) {
      data = JSON.parse(data);
      map = maps[data.id];
    }
    else {
      map = maps[0];
    }

    socket.emit('load_map', JSON.stringify({id: map.id, name: map.name, music: map.music, tile_data: JSON.parse(map.tile_data)}));

    // client.query('SELECT * FROM maps WHERE id = 1', function(error, result) {
    //   if (error) {
    //     console.error(error)
    //   }
    //   else {
    //     result = result.rows[0];
    //     socket.emit('load_map', JSON.stringify({id: result.id, name: result.name, tile_data: JSON.parse(result.tile_data), music: result.music}));
    //   }
    // });
  });

  socket.on('save_map', function(data) {
    var map;

    console.log('Saving map');

    if (!data) {
      console.error('empty data')
      return;
    }

    data = JSON.parse(data);
    if (!data.id) {
      console.error('Tried to save map without ID');
      return;
    }
    map = maps[data.id-1];
    console.log(map);

    map.tile_data = JSON.stringify(data.tile_data);
    map.name = data.name;
    map.music = data.music;

    io.sockets.emit('load_map', JSON.stringify({id: map.id, name: map.name, tile_data: JSON.parse(map.tile_data), music: map.music}));

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
