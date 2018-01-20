const socket = io('/abc');

window.addEventListener('DOMContentLoaded', function() {
  const $controller = document.getElementById('controller');

  const $guideControl = $controller.querySelector('.guide-control');
  const $navLeft = $controller.querySelector('.nav-left');
  const $navUp = $controller.querySelector('.nav-up');
  const $navRight = $controller.querySelector('.nav-right');
  const $navDown = $controller.querySelector('.nav-down');
  const $navEnter = $controller.querySelector('.nav-enter');
  const $volume = $controller.querySelector('.volume-input');

  $guideControl.addEventListener('click', function() {
    socket.emit('toggleOverlay');
  });

  $navLeft.addEventListener('click', function() {
    socket.emit('navLeft');
  });

  $navUp.addEventListener('click', function() {
    socket.emit('navUp');
  });

  $navRight.addEventListener('click', function() {
    socket.emit('navRight');
  });

  $navDown.addEventListener('click', function() {
    socket.emit('navDown');
  });

  $navEnter.addEventListener('click', function() {
    socket.emit('enter');
  });

  $volume.addEventListener('input', function(e) {
    socket.emit('volume', (e.target.value * 0.01));
  });

});
