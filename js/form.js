'use strict';

(function () {
  var TYPE_TO_PRICE = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
  };

  var map = document.querySelector('.map');
  var mapMainPin = map.querySelector('.map__pin--main');

  var form = document.querySelector('.ad-form');

  var formInputs = form.querySelectorAll('input');
  var formSelects = form.querySelectorAll('select');
  var formButtons = form.querySelectorAll('button');

  var formAddress = form.querySelector('#address');

  var formTitle = form.querySelector('#title');
  var formType = form.querySelector('#type');
  var formPrice = form.querySelector('#price');

  var formTimeIn = form.querySelector('#timein');
  var formTimeOut = form.querySelector('#timeout');

  var formRoom = form.querySelector('#room_number');
  var formCapacity = form.querySelector('#capacity');
  var formCapacityOptions = formCapacity.querySelectorAll('option');

  var formSubmit = form.querySelector('.ad-form__submit');




  var popupNotification = document.querySelector('.connection-notification');

  var formFieldsValid = {
    title: {
      status: false,
      input: formTitle
    },
    price: {
      status: false,
      input: formPrice
    }
  }

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


  function onFieldInput(input, key) {
    formFieldsValid[key].input.style = '';
    formFieldsValid[key].status = input.validity.valid;
  }


  function setPriceFromType() {
    formPrice.placeholder = 'от ' + TYPE_TO_PRICE[formType.value];
    formPrice.min = TYPE_TO_PRICE[formType.value];
  }
  function onTimeChange(val) {
    synchronizeTime(val);
  }
  function synchronizeTime(val) {
    formTimeIn.value = val;
    formTimeOut.value = val;
  }


  function setAddressValue(coords) {
    formAddress.value = '' + coords.x + ', ' + coords.y;
  }


  function checkRoomCapacity() {
    var someOptionSelected = false;

    for (var i = 0; i < formCapacityOptions.length; i++) {
      var capacityOption = formCapacityOptions[i];
      var optionDataArr = capacityOption.getAttribute('data-room').split(',');

      var optionCurrect = !(optionDataArr.indexOf(formRoom.value) === -1);

      capacityOption.disabled = !optionCurrect;
      if (!optionCurrect) {
        capacityOption.selected = false;
      } else if (!someOptionSelected) {
        someOptionSelected = true;
        capacityOption.selected = true;
      }
    }
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

  var isFormValid = function () {
    for (var key in formFieldsValid) {
      if (formFieldsValid[key].status === false) {
        formFieldsValid[key].input.style = 'border: 2px solid #f00';
      }
    }
  }

  formTitle.addEventListener('input', function () {
    onFieldInput(formTitle, 'title');
  });
  formPrice.addEventListener('input', function () {
    onFieldInput(formPrice, 'price');
  });

  checkRoomCapacity();
  formRoom.addEventListener('change', function () {
    checkRoomCapacity();
  });
  formCapacity.addEventListener('change', function () {
    checkRoomCapacity();
  });


  form.addEventListener('submit', function(e) {
    onFormSubmit(e);
  });
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

  formSubmit.addEventListener('click', function (e) {
    isFormValid();
  })


  window.formActions = {
    activate: activateForm,
    deactivate: deactivateForm,
    setAddress: setAddressValue,
  };
})();
