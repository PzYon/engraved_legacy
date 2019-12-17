import { IUserScoped } from "./IUserScoped";

export interface IKeyword extends IUserScoped {
  _id?: string;
  name: string;
}
