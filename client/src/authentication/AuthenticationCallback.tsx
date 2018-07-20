import * as React from "react";
import { ReactNode } from "react";
import { Redirect, RouteComponentProps } from "react-router";
import { AuthStore } from "./AuthStore";

interface IRouterParams {
  jwt: string;
}

interface IAuthenticatedState {
  jwt: string;
}

export class AuthenticationCallback extends React.PureComponent<
  RouteComponentProps<IRouterParams>,
  IAuthenticatedState
> {
  public constructor(props: RouteComponentProps<IRouterParams>) {
    super(props);

    const jwt: string = decodeURIComponent(props.match.params.jwt);

    this.state = {
      jwt: jwt
    };

    AuthStore.setToken(jwt);
  }

  public render(): ReactNode {
    return <Redirect to="/" push={false} />;
  }
}
