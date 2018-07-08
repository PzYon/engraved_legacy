import {IUser} from "engraved-shared";
import {BehaviorSubject} from "rxjs/index";
import {LocalStorageUtil} from "../common/storage/LocalStorageUtil";

export class AuthStore {
    private static readonly tokenKey: string = "jwt";

    public static currentUser$: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null);

    public static getToken(): string {
        return LocalStorageUtil.getValue<string>(this.tokenKey);
    }

    public static setToken(jwt: string): void {
        LocalStorageUtil.setValue(jwt, this.tokenKey);
    }
}
