import * as marked from "marked";
import * as React from "react";
import styled from "styled-components";
import { StyleConstants } from "../../../styling/StyleConstants";

const MarkupDiv = styled.div`
  border: 1px solid ${StyleConstants.colors.discreet};
  background-color: ${StyleConstants.colors.ultraDiscreet};
  padding: 0.3rem;

  p,
  h1,
  h2,
  h3 {
    margin: 0.3rem 0;
  }

  ul {
    margin: 0;
    padding-left: 1rem;
  }
`;

export interface IMarkdownProps {
  markdown: string;
}

export const Markdown: React.SFC<IMarkdownProps> = (props: IMarkdownProps) => {
  return <MarkupDiv dangerouslySetInnerHTML={{ __html: marked(props.markdown || "") }} />;
};
