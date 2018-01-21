const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');

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

const ROOMS = {};

const relays = [
  'navLeft',
  'navUp',
  'navRight',
  'navDown',
  'toggleOverlay',
  'enter',
  'volume',
  'controllerConnected'
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
