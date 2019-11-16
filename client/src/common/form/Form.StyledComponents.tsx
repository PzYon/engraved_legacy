import { darken, lighten } from "polished";
import * as React from "react";
import styled from "styled-components";
import { StyleUtil } from "../../styling/StyleUtil";

export const FormContainer = styled.section`
  input,
  textarea,
  select {
    border: 1px solid ${p => p.theme.colors.border};
    vertical-align: top;

    &:focus {
      outline: none;
      box-shadow: ${p => p.theme.defaultBoxShadow};
    }
  }

  input,
  textarea {
    box-sizing: border-box;
    padding: ${p => p.theme.formElementPadding};
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }

  select {
    width: 100%;
    padding: ${p => p.theme.formElementPadding} 0;
  }
`;

export const FormFieldContainer = styled.div``;

export const FormFieldWrapperRoot = styled.div`
  display: block;
  padding-bottom: 0.5rem;
`;

export const FormLabel = styled.label`
  padding-bottom: 0.2rem;
  font-size: ${p => p.theme.font.size.small};
`;

export const FormField = styled.div``;

export const FormValidationErrorDiv = styled.div`
  color: ${p => p.theme.colors.error.background};
  font-size: ${p => p.theme.font.size.small};
`;

export const Input = styled.input``;

export const TextArea = styled.textarea`
  border: 0;
  padding: 0;
  margin: 0;
  height: 34px;
`;

export const Select = styled.select`
  border: 1px solid ${p => p.theme.colors.border};
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.5em auto, 100%;
  padding: 1px 26px 1px 1px;
}

  option {
    padding: 0;
  }
`;

export interface IButtonStyle {
  text: string;
  background: string;
  border: string;
}

export const LinkLikeButton = styled.button`
  cursor: pointer;
  border: 0;
  background-color: transparent;
  color: ${p => p.theme.colors.accent};
  padding: 0;

  &:focus {
    outline: none;
  }
`;

export const Button: any = styled.button<IButtonStyle>`
  display: inline-block;
  background-image: linear-gradient(
    -180deg,
    ${p => lighten(0.05, p.background)},
    ${p => darken(0.05, p.background)} 90%
  );
  color: ${p => p.text};
  border: 1px solid ${p => p.border};
  padding: 0.4rem 0.6rem;
  min-width: 5rem;
  cursor: pointer;
  text-align: center;
  border-radius: ${p => p.theme.borderRadius};
  ${StyleUtil.normalizeAnchors("inherit")};

  &:hover:disabled {
    cursor: default;
  }

  &:focus {
    outline: none;
    box-shadow: ${p => p.theme.defaultBoxShadow};
  }

  a {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

export const FormButtonContainer = styled.div`
  .ngrvd-button:not(:last-child) {
    margin-right: ${p => p.theme.defaultSpacing};
    margin-bottom: 10px;
  }
`;
