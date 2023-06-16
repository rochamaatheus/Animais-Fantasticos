/* eslint-disable operator-linebreak */
/**
 * Classe Funcionamento para controlar o funcionamento de algum elemento
 * com base em horários de abertura e fechamento.
 * @class
 * @export
 */
export default class Funcionamento {
  /**
   * Construtor da classe Funcionamento.
   * @constructor
   * @param {string} funcionamento - Seletor CSS para o elemento de funcionamento.
   * @param {string} aberto - Classe CSS para indicar que está aberto.
   */
  constructor(funcionamento, aberto) {
    this.funcionamento = document.querySelector(funcionamento);
    this.aberto = aberto;
  }

  /**
   * Obtém os dados de funcionamento do elemento.
   */
  dadosFuncionamento() {
    this.diasSemana = this.funcionamento.dataset.semana.split(',').map(Number);
    this.horarioSemana = this.funcionamento.dataset.horario
      .split(',')
      .map(Number);
  }

  /**
   * Obtém os dados de data e hora atuais.
   */
  dadosAgora() {
    this.dataAgora = new Date();
    this.diaAgora = this.dataAgora.getDay();
    this.horarioAgora = this.dataAgora.getUTCHours() - 3;
  }

  /**
   * Verifica se o elemento está aberto com base nos dados de funcionamento e data/hora atuais.
   * @returns {boolean} - Indica se está aberto.
   */
  estaAberto() {
    const semanaAberto = this.diasSemana.indexOf(this.diaAgora) !== -1;
    const horarioAberto =
      this.horarioAgora >= this.horarioSemana[0] &&
      this.horarioAgora < this.horarioSemana[1];

    return semanaAberto && horarioAberto;
  }

  /**
   * Ativa a classe de abertura no elemento se estiver aberto.
   */
  ativaAberto() {
    if (this.estaAberto()) {
      this.funcionamento.classList.add(this.aberto);
    }
  }

  /**
   * Inicializa o objeto Funcionamento.
   * Verifica se o elemento existe, obtém os dados de funcionamento e data/hora atuais,
   * e ativa a classe de abertura se estiver aberto.
   * @returns {Funcionamento} - A instância do objeto Funcionamento.
   */
  init() {
    if (this.funcionamento) {
      this.dadosFuncionamento();
      this.dadosAgora();
      this.ativaAberto();
    }
    return this;
  }
}
