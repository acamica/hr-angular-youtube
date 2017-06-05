/**
 * @description
 * Creates a hash string that follows the UUID standard
 */
export function uuid (): string {
    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
}
