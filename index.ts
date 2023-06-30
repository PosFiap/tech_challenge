import { App } from './src/app'
const PORT = process.env.PORT || 3000

new App().server.listen(PORT)