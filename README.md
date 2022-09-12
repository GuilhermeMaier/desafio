## Description

Olá, sou Guilherme Maier, desenvolvedor responsável por completar este desafio.

Primeiramente, devo dizer que tenho sim experiência trabalhando com api utilizando Nest.Js, porém nunca a criei do zero, sendo assim, utilizei um tutorias para dar os primeiros passos e, porteriormente, atualizei e adaptei tudo de acordo com as necessidades deste desafio.

Segundamente, devo dizer que criei modelos de entidade e simulo uma conexão com um banco mysqlite sem necessidade de dados de acesso. Minha ideia inicial era terminar a base rapidamente para então focar nas migrations, que nunca utilizei, e na criação do banco de dados, porém, acadei me enrolando com a questão de precisar ter um array da entidade endereço no banco de dados, as configurações do mysqlite não permitem array ou então eu não consegui fazer com que aceitasse, por isso acabei ficando sem tempo para dar andamento nessa parte de migrations, peço desculpas por isso.

Sobre o problema relacionado aos arrays, como não consegui resolver na entidade eu dei um jeito de fazer funcionar um pouco diferente do solicitado. Fiz um crud de inserção de endereços e sempre que adiciono um usuário eu salvo os endereços enviados e salvo os ids desses endereços na tabela de pessoa separados por vírgula em uma string, assim, nunca perco o tracking dos endereços. Ao atualizar uma pessoa, caso sejam enviados endereços, utilizo os ids informados e atualizo na tabela de endereços. Ao deletar uma pessoa deleto também os registros dos endereços desta pessoa, sei que o ideal seria uma cascata, mas como nunca criei um banco de dados do zero não sabia como fazer e me adaptei.

Sei que esses ajustes que fiz não estão totalmente dentro do esperado para o desafio e peço desculpas por isso, porém, me adaptei o suficiente para deixar tudo funcionando conforme o esperado.

## Instalação

Após baixar o projeto basta rodar um comando yarn para atualizar as dependências do projeto.

```bash
$ yarn
```

## Rodando a aplicação

Para rodar o projeto basta rodar um yarn start:dev e fazer as devidas chamadas para fazerem os testes.

```bash
$ yarn start:dev
```

## Utilizando a aplicação

Tomei a liberdade de deixar alguns dados prontos para facilitar a vida dos avaliadores.

```bash
# Visualizar o conjunto de pessoas
GET http://localhost:8080/person

# Visualizar uma pessoa
GET http://localhost:8080/person/1

# Inserir uma nova pessoa
POST http://localhost:8080/person
#body
{
  "name": "Guilherme",
  "identification":"03754299050",
  "personType":2,
  "birthDate":"1996-06-24",
  "addresses":[
    {
      "zipCode":"95043-070",
      "street":"Antonio Bosi",
      "houseNumber":570,
      "neighborhood":"Fátima",
      "adjunct":"Fundos",
      "city":"Caxias do Sul",
      "uf":"RS",
      "addressType":1
    },
    {
      "zipCode":"95043-070",
      "street":"Antonio Bosi",
      "houseNumber":570,
      "neighborhood":"Fátima",
      "adjunct":"Fundos",
      "city":"Caxias do Sul",
      "uf":"RS",
      "addressType":1
    }
  ]
}

# Atualizar uma pessoa
PUT http://localhost:8080/person/1
#body
{
  "id":1,
  "name": "Guilherme Maier",
  "personType":2,
  "addresses":[
    {
      "id":2,
      "houseNumber":1002,
      "adjunct":"Próximo ao super mercado"
    }
  ]
}

# Deletar uma pessoa
DELETE http://localhost:8080/person/1
```
