import * as React from "react";
import {ReactNode} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import styled from "styled-components";
import {IUser} from "../../shared/src";
import {Authenticated} from "./authentication/Authenticated";
import {AuthenticatedServerApi} from "./authentication/AuthenticatedServerApi";
import {AuthStore} from "./authentication/AuthStore";
import {CurrentUser} from "./authentication/CurrentUser";
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
                    <CurrentUser user={this.state.currentUser}/>
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
        )
    }
}
