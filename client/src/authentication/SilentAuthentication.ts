import { BehaviorSubject, Observable, ObservableInput } from "rxjs";
import { catchError, filter, flatMap } from "rxjs/operators";
import { AuthenticatedServerApi } from "./AuthenticatedServerApi";

export class SilentAuthentication {
  private static isWaitingForSilent$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  public static ensure(): void {
    if (SilentAuthentication.isWaitingForSilent$.value) {
      return;
    }

    console.log("Authenticating silently...");

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

  public static wrap<T>(action: () => Observable<T>): Observable<T> {
    const waitUntilAuthenticated: () => Observable<T> = () => {
      return SilentAuthentication.isWaitingForSilent$.pipe(
        filter((isWaiting: boolean) => isWaiting === false),
        flatMap(action)
      );
    };

    return waitUntilAuthenticated().pipe(
      catchError(
        (err: Error, o: Observable<T>): ObservableInput<T> => {
          if ((err as any).status === 401 && AuthenticatedServerApi.currentUser$.value) {
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

  public static cleanUp(): void {
    if (SilentAuthentication.isCallback()) {
      (window.frameElement as any).removeMe();
    }
  }

  public static schedule() {
    setTimeout(
      () => {
        SilentAuthentication.ensure();
      },
      // 60 minutes (token expiration time) - 1min
      59 * 60 * 1000
    );
  }
}
