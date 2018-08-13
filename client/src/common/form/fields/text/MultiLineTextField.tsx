import * as React from "react";
import { ChangeEvent } from "react";
import { TextArea } from "../../Form.StyledComponents";
import { FieldWrapper } from "../FieldWrapper";
import { ITextFieldProps } from "./ITextFieldProps";

export const MultiLineTextField: React.SFC<ITextFieldProps> = (props: ITextFieldProps) => {
  return (
    <FieldWrapper label={props.label} validationError={props.validationMessage}>
      {props.isReadOnly ? (
        props.value
      ) : (
        <TextArea
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => props.onValueChange(e.target.value)}
          value={props.value}
        />
      )}
    </FieldWrapper>
  );
};
