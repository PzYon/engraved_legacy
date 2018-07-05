import {IUser} from "engraved-shared/dist";
import * as React from "react";
import {ReactNode} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import styled from "styled-components";
import {Authenticated} from "./authentication/Authenticated";
import {AuthenticatedServerApi} from "./authentication/AuthenticatedServerApi";
import {AuthStore} from "./authentication/AuthStore";
import {Header} from "./common/Header";
import {Notifications} from "./notifications/Notifications";
import {CreateItemPage} from "./pages/createItem/CreateItemPage";
import {EditItemPage} from "./pages/editItem/EditItemPage";
import {SearchPage} from "./pages/search/SearchPage";
import {ViewItemPage} from "./pages/viewItem/ViewItemPage";
import {StyleConstants} from "./styling/StyleConstants";

const AppRootDiv = styled.div`  
  min-height: 100vh;
`;

const BaseSection = styled.section`
  width: 100%;
  max-width: ${StyleConstants.maxContentWidth};
  margin: auto;
`;

const HeaderContainerDiv = styled.div`
  width: 100%;
  background-color: ${StyleConstants.colors.header.background};
  color: ${StyleConstants.colors.header.background};
`;

const HeaderSection = BaseSection.extend`
  height: ${StyleConstants.headerHeightInPx}px;
`;

const ContentSection = BaseSection.extend`
  min-height: calc(100vh - ${StyleConstants.headerHeightInPx}px);
  background-color: ${StyleConstants.colors.contentBackground};
  position: relative;  
`;

interface IAppState {
    currentUser: IUser;
}

export class App extends React.Component<{}, IAppState> {

    public constructor(props: {}) {
        super(props);

        this.state = {
            currentUser: null
        };
    }

    public componentDidMount(): void {
        AuthenticatedServerApi.get("/users/me")
                              .subscribe((currentUser: IUser) => {
                                  AuthStore.currentUser$.next(currentUser);
                                  this.setState({currentUser: currentUser});
                              });
    }

    public render(): ReactNode {
        if (!this.state.currentUser) {
            // this could be considered as the splash screen
            return (
                <div>
                    <a href="http://localhost:3001/api/authentication/google/start">
                        Enter
                    </a>
                    <Router>
                        <Route
                            path="/authenticated/:jwt"
                            component={Authenticated}
                            exact={true}
                        />
                    </Router>
                </div>
            );
        }

        return (
            <Router>
                <AppRootDiv>
                    <HeaderContainerDiv>
                        <HeaderSection>
                            <Header currentUser={this.state.currentUser}/>
                        </HeaderSection>
                    </HeaderContainerDiv>
                    <ContentSection>
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
                    </ContentSection>
                    <Notifications/>
                </AppRootDiv>
            </Router>
        )
    }
}
