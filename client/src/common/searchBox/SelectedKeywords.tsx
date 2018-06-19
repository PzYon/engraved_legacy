import {IKeyword} from "engraved-shared/dist";
import * as React from "react";
import styled from "styled-components";
import {StyleConstants} from "../styling/StyleConstants";

const ContainerDiv = styled.div`
  text-align: left;
  font-size: 0.8rem;
  min-height: 1.7rem;
  background-color: ${StyleConstants.colors.accent.light};
`;

const SelectedKeywordSpan = styled.span`
  display: inline-block;
  margin: ${StyleConstants.formElementPadding};
  padding: ${StyleConstants.formElementPadding};
  background-color: ${StyleConstants.colors.pageBackground};
  cursor: pointer;
`;

interface ISelectedKeywordsProps {
    selectedKeywords: IKeyword[];
    onKeywordSelect: (keyword: IKeyword) => void;
}

export const SelectedKeywords: React.SFC<ISelectedKeywordsProps> = (props: ISelectedKeywordsProps) => {
    const keywords: IKeyword[] = props.selectedKeywords;

    if (!keywords || !keywords.length) {
        return <ContainerDiv>&nbsp;</ContainerDiv>;
    }

    return (
        <ContainerDiv>
            {
                keywords.map((keyword: IKeyword) => (
                    <SelectedKeywordSpan
                        key={keyword.name}
                        onClick={() => props.onKeywordSelect(keyword)}
                    >
                        {keyword.name}
                    </SelectedKeywordSpan>
                ))
            }
        </ContainerDiv>
    );
};