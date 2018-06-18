import {ReactNode} from "react";
import {IItem} from "../../../shared/dist";

export interface IButton {
    onClick: (item: IItem) => void;
    nodeOrLabel: ReactNode;
    isPrimary?: boolean;
}