/* eslint-disable comma-dangle */
/* eslint-disable import/no-unresolved */
import ScrollSuave from './modules/scroll-suave.js';
import Accordion from './modules/accordion.js';
import TabNav from './modules/tabnav.js';
import Modal from './modules/modal.js';
import Tooltip from './modules/tooltip.js';
import fetchAnimais from './modules/fetch-animais.js';
import fetchBitcoin from './modules/fetch-bitcoin.js';
import AnimaScroll from './modules/anima-scroll.js';
import DropdownMenu from './modules/dropdown-menu.js';
import MenuMobile from './modules/menu-mobile.js';
import Funcionamento from './modules/funcionamento.js';

const scrollSuave = new ScrollSuave('[data-menu="suave"] a[href^="#"]');
scrollSuave.init();

const accordion = new Accordion('[data-anime="accordion"] dt', 'ativo');
accordion.init();

const tabNav = new TabNav(
  '[data-tab="menu"] li',
  '[data-tab="content"] section',
  'ativo'
);
tabNav.init();

const modal = new Modal(
  '[data-modal="abrir"]',
  '[data-modal="fechar"]',
  '[data-modal="container"]'
);
modal.init();

const toolTip = new Tooltip('[data-tooltip]');
toolTip.init();

const animaScroll = new AnimaScroll('[data-anime="scroll"]');
animaScroll.init();

const dropdownMenu = new DropdownMenu('[data-dropdown]', [
  'touchstart',
  'click',
]);
dropdownMenu.init();

const menuMobile = new MenuMobile(
  '[data-menu="button"]',
  '[data-menu="list"]',
  ['click', 'touchstart']
);
menuMobile.init();

const funcionamento = new Funcionamento('[data-semana]', 'aberto');
funcionamento.init();

fetchAnimais('./animaisapi.json', '.numeros-grid');
fetchBitcoin('https://blockchain.info/ticker', '.btc-preco');
