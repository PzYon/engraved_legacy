import * as React from "react";
import { FieldWrapper } from "../FieldWrapper";
import { IFieldProps } from "../IFieldProps";
import { CodeEditor, CodeLanguage } from "./CodeEditor";

export interface ICodeFieldProps extends IFieldProps<string> {
  language: CodeLanguage;
}

export const CodeField: React.SFC<ICodeFieldProps> = (props: ICodeFieldProps) => {
  return (
    <FieldWrapper label={props.label} validationError={props.validationMessage}>
      <CodeEditor
        language={props.language || CodeLanguage.Json}
        isReadOnly={props.isReadOnly}
        value={props.value}
        onValueChange={props.onValueChange}
      />
    </FieldWrapper>
  );
};
