'use strict';

const form = document.querySelector('.form');
const header = document.querySelector('.header');
const page = document.querySelector('.page');
const menu = document.querySelector('.header__menu');
const burger = document.querySelector('.burger');
const transitionTime = 400;
const menuLinks = document.querySelectorAll('.menu__link');
const pageTitle = document.querySelector('.hero__title');
const parallaxImgs = document.querySelectorAll('.bg-img');
const zoomImgs = document.querySelectorAll('.zoom-img');
const imgs3d = document.querySelectorAll('.img-3d');
const inkBlock = document.querySelector('.hero__fullscreen');

document.addEventListener('DOMContentLoaded', () => {
  inkBlock.classList.add('show');
  header.classList.add('show');
  pageTitle.classList.add('show');
  setBgImgContainer();
  addGlassmorphToHeader();
});

window.addEventListener('scroll', () => {
  addGlassmorphToHeader();
  toggleAnimItems();
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
form.addEventListener('submit', (e) => {
  e.preventDefault();
  form.reset();
});

burger.addEventListener('click', () => {
  lockPage();
  burger.classList.toggle('active');
  menu.classList.toggle('active');
});

for (const img of zoomImgs) {
  const imgContainer = img.parentElement;
  const imgSrc = img.getAttribute('src');
  const newUrl = `url("../../.${imgSrc}")`;

  imgContainer.addEventListener("mousemove", e => {
    imgContainer.style.backgroundPosition = -e.offsetX + 'px ' + -e.offsetY + 'px';
  });
  
  setCSSProperty(imgContainer, '--image-url', newUrl);
}

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

function setBgImgContainer() {
  for (const item of parallaxImgs) {
    const itemContainer = item.parentElement;
    const imgSrc = item.getAttribute('src');
    const newUrl = 'url('+ '../.' + imgSrc + ')';

    setCSSProperty(itemContainer, '--image-url', newUrl);
  }
}

function addGlassmorphToHeader() {
  const titleTop = pageTitle.getBoundingClientRect().top;

  if (titleTop >= header.offsetHeight) {
    setCSSProperty(header, '--before-opacity', '0');
  } else {
    setCSSProperty(header, '--before-opacity', '1');
  }
}
function toggleAnimItems(selector = '.scroll-anim') {
  const animItems = document.querySelectorAll(selector);
  
    animItems.forEach(item => {
      if (isInView(item, 0.50)) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    })
  }
  
  function isInView(elem, persent= 0.35) {
    const rect = elem.getBoundingClientRect();
    const elemHeight = elem.offsetHeight;
    const visiblePart = elemHeight * persent;
    
    return rect.bottom > 0 && rect.top < (
      window.innerHeight - visiblePart || document.documentElement.clientHeight - visiblePart);
  }