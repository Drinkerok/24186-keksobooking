'use strict';

(function () {
  var rating = {
    'housing-type': 1000,
    'housing-price': 500,
    'housing-rooms': 200,
    'housing-guests': 200,
    'conditioner': 50,
    'dishwasher': 50,
    'elevator': 50,
    'parking': 50,
    'washer': 50,
    'wifi': 50,
  };


  var setRating = {
    'housing-type': function (value, offer) {
      return (value === 'any' || value === offer.type) ? rating['housing-type'] : 0;
    },
    'housing-price': function (value, offer) {
      switch (value) {
        case 'any':
          return rating['housing-price'];
        case 'low':
          return (offer.price < 10000) ? rating['housing-price'] : 0;
        case 'middle':
          return (offer.price >= 10000 && offer.price < 500000) ? rating['housing-price'] : 0;
        case 'high':
          return (offer.price >= 50000) ? rating['housing-price'] : 0;
        default:
          return 0;
      }
    },
    'housing-rooms': function (value, offer) {
      return (value === 'any' || +value === offer.rooms) ? rating['housing-rooms'] : 0;
    },
    'housing-guests': function (value, offer) {
      return (value === 'any' || +value === offer.guests) ? rating['housing-guests'] : 0;
    },
    'conditioner': function (value, offer) {
      return (!value || !!offer.features['conditioner']) ? rating['conditioner'] : 0;
    },
    'dishwasher': function (value, offer) {
      return (!value || !!offer.features['dishwasher']) ? rating['dishwasher'] : 0;
    },
    'elevator': function (value, offer) {
      return (!value || !!offer.features['elevator']) ? rating['elevator'] : 0;
    },
    'parking': function (value, offer) {
      return (!value || !!offer.features['parking']) ? rating['parking'] : 0;
    },
    'washer': function (value, offer) {
      return (!value || !!offer.features['washer']) ? rating['washer'] : 0;
    },
    'wifi': function (value, offer) {
      return (!value || !!offer.features['wifi']) ? rating['wifi'] : 0;
    }
  };


  function pinsArrSorting(filterObj) {
    window.usersArr.forEach(function (item) {
      item.rating = 0;
      var offer = item.offer;

      for (var keyName in filterObj) {
        if (filterObj.hasOwnProperty(keyName)) {
          var filterValue = filterObj[keyName];

          item.rating += setRating[keyName](filterValue, offer) || 0;
        }
      }
    });

    function sortByRating(a, b) {
      return b.rating - a.rating;
    }
    window.usersArr.sort(sortByRating);
    window.pinsActions.render();
  }


  window.pinsSorting = pinsArrSorting;
})();
