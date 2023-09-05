#!/bin/sh

option=$1

case $option in
  db) 
    kubectl apply -f ./kubernetes/configmap/db-deployment-configmap.yaml
    kubectl apply -f ./kubernetes/secrets/postgres-secrets.yaml
    kubectl apply -f ./kubernetes/volume.yaml
    kubectl apply -f ./kubernetes/deployments/db-deployment.yaml
    kubectl apply -f ./kubernetes/services/db-service.yaml
    
    ;;
  app)
    kubectl apply -f ./kubernetes/configmap/deployment-configmap.yaml
    kubectl apply -f ./kubernetes/secrets/challenge-secrets.yaml
    kubectl apply -f ./kubernetes/deployments/deployment.yaml
    kubectl apply -f ./kubernetes/services/service.yaml
    ;;
  all) 
    kubectl apply -f ./kubernetes/configmap/db-deployment-configmap.yaml
    kubectl apply -f ./kubernetes/secrets/postgres-secrets.yaml
    kubectl apply -f ./kubernetes/volume.yaml
    kubectl apply -f ./kubernetes/deployments/db-deployment.yaml
    kubectl apply -f ./kubernetes/services/db-service.yaml

    kubectl apply -f ./kubernetes/configmap/deployment-configmap.yaml
    kubectl apply -f ./kubernetes/secrets/challenge-secrets.yaml
    kubectl apply -f ./kubernetes/deployments/deployment.yaml
    kubectl apply -f ./kubernetes/services/service.yaml
    ;;
  clear)
    kubectl delete --all configmaps
    kubectl delete --all secrets
    kubectl delete --all deployments
    kubectl delete --all svc
    kubectl delete --all pods
    ;;
  *) echo 'Comando não encontrado!' ;;
esac
