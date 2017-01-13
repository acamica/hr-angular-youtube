export function youtubeReadableTime(t: number): string {
    t = Math.floor(t);
    const seconds = t % 60;
    let minutes = Math.floor(t / 60);
    const hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    if ( hours > 0 ) {
        return hours + ':' + String('00' + minutes).slice(-2) + ':' + String('00' + seconds).slice(-2);
    } else {
        return minutes + ':' + String('00' + seconds).slice(-2);
    }
}
