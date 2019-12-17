import { IUser } from "engraved-shared";
import { BehaviorSubject } from "rxjs";
import { ajax, AjaxResponse } from "rxjs/ajax";
import { Observable } from "rxjs/internal/Observable";
import { LocalStorageUtil } from "../common/storage/LocalStorageUtil";
import { SilentAuthentication } from "./SilentAuthentication";

export class AuthenticatedServerApi {
  public static currentUser$: BehaviorSubject<IUser> = new BehaviorSubject<
    IUser
  >(null);

  private static readonly tokenKey: string = "jwt";

  public static get authUrl(): string {
    return AuthenticatedServerApi.baseUrl + "auth/google/init";
  }

  private static get baseUrl(): string {
    return (
      (window.location.hostname === "localhost"
        ? "http://localhost:3001"
        : `${window.location.protocol}//${window.location.hostname}`) + "/api/"
    );
  }

  public static getToken(): string {
    return LocalStorageUtil.getValue<string>(this.tokenKey);
  }

  public static setToken(jwt: string): void {
    LocalStorageUtil.setValue(jwt, this.tokenKey);
  }

  public static get<T>(url: string, headers: any = {}): Observable<T> {
    return SilentAuthentication.wrap(() =>
      ajax.getJSON(this.getAbsoluteUrl(url), this.getHeaders(headers))
    );
  }

  public static post(
    url: string,
    value: any,
    headers: any = {},
    emitDefaultContentType: boolean = false
  ): Observable<AjaxResponse> {
    return SilentAuthentication.wrap(() =>
      ajax.post(
        this.getAbsoluteUrl(url),
        value,
        this.getHeaders(headers, emitDefaultContentType)
      )
    );
  }

  public static patch(
    url: string,
    value: any,
    headers: any = {}
  ): Observable<AjaxResponse> {
    return SilentAuthentication.wrap(() =>
      ajax.patch(this.getAbsoluteUrl(url), value, this.getHeaders(headers))
    );
  }

  public static delete(
    url: string,
    headers: any = {}
  ): Observable<AjaxResponse> {
    return SilentAuthentication.wrap(() =>
      ajax.delete(this.getAbsoluteUrl(url), this.getHeaders(headers))
    );
  }

  private static getAbsoluteUrl(url: string) {
    return `${AuthenticatedServerApi.baseUrl}${url}`;
  }

  private static getHeaders(
    headers: {},
    emitDefaultContentType: boolean = false
  ) {
    return {
      ...headers,
      ...this.getDefaultHeaders(emitDefaultContentType)
    };
  }

  private static getDefaultHeaders(emitDefaultContentType: boolean): {} {
    const defaultHeaders = {
      Authorization: "JWT " + this.getToken()
    };

    if (!emitDefaultContentType) {
      defaultHeaders["Content-Type"] = "application/json";
    }

    return defaultHeaders;
  }
}
