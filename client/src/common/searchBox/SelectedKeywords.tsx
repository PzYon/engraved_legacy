import { IKeyword } from "engraved-shared";
import * as React from "react";
import styled from "styled-components";
import { StyleConstants } from "../../styling/StyleConstants";

const ContainerDiv = styled.div`
  text-align: left;
  font-size: 0.8rem;
  min-height: 1.7rem;
  height: 2.25rem;
`;

const SelectedKeywordSpan = styled.span`
  display: inline-block;
  margin: ${StyleConstants.formElementPadding};
  padding: ${StyleConstants.formElementPadding};
  background-color: ${StyleConstants.colors.pageBackground};
  border: 1px solid ${StyleConstants.colors.discreet};
  color: ${StyleConstants.colors.font};
  cursor: pointer;
`;

interface ISelectedKeywordsProps {
  selectedKeywords: IKeyword[];
  onKeywordSelect: (keyword: IKeyword) => void;
}

export const SelectedKeywords: React.SFC<ISelectedKeywordsProps> = (
  props: ISelectedKeywordsProps
) => {
  const keywords: IKeyword[] = props.selectedKeywords;

  if (!keywords || !keywords.length) {
    return <ContainerDiv>&nbsp;</ContainerDiv>;
  }

  return (
    <ContainerDiv>
      {keywords.map((keyword: IKeyword) => (
        <SelectedKeywordSpan key={keyword.name} onClick={() => props.onKeywordSelect(keyword)}>
          {keyword.name}
        </SelectedKeywordSpan>
      ))}
    </ContainerDiv>
  );
};
