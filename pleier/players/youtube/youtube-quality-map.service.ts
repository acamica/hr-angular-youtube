// YoutubeQualityStr: PlayerQualityStr

const map: IInverseMap = {
    'hd1080' :  '1080p',
    'hd720' :  '720p',
    'large' :  '480p',
    'medium' :  '360p',
    'small' :  '240p',
    'tiny' :  '144p',
    'auto' :  'Auto'
};
const inverseMap = invertKeyValues(map);

// type IYoutubeQuality = keyof typeof map;

export const convertToYoutube = (q: string) => map[q] ? map[q] : 'Auto';
export const convertFromYoutube = (q: string) => inverseMap[q] ? inverseMap[q] : 'default';
export const convertToYoutubeArray = (qArr: string[]) => qArr.map(convertToYoutube);

interface IInverseMap {
    [str: string]: string;
}
function invertKeyValues (map: IInverseMap): IInverseMap {
    const inverseMap: IInverseMap = {};
    for (const key in map) {
        const value = map[key];
        inverseMap[value] = key;
    }
    return inverseMap;
}
