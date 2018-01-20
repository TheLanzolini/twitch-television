const socket = io('/abc');
let player = null;
let overlayActive = false;
let $overlay;
const streams = {};

streams[0] = ['overwatchleague', 'nickmercs', 'gotaga', 'highdistortion', 'drlupo'];
streams[1] = ['arquel', 'duendepablo', 'realkraftyy', 'kobe0802', 'pago3'];
streams[2] = ['overwatchleague', 'incendiobeauty', 'nge', 'zylria', 'oatsngoats'];

const matrix = {
  currentX: 0,
  currentY: 0
};

function move(x, y) {
  matrix[matrix.currentY].channels[matrix.currentX].classList.remove('active');
  matrix[y].channels[x].classList.add('active');
  matrix.currentX = x;
  matrix.currentY = y;
}

function togglePlay() {

}

function setVolume(float) {
  player.setVolume(float);
}

function navUp() {
  if (matrix.currentY !== 0) {
    const targetX = matrix.currentX;
    const targetY = matrix.currentY - 1;
    move(targetX, targetY);
  }
}

function navDown() {
  if (matrix.currentY !== 2) {
    const targetX = matrix.currentX;
    const targetY = matrix.currentY + 1;
    move(targetX, targetY);
  }
}

function navLeft() {
  if (matrix.currentX !== 0) {
    const targetX = matrix.currentX - 1;
    const targetY = matrix.currentY;
    move(targetX, targetY);
  }
}

function navRight() {
  const currentChannel = matrix[matrix.currentY].channels[matrix.currentX];
  const currentChannels = matrix[matrix.currentY].channels;
  const currentChannelsLength = matrix[matrix.currentY].channels.length;
  let go = true;
  currentChannels.forEach(function(c, index) {
    if (c == currentChannel && index == currentChannelsLength - 1) {
      go = false;
    }
  });
  if (go) {
    const targetX = matrix.currentX + 1;
    const targetY = matrix.currentY;
    move(targetX, targetY);
  }
}

function enter() {
  const targetStream = streams[matrix.currentY][matrix.currentX];
  player.setChannel(targetStream);
  toggleOverlay();
}

function toggleOverlay() {
  console.log('display received toggle overlay');
  $overlay.classList[overlayActive ? 'remove' : 'add']('active');
  overlayActive = !overlayActive;
}

document.addEventListener('keydown', function(e) {
  // 37 left
  // 38 up
  // 39 right
  // 40 down
  // 13 enter
  // 71 G
  const events = {
    37: navLeft,
    38: navUp,
    39: navRight,
    40: navDown,
    71: toggleOverlay,
    13: enter,
    48: function() { setVolume(1) },
    49: function() { setVolume(0) },
    50: function() { setVolume(0.2) },
    51: function() { setVolume(0.3) },
    52: function() { setVolume(0.4) },
    53: function() { setVolume(0.5) },
    54: function() { setVolume(0.6) },
    55: function() { setVolume(0.7) },
    56: function() { setVolume(0.8) },
    57: function() { setVolume(0.9) }
  }

  if (events[e.keyCode] !== undefined && (overlayActive || e.keyCode === 71 || (e.keyCode >= 48 || e.keyCode <= 57) )) {
    events[e.keyCode]();
  }

});

window.addEventListener('DOMContentLoaded', function() {
  $overlay = document.getElementById('overlay');
  const $overlayBody = $overlay.querySelector('.overlay-body');



  Object.entries(streams).forEach(function(entry) {
    const $overlaySection = document.createElement('div');
    $overlaySection.classList.add('overlay-section');

    const streamTitleInt = parseInt(entry[0]);
    const channs = entry[1];
    const title = streamTitleInt === 0 ? 'Subscriptions' : streamTitleInt === 1 ? 'Followed' : 'Featured';
    const $title = document.createElement('div');
    $title.textContent = title;
    $title.classList.add('title');

    const $channels = document.createElement('div');
    $channels.classList.add('channels');

    channs.forEach(function(chann) {
      const $channel = document.createElement('div');
      $channel.classList.add('channel', chann);
      const $thumbnail = document.createElement('div');
      $thumbnail.classList.add('thumbnail');
      const $name = document.createElement('div');
      $name.classList.add('name');
      $name.textContent = chann;
      $channel.appendChild($thumbnail);
      $channel.appendChild($name);
      $channels.appendChild($channel);
    });

    $overlaySection.appendChild($title);
    $overlaySection.appendChild($channels);

    $overlayBody.appendChild($overlaySection);

  });

  $overlay.appendChild($overlayBody);

  const sections = $overlay.querySelectorAll('.overlay-section');
  sections.forEach(function(section, index) {
    const channels = section.querySelectorAll('.channel');
    matrix[index] = {
      element: section,
      channels: channels
    }
  });
  // console.log(matrix);
  move(0, 0);

  socket.on('init', function(res) {
    console.log(res);
  });

  socket.on('navLeft', navLeft);
  socket.on('navUp', navUp);
  socket.on('navRight', navRight);
  socket.on('navDown', navDown);
  socket.on('toggleOverlay', toggleOverlay);
  socket.on('enter', enter);
  socket.on('volume', setVolume);

  const width = window.innerWidth;
  const height = window.innerHeight;

  const embed = new Twitch.Embed('player', {
    width: width,
    height: height,
    channel: 'lanzo',
    layout: 'video',
    muted: false
  });

  embed.addEventListener(Twitch.Embed.VIDEO_READY, function(){
    playerReady = true;
    player = embed.player;
    player.setMuted(false);
    // console.log(player)
  });
});
