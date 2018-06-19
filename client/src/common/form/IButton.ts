import {IItem} from "engraved-shared/dist";
import {ReactNode} from "react";

export interface IButton {
    onClick: (item: IItem) => void;
    nodeOrLabel: ReactNode;
    isPrimary?: boolean;
}