import * as React from "react";

export interface IComponentConstructor<P, S> {
    new(props: P): React.Component<P, S>;
}