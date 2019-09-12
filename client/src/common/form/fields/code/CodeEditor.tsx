import "codemirror/lib/codemirror.css";
import "codemirror/mode/clike/clike.js";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/markdown/markdown.js";
import "codemirror/theme/material.css";
import * as React from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import styled from "styled-components";
import { ThemeStyle } from "../../../../styling/ThemeStyle";
import { useTheme } from "../../../Hooks";

interface ICodeEditorProps {
  language: CodeLanguage;
  isReadOnly: boolean;
  value: string;
  onValueChange: (value: string) => void;
}

export const CodeEditor = React.memo((props: ICodeEditorProps) => {
  const theme = useTheme();

  return (
    <CodeEditorContainer>
      <CodeMirror
        value={props.value}
        onChange={(editor, data, value) => props.onValueChange(value)}
        options={{
          theme: theme.themeStyle === ThemeStyle.Dark ? "material" : "default",
          lineNumbers: true,
          lineWrapping: true,
          viewportMargin: Infinity,
          readOnly: props.isReadOnly,
          mode: getModeOptions(props.language)
        }}
      />
    </CodeEditorContainer>
  );
});

export enum CodeLanguage {
  Json = "json",
  JavaScript = "javascript",
  TypeScript = "typescript",
  CSharp = "csharp",
  Markdown = "markdown"
}

const getModeOptions = (language: CodeLanguage) => {
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
};

const CodeEditorContainer = styled.div`
  .CodeMirror {
    border: 1px solid ${p => p.theme.colors.discreet};
    font-size: ${p => p.theme.font.size.regular};
    font-family: ${p => p.theme.font.codeFamily};
    width: calc(100% - 2px);
    height: auto;
  }
`;
