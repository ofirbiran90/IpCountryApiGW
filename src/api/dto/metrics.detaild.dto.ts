export class MetricDetailsDto{
    constructor(public percentile50:number, public percentile75:number, public percentile95:number, public percentile99:number){}
}