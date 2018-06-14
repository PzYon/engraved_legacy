import {ReactNode} from "react";

export interface IDropDownItem<T = {}> {
    item: T;
    key: string;
    nodeOrLabel: ReactNode;
}