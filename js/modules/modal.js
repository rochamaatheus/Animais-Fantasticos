export default class Modal {
  constructor(abrir, fechar, container) {
    this.abrir = document.querySelector(abrir);
    this.fechar = document.querySelector(fechar);
    this.container = document.querySelector(container);

    this.eventToggleModal = this.eventToggleModal.bind(this);
    this.cliqueForaModal = this.cliqueForaModal.bind(this);
  }

  toggleModal() {
    this.container.classList.toggle('ativo');
  }

  cliqueForaModal(event) {
    if (event.target === this.container) {
      this.toggleModal();
    }
  }

  eventToggleModal(event) {
    event.preventDefault();
    this.toggleModal();
  }

  addModalEvent() {
    this.abrir.addEventListener('click', this.eventToggleModal);
    this.fechar.addEventListener('click', this.eventToggleModal);
    this.container.addEventListener('click', this.cliqueForaModal);
  }

  init() {
    if (this.abrir && this.fechar && this.container) {
      this.addModalEvent();
    }
    return this;
  }
}
