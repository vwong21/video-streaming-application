FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
RUN npm install dotenv --save
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]


