import * as React from "react";
import { ReactNode } from "react";
import { Subscription } from "rxjs";
import styled from "styled-components";
import { ErrorBoundary } from "../common/ErrorBoundary";
import { StyleConstants } from "../styling/StyleConstants";
import { StyleUtil } from "../styling/StyleUtil";
import { INotification, NotificationKind } from "./INotification";
import { NotificationStore } from "./NotificationStore";

const RootContainerDiv = styled.div`
  width: 100%;
  position: fixed;
  z-index: 10;
  bottom: 0;
  left: 0;
  opacity: 0.9;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  color: ${(props: { colors: any }) => props.colors.text};
  background-color: ${(props: { colors: any }) => props.colors.background};
  padding: 0;
  margin: 0;
  ${StyleUtil.normalizeAnchors(StyleConstants.colors.success.text)};
`;

const ListItemInner = styled.span`
  display: flex;
  max-width: calc(
    ${StyleConstants.maxContentWidth} - ${StyleConstants.defaultSpacing} -
      ${StyleConstants.defaultSpacing}
  );
  padding: ${StyleConstants.defaultSpacing};
  margin: auto;
  overflow: hidden;
`;

const MessageSpan = styled.span`
  flex-grow: 1;
`;

const RemoverSpan = styled.span`
  cursor: pointer;
`;

interface INotificationsState {
  notifications: INotification[];
}

export class Notifications extends React.PureComponent<{}, INotificationsState> {
  private notifications$Subscription: Subscription;

  public readonly state: INotificationsState = {
    notifications: []
  };

  public componentDidMount(): void {
    this.notifications$Subscription = NotificationStore.instance.notifications$.subscribe(
      n => this.setState({ notifications: n }),
      (error: Error) => ErrorBoundary.ensureError(this, error)
    );
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
          {notifications.map(n => {
            return (
              <ListItem key={n.id} colors={Notifications.getColors(n.kind)}>
                <ListItemInner>
                  <MessageSpan>{n.messageOrNode}</MessageSpan>
                  <RemoverSpan onClick={() => this.removeNotification(n)}>x</RemoverSpan>
                </ListItemInner>
              </ListItem>
            );
          })}
        </List>
      </RootContainerDiv>
    );
  }

  private removeNotification = (n: INotification): void => {
    NotificationStore.instance.removeNotification(n);
  };

  private static getColors(kind: NotificationKind): any {
    switch (kind) {
      case NotificationKind.Success:
        return StyleConstants.colors.success;
      case NotificationKind.Warning:
        return StyleConstants.colors.warning;
      case NotificationKind.Error:
        return StyleConstants.colors.error;
    }
  }
}
