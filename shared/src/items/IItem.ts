import { IFile } from "../IFile";
import { IKeyword } from "../IKeyword";
import { IUserScoped } from "../IUserScoped";
import { IWithId } from "../IWithId";
import { ItemKind } from "./ItemKind";

export interface IItem extends IUserScoped, IWithId {
  [fieldName: string]: any;
  itemKind: ItemKind;
  title: string;
  description?: string;
  editedOn?: Date;
  keywords?: IKeyword[];
  files?: IFile[];
}
