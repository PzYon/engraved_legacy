import * as React from "react";
import {ReactNode} from "react";
import styled from "styled-components";
import {ItemsList} from "./results/ItemsList";
import {SearchBox} from "./searchBox/SearchBox";

const BoxContainerDiv = styled.div`
  text-align: center;
`;

export class Search extends React.PureComponent {
    public render(): ReactNode {
        return [
            <BoxContainerDiv key={"searchBox"}>
                <SearchBox/>
            </BoxContainerDiv>,
            <ItemsList key={"results"}/>
        ]
    }
}