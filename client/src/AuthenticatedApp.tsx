import { IUser } from "engraved-shared";
import * as React from "react";
import { ReactNode } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { first, tap } from "rxjs/operators";
import styled from "styled-components";
import { AuthenticatedServerApi } from "./authentication/AuthenticatedServerApi";
import { Header } from "./common/Header";
import { WelcomeScreen } from "./common/WelcomeScreen";
import { Notifications } from "./notifications/Notifications";
import { CreateItemPage } from "./pages/createItem/CreateItemPage";
import { EditItemPage } from "./pages/editItem/EditItemPage";
import { NotFoundPage } from "./pages/notFound/NotFoundPage";
import { SearchPage } from "./pages/search/SearchPage";
import { UserPage } from "./pages/user/UserPage";
import { ViewItemPage } from "./pages/viewItem/ViewItemPage";
import { StyleConstants } from "./styling/StyleConstants";

const AppRootDiv = styled.div`
  min-height: 100vh;
`;

const BaseContainer = styled.div`
  width: 100%;
  max-width: ${StyleConstants.maxContentWidth};
  margin: auto;
`;

const HeaderContainerDiv = styled.div`
  width: 100%;
  background-color: ${StyleConstants.colors.header.background};
  color: ${StyleConstants.colors.header.background};
`;

const HeaderContainer = styled(BaseContainer)`
  height: ${StyleConstants.headerHeightInPx}px;
`;

const ContentContainer = styled(BaseContainer)`
  min-height: calc(100vh - ${StyleConstants.headerHeightInPx}px);
  position: relative;
`;

interface IAppState {
  currentUser: IUser;
  isLoading: boolean;
}

export class AuthenticatedApp extends React.PureComponent<{}, IAppState> {
  public readonly state: IAppState = {
    currentUser: null,
    isLoading: true
  };

  public componentDidMount(): void {
    AuthenticatedServerApi.get("users/me")
      .pipe(
        first(),
        tap(
          u => u,
          // error case
          () => this.setState({ isLoading: false })
        )
      )
      .subscribe((currentUser: IUser) => {
        AuthenticatedServerApi.currentUser$.next(currentUser);
        if (this.state.currentUser === null || this.state.currentUser._id !== currentUser._id) {
          this.setState({ currentUser: currentUser, isLoading: false });
        }
      });
  }

  public render(): ReactNode {
    if (this.state.isLoading) {
      return null;
    }

    if (!this.state.currentUser) {
      return <WelcomeScreen />;
    }

    return (
      <Router>
        <AppRootDiv>
          <HeaderContainerDiv>
            <HeaderContainer>
              <Header currentUser={this.state.currentUser} />
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
  }
}
