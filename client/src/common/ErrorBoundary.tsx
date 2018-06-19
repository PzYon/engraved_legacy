import * as React from "react";
import {ReactNode} from "react";
import styled from "styled-components";
import {StyleConstants} from "./styling/StyleConstants";

const ErrorContainer = styled.div`
  background-color: ${StyleConstants.colors.error};
  color: ${StyleConstants.colors.pageBackground};
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.4rem;
  font-size: 0.8rem;
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
        if (!this.state.error) {
            return this.props.children;
        }

        return (
            <ErrorContainer>
                {JSON.stringify(this.state.error)}
            </ErrorContainer>
        );
    }
}