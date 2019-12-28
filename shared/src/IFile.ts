import { IUserScoped } from "./IUserScoped";
import { IWithId } from "./IWithId";

export enum FileType {
  Image = "image"
}

export interface IFile {
  url: string;
  type: FileType;
  label: string;
  cloudFile_id: string;
}

export interface ICloudFile extends IUserScoped, IWithId {
  publicId: string;
  url: string;
}
