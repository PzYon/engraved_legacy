import { ICodeItem, ItemKind } from "engraved-shared";
import * as React from "react";
import { CodeLanguage } from "../../common/form/fields/CodeEditor";
import { CodeField } from "../../common/form/fields/CodeField";
import { ISelectFieldOptions, SelectField } from "../../common/form/fields/SelectField";
import { IItemKindRegistration } from "../IItemKindRegistration";
import { ViewCodeItem } from "./ViewCodeItem";

export class CodeItemRegistration implements IItemKindRegistration<ICodeItem> {
  public kind: ItemKind = ItemKind.Code;

  public getEditFormFields(
    item: ICodeItem,
    isReadOnly: boolean,
    callback: (key: string, value: any) => void
  ): React.ReactNode {
    return [
      <SelectField
        options={CodeItemRegistration.getCodeLanguageOptions()}
        label={"Language"}
        value={item.codeLanguage}
        valueLabel={CodeItemRegistration.getCodeLanguageLabel(item.codeLanguage)}
        onValueChange={(value: string) => callback("codeLanguage", value)}
        isReadOnly={isReadOnly}
        defaultKey={item.codeLanguage}
        key={"language"}
      />,
      <CodeField
        label={"Code"}
        language={item.codeLanguage as CodeLanguage}
        onValueChange={(value: string) => callback("code", value)}
        value={item.code}
        isReadOnly={isReadOnly}
        key={"code"}
      />
    ];
  }

  public getViewFormFields(item: ICodeItem): React.ReactNode {
    return <ViewCodeItem item={item} />;
  }

  public getSpecificProperty(item: ICodeItem): React.ReactNode {
    return <span>{CodeItemRegistration.getCodeLanguageLabel(item.codeLanguage)}</span>;
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
}
