import { INoteItem, ItemKind } from "engraved-shared";
import * as React from "react";
import { MarkdownField } from "../../common/form/fields/MarkdownField";
import { IItemKindRegistration } from "../IItemKindRegistration";
import { ViewNoteItem } from "./ViewNoteItem";

export class NoteItemRegistration implements IItemKindRegistration<INoteItem> {
  public kind: ItemKind = ItemKind.Note;

  public getEditFormFields(
    item: INoteItem,
    isReadOnly: boolean,
    callback: (key: string, value: any) => void
  ): React.ReactNode {
    return (
      <MarkdownField
        label={"Note"}
        onValueChange={(value: string) => callback("note", value)}
        value={item.note}
        isReadOnly={isReadOnly}
      />
    );
  }

  public getViewFormFields(item: INoteItem): React.ReactNode {
    return <ViewNoteItem item={item} />;
  }

  public getSpecificProperty(item: INoteItem): React.ReactNode {
    return null;
  }
}
