import outsideClick from './outsideclick.js';

export default class DropdownMenu {
  constructor(dropdownMenus, events) {
    this.dropdownMenus = document.querySelectorAll(dropdownMenus);
    this.activeClass = 'active';
    this.events = events || ['touchstart', 'click'];

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    const el = event.currentTarget;
    el.classList.add(this.activeClass);
    outsideClick(el, this.events, () => {
      el.remove(this.activeClass);
    });
  }

  addDropdownMenusEvent() {
    this.dropdownMenus.forEach((menu) => {
      this.events.forEach((userEvent) => {
        menu.addEventListener(userEvent, this.handleClick);
      });
    });
  }

  init() {
    if (this.dropdownMenus.length) {
      this.addDropdownMenusEvent();
    }
  }
}
