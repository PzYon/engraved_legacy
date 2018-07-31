import { IKeyword } from "engraved-shared";
import * as React from "react";
import styled, { css } from "styled-components";
import { StyleConstants } from "../styling/StyleConstants";

interface IContainerSpanProps {
  hasOnClick: boolean;
}

const ContainerSpan = styled.span`
  background-color: ${StyleConstants.colors.accent};
  color: white;
  font-size: ${StyleConstants.font.small};
  padding: 0 9px;
  margin: 3px;
  word-wrap: break-word;
  border-radius: ${StyleConstants.borderRadius};
  ${(props: IContainerSpanProps) => {
    return props.hasOnClick
      ? css`
          cursor: pointer;
        `
      : "";
  }};

  &:first-of-type {
    margin-left: 0;
  }
`;

export interface IKeywordProps {
  keyword: IKeyword;
  onClick?: (keyword: IKeyword) => void;
}

export const Keyword: React.SFC<IKeywordProps> = (props: IKeywordProps) => {
  return (
    <ContainerSpan
      className={"ngrvd-keyword"}
      hasOnClick={!!props.onClick}
      onClick={() => (props.onClick ? props.onClick(props.keyword) : void 0)}
    >
      {props.keyword.name}
    </ContainerSpan>
  );
};
