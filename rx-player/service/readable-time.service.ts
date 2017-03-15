// TODO: Change to util
export function readableTime (seconds: number): string {
    seconds = Math.floor(seconds);
    const secs = seconds % 60;
    let mins = Math.floor(seconds / 60);
    const hrs = Math.floor(mins / 60);
    mins = mins % 60;
    if ( hrs > 0 ) {
        return hrs + ':' + String('00' + mins).slice(-2) + ':' + String('00' + secs).slice(-2);
    } else {
        return mins + ':' + String('00' + secs).slice(-2);
    }
}
