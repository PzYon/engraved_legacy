import { BehaviorSubject, Observable, ObservableInput } from "rxjs";
import { catchError, filter, first, flatMap } from "rxjs/operators";
import { AuthenticatedServerApi } from "./AuthenticatedServerApi";

export class SilentAuthentication {
  private static isWaitingForSilent$: BehaviorSubject<
    boolean
  > = new BehaviorSubject<boolean>(false);

  private static lastActivityDate: Date;

  public static ensure(): void {
    if (SilentAuthentication.isWaitingForSilent$.value) {
      return;
    }

    SilentAuthentication.isWaitingForSilent$.next(true);

    const iframe: HTMLIFrameElement = document.createElement("iframe");
    iframe.src = AuthenticatedServerApi.authUrl;
    iframe.style.display = "none";
    iframe.id = "ngrvd-silent-authentication";

    (iframe as any).removeMe = () => {
      document.body.removeChild(iframe);
      SilentAuthentication.isWaitingForSilent$.next(false);

      console.log("Authenticated silently.");
    };

    document.body.appendChild(iframe);
  }

  // return value of this function should be T too, but then it doesn't compile
  public static wrap<T>(action: () => Observable<T>): Observable<any> {
    const waitUntilAuthenticated: () => Observable<T> = () => {
      return SilentAuthentication.isWaitingForSilent$.pipe(
        filter((isWaiting: boolean) => isWaiting === false),
        first(),
        flatMap(action)
      );
    };

    return waitUntilAuthenticated().pipe(
      catchError(
        (err: Error, o: Observable<T>): ObservableInput<T> => {
          if (
            (err as any).status === 401 &&
            AuthenticatedServerApi.currentUser$.value
          ) {
            SilentAuthentication.ensure();
            return waitUntilAuthenticated();
          }

          throw o;
        }
      )
    );
  }

  public static isCallback(): boolean {
    return window.frameElement && (window.frameElement as any).removeMe;
  }

  public static onAuthenticated(): void {
    if (SilentAuthentication.isCallback()) {
      (window.frameElement as any).removeMe();
    }

    SilentAuthentication.schedule();
  }

  private static schedule() {
    if (!SilentAuthentication.lastActivityDate) {
      this.lastActivityDate = new Date();

      document.addEventListener(
        "click",
        () => (this.lastActivityDate = new Date())
      );
    }

    setTimeout(
      () => {
        if (this.isBrowserActive()) {
          SilentAuthentication.ensure();
        }
      },
      // 60 minutes (token expiration time) - 1min
      SilentAuthentication.msFromMinutes(59)
    );
  }

  private static isBrowserActive() {
    // when hosted on a free heroku dyno we don't want to keep it
    // alive if a browser windows is left open somewhere on a desktop
    // computer overnight. and even in other cases: if there's no activity
    // we might as well do the silent authentication lazily.
    return (
      (new Date() as any) - (this.lastActivityDate as any) <
      SilentAuthentication.msFromMinutes(45)
    );
  }

  private static msFromMinutes(minutes: number): number {
    return minutes * 60 * 1000;
  }
}
