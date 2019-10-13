import { ChangeEvent } from "react";
import * as React from "react";
import styled from "styled-components";

export interface IEditablePageTitleProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export const EditablePageTitle = (props: IEditablePageTitleProps) => {
  return (
    <Input
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => props.onChange(e.target.value)}
    />
  );
};

const Input = styled.input`
  font-size: ${p => p.theme.font.size.largest};
  width: calc(100% - 30px);
  color: ${p => p.theme.colors.accent};
  background-color: ${p => p.theme.colors.pageBackground};
  border: 1px solid ${p => p.theme.colors.pageBackground};
  padding: 0;

  &:focus,
  &:hover {
    background-color: ${p => p.theme.colors.formElementBackground};
    border-color: ${p => p.theme.colors.border};
    outline: none;
  }
`;
