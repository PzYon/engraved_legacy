// note: the following lines are required, or else ace editor won't work and throw an exception that "ace" is not defined
// the reason for this are the strange imports, they assume that a variable called "ace" is available
import * as brace from "brace";
import "brace/ext/searchbox";
import "brace/mode/csharp";
import "brace/mode/javascript";
import "brace/mode/json";
import "brace/mode/markdown";
import "brace/mode/typescript";
import "brace/theme/github";
import * as React from "react";
import AceEditor from "react-ace";
import styled from "styled-components";
import {StyleConstants} from "../../../styling/StyleConstants";

const ace = brace;

const CodeEditorContainer = styled.div`
  #engraved-code-field {
    border: 1px solid ${StyleConstants.colors.borders};
  }
`;

export enum CodeLanguage {
    Json = "json",
    JavaScript = "javascript",
    TypeScript = "typescript",
    CSharp = "csharp",
    Markdown = "markdown"
}

interface ICodeEditorProps {
    language: CodeLanguage;
    isReadOnly: boolean;
    value: string;
    onValueChange: (value: string) => void;
}

export const CodeEditor: React.SFC<ICodeEditorProps> = (props: ICodeEditorProps) => {
    return (
        <CodeEditorContainer>
            <AceEditor
                mode={props.language}
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
        </CodeEditorContainer>
    );
};