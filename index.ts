import { App } from './src/app';
const PORT = process.env.PORT || 3000;
import { router } from "./src/config/express/express"

new App(router).listen(PORT);