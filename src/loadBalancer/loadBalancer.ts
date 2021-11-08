import { CountryDto } from "../api/dto/country.dto";
import { IClient } from "../vendor/iclient";

export class LoadBalancer{

    private vendors: IClient[];
    private numberRequests:number;

    constructor(private ipstackClient:IClient, private ipapiClient:IClient){
        this.numberRequests = 0;
        this.vendors = [this.ipstackClient, this.ipapiClient];
    }
    
    public getAvailableVendor(){
        const index = this.numberRequests % this.vendors.length;
        const vendor = this.vendors[index];

        if (vendor.isAvailable()) {
            return vendor;
        }
    
        const otherVendor = this.vendors[(index+1)%this.vendors.length];
        return otherVendor.isAvailable() ? otherVendor : null; 
    }

    public getGeolocationDetails(ip:string): Promise<CountryDto>{
        this.numberRequests++;
        const vendor = this.getAvailableVendor();

        if (!vendor){
            throw new Error('Rate exceeded');
        }
        return vendor.getGeolocationByIp(ip);
    }
}