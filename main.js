'use strict';

// navbar를 아래로 스크롤 시 투명이었던 navbar에 색 추가
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});

// navbar메뉴 클릭 시 스크롤링 제어
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;

  if (!link) {
    return;
  }

  scrollIntoView(link);
});

// home의 contact 버튼 클릭 시 contact화면으로 스크롤
const btnHomeContact = document.querySelector('button.home__contact');
btnHomeContact.addEventListener('click', (event) => {
  scrollIntoView('#contact');
});

// home화면에서 스크롤링되어 내려가면서 home컨텐츠의 투명도를 높임
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// 스크롤링되어 내려갈때 arrow-up 버튼 보이기
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add('visible');
  } else {
    arrowUp.classList.remove('visible');
  }
});

// arrow-up 버튼 클릭
arrowUp.addEventListener('click', () => {
  scrollIntoView('#home');
});

/**
 * selector로 scroll 이동
 * @param {string} selector
 */
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}
