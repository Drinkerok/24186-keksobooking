'use strict';

(function () {
  var getRandomInteger = function (min, max) {
    var rand = min + Math.random() * (max - min + 1);
    rand = Math.floor(rand);
    return rand;
  };

  var getRandomFeatures = function (arr) {
    var number = getRandomInteger(1, arr.length);
    var features = [];

    for (var i = 0; i < number; i++) {
      features.push(arr[i]);
    }

    return features;
  };

  var getElCenter = function (el) {
    var elCoords = el.getBoundingClientRect();

    return {
      'x': +(+elCoords.left + +elCoords.width / 2 + pageXOffset).toFixed(0),
      'y': +(+elCoords.top + +elCoords.height / 2 + pageYOffset).toFixed(0),
    };
  };


  window.commonFunctions = {
    getRandomInteger: getRandomInteger,
    getRandomFeatures: getRandomFeatures,
    getElCenter: getElCenter,
  };
})();
