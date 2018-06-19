import * as React from "react";
import {ReactNode} from "react";
import {FormFieldSpan, FormLabel, FormLabelSpan} from "../Form.StyledComponents";

export interface IFieldWrapperProps {
    label: string;
    children: ReactNode;
}

export const FieldWrapper: React.SFC<IFieldWrapperProps> = (props: IFieldWrapperProps) => (
    <FormLabel>
        <FormLabelSpan>
            {props.label}
        </FormLabelSpan>
        <FormFieldSpan>
            {props.children}
        </FormFieldSpan>
    </FormLabel>
);
