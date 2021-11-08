import { Router, Request, Response } from 'express';
import { CountryHandler } from '../handler/countryHandler';

export class CountryRouter {
    private router: Router;

    constructor(private countryHandler: CountryHandler) {
        this.router = Router();
        this.init();
    }

    public getRouter(): Router {
        return this.router;
    }

    private init() {
        this.router.get('/:ip', this.getCountry.bind(this));
    }

    private async getCountry(request: Request, response: Response) {
        const ip = request.params.ip;

        try{
            const res = await this.countryHandler.getcountryByIp(ip);
            response.status(200).json(res);
        }catch(error){
            console.log('Error when getting country by ip:', error)
            response.status(500).send(error);
        }
    }   
}