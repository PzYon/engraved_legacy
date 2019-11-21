import * as MarkdownIt from "markdown-it";
import * as React from "react";
import styled from "styled-components";
import { DomUtil } from "../../../DomUtil";
import { useFlag, useTheme } from "../../../Hooks";
import { If } from "../../../If";
import { ButtonStyle, FormButton } from "../../buttons/FormButton";
import { IButton } from "../../buttons/IButton";

export interface IMarkdownProps {
  markdown: string;
  buttons?: IButton[];
}

const tocSeparator = "---ngrvd-separator---";

export const Markdown = (props: IMarkdownProps) => {
  const [isTocExpanded, toggleIsTocExpanded] = useFlag(false);
  const theme = useTheme();

  if (!props.markdown || !props.markdown.trim()) {
    return null;
  }

  const completeHtml = transformMarkDownToHtml();

  const sections = completeHtml.split(tocSeparator);
  const contentHtml = sections[0];
  const tocHtml = sections[1];

  const buttons: IButton[] = getButtons();

  return (
    <>
      <If
        value={buttons.length > 0}
        render={() => (
          <ButtonContainer>
            {buttons.map(button => (
              <FormButton key={button.label} button={button} />
            ))}
          </ButtonContainer>
        )}
      />
      <ContentContainer>
        <If
          value={isTocExpanded}
          render={() => (
            <TocContainer dangerouslySetInnerHTML={{ __html: tocHtml }} />
          )}
        />
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </ContentContainer>
    </>
  );

  function getButtons(): IButton[] {
    const allButtons: IButton[] = [...(props.buttons || [])];

    if (!DomUtil.isEmptyHtml(tocHtml)) {
      allButtons.push({
        onClick: toggleIsTocExpanded,
        label: isTocExpanded ? "Hide TOC" : "Show TOC",
        buttonStyle: ButtonStyle.LinkLike,
        fontSize: theme.font.size.small,
        isContextualAction: true
      });
    }

    return allButtons;
  }

  function transformMarkDownToHtml() {
    const md = `
  ${props.markdown || ""} 
  
  ${tocSeparator} 
  
  [[toc]]
  
  `;

    return new MarkdownIt("default", { linkify: true })
      .use(require("markdown-it-anchor").default)
      .use(require("markdown-it-table-of-contents"))
      .render(md);
  }
};

const ContentContainer = styled.div`
  overflow: auto;
  padding: 0.7rem;
  border: 1px solid ${p => p.theme.colors.border};
  background-color: ${p => p.theme.colors.palette.shades.lightest};

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
    margin: 0.5rem 0;
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
    margin: 0.5rem 0;
    padding-left: 1rem;
    list-style-type: circle;
  }

  code {
    font-family: ${p => p.theme.font.codeFamily};
  }

  pre > code {
    overflow-y: auto;
    display: block;
    box-sizing: border-box;
    width: 100%;
    padding: 0.7rem;
    border: 1px solid ${p => p.theme.colors.border};
    background-color: ${p => p.theme.colors.pageBackground};
  }

  img {
    max-width: 100%;
  }

  div > :first-child {
    margin-top: 0 !important;
  }

  div > :last-child {
    margin-bottom: 0 !important;
  }
`;

const TocContainer = styled.div`
  margin: 0 0 1.5rem 0;

  .table-of-contents > ul {
    padding-left: 0;
  }

  ul {
    padding-left: 0.7rem;
    list-style-type: none;
  }

  p:empty {
    display: none;
  }
`;

const ButtonContainer = styled.div`
  button:not(:last-of-type)::after {
    content: "\\00B7";
    margin: 0 0.4rem;
  }
`;
