export default class TabNav {
  constructor(menu, content) {
    this.menu = document.querySelectorAll(menu);
    this.content = document.querySelectorAll(content);
    this.activeClass = 'ativo';
  }

  activeTab(index) {
    this.content.forEach((section) => {
      section.classList.remove(this.activeClass);
    });
    const direcao = this.content[index].dataset.anime;
    this.content[index].classList.add(this.activeClass, direcao);
  }

  addTabNavEvent() {
    this.menu.forEach((itemMenu, index) => {
      itemMenu.addEventListener('click', () => this.activeTab(index));
    });
  }

  init() {
    if (this.menu.length && this.content.length) {
      this.activeTab(0);
      this.addTabNavEvent();
    }
    return this;
  }
}
