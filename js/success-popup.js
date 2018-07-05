'use strict';

var successBlock = document.querySelector('.success');

function successOpen() {
  successBlock.classList.remove('hidden');
  window.addEventListener('keydown', closeByEsc);
  window.addEventListener('click', closeByClick);
}
function successClose() {
  successBlock.classList.add('hidden');
  window.removeEventListener('keydown', closeByEsc);
  window.removeEventListener('click', closeByClick);
}

function closeByEsc(e) {
  if (e.keyCode === 27) {
    successClose();
  }
}
function closeByClick() {
  successClose();
}


window.showSuccess = successOpen;
