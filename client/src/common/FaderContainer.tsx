import * as React from "react";
import { CSSProperties, ReactNode } from "react";
import styled from "styled-components";

const ContainerSection = styled.section`
  opacity: 0;
  transition: opacity ${p => p.theme.transitionTime};
`;

export interface IFaderContainerProps {
  style?: CSSProperties;
}

export class FaderContainer extends React.PureComponent<IFaderContainerProps> {
  private containerEl = React.createRef<HTMLDivElement>();

  public componentDidMount(): void {
    setTimeout(() => (this.containerEl.current.style.opacity = "1"));
  }

  public render(): ReactNode {
    return (
      <ContainerSection style={this.props.style} ref={this.containerEl}>
        {this.props.children}
      </ContainerSection>
    );
  }
}
