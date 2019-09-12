import { ICodeItem } from "engraved-shared";
import * as React from "react";
import { CodeEditor, CodeLanguage } from "../../common/form/fields/code/CodeEditor";
import { FormLabel } from "../../common/form/Form.StyledComponents";
import { IViewItemProps } from "../IViewItemProps";
import { CodeItemRegistration } from "./CodeItemRegistration";

export const ViewCodeItem: React.FC<IViewItemProps<ICodeItem>> = (
  props: IViewItemProps<ICodeItem>
) => {
  return (
    <>
      <FormLabel>{CodeItemRegistration.getCodeLanguageLabel(props.item.codeLanguage)}</FormLabel>
      <CodeEditor
        language={props.item.codeLanguage as CodeLanguage}
        isReadOnly={true}
        value={props.item.code}
        onValueChange={() => void 0}
      />
    </>
  );
};
