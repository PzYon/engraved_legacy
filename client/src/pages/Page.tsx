import * as React from "react";
import { ReactNode } from "react";
import styled from "styled-components";
import { Closer } from "../common/Closer";
import { ErrorBoundary } from "../common/ErrorBoundary";
import { If } from "../common/If";
import { StyleConstants } from "../styling/StyleConstants";

const ContainerSection = styled.section`
  padding: ${StyleConstants.defaultSpacing};
  position: relative;
  opacity: 0;
  transition: opacity 0.5s;
`;

const Title = styled.h2`
  font-weight: 300;
  font-size: ${StyleConstants.font.largest};
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
  noCloser?: boolean;
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
      <ContainerSection innerRef={(r: HTMLDivElement) => (this.containerEl = r)}>
        <ErrorBoundary>
          <If
            value={!this.props.noCloser}
            render={() => (
              <Closer onClose={() => window.history.back()} title={"Back to previous page"} />
            )}
          />
          <If value={this.props.title} render={() => <Title>{this.props.title}</Title>} />
          <ContentDiv>{this.props.children}</ContentDiv>
        </ErrorBoundary>
      </ContainerSection>
    );
  }
}
