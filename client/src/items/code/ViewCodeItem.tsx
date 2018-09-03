import { ICodeItem } from "engraved-shared";
import * as React from "react";
import { CodeEditor, CodeLanguage } from "../../common/form/fields/code/CodeEditor";
import { FormLabelDiv } from "../../common/form/Form.StyledComponents";
import { IViewItemProps } from "../IViewItemProps";
import { CodeItemRegistration } from "./CodeItemRegistration";

export const ViewCodeItem: React.SFC<IViewItemProps<ICodeItem>> = (
  props: IViewItemProps<ICodeItem>
) => {
  return (
    <>
      <FormLabelDiv>
        {CodeItemRegistration.getCodeLanguageLabel(props.item.codeLanguage)}
      </FormLabelDiv>
      <CodeEditor
        language={props.item.codeLanguage as CodeLanguage}
        isReadOnly={true}
        value={props.item.code}
        onValueChange={() => void 0}
      />
    </>
  );
};
