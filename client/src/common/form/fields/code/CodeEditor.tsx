import "codemirror/lib/codemirror.css";
import "codemirror/mode/clike/clike.js";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/markdown/markdown.js";
import * as React from "react";
import { ReactNode } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import styled from "styled-components";
import { StyleConstants } from "../../../../styling/StyleConstants";

const CodeEditorContainer = styled.div`
  .CodeMirror {
    border: 1px solid ${StyleConstants.colors.discreet};
    font-size: 16px;
    font-family: ${StyleConstants.font.codeFamily};
    width: calc(100% - 2px);
    height: auto;
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
    return nextProps.language !== this.props.language;
  }

  public render(): ReactNode {
    return (
      <CodeEditorContainer>
        <CodeMirror
          value={this.props.value}
          onChange={(editor, data, value) => this.props.onValueChange(value)}
          options={{
            lineNumbers: true,
            lineWrapping: true,
            viewportMargin: Infinity,
            readOnly: this.props.isReadOnly,
            mode: CodeEditor.getModeOptions(this.props.language)
          }}
        />
      </CodeEditorContainer>
    );
  }

  private static getModeOptions(language: CodeLanguage): any {
    switch (language) {
      case CodeLanguage.Markdown:
        return "markdown";
      case CodeLanguage.TypeScript:
        return { name: "javascript", typescript: true };
      case CodeLanguage.Json:
        return { name: "javascript", json: true };
      case CodeLanguage.JavaScript:
        return "javascript";
      case CodeLanguage.CSharp:
        return "text/x-csharp";
    }
  }
}
