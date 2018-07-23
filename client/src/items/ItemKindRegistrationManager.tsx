import { IItem, ItemKind } from "engraved-shared";
import { ISelectFieldOptions } from "../common/form/fields/SelectField";
import { IconName } from "../common/Icon";
import { CodeItemRegistration } from "./code/CodeItemRegistration";
import { IItemKindRegistration } from "./IItemKindRegistration";
import { NoteItemRegistration } from "./note/NoteItemRegistration";
import { UrlItemRegistration } from "./url/UrlItemRegistration";

export class ItemKindRegistrationManager {
  private static registrations: Array<IItemKindRegistration<IItem>> = [
    new UrlItemRegistration(),
    new CodeItemRegistration(),
    new NoteItemRegistration()
  ];

  public static resolve<TItemKind extends IItem = IItem>(
    itemKind: ItemKind
  ): IItemKindRegistration<TItemKind> {
    const matches: IItemKindRegistration[] = this.registrations.filter(r => r.kind === itemKind);

    if (matches.length === 1) {
      return matches[0];
    }

    if (matches.length > 1) {
      throw new Error(`Cannot register more than once for item kind ${itemKind}.`);
    }

    throw new Error(`No registration present for item kind ${itemKind}.`);
  }

  public static getItemKindOptions(): Array<ISelectFieldOptions<ItemKind>> {
    return Object.keys(ItemKind).map((itemKind: string) => {
      const kind: ItemKind = ItemKind[itemKind];
      return {
        label: this.getItemKindLabel(kind),
        value: kind
      };
    });
  }

  public static getItemKindIcon(itemKind: ItemKind): IconName {
    switch (itemKind) {
      case ItemKind.Note:
        return IconName.Text;
      case ItemKind.Code:
        return IconName.Code;
      case ItemKind.Url:
        return IconName.Url;
    }
  }

  public static getItemKindLabel(kind: ItemKind | string): string {
    switch (kind) {
      case ItemKind.Code:
        return "Code";
      case ItemKind.Note:
        return "Note";
      case ItemKind.Url:
        return "URL";
      default:
        return kind;
    }
  }
}
