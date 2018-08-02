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

  public getSpecificProperty(item: IUrlItem): React.ReactNode {
    return (
      <span>
        view on{" "}
        <a href={item.url} title={item.url}>
          {UrlItemRegistration.getHostName(item.url)}
        </a>
      </span>
    );
  }

  private static getHostName(url: string): string {
    const parser = document.createElement("a");
    parser.href = url;

    const hostname = parser.hostname.toLowerCase();
    return hostname.indexOf("www.") === 0 ? hostname.substr(4, hostname.length - 1) : hostname;
  }
}
