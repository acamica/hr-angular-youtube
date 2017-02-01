// YoutubeQualityStr: PlayerQualityStr
const map =  {
    'hd1080' : '1080p',
    'hd720' : '720p',
    'large' : '480p',
    'medium' : '360p',
    'small' : '240p',
    'tiny' : '144p',
    'auto' : 'Auto'
};
const inverseMap = invertKeyValues(map);

export const convertToYoutube = (q: string) => map[q] ? map[q] : 'Auto';
export const convertFromYoutube = (q: string) => inverseMap[q] ? inverseMap[q] : 'default';
export const convertToYoutubeArray = (qArr: string[]) => qArr.map(convertToYoutube);

function invertKeyValues(map) {
    let inverseMap = {};
    let value;
    for (let key in map) {
        value = map[key];
        inverseMap[value] = key;
    }
    return inverseMap;
}
