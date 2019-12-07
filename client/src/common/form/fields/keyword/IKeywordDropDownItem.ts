import { IKeyword } from "engraved-shared";
import { ILabeled } from "../../../../actions/IAction";

export interface IKeywordDropDownItem extends ILabeled {
  label: string;
  keyword: IKeyword;
}
