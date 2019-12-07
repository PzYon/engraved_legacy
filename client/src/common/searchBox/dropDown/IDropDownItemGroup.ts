import { ILabeled } from "../../../actions/IAction";
import { IDropDownItem } from "./IDropDownItem";

export interface IDropDownItemGroup<T extends ILabeled = ILabeled> {
  title?: string;
  items: Array<IDropDownItem<T>>;
  onSelectItem: (item: IDropDownItem<T>) => void;
}
