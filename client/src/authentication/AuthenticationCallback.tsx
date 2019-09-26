import * as React from "react";
import { ReactNode } from "react";
import { Redirect, RouteComponentProps } from "react-router";
import { LocalStorageUtil } from "../common/storage/LocalStorageUtil";
import { AuthenticatedServerApi } from "./AuthenticatedServerApi";
import { SilentAuthentication } from "./SilentAuthentication";

const urlBeforeAuthKey = "urlBeforeAuth";

interface IRouterParams {
  jwt: string;
}

interface IAuthenticatedState {
  jwt: string;
  targetUrl: string;
}

export class AuthenticationCallback extends React.PureComponent<
  RouteComponentProps<IRouterParams>,
  IAuthenticatedState
> {
  public readonly state: IAuthenticatedState = {
    targetUrl: null,
    jwt: null
  };

  public componentDidMount(): void {
    const jwt: string = decodeURIComponent(this.props.match.params.jwt);

    this.setState({
      jwt: jwt,
      targetUrl: AuthenticationCallback.getTargetUrl()
    });

    AuthenticatedServerApi.setToken(jwt);

    SilentAuthentication.onAuthenticated();
  }

  public static rememberCurrentUrlForRedirectionAfterAuthentication() {
    LocalStorageUtil.setValue(window.location.pathname, urlBeforeAuthKey);
  }

  private static getTargetUrl(): string {
    if (SilentAuthentication.isCallback()) {
      return null;
    }

    const urlBeforeAuth = LocalStorageUtil.getValue<string>(urlBeforeAuthKey);

    if (urlBeforeAuth) {
      LocalStorageUtil.setValue(null, urlBeforeAuthKey);
      return urlBeforeAuth;
    }

    return "/";
  }

  public render(): ReactNode {
    return this.state.targetUrl ? <Redirect to={this.state.targetUrl} push={false} /> : null;
  }
}
