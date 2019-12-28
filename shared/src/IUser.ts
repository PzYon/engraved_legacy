import { IWithId } from "./IWithId";

export interface IUser extends IWithId {
  mail: string;
  displayName: string;
  image: string;
  memberSince: Date;
  settings?: { [key: string]: any };
}
