import * as React from "react";
import { ReactNode } from "react";
import {
  FormField,
  FormFieldWrapperRoot,
  FormLabel,
  FormValidationErrorDiv
} from "../Form.StyledComponents";

export const FieldWrapper = (props: {
  label: string;
  children: ReactNode;
  validationError: string;
}) => (
  <FormFieldWrapperRoot>
    <FormLabel>{props.label}</FormLabel>
    <FormField>{props.children}</FormField>
    <FormValidationErrorDiv>
      {props.validationError}
      &nbsp;
    </FormValidationErrorDiv>
  </FormFieldWrapperRoot>
);
