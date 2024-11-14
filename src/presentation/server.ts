import express from 'express'
import path from 'path';

interface Options {
  port?: number;
  public_path?: string;
}

export class Server {

  private app = express();
  private readonly port: number = 3100;
  private readonly publicPath: string = 'public';

  constructor(private options: Options) {
    const { port = 3100, public_path = 'public' } = options;
    this.port = port;
    this.publicPath = public_path;
  }

  async start(){

    // Public folder
    this.app.use(express.static('public-static'));

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