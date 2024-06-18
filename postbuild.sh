#!/bin/bash

# Argumento passado para o script
arg=$1
distPath="dist/$arg"
mainJsPattern="^main\.[a-f0-9]\+\.js$"

generateVersionFile() {
    # Lê a versão do package.json
    version=$(grep '"version"' package.json | cut -d '"' -f 4)

    # Cria o arquivo version.txt com a versão
    echo $version > "$distPath/assets/version.txt"
    if [ $? -ne 0 ]; then
        echo "Erro ao salvar a versão!"
        exit 1
    fi
    echo "Versão salva com sucesso!"
}

renameMainJs() {
    # Encontra o arquivo main.*.js
    mainJsFile=$(ls $distPath | grep -E $mainJsPattern)

    if [ -z "$mainJsFile" ]; then
        echo "Arquivo main.*.js não encontrado"
        exit 1
    fi

    # Renomeia o arquivo main.*.js para main.js
    mv "$distPath/$mainJsFile" "$distPath/main.js"
    if [ $? -ne 0 ]; then
        echo "Erro ao renomear o arquivo main.js!"
        exit 1
    fi

    echo $mainJsFile
}

updateIndexHtml() {
    local oldFileName=$1

    # Atualiza o index.html para usar main.js em vez de main.*.js
    sed -i "s/$oldFileName/main.js/" "$distPath/index.html"
    if [ $? -ne 0 ]; then
        echo "Erro ao atualizar o index.html!"
        exit 1
    fi
}

# Executando as funções
generateVersionFile
oldFileName=$(renameMainJs)
updateIndexHtml $oldFileName

echo "Renomeação e atualização do index.html concluídas com sucesso."
