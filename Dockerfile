FROM node:alpine

WORKDIR /app/wannabet

COPY . .

RUN npm install
RUN npm run build

EXPOSE 4000

CMD ["npm", "start"]