import { IClient } from "../../vendor/iclient";
import { MetricDetailsDto } from "../dto/metrics.detaild.dto";
import { MetricsDto } from "../dto/metrics.dto";

export class MetricsHandler {
  
    constructor(private ipstackClient:IClient, private ipapiClient:IClient) {}

    private composeMetric(vendor: IClient): MetricDetailsDto{
        const vendorLatencies = vendor.getLatancies()
        vendorLatencies.sort((a,b)=>a-b);
        const vendorLatenciesSize = vendorLatencies.length;
        const indexPercentile50 = Math.floor(vendorLatenciesSize*0.5);
        const indexPercentile75 = Math.floor(vendorLatenciesSize*0.75);
        const indexPercentile95 = Math.floor(vendorLatenciesSize*0.95);
        const indexPercentile99 = Math.floor(vendorLatenciesSize*0.99);

        return new MetricDetailsDto(vendorLatencies[indexPercentile50], vendorLatencies[indexPercentile75], vendorLatencies[indexPercentile95],vendorLatencies[indexPercentile99]);
    }

    public getMetrics(): MetricsDto {
        return new MetricsDto(this.composeMetric(this.ipstackClient), this.composeMetric(this.ipapiClient));
    }
}