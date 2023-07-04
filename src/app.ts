import express, { Router } from "express"

export class App {
  public server: express.Application;
  constructor (router: Router) {
    this.server = express();
    this.middleware();
    this.router(router);
  }

  public listen(port: string | number): void {
    this.server.listen(port, () => {
        console.log('Server listening at port', port);
    });
  }

  private middleware(){
    this.server.use(express.json());
  }

  private router(router: Router){
    this.server.use(router);
  }
}