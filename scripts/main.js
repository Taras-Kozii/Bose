'use strict';

const form = document.querySelector('.form');
const page = document.querySelector('.page');
const menu = document.querySelector('.header__menu');
const burger = document.querySelector('.burger');
const transitionTime = 400;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  form.reset();
});

burger.addEventListener('click', () => {
  lockPage();
  burger.classList.toggle('active');
  menu.classList.toggle('active');
})

function lockPage() {
  const rightPaddingValue = window.innerWidth - document.documentElement.clientWidth + 'px';
  setFixPadding(rightPaddingValue);
  page.classList.toggle('lock');
}

function unLockPage() {
  setTimeout(() => {
    setFixPadding('0px');
    page.classList.toggle('lock');
  }, transitionTime);
}


function setFixPadding(rightPadding) {
  const fixItems = document.querySelectorAll('.right-fix-padding');

  for (const item of fixItems) {
    item.style.paddingRight = rightPadding;
  }
}