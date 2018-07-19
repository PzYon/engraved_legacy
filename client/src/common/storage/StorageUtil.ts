export class StorageUtil {
  private static appPrefix: string = "engraved";

  public static getValue<T>(storage: Storage, ...keySegments: string[]): T {
    const json: string = storage.getItem([this.appPrefix, ...keySegments].join("."));

    if (!json) {
      return null;
    }

    return JSON.parse(json) as T;
  }

  public static setValue<T>(storage: Storage, value: T, ...keySegments: string[]) {
    storage.setItem([this.appPrefix, ...keySegments].join("."), JSON.stringify(value));
  }
}
