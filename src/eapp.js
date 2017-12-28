'use strict';

import BaseNode from './nodes/BME280/basenode'; 
import BME280Node from './nodes/BME280/bme280node'
import MPPTNode from './nodes/MPPT75115/mpptnode'

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
  var path = __dirname + '/../public';
  res.sendFile('index.html', {'root': path });
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  const bme280Node = new BME280Node( 'MPPT: BME280');
  bme280Node.setCallback((data) => {
    console.log(JSON.stringify(data, null, 2));
    io.emit('chat message', JSON.stringify(data, null, 2));
  });
  bme280Node.enabled(true);

  const mpptNode = new MPPTNode( 'MPPT: MPPT75115');
    mpptNode.setCallback((data) => {
      console.log(JSON.stringify(data, null, 2));
      io.emit('chat message', JSON.stringify(data, null, 2));
    });
    mpptNode.enabled(true);

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});