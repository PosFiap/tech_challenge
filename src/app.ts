import express, { Router } from "express"
import logger from "./utils/LoggerFactory";

export class App {
  public server: express.Application;
  constructor (router: Router) {
    this.server = express();
    this.middleware();
    this.router(router);
  }

  public listen(port: string | number): void {
    this.server.listen(port, () => {
        // Apenas chamar o logger e utilizar info, warn, error dependendo do seu caso de uso
        // usei a nomenclatura [Clqsse - Método] pois ajuda a identificar na hora de olhar log
        // caso aprovem poderiamos padronizar em todas as chamadas
        logger.info(`[App - listen] Server listening at port ${port}`);
    });
  }

  private middleware(){
    this.server.use(express.json());
  }

  private router(router: Router){
    this.server.use(router);
  }
}