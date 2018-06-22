import * as React from "react";
import {ReactNode} from "react";
import {Subscription} from "rxjs";
import styled from "styled-components";
import {ErrorBoundary} from "../ErrorBoundary";
import {StyleConstants} from "../styling/StyleConstants";
import {StyleUtil} from "../styling/StyleUtil";
import {INotification} from "./INotification";
import {NotificationStore} from "./NotificationStore";

const RootContainerDiv = styled.div`
  width: 100%;
  position: fixed;
  z-index: 10;
  bottom: 0;
  left: 0;
  background-color: ${StyleConstants.colors.success.backgroundTransparent};
  color: ${StyleConstants.colors.success.text};
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: auto;
  max-width: ${StyleConstants.maxContentWidth};
`;

const ListItem = styled.li`
  margin: 0.5rem;
  ${StyleUtil.normalizeAnchors(StyleConstants.colors.success.text)}
`;

const RemoverSpan = styled.span`
  float: right;
  cursor: pointer;
`;

interface INotificationsState {
    notifications: INotification[];
}

export class Notifications extends React.PureComponent<{}, INotificationsState> {
    private notifications$Subscription: Subscription;

    public constructor(props: {}) {
        super(props);

        this.state = {
            notifications: []
        };
    }

    public componentDidMount(): void {
        this.notifications$Subscription = NotificationStore.instance
                                                           .notifications$
                                                           .subscribe(n => this.setState({notifications: n}),
                                                                      (error: Error) => ErrorBoundary.ensureError(this,
                                                                                                                  error));
    }

    public componentWillUnmount(): void {
        if (this.notifications$Subscription) {
            this.notifications$Subscription.unsubscribe();
        }
    }

    public render(): ReactNode {
        const notifications: INotification[] = this.state.notifications;
        if (!notifications || !notifications.length) {
            return null;
        }

        return (
            <RootContainerDiv>
                <List>
                    {
                        notifications.map(n => {
                            return (
                                <ListItem key={n.id}>
                                    <span>
                                        {n.messageOrNode}
                                    </span>
                                    <RemoverSpan onClick={() => this.removeNotification(n)}>
                                        x
                                    </RemoverSpan>
                                </ListItem>
                            );
                        })
                    }
                </List>
            </RootContainerDiv>
        );
    }

    private removeNotification = (n: INotification): void => {
        NotificationStore.instance.removeNotification(n);
    }
}