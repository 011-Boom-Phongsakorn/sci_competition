FROM node:22-alpine

# code ที่เราจะรันที่ไหน
WORKDIR /app

COPY package*.json ./

RUN npm install -g nodemon && npm install

# . แรก host (server) . สอง container คือก็อป code ของ local เรา ไปไว้ใน /app บน container
COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]