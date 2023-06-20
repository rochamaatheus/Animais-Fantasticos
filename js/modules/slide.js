import debounce from './debounce.js';

/**
 * Classe Slide para criar um slide funcional.
 * @class
 * @export
 */
export class Slide {
  /**
   * Classe responsável por criar um Slide.
   * @param {string} wrapper - Classe CSS para o elemento wrapper do Slide.
   * @param {string} slide - Classe CSS para o elemento slide.
   * @param {string} activeClass - Classe CSS para o slide ativo.
   */
  constructor(wrapper, slide, activeClass) {
    /** @type {Element} */
    this.wrapper = document.querySelector(wrapper);
    /** @type {Element} */
    this.slide = document.querySelector(slide);
    /** @type {string} */
    this.activeClass = activeClass;
    /** @type {{ finalPosition: number, startX: number, movement: number, movePosition?: number }} */
    this.dist = { finalPosition: 0, startX: 0, movement: 0 };
    /** @type {Event} */
    this.changeEvent = new Event('changeEvent');
  }

  /**
   * Adiciona a transição do slide.
   * @param {boolean} active - Indica se a transição está ativa.
   */
  transition(active) {
    this.slide.style.transition = active ? 'transform .3s' : '';
  }

  /**
   * Move o slide para uma determinada posição horizontal.
   * @param {number} distX - Posição horizontal do slide.
   */
  moveSlide(distX) {
    this.dist.movePosition = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  /**
   * Atualiza a posição do slide com base na posição atual do ponteiro.
   * @param {number} clientX - Posição horizontal do ponteiro.
   * @returns {number} - Nova posição final do slide.
   */
  updatePosition(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 1.8;
    return this.dist.finalPosition - this.dist.movement;
  }

  /**
   * Manipulador do evento de início do movimento do slide.
   * @param {MouseEvent | TouchEvent} event - Evento de início do movimento.
   */
  onStart(event) {
    let movetype;
    if (event.type === 'mousedown') {
      event.preventDefault();
      this.dist.startX = event.clientX;
      movetype = 'mousemove';
    } else {
      this.dist.startX = event.changedTouches[0].clientX;
      movetype = 'touchmove';
    }
    this.wrapper.addEventListener(movetype, this.onMove);
    this.transition(false);
  }

  /**
   * Manipulador do evento de finalização do movimento do slide.
   * @param {MouseEvent | TouchEvent} event - Evento de finalização do movimento.
   */
  onEnd(event) {
    const movetype = event.type === 'mouseup' ? 'mousemove' : 'touchmove';
    this.wrapper.removeEventListener(movetype, this.onMove);
    this.dist.finalPosition = this.dist.movePosition;
    this.transition(true);
    this.changeSlideOnEnd();
  }

  /**
   * Manipulador do evento de movimento do slide.
   * @param {MouseEvent | TouchEvent} event - Evento de movimento do slide.
   */
  onMove(event) {
    const pointerPosition =
      event.type === 'mousemove'
        ? event.clientX
        : event.changedTouches[0].clientX;
    const finalPosition = this.updatePosition(pointerPosition);
    this.moveSlide(finalPosition);
  }

  /**
   * Verifica a mudança de slide após o término do movimento.
   */
  changeSlideOnEnd() {
    if (this.dist.movement > 120 && this.index.next !== undefined) {
      this.activeNextSlide();
    } else if (this.dist.movement < -120 && this.index.prev !== undefined) {
      this.activePrevSlide();
    } else {
      this.changeSlide(this.index.active);
    }
  }

  /**
   * Adiciona os eventos de interação do slide.
   */
  addSlideEvents() {
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('touchstart', this.onStart);
    this.wrapper.addEventListener('mouseup', this.onEnd);
    this.wrapper.addEventListener('touchend', this.onEnd);
  }

  /**
   * Liga os eventos aos métodos correspondentes.
   */
  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onResize = debounce(this.onResize.bind(this), 200);
    this.activePrevSlide = this.activePrevSlide.bind(this);
    this.activeNextSlide = this.activeNextSlide.bind(this);
  }

  // Slides config

  /**
   * Calcula a posição do slide com base na margem.
   * @param {Element} slide - Elemento do slide.
   * @returns {number} - Posição do slide.
   */
  slidePosition(slide) {
    const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margin);
  }

  /**
   * Configuração dos slides.
   */
  slidesConfig() {
    this.slideArray = [...this.slide.children].map((element) => {
      const position = this.slidePosition(element);
      return {
        position,
        element,
      };
    });
  }

  /**
   * Configuração dos índices da navegação do slide.
   * @param {number} index - Índice do slide ativo.
   */
  slidesIndexNav(index) {
    const last = this.slideArray.length - 1;
    this.index = {
      prev: index ? index - 1 : undefined,
      active: index,
      next: index === last ? undefined : index + 1,
    };
  }

  /**
   * Muda para um determinado slide.
   * @param {number} index - Índice do slide.
   */
  changeSlide(index) {
    const activeSlide = this.slideArray[index];
    this.moveSlide(activeSlide.position);
    this.slidesIndexNav(index);
    this.dist.finalPosition = activeSlide.position;
    this.changeActiveClass();
    this.wrapper.dispatchEvent(this.changeEvent);
  }

  /**
   * Remove a classe CSS dos slides ativo existentes.
   * E adiciona a classe ativa apenas para o elemento selecionado.
   */
  changeActiveClass() {
    this.slideArray.forEach((item) =>
      item.element.classList.remove(this.activeClass)
    );
    this.slideArray[this.index.active].element.classList.add(this.activeClass);
  }

  /**
   * Ativa o slide anterior.
   */
  activePrevSlide() {
    if (this.index.prev !== undefined) this.changeSlide(this.index.prev);
  }

  /**
   * Ativa o próximo slide.
   */
  activeNextSlide() {
    if (this.index.next !== undefined) this.changeSlide(this.index.next);
  }

  /**
   * Manipulador do evento de redimensionamento da janela.
   */
  onResize() {
    setTimeout(() => {
      this.slidesConfig();
      this.changeSlide(this.index.active);
    }, 200);
  }

  /**
   * Adiciona o evento de redimensionamento da janela.
   */
  addResizeEvent() {
    window.addEventListener('resize', this.onResize);
  }

  /**
   * Inicializa o Slide.
   * @returns {Slide} - Instância do Slide.
   */
  init() {
    this.transition(true);
    this.bindEvents();
    this.addSlideEvents();
    this.slidesConfig();
    this.changeSlide(0);
    this.addResizeEvent();
    return this;
  }
}

export class SlideNav extends Slide {
  /**
   * Classe responsável por criar um Slide com navegação.
   * @param {string} wrapper - Seletor do elemento wrapper do slide.
   * @param {string} slide - Seletor do elemento slide.
   * @param {string} activeClass - Classe para indicar o slide ativo.
   */
  constructor(wrapper, slide, activeClass) {
    super(wrapper, slide, activeClass);
    this.bindControlEvent();
  }

  /**
   * Adiciona as setas de navegação do slide.
   * @param {string} prev - Seletor do elemento de navegação para slide anterior.
   * @param {string} next - Seletor do elemento de navegação para próximo slide.
   */
  addArrow(prev, next) {
    /** @type {Element} */
    this.prevElement = document.querySelector(prev);
    /** @type {Element} */
    this.nextElement = document.querySelector(next);
    this.addArrowEvent();
  }

  /**
   * Adiciona os eventos de clique nas setas de navegação.
   */
  addArrowEvent() {
    this.prevElement.addEventListener('click', this.activePrevSlide);
    this.nextElement.addEventListener('click', this.activeNextSlide);
  }

  /**
   * Cria a navegação por controle.
   * @returns {Element} - Elemento de controle criado.
   */
  createControl() {
    const control = document.createElement('ul');
    control.dataset.control = 'slide';
    this.slideArray.forEach((item, index) => {
      control.innerHTML += `<li><a href="#slide${index + 1}">${
        index + 1
      }</a></li>`;
    });
    this.wrapper.appendChild(control);
    return control;
  }

  /**
   * Manipulador do evento de controle de clique.
   * @param {Element} item - Item do controle.
   * @param {number} index - Índice do slide correspondente ao item do controle.
   */
  eventControl(item, index) {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      this.changeSlide(index);
    });
    this.wrapper.addEventListener('changeEvent', this.activeControlItem);
  }

  /**
   * Ativa o item de controle correspondente ao slide ativo.
   */
  activeControlItem() {
    this.controlArray.forEach((item) =>
      item.classList.remove(this.activeClass)
    );
    this.controlArray[this.index.active].classList.add(this.activeClass);
  }

  /**
   * Adiciona a navegação por controle.
   * @param {string} customControl - Seletor do elemento de controle personalizado (opcional).
   */
  addControl(customControl) {
    this.control =
      document.querySelector(customControl) || this.createControl();
    this.controlArray = [...this.control.children];
    this.activeControlItem();
    this.controlArray.forEach(this.eventControl);
  }

  /**
   * Liga os eventos de controle aos métodos correspondentes.
   */
  bindControlEvent() {
    this.eventControl = this.eventControl.bind(this);
    this.activeControlItem = this.activeControlItem.bind(this);
  }
}
