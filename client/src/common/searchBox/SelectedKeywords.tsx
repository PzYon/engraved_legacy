import { IKeyword } from "engraved-shared";
import * as React from "react";
import styled from "styled-components";
import { StyleConstants } from "../../styling/StyleConstants";
import { Keyword } from "../Keyword";

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
        keywords.map((keyword: IKeyword) => (
          <Keyword key={keyword._id} keyword={keyword} onClick={props.onKeywordSelect} />
        ))
      )}
    </ContainerDiv>
  );
};
