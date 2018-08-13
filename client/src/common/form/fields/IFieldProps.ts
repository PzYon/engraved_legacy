export interface IFieldProps<T> {
  label: string;
  value: T;
  validationMessage?: string;
  onValueChange: (value: T) => void;
  isReadOnly: boolean;
}
