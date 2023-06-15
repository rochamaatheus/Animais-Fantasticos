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
  }

  openMenu() {
    this.menuList.classList.add('active');
    this.menuButton.classList.add('active');
    outsideClick(this.menuList, this.eventos, () => {
      this.menuList.classList.remove('active');
      this.menuButton.classList.remove('active');
    });
  }

  init() {
    if (this.menuButton) {
      this.eventos.forEach((evento) =>
        this.menuButton.addEventListener(evento, this.openMenu)
      );
    }
  }
}
