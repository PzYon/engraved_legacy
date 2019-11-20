import * as React from "react";
import { useFlag, useTheme } from "../../../Hooks";
import { If } from "../../../If";
import { ButtonStyle, FormButton } from "../../buttons/FormButton";
import { CodeEditor, CodeLanguage } from "../code/CodeEditor";
import { FieldWrapper } from "../FieldWrapper";
import { IFieldProps } from "../IFieldProps";
import { Markdown } from "./Markdown";

export const MarkdownField = (props: IFieldProps<string>) => {
  const [isPreview, toggleIsPreview] = useFlag(false);
  const theme = useTheme();

  const toggleEditButton = {
    buttonStyle: ButtonStyle.LinkLike,
    onClick: toggleIsPreview,
    label: isPreview ? "Back to edit mode" : "View preview",
    fontSize: theme.font.size.small,
    isContextualAction: true
  };

  return (
    <FieldWrapper label={props.label} validationError={props.validationMessage}>
      <If
        value={props.isReadOnly || isPreview}
        render={() => (
          <Markdown markdown={props.value} buttons={[toggleEditButton]} />
        )}
        renderElse={() => (
          <>
            <FormButton button={toggleEditButton} />
            <CodeEditor
              language={CodeLanguage.Markdown}
              onValueChange={props.onValueChange}
              value={props.value}
              isReadOnly={false}
            />
          </>
        )}
      />
    </FieldWrapper>
  );
};
