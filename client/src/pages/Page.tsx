import * as React from "react";
import { ReactNode } from "react";
import styled from "styled-components";
import { ErrorBoundary } from "../common/ErrorBoundary";
import { StyleConstants } from "../styling/StyleConstants";

const ContainerDiv = styled.div`
  padding: ${StyleConstants.defaultSpacing};
  opacity: 0;
  transition: opacity 0.8s;
`;

const H1 = styled.h2`
  font-weight: bold;
  font-size: 1.5rem;
  color: ${StyleConstants.colors.accent};
  margin-top: 0;
`;

const ContentDiv = styled.div`
  margin: ${StyleConstants.defaultSpacing} 0;
`;

export interface IPageProps {
  children: ReactNode;
  title?: string;
  browserTitle?: string;
}

export class Page extends React.PureComponent<IPageProps> {
  private containerEl: HTMLDivElement;

  public componentDidMount(): void {
    setTimeout(() => (this.containerEl.style.opacity = "1"));
    document.title = this.props.browserTitle
      ? "engraved. | " + this.props.browserTitle
      : "engraved.";
  }

  public render(): ReactNode {
    return (
      <ContainerDiv innerRef={(r: HTMLDivElement) => (this.containerEl = r)}>
        <ErrorBoundary>
          {this.props.title && <H1>{this.props.title}</H1>}
          <ContentDiv>{this.props.children}</ContentDiv>
        </ErrorBoundary>
      </ContainerDiv>
    );
  }
}
