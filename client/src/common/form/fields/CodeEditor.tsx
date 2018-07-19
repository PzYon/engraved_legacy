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
import { ReactNode } from "react";
import AceEditor from "react-ace";
import styled from "styled-components";
import { StyleConstants } from "../../../styling/StyleConstants";

const ace = brace;

const CodeEditorContainer = styled.div`
  #engraved-code-field {
    border: 1px solid ${StyleConstants.colors.discreet};
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

export class CodeEditor extends React.Component<ICodeEditorProps> {
  public constructor(props: ICodeEditorProps) {
    super(props);
  }

  public shouldComponentUpdate(nextProps: ICodeEditorProps) {
    return false;
  }

  public render(): ReactNode {
    return (
      <CodeEditorContainer>
        <AceEditor
          mode={this.props.language}
          theme="github"
          width={"calc(100% - 2px)"}
          minLines={5}
          maxLines={50}
          fontSize={14}
          readOnly={this.props.isReadOnly}
          showGutter={true}
          showPrintMargin={false}
          highlightActiveLine={true}
          onChange={value => this.props.onValueChange(value)}
          name="engraved-code-field"
          defaultValue={this.props.value}
          editorProps={{ $blockScrolling: true }}
          setOptions={{ showLineNumbers: true }}
        />
      </CodeEditorContainer>
    );
  }
}
