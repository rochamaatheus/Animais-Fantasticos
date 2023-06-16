/**
 * Função para detectar clique fora de um elemento.
 * @param {HTMLElement} element - O elemento para o qual se deseja detectar o clique fora.
 * @param {Array<string>} events - Array de eventos que acionam a verificação de clique fora.
 * @param {Function} callback - Função de retorno chamada quando ocorre um clique fora do elemento.
 */
export default function outsideClick(element, events, callback) {
  const html = document.documentElement;
  const outside = 'data-outside';
  /**
   * Manipula o evento de clique fora do elemento.
   * @param {Event} event - O objeto de evento.
   */
  function handleOutsideClick(event) {
    if (!element.contains(event.target)) {
      element.removeAttribute(outside);
      events.forEach((userEvent) => {
        html.removeEventListener(userEvent, handleOutsideClick);
      });
      callback();
    }
  }
  // Verifica se o elemento não possui o atributo "data-outside" (tipo: boolean).
  if (!element.hasAttribute(outside)) {
    // Adiciona os manipuladores de evento para cada evento fornecido.
    events.forEach((userEvent) => {
      setTimeout(() => html.addEventListener(userEvent, handleOutsideClick));
    });
    // Define o atributo "data-outside" no elemento para marcar que o evento foi adicionado.
    element.setAttribute(outside, '');
  }
}
