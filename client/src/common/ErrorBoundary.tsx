import * as React from "react";
import {ReactNode} from "react";
import styled from "styled-components";
import {IComponentConstructor} from "./IComponentConstructor";

const ErrorContainer = styled.div`
  background-color: darkred;
  color: white;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 5px;
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

    public static wrap(Comp: IComponentConstructor<{}, {}>) {
        return (props: any) => <ErrorBoundary><Comp {...props}/></ErrorBoundary>;
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