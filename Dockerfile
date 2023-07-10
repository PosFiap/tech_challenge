from node as make

workdir /usr/src/app

copy package*.json ./

copy . .

# run npm run setup
run npm ci

run npm run build

from node as production
env NODE_ENV production
env PORT 8080

workdir /usr/src/app

copy package*.json ./

run npm ci --production

copy --from=make /usr/src/app/dist ./dist

expose 8080
cmd ["node", "dist/index.js"]
