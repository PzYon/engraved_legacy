import * as React from "react";
import { ChangeEvent, ReactNode } from "react";
import { FieldWrapper } from "../FieldWrapper";
import { IFieldProps } from "../IFieldProps";
import { SelectInner } from "./SelectInner";

export interface ISelectFieldOptions<T> {
  label: string;
  value: T;
}

export interface ISelectFieldProps<T> extends IFieldProps<T> {
  options: Array<ISelectFieldOptions<T>>;
  defaultKey?: string;
  valueLabel: string;
}

export class SelectField extends React.PureComponent<ISelectFieldProps<any>> {
  public render(): ReactNode {
    return (
      <FieldWrapper label={this.props.label} validationError={this.props.validationMessage}>
        {this.props.isReadOnly ? (
          this.props.valueLabel
        ) : (
          <SelectInner
            defaultKey={this.props.defaultKey}
            onValueChange={this.onChange}
            options={this.props.options}
          />
        )}
      </FieldWrapper>
    );
  }

  private onChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const option: ISelectFieldOptions<any> = this.props.options.find(
      o => o.value === event.target.value
    ) as any;

    this.props.onValueChange(option ? option.value : null);
  };
}
