#!/bin/sh

option=$1

case $option in
  db) 
    kubectl create namespace postgres
    kubectl apply -f ./kubernetes/deployments/db-deployment.yaml
    kubectl apply -f ./kubernetes/services/db-service.yaml
    ;;
  app)
    kubectl create namespace challenge
    kubectl apply -f ./kubernetes/deployments/deployment.yaml
    kubectl apply -f ./kubernetes/services/service.yaml
    ;;
  all) 
    kubectl create namespace postgres
    kubectl create namespace challenge
    kubectl apply -f ./kubernetes/deployments/db-deployment.yaml
    kubectl apply -f ./kubernetes/services/db-service.yaml
    kubectl apply -f ./kubernetes/deployments/deployment.yaml
    kubectl apply -f ./kubernetes/services/service.yaml
    ;;
  clear)  
    kubectl delete deployments --all -n postgres
    kubectl delete services --all -n postgres
    kubectl delete pods --all -n postgres
    kubectl delete deployments --all -n challenge
    kubectl delete services --all -n challenge
    kubectl delete pods --all -n challenge
    ;;
  *) echo 'Comando não encontrado!' ;;
esac
