import {StorageUtil} from "./StorageUtil";

export class SessionStorageUtil {
    public static getValue<T>(...keySegments: string[]): T {
        return StorageUtil.getValue(sessionStorage, ...keySegments);
    }

    public static setValue<T>(value: T, ...keySegments: string[]) {
        StorageUtil.setValue(sessionStorage, value, ...keySegments);
    }
}