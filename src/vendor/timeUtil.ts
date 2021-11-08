export function isPassHour(time:Date):boolean{
    const now = new Date;
    const hour = 60 * 60 * 1000;

    return now.getTime() - time.getTime() > hour ;
}
