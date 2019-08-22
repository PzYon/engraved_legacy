import { IStats, IUser } from "engraved-shared";
import * as React from "react";
import { ReactNode } from "react";
import { RouteComponentProps } from "react-router";
import styled from "styled-components";
import { AuthenticatedServerApi } from "../../authentication/AuthenticatedServerApi";
import { FormatDate } from "../../common/FormatDate";
import { If } from "../../common/If";
import { Page } from "../Page";

const Highlight = styled.span`
  font-weight: 500;
`;

interface IRouterParams {
  itemId: string;
}

interface IUserPageState {
  user: IUser;
  stats: IStats;
}

export class UserPage extends React.Component<RouteComponentProps<IRouterParams>, IUserPageState> {
  public readonly state: IUserPageState = {
    user: null,
    stats: null
  };

  public componentDidMount(): void {
    AuthenticatedServerApi.currentUser$.subscribe((user: IUser) => {
      this.setState({ user: user });
    });

    // todo: i guess this should be moved somewhere else...
    AuthenticatedServerApi.get("users/me/stats").subscribe((stats: IStats) => {
      this.setState({ stats: stats });
    });
  }

  public render(): ReactNode {
    const user: IUser = this.state.user;
    if (!user) {
      return null;
    }

    return (
      <Page browserTitle={user.displayName} title={`Greetings ${user.displayName}`}>
        <p>
          Your mail address is <Highlight>{user.mail}</Highlight> and you signed up{" "}
          <Highlight>
            <FormatDate value={user.memberSince} />
          </Highlight>
          .
        </p>
        <If
          value={this.state.stats}
          render={() => (
            <p>
              You've created <Highlight>{this.state.stats.itemCount}</Highlight> items and{" "}
              <Highlight>{this.state.stats.keywordCount}</Highlight> keywords.
            </p>
          )}
        />
      </Page>
    );
  }
}
