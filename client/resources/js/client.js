(function(global) {
  'use strict';

  global.client = {
    ratio: 1,

    camera: null,

    config: {

    },

    canvas: {
      element: null,
      context: null,
      width: 0,
      height: 0,
      offsetX: 0,
      offsetY: 0
    },

    audio: {
      context: null,
    },

    info: {
      ip: '',
      browser: '',
      averageFPS: 0,
    },

    resources: {
      base: "img/",
      icons: "icons/",
      tiles: "tilesets/",
      sprites: "sprites/",

      sprite: function(name) {
        return client.resources.base + client.resources.sprites + client.resources.getImage(name);
      },

      tile: function(name) {
        return client.resources.base + client.resources.tiles + client.resources.getImage(name);
      },

      getImage: function(name) {
        if (name.indexOf(".") == -1){
          name = name + ".png";
        }

        return name;
      }
    },


    initialize: function(canvas, columns, rows) {
      var devicePixelRatio = window.devicePixelRatio || 1,
        backingStoreRatio = 1;

      canvas.width = columns * 32;
      canvas.height = rows * 32;
      client.canvas.offsetX = canvas.offsetLeft;
      client.canvas.offsetY = canvas.offsetTop;

      client.canvas.element = canvas;
      client.canvas.context = canvas.getContext('2d');

      backingStoreRatio = client.canvas.context.webkitBackingStorePixelRatio ||
                          client.canvas.context.mozBackingStorePixelRatio ||
                          client.canvas.context.msBackingStorePixelRatio ||
                          client.canvas.context.oBackingStorePixelRatio ||
                          client.canvas.context.backingStorePixelRatio || 1;

      client.ratio = devicePixelRatio / backingStoreRatio;

      if (devicePixelRatio !== backingStoreRatio) {
        client.canvas.width = canvas.width;
        client.canvas.height = canvas.height;

        canvas.width = client.canvas.width * client.ratio;
        canvas.height = client.canvas.height * client.ratio;

        canvas.style.width = client.canvas.width + 'px';
        canvas.style.height = client.canvas.height + 'px';

        client.canvas.context.scale(client.ratio, client.ratio);

        debug('scaling' + client.ratio)
      }

      window.dispatchEvent(new Event('canvasinitialization'));
    },


    log: function(message, error) {
      if (error == true) {
        console.error(message);
      }
      else {
        console.log(message);
      }
    },


    blur: function() {
      if (grid != null) {
        grid.active = false;
      }
      document.body.className = 'blurred';
    },


    focus: function() {
      if (grid != null) {
        grid.active = true;
      }
      document.body.className = 'focused';
    },


    getSprite: function(name) {
      return client.resources.sprite(name);
    },


    getTile: function(name) {
      return client.resources.tile(name);
    },

  };

}(this));