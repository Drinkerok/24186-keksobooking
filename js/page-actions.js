'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var mapPins = document.querySelector('.map__pins');


  var activatePage = function () {
    form.classList.remove('ad-form--disabled');
    window.renderPins(mapPins);
  };

  var deactivatePage = function () {
    form.classList.add('ad-form--disabled');
  };


  window.pageActions = {
    activatePage: activatePage,
    deactivatePage: deactivatePage,
  };
})();
