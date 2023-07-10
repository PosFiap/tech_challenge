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

## 🚀 API's
Essas são as requisições exemplificada no POSTMAN

Utilizamos a variável ```{{host_docker}} = http://localhost:8080``` que se refere a porta em que o docker está rodando

segue os exemplos:

## Cliente
### Cadastrar cliente *
![](https://i.imgur.com/8olwswZ.gif)

### Buscar clientes *
![](https://i.imgur.com/Ija8VQq.gif)

### Buscar cliente por CPF
passamos o CPF pela URL

![](https://i.imgur.com/6uX7tm3.gif)

### Atualizar cliente *
![](https://i.imgur.com/oMjOePo.gif)

### Deletar cliente *
passamos o CPF pela URL

![](https://i.imgur.com/OBh9IOC.gif)

## Produto

### Criar produto *

![](https://i.imgur.com/tlIQdN3.gif)

### Buscar produto por categoria *

Buscar na url o ```codigo_categoria``` passando a categoria cadastrada

![](https://i.imgur.com/dhyA9Kk.gif)


### Atualizar produto *

![](https://i.imgur.com/5uyiAuW.gif)


## Pedido

### Criar pedido *

Caso informe um CPF, é necessário informar um que já exista, por isso buscamos pela lista de clientes.

Enviamos um array de códigos dos pedidos, como no exemplo o código 5 se referia a Batata Fritae o código 6 a coca cola (informação buscada no endpoint "Busca Produto por categoria" passando o código de categoria 2)

![](https://i.imgur.com/qFptW11.gif)

### Lista pedidos *

![](https://i.imgur.com/ydB9egq.gif)


# Pagamento

Enviamos o código do pedido

![](https://imgur.com/qFptW11.gif)