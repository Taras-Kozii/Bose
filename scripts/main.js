'use strict';

const form = document.querySelector('.form');
const header = document.querySelector('.header');
const page = document.querySelector('.page');
const menu = document.querySelector('.header__menu');
const burger = document.querySelector('.burger');
const transitionTime = 400;
const menuLinks = document.querySelectorAll('.menu__link');
const pageTitle = document.querySelector('.hero__title');
const parallaxImgs = document.querySelectorAll('.parallax-img');

window.addEventListener('load', () => {
  addGlassmorphToHeader();
});
window.addEventListener('scroll', () => {
  addGlassmorphToHeader();
});

for (const link of menuLinks) {
  link.addEventListener('click', e => {
    e.preventDefault();
    lockPage();
    burger.classList.toggle('active');
    menu.classList.toggle('active');

    window.scrollTo({
      top: getScrollToBlockValue(e.target),
      behavior: "smooth"
    })
  });
}

for (const item of parallaxImgs) {
  const itemContainer = item.parentElement;
  const imgSrc = item.getAttribute('src');
  const newUrl = `url("../../.${imgSrc}")`;
  setCSSProperty(itemContainer, '--image-url', newUrl);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  form.reset();
});

burger.addEventListener('click', () => {
  lockPage();
  burger.classList.toggle('active');
  menu.classList.toggle('active');
});


function lockPage() {
  const rightPaddingValue = window.innerWidth - document.documentElement.clientWidth + 'px';
  setFixPadding(rightPaddingValue);
  page.classList.toggle('lock');
}

function setFixPadding(rightPadding) {
  const fixItems = document.querySelectorAll('.right-fix-padding');

  for (const item of fixItems) {
    item.style.paddingRight = rightPadding;
  }
}

function getScrollToBlockValue(link) {
  const blockName = link.dataset.goto;
  const block = document.querySelector(blockName);
  const scrollValue = block.getBoundingClientRect().top + window.scrollY - header.offsetHeight;
  return scrollValue || 0;
}

function setCSSProperty(item, property, value) {
  item.style.setProperty(property, value);
}

function addGlassmorphToHeader() {
  const titleTop = pageTitle.getBoundingClientRect().top;

  if (titleTop >= header.offsetHeight) {
    setCSSProperty(header, '--before-opacity', '0');
  } else {
    setCSSProperty(header, '--before-opacity', '1');
  }
}