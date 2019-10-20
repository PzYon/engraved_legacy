import * as MarkdownIt from "markdown-it";
import * as React from "react";
import styled from "styled-components";
import { DomUtil } from "../../../DomUtil";
import { useFlag, useTheme } from "../../../Hooks";
import { If } from "../../../If";
import { ButtonStyle, FormButton } from "../../buttons/FormButton";

export interface IMarkdownProps {
  markdown: string;
}

const tocSeparator = "---ngrvd-separator---";

export const Markdown = (props: IMarkdownProps) => {
  const [isTocExpanded, toggleIsTocExpanded] = useFlag(false);
  const theme = useTheme();

  if (!props.markdown || !props.markdown.trim()) {
    return null;
  }

  const md = `
  ${props.markdown || ""} 
  
  ${tocSeparator} 
  
  [[toc]]
  
  `;

  const completeHtml = new MarkdownIt("default", { linkify: true })
    .use(require("markdown-it-anchor").default)
    .use(require("markdown-it-table-of-contents"))
    .render(md);

  const sections = completeHtml.split(tocSeparator);
  const contentHtml = sections[0];
  const tocHtml = sections[1];

  return (
    <>
      <If
        value={!DomUtil.isEmptyHtml(tocHtml)}
        render={() => (
          <TocContainer isExpanded={isTocExpanded}>
            <FormButton
              button={{
                onClick: toggleIsTocExpanded,
                label: isTocExpanded ? "Hide TOC" : "Show TOC",
                buttonStyle: ButtonStyle.LinkLike,
                fontSize: theme.font.size.small,
                isContextualAction: true
              }}
            />
            <If
              value={isTocExpanded}
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
};

const BaseContainer = styled.div`
  padding: 0.7rem;
  border: 1px solid ${p => p.theme.colors.border};
  background-color: ${p => p.theme.colors.palette.shades.lightest};
`;

interface ITocContainerStyle {
  isExpanded: boolean;
}

const TocContainer = styled(BaseContainer)<ITocContainerStyle>`
  padding: 0.2rem 0.7rem;
  margin-bottom: 0.5rem;

  ul {
    padding-left: 0.7rem;
  }
`;

const ContentContainer = styled(BaseContainer)`
  h1,
  h2,
  h3 {
    font-weight: ${p => p.theme.font.weight.normal};
    margin: 1rem 0;
    color: ${p => p.theme.colors.accent};
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
    background-color: ${p => p.theme.colors.pageBackground};
    border: 1px solid ${p => p.theme.colors.border};
    overflow-y: auto;
    font-family: ${p => p.theme.font.codeFamily};
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

const MarkupDiv = styled.div`
  .CodeMirror-gutters {
    border-right-color: ${p => p.theme.colors.border};
  }
`;
