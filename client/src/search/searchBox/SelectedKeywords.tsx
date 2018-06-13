import {IKeyword} from "engraved-shared/dist";
import * as React from "react";
import styled from "styled-components";
import {StyleConstants} from "../../common/StyleConstants";

const ContainerDiv = styled.div`
  min-height: 1.5rem;
`;

const SelectedKeywordSpan = styled.span`
  display: inline-block;
  margin: 0 10px;
  padding: ${StyleConstants.formElementPadding};
  background-color: white;
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