import { IKeyword } from "engraved-shared";
import * as React from "react";
import styled from "styled-components";
import { If } from "./If";
import { Keyword } from "./Keyword";

const Container = styled.span`
  display: flex;
  flex-flow: wrap;

  .ngrvd-keyword {
    line-height: 1.5rem;
  }
`;

export interface IKeywordsProps {
  keywords: IKeyword[];
  onClick?: (keyword: IKeyword) => void;
}

export const Keywords: React.SFC<IKeywordsProps> = (props: IKeywordsProps) => {
  return (
    <If
      value={props.keywords}
      render={() => {
        return (
          <Container className={"ngrvd-keywords"}>
            {props.keywords.map(k => (
              <Keyword key={k._id || k.name} keyword={k} onClick={props.onClick} />
            ))}
          </Container>
        );
      }}
    />
  );
};
