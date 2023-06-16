/**
 * Classe Tooltip para exibir tooltips informativos.
 * @class
 * @export
 */
export default class Tooltip {
  /**
   * Construtor da classe Tooltip.
   * @constructor
   * @param {string} tooltips - Seletor CSS dos elementos que terão tooltips.
   */
  constructor(tooltips) {
    /**
     * Lista de elementos que terão tooltips.
     * @type {NodeList}
     */
    this.tooltips = document.querySelectorAll(tooltips);
    /**
     * Feito o bind para manter o contexto.
     * Função de evento para lidar com o evento de saída do mouse.
     * @type {Function}
     */
    this.onMouseLeave = this.onMouseLeave.bind(this);
    /**
     * Função de evento para lidar com o evento de movimento do mouse.
     * @type {Function}
     */
    this.onMouseMove = this.onMouseMove.bind(this);
    /**
     * Função de evento para lidar com o evento de sobreposição do mouse.
     * @type {Function}
     */
    this.onMouseOver = this.onMouseOver.bind(this);
  }

  /**
   * Manipula o evento de movimento do mouse para posicionar a caixa do tooltip.
   * @param {MouseEvent} event - O evento de movimento do mouse.
   */
  onMouseMove(event) {
    this.tooltipBox.style.top = `${event.pageY + 20}px`;
    if (event.pageX + 240 > window.innerWidth) {
      this.tooltipBox.style.left = `${event.pageX - 190}px`;
    } else {
      this.tooltipBox.style.left = `${event.pageX + 20}px`;
    }
  }

  /**
   * Manipula o evento de saída do mouse para remover a caixa do tooltip.
   * @param {Event} event - O evento de saída do mouse.
   */
  onMouseLeave({ currentTarget }) {
    this.tooltipBox.remove();
    currentTarget.removeEventListener('mouseleave', this.onMouseLeave);
    currentTarget.removeEventListener('mousemove', this.onMouseMove);
    // Lógica para evitar a criação de outra tooltip no mobile
    const hasTooltip = setTimeout(() => {
      if (this.tooltipBox) this.tooltipBox.style.top = '-100px';
      console.log('Outra Tooltip');
      clearTimeout(hasTooltip);
    }, 10);
  }

  /**
   * Cria a caixa do tooltip e a adiciona ao documento.
   * @param {HTMLElement} element - O elemento que acionou o tooltip.
   */
  criarTooltipBox(element) {
    const tooltipBox = document.createElement('div');
    const text = element.getAttribute('aria-label');
    tooltipBox.classList.add('tooltip');
    tooltipBox.innerText = text;
    document.body.appendChild(tooltipBox);
    this.tooltipBox = tooltipBox;
  }

  /**
   * Manipula o evento de sobreposição do mouse para exibir o tooltip.
   * @param {Event} event - O evento de sobreposição do mouse.
   */
  onMouseOver({ currentTarget }) {
    this.criarTooltipBox(currentTarget);

    currentTarget.addEventListener('mousemove', this.onMouseMove);
    currentTarget.addEventListener('mouseleave', this.onMouseLeave);
  }

  /**
   * Adiciona os eventos de tooltip aos elementos selecionados.
   */
  addTooltipsEvent() {
    this.tooltips.forEach((item) => {
      item.addEventListener('mouseover', this.onMouseOver);
    });
  }

  /**
   * Inicializa o objeto Tooltip.
   * Verifica se existem elementos com tooltips,
   * adiciona os eventos de tooltip aos elementos selecionados.
   * @returns {Tooltip} - A instância do objeto Tooltip.
   */
  init() {
    if (this.tooltips.length) {
      this.addTooltipsEvent();
    }
    return this;
  }
}
