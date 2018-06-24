'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapMainPin = map.querySelector('.map__pin--main');

  var form = document.querySelector('.ad-form');
  var formAddress = form.querySelector('#address');
  var formRoom = form.querySelector('#room_number');
  var formCapacity = form.querySelector('#capacity');
  var formCapacityOptions = formCapacity.querySelectorAll('option');

  var popupNotification = document.querySelector('.connection-notification');

  function setAddressValue(pin) {
    var mainPinCenter = window.commonFunctions.getElCenter(pin);
    formAddress.value = '' + mainPinCenter.x + ', ' + mainPinCenter.y;
  }

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

    for (var i = 0; i < formCapacityOptions.length; i++) {
      var capacityOption = formCapacityOptions[i];
      var optionDataArr = capacityOption.getAttribute('data-room').split(',');

      if (optionDataArr.indexOf(formRoom.value) !== -1) {
        roomValidityString += capacityOption.innerHTML + ', ';
      }
    }
    roomValidityString = roomValidityString.slice(0, -2);

    return roomValidityString;
  }


  var onFormSubmit = function (e) {
    e.preventDefault();
    window.backend.save(new FormData(form), onSendSuccess, onSendFail);
  };
  var onSendSuccess = function () {
    form.reset();
    setAddressValue(mapMainPin);
    checkRoomCapacity();
  };
  var onSendFail = function (response) {
    popupNotification.textContent = response;
    popupNotification.classList.add('open');

    setTimeout(function () {
      popupNotification.classList.remove('open');
    }, 1500);
  };


  checkRoomCapacity();
  formRoom.addEventListener('change', function () {
    checkRoomCapacity();
  });
  formCapacity.addEventListener('change', function () {
    checkRoomCapacity();
  });


  form.addEventListener('submit', onFormSubmit);


  setAddressValue(mapMainPin);
  window.setAddressValue = setAddressValue;
})();
