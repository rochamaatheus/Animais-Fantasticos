export default class Modal {
  constructor(abrir, fechar, container) {
    this.abrir = document.querySelector(abrir);
    this.fechar = document.querySelector(fechar);
    this.container = document.querySelector(container);
  }

  toggleModal(event) {
    event.preventDefault();
    container.classList.toggle('ativo');
  }

  cliqueForaModal(event) {
    if (event.target === this) {
      toggleModal(event);
    }
  }

  init() {
    if (this.abrir && this.fechar && this.container) {
      this.abrir.addEventListener('click', this.toggleModal);
      this.fechar.addEventListener('click', this.toggleModal);
      this.container.addEventListener('click', this.cliqueForaModal);
    }
  }
}
