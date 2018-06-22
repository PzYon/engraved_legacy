import * as React from "react";
import {ChangeEvent} from "react";
import {Input} from "../Form.StyledComponents";
import {FieldWrapper} from "./FieldWrapper";
import {IFieldProps} from "./IFieldProps";

export interface ITextFieldProps extends IFieldProps<string> {
    value?: string;
}

export const TextField: React.SFC<ITextFieldProps> = (props: ITextFieldProps) => {
    return (
        <FieldWrapper label={props.label} doRender={!props.isReadOnly || !!props.value}>
            {
                props.isReadOnly
                ? props.value
                : (
                    <Input
                        type="text"
                        value={props.value}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => props.onValueChange(e.target.value)}
                    />
                )
            }
        </FieldWrapper>
    );
};
