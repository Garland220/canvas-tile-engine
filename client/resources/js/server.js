'use strict';

(function(global) {
  'use strict';

  global.server = {
    connected: false,
    socket: null,


    connect: function() {
      log('<p class="event">Connecting...');

      server.socket = io();
      server.socket.on('chat', function(msg){
        log(msg);
      });
      server.socket.on('load_map', function(response){
        console.log('Got new map data')
        response = JSON.parse(response);
        grid.map.update(response.id, response.tile_data, response.name, response.music);
      });
      server.socket.on('update_map', function(response){
        console.log('Got updated map data')
        response = JSON.parse(response);

      });

      server.socket.emit('load_map');

      window.dispatchEvent(new Event('connected'));
    },


    disconnect: function() {
      server.socket.close();
      log('Disconnected.');
      window.dispatchEvent(new Event('disconnected'));
    },


    send: function(type, data) {
      if (data==""){
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