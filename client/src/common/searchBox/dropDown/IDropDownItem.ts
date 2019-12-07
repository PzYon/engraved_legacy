import { ILabeled } from "../../../actions/IAction";

export interface IDropDownItem<T extends ILabeled = ILabeled> {
  item: T;
  key: string;
}
