import * as React from "react";
import { ReactNode } from "react";
import { NotificationKind } from "../notifications/INotification";
import { NotificationStore } from "../notifications/NotificationStore";

interface IErrorBoundaryState {
  error?: Error;
}

export class ErrorBoundary extends React.PureComponent<
  {},
  IErrorBoundaryState
> {
  public readonly state: IErrorBoundaryState = {
    error: undefined
  };

  public static ensureError(component: React.Component, error: Error) {
    component.setState(() => {
      throw error;
    });
  }

  public componentDidCatch(error: Error, info: any): void {
    this.setState({ error: error });
  }

  public render(): ReactNode {
    if (this.state.error) {
      const errorJson = JSON.stringify(this.state.error);
      NotificationStore.instance.addNotification({
        messageOrNode: errorJson,
        id: errorJson,
        kind: NotificationKind.Error
      });
    }

    return this.props.children;
  }
}
