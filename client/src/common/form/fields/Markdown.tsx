import * as MarkdownIt from "markdown-it";
import * as React from "react";
import { ReactNode } from "react";
import styled from "styled-components";
import { StyleConstants } from "../../../styling/StyleConstants";

const mdItToc = require("markdown-it-table-of-contents");
const mdItAnchor = require("markdown-it-anchor");

const Container = styled.div`
  border: 1px solid ${StyleConstants.colors.discreet};
  background-color: ${StyleConstants.colors.ultraDiscreet};
  padding: 0.7rem;

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0.5rem 0;
  }

  h1,
  h2,
  h3 {
    color: ${StyleConstants.colors.accent};
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
    margin: 0;
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
`;

const TocToggler = styled.div`
  color: ${StyleConstants.colors.accent};
  font-size: ${StyleConstants.font.small};
  cursor: pointer;
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
      <Container>
        <TocToggler onClick={() => this.setState({ isTocExpanded: !this.state.isTocExpanded })}>
          {this.state.isTocExpanded ? "Hide TOC" : "Show TOC"}
        </TocToggler>
        {this.state.isTocExpanded && <TocDiv dangerouslySetInnerHTML={{ __html: tocHtml }} />}
        <MarkupDiv dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </Container>
    );
  }
}
