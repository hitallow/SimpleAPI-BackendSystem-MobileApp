# Welcome to my project


Este projeto é uma simples implementação de uma back end provedor para um sistema de tasks, ele é implementado em javascript e tem por padrão uma conexão feita com o postgress

## O que eu é necessário ?
Para rodar este projeto, é necessário que você tenha o PostgreSQL instalado na sua máquina, ou você pode alterar essas informações no arquivo de configurações do Knex ( knexfile.js)
Também é necessário ter o node na sua máquina e por tabela, ter o npm ( ou yarn)

## Configure o projeto
Para configurar o projeto na sua máquina, siga os passos:
Clone o repositório ou faça um fork e clone do seu próprio github :)
 - Instale as dependências
```
$ npm install
```
- Instale o knex globalmente com o comando 
```
$ npm install -g knex 
```
- Configure seu banco de dados, entre e crie um database com o nome `tasks`  e com o usuário `userConsume` e senha `1234`, estas são as definições que estão explicitas no `knexfile.js` sinta-se à vontade para mudar a seu gosto.
- Agora rode o comando para criar as tabelas no banco de dados, (certifique-se que o processo está rodando).
``` 
$ knex migrate:latest
```  

 - Rode na sua máquina
```
$ npm run deploy
```
- Caso queira rodar com o nodemon, pode rodar `$ npm run start`


## Desenvolvedor
Entre em contato, por algumas dos meios abaixo  [Github](https://github.com/hitallow/) [Linkedin](https://www.linkedin.com/in/hitallo-william-825923180) [Email](mailto:hitallo91@gmail.com)
