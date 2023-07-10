#!/bin/sh

option=$1

case $option in
  dev) docker-compose up -d;;
  production) docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d;;
  stop) docker-compose down ;;
  *) echo 'Comando não encontrado!' ;;
esac
