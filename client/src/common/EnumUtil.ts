import { ItemKind } from "engraved-shared";
import { CodeLanguage } from "./form/fields/CodeEditor";
import { ISelectFieldOptions } from "./form/fields/SelectField";
import { IconName } from "./Icon";

export class EnumUtil {
  public static getItemKindOptions(): Array<ISelectFieldOptions<ItemKind>> {
    return Object.keys(ItemKind).map((itemKind: string) => {
      const kind: ItemKind = ItemKind[itemKind];
      return {
        label: this.getItemKindLabel(kind),
        value: kind
      };
    });
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

  public static getCodeLanguageOptions(): Array<ISelectFieldOptions<CodeLanguage>> {
    return Object.keys(CodeLanguage).map((codeLanguage: string) => {
      const language: CodeLanguage = CodeLanguage[codeLanguage] as CodeLanguage;
      return {
        label: this.getCodeLanguageLabel(language),
        value: language
      };
    });
  }

  public static getCodeLanguageLabel(codeLanguage: CodeLanguage | string): string {
    switch (codeLanguage) {
      case CodeLanguage.Json:
        return "JSON";
      case CodeLanguage.CSharp:
        return "C#";
      case CodeLanguage.TypeScript:
        return "TypeScript";
      case CodeLanguage.JavaScript:
        return "JavaScript";
      case CodeLanguage.Markdown:
        return "Markdown";
      default:
        return codeLanguage;
    }
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
}
