const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');

// SOCKET IO connection between 2 views

// VIEW 1 - Controller (phone)

// VIEW 2 - Display (TV/Monitor)

// App Routing
const ROUTES = [
  'display',
  'controller'
]
server.listen(process.env.PORT || 8000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'static')));

ROUTES.forEach(function(route) {
  app.get(`/${route}`, function(req, res) {
    res.render(path.join(__dirname, 'views', route));
  });
});

app.get('/', function(req, res) {
  res.render(path.join(__dirname, 'views', 'index'), {});
});

// SOCKET
io.on('connection', function(socket) {
  console.log('new connection!');
  // socket.emit('init', 'you are connected!!!!');

  setTimeout(function(){
    socket.emit('toggleOverlay');
  }, 8000);

  setTimeout(function(){
    socket.emit('navRight');
  }, 10000);
  setTimeout(function(){
    socket.emit('navRight');
  }, 11000);
  setTimeout(function(){
    socket.emit('navDown');
  }, 12000);
  setTimeout(function(){
    socket.emit('navLeft');
  }, 13000);
  setTimeout(function(){
    socket.emit('navUp');
  }, 14000);
  setTimeout(function(){
    socket.emit('enter');
  }, 15000);

  setTimeout(function(){
    socket.emit('toggleOverlay');
  }, 15500);

  setTimeout(function(){
    socket.emit('navRight');
  }, 16000);
  setTimeout(function(){
    socket.emit('navRight');
  }, 17000);
  setTimeout(function(){
    socket.emit('navRight');
  }, 18000);
  setTimeout(function(){
    socket.emit('enter');
  }, 19000);

});
