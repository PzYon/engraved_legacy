import * as React from "react";
import { ReactNode } from "react";
import {
  FormFieldDiv,
  FormLabel,
  FormLabelDiv,
  FormValidationErrorDiv
} from "../Form.StyledComponents";

export interface IFieldWrapperProps {
  label: string;
  children: ReactNode;
  validationError: string;
}

export const FieldWrapper: React.FC<IFieldWrapperProps> = (props: IFieldWrapperProps) => (
  <FormLabel>
    <FormLabelDiv>{props.label}</FormLabelDiv>
    <FormFieldDiv>{props.children}</FormFieldDiv>
    <FormValidationErrorDiv>
      {props.validationError}
      &nbsp;
    </FormValidationErrorDiv>
  </FormLabel>
);
