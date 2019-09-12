import { IUser } from "engraved-shared";
import * as React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { first, tap } from "rxjs/operators";
import styled from "styled-components";
import { AuthenticatedServerApi } from "./authentication/AuthenticatedServerApi";
import { Header } from "./common/Header";
import { useDidMount } from "./common/Hooks";
import { WelcomeScreen } from "./common/WelcomeScreen";
import { Notifications } from "./notifications/Notifications";
import { CreateItemPage } from "./pages/createItem/CreateItemPage";
import { EditItemPage } from "./pages/editItem/EditItemPage";
import { NotFoundPage } from "./pages/notFound/NotFoundPage";
import { SearchPage } from "./pages/search/SearchPage";
import { UserPage } from "./pages/user/UserPage";
import { ViewItemPage } from "./pages/viewItem/ViewItemPage";

export const AuthenticatedApp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useDidMount(() => {
    AuthenticatedServerApi.get("users/me")
      .pipe(
        first(),
        tap(
          u => u,
          // error case
          () => setIsLoading(false)
        )
      )
      .subscribe((user: IUser) => {
        AuthenticatedServerApi.currentUser$.next(user);
        if (!currentUser || user._id !== user._id) {
          console.log("loaded user: ", user);
          setCurrentUser(user);
          setIsLoading(false);
        }
      });
  });

  if (isLoading) {
    return null;
  }

  if (!currentUser) {
    return <WelcomeScreen />;
  }

  return (
    <Router>
      <AppRootDiv>
        <HeaderContainerDiv>
          <HeaderContainer>
            <Header currentUser={currentUser} />
          </HeaderContainer>
        </HeaderContainerDiv>
        <ContentContainer>
          <Switch>
            <Route path="/" component={SearchPage} exact={true} />
            <Route path="/users/me" component={UserPage} exact={true} />
            <Route path="/items/create/:itemKind?/:value?" component={CreateItemPage} />
            <Route path="/items/:itemId/edit" component={EditItemPage} />
            <Route path="/items/:itemId" component={ViewItemPage} exact={true} />
            <Route path="/" component={NotFoundPage} />
          </Switch>
        </ContentContainer>
        <Notifications />
      </AppRootDiv>
    </Router>
  );
};

const AppRootDiv = styled.div`
  min-height: 100vh;
`;

const BaseContainer = styled.div`
  width: 100%;
  max-width: ${p => p.theme.maxContentWidth};
  margin: auto;
`;

const HeaderContainerDiv = styled.div`
  width: 100%;
  background-color: ${p => p.theme.colors.header.background};
  color: ${p => p.theme.colors.header.background};
`;

const HeaderContainer = styled(BaseContainer)`
  height: ${p => p.theme.headerHeightInPx}px;
`;

const ContentContainer = styled(BaseContainer)`
  min-height: calc(100vh - ${p => p.theme.headerHeightInPx}px);
  position: relative;
`;
