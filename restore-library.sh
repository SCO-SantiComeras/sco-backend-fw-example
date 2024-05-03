#!/bin/bash

# Eliminar librería y reinstalar última versión
echo 'Borrando antigua carpeta "./node_modules/sco-backend-fw"'
rm -rf ./node_modules/sco-backend-fw
echo 'Instalado librería de nuevo... (npm i sco-backend-fw)'
npm i sco-backend-fw