import * as React from "react";
import { ReactNode } from "react";
import { FormFieldSpan, FormLabel, FormLabelSpan } from "../Form.StyledComponents";

export interface IFieldWrapperProps {
  doRender: boolean;
  label: string;
  children: ReactNode;
}

export const FieldWrapper: React.SFC<IFieldWrapperProps> = (props: IFieldWrapperProps) =>
  !props.doRender ? null : (
    <FormLabel>
      <FormLabelSpan>{props.label}</FormLabelSpan>
      <FormFieldSpan>{props.children}</FormFieldSpan>
    </FormLabel>
  );
