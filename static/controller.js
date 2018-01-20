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
    if (e.target.value == 0) {
      $controller.querySelector('svg').classList.remove('fa-volume-up');
      $controller.querySelector('svg').classList.add('fa-volume-off');
    } else if(e.target.value < 49){
      $controller.querySelector('svg').classList.remove('fa-volume-off', 'fa-volume-up');
      $controller.querySelector('svg').classList.add('fa-volume-down');
    } else {
      $controller.querySelector('svg').classList.remove('fa-volume-off');
      $controller.querySelector('svg').classList.add('fa-volume-up');
    }
    socket.emit('volume', (e.target.value * 0.01));
  });

});
