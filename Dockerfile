from node:lts-slim as make

workdir /usr/src/app

run apt update
run apt install openssl -y

copy . .

run npm i
# run npm run setup
run npm run build

from node:lts-slim as production

run apt update
run apt install openssl -y

env NODE_ENV production
env PORT 8080

workdir /usr/src/app

copy ./src ./src

copy --from=make /usr/src/app/package*.json ./
copy --from=make /usr/src/app/dist ./dist

run npm i --omit=dev

expose 8080
cmd ["node", "dist/src/index.js"]
