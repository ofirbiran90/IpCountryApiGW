import { MetricDetailsDto } from "./metrics.detaild.dto";

export class MetricsDto{
    constructor(public ipstack: MetricDetailsDto, public ipapi: MetricDetailsDto){}
}