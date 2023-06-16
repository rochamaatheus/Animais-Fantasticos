// eslint-disable-next-line import/no-named-as-default
import AnimaNumeros from './anima-numeros.js';

/**
 * Função fetchAnimais para buscar e exibir animais.
 * @param {string} url - O URL para buscar os dados dos animais.
 * @param {string} target - O seletor CSS para o elemento onde os animais serão exibidos.
 */
export default function fetchAnimais(url, target) {
  /**
   * Cria um elemento HTML para exibir as informações de um animal.
   * @param {object} animal - Os dados do animal.
   * @returns {HTMLElement} - O elemento HTML criado.
   */
  function createAnimal(animal) {
    const div = document.createElement('div');
    div.classList.add('numero-animal');
    div.innerHTML = `<h3>${animal.specie}</h3><span data-numero>${animal.total}</span>`;
    return div;
  }

  const numerosGrid = document.querySelector(target);
  /**
   * Preenche o elemento HTML com as informações de um animal.
   * @param {object} animal - Os dados do animal.
   */
  function preencherAnimais(animal) {
    const divAnimal = createAnimal(animal);
    numerosGrid.appendChild(divAnimal);
  }

  /**
   * Inicia a animação dos números dos animais.
   */
  function animaAnimaisNumeros() {
    const animaNumeros = new AnimaNumeros(
      '[data-numero]',
      '.numeros',
      // eslint-disable-next-line comma-dangle
      'ativo'
    );
    animaNumeros.init();
  }

  /**
   * Busca os dados dos animais e cria os elementos HTML correspondentes.
   */
  async function criarAnimais() {
    try {
      const animaisResponse = await fetch(url);
      const animaisJSON = await animaisResponse.json();
      // eslint-disable-next-line arrow-parens, no-unused-vars
      animaisJSON.forEach((animal) => preencherAnimais(animal));
      animaAnimaisNumeros();
    } catch (erro) {
      console.log(erro);
    }
  }

  criarAnimais();
}
