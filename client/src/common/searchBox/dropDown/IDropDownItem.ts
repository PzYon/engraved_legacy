import { IKeyword } from "../../../../../shared/src";
import { ILabeled } from "../../IAction";

export type IKeywordWithLabel = IKeyword & ILabeled;

export interface IDropDownItem<T extends ILabeled> {
  item: T;
  key: string;
}
