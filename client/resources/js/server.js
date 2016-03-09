'use strict';

(function(global) {
  'use strict';

  global.server = {
    connected: false,
    socket: null,

    connect: function() {
      log('<p class="event">Connecting...');
      server.socket = io();
      // var messages = document.getElementById('messages');

      server.socket.on('chat', function(msg){
        log(msg);
        // messages.innerHTML += '<li>' + msg + '</li>';
      });

      server.socket.on('load_map', function(response){
        console.log('Got new map data')
        response = JSON.parse(response);
        grid.map.update(response.id, response.tile_data, response.name, response.music);
        // messages.innerHTML += '<li>' + msg + '</li>';
      });

      server.socket.emit('load_map');
      // try {

      //   socket.onopen = function(msg) {
      //     socket.send('connected');
      //     log('<p class="event">Socket Status: '+socket.readyState+' (open)');
      //   }

      //   socket.onerror = function(msg) {
      //     log('<p class="error">Error: '+msg.data+'</p>');
      //   }

      //   socket.onmessage = function(msg) {
      //     log('<p class="message">Received: '+msg.data);
      //   }

      //   socket.onclose = function(msg) {
      //     log('<p class="event">Connection Closed.');
      //   }

      // }
      // catch(exception) {
      //   log('<p>Error: '+exception);
      // }
    },


    disconnect: function() {
      server.socket.close();
      log('Disconnected.');
    },


    send: function(type, data) {
      if (data==""){
        log('<p class="warning">Please enter a message');
        return false;
      }

      try {
        server.socket.emit(type, data);
        log('<p class="event">Sent: '+data)
      }
      catch(exception) {
        log('<p class="warning">');
      }
    },

  };

}(this));