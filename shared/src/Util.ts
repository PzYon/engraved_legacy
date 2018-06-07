export class Util {
    public static toggleArrayValue<T>(array: T[], value: T): boolean {
        const index = array.indexOf(value);

        if (index === -1) {
            array.push(value);
            return true;
        } else {
            array.splice(index, 1);
            return false;
        }
    }
}