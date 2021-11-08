import { CountryDto } from "../api/dto/country.dto";
import { globals } from "../config/Components";
import {IClient} from './iclient';
import {isPassHour} from './timeUtil';

const axios = require('axios');

export class IpapiClient implements IClient{

    private latencies: number[];

    private requestTimeStamp: Date[];

    constructor(private api:string){
        this.latencies = [];
        this.requestTimeStamp = [];
    }

    public getLatancies():number[]{
        return this.latencies;
    }

    public isAvailable():boolean{
        if (this.requestTimeStamp.length < globals.ratePerHour) return true;
        return isPassHour(this.requestTimeStamp[0]) ;
    }

    public async getGeolocationByIp(ip:string):Promise<CountryDto>{
        console.log('get request in ipapi client, ip:', ip)
        try{
            const startTime = new Date();
            const res = await axios.get(`${this.api}/${ip}/json`, {
            })

            const endTime = new Date();
            const latancy = endTime.getTime() - startTime.getTime();

            this.requestTimeStamp.shift();
            this.requestTimeStamp.push(endTime);
            this.latencies.push(latancy);

            return new CountryDto(ip, res.data.country_name, latancy, 'ipapi');
        }catch(error){
            console.log('Error when try to get geolocation from ipapi vendor');
            throw new Error(error)
        }
    }

    public getLatancyByPrecentage(precentage:number){

    }

}