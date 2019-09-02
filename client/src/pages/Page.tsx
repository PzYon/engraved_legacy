import * as React from "react";
import { ReactNode } from "react";
import styled from "styled-components";
import { Closer } from "../common/Closer";
import { ErrorBoundary } from "../common/ErrorBoundary";
import { FaderContainer } from "../common/FaderContainer";
import { If } from "../common/If";
import { StyleConstants } from "../styling/StyleConstants";

const Title = styled.h2`
  font-weight: ${StyleConstants.font.weight.normal};
  font-size: ${StyleConstants.font.largest};
  color: ${StyleConstants.colors.accent};
  margin: 0 0 ${StyleConstants.defaultSpacing} 0;
`;

const ContentDiv = styled.div`
  margin: ${StyleConstants.defaultSpacing} 0;
`;

export interface IPageProps {
  children: ReactNode;
  title?: string;
  browserTitle?: string;
  noCloser?: boolean;
  backgroundColor?: string;
}

export class Page extends React.PureComponent<IPageProps> {
  public componentDidMount(): void {
    document.title = this.props.browserTitle
      ? "engraved. | " + this.props.browserTitle
      : "engraved.";

    document.body.style.backgroundColor =
      this.props.backgroundColor || StyleConstants.colors.pageBackground;
  }

  public render(): ReactNode {
    return (
      <FaderContainer style={{ padding: StyleConstants.defaultSpacing }}>
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
      </FaderContainer>
    );
  }
}
