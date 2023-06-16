/**
 * Classe TabNav para controlar a navegação por abas.
 * @class
 * @export
 */
export default class TabNav {
  /**
   * Construtor da classe TabNav.
   * @constructor
   * @param {string} menu - Seletor CSS dos itens de menu.
   * @param {string} content - Seletor CSS dos conteúdos das abas.
   */
  constructor(menu, content, activeClass) {
    /**
     * Lista de itens de menu.
     * @type {NodeList}
     */
    this.menu = document.querySelectorAll(menu);
    /**
     * Lista de conteúdos das abas.
     * @type {NodeList}
     */
    this.content = document.querySelectorAll(content);
    /**
     * Classe CSS para indicar a aba ativa.
     * @type {string}
     */
    this.activeClass = activeClass;
  }

  /**
   * Ativa a aba especificada pelo índice.
   * @param {number} index - Índice da aba a ser ativada.
   */
  activeTab(index) {
    this.content.forEach((section) => {
      section.classList.remove(this.activeClass);
    });
    // Para qual lado a animação irá ocorrer
    const direcao = this.content[index].dataset.anime;
    this.content[index].classList.add(this.activeClass, direcao);
  }

  /**
   * Adiciona o evento de clique aos itens de menu para ativar as abas correspondentes.
   */
  addTabNavEvent() {
    this.menu.forEach((itemMenu, index) => {
      itemMenu.addEventListener('click', () => this.activeTab(index));
    });
  }

  /**
   * Inicializa o objeto TabNav.
   * Verifica se existem itens de menu e conteúdos das abas,
   * ativa a primeira aba e adiciona o evento de clique aos itens de menu.
   * @returns {TabNav} - A instância do objeto TabNav.
   */
  init() {
    if (this.menu.length && this.content.length) {
      this.activeTab(0);
      this.addTabNavEvent();
    }
    return this;
  }
}
