import { IUser, Util } from "engraved-shared";
import { BehaviorSubject } from "rxjs";
import { ajax, AjaxError, AjaxResponse } from "rxjs/ajax";
import { Observable } from "rxjs/internal/Observable";
import { map, tap } from "rxjs/operators";
import { LocalStorageUtil } from "../common/storage/LocalStorageUtil";
import { NotificationKind } from "../notifications/INotification";
import { NotificationStore } from "../notifications/NotificationStore";
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
      ajax
        .getJSON(this.getAbsoluteUrl(url), this.getHeaders(headers))
        .pipe(this.getErrorHandler())
    );
  }

  public static post<T>(
    url: string,
    value: any,
    headers: any = {},
    emitDefaultContentType: boolean = false
  ): Observable<T> {
    return SilentAuthentication.wrap(() =>
      ajax
        .post(
          this.getAbsoluteUrl(url),
          value,
          this.getHeaders(headers, emitDefaultContentType)
        )
        .pipe(this.getErrorHandler(), this.getSuccessHandler())
    );
  }

  public static patch<T>(
    url: string,
    value: any,
    headers: any = {}
  ): Observable<T> {
    return SilentAuthentication.wrap(() =>
      ajax
        .patch(this.getAbsoluteUrl(url), value, this.getHeaders(headers))
        .pipe(this.getErrorHandler(), this.getSuccessHandler())
    );
  }

  public static delete<T>(url: string, headers: any = {}): Observable<T> {
    return SilentAuthentication.wrap(() =>
      ajax
        .delete(this.getAbsoluteUrl(url), this.getHeaders(headers))
        .pipe(this.getErrorHandler(), this.getSuccessHandler())
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

  private static getErrorHandler() {
    // we add a notification for the error but then continue
    // with the regular observable-flow. this way we don't
    // change any previous behavior and we also enable the
    // users of this function to have full control over how
    // to deal with any errors.
    return tap({
      error: (e: AjaxError) => {
        NotificationStore.instance.addNotification({
          id: Util.createGuid(),
          kind: NotificationKind.Error,
          messageOrNode:
            e?.message ||
            `An unknown error occurred somewhere (status code ${e.status})...`
        });
      }
    });
  }

  private static getSuccessHandler() {
    return map((r: AjaxResponse) => r.response);
  }
}
