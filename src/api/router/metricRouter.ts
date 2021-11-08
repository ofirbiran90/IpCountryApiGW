import { Router, Request, Response } from 'express';
import { MetricsHandler } from '../handler/metricHandler';

export class MetricsRouter {
    private router: Router;

    constructor(private metricsHandler: MetricsHandler) {
        this.router = Router();
        this.init();
    }

    public getRouter(): Router {
        return this.router;
    }

    private init() {
        this.router.get('/', this.getMetrics.bind(this));
    }

    private getMetrics(request: Request, response: Response) {
        try{
            const res = this.metricsHandler.getMetrics();
            response.status(200).json(res);
        }catch(error){
            console.log('Error when getting metrics');
            response.status(500).send();
        }
;
    }   
}