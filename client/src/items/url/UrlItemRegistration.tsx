import { ItemKind, IUrlItem } from "engraved-shared";
import * as React from "react";
import { TextField } from "../../common/form/fields/TextField";
import { IItemKindRegistration } from "../IItemKindRegistration";
import { ViewUrlItem } from "./ViewUrlItem";

export class UrlItemRegistration implements IItemKindRegistration<IUrlItem> {
  public kind: ItemKind = ItemKind.Url;

  public getEditFormFields(
    item: IUrlItem,
    isReadOnly: boolean,
    callback: (key: string, value: any) => void
  ): React.ReactNode {
    return (
      <TextField
        label={"URL"}
        onValueChange={(value: string) => callback("url", value)}
        value={item.url}
        isReadOnly={isReadOnly}
      />
    );
  }

  public getViewFormFields(item: IUrlItem): React.ReactNode {
    return <ViewUrlItem item={item} />;
  }
}
