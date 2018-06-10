import * as React from "react";
import {ChangeEvent} from "react";
import {Input} from "../Form.StyledComponents";
import {FieldWrapper} from "./FieldWrapper";
import {IFieldProps} from "./IFieldProps";

export interface ITextFieldProps extends IFieldProps<string> {
    value?: string;
}

export const TextField: React.SFC<ITextFieldProps> = (props: ITextFieldProps) => (
    <FieldWrapper label={props.label}>
        <Input
            type="text"
            value={props.value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => props.onValueChange(e.target.value)}
        />
    </FieldWrapper>
);
