import {IDropDownItem} from "./IDropDownItem";

export interface IDropDownItemGroup {
    title?: string;
    items: IDropDownItem[];
    onSelectItem: (item: IDropDownItem) => void;
}