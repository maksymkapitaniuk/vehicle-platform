FROM node:22-alpine

RUN apk add --no-cache openssl

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY prisma ./prisma

RUN npm run prisma:generate

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
