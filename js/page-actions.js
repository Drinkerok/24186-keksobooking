'use strict';

(function () {


  var activatePage = function () {
    window.formActions.activate();
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
