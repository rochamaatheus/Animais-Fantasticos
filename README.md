# Animais Fantásticos

![Capa_Site](https://i.imgur.com/n8w5vPp.png)

Um site JavaScript interativo com diversas funcionalidades e lógicas diferentes. Este projeto foi desenvolvido com o objetivo de criar um site rápido e funcional, utilizando várias técnicas e recursos avançados de JavaScript. Além disso, todas as classes e funções foram devidamente documentadas e podem ser utilizadas em projetos de outros desenvolvedores.

[Acesse o site](https://rochamaatheus.github.io/Animais-Fantasticos/index.html)

 <img align="center" alt="Rocha-JavaScript" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg">

🚀 Linguagem utilizada: JavaScript

---

## Descrição do Projeto

O projeto "Animais Fantásticos" é um site interativo que engloba uma série de funcionalidades, como menus de dropdown, modal, tabNav, horário de funcionamento, fetch com bitcoin, entre outras. Cada funcionalidade foi implementada utilizando JavaScript de forma eficiente e organizada, garantindo um alto nível de interatividade e uma experiência agradável para os usuários.

A parte de slides foi separada em outro projeto, pois é algo que precisou de muita lógica para ser concluída, e documentada para ser utilizada em outros projetos, fazendo apenas alterações mínimas. Acesse o Slide [aqui](https://github.com/rochamaatheus/Animais-Slide).

## Funcionalidades

- Menus de dropdown interativos
- Modal para exibição de conteúdo adicional
- Navegação por abas (tabNav)
- Exibição de horário de funcionamento
- Integração com API de cotação de Bitcoin (fetch)
- E muito mais!

## Pré-requisitos

- [Webpack](https://webpack.js.org)
- [Babel](https://babeljs.io)
- [Eslint](https://eslint.org)
- Arquivos HTML, CSS e JavaScript padrão

## Instalação

1. Clone este repositório:

   ```bash
   git clone https://github.com/rochamaatheus/animais-fantasticos.git
   
2. Navegue até o diretório do projeto:

   ```bash
   cd animais-fantasticos
   
3. Instale as dependências:

   ```bash
   npm install
   
4. Execute o projeto:

   ```bash
   npm run dev
   ```
   
 ## Utilização
 
 Você pode utilizar as classes e funções deste projeto em seus próprios projetos. Todos os códigos estão devidamente documentados usando a sintaxe de comentários de bloco /** */. Caso tenha alguma dúvida sobre o uso, você pode utilizar este projeto como referência e explorar os arquivos JavaScript para entender as implementações detalhadamente.
 
 - Exemplo de utilização: Classe Modal
 
 HTML:
 ```html
    <a data-modal="abrir" href="login.html">Login <span class="arrow-black"></span></a>

    <section class="modal-container" data-modal="container">
      <div class="modal">
        <button data-modal="fechar" class="fechar"></button>
        <form action="">
          <label for="email">Email</label>
          <input type="text" for="email" id="email" />
          <label for="senha">Senha</label>
          <input type="password" for="senha" id="senha" />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </section>
 ```
 JavaScript:
 ```javascript
   import Modal from './modules/modal.js';
 
   const modal = new Modal(
    '[data-modal="abrir"]',
    '[data-modal="fechar"]',
    '[data-modal="container"]',
    'ativo'
  );
  modal.init();
 ```
 
 - Nota: O CSS pode ser criado a critério do desenvolvedor.

## Contato

Se você tiver alguma dúvida ou precisar de assistência adicional, fique à vontade para entrar em contato através do LinkedIn, Instagram ou por e-mail. As informações de contato estão disponíveis na minha página principal do GitHub.

---

👨‍💻 Criado por [rochamaatheus](https://github.com/rochamaatheus).
