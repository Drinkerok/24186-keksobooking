'use strict';

var map = document.querySelector('.map');

function mapActivate() {
  map.classList.remove('map--faded');
}
function mapDeactivate() {
  map.classList.add('map--faded');
}

window.mapActions = {
  activate: mapActivate,
  deactivate: mapDeactivate
};
