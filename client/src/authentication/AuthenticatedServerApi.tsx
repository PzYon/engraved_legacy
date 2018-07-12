import * as React from "react";
import {ReactNode} from "react";
import {ajax, AjaxResponse} from "rxjs/ajax";
import {Observable} from "rxjs/internal/Observable";
import {tap} from "rxjs/operators";
import {NotificationKind} from "../notifications/INotification";
import {NotificationStore} from "../notifications/NotificationStore";
import {AuthStore} from "./AuthStore";

export class AuthenticatedServerApi {
    private static get baseUrl(): string {
        return window.location.hostname === "localhost"
               ? "http://localhost:3001/"
               : `${location.protocol}//${location.hostname}/`
    };

    public static get authUrl(): string {
        return AuthenticatedServerApi.baseUrl + "auth/google/init"
    };

    public static get<T>(url: string, headers: any = {}): Observable<T> {
        return ajax.getJSON(this.getAbsoluteUrl(url), {...headers, ...this.getHeaders()})
                   .pipe(this.handleError<T>());
    }

    public static post(url: string, value: any, headers: any = {}): Observable<AjaxResponse> {
        return ajax.post(this.getAbsoluteUrl(url), value, {...headers, ...this.getHeaders()})
                   .pipe(this.handleError<AjaxResponse>());
    }

    public static patch(url: string, value: any, headers: any = {}): Observable<AjaxResponse> {
        return ajax.patch(this.getAbsoluteUrl(url), value, {...headers, ...this.getHeaders()})
                   .pipe(this.handleError<AjaxResponse>());
    }

    private static getAbsoluteUrl(url: string) {
        return `${AuthenticatedServerApi.baseUrl}${url}`;
    }

    private static getHeaders(): any {
        return {
            "Content-Type": "application/json",
            "Authorization": "JWT " + AuthStore.getToken()
        };
    }

    private static handleError<T>() {
        return tap((next: T) => next,
                   error => {
                       if ((error as any).status === 401) {
                           NotificationStore.instance.addNotification({
                                                                          messageOrNode: this.getUnAuthenticatedMessage(),
                                                                          id: "userIsUnauthenticated",
                                                                          kind: NotificationKind.Warning
                                                                      });
                       }
                   });
    }

    private static getUnAuthenticatedMessage(): ReactNode {
        return (
            <span>
                You are not authenticated or your token has expired. Click <a href={this.authUrl}>here</a> to login.
            </span>
        );
    }
}