import * as React from "react";
import { ChangeEvent, useRef } from "react";
import { Simulate } from "react-dom/test-utils";
import styled from "styled-components";
import { useDidMount } from "../common/Hooks";
import input = Simulate.input;

export interface IEditablePageTitleProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export const EditablePageTitle = (props: IEditablePageTitleProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useDidMount(() => {
    inputRef.current.focus();
  });

  return (
    <Input
      ref={inputRef}
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        props.onChange(e.target.value)
      }
    />
  );
};

const Input = styled.input`
  font-size: ${p => p.theme.font.size.large};
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
