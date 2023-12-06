FROM node:20.10.0

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install cypress --save-dev

COPY . .

RUN npx cypress install

EXPOSE 4200

CMD ["npm", "run", "start"]