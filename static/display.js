const socket = io();
let player = null;
let overlayActive = false;
let $overlay;

const matrix = {
  currentX: 0,
  currentY: 0
};

function move(x, y) {
  matrix[matrix.currentY].channels[matrix.currentX].classList.remove('active');
  matrix[y].channels[x].classList.add('active');
  matrix.currentX = x;
  matrix.currentY = y;
  console.log(matrix);
}

function togglePlay() {

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

}

function navRight() {

}



function toggleOverlay() {
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
    71: toggleOverlay
  }

  if (events[e.keyCode] !== undefined) {
    events[e.keyCode]();
  }

});

window.addEventListener('DOMContentLoaded', function() {

  $overlay = document.getElementById('overlay');
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

  const width = window.innerWidth;
  const height = window.innerHeight;

  const embed = new Twitch.Embed('player', {
    width: width,
    height: height,
    channel: 'lanzo',
    chat: false
  });

  embed.addEventListener(Twitch.Embed.VIDEO_READY, function(){
    playerReady = true;
    player = embed.player;
    // console.log(player)
  });
});
