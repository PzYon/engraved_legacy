import { IUser } from "engraved-shared";
import * as React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { first, tap } from "rxjs/operators";
import styled from "styled-components";
import { AuthenticatedServerApi } from "./authentication/AuthenticatedServerApi";
import { AuthenticationCallback } from "./authentication/AuthenticationCallback";
import { Header } from "./common/Header";
import { useDidMount } from "./common/Hooks";
import { WelcomeScreen } from "./common/WelcomeScreen";
import { Footer } from "./Footer";
import { Notifications } from "./notifications/Notifications";
import {
  ContextualActionsLauncher,
  ContextualActionsProvider
} from "./pages/contextualActions/ContextualActionsLauncher";
import { CreateItemPage } from "./pages/CreateItemPage";
import { EditItemPage } from "./pages/EditItemPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { SearchPage } from "./pages/search/SearchPage";
import { UserPage } from "./pages/UserPage";
import { ViewItemPage } from "./pages/ViewItemPage";

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
          () => {
            setIsLoading(false);
            AuthenticationCallback.rememberCurrentUrlForRedirectionAfterAuthentication();
          }
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
        <ContextualActionsProvider>
          <HeaderContainerDiv>
            <HeaderContainer>
              <Header currentUser={currentUser} />
            </HeaderContainer>
          </HeaderContainerDiv>
          <MainContainer>
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
            <Footer />
          </MainContainer>
          <Notifications />
          <div style={{ position: "fixed", right: "20px", top: "40vh" }}>
            <ContextualActionsLauncher />
          </div>
        </ContextualActionsProvider>
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

const MainContainer = styled(BaseContainer)`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - ${p => p.theme.headerHeightInPx}px);
  position: relative;
`;

const ContentContainer = styled.div`
  flex-grow: 1;
`;
