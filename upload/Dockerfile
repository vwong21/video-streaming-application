FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
RUN npm install -g nodemon
RUN npm install dotenv --save
COPY . .
EXPOSE 3002
CMD ["npm", "run", "devStart" ]