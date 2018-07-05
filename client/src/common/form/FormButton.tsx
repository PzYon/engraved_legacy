import * as React from "react";
import {ReactNode} from "react";
import {Button} from "./Form.StyledComponents";

export interface IButtonProps {
    onClick: () => void,
    nodeOrLabel: ReactNode;
    isPrimary?: boolean;
}

export const FormButton: React.SFC<IButtonProps> = (props: IButtonProps) => {
    return (
        <Button
            type="button"
            onClick={props.onClick}
            isPrimary={!!props.isPrimary}
        >
            {props.nodeOrLabel}
        </Button>
    );
};