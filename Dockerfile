from node as make

workdir /usr/src/app

copy package*.json ./

run npm ci

copy . .

run npm run build

from node:slim

env NODE_ENV production
user node

workdir /usr/src/app

copy package*.json ./

run npm ci --production

copy --from=make /usr/src/app/dist ./dist

expose 8080
cmd ["node", "dist/index.js"]
