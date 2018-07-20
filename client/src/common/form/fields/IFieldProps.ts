export interface IFieldProps<T> {
  label: string;
  value: T;
  onValueChange: (value: T) => void;
  isReadOnly: boolean;
}
