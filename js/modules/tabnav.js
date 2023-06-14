export default class TabNav {
  constructor(tabMenu, tabContent) {
    this.tabMenu = document.querySelectorAll(tabMenu);
    this.tabContent = document.querySelectorAll(tabContent);
  }

  activeTab(index) {
    this.tabContent.forEach((section) => {
      section.classList.remove('ativo');
    });
    const direcao = this.tabContent[index].dataset.anime;
    this.tabContent[index].classList.add('ativo', direcao);
  }

  init() {
    if (this.tabMenu.length && this.tabContent.length) {
      this.tabContent[0].classList.add('ativo');
      this.tabMenu.forEach((itemMenu, index) => {
        itemMenu.addEventListener('click', () => {
          this.activeTab(index);
        });
      });
    }
  }
}
