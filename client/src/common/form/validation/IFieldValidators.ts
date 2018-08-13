export type IFieldValidator<T = string> = (value: T) => string;

export interface IFieldValidators {
  [fieldName: string]: IFieldValidator;
}
