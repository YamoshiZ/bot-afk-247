# Usamos una versión ligera de Node.js
FROM node:20-slim

# Creamos la carpeta de la app
WORKDIR /usr/src/app

# Copiamos archivos de dependencias
COPY package*.json ./

# Instalamos solo lo necesario
RUN npm install --production

# Copiamos el resto del código
COPY . .

# Exponemos el puerto para el Health Check de Koyeb
EXPOSE 8080

# Comando de inicio forzado
CMD ["node", "index.js"]
