'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapMainPin = map.querySelector('.map__pin--main');

  var pinPositionLimit = {
    'x': {
      'min': 0,
      'max': parseInt(getComputedStyle(map).width, 10) - parseInt(getComputedStyle(mapMainPin).width, 10),
    },
    'y': {
      'min': 130,
      'max': 630,
    }
  };

  var pinWidth = mapMainPin.clientWidth;
  var pinHeight = mapMainPin.clientHeight;
  var pinHeightDelta = 22;

  var pinStartCoords = {
    x: mapMainPin.offsetLeft + pinWidth / 2,
    y: mapMainPin.offsetTop - pinHeight - pinHeightDelta,
  };

  window.formActions.setAddress(pinStartCoords);

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
    var shiftX;
    var shiftY;

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

      shiftX = mapMainPin.offsetLeft - delta.x;
      shiftY = mapMainPin.offsetTop - delta.y;

      shiftX = (shiftX < pinPositionLimit.x.min) ? pinPositionLimit.x.min : shiftX;
      shiftX = (shiftX > pinPositionLimit.x.max) ? pinPositionLimit.x.max : shiftX;

      shiftY = (shiftY < pinPositionLimit.y.min) ? pinPositionLimit.y.min : shiftY;
      shiftY = (shiftY > pinPositionLimit.y.max) ? pinPositionLimit.y.max : shiftY;

      mapMainPin.style.top = shiftY + 'px';
      mapMainPin.style.left = shiftX + 'px';
      window.formActions.setAddress({
        x: shiftX,
        y: shiftY
      });
    };
    var onPinStop = function (evt) {
      evt.preventDefault();
      document.removeEventListener('mousemove', onPinMove);
      document.removeEventListener('mouseup', onPinStop);
      window.pageActions.activatePage();
      window.formActions.setAddress({
        x: shiftX,
        y: shiftY
      });

      window.pinsActions.render(mapPins);
    };

    document.addEventListener('mousemove', onPinMove);
    document.addEventListener('mouseup', onPinStop);
  });


  window.mainPinActions = {
    resetPosition: setStartPosition,
  };
})();
