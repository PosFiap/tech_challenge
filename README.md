# Tech Challenge

## Índice
- [Sobre](#-sobre)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e execução](#-instalação-e-execução)
- [Tecnologias](#-tecnologias)
- [Testes](#-testes)

## 💻 Sobre


## 🗂 Pré-requisitos
Para rodar o projeto precisa apenas ter instalado os softwares abaixo:
* Docker
* Docker Compose

Para desenvolvimento é necessário:
* Docker
* Docker Compose
* NodeJs 18

## 🔥 Instalação e execução
Os comandos para instalar e rodar local o projeto, basta utilizar o script disponibilizado no projeto com os comandos abaixo:
```bash
# modo de desenvolvimento com live reload
$ ./run.sh dev

# modo de produção
$ ./run.sh production

# encerrar o projeto
$ ./run.sh stop
```

Para desenvolvimento, para obter facilidades como autocomplete das ferramentas de código é necessário se utilizar dos comandos abaixo:
```bash
# instalar as dependencias de desenvolvimento e produção localmente
$ npm i

# setup do banco de dados
$ npm run prisma:migrate

# rodar o projeto com o node local e não o do container
$ npm run dev

#rodar modo de produção local
$ npm run build && npm start
```

## 🛠 Tecnologias
As principais ferramentas usadas na construção do projeto:
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSql](https://www.postgresql.org)

## 🧪 Testes
Testes unitários utilizando o [Jest](https://jestjs.io/pt-BR/). Esses testes podem ser executados com:
```bash
$ npm run test
```
