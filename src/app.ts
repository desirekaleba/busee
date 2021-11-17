import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { IRoute } from './interfaces/route.interface';
import logger, { httpLogStream } from './utils/logger';
import { OK } from './constants/statusCodes';

export class App {
  public app: express.Application;

  public port: number;

  constructor(routes: IRoute[]) {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeDefaultRoutes();
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(morgan('dev'));
    this.app.use(morgan('combined', { stream: httpLogStream }));
    this.app.use(cors());
  }

  private initializeRoutes(routes: IRoute[]): void {
    routes.forEach((route) => {
      this.app.use('/api/v1', route.router);
    });
  }

  private initializeDefaultRoutes(): void {
    this.app.get('/', (req: Request, res: Response) =>
      res.status(OK).json({
        status: `success`,
        data: {
          message: `Welcome to BUSEE`,
        },
      }),
    );
  }

  listen(): void {
    const port = process.env.PORT || 4000;
    this.app.listen(port, () => {
      logger.info(`App listening on port ${port}.`);
    });
  }

  getServer = () => this.app;
}
