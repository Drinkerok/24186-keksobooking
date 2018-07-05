'use strict';

(function () {
  var activatePage = function () {
    window.formActions.activate();

    window.filters.enable();
  };

  var deactivatePage = function () {
    window.formActions.deactivate();
    window.mapActions.deactivate();
  };


  window.pageActions = {
    activatePage: activatePage,
    deactivatePage: deactivatePage,
  };
})();
