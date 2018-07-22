import * as React from "react";
import { ICodeItem } from "../../../../shared/src";
import { EnumUtil } from "../../common/EnumUtil";
import { CodeEditor, CodeLanguage } from "../../common/form/fields/CodeEditor";
import { FormLabelSpan } from "../../common/form/Form.StyledComponents";
import { IViewItemProps } from "./IViewItemProps";

export const ViewCodeItem: React.SFC<IViewItemProps<ICodeItem>> = (
  props: IViewItemProps<ICodeItem>
) => {
  return (
    <div>
      <FormLabelSpan>{EnumUtil.getCodeLanguageLabel(props.item.codeLanguage)}</FormLabelSpan>
      <CodeEditor
        language={props.item.codeLanguage as CodeLanguage}
        isReadOnly={true}
        value={props.item.code}
        onValueChange={() => void 0}
      />
    </div>
  );
};
