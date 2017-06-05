
export function concatUnique<T> (a: T[], b: T[]): T[] {
    return a.concat(b.filter(item => a.indexOf(item) === -1));
}

export function removeItem<T> (item: T, list: T[]) {
    const index = list.indexOf(item);
    if (index === -1) {
        return list;
    } else {
        return [
            ...list.slice(0, index),
            ...list.slice(index + 1)
        ];
    }
}

