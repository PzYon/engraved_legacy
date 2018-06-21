import * as React from "react";
import {ReactNode} from "react";
import styled from "styled-components";
import {StyleConstants} from "../../common/styling/StyleConstants";
import {Page} from "../Page";
import {GlobalSearchBox} from "./GlobalSearchBox";
import {ItemsList} from "./results/ItemsList";

const SearchContainerDiv = styled.div`
  text-align: center;
  margin: 0 0 1rem 0;
`;

const SearchInnerContainerDiv = styled.div`
  display: inline-block;
  position: relative;
  padding: ${StyleConstants.defaultPadding};
`;

export class SearchPage extends React.PureComponent {
    public render(): ReactNode {
        return (
            <Page>
                <SearchContainerDiv key={"searchBox"}>
                    <SearchInnerContainerDiv>
                        <GlobalSearchBox/>
                    </SearchInnerContainerDiv>
                </SearchContainerDiv>
                <ItemsList key={"results"}/>
            </Page>
        )
    }
}