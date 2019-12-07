import { IKeyword } from "../IKeyword";
import { ItemKind } from "./ItemKind";

export interface IItem {
  [fieldName: string]: any;
  _id?: string;
  itemKind: ItemKind;
  title: string;
  description?: string;
  editedOn?: Date;
  keywords?: IKeyword[];
  user_id: string;
}
