import {ajax, AjaxResponse} from "rxjs/ajax";
import {Observable} from "rxjs/internal/Observable";
import {AuthStore} from "./AuthStore";

export class AuthenticatedServerApi {
    private static readonly baseUrl: string = "http://localhost:3001";

    public static get<T>(url: string, headers: any = {}): Observable<T> {
        return ajax.getJSON(this.getAbsoluteUrl(url), {...headers, ...this.getHeaders()});
    }

    public static post(url: string, value: any, headers: any = {}): Observable<AjaxResponse> {
        return ajax.post(this.getAbsoluteUrl(url), value, {...headers, ...this.getHeaders()});
    }

    public static patch(url: string, value: any, headers: any = {}): Observable<AjaxResponse> {
        return ajax.patch(this.getAbsoluteUrl(url), value, {...headers, ...this.getHeaders()});
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
}