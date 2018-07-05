import {ReactNode} from "react";

export interface INotification {
    id: string;
    messageOrNode: ReactNode;
}