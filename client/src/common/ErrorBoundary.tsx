import * as React from "react";
import {ReactNode} from "react";
import styled from "styled-components";
import {NotificationKind} from "../notifications/INotification";
import {NotificationStore} from "../notifications/NotificationStore";
import {StyleConstants} from "../styling/StyleConstants";

const ErrorContainer = styled.div`
  background-color: ${StyleConstants.colors.error.background};
  color: ${StyleConstants.colors.error.text};
  overflow: hidden;
  width: calc(100% - 0.4rem - 0.4rem);
  padding: 0.4rem;
  font-size: 0.8rem;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

interface IErrorBoundaryState {
    error?: Error;
}

export class ErrorBoundary extends React.PureComponent<{}, IErrorBoundaryState> {
    public constructor(props: {}) {
        super(props);
        this.state = {error: undefined};
    }

    public static ensureError(component: React.Component, error: Error) {
        component.setState(() => {
            throw error;
        });
    }

    public componentDidCatch(error: Error, info: any): void {
        this.setState({error: error});
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
