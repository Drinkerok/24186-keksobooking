'use strict';

(function () {
  var templateAll = document.querySelector('template').content;
  var templatePin = templateAll.querySelector('.map__pin');
  var pinsRendered = false;


  var renderPins = function (elToRender) {
    if (pinsRendered) {
      return;
    }

    pinsRendered = true;
    var pinFragment = document.createDocumentFragment();

    var pinClickListener = function (user) {
      user.pin.addEventListener('click', function () {
        window.createPopup(user);
      });
    };

    for (var i = 0; i < window.usersArr.length; i++) {
      var user = window.usersArr[i];
      var newPin = templatePin.cloneNode(true);
      var img = newPin.querySelector('img');

      newPin.style.left = user.location.x + 'px';
      newPin.style.top = user.location.y + 'px';
      img.src = user.author.avatar;
      img.alt = user.offer.title;

      user.pin = newPin;
      pinClickListener(user);


      pinFragment.appendChild(user.pin);
    }

    elToRender.appendChild(pinFragment);
  };


  window.renderPins = renderPins;
})();
