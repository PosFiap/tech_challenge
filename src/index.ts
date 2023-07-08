import { App } from './app';
const PORT = process.env.PORT || 3000;
import { router } from "./config/express/express"

new App(router).listen(PORT);