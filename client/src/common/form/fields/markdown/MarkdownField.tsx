import * as React from "react";
import styled, { css } from "styled-components";
import { useFlag, useTheme } from "../../../Hooks";
import { If } from "../../../If";
import { ButtonStyle, FormButton } from "../../buttons/FormButton";
import { CodeEditor, CodeLanguage } from "../code/CodeEditor";
import { FieldWrapper } from "../FieldWrapper";
import { IFieldProps } from "../IFieldProps";
import { Markdown } from "./Markdown";

export interface IMarkdownFieldProps extends IFieldProps<string> {}

export const MarkdownField = (props: IMarkdownFieldProps) => {
  const [isPreview, toggleIsPreview] = useFlag(false);
  const theme = useTheme();

  return (
    <FieldWrapper label={props.label} validationError={props.validationMessage}>
      <If
        value={!props.isReadOnly && props.value && props.value.trim().length > 0}
        render={() => (
          <TogglePreviewContainer isPreview={isPreview}>
            <FormButton
              button={{
                buttonStyle: ButtonStyle.LinkLike,
                onClick: toggleIsPreview,
                nodeOrLabel: isPreview ? "Back to edit mode" : "View preview",
                fontSize: theme.font.size.small,
                key: isPreview ? "toEditMode" : "toPreview",
                useAsContextualAction: true
              }}
            />
          </TogglePreviewContainer>
        )}
      />
      <If
        value={props.isReadOnly || isPreview}
        render={() => <Markdown markdown={props.value} />}
        renderElse={() => (
          <CodeEditor
            language={CodeLanguage.Markdown}
            onValueChange={props.onValueChange}
            value={props.value}
            isReadOnly={false}
          />
        )}
      />
    </FieldWrapper>
  );
};

interface ITogglePreviewContainerStyle {
  isPreview: boolean;
}

const TogglePreviewContainer = styled.div<ITogglePreviewContainerStyle>`
  display: flex;
  border: 1px solid ${p => p.theme.colors.border};
  background-color: ${p => p.theme.colors.palette.shades.light};
  border-bottom: 0;
  padding: 0.2rem 0.7rem;

  ${p =>
    p.isPreview
      ? css`
          margin-bottom: 0.5rem;
          border-bottom: 1px solid ${p.theme.colors.border};
        `
      : null};
`;
