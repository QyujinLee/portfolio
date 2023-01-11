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

  navbarMenu.classList.remove('open');
  scrollIntoView(link);
});

// 화면 작아진 경우, navbar toggle 버튼 제어
const btnNavbarToggle = document.querySelector('.navbar__toggle-btn');
btnNavbarToggle.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
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

// Projects
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

workBtnContainer.addEventListener('click', (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;

  if (!filter) {
    return;
  }

  // 버튼 액티브 set
  const active = document.querySelector('.category__btn.selected');
  active.classList.remove('selected');
  const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
  target.classList.add('selected');

  // 애니메이션 추가
  projectContainer.classList.add('anim-out');

  setTimeout(() => {
    //
    projects.forEach((project) => {
      if (filter === '*' || filter === project.dataset.type) {
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');
      }
    });

    // 애니메이션 제거
    projectContainer.classList.remove('anim-out');
  }, 300);
});

/**
 * selector로 scroll 이동
 * @param {string} selector
 */
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}
