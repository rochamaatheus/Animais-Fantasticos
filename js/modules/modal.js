/**
 * Classe Modal para controlar um modal.
 * @class
 * @export
 */
export default class Modal {
  /**
   * Construtor da classe Modal.
   * @constructor
   * @param {string} abrir - Seletor CSS para o elemento de abertura do modal.
   * @param {string} fechar - Seletor CSS para o elemento de fechamento do modal.
   * @param {string} container - Seletor CSS para o elemento container do modal.
   * @param {string} activeClass - Classe CSS para indicar o estado ativo do modal.
   */
  constructor(abrir, fechar, container, activeClass) {
    /**
     * Elemento de abertura do modal.
     * @type {HTMLElement}
     */
    this.abrir = document.querySelector(abrir);
    /**
     * Elemento de fechamento do modal.
     * @type {HTMLElement}
     */
    this.fechar = document.querySelector(fechar);
    /**
     * Elemento container do modal.
     * @type {HTMLElement}
     */
    this.container = document.querySelector(container);
    /**
     * Classe CSS para indicar o estado ativo do modal.
     * @type {string}
     */
    this.activeClass = activeClass;
    /**
     * Função de evento para alternar o estado do modal.
     * É feito o bind para manter o contexto.
     * @type {Function}
     */
    this.eventToggleModal = this.eventToggleModal.bind(this);
    /**
     * Função de evento para fechar o modal ao clicar fora.
     * É feito o bind para manter o contexto.
     * @type {Function}
     */
    this.cliqueForaModal = this.cliqueForaModal.bind(this);
  }

  /**
   * Alterna o estado do modal (ativo/inativo).
   */
  toggleModal() {
    this.container.classList.toggle(this.activeClass);
  }

  /**
   * Função de evento para fechar o modal ao clicar fora.
   */
  cliqueForaModal(event) {
    if (event.target === this.container) {
      this.toggleModal();
    }
  }

  /**
   * Função de evento para alternar o estado do modal.
   */
  eventToggleModal(event) {
    event.preventDefault();
    this.toggleModal();
  }

  /**
   * Adiciona os eventos de abertura, fechamento e clique fora do modal.
   */
  addModalEvent() {
    this.abrir.addEventListener('click', this.eventToggleModal);
    this.fechar.addEventListener('click', this.eventToggleModal);
    this.container.addEventListener('click', this.cliqueForaModal);
  }

  /**
   * Inicializa o objeto Modal.
   * Verifica se os elementos necessários existem e adiciona os eventos do modal.
   * @returns {Modal} - A instância do objeto Modal.
   */
  init() {
    if (this.abrir && this.fechar && this.container) {
      this.addModalEvent();
    }
    return this;
  }
}
