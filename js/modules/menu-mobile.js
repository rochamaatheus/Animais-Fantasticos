/* eslint-disable function-paren-newline */
/* eslint-disable arrow-parens */
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
import outsideClick from './outsideclick.js';

/**
 * Classe MenuMobile para controlar o menu mobile.
 * @class
 * @export
 */
export default class MenuMobile {
  /**
   * Construtor da classe MenuMobile.
   * @constructor
   * @param {string} menuButton - Seletor CSS para o botão do menu.
   * @param {string} menuList - Seletor CSS para a lista do menu.
   * @param {Array<string>} events - Array de eventos para abrir o menu.
   * Padrão: ['click', 'touchstart'].
   */
  constructor(menuButton, menuList, events) {
    /**
     * Botão do menu.
     * @type {HTMLElement}
     */
    this.menuButton = document.querySelector(menuButton);
    /**
     * Lista do menu.
     * @type {HTMLElement}
     */
    this.menuList = document.querySelector(menuList);
    /**
     * Array de eventos para abrir o menu.
     * @type {Array<string>}
     */
    this.events = events || ['click', 'touchstart'];

    this.openMenu = this.openMenu.bind(this);
  }

  /**
   * Abre o menu mobile.
   * @param {Event} event - O evento de clique.
   */
  openMenu(event) {
    event.preventDefault();
    this.menuList.classList.add('active');
    this.menuButton.classList.add('active');
    this.addAccessibility();
    outsideClick(this.menuList, this.events, () => {
      this.menuList.classList.remove('active');
      this.menuButton.classList.remove('active');
      this.addAccessibility();
    });
  }

  /**
   * Adiciona atributos de acessibilidade ao botão do menu.
   */
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

  /**
   * Adiciona os eventos do menu mobile.
   */
  addMobileEvents() {
    this.events.forEach((evento) =>
      this.menuButton.addEventListener(evento, this.openMenu)
    );
  }

  /**
   * Inicializa o objeto MenuMobile.
   * Verifica se o botão e a lista do menu estão presentes e adiciona
   *  os eventos e atributos de acessibilidade.
   * @returns {MenuMobile} - A instância do objeto MenuMobile.
   */
  init() {
    if (this.menuButton && this.menuList) {
      this.addMobileEvents();
      this.addAccessibility();
    }
    return this;
  }
}
