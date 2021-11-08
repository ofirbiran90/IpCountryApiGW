export interface IClient{
    isAvailable():boolean;
    getGeolocationByIp(ip:string):Promise<any>;
    getLatancies():number[];
}