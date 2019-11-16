import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/indent-fold.js";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/clike/clike.js";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/markdown/markdown.js";
import "codemirror/theme/material.css";
import * as React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import styled from "styled-components";
import { ThemeStyle } from "../../../../styling/ThemeStyle";
import { useTheme } from "../../../Hooks";

interface ICodeEditorProps {
  language: CodeLanguage;
  isReadOnly: boolean;
  value: string;
  onValueChange: (value: string) => void;
}

export const CodeEditor = (props: ICodeEditorProps) => {
  const theme = useTheme();

  return (
    <CodeEditorContainer>
      <CodeMirror
        value={props.value}
        onBeforeChange={(editor, data, value) => props.onValueChange(value)}
        options={{
          theme: theme.themeStyle === ThemeStyle.Dark ? "material" : "default",
          lineNumbers: true,
          lineWrapping: props.language === CodeLanguage.Markdown,
          viewportMargin: Infinity,
          foldGutter: true,
          readOnly: props.isReadOnly,
          mode: getModeOptions(props.language),
          gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        }}
      />
    </CodeEditorContainer>
  );
};

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
    border: 1px solid ${p => p.theme.colors.border};
    font-size: ${p => p.theme.font.size.regular};
    font-family: ${p => p.theme.font.codeFamily};
    width: calc(100% - 2px);
    height: auto;
    background-color: ${p => p.theme.colors.formElementBackground} !important;

    .CodeMirror-gutter {
      background-color: ${p => p.theme.colors.palette.shades.light} !important;
    }

    .CodeMirror-foldmarker {
      color: ${p => p.theme.colors.accent};
      text-shadow: none;
    }

    .cm-link,
    .cm-header {
      color: ${p => p.theme.colors.accent};
    }
  }
`;
