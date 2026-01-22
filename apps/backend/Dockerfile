FROM node:20-alpine AS builder

WORKDIR /backend 

COPY . .  

RUN npx prisma generate

RUN yarn build

CMD ["node", "dist/app.js"]
