# Teste prático - Frontend Gympass
> Projeto em React consumindo API.

Projeto em React que visa consumir a API do GitHub e listar todos os repositórios públicos do meu perfil de usuário e os últimos vinte commits dos repositórios.

## Instruções
> Configuração para Desenvolvimento

1. Clone o repositório: https://github.com/JeffersonISLima/gympass-challenge.git
2. Faça uso do gerenciador de pacotes [npm](https://www.npmjs.com/).
3. Dentro da pasta do projeto (cd gympass-challenge), execute npm install no terminal para baixar todas as dependências.  

```sh
npm install
```

## Uso 

Para iniciar em modo de desenvolvimento, digite npm start no terminal.
O server é executado na porta 3000, e.g: http://localhost:3000.
 ```sh
npm start
``` 
 
## Telas da aplicação

### Tela home:

![](/public/images/home.png) 



### Tela destinada à pesquisa de commits:

![](/public/images/commits.png) 


## Trechos de códigos utilizando ES6 e explicações

>Template String:
axios.get(`https://api.github.com/repos/JeffersonISLima/${nameRepository}/commits`)

Neste trecho é aplicado Template Strings para utilizar uma variável com o nome do repositório e realizar o método get do axios para a API que retorna todos os commits do repositório.

[Referência](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/template_strings)


>Desestruturação de objeto:
const { target: { value } } = event;

Neste trecho a variável 'value' é desconstruída do objeto 'event.target'. Utilizei para simplificar a sintaxe e quando for necessário utilizar a variável, basta chamá-la nó código como 'value' e não como 'event.target.value'. 

[Referência](https://blog.taller.net.br/desmistificando-o-destructuring-do-javascript-es6es7/)

## Contato

Jefferson I. S. Lima  – jeffersoninacio@hotmail.com

[https://github.com/JeffersonISLima](https://github.com/JeffersonISLima)


## Tecnologias utilizadas

1. ReactJS
2. Axios
