import * as React from "react";
import { ChangeEvent, ReactNode } from "react";
import { Select } from "../../Form.StyledComponents";
import { FieldWrapper } from "../FieldWrapper";
import { IFieldProps } from "../IFieldProps";

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
          <Select defaultValue={this.props.defaultKey} onChange={this.onChange}>
            {this.props.options.map((o: ISelectFieldOptions<any>) => (
              <option value={o.value} key={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
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
