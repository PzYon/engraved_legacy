import { CSSProperties } from "react";
import * as React from "react";
import { ReactNode } from "react";
import styled from "styled-components";
import { StyleConstants } from "../styling/StyleConstants";

const ContainerSection = styled.section`
  opacity: 0;
  transition: opacity ${StyleConstants.transitionTime};
`;

export interface IFaderContainerProps {
  style?: CSSProperties;
}

export class FaderContainer extends React.PureComponent<IFaderContainerProps> {
  private containerEl: HTMLDivElement;

  public componentDidMount(): void {
    setTimeout(() => (this.containerEl.style.opacity = "1"));
  }

  public render(): ReactNode {
    return (
      <ContainerSection
        style={this.props.style}
        innerRef={(r: HTMLDivElement) => (this.containerEl = r)}
      >
        {this.props.children}
      </ContainerSection>
    );
  }
}
