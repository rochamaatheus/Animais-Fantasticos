/**
 * Função debounce para limitar a frequência de execução de uma função.
 * @param {function} callback - A função a ser executada.
 * @param {number} delay - O tempo de atraso em milissegundos.
 * @returns {function} - A função de debounce.
 */
export default function debounce(callback, delay) {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
      timer = null;
    }, delay);
  };
}
