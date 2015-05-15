var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  
  var person = 'Erro';
  
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  
  socket.on('new user', function(msg){
    person = msg;
    io.emit('online status', 'on,'+person)
  });
  
  socket.on('disconnect', function(){
    io.emit('chat message', '<b>'+person+' se desconectou!</b>');
    io.emit('online status', 'off,'+person)
  });
  
    
});

http.listen(process.env.PORT, function(){
  console.log('listening on *:'+process.env.PORT);
});