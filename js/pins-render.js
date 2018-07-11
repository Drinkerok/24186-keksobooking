'use strict';

(function () {
  var PINS_TO_RENDER = 5;

  var templateAll = document.querySelector('template').content;
  var templatePin = templateAll.querySelector('.map__pin');
  var renderedPins = [];

  function pinsRender(elToRender) {
    var objectToRender = elToRender || document.querySelector('.map__pins');
    pinsRemove();
    var pinFragment = document.createDocumentFragment();

    var pinClickListener = function (user) {
      user.pin.addEventListener('click', function () {
        if (user.pin.classList.contains('map__pin--active')) {
          window.pinPopup.close();
        } else {
          window.pinPopup.create(user);
        }

        user.pin.classList.toggle('map__pin--active');
      });
    };

    for (var i = 0; i < Math.min(window.usersArr.length, PINS_TO_RENDER); i++) {
      var user = window.usersArr[i];
      var newPin = templatePin.cloneNode(true);
      var img = newPin.querySelector('img');

      newPin.style.left = user.location.x + 'px';
      newPin.style.top = user.location.y + 'px';
      img.src = user.author.avatar;
      img.alt = user.offer.title;

      user.pin = newPin;
      pinClickListener(user);


      renderedPins.push(user.pin);
      pinFragment.appendChild(user.pin);
    }

    objectToRender.appendChild(pinFragment);
  }
  function pinsRemove() {
    renderedPins.forEach(function (pin) {
      pin.parentNode.removeChild(pin);
    });

    renderedPins = [];
  }


  window.pinsActions = {
    render: pinsRender,
    remove: pinsRemove,
  };
})();
