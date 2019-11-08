import { IItem } from "engraved-shared";
import { ItemKindRegistrationManager } from "../../../items/ItemKindRegistrationManager";
import { IFieldValidator, IFieldValidators } from "./IFieldValidators";
import { IValidatedFields } from "./IValidatedFields";

export class FormValidator {
  public static validateField(item: IItem, fieldName: string): string {
    const validator: IFieldValidator = FormValidator.getValidators(item)[
      fieldName
    ];
    if (!validator) {
      return null;
    } else {
      return validator(item[fieldName]);
    }
  }

  public static validateItem(item: IItem): IValidatedFields {
    return Object.keys(FormValidator.getValidators(item)).reduce(
      (acc: any, fieldName: string) => {
        const validationMessage = FormValidator.validateField(item, fieldName);
        if (validationMessage) {
          acc[fieldName] = validationMessage;
        }

        return acc;
      },
      {}
    );
  }

  public static getValidationMessage(
    fieldValidations: IValidatedFields,
    fieldName: string
  ): string {
    return fieldValidations[fieldName];
  }

  public static getValidators(item: IItem): IFieldValidators {
    return {
      ...{
        title: (value: string) => {
          if (!value || !value.length || value.length < 3) {
            return "Title must be specified and have at least 3 characters.";
          } else {
            return null;
          }
        }
      },
      ...ItemKindRegistrationManager.resolve(item.itemKind).getFieldValidators()
    };
  }
}
