let socket;

const roomCode = localStorage.getItem('roomCode');
if (roomCode) {
  socket = io(`/${roomCode}`);
}

window.addEventListener('DOMContentLoaded', function() {
  const $controller = document.getElementById('controller');

  const $guideControl = $controller.querySelector('.guide-control');
  const $navLeft = $controller.querySelector('.nav-left');
  const $navUp = $controller.querySelector('.nav-up');
  const $navRight = $controller.querySelector('.nav-right');
  const $navDown = $controller.querySelector('.nav-down');
  const $navEnter = $controller.querySelector('.nav-enter');
  const $volume = $controller.querySelector('.volume-input');

  if (!socket) {
    const $overlay = document.createElement('div');
    $overlay.classList.add('overlay');

    const $inputContainer = document.createElement('div');
    $inputContainer.classList.add('input-container');

    const $label = document.createElement('div');
    $label.classList.add('label');
    $label.textContent = 'CODE';

    const $room = document.createElement('input');
    $room.setAttribute('type', 'text');
    $room.id = 'room';

    const $submit = document.createElement('button');
    $submit.classList.add('submit');
    $submit.textContent = 'SUBMIT';
    $submit.addEventListener('click', function() {
      socket = io(`/${$room.value}`);
      localStorage.setItem('roomCode', room.value);
      socket.emit('controllerConnected');
      document.body.removeChild($overlay);
    });

    $inputContainer.appendChild($label);
    $inputContainer.appendChild($room);
    $inputContainer.appendChild($submit);

    $overlay.appendChild($inputContainer);

    document.body.appendChild($overlay);
  }

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
