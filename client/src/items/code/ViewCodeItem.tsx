import { ICodeItem } from "engraved-shared";
import * as React from "react";
import { CodeEditor, CodeLanguage } from "../../common/form/fields/CodeEditor";
import { FormLabelSpan } from "../../common/form/Form.StyledComponents";
import { IViewItemProps } from "../IViewItemProps";
import { CodeItemRegistration } from "./CodeItemRegistration";

export const ViewCodeItem: React.SFC<IViewItemProps<ICodeItem>> = (
  props: IViewItemProps<ICodeItem>
) => {
  return (
    <div>
      <FormLabelSpan>
        {CodeItemRegistration.getCodeLanguageLabel(props.item.codeLanguage)}
      </FormLabelSpan>
      <CodeEditor
        language={props.item.codeLanguage as CodeLanguage}
        isReadOnly={true}
        value={props.item.code}
        onValueChange={() => void 0}
      />
    </div>
  );
};