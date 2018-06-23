'use strict';

(function () {
  var PINS_NUMBER = 8;
  var vars = window.vars;
  var getRandomInteger = window.commonFunctions.getRandomInteger;
  var getRandomFeatures = window.commonFunctions.getRandomFeatures;
  var usersArr = [];


  function getPhotos() {
    var photos = [];
    for (var i = 0; i < vars.photosArr.length; i++) {
      photos.push(vars.photosArr[i]);
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
        title: vars.titlesArr[i],
        address: '600, 350',
        price: getRandomInteger(1000, 1000000),
        type: vars.typesArr[getRandomInteger(0, vars.typesArr.length - 1)],
        rooms: getRandomInteger(1, 5),
        guests: getRandomInteger(1, 10),
        checkin: vars.checkTimeArr[getRandomInteger(0, vars.checkTimeArr.length - 1)],
        checkout: vars.checkTimeArr[getRandomInteger(0, vars.checkTimeArr.length - 1)],
        features: getRandomFeatures(vars.featuresArr),
        description: '',
        photos: getPhotos(),
      },
      'location': {
        'x': getRandomInteger(300, 900),
        'y': getRandomInteger(130, 630),
      }
    });
  }


  window.usersArr = usersArr;
})();
