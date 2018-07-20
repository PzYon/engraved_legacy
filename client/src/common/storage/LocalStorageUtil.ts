import { StorageUtil } from "./StorageUtil";

export class LocalStorageUtil {
  public static getValue<T>(...keySegments: string[]): T {
    return StorageUtil.getValue(localStorage, ...keySegments);
  }

  public static setValue<T>(value: T, ...keySegments: string[]) {
    StorageUtil.setValue(localStorage, value, ...keySegments);
  }
}
