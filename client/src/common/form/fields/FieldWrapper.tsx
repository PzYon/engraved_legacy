import * as React from "react";
import { ReactNode } from "react";
import {
  FormField,
  FormFieldWrapperRoot,
  FormLabel,
  FormValidationErrorDiv
} from "../Form.StyledComponents";

export interface IFieldWrapperProps {
  label: string;
  children: ReactNode;
  validationError: string;
}

export const FieldWrapper: React.FC<IFieldWrapperProps> = (
  props: IFieldWrapperProps
) => (
  <FormFieldWrapperRoot>
    <FormLabel>{props.label}</FormLabel>
    <FormField>{props.children}</FormField>
    <FormValidationErrorDiv>
      {props.validationError}
      &nbsp;
    </FormValidationErrorDiv>
  </FormFieldWrapperRoot>
);
