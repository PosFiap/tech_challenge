from node as make

workdir /usr/src/app

copy . .

run npm ci
run npm run build

from node as production
env NODE_ENV production
env PORT 8080

workdir /usr/src/app

copy --from=make /usr/src/app/package*.json ./
copy --from=make /usr/src/app/dist ./dist

run npm ci --omit=dev

expose 8080
cmd ["node", "dist/src/index.js"]
