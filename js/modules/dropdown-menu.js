import outsideClick from './outsideclick.js';

/**
 * Classe DropdownMenu para criar um menu suspenso.
 * @class
 * @export
 */
export default class DropdownMenu {
  /**
   * Construtor da classe DropdownMenu.
   * @constructor
   * @param {string} dropdownMenus - Seletor CSS para os menus suspensos.
   * @param {Array<string>} events - Array de eventos que acionam a abertura do menususpenso.
   * O padrão é ['touchstart', 'click'].
   * @param {string} activeClass - Seletor CSS para classe ativa.
   */
  constructor(dropdownMenus, events, activeClass) {
    /**
     * Lista de menus suspensos.
     * @type {NodeList}
     */
    this.dropdownMenus = document.querySelectorAll(dropdownMenus);
    /**
     * Classe CSS para indicar o estado ativo do menu suspenso.
     * @type {string}
     */
    this.activeClass = activeClass;
    /**
     * Array de eventos que acionam a abertura do menu suspenso.
     * @type {Array<string>}
     */
    this.events = events || ['touchstart', 'click'];
    /**
     * Função de clique para lidar com a abertura e fechamento do menu suspenso.
     * É necessário fazer o bind para manter o contexto da classe.
     */
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * Manipula o evento de clique em um menu suspenso.
   * @param {Event} event - O evento de clique.
   */
  handleClick(event) {
    event.preventDefault();
    const el = event.currentTarget;
    el.classList.add(this.activeClass);
    outsideClick(el, this.events, () => {
      el.classList.remove(this.activeClass);
    });
  }

  /**
   * Adiciona o evento de clique aos menus suspensos.
   */
  addDropdownMenusEvent() {
    this.dropdownMenus.forEach((menu) => {
      this.events.forEach((userEvent) => {
        menu.addEventListener(userEvent, this.handleClick);
      });
    });
  }

  /**
   * Inicializa o componente DropdownMenu.
   * Verifica se existem menus suspensos definidos e adiciona o evento de clique.
   * @returns {DropdownMenu} - A instância do objeto DropdownMenu.
   */
  init() {
    if (this.dropdownMenus.length) {
      this.addDropdownMenusEvent();
    }
    return this;
  }
}
