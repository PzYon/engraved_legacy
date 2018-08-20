import * as React from "react";
import { ReactNode } from "react";
import styled, { css } from "styled-components";
import { StyleConstants } from "../../../../styling/StyleConstants";
import { If } from "../../../If";
import { CodeEditor, CodeLanguage } from "../code/CodeEditor";
import { FieldWrapper } from "../FieldWrapper";
import { IFieldProps } from "../IFieldProps";
import { Markdown } from "./Markdown";

interface ITogglePreviewContainerStyle {
  isPreview: boolean;
}

const TogglePreviewContainer = styled.div<ITogglePreviewContainerStyle>`
  border: 1px solid ${StyleConstants.colors.discreet};
  background-color: ${StyleConstants.colors.ultraDiscreet};
  border-bottom: 0;
  padding: 0.2rem;

  ${p =>
    p.isPreview
      ? css`
          margin-bottom: 0.5rem;
          border-bottom: 1px solid ${StyleConstants.colors.discreet};
        `
      : null};
`;

const TogglePreviewAnchor = styled.a`
  font-size: ${StyleConstants.font.small};
  cursor: pointer;
  display: inline-block;
  padding-left: 0.7rem;
  color: ${StyleConstants.colors.accent};
`;

export interface IMarkdownFieldProps extends IFieldProps<string> {}

interface IMarkdownFieldState {
  isPreview: boolean;
}

export class MarkdownField extends React.PureComponent<IMarkdownFieldProps, IMarkdownFieldState> {
  public readonly state: IMarkdownFieldState = {
    isPreview: false
  };

  public render(): ReactNode {
    return (
      <FieldWrapper label={this.props.label} validationError={this.props.validationMessage}>
        <If
          value={!this.props.isReadOnly && this.props.value && this.props.value.trim().length > 0}
          render={() => (
            <TogglePreviewContainer isPreview={this.state.isPreview}>
              <TogglePreviewAnchor
                onClick={() => this.setState({ isPreview: !this.state.isPreview })}
                href={"javascript:void(0)"}
              >
                {this.state.isPreview ? "Back to edit mode" : "View preview"}
              </TogglePreviewAnchor>
            </TogglePreviewContainer>
          )}
        />
        <If
          value={this.props.isReadOnly || this.state.isPreview}
          render={() => <Markdown markdown={this.props.value} />}
          renderElse={() => (
            <CodeEditor
              language={CodeLanguage.Markdown}
              onValueChange={this.props.onValueChange}
              value={this.props.value}
              isReadOnly={false}
            />
          )}
        />
      </FieldWrapper>
    );
  }
}
