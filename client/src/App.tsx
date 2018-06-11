import * as React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import styled from "styled-components";
import {CreateItemForm} from "./form/CreateItemForm";
import {EditItemForm} from "./form/EditItemForm";
import {ViewItemForm} from "./form/ViewItemForm";
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
                <Route path="/create/:itemKind?/:value?" component={CreateItemForm}/>
                <Route path="/:itemId" component={ViewItemForm} exact={true}/>
                <Route path="/:itemId/edit" component={EditItemForm}/>
            </AppRootDiv>
        </Router>
    );
