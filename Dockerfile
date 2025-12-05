
# Usa uma imagem leve do Node.js 20
FROM node:20-alpine

# Define a pasta de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências (modo limpo para CI)
RUN npm ci --only=production

# Copia o restante do código
COPY . .

# Expõe a porta 8080
EXPOSE 8080

# Comando para rodar a API
CMD ["node", "server.js"]