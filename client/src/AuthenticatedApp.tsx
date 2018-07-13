import {IUser} from "engraved-shared";
import * as React from "react";
import {ReactNode} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {tap} from "rxjs/operators";
import styled from "styled-components";
import {AuthenticatedServerApi} from "./authentication/AuthenticatedServerApi";
import {AuthStore} from "./authentication/AuthStore";
import {Header} from "./common/Header";
import {WelcomeScreen} from "./common/WelcomeScreen";
import {Notifications} from "./notifications/Notifications";
import {CreateItemPage} from "./pages/createItem/CreateItemPage";
import {EditItemPage} from "./pages/editItem/EditItemPage";
import {NotFoundPage} from "./pages/notFound/NotFoundPage";
import {SearchPage} from "./pages/search/SearchPage";
import {UserPage} from "./pages/user/UserPage";
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
  background-color: ${StyleConstants.colors.pageBackground};
  position: relative;  
`;

interface IAppState {
    currentUser: IUser;
    isLoading: boolean
}

export class AuthenticatedApp extends React.Component<{}, IAppState> {

    public constructor(props: {}) {
        super(props);

        this.state = {
            currentUser: null,
            isLoading: true
        };
    }

    public componentDidMount(): void {
        AuthenticatedServerApi.get("users/me")
                              .pipe(tap(u => u, () => this.setState({isLoading: false})))
                              .subscribe((currentUser: IUser) => {
                                  AuthStore.currentUser$.next(currentUser);
                                  this.setState({currentUser: currentUser, isLoading: false});
                              });
    }

    public render(): ReactNode {
        if (this.state.isLoading) {
            return null;
        }

        if (!this.state.currentUser) {
            return <WelcomeScreen/>;
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
                        <Switch>
                            <Route
                                path="/"
                                component={SearchPage}
                                exact={true}
                            />
                            <Route
                                path="/users/me"
                                component={UserPage}
                                exact={true}
                            />
                            <Route
                                path="/items/create/:itemKind?/:value?"
                                component={CreateItemPage}
                            />
                            <Route
                                path="/items/:itemId/edit"
                                component={EditItemPage}
                            />
                            <Route
                                path="/items/:itemId"
                                component={ViewItemPage}
                                exact={true}
                            />
                            <Route
                                path="/"
                                component={NotFoundPage}
                            />
                        </Switch>
                    </ContentSection>
                    <Notifications/>
                </AppRootDiv>
            </Router>
        )
    }
}
