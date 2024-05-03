#!/bin/bash

# Eliminar librería y copiar el compilado nuevo
echo 'Borrando antigua carpeta "./node_modules/sco-backend-fw"'
rm -rf ./node_modules/sco-backend-fw
echo 'Copiando nuevo contenido de "./../sco-backend-fw/dist/libs/sco-backend-fw/" a "./node_modules/sco-backend-fw"'
cp -r ./../sco-backend-fw/dist/libs/sco-backend-fw/ ./node_modules/sco-backend-fw
echo 'Copia completada'

# Modificar versión del package json por version 'test'
archivo="./node_modules/sco-backend-fw/package.json"
nuevo_contenido='  "version": "test",'

# Verificar si el archivo existe
if [ -f "$archivo" ]; then
    # Modificar el contenido de la línea 2 (Versión)
    sed -i "3s/.*/$nuevo_contenido/" "$archivo"
    echo "El contenido de la línea 3 se ha actualizado correctamente"
else
    echo "El archivo $archivo no existe"
fi