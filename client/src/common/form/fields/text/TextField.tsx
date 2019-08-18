import * as React from "react";
import { ChangeEvent } from "react";
import { Input } from "../../Form.StyledComponents";
import { FieldWrapper } from "../FieldWrapper";
import { ITextFieldProps } from "./ITextFieldProps";

export const TextField: React.FC<ITextFieldProps> = (props: ITextFieldProps) => {
  return (
    <FieldWrapper label={props.label} validationError={props.validationMessage}>
      {props.isReadOnly ? (
        props.value
      ) : (
        <Input
          type="text"
          value={props.value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => props.onValueChange(e.target.value)}
        />
      )}
    </FieldWrapper>
  );
};
