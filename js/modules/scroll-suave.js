/**
 * Classe ScrollSuave para adicionar comportamento de rolagem suave aos links internos.
 * @class
 * @export
 */
export default class ScrollSuave {
  /**
   * Construtor da classe ScrollSuave.
   * @constructor
   * @param {string} links - Seletor CSS dos links internos.
   * @param {object} options - Opções de rolagem suave.
   * Padrão: { behavior: 'smooth', block: 'start' }.
   */
  constructor(links, options) {
    /**
     * Lista de elementos de links internos.
     * @type {NodeList}
     */
    this.linksInternos = document.querySelectorAll(links);
    /**
     * Opções de rolagem suave.
     * @type {object}
     */
    if (options === undefined) {
      this.options = { behavior: 'smooth', block: 'start' };
    } else this.options = options;
    /**
     * Função de scroll
     * Função de bind para garantir o contexto do método `scrollToSection`.
     * @type {Function}
     */
    this.scrollToSection = this.scrollToSection.bind(this);
  }

  /**
   * Método responsável por rolar suavemente para a seção alvo.
   * @param {Event} event - Objeto de evento do clique no link interno.
   */
  scrollToSection(event) {
    event.preventDefault();
    const href = event.currentTarget.getAttribute('href');
    const section = document.querySelector(href);
    section.scrollIntoView(this.options);
  }

  /**
   * Adiciona o evento de clique aos links internos.
   */
  addLinkEvent() {
    this.linksInternos.forEach((link) => {
      link.addEventListener('click', this.scrollToSection);
    });
  }

  /**
   * Inicializa o objeto ScrollSuave.
   * Verifica se existem links internos, adiciona o evento de clique e retorna a instância.
   * @returns {ScrollSuave} - A instância do objeto ScrollSuave.
   */
  init() {
    if (this.linksInternos.length) {
      this.addLinkEvent();
    }
    return this;
  }
}
