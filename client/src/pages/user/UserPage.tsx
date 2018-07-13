import {IItem, IUser, Util} from "engraved-shared";
import * as moment from "moment";
import * as React from "react";
import {ReactNode} from "react";
import {RouteComponentProps} from "react-router";
import {AuthStore} from "../../authentication/AuthStore";
import {Page} from "../Page";

interface IRouterParams {
    itemId: string;
}

interface IUserPageState {
    user: IUser;
}

export class UserPage extends React.Component<RouteComponentProps<IRouterParams>, IUserPageState> {
    public constructor(props: RouteComponentProps<IRouterParams>) {
        super(props);

        this.state = {
            user: null
        };
    }

    public componentDidMount(): void {
        AuthStore.currentUser$
                 .subscribe((u: IUser) => {
                     this.setState({user: u});
                 });
    }

    public render(): ReactNode {
        const user: IUser = this.state.user;
        if (!user) {
            return null;
        }

        return (
            <Page browserTitle={user.displayName} title={`Greetings ${user.displayName}`}>
                <div>
                    Your mail address is {user.mail} and you signed up {moment(user.memberSince).fromNow()}.
                </div>
            </Page>
        );
    }
}
