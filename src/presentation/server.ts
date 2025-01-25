import express, { Router } from 'express'
import path from 'path';

interface Options {
  port?: number;
  public_path?: string;
  routes: Router;
}

export class Server {

  private app = express();
  private readonly port: number = 3100;
  private readonly publicPath: string = 'public';
  private readonly routes: Router;

  constructor(private options: Options) {
    const { port = 3100, public_path = 'public', routes } = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
  }

  async start(){

    // Middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Public folder
    this.app.use(express.static('public-static'));

    // Routes
    this.app.use(this.routes);

    // SPA
    this.app.get('*', (req, res) => {
      // NOTE - No tengo idea de porque me pide un nivel mas de la ruta a public-static
      const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
      res.sendFile(indexPath);
    })

    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${ this.port }`);
    })
  }
}