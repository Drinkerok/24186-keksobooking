'use strict';

(function () {
  var getRandomInteger = window.commonFunctions.getRandomInteger;
  var users = [];


  function createPins(pinsData) {
    for (var i = 0; i < pinsData.length; i++) {
      var pinData = pinsData[i];
      var pinOffer = pinData.offer;

      users.push({
        'author': {
          avatar: pinData.author.avatar || 'img/avatars/user0' + (i + 1) + '.png',
        },
        'offer': {
          title: pinOffer.title || '? ',
          address: pinOffer.address || '? ',
          price: pinOffer.price || '? ',
          type: pinOffer.type || '? ',
          rooms: pinOffer.rooms || '? ',
          guests: pinOffer.guests || '? ',
          checkin: pinOffer.checkin || '? ',
          checkout: pinOffer.checkout || '? ',
          features: pinOffer.features || [],
          description: pinOffer.description || '',
          photos: pinOffer.photos || [],
        },
        'location': {
          'x': pinData.location.x || getRandomInteger(300, 900),
          'y': pinData.location.y || getRandomInteger(130, 630),
        }
      });
    }
  }


  window.backend.load(createPins);


  window.usersArr = users;
})();
