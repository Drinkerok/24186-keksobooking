'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapMainPin = map.querySelector('.map__pin--main');

  var PIN_POSITION_LIMIT = {
    'x': {
      'min': 0,
      'max': parseInt(getComputedStyle(map).width, 10) - parseInt(getComputedStyle(mapMainPin).width, 10),
    },
    'y': {
      'min': 130 - parseInt(getComputedStyle(mapMainPin).height, 10) / 2,
      'max': 630 - parseInt(getComputedStyle(mapMainPin).height, 10) / 2,
    }
  };


  mapMainPin.addEventListener('mousedown', function (e) {
    map.classList.remove('map--faded');
    window.pageActions.deactivatePage();

    var startCoords = {
      x: e.clientX,
      y: e.clientY,
    };

    var onPinMove = function (ev) {
      ev.preventDefault();

      var delta = {
        x: startCoords.x - ev.clientX,
        y: startCoords.y - ev.clientY,
      };

      startCoords = {
        x: ev.clientX,
        y: ev.clientY,
      };

      var shiftX = mapMainPin.offsetLeft - delta.x;
      var shiftY = mapMainPin.offsetTop - delta.y;

      shiftX = (shiftX < PIN_POSITION_LIMIT.x.min) ? PIN_POSITION_LIMIT.x.min : shiftX;
      shiftX = (shiftX > PIN_POSITION_LIMIT.x.max) ? PIN_POSITION_LIMIT.x.max : shiftX;

      shiftY = (shiftY < PIN_POSITION_LIMIT.y.min) ? PIN_POSITION_LIMIT.y.min : shiftY;
      shiftY = (shiftY > PIN_POSITION_LIMIT.y.max) ? PIN_POSITION_LIMIT.y.max : shiftY;

      mapMainPin.style.top = shiftY + 'px';
      mapMainPin.style.left = shiftX + 'px';
    };
    var onPinStop = function (evt) {
      evt.preventDefault();
      document.removeEventListener('mousemove', onPinMove);
      document.removeEventListener('mouseup', onPinStop);
      window.pageActions.activatePage();
      window.setAddressValue(mapMainPin);
    };

    document.addEventListener('mousemove', onPinMove);
    document.addEventListener('mouseup', onPinStop);
  });
})();
