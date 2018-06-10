import {IItem} from "../../../shared/dist";

export interface IButton {
    onClick: (item: IItem) => void;
    label: string;
}