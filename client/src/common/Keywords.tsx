import { IKeyword } from "engraved-shared";
import * as React from "react";
import styled from "styled-components";
import { DomUtil } from "./DomUtil";
import { Keyword } from "./Keyword";

const Container = styled.span`
  display: flex;
  flex-flow: wrap;

  .ngrvd-keyword {
    line-height: 1.4rem;
  }
`;

export interface IKeywordsProps {
  keywords: IKeyword[];
  onClick?: (keyword: IKeyword) => void;
  orderAlphabetically?: true;
}

export const Keywords: React.FC<IKeywordsProps> = (props: IKeywordsProps) => {
  return (
    DomUtil.shouldRender(props.keywords) && (
      <Container className={"ngrvd-keywords"}>
        {props.keywords
          .sort((a: IKeyword, b: IKeyword) =>
            props.orderAlphabetically
              ? (a.name as any) > (b.name as any)
                ? 1
                : -1
              : 0
          )
          .map(k => (
            <Keyword
              key={k._id || k.name}
              keyword={k}
              onClick={props.onClick}
            />
          ))}
      </Container>
    )
  );
};
