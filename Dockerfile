from node as make

workdir /usr/src/app

copy package*.json ./

run npm ci

copy . .

run npm run build

from node:slim as production

env NODE_ENV production
env PORT 8080

workdir /usr/src/app

copy package*.json ./

run npm ci --production

copy --from=make /usr/src/app/dist ./dist

expose 8080
cmd ["node", "dist/index.js"]
