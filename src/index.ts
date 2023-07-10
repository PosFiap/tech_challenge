import { App } from './app'
import { router } from './config/express/express'
const PORT = process.env.PORT ?? 3000

new App(router).listen(PORT)
