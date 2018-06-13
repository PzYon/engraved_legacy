import * as React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import styled from "styled-components";
import {ErrorBoundary} from "./common/ErrorBoundary";
import {CreateItemForm} from "./form/CreateItemForm";
import {EditItemForm} from "./form/EditItemForm";
import {ViewItemForm} from "./form/ViewItemForm";
import {Search} from "./search/Search";

const AppRootDiv = styled.div`
  background-color: lightskyblue;
  min-height: 100vh;
  height: 100%;
  width: 100%;
`;

export const App: React.SFC = () => (
    <Router>
        <AppRootDiv>
            <Route
                path="/"
                render={ErrorBoundary.wrap(Search)}/>
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
