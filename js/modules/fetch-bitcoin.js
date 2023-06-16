/* eslint-disable arrow-parens */
/**
 * Função fetchBitcoin para buscar e exibir o preço do Bitcoin.
 * @param {string} url - O URL para buscar os dados do Bitcoin.
 * @param {string} target - O seletor CSS para o elemento onde o preço será exibido.
 */
export default function fetchBitcoin(url, target) {
  fetch(url)
    .then((response) => response.json())
    .then((bitcoin) => {
      const btcPreco = document.querySelector(target);
      btcPreco.innerText = (1000 / bitcoin.BRL.sell).toFixed(4);
    })
    .catch((erro) => console.log(Error(erro)));
}
