import * as React from "react";
import { ReactNode } from "react";
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
  valueLabel?: string;
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
            onValueChange={this.props.onValueChange}
            options={this.props.options}
          />
        )}
      </FieldWrapper>
    );
  }
}
