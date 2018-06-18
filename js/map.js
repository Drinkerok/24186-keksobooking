'use strict';

var PINS_NUMBER = 8;
var usersArr = [];
var titlesArr = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде',
];
var typesArr = [
  'palace',
  'flat',
  'house',
  'bungalo',
];
var checkTimeArr = [
  '12:00',
  '13:00',
  '14:00',
];
var featuresArr = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
var photosArr = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];


function getRandomInteger(min, max) {
  var rand = min + Math.random() * (max - min + 1);
  rand = Math.floor(rand);
  return rand;
}
function getRandomFeatures() {
  var number = getRandomInteger(1, featuresArr.length);
  var features = [];

  for (var i = 0; i < number; i++) {
    features.push(featuresArr[i]);
  }

  return features;
}
function getPhotos() {
  var photos = [];
  for (var i = 0; i < photosArr.length; i++) {
    photos.push(photosArr[i]);
  }

  function sortRandom() {
    return Math.random() - 0.5;
  }
  photos.sort(sortRandom);

  return photos;
}


for (var i = 0; i < PINS_NUMBER; i++) {
  usersArr.push({
    'author': {
      avatar: 'img/avatars/user0' + (i + 1) + '.png',
    },
    'offer': {
      title: titlesArr[i],
      address: '600, 350',
      price: getRandomInteger(1000, 1000000),
      type: typesArr[getRandomInteger(0, typesArr.length - 1)],
      rooms: getRandomInteger(1, 5),
      guests: getRandomInteger(1, 10),
      checkin: checkTimeArr[getRandomInteger(0, checkTimeArr.length - 1)],
      checkout: checkTimeArr[getRandomInteger(0, checkTimeArr.length - 1)],
      features: getRandomFeatures(),
      description: '',
      photos: getPhotos(),
    },
    'location': {
      'x': getRandomInteger(300, 900),
      'y': getRandomInteger(130, 630),
    }
  });
}


var templateAll = document.querySelector('template').content;
var templatePin = templateAll.querySelector('.map__pin');
var templatePopup = templateAll.querySelector('.map__card');

function createPins() {
  var pinFragment = document.createDocumentFragment();

  for (i = 0; i < PINS_NUMBER; i++) {
    var user = usersArr[i];
    var newPin = templatePin.cloneNode(true);
    var img = newPin.querySelector('img');

    newPin.style.left = user.location.x + 'px';
    newPin.style.top = user.location.y + 'px';
    img.src = user.author.avatar;
    img.alt = user.offer.title;

    newPin.addEventListener('click', onPinClick);

    pinFragment.appendChild(newPin);
  }

  document.querySelector('.map__pins').appendChild(pinFragment);
}

var popup = null;
function onPinClick(e) {
  e.preventDefault();
  if (!popup) {
    createPopup();
  }

  map.insertBefore(popup, mapFilters);
}
function createPopup(item) {
  if (!item) {
    item = usersArr[0];
  }

  popup = templatePopup.cloneNode(true);
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
  for (i = offer.features.length; i < features.length; i++) {
    var feature = features[i];
    feature.parentNode.removeChild(feature);
  }

  var photosTemplate = popup.querySelector('.popup__photos');
  var photoTemplate = photosTemplate.querySelector('.popup__photo');
  photosTemplate.removeChild(photoTemplate);
  for (i = 0; i < offer.photos.length; i++) {
    var photo = photoTemplate.cloneNode(true);
    photo.src = offer.photos[i];
    photosTemplate.appendChild(photo);
  }


  popup.querySelector('.popup__avatar').src = item.author.avatar;

  map.insertBefore(popup, mapFilters);
}


function activatePage() {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');

  mainPinCenter = getElCenter(mapMainPin);
  mainPinCenter.y += PIN_BOTTOM_DELTA;
  setAddressValue(mainPinCenter.x, mainPinCenter.y);

  createPins();
}
function setAddressValue(x, y) {
  formAddress.value = '' + x + ', ' + y;
}
function getElCenter(el) {
  var elCoords = el.getBoundingClientRect();
  return {
    'x': +(((elCoords.right - elCoords.left) / 2).toFixed(0)),
    'y': +(((elCoords.bottom - elCoords.top) / 2).toFixed(0)),
  };
}


var map = document.querySelector('.map');
var mapFilters = map.querySelector('.map__filters-container');
var mapMainPin = map.querySelector('.map__pin--main');
var PIN_BOTTOM_DELTA = 16;

var form = document.querySelector('.ad-form');
var formAddress = form.querySelector('#address');

var mainPinCenter = getElCenter(mapMainPin);
setAddressValue(mainPinCenter.x, mainPinCenter.y);
mapMainPin.addEventListener('mouseup', activatePage);


var formRoom = form.querySelector('#room_number');
var formCapacity = form.querySelector('#capacity');
var formCapacityOptions = formCapacity.querySelectorAll('option');

checkRoomCapacity();
formRoom.addEventListener('change', function () {
  checkRoomCapacity();
});
formCapacity.addEventListener('change', function () {
  checkRoomCapacity();
});

function checkRoomCapacity() {
  var selectedOption = formCapacity.options[formCapacity.selectedIndex];
  var capacityDataArr = selectedOption.getAttribute('data-room').split(',');

  if (capacityDataArr.indexOf(formRoom.value) === -1) {
    formCapacity.setCustomValidity(getRoomValidityString());
    return;
  }

  formCapacity.setCustomValidity('');
}
function getRoomValidityString() {
  var roomValidityString = 'Допустимые значения: ';

  for (i = 0; i < formCapacityOptions.length; i++) {
    var capacityOption = formCapacityOptions[i];
    var optionDataArr = capacityOption.getAttribute('data-room').split(',');

    if (optionDataArr.indexOf(formRoom.value) !== -1) {
      roomValidityString += capacityOption.innerHTML + ', ';
    }
  }
  roomValidityString = roomValidityString.slice(0, -2);

  return roomValidityString;
}

