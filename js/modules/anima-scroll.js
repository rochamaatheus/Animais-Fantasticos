import debounce from './debounce.js';

/**
 * Classe AnimaScroll para animar elementos conforme a rolagem da página.
 * @class
 * @export
 */
export default class AnimaScroll {
  /**
   * Construtor da classe AnimaScroll.
   * @constructor
   * @param {string} sections - Seletor CSS para as seções a serem animadas.
   */
  constructor(sections) {
    /**
     * Lista de elementos de seções.
     * @type {NodeList}
     */
    this.sections = document.querySelectorAll(sections);
    /**
     * Metade da altura da janela para calcular a visibilidade da seção.
     * @type {number}
     */
    this.windowMetade = window.innerHeight * 0.6;
    /**
     * Função debounce para melhorar o desempenho ao lidar com eventos de rolagem.
     * É necessário fazer o bind para manter o contexto da classe.
     */
    this.animaScroll = debounce(this.animaScroll.bind(this), 50);
  }

  /**
   * Função para animar as seções com base na posição de rolagem.
   */
  animaScroll() {
    this.sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const isSectionVisible = sectionTop - this.windowMetade < 0;
      if (isSectionVisible) {
        section.classList.add('ativo');
      } else if (section.classList.contains('ativo')) {
        section.classList.remove('ativo');
      }
    });
  }

  /**
   * Remove o evento de rolagem.
   */
  stop() {
    window.removeEventListener('scroll', this.animaScroll);
  }

  /**
   * Inicializa o componente AnimaScroll.
   * Verifica se existem seções definidas e adiciona o evento de rolagem.
   * @returns {AnimaScroll} - A instância do objeto AnimaScroll.
   */
  init() {
    if (this.sections.length) {
      this.animaScroll();
      window.addEventListener('scroll', this.animaScroll);
    }
    return this;
  }
}
