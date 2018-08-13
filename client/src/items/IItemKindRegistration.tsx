import { IItem, ItemKind } from "engraved-shared";
import { ReactNode } from "react";
import { IFieldValidators } from "../common/form/validation/IFieldValidators";
import { IValidatedFields } from "../common/form/validation/IValidatedFields";

export interface IItemKindRegistration<TItemKind extends IItem = IItem> {
  kind: ItemKind;

  getViewFormFields(item: TItemKind): ReactNode;

  getEditFormFields(
    item: TItemKind,
    isReadOnly: boolean,
    validatedFields: IValidatedFields,
    callback: (key: string, value: any) => void
  ): ReactNode;

  getFieldValidators(): IFieldValidators;

  getSpecificProperty(item: TItemKind): ReactNode;
}
