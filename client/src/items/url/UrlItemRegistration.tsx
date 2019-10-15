import { ItemKind, IUrlItem } from "engraved-shared";
import * as React from "react";
import { DomUtil } from "../../common/DomUtil";
import { ButtonStyle, FormButton } from "../../common/form/buttons/FormButton";
import { TextField } from "../../common/form/fields/text/TextField";
import { FormValidator } from "../../common/form/validation/FormValidator";
import { IFieldValidators } from "../../common/form/validation/IFieldValidators";
import { IValidatedFields } from "../../common/form/validation/IValidatedFields";
import { IItemKindRegistration } from "../IItemKindRegistration";
import { ViewUrlItem } from "./ViewUrlItem";

export class UrlItemRegistration implements IItemKindRegistration<IUrlItem> {
  public kind: ItemKind = ItemKind.Url;

  public getEditFormFields(
    item: IUrlItem,
    isReadOnly: boolean,
    validatedFields: IValidatedFields,
    callback: (key: string, value: any) => void
  ): React.ReactNode {
    return (
      <TextField
        label={"URL"}
        onValueChange={(value: string) => callback("url", value)}
        validationMessage={FormValidator.getValidationMessage(validatedFields, "url")}
        value={item.url}
        isReadOnly={isReadOnly}
      />
    );
  }

  public getFieldValidators(): IFieldValidators {
    return {
      url: (value: string) => {
        return !value || !value.length || value.trim().length < 3
          ? "URL must be specified and have at least 3 characters."
          : null;
      }
    };
  }

  public getViewFormFields(item: IUrlItem): React.ReactNode {
    return <ViewUrlItem item={item} />;
  }

  public getSpecificProperties(item: IUrlItem): React.ReactNode[] {
    return [
      <span key={"view"}>
        view on{" "}
        <a href={item.url} title={item.url}>
          {UrlItemRegistration.getHostName(item.url)}
        </a>
      </span>,
      <FormButton
        key={"copy"}
        button={{
          onClick: () => DomUtil.copyValueToClipBoard(item.url),
          nodeOrLabel: "copy",
          buttonStyle: ButtonStyle.LinkLike,
          key: "copy"
        }}
      />
    ];
  }

  private static getHostName(url: string): string {
    const parser = document.createElement("a");
    parser.href = url;

    const hostname = parser.hostname.toLowerCase();
    return hostname.indexOf("www.") === 0 ? hostname.substr(4, hostname.length - 1) : hostname;
  }

  public getDefaultProperties(): Partial<IUrlItem> {
    return {};
  }
}
