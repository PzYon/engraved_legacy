import { darken, lighten } from "polished";
import * as React from "react";
import styled from "styled-components";
import { StyleConstants } from "../../styling/StyleConstants";
import { StyleUtil } from "../../styling/StyleUtil";

export const FormContainer = styled.section`
  input,
  textarea,
  select {
    border: 1px solid ${StyleConstants.colors.discreet};
    vertical-align: top;

    &:focus {
      outline: none;
      box-shadow: ${StyleConstants.defaultBoxShadow};
    }
  }

  input,
  textarea {
    padding: ${StyleConstants.formElementPadding};
    width: calc(
      100% - ${StyleConstants.formElementPadding} - ${StyleConstants.formElementPadding} - 2px
    );
    min-width: calc(
      100% - ${StyleConstants.formElementPadding} - ${StyleConstants.formElementPadding} - 2px
    );
    max-width: calc(
      100% - ${StyleConstants.formElementPadding} - ${StyleConstants.formElementPadding} - 2px
    );
  }

  select {
    width: 100%;
    padding: ${StyleConstants.formElementPadding} 0;
  }
`;

export const FormFieldContainer = styled.div``;

export const FormLabel = styled.label`
  display: block;
  padding-bottom: 0.5rem;
`;

export const FormLabelDiv = styled.div`
  padding-bottom: 0.2rem;
  font-size: ${StyleConstants.font.small};
`;

export const FormFieldDiv = styled.div``;

export const FormValidationErrorDiv = styled.div`
  color: ${StyleConstants.colors.error.background};
  font-size: ${StyleConstants.font.small};
`;

export const Input = styled.input``;

export const TextArea = styled.textarea`
  border: 0;
  padding: 0;
`;

export const Select = styled.select`
  option {
    padding: 0;
  }
`;

export interface IButtonStyle {
  text: string;
  background: string;
  border: string;
}

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
  border-radius: ${StyleConstants.borderRadius};
  ${StyleUtil.normalizeAnchors("inherit")};

  &:hover:enabled,
  &:focus {
    outline: none;
    box-shadow: ${StyleConstants.defaultBoxShadow};
  }

  a {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

export const FormButtonContainer = styled.div`
  .ngrvd-button:not(:last-child) {
    margin-right: ${StyleConstants.defaultSpacing};
    margin-bottom: 10px;
  }
`;
