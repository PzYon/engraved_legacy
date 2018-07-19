import * as marked from "marked";
import * as React from "react";
import { ReactNode } from "react";
import styled from "styled-components";
import { StyleConstants } from "../../../styling/StyleConstants";
import { CodeEditor, CodeLanguage } from "./CodeEditor";
import { FieldWrapper } from "./FieldWrapper";
import { IFieldProps } from "./IFieldProps";

const TogglePreviewSpan = styled.span`
  font-size: 0.6rem;
  color: ${StyleConstants.colors.accent};
  cursor: pointer;
`;

const MarkupDiv = styled.div`
  border: 1px solid ${StyleConstants.colors.accent};
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
      <FieldWrapper
        label={this.props.label}
        doRender={!this.props.isReadOnly || !!this.props.value}
      >
        {!this.props.isReadOnly && (
          <TogglePreviewSpan onClick={() => this.setState({ isPreview: !this.state.isPreview })}>
            > {this.state.isPreview ? "back to edit-mode" : "show preview"}
          </TogglePreviewSpan>
        )}
        {this.props.isReadOnly || this.state.isPreview ? (
          <MarkupDiv dangerouslySetInnerHTML={{ __html: marked(this.props.value || "") }} />
        ) : (
          <CodeEditor
            language={CodeLanguage.Markdown}
            onValueChange={this.props.onValueChange}
            value={this.props.value}
            isReadOnly={false}
          />
        )}
      </FieldWrapper>
    );
  }
}
