import express from 'express';
import { CountryRouter } from '../api/router/countryRouter';
import { MetricsRouter } from '../api/router/metricRouter';

export class IPCountryServer {
  public app: express.Application = express();

  private port: string;

  private countryRouter:express.Router;

  private metricsRouter:express.Router;

  constructor(port: string, countryRouter: CountryRouter, metricsRouter: MetricsRouter) {
    this.port = port;
    this.countryRouter = countryRouter.getRouter();
    this.metricsRouter = metricsRouter.getRouter();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.configureRoutes(this.app);
    this.handleErrors(this.app);
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}...`);
    }).on('error', (err: Error) => {
      console.log(`Server failed to start, ${err}...`);
    });
  }

  private configureRoutes(app: express.Application): void {
    // default get route
    app.get('/', (req, res) => {
      console.log('Received request for default route, service is alive...');
      res.send('Service is alive');
    });
    app.use('/getIpCountry', this.countryRouter);
    app.use('/metrics', this.metricsRouter);
  }

  private handleErrors(app: express.Application): void {
    app.use((err: express.ErrorRequestHandler, req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.send(err).end();
    });
  }
}
