import { IUserScoped } from "./IUserScoped";

export enum FileType {
  Image = "image"
}

export interface IFile {
  url: string;
  type: FileType;
  label: string;
  cloudFile_id: string;
}

export interface ICloudFile extends IUserScoped {
  _id?: string;
  publicId: string;
  url: string;
}
