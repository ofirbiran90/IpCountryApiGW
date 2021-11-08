import { LoadBalancer } from "../../loadBalancer/loadBalancer";
import { CountryDto } from "../dto/country.dto";

export class CountryHandler {
    private ipCountryCache: Map<string, CountryDto>;

    constructor(private loadBalancer: LoadBalancer) {
        this.ipCountryCache = new Map();
    }

    public async getcountryByIp(ip:string): Promise<CountryDto> {
        const country =  this.ipCountryCache.get(ip);
        if (country) return country;
        const countryRes = await this.loadBalancer.getGeolocationDetails(ip);

        this.ipCountryCache.set(ip, countryRes);
        return countryRes;
    }
}