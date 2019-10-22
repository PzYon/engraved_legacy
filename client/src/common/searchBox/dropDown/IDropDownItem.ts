import { ILabeled } from "../../../actions/IAction";

export interface IDropDownItem<T extends ILabeled> {
  item: T;
  key: string;
}
