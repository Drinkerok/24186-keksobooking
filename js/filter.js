'use strict';

(function () {
  var container = document.querySelector('.map__filters-container');
  var form = container.querySelector('.map__filters');
  var selects = form.querySelectorAll('select');
  var checkboxes = form.querySelectorAll('input[type="checkbox"]');


  form.style.display = 'none';

  form.addEventListener('change', function () {
    window.pinsSorting(getInformation());
  });

  function enableFilters() {
    form.style.display = '';
  }
  function getInformation() {
    var values = {};
    var i;

    for (i = 0; i < selects.length; i++) {
      var select = selects[i];
      values[select.name] = select.value;
    }

    for (i = 0; i < checkboxes.length; i++) {
      var checkbox = checkboxes[i];
      values[checkbox.value] = checkbox.checked;
    }

    return values;
  }


  window.filters = {
    enable: enableFilters,
  };
})();
