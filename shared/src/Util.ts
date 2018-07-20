export class Util {
  public static toggleArrayValue<T>(
    array: T[],
    value: T,
    isMatch?: (element: T, index: number, otherArray: T[]) => boolean
  ): boolean {
    const index = isMatch ? array.findIndex(isMatch) : array.indexOf(value);

    if (index === -1) {
      array.push(value);
      return true;
    } else {
      array.splice(index, 1);
      return false;
    }
  }

  public static createGuid(): string {
    const S4: () => string = (): string => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };

    return `${S4()}${S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
  }
}
