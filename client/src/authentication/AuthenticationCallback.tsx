import * as React from "react";
import { ReactNode } from "react";
import { Redirect, RouteComponentProps } from "react-router";
import { AuthenticatedServerApi } from "./AuthenticatedServerApi";
import { SilentAuthentication } from "./SilentAuthentication";

interface IRouterParams {
  jwt: string;
}

interface IAuthenticatedState {
  jwt: string;
  doNotRedirect: boolean;
}

export class AuthenticationCallback extends React.PureComponent<
  RouteComponentProps<IRouterParams>,
  IAuthenticatedState
> {
  public readonly state: IAuthenticatedState = {
    doNotRedirect: true,
    jwt: null
  };

  public componentDidMount(): void {
    const jwt: string = decodeURIComponent(this.props.match.params.jwt);

    this.setState({
      jwt: jwt,
      doNotRedirect: SilentAuthentication.isCallback()
    });

    AuthenticatedServerApi.setToken(jwt);

    SilentAuthentication.onAuthenticated();
  }

  public render(): ReactNode {
    return this.state.doNotRedirect ? null : <Redirect to="/" push={false} />;
  }
}
