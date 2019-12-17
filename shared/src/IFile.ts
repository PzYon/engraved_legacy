import { IUserScoped } from "./IUserScoped";

export enum FileType {
  Image = "image"
}

export interface IFile extends IUserScoped {
  _id?: string;
  url: string;
  type: FileType;
}
