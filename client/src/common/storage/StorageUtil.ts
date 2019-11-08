export class StorageUtil {
  private static appPrefix: string = "engraved";

  public static getValue<T>(storage: Storage, ...keySegments: string[]): T {
    const json: string = storage.getItem(this.getKey(keySegments));

    return !json ? null : (JSON.parse(json) as T);
  }

  public static setValue<T>(
    storage: Storage,
    value: T,
    ...keySegments: string[]
  ) {
    storage.setItem(this.getKey(keySegments), JSON.stringify(value));
  }

  private static getKey(keySegments: string[]) {
    return [this.appPrefix, ...keySegments].join(".");
  }
}
