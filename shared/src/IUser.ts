export interface IUser {
  _id?: string;
  mail: string;
  displayName: string;
  image: string;
  memberSince: Date;
  settings?: { [key: string]: any };
}
