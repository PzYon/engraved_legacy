import * as MarkdownIt from "markdown-it";
import * as React from "react";
import { ReactNode } from "react";
import styled, { css } from "styled-components";
import { StyleConstants } from "../../../../styling/StyleConstants";
import { DomUtil } from "../../../DomUtil";
import { If } from "../../../If";

const mdItToc = require("markdown-it-table-of-contents");
const mdItAnchor = require("markdown-it-anchor");

const BaseContainer = styled.div`
  padding: 0.7rem;
  border: 1px solid ${StyleConstants.colors.discreet};
  background-color: ${StyleConstants.colors.ultraDiscreet};
`;

interface ITocContainerStyle {
  isExpanded: boolean;
}

const TocContainer = BaseContainer.extend<ITocContainerStyle>`
  padding: 0.2rem 0.2rem 0.2rem 0.7rem;
  margin-bottom: 0.5rem;

  ul {
    padding-left: 0.7rem;
  }
`;

const ContentContainer = BaseContainer.extend`
  h1,
  h2,
  h3 {
    margin: 1rem 0;
    color: ${StyleConstants.colors.accent};
  }

  p,
  h4,
  h5,
  h6,
  li {
    margin: 0.7rem 0;
  }

  h1 {
    font-size: 1.3rem;
  }

  h2 {
    font-size: 1.15rem;
  }

  h3 {
    font-size: 1rem;
  }

  ul {
    margin: 0.7rem 0;
    padding-left: 1rem;
  }

  code {
    width: calc(100% - 1.4rem - 2px);
    padding: 0.7rem;
    display: block;
    background-color: white;
    border: 1px solid ${StyleConstants.colors.discreet};
    overflow-y: auto;
  }

  img {
    max-width: 100%;
  }

  * > :first-child {
    margin-top: 0 !important;
  }

  * > :last-child {
    margin-bottom: 0 !important;
  }
`;

const TocToggler = styled.a`
  color: ${StyleConstants.colors.accent};
  font-size: ${StyleConstants.font.small};
`;

const TocDiv = styled.div`
  margin: 1rem 0;
  list-style-type: none;

  ul {
    list-style-type: none;
  }

  .table-of-contents > ul {
    padding-left: 0;
  }
`;

const MarkupDiv = styled.div``;

export interface IMarkdownProps {
  markdown: string;
}

interface IMarkdownState {
  isTocExpanded: boolean;
}

const tocSeparator = "---ngrvd-separator---";

export class Markdown extends React.PureComponent<IMarkdownProps, IMarkdownState> {
  public constructor(props: IMarkdownProps) {
    super(props);

    this.state = {
      isTocExpanded: false
    };
  }

  public render(): ReactNode {
    if (!this.props.markdown || !this.props.markdown.trim()) {
      return null;
    }

    const md = `
  ${this.props.markdown || ""} 
  
  ${tocSeparator} 
  
  [[toc]]
  
  `;

    const completeHtml = new MarkdownIt()
      .use(mdItAnchor)
      .use(mdItToc)
      .render(md);

    const sections = completeHtml.split(tocSeparator);
    const contentHtml = sections[0];
    const tocHtml = sections[1];

    return (
      <>
        <If
          value={!DomUtil.isEmptyHtml(tocHtml)}
          render={() => (
            <TocContainer isExpanded={this.state.isTocExpanded}>
              <TocToggler
                href={"javascript: void(0);"}
                onClick={() => this.setState({ isTocExpanded: !this.state.isTocExpanded })}
              >
                {this.state.isTocExpanded ? "Hide TOC" : "Show TOC"}
              </TocToggler>
              <If
                value={this.state.isTocExpanded}
                render={() => <TocDiv dangerouslySetInnerHTML={{ __html: tocHtml }} />}
              />
            </TocContainer>
          )}
        />
        <ContentContainer>
          <MarkupDiv dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </ContentContainer>
      </>
    );
  }
}
