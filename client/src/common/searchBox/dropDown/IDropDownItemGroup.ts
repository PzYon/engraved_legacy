import { ILabeled } from "../../../actions/IAction";
import { IDropDownItem } from "./IDropDownItem";

export interface IDropDownItemGroup {
  title?: string;
  items: Array<IDropDownItem<ILabeled>>;
  onSelectItem: (item: IDropDownItem<ILabeled>) => void;
}
