import { IKeyword } from "engraved-shared";
import * as React from "react";
import styled from "styled-components";
import { Keywords } from "../Keywords";

const ContainerDiv = styled.div`
  box-sizing: border-box;
  min-height: 41px;
  padding: ${p => p.theme.formElementPadding};
  text-align: left;
`;

interface ISelectedKeywordsProps {
  selectedKeywords: IKeyword[];
  onKeywordSelect: (keyword: IKeyword) => void;
}

export const SelectedKeywords: React.FC<ISelectedKeywordsProps> = (
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
