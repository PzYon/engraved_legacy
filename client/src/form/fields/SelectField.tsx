import * as React from "react";
import {ChangeEvent, ReactNode} from "react";
import {Select} from "../Form.StyledComponents";
import {FieldWrapper} from "./FieldWrapper";
import {IFieldProps} from "./IFieldProps";

export interface ISelectFieldOptions<T> {
    key: string;
    label: string;
    value: T
}

export interface ISelectFieldProps<T> extends IFieldProps<T> {
    options: Array<ISelectFieldOptions<T>>;
    defaultKey?: string;
}

export class SelectField extends React.PureComponent<ISelectFieldProps<any>> {
    public render(): ReactNode {
        return (
            <FieldWrapper label={this.props.label}>
                {
                    this.props.isReadOnly
                    ? `TODO! Following is only the default key: ${this.props.defaultKey}`
                    : (
                        <Select defaultValue={this.props.defaultKey} onChange={this.onChange}>
                            {
                                this.props
                                    .options
                                    .map((o: ISelectFieldOptions<any>) => (
                                             <option value={o.key} key={o.key}>
                                                 {o.label}
                                             </option>
                                         )
                                    )
                            }
                        </Select>
                    )
                }
            </FieldWrapper>
        );
    }

    private onChange = (event: ChangeEvent<HTMLSelectElement>): void => {
        const option: ISelectFieldOptions<any> = this.props
                                                     .options
                                                     .find(o => o.key === event.target.value) as any;

        this.props.onValueChange(option ? option.value : null);
    }
}