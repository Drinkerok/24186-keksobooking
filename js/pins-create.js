'use strict';

(function () {
  var getRandomInteger = window.commonFunctions.getRandomInteger;
  var usersArr = [];


  function createPins(pinsData) {
    for (var i = 0; i < pinsData.length; i++) {
      var pinData = pinsData[i];
      var pinOffer = pinData.offer;

      usersArr.push({
        'author': {
          avatar: pinData.author.avatar || 'img/avatars/user0' + (i + 1) + '.png',
        },
        'offer': {
          title: pinOffer.title || 'Нет описания',
          address: pinOffer.address || 'Точного адреса нет',
          price: pinOffer.price || 'Цена не указана',
          type: pinOffer.type || 'Не указан тип',
          rooms: pinOffer.rooms || 'Не указано кол-во комнат',
          guests: pinOffer.guests || 'Не указано кол-во гостей',
          checkin: pinOffer.checkin || 'Не указано время заезда',
          checkout: pinOffer.checkout || 'Не указано время выезда',
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


  window.usersArr = usersArr;
})();
