import { IKeyword } from "engraved-shared";
import * as React from "react";
import { Simulate } from "react-dom/test-utils";
import styled from "styled-components";
import { StyleConstants } from "../../styling/StyleConstants";
import { Keyword } from "../Keyword";
import { Keywords } from "../Keywords";
import keyDown = Simulate.keyDown;

const ContainerDiv = styled.div`
  padding: ${StyleConstants.formElementPadding};
  text-align: left;
  line-height: 1.3rem;
`;

interface ISelectedKeywordsProps {
  selectedKeywords: IKeyword[];
  onKeywordSelect: (keyword: IKeyword) => void;
}

export const SelectedKeywords: React.SFC<ISelectedKeywordsProps> = (
  props: ISelectedKeywordsProps
) => {
  const keywords: IKeyword[] = props.selectedKeywords;

  return (
    <ContainerDiv>
      {!keywords || !keywords.length ? (
        <span>&nbsp;</span>
      ) : (
        <Keywords keywords={keywords} onClick={props.onKeywordSelect} />
      )}
    </ContainerDiv>
  );
};
