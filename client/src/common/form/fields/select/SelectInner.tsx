import * as React from "react";
import { Select } from "../../Form.StyledComponents";
import { ISelectFieldOptions } from "./SelectField";

export interface ISelectInnerProps<T> {
  defaultKey: string;
  onValueChange: (value: T) => void;
  options: Array<ISelectFieldOptions<T>>;
}

export const SelectInner = (props: ISelectInnerProps<any>) => {
  return (
    <Select defaultValue={props.defaultKey} onChange={props.onValueChange}>
      {props.options.map((o: ISelectFieldOptions<any>) => (
        <option value={o.value} key={o.value}>
          {o.label}
        </option>
      ))}
    </Select>
  );
};
