import { INoteItem, ItemKind } from "engraved-shared";
import * as React from "react";
import { MarkdownField } from "../../common/form/fields/markdown/MarkdownField";
import { FormValidator } from "../../common/form/validation/FormValidator";
import { IFieldValidators } from "../../common/form/validation/IFieldValidators";
import { IValidatedFields } from "../../common/form/validation/IValidatedFields";
import { IItemKindRegistration } from "../IItemKindRegistration";
import { ViewNoteItem } from "./ViewNoteItem";

export class NoteItemRegistration implements IItemKindRegistration<INoteItem> {
  public kind: ItemKind = ItemKind.Note;

  public getViewFormFields(item: INoteItem): React.ReactNode {
    return <ViewNoteItem item={item} />;
  }

  public getEditFormFields(
    item: INoteItem,
    isReadOnly: boolean,
    validatedFields: IValidatedFields,
    callback: (key: string, value: any) => void
  ): React.ReactNode {
    return (
      <MarkdownField
        label={"Note"}
        onValueChange={(value: string) => callback("note", value)}
        validationMessage={FormValidator.getValidationMessage(validatedFields, "note")}
        value={item.note}
        isReadOnly={isReadOnly}
      />
    );
  }

  public getFieldValidators(): IFieldValidators {
    return {
      note: (value: string) => {
        return !value || !value.length || value.trim().length < 3
          ? "Note must be specified and have at least 3 characters."
          : null;
      }
    };
  }

  public getSpecificProperty(item: INoteItem): React.ReactNode {
    return null;
  }

  public getDefaultProperties(): Partial<INoteItem> {
    return {};
  }
}
