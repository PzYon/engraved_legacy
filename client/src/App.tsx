import * as React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import styled from "styled-components";
import {Notifications} from "./common/notifications/Notifications";
import {StyleConstants} from "./common/styling/StyleConstants";
import {CreateItemPage} from "./pages/createItem/CreateItemPage";
import {EditItemPage} from "./pages/editItem/EditItemPage";
import {SearchPage} from "./pages/search/SearchPage";
import {ViewItemPage} from "./pages/viewItem/ViewItemPage";

const AppRootDiv = styled.div`
  background-color: ${StyleConstants.colors.contentBackground};
  min-height: 100vh;
  height: 100%;
  width: 100%;
`;

export const App: React.SFC = () => (
    <Router>
        <AppRootDiv>
            <Route
                path="/"
                component={SearchPage}
                exact={true}
            />
            <Route
                path="/create/:itemKind?/:value?"
                component={CreateItemPage}
            />
            <Route
                path="/:itemId"
                component={ViewItemPage}
                exact={true}
            />
            <Route
                path="/:itemId/edit"
                component={EditItemPage}
            />
            <Notifications/>
        </AppRootDiv>
    </Router>
);
