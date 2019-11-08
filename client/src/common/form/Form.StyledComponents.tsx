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
    padding: ${p => p.theme.formElementPadding};
    width: calc(
      100% - ${p => p.theme.formElementPadding} -
        ${p => p.theme.formElementPadding} - 2px
    );
    min-width: calc(
      100% - ${p => p.theme.formElementPadding} -
        ${p => p.theme.formElementPadding} - 2px
    );
    max-width: calc(
      100% - ${p => p.theme.formElementPadding} -
        ${p => p.theme.formElementPadding} - 2px
    );
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
`;

export const Select = styled.select`
  border: 1px solid ${p => p.theme.colors.border};

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
