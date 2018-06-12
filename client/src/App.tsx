import * as React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import styled from "styled-components";
import {ErrorBoundary} from "./common/ErrorBoundary";
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

export const App: React.SFC = () => (
    <Router>
        <AppRootDiv>
            <ErrorBoundary>
                <BoxContainerDiv>
                    <SearchBox/>
                </BoxContainerDiv>
                <ItemsList/>
            </ErrorBoundary>
            <Route
                path="/create/:itemKind?/:value?"
                render={ErrorBoundary.wrap(CreateItemForm)}
            />
            <Route
                path="/:itemId"
                exact={true}
                render={ErrorBoundary.wrap(ViewItemForm)}
            />
            <Route
                path="/:itemId/edit"
                render={ErrorBoundary.wrap(EditItemForm)}
            />
        </AppRootDiv>
    </Router>
);
