import { ICodeItem, ItemKind } from "engraved-shared";
import * as React from "react";
import { DomUtil } from "../../common/DomUtil";
import { ButtonStyle, FormButton } from "../../common/form/buttons/FormButton";
import { CodeLanguage } from "../../common/form/fields/code/CodeEditor";
import { CodeField } from "../../common/form/fields/code/CodeField";
import { ISelectFieldOptions, SelectField } from "../../common/form/fields/select/SelectField";
import { FormValidator } from "../../common/form/validation/FormValidator";
import { IFieldValidators } from "../../common/form/validation/IFieldValidators";
import { IValidatedFields } from "../../common/form/validation/IValidatedFields";
import { IItemKindRegistration } from "../IItemKindRegistration";
import { ViewCodeItem } from "./ViewCodeItem";

const defaultLanguage = CodeLanguage.Json;

export class CodeItemRegistration implements IItemKindRegistration<ICodeItem> {
  public kind: ItemKind = ItemKind.Code;

  public getEditFormFields(
    item: ICodeItem,
    isReadOnly: boolean,
    validatedFields: IValidatedFields,
    callback: (key: string, value: any) => void
  ): React.ReactNode {
    const language = item.codeLanguage || defaultLanguage;

    return (
      <>
        <SelectField
          options={CodeItemRegistration.getCodeLanguageOptions()}
          label={"Language"}
          value={language}
          valueLabel={CodeItemRegistration.getCodeLanguageLabel(language)}
          onValueChange={(value: string) => callback("codeLanguage", value)}
          validationMessage={FormValidator.getValidationMessage(validatedFields, "codeLanguage")}
          isReadOnly={isReadOnly}
          defaultKey={language}
          key={"language"}
        />
        <CodeField
          label={"Code"}
          language={item.codeLanguage as CodeLanguage}
          onValueChange={(value: string) => callback("code", value)}
          validationMessage={FormValidator.getValidationMessage(validatedFields, "code")}
          value={item.code}
          isReadOnly={isReadOnly}
          key={"code"}
        />
      </>
    );
  }

  public getFieldValidators(): IFieldValidators {
    return {
      code: (value: string) => {
        return !value || !value.length || value.trim().length < 3
          ? "Code must be specified and have at least 3 characters."
          : null;
      },
      codeLanguage: (value: string) => {
        return !value || !value.length ? "Language must be specified." : null;
      }
    };
  }

  public getViewFormFields(item: ICodeItem): React.ReactNode {
    return <ViewCodeItem item={item} />;
  }

  public getSpecificProperties(item: ICodeItem): React.ReactNode[] {
    return item.codeLanguage
      ? [
          <span key={"codeLanguage"}>
            {CodeItemRegistration.getCodeLanguageLabel(item.codeLanguage)}
          </span>,
          <FormButton
            key={"copy"}
            button={{
              onClick: () => DomUtil.copyValueToClipBoard(item.code),
              nodeOrLabel: "copy",
              buttonStyle: ButtonStyle.LinkLike
            }}
          />
        ]
      : null;
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

  public getDefaultProperties(): Partial<ICodeItem> {
    return { codeLanguage: defaultLanguage };
  }
}
