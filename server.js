'use strict';

let express = require('express'),
    app = express(),
    http = require('http').Server(app);


app.use(express.static('client/build'));
app.use(express.static('client/views'));

app.get('/', function(req, res) {
  res.sendFile('index.html');
  res.render('index.html');
});

http.listen(8080, function() {
  console.log('listening on *:8080');
});