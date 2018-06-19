export interface IFieldProps<T> {
    label: string;
    onValueChange: (value: T) => void;
    isReadOnly: boolean;
}