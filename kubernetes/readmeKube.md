## 🔥 Instalação e execução
Os comandos para instalar e rodar local o projeto, basta utilizar o script disponibilizado no projeto com os comandos abaixo:
```bash
# inicia o banco de dados
$ ./run-kube.sh banco

# inicia a aplicação em modo produção
$ ./run.sh app

# encerrar o projeto
$ ./run.sh stop
```

## Possível erro de permissão

Caso ocorra algum erro basta rodar 

```bash

# Aplica permissões para o comando
$ chmod +x ./run-kube.sh 