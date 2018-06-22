// note: the following lines are required, or else ace editor won't work and throw an exception that "ace" is not defined
// the reason for this are the strange imports, they assume that a variable called "ace" is available
import * as brace from "brace";
import "brace/ext/searchbox";
import "brace/mode/json";
import "brace/theme/github";
import * as React from "react";
import AceEditor from "react-ace";
import styled from "styled-components";
import {StyleConstants} from "../../styling/StyleConstants";
import {FieldWrapper} from "./FieldWrapper";
import {IFieldProps} from "./IFieldProps";

const ace = brace;

const AceEditorContainer = styled.div`
  #engraved-code-field {
    border: 1px solid ${StyleConstants.colors.borders};
  }
`;

export interface ICodeFieldProps extends IFieldProps<string> {
    value?: string;
}

export const CodeField: React.SFC<ICodeFieldProps> = (props: ICodeFieldProps) => {
    return (
        <FieldWrapper label={props.label} doRender={!props.isReadOnly || !!props.value}>
            <AceEditorContainer>
                <AceEditor
                    mode="json"
                    theme="github"
                    width={"calc(100% - 2px)"}
                    height={"50vh"}
                    readOnly={props.isReadOnly}
                    showGutter={true}
                    showPrintMargin={false}
                    highlightActiveLine={true}
                    onChange={(value) => props.onValueChange(value)}
                    name="engraved-code-field"
                    value={props.value}
                    editorProps={{$blockScrolling: true}}
                    setOptions={{showLineNumbers: true}}
                />
            </AceEditorContainer>
        </FieldWrapper>
    );
};
