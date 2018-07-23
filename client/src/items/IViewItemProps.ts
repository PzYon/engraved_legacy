import { IItem } from "engraved-shared";

export interface IViewItemProps<T extends IItem> {
  item: T;
}
