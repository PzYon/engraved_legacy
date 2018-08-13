import * as React from "react";
import { ReactNode } from "react";
import styled from "styled-components";
import { StyleConstants } from "../../../../styling/StyleConstants";
import { If } from "../../../If";
import { CodeEditor, CodeLanguage } from "../code/CodeEditor";
import { FieldWrapper } from "../FieldWrapper";
import { IFieldProps } from "../IFieldProps";
import { Markdown } from "./Markdown";

const TogglePreviewAnchor = styled.a`
  font-size: ${StyleConstants.font.small};
  cursor: pointer;
  display: inline-block;
  color: ${StyleConstants.colors.accent};
`;

export interface IMarkdownFieldProps extends IFieldProps<string> {}

interface IMarkdownFieldState {
  isPreview: boolean;
}

export class MarkdownField extends React.PureComponent<IMarkdownFieldProps, IMarkdownFieldState> {
  public constructor(props: IMarkdownFieldProps) {
    super(props);

    this.state = {
      isPreview: false
    };
  }

  public render(): ReactNode {
    return (
      <FieldWrapper label={this.props.label} validationError={this.props.validationMessage}>
        <If
          value={!this.props.isReadOnly}
          render={() => (
            <TogglePreviewAnchor
              onClick={() => this.setState({ isPreview: !this.state.isPreview })}
              href={"javascript:void(0)"}
            >
              {this.state.isPreview ? "Back to edit mode" : "View preview"}
            </TogglePreviewAnchor>
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