export class Util {
    public static toggleArrayValue<T>(array: T[],
                                      value: T,
                                      isMatch?: (element: T, index: number, otherArray: T[]) => boolean): boolean {
        const index = isMatch
                      ? array.findIndex(isMatch)
                      : array.indexOf(value);

        if (index === -1) {
            array.push(value);
            return true;
        } else {
            array.splice(index, 1);
            return false;
        }
    }
}