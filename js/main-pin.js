'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapMainPin = map.querySelector('.map__pin--main');
  var pinStartCoords = {
    x: getComputedStyle(mapMainPin).left,
    y: getComputedStyle(mapMainPin).top,
  };
  console.log(pinStartCoords);

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

  function setStartPosition() {
    mapMainPin.style.left = pinStartCoords.x;
    mapMainPin.style.top = pinStartCoords.y;
  }


  mapMainPin.addEventListener('mousedown', function (e) {
    window.pinsActions.remove();
    window.mapActions.activate();

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
      window.formActions.setAddress(mapMainPin);
    };
    var onPinStop = function (evt) {
      evt.preventDefault();
      document.removeEventListener('mousemove', onPinMove);
      document.removeEventListener('mouseup', onPinStop);
      window.pageActions.activatePage();
      window.formActions.setAddress(mapMainPin);

      window.pinsActions.render(mapPins);
    };

    document.addEventListener('mousemove', onPinMove);
    document.addEventListener('mouseup', onPinStop);
  });


  window.mainPinActions = {
    resetPosition: setStartPosition,
  }
})();
