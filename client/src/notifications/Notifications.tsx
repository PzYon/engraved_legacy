import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import { Closer } from "../common/Closer";
import { ErrorBoundary } from "../common/ErrorBoundary";
import { useDidMount, useTheme } from "../common/Hooks";
import { ITheme } from "../styling/ITheme";
import { StyleUtil } from "../styling/StyleUtil";
import { INotification, NotificationKind } from "./INotification";
import { NotificationStore } from "./NotificationStore";

export const Notifications = () => {
  const theme = useTheme();
  const [notifications, setNotifications] = useState<INotification[]>([]);

  useDidMount(() => {
    const notifications$Subscription = NotificationStore.instance.notifications$.subscribe(
      setNotifications,
      // ErrorBoundary.ensureError => how to deal with hooks?
      (error: Error) => ErrorBoundary.ensureError(null, error)
    );

    return () => notifications$Subscription.unsubscribe();
  });

  if (!notifications || !notifications.length) {
    return null;
  }

  return (
    <RootContainerDiv>
      <List>
        {notifications.map(n => {
          const colors = getColors(theme, n.kind);
          return (
            <ListItem key={n.id} colors={colors}>
              <ListItemInner>
                <MessageSpan>{n.messageOrNode}</MessageSpan>
                <Closer
                  onClose={() => removeNotification(n)}
                  title={"Close"}
                  color={colors.text}
                />
              </ListItemInner>
            </ListItem>
          );
        })}
      </List>
    </RootContainerDiv>
  );
};

const removeNotification = (n: INotification): void => {
  NotificationStore.instance.removeNotification(n);
};

const getColors = (theme: ITheme, kind: NotificationKind): any => {
  switch (kind) {
    case NotificationKind.Success:
      return theme.colors.success;
    case NotificationKind.Warning:
      return theme.colors.warning;
    case NotificationKind.Error:
      return theme.colors.error;
  }
};

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
  ${p => StyleUtil.normalizeAnchors(p.theme.colors.success.text)};
`;

const ListItemInner = styled.span`
  position: relative;
  display: flex;
  max-width: calc(
    ${p => p.theme.maxContentWidth} - ${p => p.theme.defaultSpacing} -
      ${p => p.theme.defaultSpacing}
  );
  padding: ${p => p.theme.defaultSpacing};
  margin: auto;
  overflow: hidden;

  .ngrvd-closer {
    top: 5px;
  }
`;

const MessageSpan = styled.span`
  flex-grow: 1;
`;
