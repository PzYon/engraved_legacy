import { ILabeled } from "../../IAction";
import { IDropDownItem } from "./IDropDownItem";

export interface IDropDownItemGroup {
  title?: string;
  items: Array<IDropDownItem<ILabeled>>;
  onSelectItem: (item: IDropDownItem<ILabeled>) => void;
}
