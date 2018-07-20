import "codemirror/lib/codemirror.css";
import * as React from "react";
import { ReactNode } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import styled from "styled-components";
import { StyleConstants } from "../../../styling/StyleConstants";

const CodeEditorContainer = styled.div`
  position: relative;

  .CodeMirror {
    border: 1px solid ${StyleConstants.colors.discreet};
    font-size: 16px;
    width: calc(100% - 2px);
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
        <CodeMirror
          value={this.props.value}
          onChange={(editor, data, value) => this.props.onValueChange(value)}
          options={{
            lineNumbers: true,
            readOnly: this.props.isReadOnly
          }}
        />
      </CodeEditorContainer>
    );
  }
}
