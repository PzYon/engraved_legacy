import { ReactNode } from "react";

export enum NotificationKind {
  Success,
  Warning,
  Error
}

export interface INotification {
  id: string;
  messageOrNode: ReactNode;
  kind: NotificationKind;
  timeToLiveInSeconds?: number;
}
