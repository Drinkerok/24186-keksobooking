'use strict';

(function () {
  var map = document.querySelector('.map');

  var mapFilters = document.querySelector('.map__filters-container');
  var templateAll = document.querySelector('template').content;
  var templatePopup = templateAll.querySelector('.map__card');

  var popup = templatePopup.cloneNode(true);
  var popupFeaturesWrapper = popup.querySelector('.popup__features');
  var popupFeatures = popup.querySelectorAll('.popup__feature');
  var buttonClose = popup.querySelector('.popup__close');
  var photoTemplate = popup.querySelector('.popup__photo');

  function clearPopup() {
    popup.querySelector('.popup__title').textContent = '';
    popup.querySelector('.popup__text--address').textContent = '';
    popup.querySelector('.popup__text--price').textContent = '';
    popup.querySelector('.popup__type').textContent = '';
    popup.querySelector('.popup__text--capacity').textContent = '';
    popup.querySelector('.popup__text--time').textContent = '';
    popup.querySelector('.popup__description').textContent = '';

    for (var i = 0; i < popupFeatures.length; i++) {
      var feature = popupFeatures[i];
      popupFeaturesWrapper.appendChild(feature);
    }

    var photosTemplate = popup.querySelector('.popup__photos');
    photosTemplate.innerHTML = '';
    photosTemplate.appendChild(photoTemplate);

    popup.querySelector('.popup__avatar').src = '';
  }

  function createPopup(item) {
    clearPopup();

    if (!item) {
      item = window.usersArr[0];
    }

    var offer = item.offer;
    var placeType;
    switch (offer.type) {
      case 'flat':
        placeType = 'Квартира';
        break;
      case 'bungalo':
        placeType = 'Бунгало';
        break;
      case 'house':
        placeType = 'Дом';
        break;
      case 'palace':
        placeType = 'Дворец';
        break;
      default:
        placeType = 'Жилище';
    }

    popup.querySelector('.popup__title').textContent = offer.title;
    popup.querySelector('.popup__text--address').textContent = offer.address;
    popup.querySelector('.popup__text--price').textContent = offer.price + '₽/ночь';
    popup.querySelector('.popup__type').textContent = placeType;
    popup.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
    popup.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
    popup.querySelector('.popup__description').textContent = offer.description;

    var features = popup.querySelectorAll('.popup__feature');
    for (var i = offer.features.length; i < features.length; i++) {
      var feature = features[i];
      feature.parentNode.removeChild(feature);
    }

    var photosTemplate = popup.querySelector('.popup__photos');
    photosTemplate.removeChild(photoTemplate);

    for (i = 0; i < offer.photos.length; i++) {
      var photo = photoTemplate.cloneNode(true);
      photo.src = offer.photos[i];
      photosTemplate.appendChild(photo);
    }


    popup.querySelector('.popup__avatar').src = item.author.avatar;


    openPopup();
  }

  function openPopup() {
    map.insertBefore(popup, mapFilters);
  }
  function closePopup() {
    map.removeChild(popup, mapFilters);
  }

  buttonClose.addEventListener('click', closePopup);


  window.createPopup = createPopup;
})();
