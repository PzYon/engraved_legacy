import { IFile } from "../IFile";
import { IKeyword } from "../IKeyword";
import { IUserScoped } from "../IUserScoped";
import { ItemKind } from "./ItemKind";

export interface IItem extends IUserScoped {
  [fieldName: string]: any;
  _id?: string;
  itemKind: ItemKind;
  title: string;
  description?: string;
  editedOn?: Date;
  keywords?: IKeyword[];
  files?: IFile[];
}
