/**
 * Classe Accordion para criar um componente de acordeão.
 * @class
 * @export
 */
export default class Accordion {
  /**
   * Construtor da classe Accordion.
   * @constructor
   * @param {string} list - Seletor CSS para os elementos do acordeão.
   * @param {string} activeClass - Seletor CSS para a classe ativa do acordeão.
   */
  constructor(list, activeClass) {
    /**
     * Lista de elementos do acordeão.
     * @type {NodeList}
     */
    this.accordionList = document.querySelectorAll(list);
    /**
     * Classe CSS para indicar o estado ativo do acordeão.
     * @type {string}
     */
    this.activeClass = activeClass;
  }

  /**
   * Alterna o estado do acordeão.
   * @param {HTMLElement} item - O item do acordeão a ser alternado.
   */
  toggleAccordion(item) {
    item.classList.toggle(this.activeClass);
    item.nextElementSibling.classList.toggle(this.activeClass);
  }

  /**
   * Adiciona o evento de clique aos itens do acordeão.
   */
  addAccordionEvent() {
    this.accordionList.forEach((item) => {
      item.addEventListener('click', () => this.toggleAccordion(item));
    });
  }

  /**
   * Inicializa o componente Accordion.
   * Se houver itens no acordeão, o primeiro item será aberto
   * e o evento de clique será adicionado a todos os itens.
   * @returns {Accordion} - A instância do objeto Accordion.
   */
  init() {
    if (this.accordionList.length) {
      this.toggleAccordion(this.accordionList[0]);
      this.addAccordionEvent();
    }
    return this;
  }
}
