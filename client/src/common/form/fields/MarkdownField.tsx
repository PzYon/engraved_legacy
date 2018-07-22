import * as React from "react";
import { ReactNode } from "react";
import styled from "styled-components";
import { CodeEditor, CodeLanguage } from "./CodeEditor";
import { FieldWrapper } from "./FieldWrapper";
import { IFieldProps } from "./IFieldProps";
import { Markdown } from "./Markdown";

const TogglePreviewLabel = styled.label`
  font-size: 0.7rem;
  cursor: pointer;
  display: inline-block;

  input {
    width: auto;
    min-width: auto;
  }
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
          <TogglePreviewLabel onClick={() => this.setState({ isPreview: !this.state.isPreview })}>
            <input type="checkbox" />Preview
          </TogglePreviewLabel>
        )}
        {this.props.isReadOnly || this.state.isPreview ? (
          <Markdown markdown={this.props.value} />
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
