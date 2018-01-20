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
// io.on('connection', function(socket) {
//   console.log('new connection!');
//   // socket.emit('init', 'you are connected!!!!');
//
//   // setTimeout(function(){
//   socket.on('toggleOverlay', function() {
//     console.log('received toggle overlay');
//     socket.emit('toggleOverlay');
//   });
//   // }, 8000);
//
//   setTimeout(function() {
//     socket.emit('toggleOverlay');
//   }, 8000)
//
// });

const ROOMS = {};
ROOMS['/abc'] = io.of('/abc');

// const abcSocket = io.of('/abc');

const relays = [
  'navLeft',
  'navUp',
  'navRight',
  'navDown',
  'toggleOverlay',
  'enter',
  'volume'
];

function initRoom(roomInstance) {
  roomInstance.on('connection', function(socket) {
    relays.forEach(function(relay) {
      socket.on(relay, function(data) {
        roomInstance.emit(relay, data);
      });
    });
  });
}

app.get('/request-room', function(req, res) {
  const date = new Date();
  const roomCode = date.getTime();
  ROOMS[`/${roomCode}`] = io.of(`/${roomCode}`);
  console.log(roomCode);
  console.log(Object.keys(ROOMS));
  initRoom(ROOMS[`/${roomCode}`]);
  res.send(`${JSON.stringify({roomCode: roomCode})}`);
});

Object.values(ROOMS).forEach(initRoom);
