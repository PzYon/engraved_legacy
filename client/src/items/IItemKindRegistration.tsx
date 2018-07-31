import { IItem, ItemKind, IUrlItem } from "engraved-shared";
import { ReactNode } from "react";

export interface IItemKindRegistration<TItemKind extends IItem = IItem> {
  kind: ItemKind;

  getViewFormFields(item: TItemKind): ReactNode;

  getEditFormFields(
    item: TItemKind,
    isReadOnly: boolean,
    callback: (key: string, value: any) => void
  ): ReactNode;

  getSpecificProperty(item: TItemKind): ReactNode;
}
