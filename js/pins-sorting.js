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


  var ratingFromFilter = {
    'set-housing-type': function (value, offer) {
      return (value === 'any' || value === offer.type) ? rating['housing-type'] : 0;
    },
    'set-housing-price': function (value, offer) {
      switch (value) {
        case 'any':
          return rating['housing-price'];
        case 'low':
          return (offer.price < 10000) ? rating['housing-price'] : 0;
        case 'middle':
          return (offer.price >= 10000 && offer.price < 50000) ? rating['housing-price'] : 0;
        case 'high':
          return (offer.price >= 50000) ? rating['housing-price'] : 0;
        default:
          return 0;
      }
    },
    'set-housing-rooms': function (value, offer) {
      return (value === 'any' || +value === offer.rooms) ? rating['housing-rooms'] : 0;
    },
    'set-housing-guests': function (value, offer) {
      return (value === 'any' || +value === offer.guests) ? rating['housing-guests'] : 0;
    },
    'set-conditioner': function (value, offer) {
      return (!value || offer.features.indexOf('conditioner') !== -1) ? rating['conditioner'] : 0;
    },
    'set-dishwasher': function (value, offer) {
      return (!value || offer.features.indexOf('dishwasher') !== -1) ? rating['dishwasher'] : 0;
    },
    'set-elevator': function (value, offer) {
      return (!value || offer.features.indexOf('elevator') !== -1) ? rating['elevator'] : 0;
    },
    'set-parking': function (value, offer) {
      return (!value || offer.features.indexOf('parking') !== -1) ? rating['parking'] : 0;
    },
    'set-washer': function (value, offer) {
      return (!value || offer.features.indexOf('washer') !== -1) ? rating['washer'] : 0;
    },
    'set-wifi': function (value, offer) {
      return (!value || offer.features.indexOf('wifi') !== -1) ? rating['wifi'] : 0;
    }
  };


  function sortPins(filterObj) {
    window.usersArr.forEach(function (item) {
      item.rating = 0;
      var offer = item.offer;

      for (var keyName in filterObj) {
        if (filterObj.hasOwnProperty(keyName)) {
          var filterValue = filterObj[keyName];

          item.rating += ratingFromFilter['set-' + keyName](filterValue, offer) || 0;
        }
      }
    });

    function sortByRating(a, b) {
      return b.rating - a.rating;
    }
    window.usersArr.sort(sortByRating);
    window.pinsActions.render();
  }


  window.sortPins = sortPins;
})();
