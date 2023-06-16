/* eslint-disable function-paren-newline */
/* eslint-disable arrow-parens */
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
import outsideClick from './outsideclick.js';

export default class MenuMobile {
  constructor(menuButton, menuList, eventos) {
    this.menuButton = document.querySelector(menuButton);
    this.menuList = document.querySelector(menuList);
    this.eventos = eventos || ['click', 'touchstart'];

    this.openMenu = this.openMenu.bind(this);
  }

  openMenu(event) {
    event.preventDefault();
    this.menuList.classList.add('active');
    this.menuButton.classList.add('active');
    this.addAccessibility();
    outsideClick(this.menuList, this.eventos, () => {
      this.menuList.classList.remove('active');
      this.menuButton.classList.remove('active');
      this.addAccessibility();
    });
  }

  addAccessibility() {
    const btn = this.menuButton;
    const active = btn.classList.contains('active');
    btn.setAttribute('aria-expanded', active);
    if (active) {
      btn.setAttribute('aria-label', 'Fechar menu');
    } else {
      btn.setAttribute('aria-label', 'Abrir menu');
    }
  }

  addMobileEvents() {
    this.eventos.forEach((evento) =>
      this.menuButton.addEventListener(evento, this.openMenu)
    );
  }

  init() {
    if (this.menuButton && this.menuList) {
      this.addMobileEvents();
      this.addAccessibility();
    }
    return this;
  }
}
