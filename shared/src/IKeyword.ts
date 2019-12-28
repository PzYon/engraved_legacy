import { IUserScoped } from "./IUserScoped";
import { IWithId } from "./IWithId";

export interface IKeyword extends IUserScoped, IWithId {
  name: string;
}
