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
  font-size: 0.7rem;
  padding: 3px 6px;
  margin: 5px 5px 5px 0;
  border-radius: ${StyleConstants.borderRadius};
  ${(props: IContainerSpanProps) => {
    return props.hasOnClick
      ? css`
          cursor: pointer;
        `
      : "";
  }};
`;

export interface IKeywordProps {
  keyword: IKeyword;
  onClick?: (keyword: IKeyword) => void;
}

export const Keyword: React.SFC<IKeywordProps> = (props: IKeywordProps) => {
  return (
    <ContainerSpan
      hasOnClick={!!props.onClick}
      onClick={() => (props.onClick ? props.onClick(props.keyword) : void 0)}
    >
      {props.keyword.name}
    </ContainerSpan>
  );
};
