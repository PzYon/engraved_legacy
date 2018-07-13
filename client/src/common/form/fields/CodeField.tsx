import * as React from "react";
import {CodeEditor, CodeLanguage} from "./CodeEditor";
import {FieldWrapper} from "./FieldWrapper";
import {IFieldProps} from "./IFieldProps";

export interface ICodeFieldProps extends IFieldProps<string> {
    language: CodeLanguage
}

export const CodeField: React.SFC<ICodeFieldProps> = (props: ICodeFieldProps) => {
    return (
        <FieldWrapper label={props.label} doRender={!props.isReadOnly || !!props.value}>
            <CodeEditor
                language={props.language || CodeLanguage.Json}
                isReadOnly={props.isReadOnly}
                value={props.value}
                onValueChange={props.onValueChange}
            />
        </FieldWrapper>
    );
};
