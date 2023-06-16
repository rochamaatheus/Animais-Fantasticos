/**
 * Classe AnimaNumeros para animar números incrementais.
 * @class
 * @export
 */
export default class AnimaNumeros {
  /**
   * Construtor da classe AnimaNumeros.
   * @constructor
   * @param {string} numeros - Seletor CSS para os elementos de números.
   * @param {string} observerTarget - Seletor CSS para o elemento alvo da observação de mutação.
   * @param {string} observerClass - Classe CSS para verificar a classe do elemento alvo.
   */
  constructor(numeros, observerTarget, observerClass) {
    /**
     * Lista de elementos de números.
     * @type {NodeList}
     */
    this.numeros = document.querySelectorAll(numeros);
    /**
     * Elemento alvo da observação de mutação.
     * @type {HTMLElement}
     */
    this.observerTarget = document.querySelector(observerTarget);
    /**
     * Classe CSS para verificar a classe do elemento alvo.
     * @type {string}
     */
    this.observerClass = observerClass;
    /**
     * Função de manipulação de mutação.
     * É necessário fazer o bind para manter o contexto da classe.
     */
    this.handleMutation = this.handleMutation.bind(this);
  }

  /**
   * Método estático para incrementar um número gradualmente.
   * @param {HTMLElement} numero - O elemento de número a ser incrementado.
   */
  static incrementarNumero(numero) {
    const total = +numero.innerText;
    const incremento = Math.floor(total / 100);
    let start = 0;
    const timer = setInterval(() => {
      start += incremento;
      numero.innerText = start;
      if (start > total) {
        numero.innerText = total;
        clearInterval(timer);
      }
    }, 25 * Math.random());
  }

  /**
   * Anima os números incrementais.
   */
  animaNumeros() {
    // eslint-disable-next-line arrow-parens
    this.numeros.forEach(
      // eslint-disable-next-line arrow-parens
      (numero) =>
        // eslint-disable-next-line implicit-arrow-linebreak, comma-dangle
        this.constructor.incrementarNumero(numero)
      // eslint-disable-next-line function-paren-newline
    );
  }

  /**
   * Manipula as mutações observadas pelo MutationObserver.
   * @param {MutationRecord[]} mutation - Lista de mutações observadas.
   */
  handleMutation(mutation) {
    if (mutation[0].target.classList.contains(this.observerClass)) {
      this.observer.disconnect();
      this.animaNumeros();
    }
  }

  /**
   * Adiciona o MutationObserver para observar as mudanças no elemento alvo.
   */
  addMutationObserver() {
    this.observer = new MutationObserver(this.handleMutation);
    this.observer.observe(this.observerTarget, { attributes: true });
  }

  /**
   * Inicializa o componente AnimaNumeros.
   * Verifica se existem números, um elemento alvo e uma classe de observação definidos.
   * @returns {AnimaNumeros} - A instância do objeto AnimaNumeros.
   */
  init() {
    if (this.numeros.length && this.observerTarget && this.observerClass) {
      this.addMutationObserver();
    }
    return this;
  }
}
