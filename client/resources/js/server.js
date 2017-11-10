(function(global) {
  'use strict';

  global.server = {
    connected: false,
    socket: null,


    connect: function() {
      debug('Connecting...');

      server.socket = io();
      server.socket.on('chat', function(msg){
        debug(msg);
      });
      server.socket.on('load_map', function(response){
        debug('Got new map data')
        response = JSON.parse(response);
        grid.map.update(response.id, response.tile_data, response.name, response.music);
      });
      server.socket.on('update_map', function(response){
        debug('Got updated map data')
        response = JSON.parse(response);

      });

      server.socket.emit('load_map');

      window.dispatchEvent(new Event('connected'));
    },


    disconnect: function() {
      server.socket.close();
      debug('Disconnected.');
      window.dispatchEvent(new Event('disconnected'));
    },


    send: function(type, data) {
      if (data === ''){
        debug('Please enter a message', 1);
        return false;
      }

      try {
        server.socket.emit(type, data);
        debug('Sent: ' + data, 0);
      }
      catch(exception) {
        debug(exception, 2);
      }
    },
  };

}(this));