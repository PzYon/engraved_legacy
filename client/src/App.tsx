import * as React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import styled from "styled-components";
import {EditItemForm} from "./form/EditItemForm";
import {ItemsList} from "./items/ItemsList";
import {SearchBox} from "./searchBox/SearchBox";

const AppRootDiv = styled.div`
  background-color: lightskyblue;
  min-height: 100vh;
  height: 100%;
  width: 100%;
`;

const BoxContainerDiv = styled.div`
  text-align: center;
`;

export const App: React.SFC = () =>
    (
        <Router>
            <AppRootDiv>
                <BoxContainerDiv>
                    <SearchBox/>
                </BoxContainerDiv>
                <ItemsList/>
                <Route path="/create/:itemKind?/:value?" component={EditItemForm}/>
            </AppRootDiv>
        </Router>
    );
