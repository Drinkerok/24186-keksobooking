'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapMainPin = map.querySelector('.map__pin--main');

  var form = document.querySelector('.ad-form');

  var formInputs = form.querySelectorAll('input');
  var formSelects = form.querySelectorAll('select');
  var formButtons = form.querySelectorAll('button');

  var formAddress = form.querySelector('#address');

  var formType = form.querySelector('#type');
  var formPrice = form.querySelector('#price');

  var formTimeIn = form.querySelector('#timein');
  var formTimeOut = form.querySelector('#timeout');

  var formRoom = form.querySelector('#room_number');
  var formCapacity = form.querySelector('#capacity');
  var formCapacityOptions = formCapacity.querySelectorAll('option');

  var popupNotification = document.querySelector('.connection-notification');

  function setDisableToFields(disableState) {
    setDisableToCollection(formInputs, disableState);
    setDisableToCollection(formSelects, disableState);
    setDisableToCollection(formButtons, disableState);
  }
  function setDisableToCollection(collection, disableState) {
    for (var i = 0; i < collection.length; i++) {
      var item = collection[i];
      item.disabled = disableState;
    }
  }
  function activateForm() {
    setDisableToFields(false);
    form.classList.remove('ad-form--disabled');
  }
  function deactivateForm() {
    setDisableToFields(true);
    form.classList.add('ad-form--disabled');
  }


  function setPriceFromType() {
    var TypeToPrice = {
      bungalo: 0,
      flat: 1000,
      house: 5000,
      palace: 10000,
    };

    formPrice.placeholder = 'от ' + TypeToPrice[formType.value];
    formPrice.min = TypeToPrice[formType.value];
  }
  function onTimeChange(val) {
    timeSynchronization(val);
  }
  function timeSynchronization(val) {
    formTimeIn.value = val;
    formTimeOut.value = val;
  }


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
    window.showSuccess();
  };
  var onSendFail = function (response) {
    popupNotification.textContent = response;
    popupNotification.classList.add('open');

    setTimeout(function () {
      popupNotification.classList.remove('open');
    }, 1500);
  };
  var onFormReset = function () {
    window.pageActions.deactivatePage();
    window.pinsActions.remove();
    window.mainPinActions.resetPosition();
    checkRoomCapacity();
  };


  checkRoomCapacity();
  formRoom.addEventListener('change', function () {
    checkRoomCapacity();
  });
  formCapacity.addEventListener('change', function () {
    checkRoomCapacity();
  });


  form.addEventListener('submit', onFormSubmit);
  form.addEventListener('reset', onFormReset);


  setPriceFromType();
  formType.addEventListener('change', setPriceFromType);

  formTimeIn.addEventListener('change', function () {
    onTimeChange(formTimeIn.value);
  });
  formTimeOut.addEventListener('change', function () {
    onTimeChange(formTimeOut.value);
  });

  setDisableToFields(true);
  setAddressValue(mapMainPin);


  window.formActions = {
    activate: activateForm,
    deactivate: deactivateForm,
    setAddress: setAddressValue,
  };
})();
